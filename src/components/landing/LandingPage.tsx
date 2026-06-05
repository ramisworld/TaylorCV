"use client";

import {
  Check,
  ChevronDown,
  CircleCheck,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";

import { type PlanKey } from "~/lib/plans";

import { LandingBackground } from "./LandingBackground";
import { GlassHeader } from "./GlassHeader";
import { PrimaryButton } from "./GlassButton";
import { LiquidGlassDefs } from "./LiquidGlassDefs";
import { CareerWorkspaceSection } from "./CareerWorkspaceSection";
import { MissingProofSection } from "./MissingProofSection";
import { ProofStrip } from "./ProofStrip";

type LandingPageProps = {
  error?: string | null;
  isLoading: boolean;
  onGetStarted: () => void;
  onPlanSelected?: (planKey: PlanKey) => void;
};

const requirements = [
  "Product leadership",
  "Rapid iteration mindset",
  "Manufacturing scale & cost focus",
  "AI / software product execution",
  "Cross-functional alignment",
  "High-velocity decision making",
] as const;

const gapRows = [
  {
    icon: "people",
    question: "What is the largest team you led to deliver a complex product?",
    status: "Matched",
    tone: "green",
  },
  {
    icon: "factory",
    question: "Share a measurable example of manufacturing impact at scale.",
    status: "Needs stronger evidence",
    tone: "amber",
  },
  {
    icon: "lock",
    question: "What AI or software product did you ship end-to-end?",
    status: "Missing proof",
    tone: "red",
  },
] as const;

const cvAchievements = [
  "Led Falcon 9 from concept to most-flown launch vehicle, driving reusability and >10x reduction in launch cost.",
  "Scaled Starlink to millions of users and built the world's largest LEO constellation manufacturing and deployment system.",
  "Integrated AI capabilities into products and operations to improve autonomy, forecasting, and decision velocity.",
] as const;

const cvSkills = [
  "Product Leadership",
  "Engineering Leadership",
  "Manufacturing Scale",
  "AI & Software Products",
  "Systems Thinking",
  "Cost & Margin Focus",
  "Cross-functional Alignment",
  "High-velocity Execution",
] as const;

const faqItems = [
  {
    question: "Is TaylorCV built for New Zealand job seekers?",
    answer:
      "Yes. The product is designed around practical job ads, concise one-page CVs, and the evidence employers expect from students, graduates, tradespeople, and professionals.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. This version is focused on one fast anonymous flow: paste the job, upload the CV, answer any short gap questions, and export the final result.",
  },
  {
    question: "Is the CV ATS-safe?",
    answer:
      "TaylorCV keeps the generated CV document-like, structured, and readable. It avoids decorative layouts that can make applicant tracking systems harder to parse.",
  },
  {
    question: "Are the company names endorsements?",
    answer:
      "No. The proof strip uses the wording 'professionals at' to avoid implying official company endorsement.",
  },
] as const;

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TaylorLogoIcon(props: { className?: string }) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className={cn("shrink-0 object-contain", props.className ?? "h-9 w-9")}
      src="/assets/taylorcv-logo-transparent.png"
    />
  );
}

function TaylorWordmark(props: { center?: boolean; compact?: boolean }) {
  return (
    <div
      aria-label="TaylorCV"
      className={cn(
        "flex min-w-0 items-center gap-2.5",
        props.center && "justify-center",
      )}
    >
      <TaylorLogoIcon
        className={props.compact ? "h-[34px] w-[34px]" : "h-9 w-9"}
      />
      <span
        className={cn(
          "truncate font-bold tracking-[-0.04em] text-[#080d22]",
          props.compact ? "text-[25px]" : "text-[28px]",
        )}
      >
        TaylorCV
      </span>
    </div>
  );
}

