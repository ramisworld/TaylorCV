import "server-only";

import { getStrongModel } from "~/lib/openai";
import { runAgent } from "./runAgent";
import {
  AgentJsonSchemas,
  CvComposerOutputSchema,
  type CvComposerOutput,
  type JobAnalysis,
  type CandidateProfileGapOutput,
  type GapAnswerForComposer,
} from "../cvSchemas";
import {
  CV_COMPOSER_SYSTEM_PROMPT,
  buildCvComposerUserPrompt,
} from "../prompts/cvComposer.prompt";
import { MOCK_CV_COMPOSER_OUTPUT } from "./mockOutput.ts";

export async function runCvComposerAgent(args: {
  applicationId: string;
  jobAnalysis: JobAnalysis;
  candidateProfile: CandidateProfileGapOutput["candidateProfile"];
  gapAnswers: GapAnswerForComposer[];
}): Promise<CvComposerOutput> {
  const model = getStrongModel();
  const userPrompt = buildCvComposerUserPrompt({
    jobAnalysis: args.jobAnalysis,
    candidateProfile: args.candidateProfile,
    gapAnswers: args.gapAnswers,
  });

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
