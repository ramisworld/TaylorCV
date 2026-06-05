import type {
  CandidateBrief,
  DeterministicCandidateBasics,
  GapAnswerForComposer,
  JobBrief,
  StrategySignals,
} from "../cvSchemas";
import type { SectionStrategy } from "../sectionStrategy";
import { COMPOSER_QUALITY_POLICY } from "./composerQualityPolicy";

export const CV_COMPOSER_SYSTEM_PROMPT = `You are TaylorCV's CV Composer.

Return JSON only and match the provided schema exactly.

Output:
- blueprint: short developer-facing CV strategy
- cv: renderer-ready structured CV

Source rules:
- rawJobText is the source of truth for the target role.
- rawCandidateCvText is the source of truth for the candidate evidence.
- jobBrief and candidateBrief are compact guidance only.
- strategySignals guide positioning, framing, proof emphasis, and founder wording.
- sectionStrategy controls section order and section labels.
- deterministicBasics helps preserve contact details and useful links.
- gap answers may enrich the CV only when they credibly fill missing or weak proof.
- whyItMatters explains why a gap question was asked. It is not a fact to copy into the CV.
- exampleAnswer from intake is only UI guidance. It is not evidence unless the user actually wrote matching proof in a saved answer.

${COMPOSER_QUALITY_POLICY}

Writing rules:
- The recruiter should see target fit within seconds.
- The summary and the next section together must make the top third recruiter-clear.
- Every section must earn its space. Compress or omit weak, repetitive, low-signal, or generic content.
- Preserve useful evidence from the source: links, certification scores or distinctions, scholarships, project context, stakeholder context, tools, and concrete outcome wording.
- Use the strongest available proof, not the most conventional template.
- A strong CV is a compressed proof map. Make role fit obvious in the top third.
- Never invent facts, metrics, seniority, credentials, companies, tools, users, or outcomes.
- Proof beats promises. Prefer action + object + scope/result bullets.
- Real metrics are good. If exact metrics are missing, use truthful context instead of fake numbers.
- Truthful scale or context is better than invented numbers.
- Soft skills should be shown through examples, not listed as empty claims.
- You must avoid generic filler, keyword stuffing, AI-sounding phrasing, comma-heavy prose, and em dashes by default.
- Use commas only when needed.
- Prefer short, direct bullets.
- Avoid words like dynamic, results-driven, proven track record, leveraged, and cutting-edge unless the source clearly justifies them.
- Do not duplicate the same proof across selected achievements, projects, and experience.
- Do not create a late selected/highlights/achievements section.
- Follow strategySignals.founderFramingMode and strategySignals.founderFramingGuidance when choosing titles, section labels, and bullet wording.
- Do not overclaim seniority. Do not make a graduate or early-career candidate sound senior.
- Keep education and certifications readable and scannable.
- Keep blueprint short.

Section strategy rules:
- Follow sectionStrategy.recommendedSectionOrder exactly.
- Summary remains first.
- Do not reorder recommended sections.
- You may omit a recommended section only when the source evidence is too weak or empty to support it.
- If you omit a recommended section, add a short explanation in blueprint.warnings.
- Do not add a standalone Projects section when sectionStrategy.recommendedSectionOrder does not include projects.
- A selected/highlights/achievements/portfolio section belongs directly after Summary or near the top, or not at all.
- If sectionStrategy.proofFirstRecommended is true, do not place Skills immediately after Summary when a stronger selected proof section exists.
- If sectionStrategy.combineEducationAndCertifications is true, keep education and certifications adjacent and treat them as one compact supporting block.
- Use sectionStrategy.preferredSectionLabels when they fit the evidence.
- Keep the top third focused on sectionStrategy.topThirdPriorities.
- Do not let education or certifications outrank stronger project, system, campaign, portfolio, or selected proof unless threshold credentials require it.

Renderer rules:
- The renderer owns layout, typography, spacing, preview, PDF, and DOCX.
- Do not output markdown, HTML, CSS, or prose outside the JSON fields.
- Every required top-level CV field must exist even when empty.`;

