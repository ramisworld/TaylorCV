"use client";

import { TaylorLogoMark } from "~/components/TaylorBrand";
import { FlowStepper } from "~/components/cv-flow/FlowStepper";
import {
  workflowStepForStage,
  type WorkflowVisualStage,
} from "~/components/cv-flow/workflowSteps";
import { cn } from "~/lib/utils";

export type FlowShellStage = WorkflowVisualStage;

export function FlowShell(props: {
  stage: FlowShellStage;
  children: React.ReactNode;
}) {
  const currentStep = workflowStepForStage(props.stage);
  const showWorkflowChrome =
    props.stage !== "cv_generating" && props.stage !== "final_cv";
  const usesWorkflowBackground =
    props.stage === "job_description" ||
    props.stage === "cv_upload" ||
    props.stage === "gap_questions";

  return (
    <main
      className={cn(
        "relative min-h-[100dvh] overflow-hidden bg-[#f7f9ff] font-sans text-[#080b1d]",
        usesWorkflowBackground &&
          "bg-[url('/backgrounds/workflow_background.webP')] bg-cover bg-center bg-no-repeat sm:bg-[position:50%_50%] 2xl:bg-[position:50%_45%]",
      )}
    >
      {!usesWorkflowBackground ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_84%,rgba(203,220,255,0.48),transparent_34%),radial-gradient(circle_at_90%_24%,rgba(232,225,255,0.44),transparent_32%),radial-gradient(circle_at_52%_18%,rgba(255,255,255,0.96),transparent_48%),linear-gradient(180deg,#fcfdff_0%,#f7faff_48%,#f4f7ff_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.44),rgba(255,255,255,0.44))]" />
        </>
      ) : null}

      <div className="relative z-10 min-h-[100dvh]">
        {showWorkflowChrome ? (
          <div className="absolute left-6 top-5 sm:left-8 sm:top-6">
            <TaylorLogoMark className="h-11 w-11 sm:h-12 sm:w-12" />
          </div>
        ) : null}

        {showWorkflowChrome ? (
          <div className="pointer-events-none absolute left-1/2 top-8 hidden w-max max-w-[calc(100vw-24rem)] -translate-x-1/2 lg:block">
            <div className="pointer-events-auto">
              <FlowStepper currentStep={currentStep} />
            </div>
          </div>
        ) : null}

        {showWorkflowChrome ? (
          <div className="absolute inset-x-0 top-[74px] px-4 sm:top-[80px] sm:px-6 lg:hidden">
            <FlowStepper currentStep={currentStep} />
          </div>
        ) : null}

        {props.children}
      </div>
    </main>
  );
}
