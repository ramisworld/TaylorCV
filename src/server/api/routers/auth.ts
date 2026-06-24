import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  updateDashboardProfile: protectedProcedure
    .input(
      z.object({
        fullName: z.string().max(160).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.userId },
        data: { name: input.fullName?.trim() ?? "" },
      });

      return { success: true };
    }),
});
