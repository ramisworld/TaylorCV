"use client";

import { TaylorBrand } from "~/components/TaylorBrand";
import { FlowStepper } from "~/components/cv-flow/FlowStepper";

export type FlowShellStage =
  | "job_description"
  | "cv_upload"
  | "gap_questions"
  | "cv_generating"
  | "final_cv";

function activeStepForStage(stage: FlowShellStage): 1 | 2 | 3 | 4 | null {
  if (stage === "job_description") return 1;
  if (stage === "cv_upload") return 2;
  if (stage === "gap_questions") return 3;
  if (stage === "cv_generating") return 4;
  return null;
}

export function FlowShell(props: {
  stage: FlowShellStage;
  children: React.ReactNode;
}) {
  const activeStep = activeStepForStage(props.stage);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#f7f9ff] text-[#080b1d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_84%,rgba(197,215,255,0.5),transparent_34%),radial-gradient(circle_at_90%_24%,rgba(238,218,255,0.5),transparent_32%),radial-gradient(circle_at_52%_18%,rgba(255,255,255,0.94),transparent_48%),linear-gradient(180deg,#fcfdff_0%,#f7f9ff_48%,#f4f7ff_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.38),rgba(255,255,255,0.38))]" />

      <div className="relative z-10 min-h-[100dvh]">
        <div className="absolute left-8 top-8">
          <TaylorBrand
            className="gap-3"
            markClassName="h-11 w-11"
            textClassName="text-[21px] font-semibold tracking-[-0.04em] text-[#08112f]"
          />
        </div>

        {activeStep ? (
          <div className="absolute inset-x-0 top-11 hidden px-40 lg:block">
            <FlowStepper activeStep={activeStep} />
          </div>
        ) : null}

        {activeStep ? (
          <div className="absolute inset-x-0 top-[92px] px-4 sm:px-6 lg:hidden">
            <FlowStepper activeStep={activeStep} />
          </div>
        ) : null}

        {props.children}
      </div>
    </main>
  );
}