const abnormalRawCvSafetyCap = 80_000;

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function uniqueStrings(values: string[], maxItems: number) {
  return [
    ...new Set(
      values.map((value) => normalizeWhitespace(value)).filter(Boolean),
    ),
  ].slice(0, maxItems);
}

function applyAbnormalRawCvSafetyCap(rawCvText: string) {
  if (rawCvText.length <= abnormalRawCvSafetyCap) return rawCvText;
  console.warn(
    `[TaylorCV] raw CV exceeded abnormal safety cap (${rawCvText.length} chars); truncating for composer payload.`,
  );
  return `${rawCvText.slice(0, abnormalRawCvSafetyCap).trimEnd()} [abnormally truncated]`;
}

export function buildCvComposerContext(args: {
  rawJobText: string;
  rawCvText: string;
  jobBrief: JobBrief | null;
  candidateBrief: CandidateBrief;
  strategySignals: StrategySignals;
  deterministicBasics: DeterministicCandidateBasics;
  gapAnswers: GapAnswerForComposer[];
  sectionStrategy: SectionStrategy;
}) {
  return {
    pageTarget: "one_page",
    rawJobText: args.rawJobText,
    rawCandidateCvText: applyAbnormalRawCvSafetyCap(args.rawCvText),
    jobBrief: args.jobBrief
      ? {
          ...args.jobBrief,
          topPriorities: uniqueStrings(args.jobBrief.topPriorities, 8),
          proofNeeds: uniqueStrings(args.jobBrief.proofNeeds, 8),
          keywords: uniqueStrings(args.jobBrief.keywords, 16),
          cultureSignals: uniqueStrings(args.jobBrief.cultureSignals, 6),
          risks: uniqueStrings(args.jobBrief.risks, 6),
        }
      : null,
    candidateBrief: {
      ...args.candidateBrief,
      strongestEvidence: uniqueStrings(
        args.candidateBrief.strongestEvidence,
        10,
      ),
      relevantSignals: uniqueStrings(args.candidateBrief.relevantSignals, 12),
      missingOrWeakProof: uniqueStrings(
        args.candidateBrief.missingOrWeakProof,
        8,
      ),
      usefulSections: uniqueStrings(args.candidateBrief.usefulSections, 8),
      warnings: uniqueStrings(args.candidateBrief.warnings, 6),
    },
    strategySignals: {
      ...args.strategySignals,
      founderFramingGuidance: normalizeWhitespace(
        args.strategySignals.founderFramingGuidance,
      ),
      recommendedFocus: normalizeWhitespace(
        args.strategySignals.recommendedFocus,
      ),
      primaryFraming: normalizeWhitespace(args.strategySignals.primaryFraming),
      positioningWarnings: uniqueStrings(
        args.strategySignals.positioningWarnings,
        8,
      ),
    },
    deterministicBasics: args.deterministicBasics,
    sectionStrategy: args.sectionStrategy,
    gapAnswers: args.gapAnswers.map((answer) => ({
      gapQuestionId: answer.gapQuestionId,
      question: normalizeWhitespace(answer.question),
      targetArea: normalizeWhitespace(answer.targetArea),
      whyItMatters: normalizeWhitespace(answer.whyItMatters),
      answer: normalizeWhitespace(answer.answer),
    })),
    rendererContract: {
      requiredTopLevelFields: [
        "sectionOrder",
        "header",
        "summary",
        "skills",
        "experience",
        "projects",
        "education",
        "certifications",
        "sections",
        "roleArchetype",
      ],
      bulletShape: {
        text: "string",
        gapAnswerIds: ["gapQuestionId when used"],
      },
      notes: [
        "renderer owns layout",
        "keep education/certifications readable",
        "do not rely on renderer to invent or merge strategy",
      ],
    },
  };
}

export type CvComposerContext = ReturnType<typeof buildCvComposerContext>;

export function buildCvComposerUserPromptFromContext(
  context: CvComposerContext,
) {
  return `Compose the final one-page CV from this context.
Use rawCandidateCvText and rawJobText as the primary evidence sources.
Use jobBrief and candidateBrief as compact guidance only.
Use strategySignals for positioning and founder framing.
Use sectionStrategy for deterministic section order and section labels.

${JSON.stringify(context)}`;
}
