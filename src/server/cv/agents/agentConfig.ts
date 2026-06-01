import "server-only";

export type AgentReasoningEffort = "low" | "medium" | "high";

export type AgentConfig = {
  reasoningEffort: AgentReasoningEffort;
};

function parseReasoningEffort(value: string | undefined, fallback: AgentReasoningEffort) {
  if (value === "low" || value === "medium" || value === "high") return value;
  return fallback;
}

export const AGENT_CONFIG: Record<"intakeGap" | "cvComposer", AgentConfig> = {
  intakeGap: {
    reasoningEffort: parseReasoningEffort(
      process.env.OPENAI_REASONING_EFFORT_INTAKE_GAP,
      "low"
    ),
  },
  cvComposer: {
    reasoningEffort: parseReasoningEffort(
      process.env.OPENAI_REASONING_EFFORT_CV_COMPOSER,
      "low"
    ),
  },
};
