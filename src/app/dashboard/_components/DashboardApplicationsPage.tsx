"use client";

import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Loader2,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { NewCvButton } from "./DashboardShell";
import { ExportMenu } from "./ExportMenu";
import {
  normalizeTrackerStatus,
  trackerStatusLabels,
  trackerStatuses,
  type TrackerStatus,
} from "../tracking-status";

type ApplicationView = {
  id: string;
  title: string;
  companyName: string;
  logoPath: string | null;
  trackingStatus: TrackerStatus;
  statusLabel: string;
  createdAtMs: number;
  updatedAtMs: number;
  appliedLabel: string;
  updatedLabel: string;
  hasCv: boolean;
};

type SortKey = "recent" | "oldest" | "updated" | "company" | "role";
type StatusFilter = "all" | TrackerStatus;

const pageSize = 10;

const statusOptions: Array<{ label: string; value: StatusFilter }> = [
  { label: "All statuses", value: "all" },
  ...trackerStatuses.map((status) => ({
    label: trackerStatusLabels[status],
    value: status,
  })),
];

const sortOptions: Array<{ label: string; value: SortKey }> = [
  { label: "Most recent", value: "recent" },
  { label: "Oldest", value: "oldest" },
  { label: "Recently updated", value: "updated" },
  { label: "Company A-Z", value: "company" },
  { label: "Role A-Z", value: "role" },
];

const statusTone: Record<TrackerStatus, string> = {
  ready: "bg-white/64 text-[#155dff]",
  applied: "bg-[#effaf3]/78 text-[#15934d]",
  response: "bg-[#eaf7ff]/78 text-[#0879c9]",
  interview: "bg-[#f2ecff]/78 text-[#6634e6]",
  offer: "bg-[#fff4df]/82 text-[#d07705]",
  accepted: "bg-[#e5fbf6]/82 text-[#0d9582]",
  rejected: "bg-[#fff0f0]/82 text-[#d33939]",
};

