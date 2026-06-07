import { applicationRouter } from "~/server/api/routers/application";
import { authRouter } from "~/server/api/routers/auth";
import { billingRouter } from "~/server/api/routers/billing";
import { profileRouter } from "~/server/api/routers/profile";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  application: applicationRouter,
  auth: authRouter,
  billing: billingRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
