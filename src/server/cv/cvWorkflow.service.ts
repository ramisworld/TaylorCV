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
  IntakeGapOutputSchema,
  StoredCandidateProfileJsonSchema,
  StructuredCvDocumentSchema,
  type CandidateBrief,
  type DeterministicCandidateBasics,
  type GapAnswerForComposer,
  type JobBrief,
  type StoredCandidateProfile,
} from "./cvSchemas";
import { extractCandidateBasics } from "./extractCandidateBasics";
import { buildSectionStrategy } from "./sectionStrategy";

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

function profileSummary(candidateBrief: CandidateBrief) {
  return (
    candidateBrief.possibleHeadline ||
    candidateBrief.strongestEvidence.join(". ") ||
    candidateBrief.relevantSignals.join(". ") ||
    "Candidate CV saved by TaylorCV."
  );
}

function serializeSkills(candidateBrief: CandidateBrief) {
  return candidateBrief.relevantSignals.filter((signal) =>
    /typescript|javascript|python|sql|react|next|node|postgres|prisma|openai|aws|azure|figma|excel|salesforce|seo|google ads/i.test(
      signal
    )
  );
}

function normalizeStoredIntake(value: unknown) {
  const parsed = IntakeGapOutputSchema.shape.jobBrief.safeParse(
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as { jobBrief?: unknown }).jobBrief
      : value
  );
  return parsed.success ? parsed.data : null;
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

