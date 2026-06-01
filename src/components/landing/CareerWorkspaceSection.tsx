"use client";

import {
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  FileText,
  Home,
  MessageCircle,
  Plus,
  Settings,
  SquareCheck,
  User,
} from "lucide-react";

import { cn } from "~/lib/utils";

type CareerWorkspaceSectionProps = {
  onGetStarted: () => void;
};

type StatusKey = "Interview" | "Applied" | "Response" | "Offer" | "Accepted";

type ApplicationRow = {
  company: string;
  logoSrc: string;
  role: string;
  status: StatusKey;
  updated: string;
};

const sidebarItems = [
  { label: "Overview", icon: Home },
  { label: "CVs", icon: FileText },
  { label: "Applications", icon: SquareCheck },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
] as const;

const metrics = [
  {
    icon: FileText,
    label: "CVs created",
    support: "↑ 18 this month",
    value: "38",
  },
  {
    icon: BriefcaseBusiness,
    label: "Applications tracked",
    support: "↑ 5 this week",
    value: "27",
  },
  {
    icon: MessageCircle,
    label: "Responses received",
    support: "↑ 3 this week",
    value: "14",
  },
  {
    icon: CalendarCheck,
    label: "Interviews",
    support: "↑ 4 this week",
    value: "8",
  },
] as const;

const applications: ApplicationRow[] = [
  {
    company: "Microsoft",
    logoSrc: "/assets/company-logos/microsoft.svg",
    role: "Senior Product Manager",
    status: "Interview",
    updated: "2d ago",
  },
  {
    company: "Stripe",
    logoSrc: "/assets/company-logos/stripe.svg",
    role: "Product Manager",
    status: "Applied",
    updated: "5d ago",
  },
  {
    company: "Shopify",
    logoSrc: "/assets/company-logos/shopify.svg",
    role: "Product Lead",
    status: "Response",
    updated: "1w ago",
  },
  {
    company: "Amazon",
    logoSrc: "/assets/company-logos/amazon.svg",
    role: "Product Manager",
    status: "Offer",
    updated: "1w ago",
  },
  {
    company: "OpenAI",
    logoSrc: "/assets/company-logos/openai.svg",
    role: "Head of Product",
    status: "Accepted",
    updated: "1w ago",
  },
  {
    company: "Databricks",
    logoSrc: "/assets/company-logos/databricks.svg",
    role: "Senior Product Manager",
    status: "Interview",
    updated: "2w ago",
  },
  {
    company: "Atlassian",
    logoSrc: "/assets/company-logos/atlassian.svg",
    role: "Group Product Manager",
    status: "Applied",
    updated: "2w ago",
  },
  {
    company: "Google",
    logoSrc: "/assets/company-logos/google.svg",
    role: "Product Manager II",
    status: "Response",
    updated: "3w ago",
  },
  {
    company: "Airbnb",
    logoSrc: "/assets/company-logos/airbnb.svg",
    role: "Lead Product Manager",
    status: "Offer",
    updated: "3w ago",
  },
  {
    company: "Canva",
    logoSrc: "/assets/company-logos/canva.svg",
    role: "Product Lead",
    status: "Accepted",
    updated: "4w ago",
  },
];

const statusStyles: Record<StatusKey, string> = {
  Accepted: "bg-[#e5f8f8] text-[#06929a]",
  Applied: "bg-[#e7f7ec] text-[#0b9a4a]",
  Interview: "bg-[#f0eaff] text-[#5b30f6]",
  Offer: "bg-[#fff2dc] text-[#e88913]",
  Response: "bg-[#eaf1ff] text-[#064fff]",
};

const logoFrameStyles: Record<string, string> = {
  Airbnb: "bg-white",
  Amazon: "bg-white",
  Atlassian: "bg-white",
  Canva: "bg-[linear-gradient(135deg,#00c4cc_0%,#7d2ae8_100%)]",
  Databricks: "bg-white",
  Google: "bg-white",
  Microsoft: "bg-white",
  OpenAI: "bg-white",
  Shopify: "bg-[#5eaa32]",
  Stripe: "bg-[#635bff]",
};

