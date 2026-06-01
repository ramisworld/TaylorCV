"use client";

import { cn } from "~/lib/utils";

const steps = [
  { fullLabel: "Job description" },
  { fullLabel: "Evidence" },
  { fullLabel: "Gaps" },
  { fullLabel: "Tailored CV" },
] as const;

export function FlowStepper(props: { activeStep: 1 | 2 | 3 | 4 }) {
  return (
    <nav
      aria-label="CV workflow"
      className="mx-auto overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="mx-auto grid min-w-max grid-cols-[max-content_44px_max-content_44px_max-content_44px_max-content] items-center sm:grid-cols-[max-content_56px_max-content_56px_max-content_56px_max-content]">
        {steps.map((step, index) => {
          const stepNumber = (index + 1) as 1 | 2 | 3 | 4;
          const isActive = stepNumber === props.activeStep;

          return (
            <div className="contents" key={step.fullLabel}>
              <div className="flex items-center gap-2.5 justify-self-center sm:gap-4">
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
                    "shrink-0 whitespace-nowrap text-[13px] font-medium tracking-[-0.02em] transition-colors sm:text-[15px]",
                    isActive ? "text-[#0b4ef3]" : "text-[#74809a]"
                  )}
                >
                  {step.fullLabel}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <span className="mx-auto block h-px w-[44px] bg-[#d6ddee] sm:w-[56px]" />
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