function ScoreRing({ isHovered }: { isHovered?: boolean }) {
  const radius = 47;
  const circumference = 2 * Math.PI * radius;

  const percent = useMotionValue(84);
  const smoothPercent = useSpring(percent, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const target = isHovered ? 99.7 : 84;
    const controls = animate(percent, target, {
      duration: 0.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isHovered, percent]);

  const offset = useTransform(
    smoothPercent,
    (v) => circumference * (1 - v / 100),
  );
  const rVal = useTransform(smoothPercent, [84, 99.7], [42, 4]);
  const gVal = useTransform(smoothPercent, [84, 99.7], [83, 214]);
  const bVal = useTransform(smoothPercent, [84, 99.7], [250, 138]);

  const color = useTransform(
    [rVal, gVal, bVal],
    ([rv, gv, bv]) =>
      `rgb(${Math.round(rv as number)}, ${Math.round(gv as number)}, ${Math.round(bv as number)})`,
  );

  const displayPercent = useTransform(smoothPercent, (v) => `${v.toFixed(1)}%`);

  return (
    <div className="relative grid h-[126px] w-[126px] place-items-center">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        shapeRendering="geometricPrecision"
        viewBox="0 0 126 126"
      >
        <circle
          cx="63"
          cy="63"
          fill="none"
          r={radius}
          stroke="#e8eefb"
          strokeWidth="6"
        />
        <motion.circle
          cx="63"
          cy="63"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeWidth="6"
          style={{ strokeDashoffset: offset, stroke: color }}
          transform="rotate(-96 63 63)"
        />
      </svg>
      <div className="relative text-center">
        <motion.p className="tabular-nums text-[27px] font-semibold leading-[1.05] tracking-[-0.018em] text-[#080d22]">
          {displayPercent}
        </motion.p>
        <p className="mt-1 text-[10.5px] font-medium leading-none text-[#64718d]">
          Overall fit
        </p>
      </div>
    </div>
  );
}

function CardShell(props: {
  children: React.ReactNode;
  className?: string;
  index: number;
  title: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <article
      className={cn(
        "relative min-h-[444px] overflow-hidden rounded-[15px] border border-[rgba(255,255,255,0.88)] bg-[radial-gradient(ellipse_at_17%_8%,rgba(255,255,255,0.86),transparent_34%),radial-gradient(ellipse_at_85%_88%,rgba(210,204,255,0.18),transparent_36%),linear-gradient(152deg,rgba(255,255,255,0.82),rgba(255,255,255,0.42)),rgba(255,255,255,0.3)] p-7 text-[#080d22] shadow-[0_30px_88px_rgba(64,68,144,0.14),0_12px_30px_rgba(64,68,144,0.06),inset_0_1px_0_rgba(255,255,255,0.98),inset_0_-1px_0_rgba(118,108,255,0.08)] backdrop-blur-[28px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(124deg,rgba(255,255,255,0.82),transparent_39%),linear-gradient(90deg,rgba(96,126,255,0.045),transparent_20%,transparent_76%,rgba(130,82,255,0.055)),radial-gradient(ellipse_at_76%_8%,rgba(228,238,255,0.36),transparent_30%)] before:opacity-95 after:pointer-events-none after:absolute after:inset-[1px] after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.56),inset_0_2px_0_rgba(255,255,255,0.84),inset_0_-2px_0_rgba(98,88,218,0.1),inset_0_0_26px_rgba(255,255,255,0.34)] [transform:translateZ(0)_scale(1)] transition-[transform,box-shadow,border-color,filter] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:[transform:translateZ(0)_scale(1.03)] hover:border-[rgba(255,255,255,0.96)] hover:shadow-[0_36px_104px_rgba(64,68,144,0.2),0_16px_38px_rgba(64,68,144,0.09),0_0_30px_rgba(118,108,255,0.12),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(118,108,255,0.1)] hover:brightness-[1.02] hover:saturate-[1.04] motion-reduce:transform-none motion-reduce:transition-none xl:h-[444px]",
        props.className,
      )}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-4">
          <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-[#2450f4] text-[17px] font-bold text-white shadow-[0_8px_18px_rgba(32,71,240,0.24),inset_0_1px_0_rgba(255,255,255,0.25)]">
            {props.index}
          </span>
          <h3 className="text-[18px] font-semibold tracking-[-0.025em]">
            {props.title}
          </h3>
        </div>
        {props.children}
      </div>
    </article>
  );
}

function JobAdCard() {
  return (
    <CardShell index={1} title="Paste job ad">
      <div className="overflow-hidden rounded-[10px] border border-[#dfe5ef] bg-white shadow-[0_16px_32px_rgba(8,13,34,0.075)]">
        <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-b border-[#e5eaf2] p-3">
          <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[8px] border border-[#edf1f6] bg-white shadow-[0_5px_12px_rgba(8,13,34,0.04)]">
            <img
              alt="SpaceX"
              className="h-8 w-[50px] object-contain"
              src="/assets/company-logos/spacex-x.svg"
            />
          </span>
          <div className="min-w-0">
            <p className="max-w-[230px] text-[12.5px] font-bold leading-snug tracking-[-0.02em]">
              Senior Product & Engineering Executive
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#2047f0]">
              SpaceX
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9.5px] font-medium text-[#56627d]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                Hawthorne, CA
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full border border-[#9aa7bd]" />
                Full-time
              </span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <p className="mb-2 text-[12px] font-bold tracking-[-0.015em]">
            Key requirements
          </p>
          <div className="flex flex-wrap gap-2">
            {requirements.map((requirement) => (
              <span
                className="inline-flex min-h-[28px] w-fit items-center gap-2.5 rounded-full border border-[#e0e6ef] bg-[#fbfcff] px-3.5 text-[11px] font-medium text-[#25314d]"
                key={requirement}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#2047f0]" />
                {requirement}
              </span>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function GapIcon(props: { type: (typeof gapRows)[number]["icon"] }) {
  if (props.type === "people") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
        <circle
          cx="6"
          cy="5"
          fill="none"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2.8 12.5c.45-2 1.55-3 3.2-3s2.75 1 3.2 3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M10.2 7.3a2 2 0 1 0-.15-3.65"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M10.7 9.7c1.25.2 2.08 1.1 2.5 2.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  if (props.type === "factory") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
        <path
          d="M2.5 12.8V6.3l3.3 2.1V6.3l3.4 2.1V4.1h3.2v8.7"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M2.2 12.8h11.6M5 11h1.2M8 11h1.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 16 16">
      <rect
        fill="none"
        height="7"
        rx="1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        width="9"
        x="3.5"
        y="6.5"
      />
      <path
        d="M5.2 6.5V5a2.8 2.8 0 0 1 5.6 0v1.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FitGapsCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <CardShell
      className="min-h-[444px] lg:min-w-[440px]"
      index={2}
      title="Role fit + gaps to answer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-[132px_minmax(0,1fr)] items-center gap-3.5 max-sm:grid-cols-1">
        <ScoreRing isHovered={hovered} />
        <div className="flex items-start gap-3 rounded-[10px] bg-[#f1f4fc] p-4">
          <svg
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#2450f4]"
            viewBox="0 0 18 18"
          >
            <path
              d="M9 1.6 10.4 6l4.4 1.4-4.4 1.4L9 13.2 7.6 8.8 3.2 7.4 7.6 6 9 1.6Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
            <path
              d="m14.2 12.4.45 1.45 1.45.45-1.45.45-.45 1.45-.45-1.45-1.45-.45 1.45-.45.45-1.45Z"
              fill="currentColor"
            />
          </svg>
          <p className="text-[12.3px] font-medium leading-[1.62] text-[#34415f]">
            <span className="font-semibold text-[#2047f0]">
              TaylorCV found a few gaps.
            </span>
            <br />
            Answer 3 quick questions to
            <br />
            strengthen your match and
            <br />
            unlock your tailored CV.
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-2.5 text-[12.5px] font-bold">
          3 smart questions to answer
        </p>
        <div className="overflow-hidden rounded-[10px] border border-[#dfe5ef] bg-white">
          {gapRows.map((row) => (
            <div
              className="grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e7ecf4] px-3.5 py-2.5 last:border-b-0 max-sm:grid-cols-[32px_minmax(0,1fr)]"
              key={row.question}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#eef3ff] text-[#2047f0]">
                <GapIcon type={row.icon} />
              </span>
              <p className="text-[10.8px] font-medium leading-[1.55] text-[#263252]">
                {row.question}
              </p>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-center text-[9.5px] font-semibold leading-tight max-sm:col-start-2 max-sm:w-fit",
                  row.tone === "green" && "bg-[#daf6e9] text-[#07814f]",
                  row.tone === "amber" && "bg-[#fff0d9] text-[#c66a00]",
                  row.tone === "red" && "bg-[#ffe4e8] text-[#d43857]",
                )}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

function CvPreviewCard() {
  return (
    <CardShell index={3} title="Get tailored CV">
      <div
        className="rounded-[9px] border border-[#dfe5ef] bg-white px-4 py-3 shadow-[0_14px_30px_rgba(8,13,34,0.065)]"
        id="example-cv"
      >
        <header className="border-b border-[#e4e9f2] pb-2.5">
          <h4 className="text-[21px] font-bold leading-none tracking-[-0.045em] text-[#080d22]">
            Elon Musk
          </h4>
          <p className="mt-1 text-[10.5px] font-bold text-[#2047f0]">
            Senior Product & Engineering Executive
          </p>
          <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[6.8px] font-medium text-[#4d5872]">
            <span>Hawthorne, CA</span>
            <span>elon@spacex.com</span>
            <span>linkedin.com/in/elonmusk</span>
          </p>
        </header>
        <CvSection title="Professional Summary">
          Product and engineering executive with a track record of building and
          scaling breakthrough technologies at SpaceX, Tesla, and xAI. Expert in
          product strategy, system design, manufacturing scale, and rapid
          iteration to deliver fundamentally better, lower-cost products to
          market.
        </CvSection>
        <CvSection title="Selected Achievements">
          <div className="space-y-1.5">
            {cvAchievements.map((achievement) => (
              <div
                className="grid grid-cols-[15px_minmax(0,1fr)] gap-2"
                key={achievement}
              >
                <span className="mt-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#2047f0] text-white">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        </CvSection>
        <CvSection title="Core Skills">
          <div className="flex flex-wrap gap-1.5">
            {cvSkills.map((skill) => (
              <span
                className="rounded-full bg-[#edf1f8] px-2 py-0.5 text-[7.5px] font-semibold text-[#33405f]"
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </CvSection>
      </div>
    </CardShell>
  );
}

function CvSection(props: { children: React.ReactNode; title: string }) {
  return (
    <section className="border-b border-[#e8edf4] py-2 text-[8.2px] leading-[1.34] text-[#1f2a44] last:border-b-0 last:pb-0">
      <h5 className="mb-1.5 text-[7.4px] font-bold uppercase tracking-[0.03em] text-[#10182d]">
        {props.title}
      </h5>
      {props.children}
    </section>
  );
}

function WorkflowCards() {
  return (
    <motion.div
      animate="visible"
      className="relative mx-auto mt-5 grid w-full max-w-[1450px] grid-cols-[0.98fr_1.1fr_1.05fr] gap-8 px-12 max-xl:grid-cols-1 max-xl:px-5"
      initial="hidden"
      transition={{ staggerChildren: 0.08, delayChildren: 0.18 }}
    >
      <motion.div
        className="relative"
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        variants={entrance}
      >
        <JobAdCard />
      </motion.div>
      <motion.div
        className="relative"
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        variants={entrance}
      >
        <FitGapsCard />
      </motion.div>
      <motion.div
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        variants={entrance}
      >
        <CvPreviewCard />
      </motion.div>
    </motion.div>
  );
}

function Hero(props: LandingPageProps) {
  return (
    <section className="relative z-10 pb-[14px] pt-4 md:pb-[24px] md:pt-16">
      <motion.div
        animate="visible"
        className="mx-auto max-w-[960px] px-5 text-center"
        initial="hidden"
        transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
      >
        <motion.h1
          className="mx-auto inline-flex w-fit max-w-none flex-col items-center text-center text-[clamp(2.1rem,6vw,4.9rem)] font-bold leading-[0.96] tracking-[-0.06em] text-[#080d22] sm:text-[clamp(2.8rem,4.4vw,4.9rem)]"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          variants={entrance}
        >
          <span className="block whitespace-nowrap">
            Paste one job. Get a CV built
          </span>
          <span className="block whitespace-nowrap">for the interview.</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-3 max-w-[680px] text-[16px] leading-7 text-[#33405f]"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          variants={entrance}
        >
          TaylorCV reads the role, compares your background, and builds a sharp,
          <br className="hidden sm:block" /> one-page CV that proves you’re the
          right hire.
        </motion.p>
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-5"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          variants={entrance}
        >
          <PrimaryButton
            className="min-w-[285px]"
            disabled={props.isLoading}
            onClick={props.onGetStarted}
            trailingArrow
          >
            {props.isLoading ? "Starting..." : "See what my CV is missing"}
          </PrimaryButton>
        </motion.div>
        {props.error ? (
          <p className="mx-auto mt-4 max-w-xl rounded-[10px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
            {props.error}
          </p>
        ) : null}
        <motion.p
          className="mx-auto mt-4 flex max-w-[520px] items-center justify-center gap-2.5 text-center text-[15px] font-medium text-[#435070]"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          variants={entrance}
        >
          <span className="grid h-5 w-5 place-items-center text-[#2047f0]">
            <ShieldCheck
              className="h-5 w-5 fill-[#2047f0] text-white"
              strokeWidth={2.1}
            />
          </span>
          Built for job ads, ATS systems, and one-page CVs.
        </motion.p>
      </motion.div>
      <div id="examples">
        <WorkflowCards />
      </div>
      <ProofStrip />
    </section>
  );
}

function LaunchSection(props: LandingPageProps) {
  const bullets = [
    "Paste a target job description",
    "Upload or paste a candidate CV",
    "Answer up to three targeted gap questions",
    "Generate a structured tailored CV",
    "Preview the final one-page result",
    "Export PDF or DOCX immediately",
  ];

  return (
    <section
      className="relative z-10 -mt-[26px] bg-transparent px-6 pb-24 pt-[88px] md:-mt-[34px] md:pt-[78px]"
      id="launch"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-[88px] h-[220px] bg-[radial-gradient(ellipse_at_50%_34%,rgba(255,255,255,0.42),rgba(245,248,255,0.18)_34%,rgba(235,241,255,0.08)_54%,transparent_76%),radial-gradient(ellipse_at_16%_28%,rgba(217,229,255,0.14),transparent_40%),radial-gradient(ellipse_at_84%_24%,rgba(233,224,255,0.14),transparent_42%)] blur-3xl" />
      <div className="mx-auto max-w-[920px]">
        <div className="text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#2047f0]">
            Launch
          </p>
          <h2 className="mt-4 text-[clamp(2.15rem,3vw,3.55rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#080d22]">
            One focused flow, live first.
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[17px] leading-7 text-[#42506d]">
            TaylorCV is currently set up for the core anonymous experience only:
            job description, CV upload, gap questions, final CV preview, PDF,
            and DOCX export.
          </p>
        </div>

        <article className="mt-12 rounded-[22px] border border-[#dfe5ef] bg-white p-8 shadow-[0_22px_48px_rgba(29,42,78,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h3 className="text-[31px] font-semibold tracking-[-0.04em] text-[#080d22]">
                What you can do right now
              </h3>
              <ul className="mt-6 grid gap-3">
                {bullets.map((bullet) => (
                  <li
                    className="flex items-center gap-3 text-[15px] text-[#263252]"
                    key={bullet}
                  >
                    <CircleCheck className="h-4.5 w-4.5 text-[#04ae66]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[18px] bg-[#f3f6fb] p-6">
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2047f0]">
                MVP scope
              </p>
              <p className="mt-4 text-[17px] font-semibold leading-7 text-[#080d22]">
                No signup. No billing. No extra workflow.
              </p>
              <p className="mt-3 text-[14.5px] leading-6 text-[#42506d]">
                This deploy is intentionally narrowed to the fastest useful path
                so you can get the core product live cleanly.
              </p>
              <PrimaryButton
                className="mt-6 w-full"
                disabled={props.isLoading}
                onClick={props.onGetStarted}
                trailingArrow
              >
                Start tailoring now
              </PrimaryButton>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      className="relative z-10 mx-auto max-w-[1040px] px-6 py-24"
      id="faq"
    >
      <div className="text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#2047f0]">
          FAQ
        </p>
        <h2 className="mt-4 text-[clamp(2.1rem,3vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[#080d22]">
          Practical answers before you paste the job.
        </h2>
      </div>
      <div className="mt-10 grid gap-4">
        {faqItems.map((item) => (
          <details
            className="group rounded-[15px] border border-[#dfe5ef] bg-white/76 p-6 shadow-[0_16px_34px_rgba(29,42,78,0.08)]"
            key={item.question}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[18px] font-semibold tracking-[-0.02em] text-[#080d22] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2047f0]/14">
              {item.question}
              <ChevronDown className="h-5 w-5 text-[#2047f0] transition group-open:rotate-180" />
            </summary>
            <p className="mt-4 max-w-[780px] text-[15px] leading-7 text-[#42506d]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function LandingPage(props: LandingPageProps) {
  return (
    <main className="relative min-h-screen max-w-[100vw] overflow-x-hidden bg-transparent text-[#080d22]">
      <LiquidGlassDefs />
      <LandingBackground />
      <GlassHeader {...props} />
      <Hero {...props} />
      <MissingProofSection />
      <CareerWorkspaceSection onGetStarted={props.onGetStarted} />
      <LaunchSection {...props} />
      <FaqSection />
    </main>
  );
}
