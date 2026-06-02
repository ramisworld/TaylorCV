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
      titleClassName="sm:text-[60px] lg:text-[68px]"
      title="Paste the job description"
    >
      <div className="mx-auto w-full max-w-[980px]">
        <div className="relative">
          <textarea
            className="h-[390px] w-full resize-none rounded-[28px] border border-[#d8e2f3] bg-white px-8 py-8 text-[18px] font-normal leading-8 text-[#11203f] outline-none shadow-[0_18px_55px_rgba(103,126,177,0.08)] placeholder:text-[#9cabc4] transition focus:border-[#9bb2f5] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_18px_50px_rgba(103,126,177,0.12)] sm:h-[408px] sm:px-9 sm:py-9"
            maxLength={maxCharacters}
            onChange={(event) => props.onChange(event.target.value)}
            placeholder="Paste the full job description here..."
            ref={textareaRef}
            value={props.value}
          />
          <p className="absolute bottom-7 right-8 text-[14px] font-normal text-[#8a99b5]">
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
            className="inline-flex h-[64px] w-full max-w-[320px] items-center justify-center gap-3 rounded-[16px] bg-[linear-gradient(180deg,#2162ff_0%,#0b4ef3_100%)] px-7 text-[18px] font-medium text-white shadow-[0_16px_32px_rgba(11,78,243,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_38px_rgba(11,78,243,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b4ef3]/20 disabled:cursor-not-allowed disabled:opacity-60"
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
  titleClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[100dvh] w-full flex-col justify-start px-4 pb-10 pt-[164px] sm:px-6 sm:pt-[188px] lg:px-8 lg:pt-[206px]"
      exit={{ opacity: 0, y: -12 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mx-auto mb-8 max-w-4xl pt-2 text-center sm:mb-10 sm:pt-3">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#2563eb]">
          {props.eyebrow}
        </p>
        <h1
          className={cn(
            "mt-4 text-balance text-[46px] font-[650] leading-[1.02] tracking-[-0.05em] text-[#081437] sm:text-[56px] lg:text-[64px]",
            props.titleClassName
          )}
        >
          {props.title}
        </h1>
        {props.subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-[18px] font-normal leading-8 text-[#7081a0]">
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
        "relative overflow-hidden rounded-[28px] border border-[#dde6f5] bg-white shadow-[0_22px_60px_rgba(74,97,145,0.08),0_4px_16px_rgba(20,35,68,0.03)]",
        props.className
      )}
    >
      <div className="relative z-10">{props.children}</div>
    </div>
  );
}
