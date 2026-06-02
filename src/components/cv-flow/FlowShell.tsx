"use client";

import { TaylorBrand } from "~/components/TaylorBrand";
import { FlowStepper } from "~/components/cv-flow/FlowStepper";
import {
  workflowStepForStage,
  type WorkflowVisualStage,
} from "~/components/cv-flow/workflowSteps";

export type FlowShellStage = WorkflowVisualStage;

export function FlowShell(props: {
  stage: FlowShellStage;
  children: React.ReactNode;
}) {
  const currentStep = workflowStepForStage(props.stage);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#f7f9ff] font-sans text-[#080b1d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_84%,rgba(203,220,255,0.48),transparent_34%),radial-gradient(circle_at_90%_24%,rgba(232,225,255,0.44),transparent_32%),radial-gradient(circle_at_52%_18%,rgba(255,255,255,0.96),transparent_48%),linear-gradient(180deg,#fcfdff_0%,#f7faff_48%,#f4f7ff_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.44),rgba(255,255,255,0.44))]" />

      <div className="relative z-10 min-h-[100dvh]">
        <div className="absolute left-8 top-8">
          <TaylorBrand
            className="gap-3"
            markClassName="h-11 w-11"
            textClassName="text-[21px] font-semibold tracking-[-0.04em] text-[#081437]"
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-10 hidden w-max max-w-[calc(100vw-24rem)] -translate-x-1/2 lg:block">
          <div className="pointer-events-auto">
            <FlowStepper currentStep={currentStep} />
          </div>
        </div>

        <div className="absolute inset-x-0 top-[90px] px-4 sm:px-6 lg:hidden">
          <FlowStepper currentStep={currentStep} />
        </div>

        {props.children}
      </div>
    </main>
  );
}
