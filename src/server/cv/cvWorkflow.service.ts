import "server-only";

import { TRPCError } from "@trpc/server";
import type { Prisma } from "../../../generated/prisma/index.js";

import { parseStructuredCv } from "~/lib/cvDocument";
import { db } from "~/server/db";
import { runJobIntakeAgent } from "./agents/jobIntake.agent";
import { runCandidateProfileGapAgent } from "./agents/candidateProfileGap.agent";
import { runCvComposerAgent } from "./agents/cvComposer.agent";
import {
  StructuredCvDocumentSchema,
  type JobAnalysis,
  type CandidateProfileGapOutput,
  type GapAnswerForComposer,
} from "./cvSchemas";

export async function submitJob(args: {
  applicationId: string;
  rawJobText: string;
}) {
  const jobAnalysis = await runJobIntakeAgent({
    applicationId: args.applicationId,
    rawJobText: args.rawJobText,
  });

  await db.job.upsert({
    where: { applicationId: args.applicationId },
    update: {
      rawText: args.rawJobText,
      title: jobAnalysis.targetRoleTitle,
      company: jobAnalysis.companyName,
      seniority: jobAnalysis.seniority,
      summary: jobAnalysis.roleSummary,
      roleDomain: jobAnalysis.market,
      archetypeHint: jobAnalysis.archetype,
      analysisJson: jobAnalysis as unknown as Prisma.InputJsonValue,
    },
    create: {
      applicationId: args.applicationId,
      rawText: args.rawJobText,
      title: jobAnalysis.targetRoleTitle || "Target Role",
      company: jobAnalysis.companyName,
      seniority: jobAnalysis.seniority,
      summary: jobAnalysis.roleSummary || "Job description analysed by TaylorCV.",
      roleDomain: jobAnalysis.market,
      archetypeHint: jobAnalysis.archetype,
      analysisJson: jobAnalysis as unknown as Prisma.InputJsonValue,
    },
  });

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: "job_added",
      currentStep: "job_added",
      dreamRole: jobAnalysis.targetRoleTitle,
    },
  });

  return jobAnalysis;
}

export async function submitCandidate(args: {
  applicationId: string;
  rawCvText: string;
}) {
  const job = await db.job.findUnique({
    where: { applicationId: args.applicationId },
  });

  if (!job || !job.analysisJson) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Job analysis not found. Please submit a job description first.",
    });
  }

  const jobAnalysis = job.analysisJson as unknown as JobAnalysis;

  const output = await runCandidateProfileGapAgent({
    applicationId: args.applicationId,
    jobAnalysis,
    rawCvText: args.rawCvText,
  });

  const profile = output.candidateProfile;

  await db.candidateProfile.create({
    data: {
      sourceApplicationId: args.applicationId,
      sourceType: "cv_upload",
      rawCvText: args.rawCvText,
      profileJson: profile as unknown as Prisma.InputJsonValue,
      summary: profile.summaryFacts.join(". ") || "Candidate profile analysed by TaylorCV.",
      skillsJson: profile.skillsByGroup.map((g) => g.skills).flat() as Prisma.InputJsonValue,
      projectsJson: profile.projects.map((p) => ({ name: p.name, tools: p.tools })) as Prisma.InputJsonValue,
      educationJson: profile.education.map((e) => ({
        institution: e.institution,
        qualification: e.qualification,
        dates: e.dates,
      })) as Prisma.InputJsonValue,
      certificationsJson: profile.certifications.map((c) => c.name) as Prisma.InputJsonValue,
      experienceJson: profile.experiences.map((e) => ({
        title: e.title,
        organization: e.organization,
        tools: e.tools,
      })) as Prisma.InputJsonValue,
      toolsJson: profile.experiences
        .flatMap((e) => e.tools)
        .concat(profile.projects.flatMap((p) => p.tools))
        .filter((v, i, a) => a.indexOf(v) === i) as Prisma.InputJsonValue,
      achievementsJson: profile.experiences
        .flatMap((e) => e.achievementFacts)
        .concat(profile.projects.flatMap((p) => p.achievementFacts)) as Prisma.InputJsonValue,
      contactInfoJson: {
        fullName: profile.identity.fullName,
        professionalTitle: profile.identity.currentTitle,
        location: profile.identity.location,
        email: profile.identity.email,
        phone: profile.identity.phone,
      } as Prisma.InputJsonValue,
      linksJson: {
        linkedin: profile.identity.linkedin,
        github: profile.identity.github,
        portfolio: profile.identity.portfolio,
        other: profile.links,
      } as Prisma.InputJsonValue,
    },
  });

  await db.gapQuestion.deleteMany({
    where: { applicationId: args.applicationId },
  });

  const createdQuestions = [];
  for (const q of output.gapQuestions) {
    const created = await db.gapQuestion.create({
      data: {
        applicationId: args.applicationId,
        question: q.question,
        reason: q.targetArea,
        whyItMatters: q.whyItMatters,
        answerGuidance: q.answerGuidance,
        questionJson: {
          whyThisMatters: q.whyItMatters,
          howYourAnswerHelps: q.answerGuidance,
          expectedAnswerType: q.expectedAnswerType,
          priority: q.priority,
        },
      },
    });
    createdQuestions.push(created);
  }

  const newStatus =
    output.gapQuestions.length > 0 ? "questions_ready" : "candidate_added";

  await db.application.update({
    where: { id: args.applicationId },
    data: {
      status: newStatus,
      currentStep: newStatus,
    },
  });

  return {
    candidateProfile: profile,
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

  if (!job || !job.analysisJson) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Job analysis not found.",
    });
  }

  if (!candidateProfileRow || !candidateProfileRow.profileJson) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Candidate profile not found.",
    });
  }

  const jobAnalysis = job.analysisJson as unknown as JobAnalysis;
  const candidateProfile = candidateProfileRow.profileJson as unknown as CandidateProfileGapOutput["candidateProfile"];

  const gapAnswersForComposer: GapAnswerForComposer[] = gapAnswers
    .filter((a) => !a.skipped && a.rawUserAnswer)
    .map((a) => {
      const question = gapQuestions.find((q) => q.id === a.gapQuestionId);
      return {
        gapQuestionId: a.gapQuestionId,
        question: question?.question ?? "",
        answer: a.rawUserAnswer ?? "",
      };
    });

  const composerOutput = await runCvComposerAgent({
    applicationId: args.applicationId,
    jobAnalysis,
    candidateProfile,
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
    ...validatedCv.experience.map((e) => `${e.role} at ${e.company}`),
    ...validatedCv.projects.map((p) => p.name),
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
        jobAnalysis,
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
