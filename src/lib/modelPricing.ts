type ModelPricing = {
  inputPer1m: number;
  cachedInputPer1m: number | null;
  outputPer1m: number;
};

const pricing: Record<string, ModelPricing> = {
  "gpt-5.5": { inputPer1m: 5, cachedInputPer1m: 0.5, outputPer1m: 30 },
  "gpt-5.4": { inputPer1m: 2.5, cachedInputPer1m: 0.25, outputPer1m: 15 },
  "gpt-5.4-mini": { inputPer1m: 0.75, cachedInputPer1m: 0.075, outputPer1m: 4.5 },
  "gpt-5.4-nano": { inputPer1m: 0.2, cachedInputPer1m: 0.02, outputPer1m: 1.25 },
};

const defaultPricing: ModelPricing = {
  inputPer1m: 5,
  cachedInputPer1m: 0.5,
  outputPer1m: 30,
};

function normalizeModelForPricing(model: string) {
  if (/^gpt-5\.5(?:-|$)/.test(model)) return "gpt-5.5";
  if (/^gpt-5\.4-nano(?:-|$)/.test(model)) return "gpt-5.4-nano";
  if (/^gpt-5\.4-mini(?:-|$)/.test(model)) return "gpt-5.4-mini";
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
  inputTokens?: number | null;
  cachedInputTokens?: number | null;
  outputTokens?: number | null;
}) {
  const inputTokens = args.inputTokens ?? 0;
  const cachedInputTokens = Math.min(args.cachedInputTokens ?? 0, inputTokens);
  const uncachedInputTokens = Math.max(0, inputTokens - cachedInputTokens);
  const outputTokens = args.outputTokens ?? 0;
  if (!inputTokens && !outputTokens) return null;

  const { pricing: p } = getModelPricing(args.model);
  const cachedInputCost =
    ((cachedInputTokens ?? 0) / 1_000_000) *
    (p.cachedInputPer1m ?? p.inputPer1m);
  const uncachedInputCost = (uncachedInputTokens / 1_000_000) * p.inputPer1m;
  const outputCost = (outputTokens / 1_000_000) * p.outputPer1m;

  return Math.round((cachedInputCost + uncachedInputCost + outputCost) * 1_000_000) / 1_000_000;
}
