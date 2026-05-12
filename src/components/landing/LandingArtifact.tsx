"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ClipboardList,
  FileText,
  Gauge,
  HelpCircle,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import type { ComponentType, ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type WorkflowCardProps = {
  accent: string;
  children: ReactNode;
  className?: string;
  icon: ComponentType<{ className?: string }>;
  index: number;
  title: string;
};

const checklist = [
  "Stronger evidence",
  "Keyword alignment",
  "Impact statements",
  "Skill coverage",
  "Role relevance",
];

function GhostLines(props: { compact?: boolean }) {
  return (
    <div
      className={["space-y-1", props.compact ? "w-full" : "w-[178px]"].join(
        " ",
      )}
    >
      <span className="block h-[5px] w-full rounded-full bg-slate-500/32" />
      <span className="block h-[5px] w-[94%] rounded-full bg-slate-500/28" />
      <span className="block h-[5px] w-[68%] rounded-full bg-slate-500/24" />
    </div>
  );
}

function WorkflowCard(props: WorkflowCardProps) {
  const Icon = props.icon;

  return (
    <motion.div
      className={[
        "relative overflow-hidden rounded-lg border border-white/12 bg-[#0a1421]/76 p-2 shadow-[0_18px_52px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.075)] backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.075),transparent_44%,rgba(0,184,255,0.06))]",
        props.className,
      ].join(" ")}
      whileHover={{ y: -2 }}
    >
      <div className="relative">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span
              className={[
                "flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-semibold text-white shadow-[0_0_16px_currentColor]",
                props.accent,
              ].join(" ")}
            >
              {props.index}
            </span>
            <p className="text-[12px] font-semibold tracking-[-0.01em] text-white">
              {props.title}
            </p>
          </div>
          <Icon className="h-4 w-4 text-current opacity-90" />
        </div>
        <div className="mt-1.5">{props.children}</div>
      </div>
    </motion.div>
  );
}

function MatchRing(props: {
  label: string;
  score: number;
  size?: "sm" | "lg";
  theme: "blue" | "green";
}) {
  const isSmall = props.size === "sm";
  const size = isSmall ? 74 : 100;
  const center = size / 2;
  const radius = isSmall ? 28 : 38;
  const stroke = isSmall ? 3.6 : 4.4;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - props.score / 100);
  const gradientId = `${props.theme}-${isSmall ? "small" : "large"}-gauge`;
  const trackColor =
    props.theme === "green"
      ? "rgba(148,163,184,0.18)"
      : "rgba(148,163,184,0.16)";
  const glowColor =
    props.theme === "green" ? "rgba(52,211,153,0.16)" : "rgba(96,165,250,0.16)";

  return (
    <div className="flex flex-col items-center">
      <svg
        aria-hidden="true"
        className="overflow-visible"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="10"
            x2={size - 10}
            y1="10"
            y2={size - 10}
          >
            {props.theme === "green" ? (
              <>
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="55%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#34d399" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="52%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#60a5fa" />
              </>
            )}
          </linearGradient>

          <filter
            id={`${gradientId}-glow`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              floodColor={glowColor}
              stdDeviation="2.2"
            />
          </filter>
        </defs>

        <circle
          cx={center}
          cy={center}
          fill="rgba(7,15,27,0.96)"
          r={radius + stroke * 0.78}
        />

        <circle
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          stroke={trackColor}
          strokeWidth={stroke}
        />

        <circle
          cx={center}
          cy={center}
          fill="none"
          filter={`url(#${gradientId}-glow)`}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth={stroke}
          transform={`rotate(-90 ${center} ${center})`}
        />

        <text
          dominantBaseline="central"
          fill="white"
          fontSize={isSmall ? 20 : 27}
          fontWeight="600"
          letterSpacing="-0.8"
          textAnchor="middle"
          x={center}
          y={isSmall ? center - 4 : center}
        >
          {props.score}%
        </text>

        {isSmall ? (
          <text
            fill="#f6c24b"
            fontSize="7.6"
            fontWeight="600"
            textAnchor="middle"
            x={center}
            y={center + 15}
          >
            {props.label}
          </text>
        ) : null}
      </svg>

      {!isSmall ? (
        <p className="mt-2 bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-[12px] font-semibold text-transparent">
          {props.label}
        </p>
      ) : null}
    </div>
  );
}

function WorkflowStack() {
  return (
    <div className="relative z-20 flex flex-col gap-2.5 xl:absolute xl:left-0 xl:top-[30px] xl:w-[282px]">
      <WorkflowCard
        accent="bg-blue-500 text-blue-300"
        icon={ClipboardList}
        index={1}
        title="Job description"
      >
        <p className="text-[11.5px] font-medium text-white">
          Senior Product Manager
        </p>
        <p className="mt-1 text-[10.5px] text-slate-300">
          SaaS - B2B - Remote
        </p>
        <div className="mt-2">
          <GhostLines />
        </div>
      </WorkflowCard>

      <WorkflowCard
        accent="bg-emerald-400 text-emerald-300"
        icon={UserRound}
        index={2}
        title="Your background"
      >
        <p className="text-[11.5px] text-white">12+ years experience</p>
        <p className="mt-1 text-[10.5px] text-slate-300">
          Product - Analytics - Strategy
        </p>
        <div className="mt-2">
          <GhostLines />
        </div>
      </WorkflowCard>

      <WorkflowCard
        accent="bg-violet-500 text-violet-300"
        className="xl:w-[282px]"
        icon={Gauge}
        index={3}
        title="Current match"
      >
        <div className="grid grid-cols-[78px_1fr] items-center gap-2.5">
          <MatchRing label="Fair match" score={55} size="sm" theme="blue" />
          <div>
            <p className="text-[10.5px] font-semibold text-white">
              Top strengths
            </p>
            <ul className="mt-1.5 space-y-0.5 text-[9.5px] leading-tight text-slate-300">
              <li>Product Strategy</li>
              <li>Data Analysis</li>
              <li>Stakeholder Mgmt</li>
            </ul>
            <p className="mt-2 inline-flex items-center gap-1 text-[9.5px] font-semibold text-cyan-300">
              See full breakdown <ArrowRight className="h-3 w-3" />
            </p>
          </div>
        </div>
      </WorkflowCard>

      <WorkflowCard
        accent="bg-cyan-400 text-cyan-300"
        className="xl:w-[282px]"
        icon={Search}
        index={4}
        title="Evidence found"
      >
        <p className="text-[11px] leading-[1.45] text-slate-200">
          We found 18 strong evidence points from your background.
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Strategy", "Metrics", "Leadership", "Roadmaps"].map((tag) => (
            <span
              className="rounded border border-white/12 bg-white/[0.05] px-1.5 py-0.5 text-[8.5px] text-slate-200"
              key={tag}
            >
              {tag}
            </span>
          ))}
          <span className="px-0.5 py-0.5 text-[8.5px] font-semibold text-cyan-300">
            +14 more
          </span>
        </div>
      </WorkflowCard>

      <WorkflowCard
        accent="bg-amber-400 text-amber-300"
        className="xl:w-[282px]"
        icon={HelpCircle}
        index={5}
        title="Gap question"
      >
        <p className="text-[10.5px] leading-[1.42] text-slate-200">
          How much direct experience do you have leading cross-functional teams
          through product launches?
        </p>
        <button
          className="mt-2 inline-flex cursor-default items-center gap-1.5 rounded border border-amber-300/20 bg-amber-400/14 px-2.5 py-1.5 text-[10px] font-semibold text-amber-100"
          type="button"
        >
          Add your answer <ArrowRight className="h-3 w-3" />
        </button>
      </WorkflowCard>
    </div>
  );
}

