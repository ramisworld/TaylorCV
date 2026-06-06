import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

function adminEmails() {
  return new Set(
    env.ADMIN_EMAILS.split(/[,\s]+/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

export const authRouter = createTRPCRouter({
  getAccess: protectedProcedure.query(async ({ ctx }) => {
    const email = ctx.authSession?.user?.email?.trim().toLowerCase() ?? "";
    const isAllowedEmail = adminEmails().has(email);

    if (!isAllowedEmail) {
      return { isAdmin: false };
    }

    const googleAccount = await ctx.db.account.findFirst({
      where: {
        userId: ctx.userId,
        providerId: "google",
      },
      select: {
        id: true,
      },
    });

    return {
      isAdmin: Boolean(googleAccount),
    };
  }),

  updateDashboardProfile: protectedProcedure
    .input(
      z.object({
        fullName: z.string().max(160).optional(),
        location: z.string().max(180).optional(),
        linkedIn: z.string().max(500).optional(),
        github: z.string().max(500).optional(),
        portfolio: z.string().max(500).optional(),
        otherLinks: z.string().max(2000).optional(),
        currentTargetTitle: z.string().max(180).optional(),
        baseCv: z.string().max(30_000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fullName = input.fullName?.trim() ?? "";

      await ctx.db.user.update({
        where: { id: ctx.userId },
        data: { name: fullName },
      });

      const candidateProfile = await ctx.db.candidateProfile.findFirst({
        where: {
          userId: ctx.userId,
          archivedAt: null,
        },
        orderBy: { updatedAt: "desc" },
        select: { id: true },
      });

      const profileData = {
        rawCvText: input.baseCv?.trim() || null,
        contactInfoJson: {
          fullName,
          email: ctx.authSession?.user?.email ?? "",
          location: input.location?.trim() ?? "",
          currentTargetTitle: input.currentTargetTitle?.trim() ?? "",
        },
        linksJson: {
          linkedIn: input.linkedIn?.trim() ?? "",
          github: input.github?.trim() ?? "",
          portfolio: input.portfolio?.trim() ?? "",
          otherLinks: input.otherLinks?.trim() ?? "",
        },
      };

      if (candidateProfile) {
        await ctx.db.candidateProfile.update({
          where: { id: candidateProfile.id },
          data: profileData,
        });
      } else if (
        profileData.rawCvText ||
        profileData.contactInfoJson.location ||
        profileData.contactInfoJson.currentTargetTitle ||
        profileData.linksJson.linkedIn ||
        profileData.linksJson.github ||
        profileData.linksJson.portfolio ||
        profileData.linksJson.otherLinks
      ) {
        await ctx.db.candidateProfile.create({
          data: {
            userId: ctx.userId,
            sourceType: "manual",
            profileSource: "dashboard_profile",
            summary: "",
            skillsJson: [],
            projectsJson: [],
            educationJson: [],
            certificationsJson: [],
            experienceJson: [],
            toolsJson: [],
            achievementsJson: [],
            ...profileData,
          },
        });
      }

      return { success: true };
    }),
});
