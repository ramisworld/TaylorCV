import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const emailEnabled = process.env.ENABLE_EMAIL === "true";
const realAiEnabled = process.env.USE_MOCK_AI === "false";

/** @param {string} message */
const requiredSecret = (message) =>
  z.string().min(32, message);

/** @param {boolean} enabled @param {string} message */
const requiredWhen = (enabled, message) =>
  z
    .string()
    .min(1)
    .optional()
    .refine((value) => !enabled || !!value, { message });

const optionalWhenMock = requiredWhen(
  realAiEnabled,
  'Required when USE_MOCK_AI is "false"'
);

const requiredWhenEmailEnabled = requiredWhen(
  emailEnabled,
  'Required when ENABLE_EMAIL is "true"'
);

const commaSeparatedOrigins = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true;
      return value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
        .every((origin) => {
          try {
            const url = new URL(origin);
            return url.origin === origin.replace(/\/$/, "");
          } catch {
            return false;
          }
        });
    },
    {
      message:
        "BETTER_AUTH_TRUSTED_ORIGINS must be a comma-separated list of URL origins",
    }
  );

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: requiredSecret(
      "BETTER_AUTH_SECRET must be at least 32 characters"
    ),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_TRUSTED_ORIGINS: commaSeparatedOrigins,
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    RESEND_API_KEY: requiredWhenEmailEnabled,
    AUTH_EMAIL_FROM: requiredWhenEmailEnabled,
    ENABLE_EMAIL: z.enum(["true", "false"]).default("false"),
    OPENAI_API_KEY: optionalWhenMock,
    OPENAI_PROFILE_MODEL: z.string().min(1).default("gpt-5.4-nano"),
    OPENAI_JOB_MODEL: z.string().min(1).default("gpt-5.4-nano"),
    OPENAI_QUESTIONS_MODEL: z.string().min(1).default("gpt-5.4-nano"),
    OPENAI_WRITER_MODEL: z.string().min(1).default("gpt-5.5"),
    USE_MOCK_AI: z.enum(["true", "false"]),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    NEXT_PUBLIC_ENABLE_TRPC_LOGGER: z.enum(["true", "false"]).optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_TRUSTED_ORIGINS: process.env.BETTER_AUTH_TRUSTED_ORIGINS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    AUTH_EMAIL_FROM: process.env.AUTH_EMAIL_FROM,
    ENABLE_EMAIL: process.env.ENABLE_EMAIL,
    NEXT_PUBLIC_ENABLE_TRPC_LOGGER:
      process.env.NEXT_PUBLIC_ENABLE_TRPC_LOGGER,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_PROFILE_MODEL: process.env.OPENAI_PROFILE_MODEL,
    OPENAI_JOB_MODEL: process.env.OPENAI_JOB_MODEL,
    OPENAI_QUESTIONS_MODEL: process.env.OPENAI_QUESTIONS_MODEL,
    OPENAI_WRITER_MODEL: process.env.OPENAI_WRITER_MODEL,
    USE_MOCK_AI: process.env.USE_MOCK_AI,
    NODE_ENV: process.env.NODE_ENV,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
