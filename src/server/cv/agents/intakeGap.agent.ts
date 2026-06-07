import "server-only";

import { OpenAiProviderError } from "~/lib/openai";
import { getFastModel } from "~/lib/openai";
import { AGENT_CONFIG } from "./agentConfig";
import { runAgent } from "./runAgent";
import {
  AgentJsonSchemas,
  IntakeGapOutputSchema,
  type IntakeGapOutput,
} from "../cvSchemas";
import {
  INTAKE_GAP_SYSTEM_PROMPT,
  buildIntakeGapUserPrompt,
} from "../prompts/intakeGap.prompt";
import { MOCK_INTAKE_GAP_OUTPUT } from "./mockOutput.ts";

const intakeGapRetryDelayMs = 1200;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function runIntakeGapAgent(args: {
  applicationId: string;
  rawJobText: string;
  rawCvText?: string;
  structuredCareerProfile?: unknown;
}): Promise<IntakeGapOutput> {
  const model = getFastModel();
  const userPrompt = buildIntakeGapUserPrompt({
    rawJobText: args.rawJobText,
    rawCvText: args.rawCvText,
    structuredCareerProfile: args.structuredCareerProfile,
  });

  const run = () =>
    runAgent({
      agentName: "intakeGap",
      applicationId: args.applicationId,
      model,
      reasoningEffort: AGENT_CONFIG.intakeGap.reasoningEffort,
      maxOutputTokens: AGENT_CONFIG.intakeGap.maxOutputTokens,
      systemPrompt: INTAKE_GAP_SYSTEM_PROMPT,
      userPrompt,
      schemaName: "intake_gap",
      jsonSchema: AgentJsonSchemas.intakeGap as Record<string, unknown>,
      zodSchema: IntakeGapOutputSchema,
      telemetryContext: {
        rawJobChars: args.rawJobText.length,
        rawCvChars: args.rawCvText?.length ?? 0,
        structuredContextChars: args.structuredCareerProfile
          ? JSON.stringify(args.structuredCareerProfile).length
          : 0,
      },
      mockOutput: MOCK_INTAKE_GAP_OUTPUT,
    });

  try {
    return await run();
  } catch (error) {
    if (
      error instanceof OpenAiProviderError &&
      error.meta.errorClass === "openai_cloudflare_520"
    ) {
      console.warn(
        `[AgentRetry] intakeGap | applicationId=${args.applicationId} | model=${model} | reason=OpenAI Cloudflare 520 edge failure during CV upload intake | retryInMs=${intakeGapRetryDelayMs} | status=${error.meta.status ?? "n/a"} | rayId=${error.meta.rayId ?? "n/a"} | bodyPreview=${error.meta.bodyPreview ?? "n/a"}`
      );
      await sleep(intakeGapRetryDelayMs);
      return run();
    }

    throw error;
  }
}
