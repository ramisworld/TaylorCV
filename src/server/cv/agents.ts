import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { Agent, Runner } from "@openai/agents";

import { env } from "~/env";

import {
  FinalCvSchema,
  JobAnalyzeSchema,
  ProfileExtractSchema,
  QuestionsSchema,
  type FinalCv,
  type JobAnalyze,
  type ProfileExtract,
  type QuestionsOutput,
  type Seniority,
} from "./agentSchemas";
import { registerAgentRunTraceProcessor } from "./agentTelemetry";
import { normalizeExtractedProfile } from "./profileNormalize";
import { sectionOrderForSeniority, strategyBlockForSeniority } from "./seniorityStrategy";

type AgentRunContext = {
  userId: string;
  applicationId?: string | null;
};

function runnerForStep(args: AgentRunContext & { step: string; model: string }) {
  registerAgentRunTraceProcessor();
  return new Runner({
    tracingDisabled: false,
    traceIncludeSensitiveData: false,
    workflowName: "TaylorCV MVP",
    groupId: args.applicationId ?? args.userId,
    traceMetadata: {
      userId: args.userId,
      applicationId: args.applicationId ?? "",
      step: args.step,
      model: args.model,
    },
  });
}

function parseFinalOutput<T>(value: unknown, label: string): T {
  if (!value) throw new Error(`${label} did not return structured output.`);
  return value as T;
}

async function runStructuredAgent<T>(args: AgentRunContext & {
  step: string;
  model: string;
  agent: Agent<any, any>;
  input: unknown;
}) {
  const runner = runnerForStep(args);
  const result = await runner.run(
    args.agent,
    JSON.stringify(args.input, null, 2),
    { maxTurns: 1 }
  );
  return parseFinalOutput<T>(result.finalOutput, args.step);
}

function compactText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function mockProfile(rawCvText: string): ProfileExtract {
  const lines = rawCvText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const firstLine = lines[0] || "Candidate";
  const email = rawCvText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const skills = Array.from(
    new Set(
      ["TypeScript", "React", "Next.js", "Python", "PostgreSQL", "LLM evaluation"].filter((skill) =>
        rawCvText.toLowerCase().includes(skill.toLowerCase())
      )
    )
  );

  return normalizeExtractedProfile({
    basics: {
      fullName: firstLine,
      currentTitle: lines[1] ?? "Software Engineer",
      email,
      links: [],
    },
    about: {
      summary: compactText(rawCvText, 320),
      targetRoles: [],
    },
    seniority: "junior",
    experience: [
      {
        role: "Software Engineer",
        company: "Current Experience",
        bullets: [compactText(rawCvText, 180)],
        tools: skills,
        links: [],
      },
    ],
    projects: [],
    skills,
    skillGroups: skills.length ? [{ group: "Core skills", skills }] : [],
    education: [],
    certifications: [],
    metrics: rawCvText.match(/\d+(?:\.\d+)?%|\d+\+|~?\d+x/gi) ?? [],
    achievements: [],
    evidenceNotes: [compactText(rawCvText, 260)],
    preferences: { roleTypes: [], industries: [], locations: [], exclusions: [] },
  });
}

function mockJob(rawJobText: string): JobAnalyze {
  const firstLine = rawJobText.split(/\r?\n/).find((line) => line.trim())?.trim() ?? "Target Role";
  const skillHints = ["TypeScript", "React", "Next.js", "Python", "PostgreSQL", "AI", "ML", "RAG"];
  return {
    targetRole: firstLine.slice(0, 120),
    company: undefined,
    senioritySignal: "junior",
    mustHaveSkills: skillHints.filter((skill) => rawJobText.toLowerCase().includes(skill.toLowerCase())),
    niceToHaveSkills: [],
    responsibilities: [compactText(rawJobText, 220)],
    proofNeeds: ["Show relevant practical evidence and measurable outcomes."],
    recruiterPriorities: ["Relevant experience", "Clear proof", "Readable one-page CV"],
    keywords: skillHints.filter((skill) => rawJobText.toLowerCase().includes(skill.toLowerCase())),
  };
}

function mockQuestions(): QuestionsOutput {
  return {
    matchScore: 78,
    questions: [
      {
        id: "impact",
        question: "What measurable result should we highlight?",
        whyItMatters: "Adds proof, not just tasks.",
      },
    ],
  };
}

function mockFinalCv(args: {
  profile: ProfileExtract;
  job: JobAnalyze;
  seniority: Seniority;
}): FinalCv {
  const order = sectionOrderForSeniority(args.seniority);
  return {
    header: {
      name: args.profile.basics.fullName,
      targetTitle: args.profile.basics.currentTitle ?? args.job.targetRole,
      location: args.profile.basics.location,
      phone: args.profile.basics.phone,
      email: args.profile.basics.email,
      links: args.profile.basics.links,
    },
    sectionOrder: order,
    summary: {
      text: `${args.profile.basics.currentTitle ?? "Candidate"} with practical experience aligned to ${args.job.targetRole}. Builds clear, evidence-backed work and communicates technical decisions in a recruiter-readable way.`,
      priorityRank: 1,
    },
    experience: args.profile.experience.slice(0, 2).map((item, index) => ({
      role: item.role,
      company: item.company,
      location: item.location,
      dates: item.dates,
      priorityRank: index + 1,
      bullets: item.bullets.slice(0, 3).map((bullet, bulletIndex) => ({
        text: bullet,
        priorityRank: bulletIndex + 1,
        evidenceRefs: [],
      })),
    })),
    projects: args.profile.projects.slice(0, 2).map((item, index) => ({
      name: item.name,
      descriptor: item.descriptor,
      dates: item.dates,
      priorityRank: index + 1,
      bullets: item.bullets.slice(0, 2).map((bullet, bulletIndex) => ({
        text: bullet,
        priorityRank: bulletIndex + 1,
        evidenceRefs: [],
      })),
    })),
    skills: [
      {
        group: "Relevant tools",
        skills: args.profile.skills.slice(0, 12),
        priorityRank: 1,
      },
    ].filter((group) => group.skills.length > 0),
    education: args.profile.education.map((item, index) => ({
      ...item,
      priorityRank: index + 1,
    })),
    certifications: args.profile.certifications.map((text, index) => ({
      text,
      priorityRank: index + 1,
    })),
    publications: [],
    warnings: [],
  };
}

