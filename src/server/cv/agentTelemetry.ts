import "server-only";

import { addTraceProcessor, type Span, type TracingProcessor } from "@openai/agents";

import { estimateCost } from "~/lib/modelPricing";
import { db } from "~/server/db";

type GenerationLike = {
  model?: string;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    details?: Record<string, unknown> | null;
  };
};

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function durationMs(span: Span<any>) {
  if (!span.startedAt || !span.endedAt) return null;
  const duration = new Date(span.endedAt).getTime() - new Date(span.startedAt).getTime();
  return Number.isFinite(duration) && duration >= 0 ? duration : null;
}

function dataFromSpan(span: Span<any>): GenerationLike | null {
  const data = span.spanData as Record<string, any>;
  if (data.type === "generation") {
    return {
      model: data.model,
      usage: data.usage,
    };
  }
  if (data.type === "response") {
    const response = data._response as
      | {
          model?: string;
          usage?: {
            input_tokens?: number;
            output_tokens?: number;
            input_tokens_details?: Record<string, unknown>;
          };
        }
      | undefined;
    if (!response?.usage) return null;
    return {
      model: response.model,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
        details: response.usage.input_tokens_details,
      },
    };
  }
  return null;
}

class PrismaAgentRunTraceProcessor implements TracingProcessor {
  async onTraceStart() {}
  async onTraceEnd() {}
  async onSpanStart() {}
  async shutdown() {}
  async forceFlush() {}

  async onSpanEnd(span: Span<any>) {
    const meta = span.traceMetadata ?? {};
    const userId = meta.userId;
    const step = meta.step;
    if (typeof userId !== "string" || typeof step !== "string") return;

    const modelData = dataFromSpan(span);
    if (!modelData?.usage) return;

    const inputTokens = numberValue(modelData.usage.input_tokens);
    const outputTokens = numberValue(modelData.usage.output_tokens);
    const cachedInputTokens = numberValue(
      modelData.usage.details?.cached_tokens ??
        modelData.usage.details?.cachedTokens
    );
    const model = modelData.model ?? meta.model ?? "unknown";
    const costUsd = estimateCost({
      model,
      inputTokens,
      cachedInputTokens,
      outputTokens,
    });

    await db.agentRun.create({
      data: {
        userId,
        applicationId:
          typeof meta.applicationId === "string" && meta.applicationId
            ? meta.applicationId
            : null,
        step,
        model,
        status: span.error ? "error" : "success",
        inputTokens,
        cachedInputTokens,
        outputTokens,
        costUsd,
        durationMs: durationMs(span),
        error: span.error?.message ?? null,
      },
    });
  }
}

const globalForTraceProcessor = globalThis as typeof globalThis & {
  __taylorCvTraceProcessorRegistered?: boolean;
};

export function registerAgentRunTraceProcessor() {
  if (globalForTraceProcessor.__taylorCvTraceProcessorRegistered) return;
  addTraceProcessor(new PrismaAgentRunTraceProcessor());
  globalForTraceProcessor.__taylorCvTraceProcessorRegistered = true;
}
