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
      titleClassName="sm:text-[54px] lg:text-[58px]"
      title="Paste the job description"
    >
      <div className="mx-auto w-full max-w-[960px]">
        <div className="relative">
          <textarea
            className="h-[330px] w-full resize-none rounded-[28px] border border-[#d8e2f3] bg-white px-7 py-7 text-[17px] font-normal leading-[1.75] text-[#11203f] outline-none shadow-[0_18px_55px_rgba(103,126,177,0.08)] placeholder:text-[#9cabc4] transition focus:border-[#9bb2f5] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08),0_18px_50px_rgba(103,126,177,0.12)] sm:h-[350px] sm:px-8 sm:py-8 lg:h-[360px]"
            maxLength={maxCharacters}
            onChange={(event) => props.onChange(event.target.value)}
            placeholder="Paste the full job description here..."
            ref={textareaRef}
            value={props.value}
          />
          <p className="absolute bottom-6 right-7 text-[13px] font-normal text-[#8a99b5] sm:bottom-7 sm:right-8 sm:text-[14px]">
            {props.value.length.toLocaleString()} / {maxCharacters.toLocaleString()}
          </p>
        </div>
        {props.error ? (
          <p className="mt-4 rounded-[14px] border border-amber-300/50 bg-amber-50/90 px-4 py-3 text-sm text-amber-900">
            {props.error}
          </p>
        ) : null}
        <div className="mt-8 flex justify-center sm:mt-9 lg:mt-10">
          <button
            className="taylor-premium-button inline-flex h-[58px] w-full max-w-[304px] items-center justify-center gap-3 rounded-[16px] border px-7 text-[17px] font-medium text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b4ef3]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[60px] sm:max-w-[320px]"
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
  className?: string;
  headerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mx-auto flex min-h-[100dvh] w-full flex-col justify-start px-4 pb-8 pt-[124px] sm:px-6 sm:pb-10 sm:pt-[134px] lg:px-8 lg:pt-[142px] xl:pt-[148px]",
        props.className,
      )}
      exit={{ opacity: 0, y: -12 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div
        className={cn(
          "mx-auto mb-5 w-full max-w-[980px] pt-1 text-center sm:mb-6 sm:pt-2 lg:mb-7",
          props.headerClassName,
        )}
      >
        <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#2563eb] sm:text-[14px]">
          {props.eyebrow}
        </p>
        <h1
          className={cn(
            "mt-3 text-balance text-[42px] font-[640] leading-[0.98] tracking-[-0.045em] text-[#081437] sm:mt-4 sm:text-[52px] lg:text-[58px]",
            props.titleClassName
          )}
        >
          {props.title}
        </h1>
        {props.subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-[16px] font-normal leading-7 text-[#7081a0] sm:text-[17px] lg:mt-5 lg:text-[18px]">
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
