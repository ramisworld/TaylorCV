import "server-only";

import { db } from "~/server/db";

function applicationSearchWhere(search: string) {
  const q = search.trim();
  if (!q) return {};

  return {
    OR: [
      { id: { contains: q, mode: "insensitive" as const } },
      { dreamRole: { contains: q, mode: "insensitive" as const } },
      { anonymousSessionId: { contains: q, mode: "insensitive" as const } },
      { user: { is: { email: { contains: q, mode: "insensitive" as const } } } },
      { job: { is: { title: { contains: q, mode: "insensitive" as const } } } },
      { job: { is: { company: { contains: q, mode: "insensitive" as const } } } },
    ],
  };
}

function summarizeAgentRuns<
  T extends {
    applicationId: string;
    agentName: string;
    durationMs: number | null;
    estimatedCostUsd: number | null;
  },
>(agentRuns: T[]) {
  const summary = new Map<
    string,
    {
      totalEstimatedCostUsd: number;
      latestGenerationDurationMs: number | null;
    }
  >();

  for (const run of agentRuns) {
    const current =
      summary.get(run.applicationId) ?? {
        totalEstimatedCostUsd: 0,
        latestGenerationDurationMs: null,
      };

    current.totalEstimatedCostUsd += run.estimatedCostUsd ?? 0;
    if (run.agentName === "cvComposer" && current.latestGenerationDurationMs == null) {
      current.latestGenerationDurationMs = run.durationMs;
    }

    summary.set(run.applicationId, current);
  }

  return summary;
}

export async function getAdminDashboardData() {
  const slowRunThresholdMs = 30_000;
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    anonymousSessions,
    applications,
    generatedCvDrafts,
    failedGenerations,
    generationAverages,
    totalAgentCost,
    composerTotalCost,
    intakeTotalCost,
    recentAgentRunsCount,
    latestApplications,
    latestCvDrafts,
    recentProblemRuns,
  ] = await Promise.all([
    db.user.count(),
    db.anonymousSession.count(),
    db.application.count(),
    db.cvDraft.count(),
    db.agentRun.count({
      where: {
        agentName: "cvComposer",
        status: { not: "success" },
      },
    }),
    db.agentRun.aggregate({
      where: {
        agentName: "cvComposer",
        status: "success",
      },
      _avg: {
        durationMs: true,
        estimatedCostUsd: true,
      },
    }),
    db.agentRun.aggregate({
      _sum: {
        estimatedCostUsd: true,
      },
    }),
    db.agentRun.aggregate({
      where: {
        agentName: "cvComposer",
      },
      _sum: {
        estimatedCostUsd: true,
      },
    }),
    db.agentRun.aggregate({
      where: {
        agentName: "intakeGap",
      },
      _sum: {
        estimatedCostUsd: true,
      },
    }),
    db.agentRun.count({
      where: {
        createdAt: {
          gte: last24Hours,
        },
      },
    }),
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        createdAt: true,
        status: true,
        dreamRole: true,
        anonymousSessionId: true,
        user: {
          select: {
            email: true,
          },
        },
        job: {
          select: {
            title: true,
            company: true,
          },
        },
        cvDrafts: {
          orderBy: [{ version: "desc" }, { createdAt: "desc" }],
          take: 1,
          select: {
            id: true,
            version: true,
            createdAt: true,
          },
        },
      },
    }),
    db.cvDraft.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        version: true,
        createdAt: true,
        applicationId: true,
        application: {
          select: {
            id: true,
            dreamRole: true,
            status: true,
            job: {
              select: {
                company: true,
                title: true,
              },
            },
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    }),
    db.agentRun.findMany({
      where: {
        OR: [
          { status: { not: "success" } },
          { durationMs: { gte: slowRunThresholdMs } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        applicationId: true,
        agentName: true,
        status: true,
        model: true,
        durationMs: true,
        estimatedCostUsd: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    stats: {
      totalUsers,
      anonymousSessions,
      applications,
      generatedCvDrafts,
      failedGenerations,
      averageGenerationTimeMs: generationAverages._avg.durationMs ?? null,
      averageEstimatedCostUsd: generationAverages._avg.estimatedCostUsd ?? null,
      totalEstimatedCostUsd: totalAgentCost._sum.estimatedCostUsd ?? 0,
      totalComposerCostUsd: composerTotalCost._sum.estimatedCostUsd ?? 0,
      totalIntakeCostUsd: intakeTotalCost._sum.estimatedCostUsd ?? 0,
      recentAgentRunsCount,
    },
    latestApplications,
    latestCvDrafts,
    recentProblemRuns,
  };
}

export async function getAdminApplicationsPageData(args: {
  page: number;
  pageSize: number;
  search: string;
}) {
  const where = applicationSearchWhere(args.search);
  const skip = Math.max(0, (args.page - 1) * args.pageSize);

  const [totalCount, applications] = await Promise.all([
    db.application.count({ where }),
    db.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: args.pageSize,
      select: {
        id: true,
        createdAt: true,
        status: true,
        dreamRole: true,
        anonymousSessionId: true,
        user: {
          select: {
            email: true,
          },
        },
        job: {
          select: {
            title: true,
            company: true,
          },
        },
        cvDrafts: {
          orderBy: [{ version: "desc" }, { createdAt: "desc" }],
          take: 1,
          select: {
            id: true,
            version: true,
            createdAt: true,
          },
        },
      },
    }),
  ]);

  const applicationIds = applications.map((application) => application.id);
  const agentRuns =
    applicationIds.length > 0
      ? await db.agentRun.findMany({
          where: {
            applicationId: {
              in: applicationIds,
            },
          },
          orderBy: [{ applicationId: "asc" }, { createdAt: "desc" }],
          select: {
            applicationId: true,
            agentName: true,
            durationMs: true,
            estimatedCostUsd: true,
          },
        })
      : [];
  const byApplication = summarizeAgentRuns(agentRuns);

  return {
    totalCount,
    page: args.page,
    pageSize: args.pageSize,
    totalPages: Math.max(1, Math.ceil(totalCount / args.pageSize)),
    applications: applications.map((application) => ({
      ...application,
      totalEstimatedCostUsd:
        byApplication.get(application.id)?.totalEstimatedCostUsd ?? 0,
      latestGenerationDurationMs:
        byApplication.get(application.id)?.latestGenerationDurationMs ?? null,
    })),
  };
}

export async function getAdminApplicationDetail(applicationId: string) {
  return db.application.findUnique({
    where: { id: applicationId },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      status: true,
      currentStep: true,
      dreamRole: true,
      roleArchetype: true,
      anonymousSessionId: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      },
      anonymousSession: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      job: {
        select: {
          id: true,
          title: true,
          company: true,
          seniority: true,
          summary: true,
          roleDomain: true,
          archetypeHint: true,
          rawText: true,
          analysisJson: true,
          createdAt: true,
        },
      },
      sourceCandidateProfiles: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          id: true,
          createdAt: true,
          rawCvText: true,
          rawBackgroundText: true,
          contactInfoJson: true,
          linksJson: true,
          profileJson: true,
          summary: true,
        },
      },
      gapQuestions: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          question: true,
          reason: true,
          whyItMatters: true,
          answerGuidance: true,
          questionJson: true,
          status: true,
          createdAt: true,
          answers: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              rawUserAnswer: true,
              elaboration: true,
              skipped: true,
              createdAt: true,
              extractedEvidenceSummary: true,
              usableStatus: true,
              evidenceQuality: true,
            },
          },
        },
      },
      cvDrafts: {
        orderBy: [{ version: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          version: true,
          createdAt: true,
          updatedAt: true,
          cvJson: true,
          cvText: true,
          presentationJson: true,
          builderOutputJson: true,
        },
      },
      agentRuns: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          agentName: true,
          status: true,
          model: true,
          durationMs: true,
          promptTokens: true,
          completionTokens: true,
          totalTokens: true,
          estimatedCostUsd: true,
          inputSummary: true,
          outputSummary: true,
          error: true,
          createdAt: true,
        },
      },
    },
  });
}

