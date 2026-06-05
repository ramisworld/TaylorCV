import Link from "next/link";
import { notFound } from "next/navigation";

import {
  AdminCard,
  AdminJsonPanel,
  AdminKeyValueGrid,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableCell,
  AdminTableRow,
  AdminTextPanel,
} from "~/components/admin/AdminUi";
import {
  formatAdminDateTime,
  formatDuration,
  formatUsd,
  truncateMiddle,
} from "~/lib/adminFormat";
import { buildSectionOrderDebug, getBuilderOutputRecord } from "~/server/admin/debug";
import { getAdminApplicationDetail } from "~/server/admin/queries";

function statusTone(status: string) {
  if (status === "cv_ready" || status === "success") return "success";
  if (status === "error" || status === "failed") return "danger";
  if (status === "questions_ready" || status === "answers_added") return "warning";
  return "neutral";
}

export default async function AdminApplicationDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const application = await getAdminApplicationDetail(params.id);

  if (!application) notFound();

  const candidateProfile = application.sourceCandidateProfiles[0] ?? null;
  const latestDraft = application.cvDrafts[0] ?? null;
  const builderOutput = latestDraft ? getBuilderOutputRecord(latestDraft.builderOutputJson) : null;
  const jobBrief =
    application.job?.analysisJson &&
    typeof application.job.analysisJson === "object" &&
    application.job.analysisJson &&
    "jobBrief" in application.job.analysisJson
      ? (application.job.analysisJson as { jobBrief?: unknown }).jobBrief ?? null
      : application.job?.analysisJson ?? null;
  const candidateProfileJson =
    candidateProfile?.profileJson &&
    typeof candidateProfile.profileJson === "object" &&
    candidateProfile.profileJson
      ? (candidateProfile.profileJson as Record<string, unknown>)
      : null;
  const sectionOrderDebug = latestDraft
    ? buildSectionOrderDebug({
        builderOutputJson: latestDraft.builderOutputJson,
        cvJson: latestDraft.cvJson,
        presentationJson: latestDraft.presentationJson,
      })
    : null;
  const totalEstimatedCostUsd = application.agentRuns.reduce(
    (sum, run) => sum + (run.estimatedCostUsd ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        action={
          <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href="/admin/applications">
            Back to applications
          </Link>
        }
        description="Full workflow and debug state for a single application."
        eyebrow="Application"
        title={application.job?.title ?? application.dreamRole ?? truncateMiddle(application.id)}
      />

      <AdminCard title="Application metadata">
        <AdminKeyValueGrid
          columns={4}
          items={[
            { label: "Application ID", value: application.id },
            { label: "Status", value: <AdminStatusBadge tone={statusTone(application.status)}>{application.status}</AdminStatusBadge> },
            { label: "Current step", value: application.currentStep },
            { label: "Role archetype", value: application.roleArchetype ?? "—" },
            { label: "Dream role", value: application.dreamRole ?? "—" },
            { label: "Created", value: formatAdminDateTime(application.createdAt) },
            { label: "Updated", value: formatAdminDateTime(application.updatedAt) },
            { label: "CV drafts", value: application.cvDrafts.length.toString() },
          ]}
        />
      </AdminCard>

      <AdminCard title="User / session info">
        <AdminKeyValueGrid
          columns={4}
          items={[
            { label: "User ID", value: application.user?.id ?? "—" },
            { label: "User email", value: application.user?.email ?? "Anonymous" },
            { label: "User created", value: formatAdminDateTime(application.user?.createdAt) },
            { label: "Anonymous session", value: application.anonymousSessionId },
            { label: "Session created", value: formatAdminDateTime(application.anonymousSession?.createdAt) },
            { label: "Session updated", value: formatAdminDateTime(application.anonymousSession?.updatedAt) },
            { label: "Candidate profile ID", value: candidateProfile?.id ?? "—" },
            { label: "Candidate profile created", value: formatAdminDateTime(candidateProfile?.createdAt) },
          ]}
        />
      </AdminCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Raw job text">
          <AdminTextPanel value={application.job?.rawText} />
        </AdminCard>
        <AdminCard title="Raw uploaded CV / profile text">
          <AdminTextPanel value={candidateProfile?.rawCvText ?? candidateProfile?.rawBackgroundText} />
        </AdminCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="jobBrief JSON">
          <AdminJsonPanel value={jobBrief} />
        </AdminCard>
        <AdminCard title="candidateBrief JSON">
          <AdminJsonPanel value={candidateProfileJson?.candidateBrief ?? null} />
        </AdminCard>
        <AdminCard title="strategySignals JSON">
          <AdminJsonPanel value={candidateProfileJson?.strategySignals ?? null} />
        </AdminCard>
        <AdminCard title="sectionStrategy JSON">
          <AdminJsonPanel value={builderOutput?.sectionStrategy ?? null} />
        </AdminCard>
      </div>

      <AdminCard title="Gap questions and answers">
        <div className="space-y-4">
          {application.gapQuestions.map((question) => (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={question.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{question.question}</p>
                  <p className="mt-1 text-xs text-slate-500">{question.reason}</p>
                </div>
                <AdminStatusBadge tone={statusTone(question.status)}>{question.status}</AdminStatusBadge>
              </div>
              <div className="mt-3 grid gap-4 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Why it matters</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{question.whyItMatters ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Answer guidance</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{question.answerGuidance ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Question JSON</p>
                  <AdminJsonPanel className="max-h-[220px]" value={question.questionJson} />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {question.answers.length === 0 ? (
                  <p className="text-sm text-slate-500">No answers saved.</p>
                ) : (
                  question.answers.map((answer) => (
                    <div className="rounded-xl border border-slate-200 bg-white p-4" key={answer.id}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">{answer.skipped ? "Skipped" : "Answered"}</p>
                        <p className="text-xs text-slate-500">{formatAdminDateTime(answer.createdAt)}</p>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {answer.rawUserAnswer ?? answer.elaboration ?? "—"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Section Order Debug">
        {sectionOrderDebug ? (
          <div className="space-y-4">
            {sectionOrderDebug.comparedOrders.map((entry) => (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={entry.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{entry.label}</p>
                <p className="mt-2 text-sm text-slate-800">
                  {entry.sections.length > 0 ? entry.sections.join(" → ") : "No data stored."}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Warnings</p>
              {sectionOrderDebug.warnings.length > 0 ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-rose-700">
                  {sectionOrderDebug.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-emerald-700">No section-order mismatches detected.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No CV draft is available yet.</p>
        )}
      </AdminCard>

      <AdminCard title="CV drafts">
        <AdminTable headers={["Created", "Draft", "Updated", "Preview", "Structured CV", "Composer output"]}>
          {application.cvDrafts.map((draft) => (
            <AdminTableRow key={draft.id}>
              <AdminTableCell>{formatAdminDateTime(draft.createdAt)}</AdminTableCell>
              <AdminTableCell>
                <div className="font-medium text-slate-900">{truncateMiddle(draft.id)}</div>
                <div className="text-xs text-slate-500">v{draft.version}</div>
              </AdminTableCell>
              <AdminTableCell>{formatAdminDateTime(draft.updatedAt)}</AdminTableCell>
              <AdminTableCell>
                <Link className="font-medium text-blue-600 hover:text-blue-700" href={`/admin/cvs/${draft.id}`}>
                  View rendered CV
                </Link>
              </AdminTableCell>
              <AdminTableCell>
                <AdminJsonPanel className="max-h-[220px]" value={draft.cvJson} />
              </AdminTableCell>
              <AdminTableCell>
                <AdminJsonPanel className="max-h-[220px]" value={draft.builderOutputJson} />
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTable>
      </AdminCard>

      <AdminCard
        description={`Total estimated cost: ${formatUsd(totalEstimatedCostUsd)}`}
        title="Agent runs / cost / latency"
      >
        <AdminTable headers={["Created", "Agent", "Status", "Model", "Duration", "Tokens", "Cost"]}>
          {application.agentRuns.map((run) => (
            <AdminTableRow key={run.id}>
              <AdminTableCell>{formatAdminDateTime(run.createdAt)}</AdminTableCell>
              <AdminTableCell>{run.agentName}</AdminTableCell>
              <AdminTableCell>
                <AdminStatusBadge tone={statusTone(run.status)}>{run.status}</AdminStatusBadge>
              </AdminTableCell>
              <AdminTableCell>{run.model ?? "—"}</AdminTableCell>
              <AdminTableCell>{formatDuration(run.durationMs)}</AdminTableCell>
              <AdminTableCell>{run.totalTokens?.toLocaleString() ?? "—"}</AdminTableCell>
              <AdminTableCell>{formatUsd(run.estimatedCostUsd)}</AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTable>
      </AdminCard>
    </div>
  );
}
