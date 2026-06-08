import "server-only";

import { z } from "zod";

import { estimateCost, getModelPricing } from "~/lib/modelPricing";
import {
  OpenAiProviderError,
  createStructuredJsonResponseWithUsage,
  isMockAiEnabled,
} from "~/lib/openai";
import { db } from "~/server/db";
import type { AgentReasoningEffort } from "./agentConfig";
import {
  compactJsonChars,
  estimateTokenCountFromChars,
  type AgentTelemetryContext,
} from "./agentTelemetry";

type JsonSchema = Record<string, unknown>;

export async function runAgent<T>(args: {
  agentName: string;
  applicationId: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schemaName: string;
  jsonSchema: JsonSchema;
  zodSchema: z.ZodType<T, z.ZodTypeDef, unknown>;
  reasoningEffort: AgentReasoningEffort;
  maxOutputTokens: number;
  telemetryContext?: AgentTelemetryContext;
  mockOutput?: T;
}): Promise<T> {
  const { agentName, applicationId, model } = args;
  const start = Date.now();
  let errorMessage: string | null = null;
  let promptTokens: number | null = null;
  let completionTokens: number | null = null;
  let totalTokens: number | null = null;
  let reasoningTokens: number | null = null;
  let cost: number | null = null;
  const modelPricing = getModelPricing(model);
  let rawOutput: unknown = null;
  let errorClass: string | null = null;
  let providerErrorMeta: Record<string, unknown> | null = null;
  let responseStatus: string | null = null;
  let responseIncompleteDetails: unknown = null;

  const systemPromptChars = args.systemPrompt.length;
  const userPromptChars = args.userPrompt.length;
  const schemaChars = compactJsonChars(args.jsonSchema);
  const estimatedInputTokens = estimateTokenCountFromChars(
    systemPromptChars + userPromptChars + schemaChars
  );
  const inputSummary = {
    agentName,
    model,
    reasoningEffort: args.reasoningEffort,
    systemPromptChars,
    userPromptChars,
    schemaChars,
    rawJobChars: args.telemetryContext?.rawJobChars ?? null,
    rawCvChars: args.telemetryContext?.rawCvChars ?? null,
    structuredContextChars: args.telemetryContext?.structuredContextChars ?? null,
    sectionStrategyChars: args.telemetryContext?.sectionStrategyChars ?? null,
    payloadChars: args.telemetryContext?.payloadChars ?? null,
    gapAnswerCount: args.telemetryContext?.gapAnswerCount ?? null,
    estimatedInputTokens,
    maxOutputTokens: args.maxOutputTokens,
  };

  try {
    if (isMockAiEnabled()) {
      if (args.mockOutput === undefined) {
        throw new Error(
          `${agentName}: mockOutput is required when USE_MOCK_AI is true`
        );
      }
      rawOutput = args.mockOutput;
    } else {
      const result = await createStructuredJsonResponseWithUsage({
        model,
        systemPrompt: args.systemPrompt,
        userPrompt: args.userPrompt,
        schemaName: args.schemaName,
        jsonSchema: args.jsonSchema,
        reasoningEffort: args.reasoningEffort,
        maxOutputTokens: args.maxOutputTokens,
      });
      rawOutput = result.parsed;
      promptTokens = result.usage.promptTokens;
      completionTokens = result.usage.completionTokens;
      totalTokens = result.usage.totalTokens;
      reasoningTokens = result.usage.reasoningTokens;
      responseStatus = result.response.status;
      responseIncompleteDetails = result.response.incompleteDetails;
      cost = estimateCost({ model, promptTokens, completionTokens });
    }

    const validated = args.zodSchema.parse(rawOutput);
    const outputSummary = {
      status: "success",
      outputChars: compactJsonChars(validated),
      durationMs: Date.now() - start,
      promptTokens,
      completionTokens,
      totalTokens,
      reasoningTokens,
      responseStatus,
      responseIncompleteDetails,
      estimatedCostUsd: cost,
    };

    console.log(
      `[Agent] ${agentName} | model=${model} | pricedAs=${modelPricing.normalizedModel} | promptCptPer1k=${modelPricing.pricing.promptPer1k} | completionCptPer1k=${modelPricing.pricing.completionPer1k} | reasoning=${args.reasoningEffort} | maxOutputTokens=${args.maxOutputTokens} | durationMs=${Date.now() - start} | status=success | responseStatus=${responseStatus ?? "n/a"} | tokens=${totalTokens ?? "n/a"} | reasoningTokens=${reasoningTokens ?? "n/a"} | estInputTokens=${estimatedInputTokens} | cost=${cost ?? "n/a"}`
    );
    console.info("[AgentTelemetry]", JSON.stringify({ ...inputSummary, ...outputSummary }));

    await writeAgentRun({
      applicationId,
      agentName,
      model,
      inputSummary: JSON.stringify(inputSummary),
      outputSummary: JSON.stringify(outputSummary),
      status: "success",
      error: null,
      durationMs: Date.now() - start,
      promptTokens,
      completionTokens,
      totalTokens,
      estimatedCostUsd: cost,
    });

    return validated;
  } catch (err) {
    if (err instanceof OpenAiProviderError) {
      errorClass = err.meta.errorClass;
      providerErrorMeta = err.meta;
      errorMessage = err.message;
    } else {
      errorMessage = err instanceof Error ? err.message : String(err);
      if (err instanceof z.ZodError) {
        errorClass = "agent_output_schema_validation_error";
      }
    }
    const outputSummary = {
      status: "error",
      durationMs: Date.now() - start,
      promptTokens,
      completionTokens,
      totalTokens,
      reasoningTokens,
      errorClass,
      providerErrorMeta,
      responseStatus,
      responseIncompleteDetails,
    };
    console.error(
      `[Agent] ${agentName} | model=${model} | reasoning=${args.reasoningEffort} | maxOutputTokens=${args.maxOutputTokens} | durationMs=${Date.now() - start} | status=error | responseStatus=${responseStatus ?? "n/a"} | errorClass=${errorClass ?? "unknown"} | error=${errorMessage}`
    );
    console.info("[AgentTelemetry]", JSON.stringify({ ...inputSummary, ...outputSummary }));

    await writeAgentRun({
      applicationId,
      agentName,
      model,
      inputSummary: JSON.stringify(inputSummary),
      outputSummary: JSON.stringify(outputSummary),
      status: "error",
      error: JSON.stringify({
        message: errorMessage,
        errorClass,
        providerErrorMeta,
      }),
      durationMs: Date.now() - start,
      promptTokens,
      completionTokens,
      totalTokens,
      estimatedCostUsd: cost,
    });

    throw err;
  }
}

async function writeAgentRun(args: {
  applicationId: string;
  agentName: string;
  model: string;
  inputSummary: string;
  outputSummary: string;
  status: "success" | "error";
  error: string | null;
  durationMs: number;
  promptTokens: number | null;
  completionTokens: number | null;
  totalTokens: number | null;
  estimatedCostUsd: number | null;
}) {
  try {
    await db.agentRun.create({
      data: {
        applicationId: args.applicationId,
        agentName: args.agentName,
        model: args.model,
        inputSummary: args.inputSummary,
        outputSummary: args.outputSummary,
        status: args.status,
        error: args.error,
        durationMs: args.durationMs,
        promptTokens: args.promptTokens,
        completionTokens: args.completionTokens,
        totalTokens: args.totalTokens,
        estimatedCostUsd: args.estimatedCostUsd,
      },
    });
  } catch (logError) {
    console.error(
      `[Agent] Failed to write AgentRun for ${args.agentName}:`,
      logError
    );
  }
}
