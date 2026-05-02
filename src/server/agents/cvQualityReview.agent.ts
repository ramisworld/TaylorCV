import {
  AgentJsonSchemas,
  CvQualityReviewOutputSchema,
} from "~/lib/schemas";
import { runJsonAgent } from "~/server/agents/agentRunner";
import { cvQualityReviewPrompt } from "~/server/prompts/cvQualityReview.prompt";

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizedSection(section: string) {
  const normalized = section.toLowerCase().replace(/[^a-z]+/g, " ").trim();
  if (
    normalized === "project" ||
    normalized === "projects" ||
    normalized === "selected project" ||
    normalized === "selected projects"
  ) {
    return "projects";
  }
  if (normalized === "work experience") return "experience";
  return normalized;
}

function firstIndex(sections: string[], target: string) {
  return sections.map(normalizedSection).indexOf(target);
}

function readStrategySectionOrder(context: unknown) {
  if (!context || typeof context !== "object") return [];
  const strategy = (context as { strategy?: { sectionOrderJson?: unknown } })
    .strategy;
  return stringArray(strategy?.sectionOrderJson);
}

function readCvSectionOrder(cvOutput: unknown) {
  if (!cvOutput || typeof cvOutput !== "object") return [];
  const cvJson = (cvOutput as { cvJson?: { sectionOrder?: unknown } }).cvJson;
  return stringArray(cvJson?.sectionOrder);
}

function readSummary(cvOutput: unknown) {
  if (!cvOutput || typeof cvOutput !== "object") return "";
  const cvJson = (cvOutput as { cvJson?: { summary?: unknown } }).cvJson;
  return typeof cvJson?.summary === "string" ? cvJson.summary : "";
}

function readProjectBulletCount(cvOutput: unknown) {
  if (!cvOutput || typeof cvOutput !== "object") return 0;
  const cvJson = (cvOutput as { cvJson?: { projects?: unknown } }).cvJson;
  if (!Array.isArray(cvJson?.projects)) return 0;

  return cvJson.projects.reduce((count, project) => {
    if (!project || typeof project !== "object") return count;
    const bullets = (project as { bullets?: unknown }).bullets;
    return count + (Array.isArray(bullets) ? bullets.length : 0);
  }, 0);
}

export async function runCvQualityReviewAgent(args: {
  applicationId: string;
  context: unknown;
  cvOutput: unknown;
}) {
  return runJsonAgent({
    applicationId: args.applicationId,
    agentName: "CV Quality Reviewer Agent",
    model: "fast",
    systemPrompt: cvQualityReviewPrompt,
    userPrompt: JSON.stringify({
      context: args.context,
      cvOutput: args.cvOutput,
    }),
    schema: CvQualityReviewOutputSchema,
    jsonSchema: AgentJsonSchemas.cvQualityReview,
    mockOutput: () => {
      const issues: string[] = [];
      const strategyOrder = readStrategySectionOrder(args.context);
      const cvOrder = readCvSectionOrder(args.cvOutput);
      const strategyProjectsIndex = firstIndex(strategyOrder, "projects");
      const strategyExperienceIndex = firstIndex(strategyOrder, "experience");
      const cvProjectsIndex = firstIndex(cvOrder, "projects");
      const cvExperienceIndex = firstIndex(cvOrder, "experience");

      if (strategyOrder.length > 0 && cvOrder.length === 0) {
        issues.push("cvJson.sectionOrder is missing.");
      }

      if (
        strategyProjectsIndex !== -1 &&
        strategyExperienceIndex !== -1 &&
        strategyProjectsIndex < strategyExperienceIndex &&
        (cvProjectsIndex === -1 ||
          cvExperienceIndex === -1 ||
          cvProjectsIndex > cvExperienceIndex)
      ) {
        issues.push(
          "Strategy puts projects before experience, but the CV does not."
        );
      }

      if (
        /\b(strongest fit is|evidence suggests|positioning angle|recruiter concerns|weak evidence)\b/i.test(
          readSummary(args.cvOutput)
        )
      ) {
        issues.push("Summary contains internal strategy/meta language.");
      }

      if (readProjectBulletCount(args.cvOutput) > 8) {
        issues.push("Project section is too long for a one-page CV.");
      }

      return {
        passed: issues.length === 0,
        issues,
        revisionInstructions:
          issues.length === 0
            ? ""
            : [
                "Revise the CV once before saving.",
                "Follow cvStrategy.sectionOrder exactly in cvJson.sectionOrder and cvText.",
                "If projects are stronger than experience, put Selected Projects before Experience.",
                "Remove any internal strategy/meta language from the summary.",
                "Tighten projects so the strongest one has up to 3 bullets and others usually have 1-2.",
              ].join(" "),
      };
    },
  });
}
