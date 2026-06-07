import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import {
  submitJob as submitJobService,
  submitCandidate as submitCandidateService,
  submitSavedProfileCandidate as submitSavedProfileCandidateService,
  submitGapAnswers as submitGapAnswersService,
  generateCv as generateCvService,
  authorizeExport as authorizeExportService,
} from "~/server/cv/cvWorkflow.service";
import {
  findUserStructuredCareerProfile,
  profileJsonStructuredCareerProfile,
  saveImportedProfileForUserIfMissing,
} from "~/server/cv/structuredProfile.service";

const applicationIdSchema = z.object({
  applicationId: z.string().min(1),
});

const trackingStatusSchema = z.enum([
  "ready",
  "applied",
  "response",
  "interview",
  "offer",
  "accepted",
  "rejected",
]);

async function assertApplicationOwnership(args: {
  applicationId: string;
  anonymousSessionId: string;
  userId?: string | null;
}) {
  const application = await db.application.findFirst({
    where: {
      id: args.applicationId,
      OR: [
        { anonymousSessionId: args.anonymousSessionId },
        ...(args.userId ? [{ userId: args.userId }] : []),
      ],
    },
  });

  if (!application) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Application does not belong to this session",
    });
  }

  return application;
}

export const applicationRouter = createTRPCRouter({
  getLandingActivity: publicProcedure.query(async () => {
    const count = await db.application.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
    return { count };
  }),

  createApplication: publicProcedure.mutation(async ({ ctx }) => {
    const application = await db.application.create({
      data: {
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId ?? null,
        status: "started",
        currentStep: "started",
      },
    });
    return { applicationId: application.id };
  }),

  resetApplication: publicProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      const newApplication = await db.application.create({
        data: {
          anonymousSessionId: ctx.anonymousSessionId,
          userId: ctx.userId ?? null,
          status: "started",
          currentStep: "started",
        },
      });

      return { applicationId: newApplication.id };
    }),

  submitJob: publicProcedure
    .input(
      applicationIdSchema.extend({
        rawJobText: z.string().min(1).max(20_000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      const job = await submitJobService({
        applicationId: input.applicationId,
        rawJobText: input.rawJobText,
      });
      const savedProfile = ctx.userId
        ? await findUserStructuredCareerProfile(ctx.userId)
        : null;

      return { job, hasSavedStructuredProfile: Boolean(savedProfile) };
    }),

  submitCandidate: publicProcedure
    .input(
      applicationIdSchema.extend({
        rawCvText: z.string().min(1).max(30_000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      const result = await submitCandidateService({
        applicationId: input.applicationId,
        rawCvText: input.rawCvText,
        userId: ctx.userId,
      });

      return {
        candidateProfile: result.candidateProfile,
        gapQuestions: result.gapQuestions,
      };
    }),

  submitSavedProfileCandidate: publicProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Sign in to use your saved profile.",
        });
      }

      const result = await submitSavedProfileCandidateService({
        applicationId: input.applicationId,
        userId: ctx.userId,
      });

      return {
        candidateProfile: result.candidateProfile,
        gapQuestions: result.gapQuestions,
      };
    }),

  submitGapAnswers: publicProcedure
    .input(
      applicationIdSchema.extend({
        answers: z.array(
          z.object({
            gapQuestionId: z.string().min(1),
            answerText: z.string().nullable(),
            skipped: z.boolean(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      await submitGapAnswersService({
        applicationId: input.applicationId,
        answers: input.answers,
      });

      return { success: true };
    }),

  generateCv: publicProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      const cvDraft = await generateCvService({
        applicationId: input.applicationId,
      });

      return { cvDraftId: cvDraft.id };
    }),

  getApplicationState: publicProcedure
    .input(applicationIdSchema)
    .query(async ({ ctx, input }) => {
      const application = await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      const [
        job,
        candidateProfileRow,
        gapQuestions,
        gapAnswers,
        cvDraft,
        savedProfile,
      ] = await Promise.all([
        db.job.findUnique({ where: { applicationId: input.applicationId } }),
        db.candidateProfile.findFirst({
          where: { sourceApplicationId: input.applicationId },
          orderBy: { createdAt: "desc" },
        }),
        db.gapQuestion.findMany({
          where: { applicationId: input.applicationId },
          orderBy: { createdAt: "asc" },
        }),
        db.gapAnswer.findMany({
          where: { applicationId: input.applicationId },
          orderBy: { createdAt: "asc" },
        }),
        db.cvDraft.findFirst({
          where: { applicationId: input.applicationId },
          orderBy: { version: "desc" },
        }),
        ctx.userId ? findUserStructuredCareerProfile(ctx.userId) : Promise.resolve(null),
      ]);

      return {
        application,
        job,
        candidateProfileRow,
        gapQuestions,
        gapAnswers,
        cvDraft,
        cvJson: cvDraft?.cvJson ?? null,
        cvText: cvDraft?.cvText ?? null,
        hasSavedStructuredProfile: Boolean(savedProfile),
      };
    }),

  authorizeExport: publicProcedure
    .input(
      applicationIdSchema.extend({
        cvDraftId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      const result = await authorizeExportService({
        applicationId: input.applicationId,
        cvDraftId: input.cvDraftId,
      });

      return result;
    }),

  claimApplication: protectedProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      const application = await assertApplicationOwnership({
        applicationId: input.applicationId,
        anonymousSessionId: ctx.anonymousSessionId,
        userId: ctx.userId,
      });

      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be signed in to claim an application",
        });
      }

      await db.application.update({
        where: { id: input.applicationId },
        data: { userId: ctx.userId },
      });

      const importedProfileRow = await db.candidateProfile.findFirst({
        where: { sourceApplicationId: input.applicationId },
        orderBy: { createdAt: "desc" },
      });
      await saveImportedProfileForUserIfMissing({
        userId: ctx.userId,
        profile: profileJsonStructuredCareerProfile(importedProfileRow?.profileJson),
      });

      return { success: true };
    }),

  listUserApplications: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Must be signed in",
      });
    }

    const applications = await db.application.findMany({
      where: { userId: ctx.userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return { applications };
  }),

  getApplicationExportData: protectedProcedure
    .input(applicationIdSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Must be signed in",
        });
      }

      const application = await db.application.findFirst({
        where: {
          id: input.applicationId,
          userId: ctx.userId,
        },
        include: {
          cvDrafts: {
            orderBy: { version: "desc" },
            take: 1,
          },
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      const cvDraft = application.cvDrafts[0];

      return {
        applicationId: application.id,
        cvJson: cvDraft?.cvJson ?? null,
        cvText: cvDraft?.cvText ?? null,
        presentationJson: cvDraft?.presentationJson ?? null,
      };
    }),

  updateTrackingStatus: protectedProcedure
    .input(
      applicationIdSchema.extend({
        trackingStatus: trackingStatusSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await db.application.findFirst({
        where: {
          id: input.applicationId,
          userId: ctx.userId,
        },
        select: {
          id: true,
        },
      });

      if (!application) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Application not found",
        });
      }

      await db.application.update({
        where: { id: input.applicationId },
        data: { trackingStatus: input.trackingStatus },
      });

      return { success: true };
    }),
});