function CvSection(props: { children: ReactNode; title: string }) {
  return (
    <section className="border-t border-slate-200 pt-2.5">
      <h3 className="text-[8.8px] font-bold uppercase tracking-[0.01em] text-blue-700">
        {props.title}
      </h3>
      <div className="mt-1.5">{props.children}</div>
    </section>
  );
}

function CvPreview() {
  return (
    <article className="relative z-10 overflow-hidden rounded-xl bg-white px-7 py-6 text-slate-950 shadow-[0_0_0_1px_rgba(219,234,254,0.86),0_0_48px_rgba(0,174,255,0.32),0_30px_90px_rgba(0,163,255,0.2)] xl:absolute xl:left-[330px] xl:top-[18px] xl:h-[642px] xl:w-[456px]">
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_72%_2%,rgba(59,130,246,0.12),transparent_28%)]" />
      <div className="relative">
        <header className="flex items-start justify-between gap-5 pb-3.5">
          <div>
            <h2 className="text-[25px] font-bold tracking-[-0.055em] text-slate-950">
              Alex Morgan
            </h2>
            <p className="mt-0.5 text-[11.5px] font-bold text-blue-600">
              Senior Product Manager
            </p>
            <p className="mt-2 text-[7.8px] text-slate-600">
              London, UK &nbsp;&bull;&nbsp; alex.morgan@email.com
              &nbsp;&bull;&nbsp; linkedin.com/in/alexmorgan
            </p>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[6.8px] font-bold uppercase text-blue-500">
            Tailored for this role <Sparkles className="h-2.5 w-2.5" />
          </div>
        </header>

        <div className="space-y-3">
          <CvSection title="Professional Summary">
            <p className="text-[8.6px] leading-[1.44] text-slate-700">
              Product leader with 12+ years driving strategy and execution for
              B2B SaaS products. Proven track record of delivering
              customer-centric solutions that accelerate growth, improve
              retention and expand market share.
            </p>
          </CvSection>

          <CvSection title="Key Achievements">
            <div className="space-y-2 text-[8.5px] leading-[1.35] text-slate-700">
              {[
                "Led cross-functional team to deliver new analytics platform, driving 32% increase in activation and $7.2M ARR within 12 months.",
                "Redesigned pricing and packaging strategy resulting in 18% uplift in conversion and 25% improvement in gross margin.",
                "Established customer insights program that reduced churn by 14% and increased NPS from 32 to 55.",
              ].map((item) => (
                <div className="grid grid-cols-[21px_1fr] gap-2.5" key={item}>
                  <span className="flex h-[21px] w-[21px] items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <BriefcaseBusiness className="h-3 w-3" />
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </CvSection>

          <CvSection title="Experience">
            <div className="space-y-2.5 text-[8.5px] leading-[1.34] text-slate-700">
              <div>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-950">
                      Senior Product Manager
                    </p>
                    <p className="font-semibold">DataFlow (B2B SaaS)</p>
                  </div>
                  <p className="text-right text-[7.8px] text-slate-600">
                    2021 - Present
                    <br />
                    London, UK
                  </p>
                </div>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-3.5">
                  <li>
                    Own product strategy and roadmap for analytics suite serving
                    10k+ customers.
                  </li>
                  <li>
                    Partner with engineering, design and go-to-market to deliver
                    impactful solutions.
                  </li>
                  <li>
                    Delivered 6 major releases improving activation, retention
                    and revenue.
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-950">Product Manager</p>
                    <p className="font-semibold">Insightly</p>
                  </div>
                  <p className="text-right text-[7.8px] text-slate-600">
                    2017 - 2021
                    <br />
                    London, UK
                  </p>
                </div>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-3.5">
                  <li>
                    Led discovery and delivery for core platform features used
                    by 50k+ users.
                  </li>
                  <li>
                    Improved onboarding experience resulting in 27% increase in
                    trial conversion.
                  </li>
                  <li>
                    Built reporting dashboards that increased operational
                    efficiency by 20%.
                  </li>
                </ul>
              </div>
            </div>
          </CvSection>

          <CvSection title="Education">
            <div className="space-y-2 text-[8.5px] leading-[1.32] text-slate-700">
              <div className="flex justify-between gap-4">
                <p>
                  <span className="font-bold text-slate-950">
                    MSc Management
                  </span>
                  <br />
                  London Business School
                </p>
                <p className="text-right text-[7.8px] text-slate-600">
                  Distinction
                  <br />
                  2011 - 2012
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <p>
                  <span className="font-bold text-slate-950">
                    BSc Business Information Systems
                  </span>
                  <br />
                  University of Manchester
                </p>
                <p className="text-right text-[7.8px] text-slate-600">
                  First Class
                  <br />
                  2007 - 2010
                </p>
              </div>
            </div>
          </CvSection>
        </div>
      </div>
    </article>
  );
}

function ImprovedMatchCard() {
  return (
    <aside className="relative z-20 overflow-hidden rounded-xl border border-emerald-300/18 bg-[#071922]/84 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.38),0_0_46px_rgba(16,185,129,0.1),inset_0_1px_0_rgba(255,255,255,0.075)] backdrop-blur-2xl xl:absolute xl:left-[818px] xl:top-[190px] xl:w-[214px]">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),transparent_42%,rgba(16,185,129,0.09))]" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-semibold text-white shadow-[0_0_18px_rgba(52,211,153,0.55)]">
              6
            </span>
            <p className="text-[12px] font-semibold text-white">
              Improved match
            </p>
          </div>
          <FileText className="h-3.5 w-3.5 text-emerald-400" />
        </div>

        <MatchRing label="Excellent match" score={91} theme="green" />

        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-[10.5px] font-semibold text-white">
            What improved
          </p>
          <ul className="mt-3 space-y-2.5">
            {checklist.map((item) => (
              <li
                className="flex items-center gap-2 text-[10.5px] text-slate-300"
                key={item}
              >
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-[#071922]">
                  <Check className="h-2.5 w-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mt-4 inline-flex min-h-9 w-full cursor-default items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.065] px-3 text-[10.5px] font-semibold text-white"
          type="button"
        >
          View full breakdown <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </aside>
  );
}

function ConnectorLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible xl:block"
      viewBox="0 0 1050 680"
    >
      <defs>
        <linearGradient id="connectorBlue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(0,186,255,0.26)" />
          <stop offset="46%" stopColor="rgba(0,186,255,0.96)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.38)" />
        </linearGradient>
        <filter id="connectorGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur result="blur" stdDeviation="3.2" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M282 70 H302 C320 70 318 96 330 96"
        fill="none"
        filter="url(#connectorGlow)"
        stroke="url(#connectorBlue)"
        strokeLinecap="round"
        strokeWidth="2.2"
      />

      <path
        d="M282 158 H304 C322 158 318 178 330 178"
        fill="none"
        filter="url(#connectorGlow)"
        stroke="url(#connectorBlue)"
        strokeLinecap="round"
        strokeWidth="2.2"
      />

      <path
        d="M282 264 H330"
        fill="none"
        filter="url(#connectorGlow)"
        stroke="url(#connectorBlue)"
        strokeLinecap="round"
        strokeWidth="2.2"
      />

      <path
        d="M282 384 H304 C322 384 318 362 330 362"
        fill="none"
        filter="url(#connectorGlow)"
        stroke="url(#connectorBlue)"
        strokeLinecap="round"
        strokeWidth="2.2"
      />

      <path
        d="M282 506 H304 C322 506 318 474 330 474"
        fill="none"
        filter="url(#connectorGlow)"
        stroke="url(#connectorBlue)"
        strokeLinecap="round"
        strokeWidth="2.2"
      />

      <path
        d="M786 340 H818"
        fill="none"
        filter="url(#connectorGlow)"
        stroke="url(#connectorBlue)"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function LandingArtifact() {
  return (
    <motion.div
      className={[
        "relative mx-auto grid w-full max-w-[980px] gap-6",
        "xl:block xl:h-[calc(680px*var(--artifact-scale))] xl:w-[calc(1050px*var(--artifact-scale))] xl:max-w-none",
        "xl:[--artifact-scale:.82]",
        "min-[1500px]:[--artifact-scale:.86]",
        "min-[1700px]:[--artifact-scale:.94]",
        "min-[1900px]:[--artifact-scale:1.02]",
        "min-[2200px]:[--artifact-scale:1.16]",
        "min-[3000px]:[--artifact-scale:1.55]",
      ].join(" ")}
      initial="hidden"
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      viewport={{ once: true }}
      whileInView="visible"
    >
      <div className="relative grid gap-6 xl:block xl:h-[680px] xl:w-[1050px] xl:origin-top-left xl:scale-[var(--artifact-scale)]">
        <div className="pointer-events-none absolute inset-y-8 left-[286px] hidden w-[720px] rounded-[56px] bg-[radial-gradient(circle_at_52%_48%,rgba(0,209,255,0.22),transparent_48%)] blur-3xl xl:block" />
        <ConnectorLines />
        <WorkflowStack />
        <CvPreview />
        <ImprovedMatchCard />
      </div>
    </motion.div>
  );
}
