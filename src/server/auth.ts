import "server-only";

import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

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

const localDevOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3002",
  "http://localhost:3003",
  "http://127.0.0.1:3003",
];

function configuredTrustedOrigins() {
  return (env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isLocalOrigin(origin: string) {
  try {
    const url = new URL(origin);
    return ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  } catch {
    return false;
  }
}

const isDevelopment = env.NODE_ENV === "development";
const trustedOrigins = Array.from(
  new Set(
    isDevelopment
      ? [
          ...localDevOrigins,
          ...configuredTrustedOrigins(),
          ...(isLocalOrigin(env.BETTER_AUTH_URL) ? [env.BETTER_AUTH_URL] : []),
        ]
      : [env.BETTER_AUTH_URL, ...configuredTrustedOrigins()]
  )
);

const authBaseURL = isDevelopment
  ? {
      allowedHosts: [
        "localhost:3000",
        "127.0.0.1:3000",
        "localhost:3001",
        "127.0.0.1:3001",
        "localhost:3002",
        "127.0.0.1:3002",
        "localhost:3003",
        "127.0.0.1:3003",
      ],
      fallback: "http://localhost:3000",
    }
  : env.BETTER_AUTH_URL;

if (isDevelopment && process.env.TAYLORCV_DEBUG_AUTH === "true") {
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
