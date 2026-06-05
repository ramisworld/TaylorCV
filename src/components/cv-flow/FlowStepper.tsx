"use client";

import { Check } from "lucide-react";

import { cn } from "~/lib/utils";
import {
  workflowStepState,
  workflowSteps,
  type WorkflowStepNumber,
} from "~/components/cv-flow/workflowSteps";

export function FlowStepper(props: { currentStep: WorkflowStepNumber }) {
  return (
    <nav
      aria-label="CV workflow"
      className="mx-auto w-full overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="mx-auto flex min-w-max items-center">
        {workflowSteps.map((step, index) => {
          const stepNumber = (index + 1) as WorkflowStepNumber;
          const state = workflowStepState(props.currentStep, stepNumber);
          const isCompleted = state === "completed";
          const isActive = state === "active";

          return (
            <div className="flex items-center" key={step.label}>
              <div className="flex items-center gap-3 sm:gap-3.5">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full border text-[13px] font-medium leading-none transition-colors sm:h-8 sm:w-8 sm:text-[14px]",
                    isActive || isCompleted
                      ? "border-[#0b4ef3] bg-[#0b4ef3] text-white"
                      : "border-[#d3ddec] bg-white text-[#8fa0be]"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : stepNumber}
                </span>
                <span
                  className={cn(
                    "shrink-0 whitespace-nowrap text-[13px] font-normal tracking-[-0.02em] transition-colors sm:text-[15px]",
                    isActive
                      ? "text-[#0b4ef3] font-medium"
                      : isCompleted
                        ? "text-[#2757de] font-medium"
                        : "text-[#7b89a4]"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < workflowSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-8 block h-px w-[38px] shrink-0 sm:mx-10 sm:w-[46px] lg:mx-11 lg:w-[52px]",
                    stepNumber < props.currentStep ? "bg-[#0b4ef3]" : "bg-[#d7ddec]"
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
