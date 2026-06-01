import "server-only";

import { TRPCError } from "@trpc/server";
import { Prisma } from "../../../generated/prisma/index.js";

import { parseStructuredCv } from "~/lib/cvDocument";
import { db } from "~/server/db";
import { runCvComposerAgent } from "./agents/cvComposer.agent";
import { runIntakeGapAgent } from "./agents/intakeGap.agent";
import {
  IntakeGapOutputSchema,
  StructuredCvDocumentSchema,
  type CandidateContext,
  type GapAnswerForComposer,
  type JobContext,
} from "./cvSchemas";

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

function profileSummary(candidateContext: CandidateContext) {
  return (
    candidateContext.summaryFacts.join(". ") ||
    candidateContext.notableEvidence.join(". ") ||
    "Candidate CV saved by TaylorCV."
  );
}

function serializeSkills(candidateContext: CandidateContext) {
  return candidateContext.skillsByGroup.flatMap((group) => group.skills);
}

function normalizeStoredIntake(value: unknown) {
  const parsed = IntakeGapOutputSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
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

  const intake = await runIntakeGapAgent({
    applicationId: args.applicationId,
    rawJobText: job.rawText,
    rawCvText: args.rawCvText,
  });

  const { jobContext, candidateContext } = intake;

  await db.job.update({
    where: { applicationId: args.applicationId },
    data: {
      title: jobContext.targetRoleTitle || job.title,
      company: jobContext.companyName,
      seniority: jobContext.seniority,
      summary: jobContext.roleSummary,
      roleDomain: jobContext.marketOrLocation,
      archetypeHint: jobContext.archetype,
      analysisJson: intake as unknown as Prisma.InputJsonValue,
    },
  });

  await db.gapAnswer.deleteMany({
    where: { applicationId: args.applicationId },
  });
  await db.gapQuestion.deleteMany({
    where: { applicationId: args.applicationId },
  });

  const profileRow = await db.candidateProfile.create({
    data: {
      sourceApplicationId: args.applicationId,
      sourceType: "cv_upload",
      rawCvText: args.rawCvText,
      profileJson: candidateContext as unknown as Prisma.InputJsonValue,
      summary: compactText(profileSummary(candidateContext), 700),
      skillsJson: serializeSkills(candidateContext) as Prisma.InputJsonValue,
      projectsJson: candidateContext.projects.map((project) => ({
        name: project.name,
        tools: project.tools,
        links: project.links,
      })) as Prisma.InputJsonValue,
      educationJson: candidateContext.education.map((item) => ({
        institution: item.institution,
        qualification: item.qualification,
        dates: item.dates,
        details: item.details,
        awardsOrScholarships: item.awardsOrScholarships,
      })) as Prisma.InputJsonValue,
      certificationsJson: candidateContext.certifications.map((item) => ({
        name: item.name,
        issuer: item.issuer,
        date: item.date,
        scoreOrDetail: item.scoreOrDetail,
        notes: item.notes,
      })) as Prisma.InputJsonValue,
      experienceJson: candidateContext.experiences.map((experience) => ({
        title: experience.title,
        organization: experience.organization,
        tools: experience.tools,
        metrics: experience.metrics,
      })) as Prisma.InputJsonValue,
      toolsJson: candidateContext.experiences
        .flatMap((experience) => experience.tools)
        .concat(candidateContext.projects.flatMap((project) => project.tools))
        .filter((value, index, values) => values.indexOf(value) === index) as Prisma.InputJsonValue,
      achievementsJson: candidateContext.experiences
        .flatMap((experience) => experience.achievementFacts)
        .concat(candidateContext.projects.flatMap((project) => project.achievementFacts))
        .concat(candidateContext.notableEvidence) as Prisma.InputJsonValue,
      strongProofCandidatesJson: candidateContext.notableEvidence as Prisma.InputJsonValue,
      likelyTopEvidenceJson: candidateContext.sourceStructure as unknown as Prisma.InputJsonValue,
      cautionNotesJson: candidateContext.warnings as Prisma.InputJsonValue,
      scopeOpportunitiesJson: candidateContext.weakOrMissingAreas as Prisma.InputJsonValue,
      contactInfoJson: {
        fullName: candidateContext.identity.fullName,
        professionalTitle: candidateContext.identity.currentTitle,
        location: candidateContext.identity.location,
        email: candidateContext.identity.email,
        phone: candidateContext.identity.phone,
      } as Prisma.InputJsonValue,
      linksJson: {
        linkedin: candidateContext.identity.linkedin,
        github: candidateContext.identity.github,
        portfolio: candidateContext.identity.portfolio,
        other: candidateContext.links,
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
        answerGuidance: q.answerGuidance,
        questionJson: {
          tinyExample: q.tinyExample,
          whyThisMatters: q.whyItMatters,
          howYourAnswerHelps: q.answerGuidance,
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
      dreamRole: jobContext.targetRoleTitle,
      roleArchetype: jobContext.archetype,
    },
  });

  return {
    candidateProfile: candidateContext,
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

  const storedIntake = normalizeStoredIntake(job.analysisJson);
  const candidateContext = candidateContextFromJson(candidateProfileRow.profileJson);

  const gapAnswersForComposer: GapAnswerForComposer[] = gapAnswers
    .filter((answer) => !answer.skipped && answer.rawUserAnswer?.trim())
    .map((answer) => {
      const question = gapQuestions.find((q) => q.id === answer.gapQuestionId);
      return {
        gapQuestionId: answer.gapQuestionId,
        question: question?.question ?? "",
        answer: answer.rawUserAnswer ?? "",
      };
    });

  const composerOutput = await runCvComposerAgent({
    applicationId: args.applicationId,
    rawJobText: job.rawText,
    rawCvText: candidateProfileRow.rawCvText,
    jobContext: storedIntake?.jobContext ?? null,
    candidateContext,
    gapAnswers: gapAnswersForComposer,
  });

  const validatedCv = StructuredCvDocumentSchema.parse(composerOutput.cv);

  const parsed = parseStructuredCv(validatedCv);
  if (!parsed) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Generated CV failed renderer validation.",
    });
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
      builderOutputJson: {
        blueprint: composerOutput.blueprint,
        jobContext: storedIntake?.jobContext ?? null,
        candidateContext,
        gapAnswers: gapAnswersForComposer,
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

function candidateContextFromJson(value: unknown): CandidateContext {
  const result = IntakeGapOutputSchema.shape.candidateContext.safeParse(value);
  if (!result.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Candidate profile is invalid. Please submit the CV again.",
    });
  }
  return result.data;
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
