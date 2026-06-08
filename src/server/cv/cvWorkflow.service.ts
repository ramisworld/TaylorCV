import "server-only";

import { TRPCError } from "@trpc/server";
import { Prisma } from "../../../generated/prisma/index.js";

import { parseStructuredCv } from "~/lib/cvDocument";
import { buildCvRenderModel } from "~/lib/cvRenderModel";
import { db } from "~/server/db";
import { runCvComposerAgent } from "./agents/cvComposer.agent";
import { runIntakeGapAgent } from "./agents/intakeGap.agent";
import {
  collectCvQualityWarnings,
  repairCvForSectionStrategy,
} from "./cvQualityWarnings";
import {
  JobContextSchema,
  SectionSignalsSchema,
  StructuredCvDocumentSchema,
  type GapAnswerForComposer,
  type StructuredCvDocument,
  type StructuredCareerProfile,
} from "./cvSchemas";
import { buildSectionStrategy } from "./sectionStrategy";
import {
  findUserStructuredCareerProfile,
  normalizeCompactProfileImport,
  profileJsonStructuredCareerProfile,
  saveImportedProfileForUserIfMissing,
  toProfileJson,
} from "./structuredProfile.service";

function compactText(value: string, max = 140) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd().replace(/[.,;:!?-]+$/, "")}.`;
}

function fallbackJobTitle(rawJobText: string) {
  const firstUsefulLine =
    rawJobText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length >= 4 && line.length <= 90) ?? "Target Role";
  return compactText(firstUsefulLine, 90);
}

function profileSummaryFromStructuredProfile(profile: StructuredCareerProfile | null) {
  return (
    profile?.basics.currentRole ||
    profile?.basics.fullName ||
    "Candidate CV saved by TaylorCV."
  );
}

function parseAnalysisJson(value: unknown) {
  const source = value && typeof value === "object" && !Array.isArray(value)
    ? value as { jobContext?: unknown; sectionSignals?: unknown }
    : {};
  const jobContext = JobContextSchema.safeParse(source.jobContext);
  const sectionSignals = SectionSignalsSchema.safeParse(source.sectionSignals);
  if (!jobContext.success || !sectionSignals.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Job analysis is missing. Please submit the candidate again.",
    });
  }
  return { jobContext: jobContext.data, sectionSignals: sectionSignals.data };
}

function buildPresentationJson(args: {
  sectionStrategy: ReturnType<typeof buildSectionStrategy>;
}) {
  const labels = args.sectionStrategy.preferredSectionLabels;
  return {
    sectionLabelOverrides: {
      skills: labels.skills ?? "Skills",
      experience: labels.experience ?? "Experience",
      education: args.sectionStrategy.combineEducationAndCertifications
        ? labels.educationAndCertifications ?? "Education & Certifications"
        : "Education",
      certifications: labels.certifications ?? "Certifications",
    },
    renderBehavior: {
      combineEducationAndCertifications:
        args.sectionStrategy.combineEducationAndCertifications,
    },
    rationale: args.sectionStrategy.sectionRationaleShort,
    renderWarnings: [],
  } satisfies Prisma.InputJsonValue;
}

function validateAndParseCv(cv: unknown) {
  const validatedCv = StructuredCvDocumentSchema.parse(cv);
  const parsed = parseStructuredCv(validatedCv);
  if (!parsed) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Generated CV failed renderer validation.",
    });
  }

  return { validatedCv, parsed };
}

function normalizeCredentialText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(certification|certified|certificate|credential|licence|license)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isCertificationSection(section: unknown) {
  if (!section || typeof section !== "object" || Array.isArray(section)) return false;
  const value = section as { id?: unknown; label?: unknown; type?: unknown };
  const id = typeof value.id === "string" ? value.id : "";
  const label = typeof value.label === "string" ? value.label : "";
  return (
    value.type === "certifications" ||
    /certification|certifications|credentials|licences|licenses/i.test(`${id} ${label}`)
  );
}

function repairCvCertifications(cv: StructuredCvDocument): StructuredCvDocument {
  const certificationMap = new Map<string, string>();
  for (const certification of cv.certifications) {
    const text = certification.replace(/\s+/g, " ").trim();
    const key = normalizeCredentialText(text);
    if (text && key && !certificationMap.has(key)) {
      certificationMap.set(key, text);
    }
  }
  const certifications = [...certificationMap.values()];
  const certificationKeys = new Set(certificationMap.keys());

  const sections = cv.sections.filter((section) => !isCertificationSection(section));
  const removedSectionIds = new Set(
    cv.sections
      .filter((section) => isCertificationSection(section))
      .flatMap((section) => [section.id, section.label])
      .map((value) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())
  );
  const sectionOrder = cv.sectionOrder.filter((entry) => {
    const normalized = entry.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    return normalized !== "certifications" && !removedSectionIds.has(normalized);
  });

  const education = cv.education.map((item) => ({
    ...item,
    details: item.details.filter((detail) => {
      const key = normalizeCredentialText(detail);
      if (!key) return true;
      if (certificationKeys.has(key)) return false;
      return ![...certificationKeys].some(
        (certificationKey) =>
          key.length >= 12 &&
          certificationKey.length >= 12 &&
          (certificationKey.includes(key) || key.includes(certificationKey))
      );
    }),
  }));

  return {
    ...cv,
    sectionOrder,
    education,
    certifications,
    sections,
  };
}

export async function submitJob(args: {
  applicationId: string;
  rawJobText: string;
}) {
  const title = fallbackJobTitle(args.rawJobText);

  const job = await db.job.upsert({
    where: { applicationId: args.applicationId },
    update: {
      rawText: args.rawJobText,
      title,
      company: null,
      seniority: null,
      summary: "Raw job description saved. TaylorCV will analyse it with the CV during intake.",
      roleDomain: null,
      archetypeHint: null,
      analysisJson: Prisma.JsonNull,
    },
    create: {
      applicationId: args.applicationId,
      rawText: args.rawJobText,
      title,
      company: null,
      seniority: null,
      summary: "Raw job description saved. TaylorCV will analyse it with the CV during intake.",
      roleDomain: null,
      archetypeHint: null,
      analysisJson: Prisma.JsonNull,
    },
  });

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: "job_added",
      currentStep: "job_added",
      dreamRole: title,
      roleArchetype: null,
    },
  });

  return job;
}

export async function submitCandidate(args: {
  applicationId: string;
  rawCvText: string;
  userId?: string | null;
}) {
  const job = await db.job.findUnique({
    where: { applicationId: args.applicationId },
  });

  if (!job) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Job description not found. Please submit a job description first.",
    });
  }

  const intake = await runIntakeGapAgent({
    applicationId: args.applicationId,
    rawJobText: job.rawText,
    rawCvText: args.rawCvText,
  });

  if (!intake.profile) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Intake did not return an imported profile.",
    });
  }

  const { jobContext, sectionSignals } = intake;
  const structuredCareerProfile = normalizeCompactProfileImport(
    intake.profile,
    "intake_import"
  );

  await db.job.update({
    where: { applicationId: args.applicationId },
    data: {
      title: jobContext.roleTitle || job.title,
      company: jobContext.companyName,
      seniority: jobContext.seniority,
      summary: jobContext.roleSummary,
      roleDomain: jobContext.marketOrLocation,
      archetypeHint: jobContext.roleFamily,
      analysisJson: {
        jobContext,
        sectionSignals,
      } as Prisma.InputJsonValue,
    },
  });

  await db.gapAnswer.deleteMany({
    where: { applicationId: args.applicationId },
  });
  await db.gapQuestion.deleteMany({
    where: { applicationId: args.applicationId },
  });

  const storedProfile = {
    sectionSignals,
    structuredCareerProfile,
  };

  const profileRow = await db.candidateProfile.create({
    data: {
      sourceApplicationId: args.applicationId,
      sourceType: "cv_upload",
      rawCvText: args.rawCvText,
      profileJson: toProfileJson(storedProfile) as Prisma.InputJsonValue,
      summary: compactText(profileSummaryFromStructuredProfile(structuredCareerProfile), 700),
      skillsJson: (structuredCareerProfile?.skills ?? []) as unknown as Prisma.InputJsonValue,
      projectsJson: (structuredCareerProfile?.projects ?? []) as unknown as Prisma.InputJsonValue,
      educationJson: (structuredCareerProfile?.education ?? []) as unknown as Prisma.InputJsonValue,
      certificationsJson: (structuredCareerProfile?.credentials ?? []) as unknown as Prisma.InputJsonValue,
      experienceJson: (structuredCareerProfile?.experiences ?? []) as unknown as Prisma.InputJsonValue,
      toolsJson: (structuredCareerProfile?.skills.map((skill) => skill.name) ?? []) as Prisma.InputJsonValue,
      achievementsJson: [] as Prisma.InputJsonValue,
      strongProofCandidatesJson: [] as Prisma.InputJsonValue,
      likelyTopEvidenceJson: [] as Prisma.InputJsonValue,
      cautionNotesJson: sectionSignals.positioningWarnings as Prisma.InputJsonValue,
      scopeOpportunitiesJson: jobContext.proofNeeds as Prisma.InputJsonValue,
      contactInfoJson: (structuredCareerProfile?.basics ?? {}) as Prisma.InputJsonValue,
      linksJson: (structuredCareerProfile?.links ?? []) as unknown as Prisma.InputJsonValue,
    },
  });

  if (args.userId) {
    await saveImportedProfileForUserIfMissing({
      userId: args.userId,
      profile: structuredCareerProfile,
    });
  }

  const createdQuestions = [];
  for (const q of intake.gapQuestions) {
    const created = await db.gapQuestion.create({
      data: {
        applicationId: args.applicationId,
        question: q.question,
        reason: q.targetArea,
        whyItMatters: `This can add stronger proof for ${q.targetArea}.`,
        answerGuidance: "Add concrete scope, tools, outcomes, users, metrics, or delivery detail if you have it.",
        questionJson: {
          shortTitle: q.shortTitle,
          exampleAnswer: "Mention scope, tools, metrics, users, or outcomes if you can.",
          whyThisMatters: `This can add stronger proof for ${q.targetArea}.`,
          targetArea: q.targetArea,
          priority: q.priority,
        } as Prisma.InputJsonValue,
      },
    });
    createdQuestions.push(created);
  }

  const newStatus =
    intake.gapQuestions.length > 0 ? "questions_ready" : "candidate_added";

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: newStatus,
      currentStep: newStatus,
      dreamRole: jobContext.roleTitle,
      roleArchetype: jobContext.roleFamily,
    },
  });

  return {
    candidateProfile: storedProfile,
    candidateProfileRow: profileRow,
    gapQuestions: createdQuestions,
  };
}

export async function submitSavedProfileCandidate(args: {
  applicationId: string;
  userId: string;
}) {
  const [job, savedProfile] = await Promise.all([
    db.job.findUnique({ where: { applicationId: args.applicationId } }),
    findUserStructuredCareerProfile(args.userId),
  ]);

  if (!job) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Job description not found. Please submit a job description first.",
    });
  }

  if (!savedProfile) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Saved profile not found. Please import or create your profile first.",
    });
  }

  const profile = savedProfile.structuredCareerProfile;

  const intake = await runIntakeGapAgent({
    applicationId: args.applicationId,
    rawJobText: job.rawText,
    structuredCareerProfile: profile,
  });
  const { jobContext, sectionSignals } = intake;

  await db.job.update({
    where: { applicationId: args.applicationId },
    data: {
      title: jobContext.roleTitle || job.title,
      company: jobContext.companyName,
      seniority: jobContext.seniority,
      summary: jobContext.roleSummary,
      roleDomain: jobContext.marketOrLocation,
      archetypeHint: jobContext.roleFamily,
      analysisJson: {
        jobContext,
        sectionSignals,
      } as Prisma.InputJsonValue,
    },
  });

  await db.gapAnswer.deleteMany({ where: { applicationId: args.applicationId } });
  await db.gapQuestion.deleteMany({ where: { applicationId: args.applicationId } });

  const storedProfile = {
    sectionSignals,
    structuredCareerProfile: null,
  };

  await db.candidateProfile.create({
    data: {
      sourceApplicationId: args.applicationId,
      userId: args.userId,
      sourceType: "profile",
      profileSource: "saved_structured_profile",
      profileJson: toProfileJson(storedProfile) as Prisma.InputJsonValue,
      summary: compactText(profileSummaryFromStructuredProfile(profile), 700),
      skillsJson: profile.skills as unknown as Prisma.InputJsonValue,
      projectsJson: profile.projects as unknown as Prisma.InputJsonValue,
      educationJson: profile.education as unknown as Prisma.InputJsonValue,
      certificationsJson: profile.credentials as unknown as Prisma.InputJsonValue,
      experienceJson: profile.experiences as unknown as Prisma.InputJsonValue,
      toolsJson: profile.skills.map((skill) => skill.name) as Prisma.InputJsonValue,
      achievementsJson: [] as Prisma.InputJsonValue,
      strongProofCandidatesJson: [] as Prisma.InputJsonValue,
      likelyTopEvidenceJson: [] as Prisma.InputJsonValue,
      cautionNotesJson: sectionSignals.positioningWarnings as Prisma.InputJsonValue,
      scopeOpportunitiesJson: jobContext.proofNeeds as Prisma.InputJsonValue,
      contactInfoJson: profile.basics as Prisma.InputJsonValue,
      linksJson: profile.links as unknown as Prisma.InputJsonValue,
    },
  });

  const createdQuestions = [];
  for (const q of intake.gapQuestions) {
    const created = await db.gapQuestion.create({
      data: {
        applicationId: args.applicationId,
        question: q.question,
        reason: q.targetArea,
        whyItMatters: `This can add stronger proof for ${q.targetArea}.`,
        answerGuidance: "Add concrete scope, tools, outcomes, users, metrics, or delivery detail if you have it.",
        questionJson: {
          shortTitle: q.shortTitle,
          exampleAnswer: "Mention scope, tools, metrics, users, or outcomes if you can.",
          whyThisMatters: `This can add stronger proof for ${q.targetArea}.`,
          targetArea: q.targetArea,
          priority: q.priority,
        } as Prisma.InputJsonValue,
      },
    });
    createdQuestions.push(created);
  }

  const newStatus =
    intake.gapQuestions.length > 0 ? "questions_ready" : "candidate_added";

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: newStatus,
      currentStep: newStatus,
      dreamRole: jobContext.roleTitle,
      roleArchetype: jobContext.roleFamily,
    },
  });

  return {
    candidateProfile: storedProfile,
    gapQuestions: createdQuestions,
  };
}

export async function submitGapAnswers(args: {
  applicationId: string;
  answers: Array<{
    gapQuestionId: string;
    answerText: string | null;
    skipped: boolean;
  }>;
}) {
  for (const answer of args.answers) {
    await db.gapAnswer.create({
      data: {
        gapQuestionId: answer.gapQuestionId,
        applicationId: args.applicationId,
        buttonAnswer: answer.skipped ? "skip" : "yes",
        rawUserAnswer: answer.answerText,
        elaboration: answer.answerText,
        skipped: answer.skipped,
      },
    });

    await db.gapQuestion.update({
      where: { id: answer.gapQuestionId },
      data: { status: answer.skipped ? "skipped" : "answered" },
    });
  }

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: "answers_added",
      currentStep: "answers_added",
    },
  });

  return { success: true };
}

export async function generateCv(args: { applicationId: string }) {
  const [application, job, candidateProfileRow, gapAnswers, gapQuestions] = await Promise.all([
    db.application.findUnique({ where: { id: args.applicationId } }),
    db.job.findUnique({ where: { applicationId: args.applicationId } }),
    db.candidateProfile.findFirst({
      where: { sourceApplicationId: args.applicationId },
      orderBy: { createdAt: "desc" },
    }),
    db.gapAnswer.findMany({
      where: { applicationId: args.applicationId },
      orderBy: { createdAt: "asc" },
    }),
    db.gapQuestion.findMany({
      where: { applicationId: args.applicationId },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  if (!job) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Job description not found.",
    });
  }

  if (!application) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Application not found.",
    });
  }

  if (!candidateProfileRow?.profileJson) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Candidate profile not found.",
    });
  }

  const { jobContext, sectionSignals } = parseAnalysisJson(job.analysisJson);
  const savedUserProfile = application.userId
    ? await findUserStructuredCareerProfile(application.userId)
    : null;
  const structuredCareerProfile =
    savedUserProfile?.structuredCareerProfile ??
    profileJsonStructuredCareerProfile(candidateProfileRow.profileJson);

  if (!structuredCareerProfile) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Structured career profile not found.",
    });
  }

  const gapAnswersForComposer: GapAnswerForComposer[] = gapAnswers
    .filter((answer) => !answer.skipped && answer.rawUserAnswer?.trim())
    .map((answer) => {
      const question = gapQuestions.find((q) => q.id === answer.gapQuestionId);
      return {
        gapQuestionId: answer.gapQuestionId,
        question: question?.question ?? "",
        targetArea: question?.reason ?? "",
        answer: answer.rawUserAnswer ?? "",
      };
    });

  const sectionStrategy = buildSectionStrategy({
    jobContext,
    sectionSignals,
  });

  const composerOutput = await runCvComposerAgent({
    applicationId: args.applicationId,
    structuredCareerProfile,
    jobContext,
    sectionSignals,
    gapAnswers: gapAnswersForComposer,
    sectionStrategy,
  });

  const repaired = repairCvForSectionStrategy({
    cv: repairCvCertifications(composerOutput.cv),
    sectionStrategy,
  });
  const { validatedCv, parsed } = validateAndParseCv(repaired.cv);
  const presentationJson = buildPresentationJson({ sectionStrategy });
  const renderModel = buildCvRenderModel(parsed, presentationJson);

  const qualityWarnings = collectCvQualityWarnings({
    rawJobText: job.rawText,
    jobContext,
    sectionSignals,
    sectionStrategy,
    cv: parsed,
    layoutWarnings: renderModel.metrics.layoutWarnings,
  });
  const combinedQualityWarnings = [...new Set([...qualityWarnings, ...repaired.repairedWarnings])];

  if (process.env.NODE_ENV !== "production" && combinedQualityWarnings.length > 0) {
    console.info(
      "[TaylorCV] composer quality warnings",
      JSON.stringify({
        applicationId: args.applicationId,
        warnings: combinedQualityWarnings,
        sectionStrategy,
        renderMetrics: renderModel.metrics,
      })
    );
  }

  const cvText = [
    validatedCv.header.name,
    validatedCv.header.targetTitle,
    validatedCv.summary,
    ...validatedCv.experience.map((item) => `${item.role ?? ""} ${item.company ?? ""}`.trim()),
    ...validatedCv.projects.map((project) => project.name),
  ]
    .filter(Boolean)
    .join("\n");

  const cvDraft = await db.cvDraft.create({
    data: {
      applicationId: args.applicationId,
      cvJson: validatedCv as unknown as Prisma.InputJsonValue,
      cvText,
      presentationJson,
      builderOutputJson: {
        composerOutput: {
          cv: composerOutput.cv,
        },
        jobContext,
        sectionSignals,
        gapAnswers: gapAnswersForComposer,
        sectionStrategy,
        qualityWarnings: combinedQualityWarnings,
        renderMetrics: renderModel.metrics,
      } as Prisma.InputJsonValue,
    },
  });

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: "cv_ready",
      currentStep: "cv_ready",
    },
  });

  return cvDraft;
}

export async function authorizeExport(args: {
  applicationId: string;
  cvDraftId: string;
}) {
  const cvDraft = await db.cvDraft.findFirst({
    where: {
      id: args.cvDraftId,
      applicationId: args.applicationId,
    },
  });

  if (!cvDraft) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "CV draft not found for this application",
    });
  }

  return { authorized: true };
}
