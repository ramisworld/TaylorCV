import "server-only";

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

export async function runIntakeGapAgent(args: {
  applicationId: string;
  rawJobText: string;
  rawCvText: string;
}): Promise<IntakeGapOutput> {
  const model = getFastModel();
  const userPrompt = buildIntakeGapUserPrompt({
    rawJobText: args.rawJobText,
    rawCvText: args.rawCvText,
  });

  return runAgent({
    agentName: "intakeGap",
    applicationId: args.applicationId,
    model,
    reasoningEffort: AGENT_CONFIG.intakeGap.reasoningEffort,
    systemPrompt: INTAKE_GAP_SYSTEM_PROMPT,
    userPrompt,
    schemaName: "intake_gap",
    jsonSchema: AgentJsonSchemas.intakeGap as Record<string, unknown>,
    zodSchema: IntakeGapOutputSchema,
    telemetryContext: {
      rawJobChars: args.rawJobText.length,
      rawCvChars: args.rawCvText.length,
    },
    mockOutput: MOCK_INTAKE_GAP_OUTPUT,
  });
}