export async function extractProfile(args: AgentRunContext & {
  rawCvText: string;
}) {
  if (env.USE_MOCK_AI === "true") return mockProfile(args.rawCvText);

  const model = env.OPENAI_PROFILE_MODEL;
  const agent = new Agent({
    name: "TaylorCV profileExtract",
    model,
    modelSettings: {
      reasoning: { effort: "low" },
      maxTokens: 4000,
      store: false,
    },
    outputType: ProfileExtractSchema,
    instructions:
      "Extract a complete editable Candidate Vault from the CV. Preserve truthful career evidence, contact details, links, paid experience, projects, education, certifications, skills, metrics, achievements, and useful extra notes. Classify paid work under experience and self-directed, coursework, portfolio, or unpaid builds under projects. If a source item is labelled Project, keep it under projects and never infer contract work from that label alone. Preserve metrics exactly. Do not tailor to a job and do not rewrite the final CV.",
  });

  const profile = await runStructuredAgent<ProfileExtract>({
    ...args,
    step: "profileExtract",
    model,
    agent,
    input: { rawCvText: args.rawCvText },
  });
  return normalizeExtractedProfile(profile);
}

export async function analyzeJob(args: AgentRunContext & {
  rawJobText: string;
}) {
  if (env.USE_MOCK_AI === "true") return mockJob(args.rawJobText);

  const model = env.OPENAI_JOB_MODEL;
  const agent = new Agent({
    name: "TaylorCV jobAnalyze",
    model,
    modelSettings: {
      reasoning: { effort: "low" },
      maxTokens: 3000,
      store: false,
    },
    outputType: JobAnalyzeSchema,
    instructions:
      "Analyze the job description for recruiter priorities, skills, responsibilities and proof needs. Return concise structured facts only.",
  });

  return runStructuredAgent<JobAnalyze>({
    ...args,
    step: "jobAnalyze",
    model,
    agent,
    input: { rawJobText: args.rawJobText },
  });
}

export async function generateQuestions(args: AgentRunContext & {
  profile: ProfileExtract;
  job: JobAnalyze;
}) {
  if (env.USE_MOCK_AI === "true") return mockQuestions();

  const model = env.OPENAI_QUESTIONS_MODEL;
  const agent = new Agent({
    name: "TaylorCV questions",
    model,
    modelSettings: {
      reasoning: { effort: "low" },
      maxTokens: 3000,
      store: false,
    },
    outputType: QuestionsSchema,
    instructions:
      "Compare the profile to the job. Return a recruiter-readable match score from 0 to 100 and at most 3 useful evidence-hunting questions. Ask only questions that can materially improve the final CV. Questions are for the candidate, not an analyst: plain language, one ask per question, easy to answer from memory. Keep each question under 18 words and each whyItMatters under 12 words. Do not combine multiple long examples in one question. Prefer direct prompts like \"Any production issue you fixed?\" or \"What measurable result should we highlight?\".",
  });

  return runStructuredAgent<QuestionsOutput>({
    ...args,
    step: "questions",
    model,
    agent,
    input: {
      profile: args.profile,
      job: args.job,
    },
  });
}

async function writerBasePrompt() {
  return readFile(path.join(process.cwd(), "prompts/writer-base.v1.md"), "utf8");
}

export async function writeFinalCv(args: AgentRunContext & {
  profile: ProfileExtract;
  job: JobAnalyze;
  rawJobText: string;
  questions: QuestionsOutput;
  answers: unknown;
  extraNotes?: string | null;
}) {
  const seniority = args.profile.seniority;
  if (env.USE_MOCK_AI === "true") {
    return mockFinalCv({ profile: args.profile, job: args.job, seniority });
  }

  const basePrompt = await writerBasePrompt();
  const model = env.OPENAI_WRITER_MODEL;
  const instructions = `${basePrompt}

## Seniority Strategy

${strategyBlockForSeniority(seniority)}`;

  const agent = new Agent({
    name: "TaylorCV writer",
    model,
    modelSettings: {
      reasoning: { effort: "medium" },
      maxTokens: 7000,
      store: false,
      promptCacheRetention: "24h",
      providerData: {
        prompt_cache_key: "taylorcv-writer-base-v1",
      },
    },
    outputType: FinalCvSchema,
    instructions,
  });

  const input = {
    candidateVault: args.profile,
    job: args.job,
    rawJobText: args.rawJobText.slice(0, 12_000),
    questions: args.questions,
    answers: args.answers,
    extraNotes: args.extraNotes ?? "",
    requiredSectionOrder: sectionOrderForSeniority(seniority),
  };

  return runStructuredAgent<FinalCv>({
    ...args,
    step: "writer",
    model,
    agent,
    input,
  });
}
