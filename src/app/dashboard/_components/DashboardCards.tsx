import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  FileText,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

import {
  companyLogoPath,
  compactDate,
  getApplicationTitle,
  getCompanyName,
  getLatestDraft,
  relativeTime,
  type DashboardApplication,
} from "../dashboard-utils";
import { normalizeTrackerStatus, trackerStatusLabels } from "../tracking-status";
import { ExportMenu } from "./ExportMenu";

const chipStyles: Record<string, string> = {
  ready: "bg-[#edf3ff] text-[#155dff]",
  applied: "bg-[#e9f8ef] text-[#15934d]",
  response: "bg-[#eaf1ff] text-[#135dff]",
  interview: "bg-[#f1e9ff] text-[#6634e6]",
  offer: "bg-[#fff3df] text-[#d97706]",
  accepted: "bg-[#e2faf7] text-[#0e9aa7]",
  rejected: "bg-[#ffecec] text-[#d33939]",
};

export function MetricCard(props: {
  icon: "applications" | "responses" | "interviews";
  label: string;
  value: number;
  subtext: string;
}) {
  const Icon =
    props.icon === "applications"
      ? BriefcaseBusiness
      : props.icon === "responses"
        ? MessageCircle
        : CalendarCheck2;
  const isZeroState = props.subtext.startsWith("No ");

  return (
    <section className="rounded-[13px] border border-white/70 bg-white/34 px-5 py-4 shadow-[0_16px_36px_rgba(67,82,128,0.10),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur-2xl">
      <div className="flex items-center gap-5">
        <div className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[10px] border border-white/78 bg-[linear-gradient(145deg,rgba(255,255,255,0.8),rgba(226,235,255,0.58))] text-[#1158ff] shadow-[0_10px_19px_rgba(54,78,140,0.10),inset_0_1px_0_rgba(255,255,255,0.95)]">
          <Icon className="h-6 w-6 stroke-[2]" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#101934]">{props.label}</p>
          <p className="mt-1 text-[26px] font-medium leading-none text-[#070d28]">
            {props.value}
          </p>
          <p
            className={`mt-3 text-[12px] font-medium ${
              isZeroState ? "text-[#74819d]" : "text-[#09a74f]"
            }`}
          >
            {props.subtext}
          </p>
        </div>
      </div>
    </section>
  );
}

export function StatusChip(props: { status: string }) {
  const status = normalizeTrackerStatus(props.status);
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 rounded-[8px] border border-white/72 px-2.5 text-[11px] font-medium shadow-[0_7px_14px_rgba(65,82,132,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] ${chipStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {trackerStatusLabels[status]}
    </span>
  );
}

export function CompanyMark(props: { companyName: string }) {
  const logoPath = companyLogoPath(props.companyName);

  if (logoPath) {
    return (
      <span className="relative block h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white">
        <Image
          alt=""
          className="object-contain p-1"
          fill
          sizes="32px"
          src={logoPath}
        />
      </span>
    );
  }

  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f0f4ff] text-[#31598f]">
      <Building2 className="h-5 w-5" />
    </span>
  );
}

export function ApplicationRow(props: {
  application: DashboardApplication;
  showDate?: boolean;
  trailing?: ReactNode;
}) {
  const title = getApplicationTitle(props.application);
  const companyName = getCompanyName(props.application);

  return (
    <div className="grid min-h-[56px] gap-3 border-b border-[#d9e3f4]/62 px-3 py-2.5 last:border-b-0 md:grid-cols-[minmax(0,1fr)_124px_100px_72px_24px] md:items-center">
      <Link
        className="flex min-w-0 items-center gap-3 rounded-[10px] outline-none transition hover:bg-white/28 focus-visible:ring-4 focus-visible:ring-blue-200/60"
        href={`/dashboard/applications/${props.application.id}`}
      >
        <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[9px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(229,237,255,0.56))] shadow-[0_8px_16px_rgba(54,78,140,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
          <CompanyMark companyName={companyName} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-semibold text-[#0a122d]">
            {title}
          </span>
          <span className="mt-1 block truncate text-[12px] font-medium text-[#566481] md:hidden">
            {companyName}
          </span>
        </span>
      </Link>
      <span className="hidden truncate text-[12px] font-medium text-[#566481] md:block">
        {companyName}
      </span>
      <StatusChip status={props.application.trackingStatus} />
      <span className="text-[12px] font-medium text-[#52607b] md:text-right">
        {props.showDate
          ? compactDate(props.application.createdAt)
          : relativeTime(props.application.createdAt)}
      </span>
      <MoreHorizontal className="hidden h-4 w-4 text-[#31598f] md:block" />
      {props.trailing ? <div className="flex flex-wrap gap-2 md:justify-end">{props.trailing}</div> : null}
    </div>
  );
}

export function DashboardCvActions(props: {
  application?: DashboardApplication;
  applicationId?: string;
  disabled?: boolean;
}) {
  const applicationId = props.applicationId ?? props.application?.id;
  if (!applicationId) return null;

  const buttonClassName =
    "h-10 flex-1 justify-center rounded-[9px] border-white/72 bg-white/52 px-4 text-[13px] font-medium text-[#0b1c57] shadow-[0_10px_24px_rgba(65,82,132,0.08),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl hover:bg-white/68";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <ExportMenu
        applicationId={applicationId}
        buttonClassName={buttonClassName}
        className="contents"
        disabled={props.disabled}
        labels={{ docx: "Download DOCX", pdf: "Download PDF" }}
      />
    </div>
  );
}

export function LatestCvLink(props: { application: DashboardApplication }) {
  const draft = getLatestDraft(props.application);
  if (!draft) return <span className="text-sm font-bold text-[#8490a8]">No CV yet</span>;

  return (
    <Link
      className="inline-flex items-center gap-2 rounded-lg border border-[#dce5f2] bg-white px-3 py-2 text-sm font-extrabold text-[#1158ff] hover:bg-[#f4f7ff]"
      href={`/dashboard/applications/${props.application.id}`}
    >
      <FileText className="h-4 w-4" />
      Latest CV
    </Link>
  );
}

export function CheckBullet(props: { children: ReactNode }) {
  return (
    <li className="grid grid-cols-[24px_1fr] gap-4 text-[15px] font-bold leading-7 text-[#33466d]">
      <CheckCircle2 className="mt-1 h-5 w-5 fill-[#d9f8e7] text-[#23c66f]" />
      <span>{props.children}</span>
    </li>
  );
}
