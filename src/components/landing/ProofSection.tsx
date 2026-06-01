"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

const leftBullets = [
  "Oversaw day-to-day operations for a growing service team and supported project delivery.",
  "Worked with department leads to improve internal reporting and team coordination.",
  "Helped manage schedules, budgets, and stakeholder communication across multiple initiatives.",
  "Supported service improvement projects and contributed to operational planning.",
] as const;

const chips = [
  "Measurable impact",
  "Leadership",
  "Process improvement",
  "Cost reduction",
] as const;

const experienceBullets = [
  <>
    Led a team of <Metric>18–24 staff</Metric> across operations and project delivery,
    maintaining <Metric>95%+</Metric> service level compliance.
  </>,
  <>
    Improved operational efficiency by <Metric>22%</Metric> through process redesign
    and automation, saving <Metric>320+ hours</Metric> annually.
  </>,
  <>
    Reduced operating costs by <Metric>$280K (14%)</Metric> through supplier negotiation
    and smarter resource allocation.
  </>,
  <>
    Delivered <Metric>12+ projects</Metric> on time and within budget, with{" "}
    <Metric>98%</Metric> stakeholder satisfaction.
  </>,
] as const;

const achievementBullets = [
  <>
    Cut average complaint resolution time by <Metric>35%</Metric> from 6.2 to 4.0 days.
  </>,
  <>
    Increased first-contact resolution rate by <Metric>18%</Metric> from 72% to 90%.
  </>,
  <>
    Implemented KPI dashboarding across <Metric>4 departments</Metric>, improving
    visibility and decision-making.
  </>,
  <>
    Built and coached team leads, lifting team engagement score by <Metric>21%</Metric>.
  </>,
] as const;

const sharedCard =
  "relative overflow-hidden rounded-[18px] border border-[#dce3ee] bg-white text-[#070b1f] shadow-[0_22px_58px_rgba(37,49,79,0.10),0_2px_8px_rgba(25,35,58,0.035),inset_0_1px_0_rgba(255,255,255,0.98)]";

function Metric(props: { children: React.ReactNode }) {
  return <span className="font-semibold text-[#0649ff]">{props.children}</span>;
}

function PeopleIcon(props: { className?: string }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 18 18">
      <path d="M6.4 8.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" stroke="currentColor" strokeWidth="1.55" />
      <path d="M1.9 14.4c.34-2.35 2.06-3.72 4.5-3.72 1.34 0 2.45.42 3.22 1.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      <path d="M12.4 8.3a2.25 2.25 0 1 0 0-4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      <path d="M11.9 10.7c2.2.12 3.72 1.46 4.02 3.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
    </svg>
  );
}

