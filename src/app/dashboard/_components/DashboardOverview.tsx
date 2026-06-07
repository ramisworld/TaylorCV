"use client";

import {
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import { A4CvPreview } from "~/components/cv-flow/A4CvPreview";
import type { StructuredCv } from "~/lib/cvDocument";
import { ExportMenu } from "./ExportMenu";
import { EmptyStateNewCvButton } from "./DashboardShell";
import { normalizeTrackerStatus, trackerStatusLabels } from "../tracking-status";

export type DashboardOverviewApplication = {
  id: string;
  title: string;
  companyName: string;
  trackingStatus: string;
  relativeCreatedAt: string;
  searchableStatus: string;
};

export function DashboardOverview(props: {
  applications: DashboardOverviewApplication[];
  greeting: {
    title: string;
    subtitle: string;
  };
  latestCv: {
    application: DashboardOverviewApplication;
    cv: StructuredCv;
    presentationJson: unknown;
  } | null;
  metrics: {
    applications: number;
    applicationsSubtext: string;
    responses: number;
    responsesSubtext: string;
    interviews: number;
    interviewsSubtext: string;
  };
}) {
  const visibleApplications = props.applications.slice(0, 7);

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4">
      <section className="pt-1">
        <div className="flex items-start justify-between gap-5 pr-0 lg:pr-[190px]">
          <div>
            <h1 className="text-[24px] font-semibold leading-tight text-[#081543]">
              {props.greeting.title}
            </h1>
            <p className="mt-1.5 text-[13px] font-medium text-[#536485]">
              {props.greeting.subtitle}
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          <MetricCard
            icon="applications"
            label="Applications"
            subtext={props.metrics.applicationsSubtext}
            value={props.metrics.applications}
          />
          <MetricCard
            icon="responses"
            label="Responses received"
            subtext={props.metrics.responsesSubtext}
            value={props.metrics.responses}
          />
          <MetricCard
            icon="interviews"
            label="Interviews"
            subtext={props.metrics.interviewsSubtext}
            value={props.metrics.interviews}
          />
        </div>
      </section>

      <section className="grid min-h-0 gap-5 xl:grid-cols-[minmax(0,1.58fr)_minmax(380px,0.72fr)]">
        <div className="min-h-0 rounded-[15px] border border-white/70 bg-white/38 px-5 py-4 shadow-[0_20px_52px_rgba(67,82,128,0.12),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[17px] font-semibold tracking-normal text-[#071026]">
              Applications tracker
            </h2>
            <button
              className="text-[12px] font-medium text-[#1158ff]"
              type="button"
            >
              View all
            </button>
          </div>
          {props.applications.length > 0 ? (
            <>
              <div className="mt-6 hidden grid-cols-[36px_minmax(0,1fr)_86px_68px_32px] items-center gap-3 px-3 text-[10px] font-medium uppercase tracking-[0.02em] text-[#6a7aa0] md:grid">
                <span />
                <span>Role</span>
                <span className="text-center">Status</span>
                <span className="text-center">Applied</span>
                <span />
              </div>
              <div className="mt-2 overflow-hidden rounded-[12px] border border-[#dce5f4]/54 bg-white/18">
                {visibleApplications.map((application) => (
                  <DashboardTrackerRow application={application} key={application.id} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-7 rounded-[14px] border border-dashed border-[#cfd9eb] bg-white/34 p-8 text-center">
              <p className="text-[15px] font-semibold text-[#071026]">
                No applications yet.
              </p>
              <p className="mt-1.5 text-[13px] font-medium text-[#617294]">
                Create your first tailored CV.
              </p>
              <EmptyStateNewCvButton />
            </div>
          )}
        </div>

        <div className="grid min-h-0 rounded-[15px] border border-white/70 bg-white/38 px-5 py-4 shadow-[0_20px_52px_rgba(67,82,128,0.12),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl lg:grid-rows-[auto_minmax(0,1fr)_auto]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[17px] font-semibold tracking-normal text-[#071026]">
                Latest tailored CV
              </h2>
              {props.latestCv ? (
                <Link
                  className="text-[12px] font-medium text-[#1158ff]"
                  href={`/dashboard/applications/${props.latestCv.application.id}`}
                >
                  View full CV
                </Link>
              ) : null}
            </div>
            {props.latestCv ? (
              <div className="mt-5">
                <p className="truncate text-[15px] font-semibold text-[#08112f]">
                  {props.latestCv.application.title}
                </p>
                <p className="mt-1.5 text-[13px] font-semibold text-[#07863d]">
                  Tailored for {props.latestCv.application.companyName}
                </p>
              </div>
            ) : null}
          </div>

          {props.latestCv ? (
            <div className="mt-5 min-h-0 overflow-hidden rounded-[10px]">
              <A4CvPreview
                className="h-full overflow-hidden"
                cropToFrame
                cv={props.latestCv.cv}
                documentStyle={{
                  borderRadius: "10px",
                  boxShadow: "0 12px 30px rgba(49,67,113,0.14)",
                  transformOrigin: "top center",
                }}
                fitToHeight={false}
                maxScale={1}
                presentationJson={props.latestCv.presentationJson}
                scrollableCrop
              />
            </div>
          ) : (
            <div className="mt-7 rounded-[14px] border border-dashed border-[#cfd9eb] bg-white/34 p-8 text-center">
              <p className="text-[15px] font-semibold text-[#071026]">No tailored CV yet.</p>
              <p className="mt-1.5 text-[13px] font-medium text-[#617294]">
                Generate a CV and it will appear here.
              </p>
            </div>
          )}

          {props.latestCv ? (
            <div className="mt-3">
              <DashboardCvActions applicationId={props.latestCv.application.id} />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function MetricCard(props: {
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

function StatusChip(props: { status: string }) {
  const status = normalizeTrackerStatus(props.status);
  return (
    <span className="inline-flex h-6 w-fit items-center justify-center gap-1.5 rounded-[8px] border border-white/72 bg-white/58 px-2.5 text-[11px] font-medium text-[#155dff] shadow-[0_7px_14px_rgba(65,82,132,0.08),inset_0_1px_0_rgba(255,255,255,0.72)]">
      <span className="h-[5px] w-[5px] rounded-full bg-current" />
      {trackerStatusLabels[status]}
    </span>
  );
}

function DashboardCvActions(props: { applicationId: string }) {
  const buttonClassName =
    "h-10 flex-1 justify-center rounded-[9px] border-white/72 bg-white/52 px-4 text-[13px] font-semibold text-[#1158ff] shadow-[0_10px_24px_rgba(65,82,132,0.08),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl hover:bg-white/68 [&_svg]:text-[#1158ff]";

  return (
    <ExportMenu
      applicationId={props.applicationId}
      buttonClassName={buttonClassName}
      className="grid gap-3 sm:grid-cols-2"
      labels={{ docx: "Download DOCX", pdf: "Download PDF" }}
    />
  );
}

function DashboardTrackerRow(props: { application: DashboardOverviewApplication }) {
  return (
    <div className="grid min-h-[56px] gap-3 border-b border-[#d9e3f4]/62 px-3 py-2.5 last:border-b-0 md:grid-cols-[36px_minmax(0,1fr)_86px_68px_32px] md:items-center">
      <span className="grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[9px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(229,237,255,0.56))] text-[#31598f] shadow-[0_8px_16px_rgba(54,78,140,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
        <Building2 className="h-[18px] w-[18px] stroke-[2]" />
      </span>
      <Link
        className="min-w-0 rounded-[10px] outline-none transition hover:bg-white/28 focus-visible:ring-4 focus-visible:ring-blue-200/60"
        href={`/dashboard/applications/${props.application.id}`}
      >
        <span className="block min-w-0">
          <span className="block truncate text-[12px] font-semibold leading-4 text-[#0a122d]">
            {props.application.title}
          </span>
          <span className="mt-0.5 block truncate text-[11px] font-medium leading-4 text-[#566481]">
            {props.application.companyName}
          </span>
        </span>
      </Link>
      <span className="justify-self-center">
        <StatusChip status={props.application.trackingStatus} />
      </span>
      <span className="justify-self-center text-[12px] font-medium text-[#52607b]">
        {props.application.relativeCreatedAt}
      </span>
      <span className="justify-self-center pr-1 text-center text-[16px] leading-none text-[#31598f]">
        ...
      </span>
    </div>
  );
}