export async function getAdminCvDraftDetail(draftId: string) {
  return db.cvDraft.findUnique({
    where: { id: draftId },
    select: {
      id: true,
      version: true,
      createdAt: true,
      updatedAt: true,
      applicationId: true,
      cvJson: true,
      cvText: true,
      presentationJson: true,
      builderOutputJson: true,
      application: {
        select: {
          id: true,
          createdAt: true,
          status: true,
          currentStep: true,
          dreamRole: true,
          roleArchetype: true,
          anonymousSessionId: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          anonymousSession: {
            select: {
              id: true,
              createdAt: true,
            },
          },
          job: {
            select: {
              id: true,
              title: true,
              company: true,
              seniority: true,
              rawText: true,
              summary: true,
              analysisJson: true,
            },
          },
          sourceCandidateProfiles: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: {
              id: true,
              rawCvText: true,
              rawBackgroundText: true,
              profileJson: true,
              contactInfoJson: true,
              linksJson: true,
            },
          },
          gapQuestions: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              question: true,
              reason: true,
              whyItMatters: true,
              answerGuidance: true,
              questionJson: true,
              status: true,
              answers: {
                orderBy: { createdAt: "asc" },
                select: {
                  id: true,
                  rawUserAnswer: true,
                  skipped: true,
                  createdAt: true,
                },
              },
            },
          },
          agentRuns: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              agentName: true,
              status: true,
              model: true,
              durationMs: true,
              promptTokens: true,
              completionTokens: true,
              totalTokens: true,
              estimatedCostUsd: true,
              inputSummary: true,
              outputSummary: true,
              error: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });
}