function FileIcon(props: { className?: string }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 24 24">
      <path d="M7 3.8h6.3l3.7 3.8v12.6H7V3.8Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M13.2 3.9v4h3.7M9.4 12h5.1M9.4 15.4h5.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon(props: { className?: string; fill?: boolean }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 3.2 18.2 5v5.3c0 4.1-2.44 7.66-6.2 9.08-3.76-1.42-6.2-4.98-6.2-9.08V5L12 3.2Z"
        fill={props.fill ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
      <path d="m8.85 11.45 2.08 2.08 4.08-4.35" stroke={props.fill ? "white" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  );
}

function PinIcon(props: { className?: string }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 18 18">
      <path d="M14 7.55c0 3.48-5 7.25-5 7.25S4 11.03 4 7.55a5 5 0 0 1 10 0Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9.2a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LockIcon(props: { className?: string; open?: boolean }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 24 24">
      <path
        d={props.open ? "M8.2 10.1V7.8a3.82 3.82 0 0 1 7.24-1.7" : "M8.2 10.1V7.8a3.8 3.8 0 1 1 7.6 0v2.3"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
      <rect height="9.5" rx="2" stroke="currentColor" strokeWidth="1.9" width="13.2" x="5.4" y="10.1" />
      <path d="M12 14v1.9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </svg>
  );
}

function OverlayLockIcon() {
  return (
    <svg aria-hidden="true" className="h-[42px] w-[42px]" fill="none" viewBox="0 0 48 48">
      <path d="M15.3 20.8v-5.1a8.7 8.7 0 0 1 17.4 0v5.1" stroke="#071027" strokeLinecap="round" strokeWidth="3.1" />
      <rect height="18" rx="3.6" stroke="#071027" strokeWidth="3.1" width="26.4" x="10.8" y="20.8" />
      <rect fill="#16a34a" height="8.7" rx="1.9" width="5" x="21.5" y="27.1" />
    </svg>
  );
}

function TrophyIcon(props: { className?: string }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 24 24">
      <path d="M8 4h8v4.2a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="M8 6H4.8v1.6A3.4 3.4 0 0 0 8.4 11M16 6h3.2v1.6a3.4 3.4 0 0 1-3.6 3.4M12 12.3V17M8.8 20h6.4M10 17h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function StatusDotIcon(props: { className?: string }) {
  return (
    <svg aria-hidden="true" className={props.className} fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.9v4.4l3.1 1.7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function CardIcon(props: { children: React.ReactNode; tone: "red" | "green" }) {
  return (
    <span
      className={cn(
        "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[11px]",
        props.tone === "red" && "bg-[#fff0f3] text-[#e31825]",
        props.tone === "green" && "bg-[#e7f7ec] text-[#058434]"
      )}
    >
      {props.children}
    </span>
  );
}

function Badge(props: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  tone: "red" | "green";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[36px] items-center gap-2 whitespace-nowrap rounded-[8px] px-3 text-[12px] font-medium leading-none",
        props.tone === "red" && "bg-[#fff0f3] text-[#e00012]",
        props.tone === "green" && "bg-[#e7f6ec] text-[#087431]"
      )}
    >
      {props.icon}
      {props.children}
    </span>
  );
}

function CvHeader(props: {
  badge: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  tone: "red" | "green";
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-[18px]">
        <CardIcon tone={props.tone}>{props.icon}</CardIcon>
        <h3 className="min-w-0 text-[21px] font-semibold leading-none tracking-[-0.035em] text-[#070b1f]">
          {props.title}
        </h3>
      </div>
      {props.badge}
    </div>
  );
}

function ScoreRing(props: { percent: 43 | 91; active?: boolean }) {
  const reduceMotion = useReducedMotion();
  const isStrong = props.percent === 91;
  const size = isStrong ? 112 : 116;
  const center = size / 2;
  const stroke = 7;
  const radius = isStrong ? 48 : 49;
  const circumference = 2 * Math.PI * radius;
  const progress = useMotionValue(props.active ? 0 : props.percent);
  const rounded = useTransform(progress, (value) => `${Math.round(value)}%`);
  const offset = useTransform(progress, (value) => circumference * (1 - value / 100));

  useEffect(() => {
    if (!isStrong) {
      progress.set(43);
      return undefined;
    }
    if (!props.active || reduceMotion) {
      progress.set(91);
      return undefined;
    }
    progress.set(0);
    const controls = animate(progress, 91, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isStrong, progress, props.active, reduceMotion]);

  return (
    <div
      className="relative grid shrink-0 place-items-center"
      style={{ height: size, width: size }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        shapeRendering="geometricPrecision"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="proof-green-ring" x1="14" x2="94" y1="18" y2="100">
            <stop offset="0%" stopColor="#0c8737" />
            <stop offset="52%" stopColor="#4f9850" />
            <stop offset="100%" stopColor="#0c8737" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          stroke={isStrong ? "#edf5ef" : "#eceff5"}
          strokeWidth={stroke}
        />
        <motion.circle
          cx={center}
          cy={center}
          fill="none"
          r={radius}
          stroke={isStrong ? "url(#proof-green-ring)" : "#ff6c75"}
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeWidth={stroke}
          style={{ strokeDashoffset: offset }}
          transform={`rotate(-75 ${center} ${center})`}
        />
      </svg>
      <div className="relative text-center">
        <motion.p
          className={cn(
            "tabular-nums font-semibold leading-none tracking-[-0.04em] text-[#070b1f]",
            isStrong ? "text-[31px]" : "text-[31px]"
          )}
        >
          {rounded}
        </motion.p>
        <p className="mt-[5px] text-[12px] font-semibold leading-none text-[#071027]">Match</p>
      </div>
    </div>
  );
}

function SectionLabel(props: { children: React.ReactNode }) {
  return (
    <h4 className="mb-[10px] text-[11px] font-bold uppercase leading-none tracking-[0.14em] text-[#17377b]">
      {props.children}
    </h4>
  );
}

function BulletList(props: {
  children: React.ReactNode[];
  tone: "red" | "green";
  compact?: boolean;
}) {
  return (
    <ul className={cn("grid", props.compact ? "gap-[7px]" : "gap-[10px]")}>
      {props.children.map((item, index) => (
        <li
          className={cn(
            "grid grid-cols-[7px_minmax(0,1fr)] gap-[13px] font-normal text-[#071027]",
            props.compact ? "text-[12.3px] leading-[1.42]" : "text-[13.3px] leading-[1.5]"
          )}
          key={index}
        >
          <span
            className={cn(
              "mt-[8px] h-[4.5px] w-[4.5px] rounded-full shadow-[0_0_9px_currentColor]",
              props.tone === "red" ? "bg-[#ff5663] text-[#ff5663]" : "bg-[#10a341] text-[#10a341]"
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GenericCvCard({ isRevealed }: { isRevealed: boolean }) {
  return (
    <article
      className={cn(
        sharedCard,
        "px-[31px] py-[29px] max-lg:h-auto max-sm:px-6",
        isRevealed ? "h-[644px]" : "h-[624px]"
      )}
    >
      <CvHeader
        badge={<Badge tone="red">Hard to shortlist</Badge>}
        icon={<FileIcon className="h-[25px] w-[25px]" />}
        title="Generic CV"
        tone="red"
      />
      <div className="relative mt-[31px] h-[60px]">
        <div className="min-w-0">
          <h4 className="text-[22px] font-semibold leading-none tracking-[-0.045em]">
            Operations Manager
          </h4>
          <p className="mt-[15px] flex items-center gap-[7px] text-[15px] font-normal leading-none text-[#244083]">
            <PinIcon className="h-[16px] w-[16px]" />
            Auckland, NZ
          </p>
        </div>
        <div className="absolute right-0 top-[-9px]">
          <ScoreRing percent={43} />
        </div>
      </div>
      <div className="mt-[18px] h-px w-[72%] bg-[#dde4ee]" />
      <section className="mt-[22px]">
        <SectionLabel>Professional Summary</SectionLabel>
        <p className="max-w-[390px] text-[13.5px] font-normal leading-[1.55] text-[#071027]">
          Experienced operations manager with a background in leading teams, supporting
          projects, and improving day-to-day processes.
        </p>
      </section>
      <section className="mt-[30px]">
        <SectionLabel>Experience Highlights</SectionLabel>
        <BulletList tone="red">{leftBullets.map((bullet) => bullet)}</BulletList>
      </section>
      <div className="mt-[30px] flex h-[44px] items-center gap-[14px] rounded-[12px] bg-[#fff1f4] px-[14px] text-[13px] font-semibold text-[#e00012]">
        <StatusDotIcon className="h-[21px] w-[21px] shrink-0" />
        Clear experience, but the proof is hard to see.
      </div>
    </article>
  );
}

function PreviewTextLine(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={cn("block h-[8px] rounded-full bg-[#dce4ee]", props.className)}
      style={props.style}
    />
  );
}

function LockedDocumentStructure() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none px-[2px] pt-[2px] opacity-[0.58] blur-[4.6px]"
    >
      <div className="mt-[29px] grid grid-cols-[minmax(0,1fr)_112px] items-start gap-5">
        <div>
          <p className="text-[22px] font-semibold leading-none tracking-[-0.045em] text-[#071027]">
            Operations Manager
          </p>
          <p className="mt-[15px] flex items-center gap-[7px] text-[15px] leading-none text-[#244083]">
            <PinIcon className="h-[16px] w-[16px]" />
            Auckland, NZ
          </p>
        </div>
        <div className="relative grid h-[112px] w-[112px] place-items-center rounded-full border-[7px] border-[#edf5ef]">
          <span className="text-[22px] font-semibold text-[#071027]">91%</span>
        </div>
      </div>
      <div className="mt-[19px] h-px w-[72%] bg-[#dde4ee]" />
      <section className="mt-[23px]">
        <SectionLabel>Professional Summary</SectionLabel>
        <div className="grid gap-[9px]">
          <PreviewTextLine className="w-[88%]" />
          <PreviewTextLine className="w-[82%]" />
          <PreviewTextLine className="w-[58%]" />
        </div>
      </section>
      <section className="mt-[31px]">
        <SectionLabel>Experience Highlights</SectionLabel>
        <div className="grid gap-[12px]">
          {["90%", "84%", "92%", "74%"].map((width) => (
            <div className="grid grid-cols-[7px_minmax(0,1fr)] gap-[13px]" key={width}>
              <span className="mt-[3px] h-[4.5px] w-[4.5px] rounded-full bg-[#10a341]" />
              <PreviewTextLine style={{ width }} />
            </div>
          ))}
        </div>
      </section>
      <section className="mt-[31px]">
        <SectionLabel>Key Achievements</SectionLabel>
        <div className="grid gap-[12px]">
          {["86%", "80%", "91%", "70%"].map((width) => (
            <div className="grid grid-cols-[7px_minmax(0,1fr)] gap-[13px]" key={width}>
              <span className="mt-[3px] h-[4.5px] w-[4.5px] rounded-full bg-[#10a341]" />
              <PreviewTextLine style={{ width }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LockOverlay() {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-20 grid place-items-center"
      exit={{ opacity: 0, scale: 0.96, filter: "blur(5px)" }}
      initial={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mt-[18px] grid place-items-center text-center">
        <span className="grid h-[94px] w-[94px] place-items-center rounded-full border border-[#dbe4f0] bg-white/95 text-[#071027] shadow-[0_17px_44px_rgba(32,45,72,0.13),inset_0_1px_0_rgba(255,255,255,0.98)] backdrop-blur-md">
          <OverlayLockIcon />
        </span>
        <p className="mt-[18px] text-[15px] font-semibold leading-none text-[#071027]">
          Unlock to preview
        </p>
        <p className="mt-[10px] text-[15px] font-normal leading-none text-[#18316f]">
          the role-fit version
        </p>
      </div>
    </motion.div>
  );
}

function RoleFitContent() {
  return (
    <motion.div
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      className="relative"
      initial={{ opacity: 0, filter: "blur(7px)", scale: 0.99 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mt-[26px] h-[56px]">
        <div className="min-w-0">
          <h4 className="text-[21px] font-semibold leading-none tracking-[-0.045em]">
            Operations Manager
          </h4>
          <p className="mt-[15px] flex items-center gap-[7px] text-[14px] font-normal leading-none text-[#244083]">
            <PinIcon className="h-[16px] w-[16px]" />
            Auckland, NZ
          </p>
        </div>
        <div className="absolute right-0 top-[-9px]">
          <ScoreRing active percent={91} />
        </div>
      </div>
      <div className="mt-[18px] h-px w-[72%] bg-[#dde4ee]" />
      <section className="mt-[22px]">
        <SectionLabel>Professional Summary</SectionLabel>
        <p className="text-[12.7px] font-normal leading-[1.47] text-[#071027]">
          Operations manager with <Metric>8+ years</Metric> leading high-performing teams
          and delivering measurable improvements in service delivery, efficiency, and cost
          performance.
        </p>
        <div className="mt-[13px] flex flex-wrap gap-[8px]">
          {chips.map((chip) => (
            <span
              className="h-[25px] rounded-[7px] bg-[#e5f6ea] px-[12px] pt-[6px] text-[10.5px] font-medium leading-none text-[#087431]"
              key={chip}
            >
              {chip}
            </span>
          ))}
        </div>
      </section>
      <section className="mt-[18px]">
        <SectionLabel>Experience Highlights</SectionLabel>
        <BulletList compact tone="green">
          {experienceBullets.map((bullet) => bullet)}
        </BulletList>
      </section>
      <section className="mt-[18px]">
        <SectionLabel>Key Achievements</SectionLabel>
        <BulletList compact tone="green">
          {achievementBullets.map((bullet) => bullet)}
        </BulletList>
      </section>
      <div className="mt-[17px] flex h-[39px] items-center gap-[14px] rounded-[10px] bg-[#e5f6ea] px-[16px] text-[12.9px] font-semibold text-[#13833d]">
        <TrophyIcon className="h-[21px] w-[21px] shrink-0" />
        Clear impact. Proven results. Easy to shortlist.
      </div>
    </motion.div>
  );
}

function RoleFitCvCard({ isRevealed }: { isRevealed: boolean }) {
  return (
    <article
      className={cn(
        sharedCard,
        "px-[31px] py-[29px] transition-[height,box-shadow] duration-500 ease-out max-lg:h-auto max-sm:px-6",
        isRevealed ? "h-[726px] lg:-translate-y-[14px]" : "h-[624px]"
      )}
    >
      <CvHeader
        badge={
          <Badge
            icon={<LockIcon className="h-[15px] w-[15px]" open={isRevealed} />}
            tone="green"
          >
            {isRevealed ? "Fully unlocked" : "Preview locked"}
          </Badge>
        }
        icon={<ShieldIcon className="h-[25px] w-[25px]" />}
        title="Role-fit CV"
        tone="green"
      />
      <AnimatePresence initial={false}>
        {!isRevealed ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-x-[31px] top-[82px] bottom-[29px]"
            exit={{ opacity: 0, filter: "blur(8px)", scale: 1.01 }}
            initial={{ opacity: 1 }}
            key="locked"
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <LockedDocumentStructure />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {isRevealed ? <RoleFitContent key="unlocked-content" /> : null}
      </AnimatePresence>
      <AnimatePresence initial={false}>{!isRevealed ? <LockOverlay /> : null}</AnimatePresence>
    </article>
  );
}

function RevealControl(props: {
  isRevealed: boolean;
  onReveal: () => void;
}) {
  return (
    <div
      className={cn(
        "grid text-center transition-[height] duration-500 ease-out max-lg:min-h-[240px]",
        props.isRevealed ? "h-[724px] place-items-center" : "h-[624px] place-items-center"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {props.isRevealed ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="grid translate-y-[-43px] justify-items-center"
            exit={{ opacity: 0, scale: 0.98, y: 7 }}
            initial={{ opacity: 0, scale: 0.97, y: 9 }}
            key="success"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="grid h-[72px] w-[72px] place-items-center rounded-full bg-[#0f963a] text-white shadow-[0_0_0_8px_rgba(34,197,94,0.12),0_0_0_18px_rgba(34,197,94,0.055),0_16px_30px_rgba(22,128,61,0.18)]">
              <svg aria-hidden="true" className="h-[38px] w-[38px]" fill="none" viewBox="0 0 40 40">
                <path d="m11 20.9 6.1 6.1L29.7 13.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
              </svg>
            </span>
            <h3 className="mt-[28px] max-w-[220px] text-[23px] font-semibold leading-[1.03] tracking-[-0.04em] text-[#07113b]">
              Stronger CV
              <br />
              revealed
            </h3>
            <p className="mt-[18px] max-w-[220px] text-[15px] font-normal leading-[1.45] text-[#244083]">
              Your experience, refined
              <br />
              and aligned to the role.
            </p>
            <div className="mt-[26px] inline-flex h-[48px] items-center gap-[10px] rounded-[11px] bg-[#dff4e5] px-[24px] text-[15px] font-semibold text-[#17813f]">
              <LockIcon className="h-[19px] w-[19px]" open />
              CV strengthened
            </div>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="grid translate-y-[-50px] justify-items-center"
            exit={{ opacity: 0, scale: 0.98, y: -7 }}
            initial={{ opacity: 1 }}
            key="button"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-[252px] text-[17px] font-normal leading-[1.55] text-[#24386f]">
              One click shows what
              <br />
              TaylorCV would improve.
            </p>
            <button
              className="mt-[40px] inline-flex h-[74px] w-[291px] cursor-pointer items-center justify-center gap-[14px] rounded-[10px] border border-[#3f62ff]/40 bg-[linear-gradient(180deg,#2254ff_0%,#103bff_48%,#0530de_100%)] px-5 text-[19px] font-semibold tracking-[-0.02em] text-white shadow-[0_18px_34px_rgba(18,59,226,0.28),0_5px_14px_rgba(12,43,156,0.14),inset_0_1px_0_rgba(255,255,255,0.34)] transition-[transform,box-shadow,filter] duration-200 hover:scale-[1.015] hover:shadow-[0_20px_38px_rgba(18,59,226,0.33),0_6px_16px_rgba(12,43,156,0.16),inset_0_1px_0_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2047f0]/25 active:scale-[0.99] motion-reduce:transition-none"
              onClick={props.onReveal}
              type="button"
            >
              <LockIcon className="h-[27px] w-[27px] text-white" open />
              <span className="whitespace-nowrap">Reveal the stronger CV</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProofIntro({ isRevealed }: { isRevealed: boolean }) {
  return (
    <div className="mx-auto text-center">
      <p className="inline-flex h-[36px] items-center gap-[10px] rounded-full bg-[#ecebff] px-[18px] text-[15px] font-medium leading-none text-[#07113b] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
        <PeopleIcon className="h-[19px] w-[19px] text-[#244cff]" />
        See the difference
      </p>
      <h2
        className={cn(
          "mx-auto mt-[20px] text-[clamp(4.1rem,5.22vw,5.05rem)] font-medium leading-[0.92] tracking-[-0.052em] text-[#05091d] max-lg:text-[clamp(3.25rem,7vw,4.4rem)] max-sm:text-[3rem]"
        )}
        style={{ fontFamily: 'Georgia, ui-serif, Cambria, "Times New Roman", serif' }}
      >
        Recruiters scan for <span className="text-[#0649ff]">proof</span>,
        <br />
        not promises.
      </h2>
      <p className="mx-auto mt-[18px] max-w-[540px] text-[20px] font-normal leading-[1.38] text-[#14367b] max-sm:text-[17px]">
        TaylorCV turns real experience into clearer evidence{" "}
        <br className="max-sm:hidden" />
        hiring teams can understand fast.
      </p>
    </div>
  );
}

function FooterProof() {
  return (
    <p className="mx-auto flex items-center justify-center gap-[11px] text-center text-[19px] font-normal leading-none text-[#14367b] max-sm:text-[15px]">
      <span className="grid h-[23px] w-[23px] place-items-center text-[#0649ff]">
        <ShieldIcon className="h-[23px] w-[23px]" fill />
      </span>
      Built for job ads, ATS systems, and one-page CVs.
    </p>
  );
}

export function ProofSection() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section
      className={cn(
        "relative z-10 mt-[32px] overflow-hidden bg-transparent px-5 text-[#070b1f]",
        isRevealed
          ? "min-h-[1086px] pt-[92px] pb-[72px]"
          : "min-h-[1024px] pt-[84px] pb-[64px]"
      )}
      id="proof-reveal"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_7%_4%,rgba(225,235,253,0.42),transparent_35%),radial-gradient(ellipse_at_91%_3%,rgba(251,230,245,0.32),transparent_36%),radial-gradient(ellipse_at_50%_24%,rgba(255,255,255,0.48),rgba(255,255,255,0.24)_45%,transparent_68%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[190px] bg-[linear-gradient(180deg,rgba(251,253,255,0),rgba(255,255,255,0.3)_34%,rgba(255,255,255,0.06)_76%,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] bg-[linear-gradient(180deg,transparent,rgba(248,250,255,0.08)_28%,rgba(255,255,255,0.2)_72%,rgba(251,253,255,0))]" />
      <div
        className={cn(
          "relative mx-auto max-w-[1368px]",
          isRevealed ? "" : ""
        )}
      >
        <ProofIntro isRevealed={isRevealed} />

        <div
          className={cn(
            "mx-auto grid items-start max-lg:max-w-[620px] max-lg:grid-cols-1 max-lg:gap-y-8",
            isRevealed
              ? "max-w-[1280px] gap-x-[19px] lg:grid-cols-[482px_244px_516px] mt-[16px]"
              : "max-w-[1368px] gap-x-[18px] lg:grid-cols-[512px_290px_520px] mt-[10px]"
          )}
        >
          <GenericCvCard isRevealed={isRevealed} />
          <RevealControl
            isRevealed={isRevealed}
            onReveal={() => {
              setIsRevealed(true);
            }}
          />
          <RoleFitCvCard isRevealed={isRevealed} />
        </div>

        <div className={cn(isRevealed ? "mt-[14px]" : "mt-[30px]")}>
          <FooterProof />
        </div>
      </div>
    </section>
  );
}
