type ModelPricing = {
  promptPer1k: number;
  completionPer1k: number;
};

const pricing: Record<string, ModelPricing> = {
  "gpt-5.4": { promptPer1k: 0.0025, completionPer1k: 0.015 },
  "gpt-5.4-nano": { promptPer1k: 0.0002, completionPer1k: 0.00125 },
  "gpt-4o": { promptPer1k: 0.005, completionPer1k: 0.015 },
  "gpt-4o-mini": { promptPer1k: 0.00015, completionPer1k: 0.0006 },
  "gpt-4.1": { promptPer1k: 0.002, completionPer1k: 0.008 },
  "gpt-4.1-mini": { promptPer1k: 0.0004, completionPer1k: 0.0016 },
  "gpt-4.1-nano": { promptPer1k: 0.0001, completionPer1k: 0.0004 },
  "o3-mini": { promptPer1k: 0.0011, completionPer1k: 0.0044 },
  "o4-mini": { promptPer1k: 0.0011, completionPer1k: 0.0044 },
};

const defaultPricing: ModelPricing = { promptPer1k: 0.005, completionPer1k: 0.015 };

function normalizeModelForPricing(model: string) {
  if (/^gpt-5\.4-nano(?:-|$)/.test(model)) return "gpt-5.4-nano";
  if (/^gpt-5\.4(?:-|$)/.test(model)) return "gpt-5.4";
  return model;
}

export function getModelPricing(model: string) {
  const normalizedModel = normalizeModelForPricing(model);
  return {
    normalizedModel,
    pricing: pricing[normalizedModel] ?? defaultPricing,
    usedDefaultPricing: !(normalizedModel in pricing),
  };
}

export function estimateCost(args: {
  model: string;
  promptTokens?: number | null;
  completionTokens?: number | null;
}): number | null {
  const { model, promptTokens, completionTokens } = args;
  if (!promptTokens && !completionTokens) return null;

  const { pricing: p } = getModelPricing(model);
  const cost =
    ((promptTokens ?? 0) / 1000) * p.promptPer1k +
    ((completionTokens ?? 0) / 1000) * p.completionPer1k;

  return Math.round(cost * 1_000_000) / 1_000_000;
}