function parseStoredCandidateProfile(value: unknown): StoredCandidateProfile {
  const result = StoredCandidateProfileJsonSchema.safeParse(value);
  if (!result.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Candidate profile is invalid. Please submit the CV again.",
    });
  }
  return result.data;
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

  const deterministicBasics = extractCandidateBasics(args.rawCvText);
  const intake = await runIntakeGapAgent({
    applicationId: args.applicationId,
    rawJobText: job.rawText,
    rawCvText: args.rawCvText,
  });

  const { jobBrief, candidateBrief } = intake;

  await db.job.update({
    where: { applicationId: args.applicationId },
    data: {
      title: jobBrief.targetRoleTitle || job.title,
      company: jobBrief.companyName,
      seniority: jobBrief.seniority,
      summary: jobBrief.roleSummary,
      roleDomain: jobBrief.marketOrLocation,
      archetypeHint: jobBrief.archetype,
      analysisJson: { jobBrief } as Prisma.InputJsonValue,
    },
  });

  await db.gapAnswer.deleteMany({
    where: { applicationId: args.applicationId },
  });
  await db.gapQuestion.deleteMany({
    where: { applicationId: args.applicationId },
  });

  const storedProfile = {
    candidateBrief,
    strategySignals: intake.strategySignals,
    deterministicBasics,
  } satisfies StoredCandidateProfile;

  const profileRow = await db.candidateProfile.create({
    data: {
      sourceApplicationId: args.applicationId,
      sourceType: "cv_upload",
      rawCvText: args.rawCvText,
      profileJson: storedProfile as unknown as Prisma.InputJsonValue,
      summary: compactText(profileSummary(candidateBrief), 700),
      skillsJson: serializeSkills(candidateBrief) as Prisma.InputJsonValue,
      projectsJson: [] as Prisma.InputJsonValue,
      educationJson: [] as Prisma.InputJsonValue,
      certificationsJson: [] as Prisma.InputJsonValue,
      experienceJson: [] as Prisma.InputJsonValue,
      toolsJson: serializeSkills(candidateBrief) as Prisma.InputJsonValue,
      achievementsJson: candidateBrief.strongestEvidence as Prisma.InputJsonValue,
      strongProofCandidatesJson: candidateBrief.strongestEvidence as Prisma.InputJsonValue,
      likelyTopEvidenceJson: candidateBrief.usefulSections as Prisma.InputJsonValue,
      cautionNotesJson: candidateBrief.warnings as Prisma.InputJsonValue,
      scopeOpportunitiesJson: candidateBrief.missingOrWeakProof as Prisma.InputJsonValue,
      contactInfoJson: {
        fullName: deterministicBasics.possibleName,
        professionalTitle: candidateBrief.possibleHeadline,
        location: null,
        email: deterministicBasics.email,
        phone: deterministicBasics.phone,
      } as Prisma.InputJsonValue,
      linksJson: {
        linkedin: deterministicBasics.linkedin,
        github: deterministicBasics.github,
        portfolio: deterministicBasics.portfolio,
        other: deterministicBasics.otherUrls,
      } as Prisma.InputJsonValue,
    },
  });

  const createdQuestions = [];
  for (const q of intake.gapQuestions) {
    const created = await db.gapQuestion.create({
      data: {
        applicationId: args.applicationId,
        question: q.question,
        reason: q.targetArea,
        whyItMatters: q.whyItMatters,
        answerGuidance: q.exampleAnswer,
        questionJson: {
          shortTitle: q.shortTitle,
          exampleAnswer: q.exampleAnswer,
          whyThisMatters: q.whyItMatters,
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
      dreamRole: jobBrief.targetRoleTitle,
      roleArchetype: jobBrief.archetype,
    },
  });

  return {
    candidateProfile: storedProfile,
    candidateProfileRow: profileRow,
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
  const [job, candidateProfileRow, gapAnswers, gapQuestions] = await Promise.all([
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

  if (!candidateProfileRow?.rawCvText || !candidateProfileRow.profileJson) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Candidate profile not found.",
    });
  }

  const jobBrief = normalizeStoredIntake(job.analysisJson);
  const storedCandidateProfile = parseStoredCandidateProfile(candidateProfileRow.profileJson);

  const gapAnswersForComposer: GapAnswerForComposer[] = gapAnswers
    .filter((answer) => !answer.skipped && answer.rawUserAnswer?.trim())
    .map((answer) => {
      const question = gapQuestions.find((q) => q.id === answer.gapQuestionId);
      return {
        gapQuestionId: answer.gapQuestionId,
        question: question?.question ?? "",
        targetArea: question?.reason ?? "",
        whyItMatters: question?.whyItMatters ?? "",
        answer: answer.rawUserAnswer ?? "",
      };
    });

  const sectionStrategy = buildSectionStrategy({
    jobBrief,
    candidateBrief: storedCandidateProfile.candidateBrief,
    strategySignals: storedCandidateProfile.strategySignals,
  });

  const composerOutput = await runCvComposerAgent({
    applicationId: args.applicationId,
    rawJobText: job.rawText,
    rawCvText: candidateProfileRow.rawCvText,
    jobBrief,
    candidateBrief: storedCandidateProfile.candidateBrief,
    strategySignals: storedCandidateProfile.strategySignals,
    deterministicBasics: storedCandidateProfile.deterministicBasics,
    gapAnswers: gapAnswersForComposer,
    sectionStrategy,
  });

  const repaired = repairCvForSectionStrategy({
    cv: composerOutput.cv,
    sectionStrategy,
  });
  const repairedComposerOutput = {
    ...composerOutput,
    blueprint: {
      ...composerOutput.blueprint,
      sectionOrder: repaired.cv.sectionOrder,
    },
    cv: repaired.cv,
  };
  const { validatedCv, parsed } = validateAndParseCv(repairedComposerOutput.cv);
  const presentationJson = buildPresentationJson({ sectionStrategy });
  const renderModel = buildCvRenderModel(parsed, presentationJson);

  const qualityWarnings = collectCvQualityWarnings({
    rawJobText: job.rawText,
    jobBrief,
    candidateBrief: storedCandidateProfile.candidateBrief,
    sectionStrategy,
    blueprint: repairedComposerOutput.blueprint,
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
          blueprint: composerOutput.blueprint,
          cv: composerOutput.cv,
        },
        blueprint: repairedComposerOutput.blueprint,
        jobBrief,
        candidateBrief: storedCandidateProfile.candidateBrief,
        strategySignals: storedCandidateProfile.strategySignals,
        deterministicBasics: storedCandidateProfile.deterministicBasics,
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
