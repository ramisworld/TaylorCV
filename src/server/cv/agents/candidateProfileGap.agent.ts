import "server-only";

import { getFastModel } from "~/lib/openai";
import { runAgent } from "./runAgent";
import {
  AgentJsonSchemas,
  CandidateProfileGapOutputSchema,
  type CandidateProfileGapOutput,
  type JobAnalysis,
} from "../cvSchemas";
import {
  CANDIDATE_PROFILE_GAP_SYSTEM_PROMPT,
  buildCandidateProfileGapUserPrompt,
} from "../prompts/candidateProfileGap.prompt";
import { MOCK_CANDIDATE_PROFILE_GAP } from "./mockOutput.ts";

export async function runCandidateProfileGapAgent(args: {
  applicationId: string;
  jobAnalysis: JobAnalysis;
  rawCvText: string;
}): Promise<CandidateProfileGapOutput> {
  const model = getFastModel();
  const userPrompt = buildCandidateProfileGapUserPrompt({
    jobAnalysis: args.jobAnalysis,
    rawCvText: args.rawCvText,
  });

  return runAgent({
    agentName: "candidateProfileGap",
    applicationId: args.applicationId,
    model,
    systemPrompt: CANDIDATE_PROFILE_GAP_SYSTEM_PROMPT,
    userPrompt,
    schemaName: "candidate_profile_gap",
    jsonSchema: AgentJsonSchemas.candidateProfileGap as Record<string, unknown>,
    zodSchema: CandidateProfileGapOutputSchema,
    mockOutput: MOCK_CANDIDATE_PROFILE_GAP,
  });
}
