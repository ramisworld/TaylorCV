import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
});
