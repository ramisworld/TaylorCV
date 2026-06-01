"use client";

export const workflowSteps = [
  { id: "job_description", label: "Job description" },
  { id: "evidence", label: "Evidence" },
  { id: "gaps", label: "Gaps" },
  { id: "tailored_cv", label: "Tailored CV" },
] as const;

export type WorkflowStepNumber = 1 | 2 | 3 | 4;

export type WorkflowStepState = "inactive" | "active" | "completed";

export type WorkflowVisualStage =
  | "job_description"
  | "cv_upload"
  | "gap_questions"
  | "cv_generating"
  | "final_cv";

export function workflowStepForStage(stage: WorkflowVisualStage): WorkflowStepNumber {
  if (stage === "job_description") return 1;
  if (stage === "cv_upload") return 2;
  if (stage === "gap_questions") return 3;
  return 4;
}

export function workflowStepState(
  currentStep: WorkflowStepNumber,
  stepNumber: WorkflowStepNumber
): WorkflowStepState {
  if (stepNumber < currentStep) return "completed";
  if (stepNumber === currentStep) return "active";
  return "inactive";
}
