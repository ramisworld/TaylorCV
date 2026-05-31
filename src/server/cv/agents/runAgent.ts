import "server-only";

import { z } from "zod";

import { estimateCost } from "~/lib/modelPricing";
import {
  createStructuredJsonResponseWithUsage,
  isMockAiEnabled,
} from "~/lib/openai";
import { db } from "~/server/db";

type JsonSchema = Record<string, unknown>;

export async function runAgent<T>(args: {
  agentName: string;
  applicationId: string;
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schemaName: string;
  jsonSchema: JsonSchema;
  zodSchema: z.ZodType<T>;
  mockOutput?: T;
}): Promise<T> {
  const { agentName, applicationId, model } = args;
  const start = Date.now();
  let status: "success" | "error" = "success";
  let errorMessage: string | null = null;
  let promptTokens: number | null = null;
  let completionTokens: number | null = null;
  let totalTokens: number | null = null;
  let cost: number | null = null;
  let rawOutput: unknown = null;

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
      });
      rawOutput = result.parsed;
      promptTokens = result.usage.promptTokens;
      completionTokens = result.usage.completionTokens;
      totalTokens = result.usage.totalTokens;
      cost = estimateCost({ model, promptTokens, completionTokens });
    }

    const validated = args.zodSchema.parse(rawOutput);

    console.log(
      `[Agent] ${agentName} | model=${model} | durationMs=${Date.now() - start} | status=success | tokens=${totalTokens ?? "n/a"} | cost=${cost ?? "n/a"}`
    );

    await writeAgentRun({
      applicationId,
      agentName,
      model,
      inputSummary: args.userPrompt.slice(0, 500),
      outputSummary: JSON.stringify(validated).slice(0, 2000),
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
    status = "error";
    errorMessage = err instanceof Error ? err.message : String(err);
    console.error(
      `[Agent] ${agentName} | model=${model} | durationMs=${Date.now() - start} | status=error | error=${errorMessage}`
    );

    await writeAgentRun({
      applicationId,
      agentName,
      model,
      inputSummary: args.userPrompt.slice(0, 500),
      outputSummary: "",
      status: "error",
      error: errorMessage,
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
