import type {
  CandidateContext,
  GapAnswerForComposer,
  JobContext,
} from "../cvSchemas";

export const COMPOSER_QUALITY_POLICY = `
Composer Quality Policy:
- A great CV is a compressed proof map. The top third must make target fit obvious within seconds.
- Recruiters skim first. Make the target role, strongest relevant proof, must-have skills, credentials and credible outcomes easy to find.
- Proof beats promises. Every important claim must be supported by the raw CV, structured candidate context, or saved gap answers.
- Use the raw job description and raw CV as source of truth. Structured context is a helper summary only.
- Do not lose strong source details: links, certification scores, scholarships, awards, education details, project context, tools, metrics, and strong original bullets.
- Choose section order by archetype, seniority, credentials, strongest proof, target job and page budget. Do not force one layout onto every career.
- Section order should change for technical, clinical, teaching, trades, marketing, finance, design, graduate and career-change cases.
- The top third should show fit, not generic personality claims.
- Bullets should use action + object + scope/result. Use real metrics when provided.
- If exact metrics are missing, use truthful scale or context instead of fake numbers.
- Never invent metrics, dates, tools, companies, credentials, licences, users, revenue, awards, scholarships, publications or achievements.
- Avoid generic filler, keyword stuffing, AI-sounding language, em dashes by default and comma-heavy phrasing.
- Do not overclaim seniority. Do not make the candidate look like a flight risk for normal employee applications.
- Prefer employee-fit framing over founder/operator framing unless the role benefits from founder/startup positioning.
- Certifications and education must stay readable. Every section must earn its space.
- One page does not mean overly short. Use the page intelligently and include strong relevant proof when available.
`;

export const CV_COMPOSER_SYSTEM_PROMPT = `
You are TaylorCV's CV Composer.

Return JSON only, matching the provided schema exactly.

Produce:
- blueprint: the CV strategy for developer debugging
- cv: the renderer-ready structured CV

You are the main intelligence layer. Decide the target title, candidate archetype, section order, what proof deserves space, what to cut, what to expand, and how to tailor the CV to the job.

The renderer owns visual layout. Do not output markdown, HTML, CSS, or free-form document prose outside the JSON fields.

${COMPOSER_QUALITY_POLICY}

Rules:
- cv.sectionOrder must begin with "summary".
- blueprint.sectionOrder must match cv.sectionOrder.
- All top-level CV fields required by the schema must exist. Arrays can be empty when appropriate.
- Use dynamic sections only when they add clearer proof than canonical sections.
- If a bullet uses a saved gap answer, include that answer's gapQuestionId in gapAnswerIds. Otherwise use [].
- Do not include source-tracking fields in CV bullets beyond gapAnswerIds.
`;

const maxRawJobChars = 20_000;
const maxRawCvChars = 30_000;

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function boundedRawText(value: string, maxChars: number) {
  const text = value.trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}\n\n[truncated after ${maxChars} characters]`;
}

export function buildCvComposerContext(args: {
  rawJobText: string;
  rawCvText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
  gapAnswers: GapAnswerForComposer[];
}) {
  return {
    pageTarget: "one_page",
    rawJobDescription: boundedRawText(args.rawJobText, maxRawJobChars),
    rawCandidateCvText: boundedRawText(args.rawCvText, maxRawCvChars),
    structuredJobContext: args.jobContext,
    structuredCandidateContext: args.candidateContext,
    gapQuestionsAndAnswers: args.gapAnswers.map((answer) => ({
      gapQuestionId: answer.gapQuestionId,
      question: cleanText(answer.question),
      answer: cleanText(answer.answer),
    })),
    rendererContract: {
      output: "strict structured CV JSON only",
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
      bulletShape: { text: "string", gapAnswerIds: ["gapQuestionId when used"] },
      rendererOwns: ["layout", "typography", "spacing", "PDF export", "DOCX export"],
    },
  };
}

export type CvComposerContext = ReturnType<typeof buildCvComposerContext>;

export function buildCvComposerUserPromptFromContext(context: CvComposerContext) {
  return `Compose the final one-page CV from this context. Use the raw job description and raw CV as source of truth, use structured context as a helper, and use gap answers only when credible and relevant.\n${JSON.stringify(context)}`;
}