export function DashboardApplicationsPage(props: { applications: ApplicationView[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [page, setPage] = useState(1);

  const filteredApplications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = props.applications.filter((application) => {
      const matchesStatus =
        statusFilter === "all" || application.trackingStatus === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [application.title, application.companyName, application.statusLabel]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });

    return [...filtered].sort((left, right) => {
      if (sortKey === "oldest") return left.createdAtMs - right.createdAtMs;
      if (sortKey === "updated") return right.updatedAtMs - left.updatedAtMs;
      if (sortKey === "company") {
        return left.companyName.localeCompare(right.companyName);
      }
      if (sortKey === "role") return left.title.localeCompare(right.title);
      return right.createdAtMs - left.createdAtMs;
    });
  }, [props.applications, query, sortKey, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = filteredApplications.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const pageEnd = Math.min(safePage * pageSize, filteredApplications.length);
  const visibleApplications = filteredApplications.slice(pageStart - 1, pageEnd);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateStatusFilter(value: StatusFilter) {
    setStatusFilter(value);
    setPage(1);
  }

  function updateSort(value: SortKey) {
    setSortKey(value);
    setPage(1);
  }

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-7">
      <header className="flex items-start justify-between gap-5">
        <div>
          <h1 className="text-[24px] font-semibold leading-tight text-[#081543]">
            Applications
          </h1>
          <p className="mt-2 text-[13px] font-medium text-[#536485]">
            Track, manage, and tailor your applications all in one place.
          </p>
        </div>
        <NewCvButton className="hidden h-[50px] px-7 text-[15px] lg:inline-flex" />
      </header>

      <ApplicationsToolbar
        query={query}
        sortKey={sortKey}
        statusFilter={statusFilter}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
        onStatusFilterChange={updateStatusFilter}
      />

      <section className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-[15px] border border-white/70 bg-white/38 shadow-[0_20px_52px_rgba(67,82,128,0.12),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl">
        <div className="min-h-0 overflow-x-hidden overflow-y-auto">
          <ApplicationsTable applications={visibleApplications} hasAnyApplications={props.applications.length > 0} />
        </div>
        <PaginationControls
          end={pageEnd}
          page={safePage}
          pageSize={pageSize}
          total={filteredApplications.length}
          totalPages={totalPages}
          start={pageStart}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}

function ApplicationsToolbar(props: {
  query: string;
  statusFilter: StatusFilter;
  sortKey: SortKey;
  onQueryChange: (value: string) => void;
  onStatusFilterChange: (value: StatusFilter) => void;
  onSortChange: (value: SortKey) => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="flex h-[48px] w-full max-w-[800px] items-center gap-3 rounded-[12px] border border-white/72 bg-white/38 px-4 shadow-[0_16px_36px_rgba(67,82,128,0.09),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl">
        <Search className="h-5 w-5 shrink-0 text-[#43619d]" />
        <input
          className="h-full min-w-0 flex-1 bg-transparent text-[13px] font-medium text-[#0b1740] outline-none placeholder:text-[#69799c]"
          placeholder="Search jobs or companies..."
          type="search"
          value={props.query}
          onChange={(event) => props.onQueryChange(event.target.value)}
        />
        <span className="hidden rounded-[7px] border border-white/74 bg-white/44 px-2 py-1 text-[11px] font-medium text-[#536485] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] sm:inline-flex">
          ⌘ K
        </span>
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ApplicationsFilterSelect
          ariaLabel="Filter by status"
          options={statusOptions}
          value={props.statusFilter}
          onChange={(value) => props.onStatusFilterChange(value as StatusFilter)}
        />
        <ApplicationsFilterSelect
          ariaLabel="Sort applications"
          options={sortOptions}
          value={props.sortKey}
          onChange={(value) => props.onSortChange(value as SortKey)}
        />
      </div>
    </div>
  );
}

function ApplicationsFilterSelect(props: {
  ariaLabel: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative inline-flex h-[46px] min-w-[158px] items-center">
      <span className="sr-only">{props.ariaLabel}</span>
      <select
        aria-label={props.ariaLabel}
        className="h-full w-full cursor-pointer appearance-none rounded-[9px] border border-white/70 bg-white/38 px-3.5 pr-9 text-[13px] font-medium text-[#172853] shadow-[0_12px_26px_rgba(67,82,128,0.08),inset_0_1px_0_rgba(255,255,255,0.82)] outline-none backdrop-blur-2xl transition focus:border-[#8fb0ff] focus:ring-4 focus:ring-blue-200/45"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-[#506490]" />
    </label>
  );
}

function ApplicationsTable(props: {
  applications: ApplicationView[];
  hasAnyApplications: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="hidden min-h-[56px] grid-cols-[minmax(0,1.45fr)_minmax(150px,0.55fr)_116px_110px_126px_40px] items-center gap-4 border-b border-[#d9e3f4]/68 px-5 text-[10px] font-medium uppercase tracking-[0.02em] text-[#6a7aa0] lg:grid">
        <span>Role</span>
        <span>Company</span>
        <span>Status</span>
        <span>Applied</span>
        <span>Last updated</span>
        <span />
      </div>
      {props.applications.length > 0 ? (
        props.applications.map((application) => (
          <ApplicationTableRow application={application} key={application.id} />
        ))
      ) : (
        <div className="grid min-h-[360px] place-items-center px-6 text-center">
          <div>
            <p className="text-[16px] font-semibold text-[#071026]">
              {props.hasAnyApplications ? "No matching applications." : "No applications yet."}
            </p>
            <p className="mt-2 text-[13px] font-medium text-[#617294]">
              {props.hasAnyApplications
                ? "Try a different role, company, or status."
                : "Create your first tailored CV to start tracking applications."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ApplicationTableRow(props: { application: ApplicationView }) {
  return (
    <div className="grid gap-3 border-b border-[#d9e3f4]/58 px-5 py-3 last:border-b-0 lg:min-h-[62px] lg:grid-cols-[minmax(0,1.45fr)_minmax(150px,0.55fr)_116px_110px_126px_40px] lg:items-center lg:gap-4">
      <Link
        className="flex min-w-0 items-center gap-3 rounded-[10px] outline-none transition hover:bg-white/24 focus-visible:ring-4 focus-visible:ring-blue-200/55"
        href={`/dashboard/applications/${props.application.id}`}
      >
        <CompanyIcon application={props.application} />
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-semibold text-[#0a122d]">
            {props.application.title}
          </span>
          <span className="mt-1 block truncate text-[12px] font-medium text-[#566481] lg:hidden">
            {props.application.companyName}
          </span>
        </span>
      </Link>
      <span className="hidden truncate text-[12px] font-medium text-[#566481] lg:block">
        {props.application.companyName}
      </span>
      <StatusPillSelect application={props.application} />
      <span className="text-[12px] font-medium text-[#526a9a]">
        {props.application.appliedLabel}
      </span>
      <span className="text-[12px] font-medium text-[#526a9a]">
        {props.application.updatedLabel}
      </span>
      <ApplicationActionsMenu application={props.application} />
    </div>
  );
}

function CompanyIcon(props: { application: ApplicationView }) {
  return (
    <span className="grid h-[36px] w-[36px] shrink-0 place-items-center overflow-hidden rounded-[9px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(229,237,255,0.56))] text-[#31598f] shadow-[0_8px_16px_rgba(54,78,140,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
      {props.application.logoPath ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="h-6 w-6 object-contain"
          src={props.application.logoPath}
        />
      ) : (
        <Building2 className="h-[18px] w-[18px] stroke-[2]" />
      )}
    </span>
  );
}

function StatusPillSelect(props: { application: ApplicationView }) {
  const [value, setValue] = useState<TrackerStatus>(props.application.trackingStatus);
  const utils = api.useUtils();
  const updateStatus = api.application.updateTrackingStatus.useMutation({
    onSuccess: async () => {
      await utils.application.listUserApplications.invalidate();
    },
  });
  const status = normalizeTrackerStatus(value);

  return (
    <label className="relative inline-flex w-fit items-center">
      <span className="sr-only">Application status</span>
      <select
        className={cn(
          "h-6 w-fit cursor-pointer appearance-none rounded-[8px] border border-white/72 py-0 pl-[22px] pr-6 text-[11px] font-medium shadow-[0_7px_14px_rgba(65,82,132,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] outline-none transition focus:ring-4 focus:ring-blue-200/45 disabled:cursor-wait disabled:opacity-70",
          statusTone[status]
        )}
        disabled={updateStatus.isPending}
        value={status}
        onChange={(event) => {
          const nextStatus = normalizeTrackerStatus(event.target.value);
          setValue(nextStatus);
          updateStatus.mutate({
            applicationId: props.application.id,
            trackingStatus: nextStatus,
          });
        }}
      >
        {trackerStatuses.map((option) => (
          <option key={option} value={option}>
            {trackerStatusLabels[option]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-2 h-[5px] w-[5px] rounded-full bg-current text-current" />
      {updateStatus.isPending ? (
        <Loader2 className="pointer-events-none absolute right-1.5 h-3 w-3 animate-spin text-current" />
      ) : (
        <ChevronDown className="pointer-events-none absolute right-1.5 h-3 w-3 text-current opacity-70" />
      )}
    </label>
  );
}

function ApplicationActionsMenu(props: { application: ApplicationView }) {
  const menuButtonClass =
    "flex h-9 w-full items-center gap-2 rounded-[8px] px-3 text-left text-[12px] font-semibold text-[#1158ff] transition hover:bg-[#edf3ff]";
  const disabledClass =
    "flex h-9 w-full cursor-not-allowed items-center gap-2 rounded-[8px] px-3 text-left text-[12px] font-semibold text-[#8a98b8]";

  return (
    <details className="group relative justify-self-start lg:justify-self-center">
      <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-[8px] text-[#31598f] transition hover:bg-white/42 [&::-webkit-details-marker]:hidden">
        <MoreHorizontal className="h-4 w-4" />
      </summary>
      <div className="absolute right-0 top-9 z-20 w-[190px] rounded-[12px] border border-white/72 bg-white/86 p-2 shadow-[0_18px_42px_rgba(35,51,93,0.18)] backdrop-blur-2xl">
        {props.application.hasCv ? (
          <Link
            className={menuButtonClass}
            href={`/dashboard/applications/${props.application.id}`}
          >
            <Eye className="h-4 w-4" />
            View CV
          </Link>
        ) : (
          <span className={disabledClass}>
            <Eye className="h-4 w-4" />
            View CV
          </span>
        )}
        {props.application.hasCv ? (
          <ExportMenu
            applicationId={props.application.id}
            buttonClassName="flex h-9 w-full justify-start rounded-[8px] border-transparent bg-transparent px-3 text-[12px] font-semibold text-[#1158ff] shadow-none hover:bg-[#edf3ff] [&_svg]:text-[#1158ff]"
            className="mt-1 grid gap-1"
            labels={{ pdf: "Download PDF", docx: "Download DOCX" }}
          />
        ) : (
          <div className="mt-1 grid gap-1">
            <span className={disabledClass}>
              <Download className="h-4 w-4" />
              Download PDF
            </span>
            <span className={disabledClass}>
              <FileText className="h-4 w-4" />
              Download DOCX
            </span>
          </div>
        )}
      </div>
    </details>
  );
}

function PaginationControls(props: {
  start: number;
  end: number;
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: props.totalPages }, (_, index) => index + 1).slice(0, 5);

  return (
    <div className="flex min-h-[58px] flex-col justify-between gap-3 border-t border-[#d9e3f4]/58 px-5 py-3 text-[12px] font-medium text-[#526a9a] sm:flex-row sm:items-center">
      <p>
        Showing {props.start} to {props.end} of {props.total} applications
      </p>
      {props.total > props.pageSize ? (
        <div className="flex items-center gap-2">
          <PaginationButton
            disabled={props.page <= 1}
            onClick={() => props.onPageChange(Math.max(1, props.page - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
          {pages.map((pageNumber) => (
            <PaginationButton
              active={pageNumber === props.page}
              key={pageNumber}
              onClick={() => props.onPageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationButton>
          ))}
          <PaginationButton
            disabled={props.page >= props.totalPages}
            onClick={() => props.onPageChange(Math.min(props.totalPages, props.page + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
        </div>
      ) : null}
    </div>
  );
}

function PaginationButton(props: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "grid h-8 min-w-8 place-items-center rounded-[8px] px-2 text-[12px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40",
        props.active
          ? "bg-[#dfe9ff] text-[#155dff] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
          : "text-[#526a9a] hover:bg-white/42"
      )}
      disabled={props.disabled}
      type="button"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
