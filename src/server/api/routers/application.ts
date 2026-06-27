import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  analyzeJob,
  extractProfile,
  generateQuestions,
  writeFinalCv,
} from "~/server/cv/agents";
import {
  CandidateVaultSchema,
  FinalCvSchema,
  JobAnalyzeSchema,
  ProfileExtractSchema,
  QuestionsSchema,
  type FinalCv,
  type JobAnalyze,
  type ProfileExtract,
  type QuestionsOutput,
} from "~/server/cv/agentSchemas";
import { runInitialProfileAndJobAnalysis } from "~/server/cv/initialAnalysis";
import { renderPdfWithTypographyFit } from "~/server/cv/renderPdf";

const applicationIdSchema = z.object({
  applicationId: z.string().min(1),
});

const answerSchema = z.object({
  questionId: z.string().min(1),
  answer: z.string().trim().max(4000).optional(),
});

const GENERATION_STALE_MS = 10 * 60 * 1000;
const STALE_GENERATION_ERROR =
  "TaylorCV generation stopped before finishing. Please retry.";

const globalForGeneration = globalThis as typeof globalThis & {
  __taylorCvGenerationJobs?: Set<string>;
};

const generationJobs =
  globalForGeneration.__taylorCvGenerationJobs ??= new Set<string>();

function parseProfile(value: unknown) {
  return ProfileExtractSchema.parse(value);
}

function parseJob(value: unknown) {
  return JobAnalyzeSchema.parse(value);
}

function parseQuestions(value: unknown) {
  return QuestionsSchema.parse(value);
}

function parseFinalCv(value: unknown) {
  return FinalCvSchema.parse(value);
}

function jsonForDb<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

async function importProfileRow(args: {
  db: any;
  userId: string;
  rawCvText: string;
  rawCvFileName?: string | null;
  profile: ProfileExtract;
}) {
  await args.db.user.update({
    where: { id: args.userId },
    data: { name: args.profile.basics.fullName },
  });
  return args.db.careerProfile.upsert({
    where: { userId: args.userId },
    create: {
      userId: args.userId,
      rawCvText: args.rawCvText,
      rawCvFileName: args.rawCvFileName ?? null,
      profileJson: jsonForDb(args.profile),
      seniority: args.profile.seniority,
    },
    update: {
      rawCvText: args.rawCvText,
      rawCvFileName: args.rawCvFileName ?? null,
      profileJson: jsonForDb(args.profile),
      seniority: args.profile.seniority,
    },
  });
}

async function getOwnedApplication(ctx: { db: any; userId: string }, applicationId: string) {
  const application = await ctx.db.cvApplication.findFirst({
    where: { id: applicationId, userId: ctx.userId },
    include: {
      careerProfile: true,
      draft: true,
    },
  });
  if (!application) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Application not found." });
  }
  return application;
}

function staleGenerationCutoff() {
  return new Date(Date.now() - GENERATION_STALE_MS);
}

function isGenerationStale(updatedAt: Date) {
  return updatedAt.getTime() < staleGenerationCutoff().getTime();
}

function applicationStatusForDashboard(application: {
  id: string;
  status: string;
  updatedAt: Date;
  draft: unknown;
}) {
  if (application.draft) return "ready";
  if (
    application.status === "generating" &&
    !generationJobs.has(application.id) &&
    isGenerationStale(application.updatedAt)
  ) {
    return "failed";
  }
  return application.status;
}

async function claimGeneration(args: {
  ctx: { db: any; userId: string };
  applicationId: string;
}) {
  const application = await getOwnedApplication(args.ctx, args.applicationId);
  if (application.draft) {
    await args.ctx.db.cvApplication.update({
      where: { id: application.id },
      data: { status: "ready", error: null },
    });
    return { started: false, status: "ready" as const, cvDraftId: application.draft.id };
  }

  if (application.status === "generating" && generationJobs.has(application.id)) {
    return { started: false, status: "generating" as const };
  }

  const generationClaim = await args.ctx.db.cvApplication.updateMany({
    where: {
      id: application.id,
      userId: args.ctx.userId,
      draft: { is: null },
      OR: [
        { status: { not: "generating" } },
        { status: "generating", updatedAt: { lt: staleGenerationCutoff() } },
      ],
    },
    data: {
      status: "generating",
      error: null,
    },
  });
  if (generationClaim.count !== 1) {
    const existingDraft = await args.ctx.db.cvDraft.findUnique({
      where: { applicationId: application.id },
      select: { id: true },
    });
    if (existingDraft) {
      await args.ctx.db.cvApplication.update({
        where: { id: application.id },
        data: { status: "ready", error: null },
      });
      return { started: false, status: "ready" as const, cvDraftId: existingDraft.id };
    }
    return { started: false, status: "generating" as const };
  }

  return { started: true, status: "generating" as const };
}

