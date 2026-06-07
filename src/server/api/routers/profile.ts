import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  emptyStructuredCareerProfile,
  findUserStructuredCareerProfile,
  normalizeStructuredCareerProfile,
  saveUserStructuredCareerProfile,
} from "~/server/cv/structuredProfile.service";
import { StructuredCareerProfileSchema } from "~/server/cv/cvSchemas";

export const profileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const existing = await findUserStructuredCareerProfile(ctx.userId);
    return {
      profile:
        existing?.structuredCareerProfile ??
        emptyStructuredCareerProfile({
          name: ctx.authSession?.user?.name,
          email: ctx.authSession?.user?.email,
        }),
      hasSavedProfile: Boolean(existing),
    };
  }),

  save: protectedProcedure
    .input(
      z.object({
        profile: StructuredCareerProfileSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const profile = normalizeStructuredCareerProfile(input.profile, "user_edited");
      await ctx.db.user.update({
        where: { id: ctx.userId },
        data: { name: profile.basics.fullName },
      });
      const saved = await saveUserStructuredCareerProfile({
        userId: ctx.userId,
        profile,
      });
      return { profile: saved };
    }),
});
