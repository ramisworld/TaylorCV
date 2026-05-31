type ModelPricing = {
  promptPer1k: number;
  completionPer1k: number;
};

const pricing: Record<string, ModelPricing> = {
  "gpt-4o": { promptPer1k: 0.005, completionPer1k: 0.015 },
  "gpt-4o-mini": { promptPer1k: 0.00015, completionPer1k: 0.0006 },
  "gpt-4.1": { promptPer1k: 0.002, completionPer1k: 0.008 },
  "gpt-4.1-mini": { promptPer1k: 0.0004, completionPer1k: 0.0016 },
  "gpt-4.1-nano": { promptPer1k: 0.0001, completionPer1k: 0.0004 },
  "o3-mini": { promptPer1k: 0.0011, completionPer1k: 0.0044 },
  "o4-mini": { promptPer1k: 0.0011, completionPer1k: 0.0044 },
};

const defaultPricing: ModelPricing = { promptPer1k: 0.005, completionPer1k: 0.015 };

export function estimateCost(args: {
  model: string;
  promptTokens?: number | null;
  completionTokens?: number | null;
}): number | null {
  const { model, promptTokens, completionTokens } = args;
  if (!promptTokens && !completionTokens) return null;

  const p = pricing[model] ?? defaultPricing;
  const cost =
    ((promptTokens ?? 0) / 1000) * p.promptPer1k +
    ((completionTokens ?? 0) / 1000) * p.completionPer1k;

  return Math.round(cost * 1_000_000) / 1_000_000;
}