const achievements = [
  "Led roadmap for core platform used by 2M+ users, increasing activation by 28%.",
  "Shipped automation features that reduced support tickets by 25% and saved $1.2M annually.",
  "Defined experimentation framework that improved conversion rate by 16%.",
] as const;

function CompanyLogo(props: { company: string; logoSrc: string; large?: boolean }) {
  const isLarge = props.large === true;
  const logoSize = isLarge ? "h-[24px] w-[24px]" : "h-[24px] w-[24px]";
  const frameSize = isLarge ? "h-[30px] w-[30px]" : "h-8 w-8";

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[7px]",
        frameSize,
        logoFrameStyles[props.company] ?? "bg-white"
      )}
    >
      <img
        alt={props.company}
        className={cn(
          "object-contain",
          logoSize,
          props.company === "Amazon" && "w-[29px]",
          props.company === "Stripe" && "h-[22px] w-[22px]",
          props.company === "Shopify" && "h-[25px] w-[25px]",
          props.company === "OpenAI" && "h-[27px] w-[27px]",
          props.company === "Databricks" && "h-[29px] w-[29px]",
          props.company === "Canva" && "h-[24px] w-[24px]"
        )}
        src={props.logoSrc}
      />
    </span>
  );
}

function TaylorMark() {
  return (
    <span className="grid h-[28px] w-[28px] place-items-center rounded-[7px] bg-[linear-gradient(180deg,#245cff_0%,#0648f4_100%)] text-[18px] font-black leading-none text-white shadow-[0_8px_18px_rgba(32,71,240,0.26),inset_0_1px_0_rgba(255,255,255,0.28)]">
      T
    </span>
  );
}

