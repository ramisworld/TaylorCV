import "server-only";

import { getFastModel } from "~/lib/openai";
import { runAgent } from "./runAgent";
import {
  AgentJsonSchemas,
  JobAnalysisSchema,
  type JobAnalysis,
} from "../cvSchemas";
import {
  JOB_INTAKE_SYSTEM_PROMPT,
  buildJobIntakeUserPrompt,
} from "../prompts/jobIntake.prompt";
import { MOCK_JOB_ANALYSIS } from "./mockOutput.ts";

export async function runJobIntakeAgent(args: {
  applicationId: string;
  rawJobText: string;
}): Promise<JobAnalysis> {
  const model = getFastModel();
  const userPrompt = buildJobIntakeUserPrompt(args.rawJobText);

  return runAgent({
    agentName: "jobIntake",
    applicationId: args.applicationId,
    model,
    systemPrompt: JOB_INTAKE_SYSTEM_PROMPT,
    userPrompt,
    schemaName: "job_intake",
    jsonSchema: AgentJsonSchemas.jobIntake as Record<string, unknown>,
    zodSchema: JobAnalysisSchema,
    mockOutput: MOCK_JOB_ANALYSIS,
  });
}
