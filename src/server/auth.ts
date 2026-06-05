import "server-only";

import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  sendMagicLinkEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "~/server/services/email.service";

const googleProvider =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
      }
    : undefined;

const trustedOrigins = Array.from(
  new Set([
    env.BETTER_AUTH_URL,
    ...(env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ])
);

const isDevelopment = env.NODE_ENV === "development";
const authBaseURL = isDevelopment
  ? {
      allowedHosts: ["localhost:3000", "127.0.0.1:3000"],
      fallback: env.BETTER_AUTH_URL,
    }
  : env.BETTER_AUTH_URL;

if (isDevelopment) {
  console.info("[TaylorCV auth] NODE_ENV", env.NODE_ENV);
  console.info("[TaylorCV auth] BETTER_AUTH_URL", env.BETTER_AUTH_URL);
  console.info(
    "[TaylorCV auth] BETTER_AUTH_TRUSTED_ORIGINS",
    env.BETTER_AUTH_TRUSTED_ORIGINS ?? ""
  );
  console.info("[TaylorCV auth] trustedOrigins", trustedOrigins);
  console.info("[TaylorCV auth] baseURL", authBaseURL);
}

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: authBaseURL,
  trustedOrigins,
  database: prismaAdapter(db, {
    provider: "postgresql",
    transaction: true,
  }),
  user: {
    modelName: "user",
    fields: {
      emailVerified: "emailVerified",
    },
  },
  session: {
    modelName: "session",
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  account: {
    modelName: "account",
  },
  verification: {
    modelName: "verification",
  },
  emailAndPassword: {
    enabled: false,
    requireEmailVerification: false,
    async sendResetPassword({ user, url }) {
      await sendPasswordResetEmail({ email: user.email, url });
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendVerificationEmail({ email: user.email, url });
    },
  },
  socialProviders: googleProvider,
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({ email, url });
      },
    }),
    nextCookies(),
  ],
});

export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

export async function getAuthSession(headers: Headers) {
  return auth.api.getSession({ headers }).catch(() => null);
}

function adminEmails() {
  return new Set(
    env.ADMIN_EMAILS.split(/[,\s]+/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

const getServerAdminAccess = cache(async () => {
  const requestHeaders = await headers();
  const session = await getAuthSession(requestHeaders);
  const userId = session?.user?.id ?? null;
  const email = session?.user?.email?.trim().toLowerCase() ?? null;

  if (!userId || !email) {
    return {
      session,
      userId,
      email,
      isSignedIn: false,
      isAllowedEmail: false,
      hasGoogleAccount: false,
      isAdmin: false,
    };
  }

  const allowedEmails = adminEmails();
  const isAllowedEmail = allowedEmails.has(email);
  const googleAccount = await db.account.findFirst({
    where: {
      userId,
      providerId: "google",
    },
    select: {
      id: true,
    },
  });

  return {
    session,
    userId,
    email,
    isSignedIn: true,
    isAllowedEmail,
    hasGoogleAccount: Boolean(googleAccount),
    isAdmin: isAllowedEmail && Boolean(googleAccount),
  };
});

export type AdminAccess = Awaited<ReturnType<typeof getServerAdminAccess>>;

export async function requireAdmin(callbackUrl = "/admin") {
  const access = await getServerAdminAccess();

  if (!access.isSignedIn) {
    redirect(`/auth?mode=sign-in&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return access;
}
