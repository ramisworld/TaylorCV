"use client";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

import { LandingArtifact } from "./LandingArtifact";
import { LandingBackground } from "./LandingBackground";

type LandingPageProps = {
  error?: string | null;
  isLoading: boolean;
  onGetStarted: () => void;
};

const entrance = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const trustedBy = ["Amplitude", "ramp", "mongoDB.", "PLAID", "Canva"];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Private & secure",
    body: "Your data is encrypted and never shared.",
  },
  {
    icon: Sparkles,
    title: "AI that gets you",
    body: "Built on proven job matching and NLP.",
  },
  {
    icon: CheckCircle2,
    title: "Results that land",
    body: "Tailored CVs that pass screens and get replies.",
  },
];

function TaylorLogo() {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
      <span className="absolute left-1 top-1 h-1 w-7 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
      <span className="absolute left-1 top-2.5 h-1 w-7 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(37,99,235,0.62)]" />
      <span className="absolute left-[12px] top-[14px] h-5 w-1.5 rounded-full bg-blue-600" />
      <span className="absolute left-[18px] top-[14px] h-5 w-1.5 skew-y-[-18deg] rounded-full bg-cyan-400" />
    </span>
  );
}

function LandingNav(props: LandingPageProps) {
  return (
    <motion.header
      animate="visible"
      className="relative z-30 w-full border-b border-white/[0.075] bg-[#030813]/20"
      initial="hidden"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={entrance}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[3000px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10 2xl:px-14">
        <div
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Taylor CV"
        >
          <TaylorLogo />
          <span className="truncate text-[21px] font-medium tracking-[-0.035em] text-white">
            Taylor CV
          </span>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-[14px] font-medium text-white/78 lg:flex">
          <span aria-disabled="true">How it works</span>
          <span aria-disabled="true">Pricing</span>
        </nav>

        <div className="ml-auto flex items-center gap-3 text-[14px] font-medium">
          <button
            className="hidden cursor-default rounded-md px-2.5 py-1.5 text-white/82 sm:inline-flex"
            type="button"
          >
            Sign in
          </button>
          <motion.button
            className="group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-blue-600 px-4 text-[13px] font-semibold text-white shadow-[0_0_28px_rgba(37,99,235,0.42),inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70 sm:px-5"
            disabled={props.isLoading}
            onClick={props.onGetStarted}
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
          >
            {props.isLoading ? "Starting..." : "Build my CV"}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

function LandingCta(props: LandingPageProps) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <motion.button
        className="group inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-blue-600 px-5 text-[14px] font-semibold text-white shadow-[0_18px_58px_rgba(37,99,235,0.3),inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70 min-[3000px]:min-h-14 min-[3000px]:px-6 min-[3000px]:text-base"
        disabled={props.isLoading}
        onClick={props.onGetStarted}
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
      >
        <ClipboardList className="h-4.5 w-4.5" />
        {props.isLoading ? "Starting..." : "Start with a job description"}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </motion.button>

      <button
        className="inline-flex min-h-12 cursor-default items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-white/20 bg-white/[0.03] px-4 text-[14px] font-semibold text-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl min-[3000px]:min-h-14 min-[3000px]:px-5 min-[3000px]:text-base"
        type="button"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/28 bg-black/20">
          <Play className="h-3 w-3 fill-white text-white" />
        </span>
        See how Taylor works
      </button>
    </div>
  );
}

function TrustedByRow() {
  return (
    <div className="mt-7 border-b border-white/10 pb-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        Trusted by professionals at
      </p>
      <div className="mt-3 flex flex-nowrap items-center justify-between gap-x-4 text-[14px] font-medium tracking-[-0.03em] text-slate-400/82">
        {trustedBy.map((name) => (
          <span
            className="flex items-center gap-1.5 whitespace-nowrap"
            key={name}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-400/40 bg-white/[0.02]">
              <span className="h-1 w-1 rounded-full bg-slate-400/55" />
            </span>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function BenefitRows() {
  return (
    <div className="grid gap-4 border-b border-white/10 py-4 sm:grid-cols-3">
      {benefits.map((benefit) => {
        const Icon = benefit.icon;
        return (
          <div className="flex items-start gap-2.5" key={benefit.title}>
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-cyan-300/18 bg-cyan-300/[0.04] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-white">
                {benefit.title}
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.45] text-slate-400">
                {benefit.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SocialProofRow() {
  const avatars = [
    {
      bg: "bg-[linear-gradient(135deg,#f6b481,#7c2d12)]",
      shirt: "bg-orange-950/35",
    },
    {
      bg: "bg-[linear-gradient(135deg,#ead7be,#475569)]",
      shirt: "bg-slate-900/35",
    },
    {
      bg: "bg-[linear-gradient(135deg,#c7b9ff,#1d4ed8)]",
      shirt: "bg-indigo-950/35",
    },
    {
      bg: "bg-[linear-gradient(135deg,#d7f5a7,#0f766e)]",
      shirt: "bg-emerald-950/35",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-4">
      <div className="flex -space-x-2.5">
        {avatars.map((avatar) => (
          <span
            className={[
              "relative flex h-9 w-9 items-end justify-center overflow-hidden rounded-full border-2 border-[#07111e] shadow-[0_8px_22px_rgba(0,0,0,0.22)]",
              avatar.bg,
            ].join(" ")}
            key={avatar.bg}
          >
            <span className="absolute top-2 h-3.5 w-3.5 rounded-full bg-white/72 shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]" />
            <span
              className={[
                "absolute bottom-0 h-4 w-7 rounded-t-full",
                avatar.shirt,
              ].join(" ")}
            />
          </span>
        ))}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-amber-400">
          {"★★★★★ "}
          <span className="text-amber-300">4.9/5</span>
          <span className="font-medium text-slate-400">
            {" "}
            from 1,200+ professionals
          </span>
        </p>
        <p className="mt-0.5 text-[12px] text-slate-400">
          More interviews. Better opportunities.
        </p>
      </div>
    </div>
  );
}

export function LandingPage(props: LandingPageProps) {
  return (
    <main className="relative min-h-screen max-w-[100vw] overflow-x-hidden bg-[#030813] text-white">
      <LandingBackground />
      <LandingNav {...props} />

      <section className="relative z-10 mx-auto grid w-full max-w-[3000px] grid-cols-1 gap-12 px-5 pb-14 pt-9 sm:px-8 lg:px-10 xl:min-h-[calc(100vh-4.5rem)] xl:grid-cols-[minmax(430px,470px)_minmax(0,1fr)] xl:items-start xl:gap-3 xl:pb-8 xl:pt-10 2xl:grid-cols-[minmax(470px,520px)_minmax(0,1fr)] 2xl:gap-8 2xl:px-14 min-[2200px]:grid-cols-[minmax(520px,590px)_minmax(0,1fr)] min-[2200px]:gap-12 min-[3000px]:!grid-cols-[900px_minmax(0,1fr)] min-[3000px]:!gap-5">
        <motion.div
          animate="visible"
          className="max-w-[560px] xl:max-w-[470px] 2xl:max-w-[520px] min-[2200px]:max-w-[590px] min-[3000px]:!max-w-[900px]"
          initial="hidden"
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-cyan-300"
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            variants={entrance}
          >
            <Sparkles className="h-4 w-4 fill-cyan-300/30" />
            AI Career Agent
          </motion.div>

          <motion.h1
            className="text-balance text-[clamp(3.25rem,3.6vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.052em] text-white min-[2200px]:text-[4.65rem] min-[3000px]:text-[5.15rem]"
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            variants={entrance}
          >
            Build the CV for
            <br />
            the job you
            <br />
            <span className="bg-[linear-gradient(100deg,#3778ff_0%,#49ddff_96%)] bg-clip-text text-transparent">
              actually want.
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[500px] text-[16px] leading-7 text-slate-300/92 min-[3000px]:max-w-[620px] min-[3000px]:text-[18px] min-[3000px]:leading-8"
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            variants={entrance}
          >
            Paste the role. Add your background. Taylor finds your strongest
            evidence, asks what's missing, and builds a focused CV that matches
            the job — without sounding generic.
          </motion.p>

          <motion.div
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            variants={entrance}
          >
            <LandingCta {...props} />
            {props.error ? (
              <p className="mt-4 rounded-lg border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                {props.error}
              </p>
            ) : null}
          </motion.div>

          <motion.div
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            variants={entrance}
          >
            <TrustedByRow />
            <BenefitRows />
            <SocialProofRow />
          </motion.div>
        </motion.div>

        <motion.div
          animate="visible"
          className="relative min-w-0"
          initial="hidden"
          transition={{ duration: 0.68, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          variants={entrance}
        >
          <div className="pointer-events-none absolute inset-0 translate-x-[6%] bg-[radial-gradient(circle_at_58%_50%,rgba(0,199,255,0.22),transparent_38%),radial-gradient(circle_at_76%_42%,rgba(37,99,235,0.2),transparent_32%)] blur-3xl" />
          <LandingArtifact />
        </motion.div>
      </section>
    </main>
  );
}
