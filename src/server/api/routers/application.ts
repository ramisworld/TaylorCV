import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  answerGapQuestions,
  createApplication,
  generateCv,
  generateCvStrategy,
  generateGapQuestions,
  getApplicationState,
  resetApplication,
  rewriteCvSection,
  runEvidenceMatching,
  setDreamRole,
  submitCandidateInfo,
  submitJob,
  updateCvSection,
} from "~/server/services/applicationWorkflow.service";

const applicationIdSchema = z.object({
  applicationId: z.string().min(1),
});

export const applicationRouter = createTRPCRouter({
  createApplication: publicProcedure.mutation(({ ctx }) =>
    createApplication({ anonymousSessionId: ctx.anonymousSessionId })
  ),

  setDreamRole: publicProcedure
    .input(
      applicationIdSchema.extend({
        dreamRole: z.string().min(1).max(200),
      })
    )
    .mutation(({ ctx, input }) =>
      setDreamRole({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        dreamRole: input.dreamRole,
      })
    ),

  resetApplication: publicProcedure
    .input(applicationIdSchema)
    .mutation(({ ctx, input }) =>
      resetApplication({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
      })
    ),

  submitJob: publicProcedure
    .input(
      applicationIdSchema.extend({
        rawJobText: z.string().min(1).max(20_000),
      })
    )
    .mutation(({ ctx, input }) =>
      submitJob({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        rawJobText: input.rawJobText,
      })
    ),

  submitCandidateInfo: publicProcedure
    .input(
      applicationIdSchema
        .extend({
          rawCvText: z.string().nullable().optional(),
          rawBackgroundText: z.string().nullable().optional(),
        })
        .refine(
          (input) =>
            (input.rawCvText?.length ?? 0) +
              (input.rawBackgroundText?.length ?? 0) <=
            30_000,
          "Candidate background must be 30,000 characters or fewer"
        )
    )
    .mutation(({ ctx, input }) =>
      submitCandidateInfo({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        rawCvText: input.rawCvText,
        rawBackgroundText: input.rawBackgroundText,
      })
    ),

  runEvidenceMatching: publicProcedure
    .input(applicationIdSchema)
    .mutation(({ ctx, input }) =>
      runEvidenceMatching({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
      })
    ),

  generateGapQuestions: publicProcedure
    .input(applicationIdSchema)
    .mutation(({ ctx, input }) =>
      generateGapQuestions({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
      })
    ),

  answerGapQuestions: publicProcedure
    .input(
      applicationIdSchema.extend({
        answers: z.array(
          z.object({
            gapQuestionId: z.string().min(1),
            answerText: z.string().nullable().optional(),
            skipped: z.boolean().nullable().optional(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) =>
      answerGapQuestions({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        answers: input.answers,
      })
    ),

  generateCvStrategy: publicProcedure
    .input(applicationIdSchema)
    .mutation(({ ctx, input }) =>
      generateCvStrategy({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
      })
    ),

  generateCv: publicProcedure
    .input(
      applicationIdSchema.extend({
        strategyId: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) =>
      generateCv({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        strategyId: input.strategyId,
      })
    ),

  rewriteCvSection: publicProcedure
    .input(
      applicationIdSchema.extend({
        cvDraftId: z.string().min(1),
        sectionId: z.string().min(1),
        instruction: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) =>
      rewriteCvSection({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        cvDraftId: input.cvDraftId,
        sectionId: input.sectionId,
        instruction: input.instruction,
      })
    ),

  updateCvSection: publicProcedure
    .input(
      applicationIdSchema.extend({
        cvDraftId: z.string().min(1),
        sectionId: z.string().min(1),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) =>
      updateCvSection({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
        cvDraftId: input.cvDraftId,
        sectionId: input.sectionId,
        content: input.content,
      })
    ),

  getApplicationState: publicProcedure
    .input(applicationIdSchema)
    .query(({ ctx, input }) =>
      getApplicationState({
        anonymousSessionId: ctx.anonymousSessionId,
        applicationId: input.applicationId,
      })
    ),
});
