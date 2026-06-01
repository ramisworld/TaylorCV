import "server-only";

import { getStrongModel } from "~/lib/openai";
import { AGENT_CONFIG } from "./agentConfig";
import { compactJsonChars } from "./agentTelemetry";
import { runAgent } from "./runAgent";
import {
  AgentJsonSchemas,
  CvComposerOutputSchema,
  type CvComposerOutput,
  type CandidateContext,
  type GapAnswerForComposer,
  type JobContext,
} from "../cvSchemas";
import {
  CV_COMPOSER_SYSTEM_PROMPT,
  buildCvComposerContext,
  buildCvComposerUserPromptFromContext,
} from "../prompts/cvComposer.prompt";
import { MOCK_CV_COMPOSER_OUTPUT } from "./mockOutput.ts";

export async function runCvComposerAgent(args: {
  applicationId: string;
  rawJobText: string;
  rawCvText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
  gapAnswers: GapAnswerForComposer[];
}): Promise<CvComposerOutput> {
  const model = getStrongModel();
  const composerContext = buildCvComposerContext({
    rawJobText: args.rawJobText,
    rawCvText: args.rawCvText,
    jobContext: args.jobContext,
    candidateContext: args.candidateContext,
    gapAnswers: args.gapAnswers,
  });
  const userPrompt = buildCvComposerUserPromptFromContext(composerContext);
  const schemaJson = JSON.stringify(AgentJsonSchemas.cvComposer);
  const structuredContextChars =
    compactJsonChars(composerContext.structuredJobContext) +
    compactJsonChars(composerContext.structuredCandidateContext) +
    compactJsonChars(composerContext.gapQuestionsAndAnswers) +
    compactJsonChars(composerContext.rendererContract);
  const payloadChars =
    userPrompt.length + CV_COMPOSER_SYSTEM_PROMPT.length + schemaJson.length;

  console.log(
    `[AgentPayload] cvComposer | payloadChars=${payloadChars} | userPromptChars=${userPrompt.length} | systemPromptChars=${CV_COMPOSER_SYSTEM_PROMPT.length} | schemaChars=${schemaJson.length} | rawJobChars=${composerContext.rawJobDescription.length} | rawCvChars=${composerContext.rawCandidateCvText.length} | structuredContextChars=${structuredContextChars} | gapAnswers=${composerContext.gapQuestionsAndAnswers.length}`
  );

  return runAgent({
    agentName: "cvComposer",
    applicationId: args.applicationId,
    model,
    reasoningEffort: AGENT_CONFIG.cvComposer.reasoningEffort,
    systemPrompt: CV_COMPOSER_SYSTEM_PROMPT,
    userPrompt,
    schemaName: "cv_composer",
    jsonSchema: AgentJsonSchemas.cvComposer as Record<string, unknown>,
    zodSchema: CvComposerOutputSchema,
    telemetryContext: {
      rawJobChars: composerContext.rawJobDescription.length,
      rawCvChars: composerContext.rawCandidateCvText.length,
      structuredContextChars,
      gapAnswerCount: composerContext.gapQuestionsAndAnswers.length,
    },
    mockOutput: MOCK_CV_COMPOSER_OUTPUT,
  });
}
