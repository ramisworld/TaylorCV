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
  AdminTabs,
  AdminTextPanel,
} from "~/components/admin/AdminUi";
import { RenderedCvPreview } from "~/components/cv-flow/RenderedCvPreview";
import {
  asNonEmptyStringArray,
  formatAdminDateTime,
  formatDuration,
  formatUsd,
  truncateMiddle,
} from "~/lib/adminFormat";
import { buildCvDebugSnapshot, getBuilderOutputRecord } from "~/server/admin/debug";
import { getAdminCvDraftDetail } from "~/server/admin/queries";

const tabs = [
  { id: "preview", label: "Preview" },
  { id: "structured", label: "Structured CV JSON" },
  { id: "composer", label: "Composer Output JSON" },
  { id: "source", label: "Source / Briefs" },
  { id: "agent-runs", label: "Agent Runs" },
  { id: "section-order", label: "Section Order Debug" },
  { id: "debug", label: "Debug" },
] as const;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function statusTone(status: string) {
  if (status === "cv_ready" || status === "success") return "success";
  if (status === "error" || status === "failed") return "danger";
  if (status === "questions_ready" || status === "answers_added") return "warning";
  return "neutral";
}

export default async function AdminCvDraftPage(props: {
  params: Promise<{ draftId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams]);
  const tab = firstParam(searchParams.tab) ?? "preview";
  const draft = await getAdminCvDraftDetail(params.draftId);

  if (!draft) notFound();

  const builderOutput = getBuilderOutputRecord(draft.builderOutputJson);
  const candidateProfile = draft.application.sourceCandidateProfiles[0] ?? null;
  const candidateProfileJson =
    candidateProfile?.profileJson &&
    typeof candidateProfile.profileJson === "object" &&
    candidateProfile.profileJson
      ? (candidateProfile.profileJson as Record<string, unknown>)
      : null;
  const jobBrief =
    draft.application.job?.analysisJson &&
    typeof draft.application.job.analysisJson === "object" &&
    draft.application.job.analysisJson &&
    "jobBrief" in draft.application.job.analysisJson
      ? (draft.application.job.analysisJson as { jobBrief?: unknown }).jobBrief ?? null
      : draft.application.job?.analysisJson ?? null;
  const gapAnswerIds = draft.application.gapQuestions.flatMap((question) =>
    question.answers.map((answer) => answer.id)
  );
  const debugSnapshot = buildCvDebugSnapshot({
    builderOutputJson: draft.builderOutputJson,
    cvJson: draft.cvJson,
    gapAnswerIds,
    presentationJson: draft.presentationJson,
  });
  const parsedCv = debugSnapshot.parsedCv;
  const composerOutput = builderOutput?.composerOutput ?? null;
  const sectionOrderDebug = debugSnapshot.orderDebug;
  const basePath = `/admin/cvs/${draft.id}`;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        action={
          <Link className="text-sm font-medium text-blue-600 hover:text-blue-700" href={`/admin/applications/${draft.applicationId}`}>
            Back to application
          </Link>
        }
        description="Rendered inspection, stored JSON, source context, and renderer/debug comparisons for one draft."
        eyebrow="CV Draft"
        title={`Draft ${truncateMiddle(draft.id)} · v${draft.version}`}
      />

      <AdminCard title="Draft metadata">
        <AdminKeyValueGrid
          columns={4}
          items={[
            { label: "Draft ID", value: draft.id },
            { label: "Application", value: <Link className="text-blue-600 hover:text-blue-700" href={`/admin/applications/${draft.applicationId}`}>{draft.applicationId}</Link> },
            { label: "Status", value: <AdminStatusBadge tone={statusTone(draft.application.status)}>{draft.application.status}</AdminStatusBadge> },
            { label: "Role archetype", value: draft.application.roleArchetype ?? "—" },
            { label: "Created", value: formatAdminDateTime(draft.createdAt) },
            { label: "Updated", value: formatAdminDateTime(draft.updatedAt) },
            { label: "Owner", value: draft.application.user?.email ?? "Anonymous" },
            { label: "Target role", value: draft.application.job?.title ?? draft.application.dreamRole ?? "—" },
          ]}
        />
      </AdminCard>

      <AdminTabs basePath={basePath} currentTab={tab} tabs={[...tabs]} />

      {tab === "preview" ? (
        <AdminCard
          description="Rendered with the same A4 preview pipeline used by the user-facing CV preview/export flow."
          title="Rendered preview"
        >
          {parsedCv ? (
            <RenderedCvPreview
              className="min-h-[1000px]"
              cv={parsedCv}
              debug
              frameClassName="min-h-[980px]"
              mode="admin"
              presentationJson={draft.presentationJson}
            />
          ) : (
            <p className="text-sm text-rose-700">Stored CV JSON could not be parsed by `parseStructuredCv()`.</p>
          )}
        </AdminCard>
      ) : null}

      {tab === "structured" ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <AdminCard title="sectionOrder">
            <AdminJsonPanel value={parsedCv?.sectionOrder ?? null} />
          </AdminCard>
          <AdminCard title="header">
            <AdminJsonPanel value={parsedCv?.header ?? null} />
          </AdminCard>
          <AdminCard title="summary">
            <AdminTextPanel value={parsedCv?.summary ?? null} />
          </AdminCard>
          <AdminCard title="skills">
            <AdminJsonPanel value={parsedCv?.skills ?? null} />
          </AdminCard>
          <AdminCard title="experience">
            <AdminJsonPanel value={parsedCv?.experience ?? null} />
          </AdminCard>
          <AdminCard title="projects">
            <AdminJsonPanel value={parsedCv?.projects ?? null} />
          </AdminCard>
          <AdminCard title="education">
            <AdminJsonPanel value={parsedCv?.education ?? null} />
          </AdminCard>
          <AdminCard title="certifications">
            <AdminJsonPanel value={parsedCv?.certifications ?? null} />
          </AdminCard>
          <AdminCard title="dynamic sections">
            <AdminJsonPanel value={parsedCv?.sections ?? null} />
          </AdminCard>
          <AdminCard title="bullets with gapAnswerIds">
            <AdminJsonPanel
              value={
                parsedCv
                  ? {
                      experience: parsedCv.experience.map((item) => ({
                        role: item.role,
                        company: item.company,
                        bullets: item.bullets,
                      })),
                      projects: parsedCv.projects.map((item) => ({
                        name: item.name,
                        bullets: item.bullets,
                      })),
                      sections: parsedCv.sections,
                    }
                  : null
              }
            />
          </AdminCard>
        </div>
      ) : null}

      {tab === "composer" ? (
        <AdminCard title="Composer output JSON">
          <AdminJsonPanel value={composerOutput ?? draft.builderOutputJson} />
        </AdminCard>
      ) : null}

      {tab === "source" ? (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <AdminCard title="Raw job text">
              <AdminTextPanel value={draft.application.job?.rawText} />
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
            <AdminJsonPanel value={draft.application.gapQuestions} />
          </AdminCard>
        </div>
      ) : null}

      {tab === "agent-runs" ? (
        <AdminCard
          description={`Total estimated cost: ${formatUsd(
            draft.application.agentRuns.reduce((sum, run) => sum + (run.estimatedCostUsd ?? 0), 0)
          )}`}
          title="Agent runs"
        >
          <AdminTable headers={["Created", "Agent", "Status", "Model", "Duration", "Tokens", "Cost", "Input / Output"]}>
            {draft.application.agentRuns.map((run) => (
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
                <AdminTableCell className="min-w-[420px]">
                  <div className="grid gap-3 xl:grid-cols-2">
                    <AdminJsonPanel className="max-h-[220px]" value={run.inputSummary} />
                    <AdminJsonPanel className="max-h-[220px]" value={run.outputSummary} />
                  </div>
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTable>
        </AdminCard>
      ) : null}

      {tab === "section-order" ? (
        <AdminCard title="Section Order Debug">
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
        </AdminCard>
      ) : null}

      {tab === "debug" ? (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-2">
            <AdminCard title="Section order mismatches">
              <AdminJsonPanel value={sectionOrderDebug.warnings} />
            </AdminCard>
            <AdminCard title="Duplicate section IDs">
              <AdminJsonPanel value={debugSnapshot.duplicateSectionIds} />
            </AdminCard>
            <AdminCard title="Missing expected sections">
              <AdminJsonPanel value={debugSnapshot.missingExpectedSections} />
            </AdminCard>
            <AdminCard title="Bullets with too many commas">
              <AdminJsonPanel value={debugSnapshot.bulletsWithTooManyCommas} />
            </AdminCard>
            <AdminCard title="Em dash count">
              <AdminJsonPanel value={{ emDashCount: debugSnapshot.emDashCount }} />
            </AdminCard>
            <AdminCard title="Empty or weak sections">
              <AdminJsonPanel value={debugSnapshot.emptyOrWeakSections} />
            </AdminCard>
            <AdminCard title="Gap answers not used">
              <AdminJsonPanel value={debugSnapshot.unusedGapAnswerIds} />
            </AdminCard>
            <AdminCard title="Stored quality warnings">
              <AdminJsonPanel value={debugSnapshot.qualityWarnings} />
            </AdminCard>
          </div>

          <AdminCard title="Debug summary">
            <AdminKeyValueGrid
              columns={4}
              items={[
                { label: "Rendered section count", value: String(debugSnapshot.orderDebug.renderModel?.metrics.renderedSectionCount ?? 0) },
                { label: "Rendered section IDs", value: asNonEmptyStringArray(debugSnapshot.orderDebug.renderModel?.metrics.renderedSectionIds).join(", ") || "—" },
                { label: "Render warnings", value: asNonEmptyStringArray(debugSnapshot.orderDebug.renderModel?.metrics.layoutWarnings).join(", ") || "—" },
                { label: "Unused gap answers", value: String(debugSnapshot.unusedGapAnswerIds.length) },
              ]}
            />
          </AdminCard>
        </div>
      ) : null}
    </div>
  );
}
