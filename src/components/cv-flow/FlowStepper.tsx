"use client";

import { cn } from "~/lib/utils";

const steps = [
  "Job description",
  "Evidence",
  "Gaps",
  "Tailored CV",
] as const;

export function FlowStepper(props: { activeStep: 1 | 2 | 3 | 4 }) {
  return (
    <nav
      aria-label="CV workflow"
      className="mx-auto flex w-full max-w-[760px] items-center justify-center px-4"
    >
      {steps.map((label, index) => {
        const stepNumber = (index + 1) as 1 | 2 | 3 | 4;
        const isActive = stepNumber === props.activeStep;

        return (
          <div className="flex min-w-0 flex-1 items-center" key={label}>
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[14px] leading-none transition-colors",
                  isActive
                    ? "border-[#0b4ef3] bg-[#0b4ef3] text-white"
                    : "border-[#cfd7ea] bg-white/55 text-[#8190ad]"
                )}
              >
                {stepNumber}
              </span>
              <span
                className={cn(
                  "truncate text-[15px] font-normal tracking-[-0.02em] transition-colors",
                  isActive ? "text-[#0b4ef3]" : "text-[#74809a]"
                )}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span className="mx-4 h-px min-w-[28px] flex-1 bg-[#d6ddee] sm:mx-6 sm:min-w-[44px]" />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