function StatusPill(props: { status: StatusKey }) {
  return (
    <span
      className={cn(
        "inline-flex h-[23px] items-center gap-1.5 rounded-[7px] px-2.5 text-[11px] font-semibold leading-none",
        statusStyles[props.status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {props.status}
    </span>
  );
}

function MetricCard(props: (typeof metrics)[number]) {
  const Icon = props.icon;
  return (
    <div className="h-[114px] rounded-[11px] border border-[#e4e9f3] bg-white px-[15px] py-[16px] shadow-[0_13px_30px_rgba(26,38,68,0.055),inset_0_1px_0_rgba(255,255,255,0.96)]">
      <div className="flex items-start gap-[14px]">
        <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[9px] bg-[#f0f4ff] text-[#064fff]">
          <Icon className="h-[19px] w-[19px]" strokeWidth={2} />
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-[26px] font-semibold leading-[0.95] tracking-[-0.035em] text-[#090f25]">
            {props.value}
          </p>
          <p className="mt-3 truncate text-[11px] font-medium leading-none text-[#172441]">
            {props.label}
          </p>
          <p className="mt-3 text-[11px] font-semibold leading-none text-[#0aa85c]">
            {props.support}
          </p>
        </div>
      </div>
    </div>
  );
}

function ApplicationsTracker() {
  return (
    <section className="min-w-0 rounded-[12px] border border-[#e5eaf3] bg-white/92 px-[18px] pb-[17px] pt-[17px] shadow-[0_12px_28px_rgba(26,38,68,0.045),inset_0_1px_0_rgba(255,255,255,0.94)]">
      <div className="mb-[14px] flex items-center justify-between gap-4">
        <h3 className="text-[15px] font-semibold leading-none tracking-[-0.028em] text-[#070d22]">
          Applications tracker
        </h3>
        <span className="text-[11px] font-semibold leading-none text-[#064fff]">
          View all
        </span>
      </div>
      <div className="h-[366px] overflow-hidden">
        <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/dashboard:-translate-y-[244px] motion-reduce:transform-none motion-reduce:transition-none">
          {applications.map((application) => (
            <div
              className="grid h-[61px] grid-cols-[37px_minmax(0,1fr)_92px_45px] items-center gap-3 border-b border-[#edf1f7] last:border-b-0"
              key={`${application.company}-${application.role}`}
            >
              <CompanyLogo
                company={application.company}
                logoSrc={application.logoSrc}
              />
              <div className="min-w-0">
                <p className="truncate text-[11.5px] font-semibold leading-tight tracking-[-0.01em] text-[#10182f]">
                  {application.role}
                </p>
                <p className="mt-[6px] truncate text-[11px] font-medium leading-none text-[#314569]">
                  {application.company}
                </p>
              </div>
              <div className="flex justify-start">
                <StatusPill status={application.status} />
              </div>
              <p className="text-right text-[10.5px] font-medium leading-none text-[#37507b]">
                {application.updated}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestCvPreview() {
  return (
    <section className="min-w-0 rounded-[12px] border border-[#e5eaf3] bg-white/92 px-[18px] pb-[18px] pt-[17px] shadow-[0_12px_28px_rgba(26,38,68,0.045),inset_0_1px_0_rgba(255,255,255,0.94)]">
      <div className="mb-[14px] flex items-center justify-between gap-4">
        <h3 className="text-[15px] font-semibold leading-none tracking-[-0.028em] text-[#070d22]">
          Latest tailored CV
        </h3>
        <span className="whitespace-nowrap text-[11px] font-semibold leading-none text-[#064fff]">
          View full CV
        </span>
      </div>
      <div className="h-auto rounded-[9px] border border-[#e5eaf3] bg-white px-[17px] py-[17px] shadow-[inset_0_1px_0_rgba(255,255,255,0.98)] xl:h-[366px]">
        <header className="flex items-start justify-between gap-5 border-b border-[#e5eaf3] pb-[18px]">
          <div className="min-w-0">
            <h4 className="truncate text-[14px] font-semibold leading-none tracking-[-0.018em] text-[#071027]">
              Senior Product Manager
            </h4>
            <p className="mt-[10px] text-[11px] font-semibold leading-none text-[#0ba45d]">
              Tailored for Microsoft
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <CompanyLogo
              company="Microsoft"
              large
              logoSrc="/assets/company-logos/microsoft.svg"
            />
            <span className="text-[21px] font-medium leading-none tracking-[-0.035em] text-[#4b4f58]">
              Microsoft
            </span>
          </div>
        </header>
        <div className="pt-[18px]">
          <h5 className="text-[9.5px] font-bold uppercase leading-none tracking-[0.025em] text-[#17284a]">
            Professional Summary
          </h5>
          <p className="mt-[14px] max-w-[350px] text-[11px] font-medium leading-[1.75] text-[#314569]">
            Product manager with 6+ years building user-centered B2B and B2C
            products that drive engagement and measurable business impact.
          </p>
        </div>
        <div className="mt-[24px]">
          <h5 className="text-[9.5px] font-bold uppercase leading-none tracking-[0.025em] text-[#17284a]">
            Key Achievements
          </h5>
          <div className="mt-[16px] space-y-[16px]">
            {achievements.map((achievement) => (
              <div
                className="grid grid-cols-[15px_minmax(0,1fr)] gap-[12px]"
                key={achievement}
              >
                <span className="mt-0.5 grid h-[13px] w-[13px] place-items-center rounded-full bg-[#dff8e9] text-[#0ba45d]">
                  <Check className="h-[8px] w-[8px]" strokeWidth={3} />
                </span>
                <p className="max-w-[320px] text-[10.8px] font-medium leading-[1.62] text-[#314569]">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareerWorkspaceSection(props: CareerWorkspaceSectionProps) {
  return (
    <section className="relative z-10 -mt-[28px] overflow-hidden bg-transparent px-5 pb-[72px] pt-[120px] text-[#070d22] max-md:-mt-[14px] max-md:pb-[56px] max-md:pt-[86px]">
      <div className="pointer-events-none absolute inset-x-0 -top-[132px] h-[280px] bg-[radial-gradient(ellipse_at_50%_30%,rgba(247,249,255,0.34),rgba(247,249,255,0.14)_36%,transparent_72%),radial-gradient(ellipse_at_18%_26%,rgba(215,227,255,0.14),transparent_42%),radial-gradient(ellipse_at_82%_24%,rgba(232,224,255,0.12),transparent_40%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_81%_38%,rgba(248,223,239,0.24),transparent_51%),radial-gradient(ellipse_at_53%_0%,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.16)_36%,transparent_64%),radial-gradient(ellipse_at_16%_95%,rgba(221,234,255,0.12),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[160px] bg-[linear-gradient(180deg,transparent,rgba(248,250,255,0.08)_30%,rgba(255,255,255,0.28)_72%,rgba(251,253,255,0))]" />

      <div className="relative mx-auto max-w-[1010px] text-center">
        <p className="inline-flex h-[48px] items-center gap-3 rounded-full border border-[#e2e7f0] bg-white px-[25px] text-[15px] font-semibold leading-none text-[#064fff] shadow-[0_12px_26px_rgba(39,52,87,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]">
          <span className="relative h-[16px] w-[16px] text-[#064fff]">
            <span className="absolute left-[6px] top-0 h-[16px] w-[4px] rounded-full bg-current" />
            <span className="absolute left-0 top-[6px] h-[4px] w-[16px] rounded-full bg-current" />
            <span className="absolute left-[3px] top-[3px] h-[10px] w-[10px] rotate-45 rounded-[2px] border-[3px] border-current bg-white" />
          </span>
          Built for job seekers, proven by results
        </p>
        <h2 className="mx-auto mt-[17px] max-w-[970px] text-[clamp(3.25rem,5.4vw,5.15rem)] font-normal leading-[0.95] tracking-[-0.038em] text-[#070d22] [font-family:Georgia,ui-serif,Cambria,'Times_New_Roman',serif]">
          The career agent
          <br />
          that <span className="text-[#064fff]">improves</span> with you.
        </h2>
        <p className="mx-auto mt-[18px] max-w-[620px] text-[22px] font-normal leading-[1.42] tracking-[-0.018em] text-[#324b78] max-md:text-[18px]">
          TaylorCV remembers your strongest evidence, saved CVs, and job
          applications—so every step forward gets smarter.
        </p>
      </div>

      <div className="relative mx-auto mt-[20px] w-full max-w-[1152px]">
        <article className="group/dashboard h-auto overflow-hidden rounded-[18px] border border-[#dfe5ef] bg-white shadow-[0_30px_72px_rgba(31,43,73,0.16),0_5px_18px_rgba(27,38,64,0.055),inset_0_1px_0_rgba(255,255,255,0.98)] lg:h-[706px]">
          <div className="grid h-full grid-cols-1 lg:grid-cols-[214px_minmax(0,1fr)]">
            <aside className="border-b border-[#e9eef6] bg-[#fbfcff] px-[30px] py-[29px] lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-[12px]">
                <TaylorMark />
                <span className="text-[19px] font-bold leading-none tracking-[-0.045em] text-[#071027]">
                  TaylorCV
                </span>
              </div>
              <nav className="mt-[37px] grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-[21px]">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = item.label === "Overview";
                  return (
                    <div
                      className={cn(
                        "flex h-[47px] items-center gap-[15px] rounded-[9px] px-[14px] text-[13px] font-semibold transition-colors",
                        isSelected
                          ? "bg-[#eef3ff] text-[#064fff]"
                          : "text-[#30446d] hover:bg-[#f3f6fb] hover:text-[#071027]"
                      )}
                      key={item.label}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px]",
                          isSelected ? "text-[#064fff]" : "text-[#30446d]"
                        )}
                        strokeWidth={isSelected ? 2.2 : 1.9}
                      />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </nav>
            </aside>

            <div className="min-w-0 px-[27px] pb-[27px] pt-[22px]">
              <div className="flex items-center justify-end">
                <button
                  className="inline-flex h-[41px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#315cff]/35 bg-[linear-gradient(180deg,#1d5cff_0%,#064fff_56%,#0344df_100%)] px-[18px] text-[14px] font-semibold leading-none text-white shadow-[0_10px_23px_rgba(32,71,240,0.28),inset_0_1px_0_rgba(255,255,255,0.28)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(32,71,240,0.34),inset_0_1px_0_rgba(255,255,255,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2047f0]/22 active:translate-y-0"
                  onClick={props.onGetStarted}
                  type="button"
                >
                  <Plus className="h-[16px] w-[16px]" strokeWidth={2.15} />
                  New CV
                </button>
              </div>

              <div className="mt-[17px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              <div className="mt-[20px] grid grid-cols-1 gap-[16px] xl:grid-cols-[1.015fr_1fr]">
                <ApplicationsTracker />
                <LatestCvPreview />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
