import "server-only";

export type AgentReasoningEffort = "low" | "medium" | "high";

export type AgentConfig = {
  reasoningEffort: AgentReasoningEffort;
  maxOutputTokens: number;
};

function parseReasoningEffort(value: string | undefined, fallback: AgentReasoningEffort) {
  if (value === "low" || value === "medium" || value === "high") return value;
  return fallback;
}

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const AGENT_CONFIG: Record<"intakeGap" | "cvComposer", AgentConfig> = {
  intakeGap: {
    reasoningEffort: parseReasoningEffort(
      process.env.OPENAI_REASONING_EFFORT_INTAKE_GAP,
      "low"
    ),
    maxOutputTokens: parsePositiveInt(
      process.env.OPENAI_MAX_OUTPUT_TOKENS_INTAKE_GAP,
      1600
    ),
  },
  cvComposer: {
    reasoningEffort: parseReasoningEffort(
      process.env.OPENAI_REASONING_EFFORT_CV_COMPOSER,
      "low"
    ),
    maxOutputTokens: parsePositiveInt(
      process.env.OPENAI_MAX_OUTPUT_TOKENS_CV_COMPOSER,
      2600
    ),
  },
};
