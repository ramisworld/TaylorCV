import { AgentJsonSchemas, GapQuestionOutputSchema } from "~/lib/schemas";
import type { RequirementEvidenceMapRow } from "~/server/services/rag.service";
import { runJsonAgent } from "~/server/agents/agentRunner";
import { gapQuestionPrompt } from "~/server/prompts/gapQuestion.prompt";

function gapArea(label: string) {
  const normalized = label.toLowerCase();
  if (/\brag\b|retrieval|ground/.test(normalized)) return "retrieval";
  if (/agent|tool call|function/.test(normalized)) return "agentic";
  if (/eval|reliab|safety|guardrail|quality/.test(normalized)) return "quality";
  if (/customer|communication|stakeholder|tradeoff/.test(normalized))
    return "communication";
  if (/deploy|backend|integration|database|api/.test(normalized))
    return "backend";
  return normalized
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 3)
    .join(" ");
}

export async function runGapQuestionAgent(args: {
  applicationId: string;
  evidenceMap: RequirementEvidenceMapRow[];
  candidateProfileSummary: string;
}) {
  return runJsonAgent({
    applicationId: args.applicationId,
    agentName: "Gap Question Agent",
    model: "fast",
    systemPrompt: gapQuestionPrompt,
    userPrompt: JSON.stringify(args),
    schema: GapQuestionOutputSchema,
    jsonSchema: AgentJsonSchemas.gapQuestion,
    mockOutput: () => {
      const seenAreas = new Set<string>();
      const weakImportantRequirements = args.evidenceMap
        .filter(
          (row) =>
            row.requirementImportance !== "low" &&
            (row.overallConfidence === "weak" ||
              row.overallConfidence === "missing")
        )
        .filter((row) => {
          const area = gapArea(row.requirementLabel);
          if (seenAreas.has(area)) return false;
          seenAreas.add(area);
          return true;
        })
        .slice(0, 5);

      return {
        coachInsight: {
          openingMessage:
            "I had a look at the role and your background. You already have useful evidence, but a few small details could make the CV feel much more targeted.",
          jobWants:
            "This job wants someone who can turn AI ideas into working products, explain tradeoffs, and show reliable delivery.",
          candidateStrengths: args.evidenceMap
            .filter((row) => row.overallConfidence === "high")
            .slice(0, 3)
            .map((row) => `You already look strong for ${row.requirementLabel}.`),
          candidateConcerns: weakImportantRequirements.map(
            (row) =>
              `${row.requirementLabel} is not fully proven yet, so a real example here would help.`
          ),
        },
        questions: weakImportantRequirements.map((row) => ({
          targetRequirementId: row.requirementId,
          question: `Have you done anything real that connects to ${row.requirementLabel}? Small examples count if they actually happened.`,
          reason: `The job calls for ${row.requirementLabel}, but current evidence is ${row.overallConfidence}.`,
          whyItMatters: `This is one of the things the role is likely to care about when deciding whether you can do the job.`,
          answerGuidance:
            "Mention what happened, what you personally did, who it helped, and any tools, decisions, or outcome you can honestly point to.",
          exampleAngles: [
            "a project you built",
            "an internship or internal tool",
            "a class or group project",
            "feedback from a user, manager, or teammate",
          ],
        })),
      };
    },
  });
}
