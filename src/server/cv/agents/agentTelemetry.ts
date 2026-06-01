import "server-only";

export type AgentTelemetryContext = {
  rawJobChars?: number | null;
  rawCvChars?: number | null;
  structuredContextChars?: number | null;
  sectionStrategyChars?: number | null;
  payloadChars?: number | null;
  gapAnswerCount?: number | null;
};

export function estimateTokenCountFromChars(charCount: number) {
  return Math.max(1, Math.ceil(charCount / 4));
}

export function compactJsonChars(value: unknown) {
  if (value == null) return 0;
  try {
    return JSON.stringify(value).length;
  } catch {
    return 0;
  }
}
