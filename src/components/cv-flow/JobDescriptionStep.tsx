"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

import { cn } from "~/lib/utils";

export function JobDescriptionStep(props: {
  value: string;
  error?: string | null;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const maxCharacters = 8_000;

  return (
    <WorkflowPanel
      eyebrow="Step 1 of 4"
      subtitle="We’ll analyze the role and extract what matters."
      title="Paste the job description"
    >
      <div className="mx-auto w-full max-w-[980px]">
        <div className="relative">
          <textarea
            className="h-[390px] w-full resize-none rounded-[24px] border border-[#c9d0e5] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,252,255,0.96)_100%)] px-8 py-8 text-[18px] leading-8 text-[#0b132f] outline-none shadow-[0_8px_28px_rgba(84,105,162,0.08)] placeholder:text-[#9aa5c0] transition focus:border-[#95a6e8] focus:shadow-[0_0_0_4px_rgba(11,78,243,0.08),0_14px_34px_rgba(84,105,162,0.08)] sm:h-[408px] sm:px-9 sm:py-9"
            maxLength={maxCharacters}
            onChange={(event) => props.onChange(event.target.value)}
            placeholder="Paste the full job description here..."
            ref={textareaRef}
            value={props.value}
          />
          <p className="absolute bottom-7 right-8 text-[14px] font-normal text-[#8d99b4]">
            {props.value.length.toLocaleString()} / {maxCharacters.toLocaleString()}
          </p>
        </div>
        {props.error ? (
          <p className="mt-4 rounded-[14px] border border-amber-300/50 bg-amber-50/90 px-4 py-3 text-sm text-amber-900">
            {props.error}
          </p>
        ) : null}
        <div className="mt-11 flex justify-center">
          <button
            className="inline-flex h-[64px] w-full max-w-[320px] items-center justify-center gap-3 rounded-[14px] bg-[linear-gradient(180deg,#1160ff_0%,#0b4ef3_100%)] px-7 text-[18px] font-medium text-white shadow-[0_18px_38px_rgba(11,78,243,0.28)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_42px_rgba(11,78,243,0.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b4ef3]/20 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={props.isLoading || !props.value.trim()}
            onClick={props.onSubmit}
            type="button"
          >
            {props.isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            Analyze and continue
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </WorkflowPanel>
  );
}

export function WorkflowPanel(props: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[100dvh] w-full flex-col justify-start px-4 pb-10 pt-[150px] sm:px-6 sm:pt-[170px] lg:px-8 lg:pt-[188px]"
      exit={{ opacity: 0, y: -12 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mx-auto mb-8 max-w-4xl text-center sm:mb-10">
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#74809a]">
          {props.eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-[44px] font-normal leading-[1.04] tracking-[-0.045em] text-[#070b1f] [font-family:var(--font-serif)] sm:text-[56px] lg:text-[64px]">
          {props.title}
        </h1>
        {props.subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-[18px] font-normal leading-8 text-[#6f7890]">
            {props.subtitle}
          </p>
        ) : null}
      </div>
      {props.children}
    </motion.section>
  );
}

export function GlassCard(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] border border-white/70 bg-white/62 shadow-[0_22px_60px_rgba(36,64,118,0.13),0_4px_16px_rgba(20,35,68,0.06),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0.18)_28%,transparent_56%)] before:opacity-70",
        props.className
      )}
    >
      <div className="relative z-10">{props.children}</div>
    </div>
  );
}