async function runGeneration(args: {
  ctx: { db: any; userId: string };
  applicationId: string;
}) {
  const application = await getOwnedApplication(args.ctx, args.applicationId);
  if (application.draft) {
    await args.ctx.db.cvApplication.update({
      where: { id: application.id },
      data: { status: "ready", error: null },
    });
    return { cvDraftId: application.draft.id };
  }

  try {
    const profile = parseProfile(application.careerProfile.profileJson);
    const job = parseJob(application.jobAnalysisJson);
    const questions = parseQuestions(application.questionsJson);

    const rawWriterCv = await writeFinalCv({
      userId: args.ctx.userId,
      applicationId: application.id,
      profile,
      job,
      rawJobText: application.jobText,
      questions,
      answers: application.answersJson ?? [],
      extraNotes: application.extraNotes,
    });

    const finalStructuredCv: FinalCv = parseFinalCv(rawWriterCv);
    const rendered = await renderPdfWithTypographyFit(finalStructuredCv);
    const finalSanitizedCv = rendered.cv;

    if (rendered.metrics.failedToFit) {
      throw new Error(
        "TaylorCV could not fit this CV onto one A4 page with typography adjustments only."
      );
    }

    const warningJson = {
      warnings: [],
      renderMetrics: rendered.metrics,
    };

    const draft = await args.ctx.db.cvDraft.upsert({
      where: { applicationId: application.id },
      create: {
        applicationId: application.id,
        structuredCvJson: finalStructuredCv,
        sanitizedCvJson: finalSanitizedCv,
        html: rendered.html,
        pdfBytes: rendered.pdf,
        renderMetricsJson: rendered.metrics,
      },
      update: {
        structuredCvJson: finalStructuredCv,
        sanitizedCvJson: finalSanitizedCv,
        html: rendered.html,
        pdfBytes: rendered.pdf,
        renderMetricsJson: rendered.metrics,
      },
    });

    await args.ctx.db.cvApplication.update({
      where: { id: application.id },
      data: {
        status: "ready",
        warningJson,
        error: null,
      },
    });

    return { cvDraftId: draft.id };
  } catch (error) {
    await args.ctx.db.cvApplication.update({
      where: { id: application.id },
      data: {
        status: "failed",
        error: error instanceof Error ? error.message : "TaylorCV generation failed.",
      },
    });
    throw error;
  }
}

function startGenerationJob(args: {
  ctx: { db: any; userId: string };
  applicationId: string;
}) {
  if (generationJobs.has(args.applicationId)) return;
  generationJobs.add(args.applicationId);

  void runGeneration(args)
    .catch((error) => {
      console.error("[TaylorCV generation]", args.applicationId, error);
    })
    .finally(() => {
      generationJobs.delete(args.applicationId);
    });
}

