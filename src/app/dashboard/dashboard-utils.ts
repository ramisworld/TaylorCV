import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { parseStructuredCv } from "~/lib/cvDocument";
import { getAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { normalizeTrackerStatus } from "./tracking-status";

export async function requireDashboardUser(callbackUrl: string) {
  const session = await getAuthSession(await headers());
  const userId = session?.user?.id;

  if (!userId) {
    redirect(`/auth?mode=sign-in&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return {
    id: userId,
    email: session.user.email,
    name: session.user.name ?? "",
  };
}

export async function getDashboardApplications(userId: string) {
  return db.application.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      job: true,
      cvDrafts: {
        orderBy: { version: "desc" },
        take: 1,
      },
      gapQuestions: {
        orderBy: { createdAt: "asc" },
      },
      gapAnswers: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export type DashboardApplication = Awaited<
  ReturnType<typeof getDashboardApplications>
>[number];

export async function getDashboardApplication(userId: string, applicationId: string) {
  return db.application.findFirst({
    where: {
      id: applicationId,
      userId,
    },
    include: {
      job: true,
      cvDrafts: {
        orderBy: { version: "desc" },
        take: 1,
      },
      gapQuestions: {
        orderBy: { createdAt: "asc" },
      },
      gapAnswers: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export function getApplicationTitle(application: DashboardApplication) {
  return (
    application.job?.title?.trim() ||
    application.dreamRole?.trim() ||
    "Untitled application"
  );
}

export function getCompanyName(application: DashboardApplication) {
  return application.job?.company?.trim() || "Company not set";
}

export function getLatestDraft(application: DashboardApplication) {
  return application.cvDrafts[0] ?? null;
}

export function getParsedLatestCv(application: DashboardApplication) {
  const draft = getLatestDraft(application);
  if (!draft) return null;
  const cv = parseStructuredCv(draft.cvJson);
  if (!cv) return null;
  return {
    draft,
    cv,
  };
}

export function relativeTime(value: Date) {
  const diffMs = Date.now() - value.getTime();
  const seconds = Math.max(0, Math.floor(diffMs / 1000));
  if (seconds < 45) return "now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks}w ago`;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(value);
}

export function compactDate(value: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

export function calculateMetrics(applications: DashboardApplication[]) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const responseStatuses = new Set(["response", "interview", "offer", "accepted"]);
  const interviewStatuses = new Set(["interview", "offer", "accepted"]);

  const createdThisMonth = applications.filter(
    (application) => application.createdAt >= monthStart
  ).length;
  const responses = applications.filter((application) =>
    responseStatuses.has(normalizeTrackerStatus(application.trackingStatus))
  );
  const interviews = applications.filter((application) =>
    interviewStatuses.has(normalizeTrackerStatus(application.trackingStatus))
  );
  const responsesThisWeek = responses.filter(
    (application) => application.updatedAt >= weekStart
  ).length;
  const interviewsThisWeek = interviews.filter(
    (application) => application.updatedAt >= weekStart
  ).length;

  return {
    applications: applications.length,
    applicationsSubtext: `↑ ${createdThisMonth} this month`,
    responses: responses.length,
    responsesSubtext:
      responses.length === 0 ? "No responses yet" : `↑ ${responsesThisWeek} this week`,
    interviews: interviews.length,
    interviewsSubtext:
      interviews.length === 0 ? "No interviews yet" : `↑ ${interviewsThisWeek} this week`,
  };
}

export function companyLogoPath(companyName: string) {
  const key = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const known = new Set([
    "airbnb",
    "amazon",
    "atlassian",
    "canva",
    "databricks",
    "deloitte",
    "figma",
    "google",
    "hubspot",
    "microsoft",
    "openai",
    "pwc",
    "shopify",
    "slack",
    "spacex-x",
    "stripe",
  ]);

  return known.has(key) ? `/assets/company-logos/${key}.svg` : null;
}
