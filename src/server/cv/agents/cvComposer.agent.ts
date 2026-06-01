import "server-only";

import { getStrongModel } from "~/lib/openai";
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

  console.log(
    `[AgentPayload] cvComposer | userPromptChars=${userPrompt.length} | systemPromptChars=${CV_COMPOSER_SYSTEM_PROMPT.length} | schemaChars=${schemaJson.length} | rawJobChars=${composerContext.rawJobDescription.length} | rawCvChars=${composerContext.rawCandidateCvText.length} | gapAnswers=${composerContext.gapQuestionsAndAnswers.length}`
  );

  return runAgent({
    agentName: "cvComposer",
    applicationId: args.applicationId,
    model,
    systemPrompt: CV_COMPOSER_SYSTEM_PROMPT,
    userPrompt,
    schemaName: "cv_composer",
    jsonSchema: AgentJsonSchemas.cvComposer as Record<string, unknown>,
    zodSchema: CvComposerOutputSchema,
    mockOutput: MOCK_CV_COMPOSER_OUTPUT,
  });
}
