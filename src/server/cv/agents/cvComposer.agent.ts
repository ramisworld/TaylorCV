import "server-only";

import { getStrongModel } from "~/lib/openai";
import { AGENT_CONFIG } from "./agentConfig";
import { compactJsonChars } from "./agentTelemetry";
import { runAgent } from "./runAgent";
import {
  AgentJsonSchemas,
  CvComposerOutputSchema,
  type CvComposerOutput,
  type CandidateBrief,
  type DeterministicCandidateBasics,
  type GapAnswerForComposer,
  type JobBrief,
  type StructuredCareerProfile,
  type StrategySignals,
} from "../cvSchemas";
import {
  CV_COMPOSER_SYSTEM_PROMPT,
  buildCvComposerContext,
  buildCvComposerUserPromptFromContext,
} from "../prompts/cvComposer.prompt";
import type { SectionStrategy } from "../sectionStrategy";
import { MOCK_CV_COMPOSER_OUTPUT } from "./mockOutput.ts";

export async function runCvComposerAgent(args: {
  applicationId: string;
  rawJobText: string;
  rawCvText?: string | null;
  structuredCareerProfile: StructuredCareerProfile;
  jobBrief: JobBrief | null;
  candidateBrief: CandidateBrief;
  strategySignals: StrategySignals;
  deterministicBasics: DeterministicCandidateBasics;
  gapAnswers: GapAnswerForComposer[];
  sectionStrategy: SectionStrategy;
}): Promise<CvComposerOutput> {
  const model = getStrongModel();
  const composerContext = buildCvComposerContext({
    rawJobText: args.rawJobText,
    rawCvText: args.rawCvText,
    structuredCareerProfile: args.structuredCareerProfile,
    jobBrief: args.jobBrief,
    candidateBrief: args.candidateBrief,
    strategySignals: args.strategySignals,
    deterministicBasics: args.deterministicBasics,
    gapAnswers: args.gapAnswers,
    sectionStrategy: args.sectionStrategy,
  });
  const userPrompt = buildCvComposerUserPromptFromContext(composerContext);
  const schemaJson = JSON.stringify(AgentJsonSchemas.cvComposer);
  const structuredContextChars =
    compactJsonChars(composerContext.jobBrief) +
    compactJsonChars(composerContext.candidateBrief) +
    compactJsonChars(composerContext.strategySignals) +
    compactJsonChars(composerContext.deterministicBasics) +
    compactJsonChars(composerContext.structuredCareerProfile) +
    compactJsonChars(composerContext.gapAnswers) +
    compactJsonChars(composerContext.rendererContract);
  const sectionStrategyChars = compactJsonChars(composerContext.sectionStrategy);
  const payloadChars =
    userPrompt.length + CV_COMPOSER_SYSTEM_PROMPT.length + schemaJson.length;

  console.log(
    `[AgentPayload] cvComposer | payloadChars=${payloadChars} | userPromptChars=${userPrompt.length} | systemPromptChars=${CV_COMPOSER_SYSTEM_PROMPT.length} | schemaChars=${schemaJson.length} | rawJobChars=${composerContext.rawJobText.length} | rawCvChars=${composerContext.rawCandidateCvText.length} | structuredContextChars=${structuredContextChars} | sectionStrategyChars=${sectionStrategyChars} | gapAnswers=${composerContext.gapAnswers.length}`
  );

  return runAgent({
    agentName: "cvComposer",
    applicationId: args.applicationId,
    model,
    reasoningEffort: AGENT_CONFIG.cvComposer.reasoningEffort,
    maxOutputTokens: AGENT_CONFIG.cvComposer.maxOutputTokens,
    systemPrompt: CV_COMPOSER_SYSTEM_PROMPT,
    userPrompt,
    schemaName: "cv_composer",
    jsonSchema: AgentJsonSchemas.cvComposer as Record<string, unknown>,
    zodSchema: CvComposerOutputSchema,
    telemetryContext: {
      rawJobChars: composerContext.rawJobText.length,
      rawCvChars: composerContext.rawCandidateCvText.length,
      structuredContextChars,
      sectionStrategyChars,
      payloadChars,
      gapAnswerCount: composerContext.gapAnswers.length,
    },
    mockOutput: MOCK_CV_COMPOSER_OUTPUT,
  });
}