export const applicationRouter = createTRPCRouter({
  getDashboardState: protectedProcedure.query(async ({ ctx }) => {
    const [profile, applications] = await Promise.all([
      ctx.db.careerProfile.findUnique({ where: { userId: ctx.userId } }),
      ctx.db.cvApplication.findMany({
        where: { userId: ctx.userId },
        orderBy: { createdAt: "desc" },
        include: { draft: true },
      }),
    ]);
    const vault = profile ? parseProfile(profile.profileJson) : null;

    return {
      profile: profile && vault
        ? {
            id: profile.id,
            seniority: profile.seniority,
            fullName: vault.basics.fullName,
            updatedAt: profile.updatedAt,
          }
        : null,
      vault,
      applications: applications.map((application) => {
        const status = applicationStatusForDashboard(application);
        return {
          id: application.id,
          status,
          targetRole: parseJob(application.jobAnalysisJson).targetRole,
          company: parseJob(application.jobAnalysisJson).company ?? null,
          matchScore: application.matchScore,
          questions: application.questionsJson
            ? parseQuestions(application.questionsJson)
            : null,
          answers: application.answersJson ?? [],
          extraNotes: application.extraNotes,
          warningJson: application.warningJson,
          error:
            status === "failed" && application.status === "generating"
              ? STALE_GENERATION_ERROR
              : application.error,
          createdAt: application.createdAt,
          updatedAt: application.updatedAt,
          hasDraft: Boolean(application.draft),
        };
      }),
    };
  }),

  updateVault: protectedProcedure
    .input(CandidateVaultSchema)
    .mutation(async ({ ctx, input }) => {
      const existingProfile = await ctx.db.careerProfile.findUnique({
        where: { userId: ctx.userId },
      });
      if (!existingProfile) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Upload your current CV before editing the Candidate Vault.",
        });
      }

      const vault = CandidateVaultSchema.parse(input);
      const [row] = await Promise.all([
        ctx.db.careerProfile.update({
          where: { userId: ctx.userId },
          data: {
            profileJson: jsonForDb(vault),
            seniority: vault.seniority,
          },
        }),
        ctx.db.user.update({
          where: { id: ctx.userId },
          data: { name: vault.basics.fullName },
        }),
      ]);

      return { profileId: row.id, vault };
    }),

  createApplication: protectedProcedure
    .input(
      z.object({
        jobText: z.string().min(1).max(30_000),
        rawCvText: z.string().min(1).max(35_000).optional(),
        rawCvFileName: z.string().max(260).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingProfile = await ctx.db.careerProfile.findUnique({
        where: { userId: ctx.userId },
      });

      let profileRow = existingProfile;
      let profile: ProfileExtract | null = existingProfile
        ? parseProfile(existingProfile.profileJson)
        : null;
      let job: JobAnalyze;

      if (!existingProfile && input.rawCvText) {
        const { profile: profileOutput, job: jobOutput } =
          await runInitialProfileAndJobAnalysis({
            profileTask: () =>
              extractProfile({ userId: ctx.userId, rawCvText: input.rawCvText! }),
            jobTask: () =>
              analyzeJob({ userId: ctx.userId, rawJobText: input.jobText }),
          });
        profile = profileOutput;
        job = jobOutput;
        profileRow = await importProfileRow({
          db: ctx.db,
          userId: ctx.userId,
          rawCvText: input.rawCvText,
          rawCvFileName: input.rawCvFileName,
          profile,
        });
      } else {
        if (!profileRow || !profile) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Upload your current CV before creating a tailored CV.",
          });
        }
        job = await analyzeJob({
          userId: ctx.userId,
          rawJobText: input.jobText,
        });
      }

      if (!profileRow || !profile) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Upload your current CV before creating a tailored CV.",
        });
      }
      const careerProfile = profileRow;
      const candidateProfile = profile;

      const application = await ctx.db.cvApplication.create({
        data: {
          userId: ctx.userId,
          careerProfileId: careerProfile.id,
          jobText: input.jobText,
          jobAnalysisJson: job,
          status: "matching",
        },
      });

      const questions = await generateQuestions({
        userId: ctx.userId,
        applicationId: application.id,
        profile: candidateProfile,
        job,
      });

      const updated = await ctx.db.cvApplication.update({
        where: { id: application.id },
        data: {
          matchJson: questions,
          questionsJson: questions,
          matchScore: questions.matchScore,
          status: "questions_ready",
        },
      });

      return {
        applicationId: updated.id,
        questions,
        job,
      };
    }),

  saveAnswers: protectedProcedure
    .input(
      applicationIdSchema.extend({
        answers: z.array(answerSchema).default([]),
        extraNotes: z.string().max(6000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await getOwnedApplication(ctx, input.applicationId);
      await ctx.db.cvApplication.update({
        where: { id: input.applicationId },
        data: {
          answersJson: input.answers,
          extraNotes: input.extraNotes?.trim() || null,
          status: "answers_saved",
        },
      });
      return { success: true };
    }),

  generate: protectedProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      const claim = await claimGeneration({ ctx, applicationId: input.applicationId });
      if (claim.started) {
        startGenerationJob({ ctx, applicationId: input.applicationId });
      }
      return claim;
    }),

  retryGeneration: protectedProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      await getOwnedApplication(ctx, input.applicationId);
      await ctx.db.cvDraft.deleteMany({
        where: { applicationId: input.applicationId },
      });
      const claim = await claimGeneration({ ctx, applicationId: input.applicationId });
      if (claim.started) {
        startGenerationJob({ ctx, applicationId: input.applicationId });
      }
      return claim;
    }),
});
