import type {
  GapAnswerForComposer,
  JobContext,
  SectionSignals,
  StructuredCareerProfile,
} from "../cvSchemas";
import type { SectionStrategy } from "../sectionStrategy";
import { COMPOSER_QUALITY_POLICY } from "./composerQualityPolicy";

export const CV_COMPOSER_SYSTEM_PROMPT = `You are TaylorCV's CV Composer.

Return JSON only and match the provided schema exactly.

Output:
- cv: renderer-ready structured CV

Source rules:
- structuredCareerProfile is the candidate source of truth.
- jobContext is the target role source of truth.
- jobContext.exactPhrases supports keyword alignment only. Do not keyword-stuff.
- sectionSignals guide positioning, proof emphasis, and founder wording.
- sectionStrategy controls section order and labels.
- gap answers may enrich the CV only when credible.
- Never invent facts, metrics, dates, credentials, seniority, users, tools, companies, outcomes, or links.
- Do not mutate or output structuredCareerProfile.
- Do not output markdown, HTML, CSS, or prose outside JSON fields.

${COMPOSER_QUALITY_POLICY}

Writing rules:
- Create a one-page recruiter-clear CV.
- Make target fit obvious in the top third.
- Use the summary and next section to show role fit quickly.
- Use short, direct, evidence-based bullets.
- Prefer action + object + scope/result.
- Use real metrics when present. Use truthful context when metrics are missing.
- Avoid generic AI wording, keyword stuffing, unsupported seniority, and duplicated proof.
- Avoid em dashes by default.
- Avoid dynamic, results-driven, proven track record, leveraged, and cutting-edge unless source evidence justifies them.
- Follow sectionStrategy.recommendedSectionOrder.
- Use sectionStrategy.preferredSectionLabels when they fit the evidence.
- Do not create duplicate certifications.
- Put credentials only in cv.certifications.
- Do not create dynamic certification sections.
- Every required top-level CV field must exist even when empty.
- Renderer owns layout, typography, preview, PDF, and DOCX.`;

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

export function buildCvComposerContext(args: {
  structuredCareerProfile: StructuredCareerProfile;
  jobContext: JobContext;
  sectionSignals: SectionSignals;
  gapAnswers: GapAnswerForComposer[];
  sectionStrategy: SectionStrategy;
}) {
  return {
    pageTarget: "one_page",
    structuredCareerProfile: args.structuredCareerProfile,
    jobContext: {
      ...args.jobContext,
      mustHaveRequirements: uniqueStrings(args.jobContext.mustHaveRequirements, 10),
      responsibilities: uniqueStrings(args.jobContext.responsibilities, 8),
      proofNeeds: uniqueStrings(args.jobContext.proofNeeds, 8),
      keywords: uniqueStrings(args.jobContext.keywords, 20),
      risks: uniqueStrings(args.jobContext.risks, 5),
      exactPhrases: uniqueStrings(
        args.jobContext.exactPhrases.map((phrase) =>
          phrase.split(/\s+/).slice(0, 8).join(" "),
        ),
        8,
      ),
    },
    sectionSignals: {
      ...args.sectionSignals,
      founderFramingGuidance: normalizeWhitespace(
        args.sectionSignals.founderFramingGuidance,
      ),
      recommendedFocus: normalizeWhitespace(args.sectionSignals.recommendedFocus),
      positioningWarnings: uniqueStrings(args.sectionSignals.positioningWarnings, 8),
    },
    sectionStrategy: args.sectionStrategy,
    gapAnswers: args.gapAnswers.map((answer) => ({
      gapQuestionId: answer.gapQuestionId,
      question: normalizeWhitespace(answer.question),
      targetArea: normalizeWhitespace(answer.targetArea),
      answer: normalizeWhitespace(answer.answer),
    })),
  };
}

export type CvComposerContext = ReturnType<typeof buildCvComposerContext>;

export function buildCvComposerUserPromptFromContext(
  context: CvComposerContext,
) {
  return `Compose the final one-page CV from this compact context.
Use structuredCareerProfile for candidate facts.
Use jobContext for target role fit.
Use sectionSignals and sectionStrategy for positioning and order.
Use gapAnswers only when credible.

${JSON.stringify(context)}`;
}
