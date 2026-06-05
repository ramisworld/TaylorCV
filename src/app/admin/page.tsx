import Link from "next/link";

import {
  AdminCard,
  AdminPageHeader,
  AdminStatCard,
  AdminStatusBadge,
  AdminTable,
  AdminTableCell,
  AdminTableRow,
} from "~/components/admin/AdminUi";
import {
  formatAdminDateTime,
  formatCompactNumber,
  formatDuration,
  formatUsd,
  truncateMiddle,
} from "~/lib/adminFormat";
import { getAdminDashboardData } from "~/server/admin/queries";

function statusTone(status: string) {
  if (status === "success" || status === "cv_ready") return "success";
  if (status === "error" || status === "failed") return "danger";
  if (status === "questions_ready" || status === "answers_added") return "warning";
  return "neutral";
}

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();
  const totalAgentCostHint = `All logged agent runs. Intake: ${formatUsd(data.stats.totalIntakeCostUsd)}. Composer: ${formatUsd(data.stats.totalComposerCostUsd)}.`;

  return (
    <div className="space-y-7">
      <AdminPageHeader
        description="Read-only operations view across applications, CV drafts, and agent telemetry. Costs below now separate overall spend from composer-only averages."
        eyebrow="Admin"
        title="Overview"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Total users" value={formatCompactNumber(data.stats.totalUsers)} />
        <AdminStatCard
          hint="Anonymous application sessions"
          label="Anonymous sessions"
          value={formatCompactNumber(data.stats.anonymousSessions)}
        />
        <AdminStatCard label="Applications" value={formatCompactNumber(data.stats.applications)} />
        <AdminStatCard
          hint="Structured CV drafts saved"
          label="Generated CV drafts"
          value={formatCompactNumber(data.stats.generatedCvDrafts)}
        />
        <AdminStatCard
          label="Failed generations"
          value={formatCompactNumber(data.stats.failedGenerations)}
        />
        <AdminStatCard
          hint="Successful `cvComposer` runs only"
          label="Average generation time"
          value={formatDuration(data.stats.averageGenerationTimeMs)}
        />
        <AdminStatCard
          hint={totalAgentCostHint}
          label="Total estimated cost"
          value={formatUsd(data.stats.totalEstimatedCostUsd)}
        />
        <AdminStatCard
          hint="Successful `cvComposer` runs only"
          label="Average composer cost"
          value={formatUsd(data.stats.averageEstimatedCostUsd)}
        />
        <AdminStatCard
          hint="Last 24 hours"
          label="Recent agent runs"
          value={formatCompactNumber(data.stats.recentAgentRunsCount)}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <AdminCard
          description="The average metrics stay composer-only because that is the final generation step users wait on. Total estimated cost includes both `intakeGap` and `cvComposer` runs."
          title="Cost and throughput"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">All agent cost</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {formatUsd(data.stats.totalEstimatedCostUsd)}
              </p>
              <p className="mt-2 text-sm text-slate-500">Includes intake and composer runs.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Intake cost</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {formatUsd(data.stats.totalIntakeCostUsd)}
              </p>
              <p className="mt-2 text-sm text-slate-500">`intakeGap` runs across the current dataset.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Composer cost</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {formatUsd(data.stats.totalComposerCostUsd)}
              </p>
              <p className="mt-2 text-sm text-slate-500">`cvComposer` runs across the current dataset.</p>
            </div>
          </div>
        </AdminCard>

        <AdminCard
          description="Quick health view for the last 24 hours and the final generation stage."
          title="Run quality"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Recent agent runs</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {formatCompactNumber(data.stats.recentAgentRunsCount)}
              </p>
              <p className="mt-2 text-sm text-slate-500">All runs created in the last 24 hours.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Failed generations</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {formatCompactNumber(data.stats.failedGenerations)}
              </p>
              <p className="mt-2 text-sm text-slate-500">Failed `cvComposer` runs only.</p>
            </div>
          </div>
        </AdminCard>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard
          action={
            <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href="/admin/applications">
              View all applications
            </Link>
          }
          title="Latest applications"
        >
          <AdminTable headers={["Created", "Application", "Owner", "Target role", "Status", "CV"]}>
            {data.latestApplications.map((application) => (
              <AdminTableRow key={application.id}>
                <AdminTableCell>{formatAdminDateTime(application.createdAt)}</AdminTableCell>
                <AdminTableCell>
                  <Link className="font-medium text-blue-600 hover:text-blue-700" href={`/admin/applications/${application.id}`}>
                    {truncateMiddle(application.id)}
                  </Link>
                </AdminTableCell>
                <AdminTableCell>
                  {application.user?.email ?? truncateMiddle(application.anonymousSessionId, 8, 4)}
                </AdminTableCell>
                <AdminTableCell>
                  <div className="font-medium text-slate-900">
                    {application.job?.title ?? application.dreamRole ?? "Untitled role"}
                  </div>
                  <div className="text-xs text-slate-500">{application.job?.company ?? "No company"}</div>
                </AdminTableCell>
                <AdminTableCell>
                  <AdminStatusBadge tone={statusTone(application.status)}>{application.status}</AdminStatusBadge>
                </AdminTableCell>
                <AdminTableCell>
                  {application.cvDrafts[0] ? (
                    <Link
                      className="font-medium text-blue-600 hover:text-blue-700"
                      href={`/admin/cvs/${application.cvDrafts[0].id}`}
                    >
                      Draft v{application.cvDrafts[0].version}
                    </Link>
                  ) : (
                    "—"
                  )}
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTable>
        </AdminCard>

        <AdminCard title="Latest generated CVs">
          <AdminTable headers={["Created", "Draft", "Application", "Target role", "Owner"]}>
            {data.latestCvDrafts.map((draft) => (
              <AdminTableRow key={draft.id}>
                <AdminTableCell>{formatAdminDateTime(draft.createdAt)}</AdminTableCell>
                <AdminTableCell>
                  <Link className="font-medium text-blue-600 hover:text-blue-700" href={`/admin/cvs/${draft.id}`}>
                    {truncateMiddle(draft.id)} · v{draft.version}
                  </Link>
                </AdminTableCell>
                <AdminTableCell>
                  <Link
                    className="font-medium text-blue-600 hover:text-blue-700"
                    href={`/admin/applications/${draft.application.id}`}
                  >
                    {truncateMiddle(draft.application.id)}
                  </Link>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="font-medium text-slate-900">
                    {draft.application.job?.title ?? draft.application.dreamRole ?? "Untitled role"}
                  </div>
                  <div className="text-xs text-slate-500">{draft.application.job?.company ?? "No company"}</div>
                </AdminTableCell>
                <AdminTableCell>{draft.application.user?.email ?? "Anonymous"}</AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTable>
        </AdminCard>
      </div>

      <AdminCard title="Recent failed or slow agent runs">
        <AdminTable headers={["Created", "Application", "Agent", "Status", "Model", "Duration", "Cost"]}>
          {data.recentProblemRuns.map((run) => (
            <AdminTableRow key={run.id}>
              <AdminTableCell>{formatAdminDateTime(run.createdAt)}</AdminTableCell>
              <AdminTableCell>
                <Link className="font-medium text-blue-600 hover:text-blue-700" href={`/admin/applications/${run.applicationId}`}>
                  {truncateMiddle(run.applicationId)}
                </Link>
              </AdminTableCell>
              <AdminTableCell>{run.agentName}</AdminTableCell>
              <AdminTableCell>
                <AdminStatusBadge tone={statusTone(run.status)}>{run.status}</AdminStatusBadge>
              </AdminTableCell>
              <AdminTableCell>{run.model ?? "—"}</AdminTableCell>
              <AdminTableCell>{formatDuration(run.durationMs)}</AdminTableCell>
              <AdminTableCell>{formatUsd(run.estimatedCostUsd)}</AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTable>
      </AdminCard>
    </div>
  );
}
