import Link from "next/link";

import {
  AdminCard,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableCell,
  AdminTableRow,
} from "~/components/admin/AdminUi";
import {
  buildQueryString,
  formatAdminDateTime,
  formatDuration,
  formatUsd,
  truncateMiddle,
} from "~/lib/adminFormat";
import { getAdminApplicationsPageData } from "~/server/admin/queries";

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function statusTone(status: string) {
  if (status === "cv_ready") return "success";
  if (status === "questions_ready" || status === "answers_added") return "warning";
  return "neutral";
}

export default async function AdminApplicationsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const search = firstParam(searchParams.q) ?? "";
  const page = Math.max(1, Number(firstParam(searchParams.page) ?? "1") || 1);
  const pageSize = 25;
  const data = await getAdminApplicationsPageData({ page, pageSize, search });

  const previousPageHref = `/admin/applications${buildQueryString({
    q: search || null,
    page: data.page > 1 ? data.page - 1 : null,
  })}`;
  const nextPageHref = `/admin/applications${buildQueryString({
    q: search || null,
    page: data.page < data.totalPages ? data.page + 1 : null,
  })}`;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="Search by application ID, role, company, user email, or anonymous session."
        eyebrow="Admin"
        title="Applications"
      />

      <AdminCard>
        <form className="flex flex-col gap-3 sm:flex-row" method="get">
          <input
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            defaultValue={search}
            name="q"
            placeholder="Search applications, role, company, email, session..."
            type="search"
          />
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            type="submit"
          >
            Search
          </button>
        </form>
      </AdminCard>

      <AdminCard
        action={
          <p className="text-sm text-slate-500">
            Page {data.page} of {data.totalPages} · {data.totalCount.toLocaleString()} results
          </p>
        }
        title="Application list"
      >
        <AdminTable
          headers={[
            "Created",
            "Application ID",
            "Owner / Session",
            "Target role",
            "Company",
            "Status",
            "Generated CV",
            "Latest draft",
            "Total cost",
            "Latest generation",
          ]}
        >
          {data.applications.map((application) => (
            <AdminTableRow key={application.id}>
              <AdminTableCell>{formatAdminDateTime(application.createdAt)}</AdminTableCell>
              <AdminTableCell>
                <Link className="font-medium text-blue-600 hover:text-blue-700" href={`/admin/applications/${application.id}`}>
                  {truncateMiddle(application.id)}
                </Link>
              </AdminTableCell>
              <AdminTableCell>
                <div className="font-medium text-slate-900">{application.user?.email ?? "Anonymous"}</div>
                <div className="text-xs text-slate-500">{truncateMiddle(application.anonymousSessionId, 10, 5)}</div>
              </AdminTableCell>
              <AdminTableCell>{application.job?.title ?? application.dreamRole ?? "Untitled role"}</AdminTableCell>
              <AdminTableCell>{application.job?.company ?? "—"}</AdminTableCell>
              <AdminTableCell>
                <AdminStatusBadge tone={statusTone(application.status)}>{application.status}</AdminStatusBadge>
              </AdminTableCell>
              <AdminTableCell>{application.cvDrafts[0] ? "Yes" : "No"}</AdminTableCell>
              <AdminTableCell>
                {application.cvDrafts[0] ? (
                  <Link
                    className="font-medium text-blue-600 hover:text-blue-700"
                    href={`/admin/cvs/${application.cvDrafts[0].id}`}
                  >
                    {truncateMiddle(application.cvDrafts[0].id)} · v{application.cvDrafts[0].version}
                  </Link>
                ) : (
                  "—"
                )}
              </AdminTableCell>
              <AdminTableCell>{formatUsd(application.totalEstimatedCostUsd)}</AdminTableCell>
              <AdminTableCell>{formatDuration(application.latestGenerationDurationMs)}</AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTable>

        <div className="mt-4 flex items-center justify-between">
          <Link
            aria-disabled={data.page <= 1}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"
            href={previousPageHref}
          >
            Previous
          </Link>
          <Link
            aria-disabled={data.page >= data.totalPages}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 aria-disabled:pointer-events-none aria-disabled:opacity-40"
            href={nextPageHref}
          >
            Next
          </Link>
        </div>
      </AdminCard>
    </div>
  );
}
