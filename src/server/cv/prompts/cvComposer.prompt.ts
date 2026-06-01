import type {
  CandidateContext,
  GapAnswerForComposer,
  JobContext,
} from "../cvSchemas";
import type { SectionStrategy } from "../sectionStrategy";

export const CV_COMPOSER_SYSTEM_PROMPT = `You are TaylorCV's CV Composer.

Return JSON only and match the provided schema exactly.

Output:
- blueprint: short developer-facing CV strategy
- cv: renderer-ready structured CV

Writing rules:
- The recruiter should see target fit within seconds.
- The summary and the next section together must make the top third recruiter-clear.
- Every section must earn its space. Compress or omit weak, repetitive, low-signal, or generic content.
- Preserve useful evidence from the source: links, certification scores or distinctions, scholarships, project context, stakeholder context, tools, and concrete outcome wording.
- Use the strongest available proof, not the most conventional template.
- A strong CV is a compressed proof map. Make role fit obvious in the top third.
- Use the raw CV, gap answers, and compact context as the only evidence sources.
- Never invent facts, metrics, seniority, credentials, companies, tools, users, or outcomes.
- Proof beats promises. Prefer action + object + scope/result bullets.
- Real metrics are good. If exact metrics are missing, use truthful context instead of fake numbers.
- Truthful scale or context is better than invented numbers.
- Soft skills should be shown through examples, not listed as empty claims.
- Avoid generic filler, keyword stuffing, AI-sounding phrasing, comma-heavy prose, and em dashes by default.
- Avoid words like dynamic, results-driven, proven track record, leveraged, and cutting-edge unless the source clearly justifies them.
- Do not duplicate the same proof across selected achievements, projects, and experience.
- Do not create a late selected/highlights/achievements section.
- Do not use Founder, CEO, Entrepreneur, or Builder framing for normal employee applications unless the source or job clearly benefits from it.
- Prefer employee-fit independent-project wording when truthful.
- Do not overclaim seniority. Do not make a graduate or early-career candidate sound senior.
- Keep education and certifications readable and scannable.
- Keep blueprint short.

Section strategy rules:
- Follow sectionStrategy unless the source evidence clearly proves it wrong.
- Summary remains first.
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

const maxJobExcerptChars = 2_800;
const maxRawCvChars = 12_000;

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function clampText(value: string, maxChars: number) {
  const text = value.trim();
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()} [truncated]`;
}

function uniqueStrings(values: string[], maxItems: number) {
  return [...new Set(values.map((value) => normalizeWhitespace(value)).filter(Boolean))].slice(
    0,
    maxItems
  );
}

function excerptCandidates(rawJobText: string) {
  return rawJobText
    .split(/\n{1,}|\r\n{1,}/)
    .map((part) => normalizeWhitespace(part))
    .filter((part) => part.length >= 40);
}

function scoreExcerpt(text: string, jobContext: JobContext | null) {
  const normalized = normalizeWhitespace(text).toLowerCase();
  let score = Math.min(40, text.length / 10);
  for (const phrase of [
    ...(jobContext?.mustHaveRequirements ?? []),
    ...(jobContext?.recruiterPriorities ?? []),
    ...(jobContext?.expectedProofTypes ?? []),
  ]) {
    const compact = normalizeWhitespace(phrase).toLowerCase();
    if (compact && normalized.includes(compact.slice(0, Math.min(compact.length, 30)))) score += 8;
  }
  if (/required|must|responsib|experience|skill|qualification|build|ship|deploy|stakeholder/i.test(text)) {
    score += 10;
  }
  return score;
}

function selectJobExcerpts(rawJobText: string, jobContext: JobContext | null) {
  const picked: string[] = [];
  let usedChars = 0;
  for (const excerpt of excerptCandidates(rawJobText)
    .sort((a, b) => scoreExcerpt(b, jobContext) - scoreExcerpt(a, jobContext))
    .slice(0, 8)) {
    if (picked.length >= 5) break;
    const nextChars = usedChars + excerpt.length;
    if (nextChars > maxJobExcerptChars && picked.length >= 2) break;
    picked.push(excerpt);
    usedChars = nextChars;
  }
  return picked;
}

export function compactJobContextForComposer(jobContext: JobContext | null) {
  if (!jobContext) return null;

  return {
    targetRoleTitle: jobContext.targetRoleTitle,
    companyName: jobContext.companyName,
    marketOrLocation: jobContext.marketOrLocation,
    seniority: jobContext.seniority,
    archetype: jobContext.archetype,
    roleSummary: jobContext.roleSummary,
    mustHaveRequirements: uniqueStrings(jobContext.mustHaveRequirements, 8),
    keywords: uniqueStrings(jobContext.keywords, 12),
    recruiterPriorities: uniqueStrings(jobContext.recruiterPriorities, 8),
    expectedProofTypes: uniqueStrings(jobContext.expectedProofTypes, 8),
    culturalSignals: uniqueStrings(jobContext.culturalSignals, 6),
    risksOrAmbiguities: uniqueStrings(jobContext.risksOrAmbiguities, 6),
  };
}

function summarizeExperience(candidateContext: CandidateContext) {
  return candidateContext.experiences.slice(0, 4).map((item) => ({
    title: item.title,
    organization: item.organization,
    dates: [item.startDate, item.endDate].filter(Boolean).join(" - ") || null,
    strongestProof: uniqueStrings(
      [...item.achievementFacts, ...item.metrics, ...item.descriptionFacts, ...item.originalBullets],
      4
    ),
    tools: uniqueStrings(item.tools, 8),
  }));
}

function summarizeProjects(candidateContext: CandidateContext) {
  return candidateContext.projects.slice(0, 4).map((item) => ({
    name: item.name,
    strongestProof: uniqueStrings(
      [...item.achievementFacts, ...item.metrics, ...item.descriptionFacts, ...item.originalBullets],
      4
    ),
    tools: uniqueStrings(item.tools, 8),
    links: uniqueStrings(item.links, 2),
  }));
}

export function compactCandidateContextForComposer(candidateContext: CandidateContext) {
  return {
    identity: candidateContext.identity,
    currentHeadline: candidateContext.currentHeadline,
    summaryFacts: uniqueStrings(candidateContext.summaryFacts, 8),
    strongestEvidence: uniqueStrings(candidateContext.notableEvidence, 10),
    experiences: summarizeExperience(candidateContext),
    projects: summarizeProjects(candidateContext),
    skillsByGroup: candidateContext.skillsByGroup.slice(0, 6).map((group) => ({
      group: group.group,
      skills: uniqueStrings(group.skills, 10),
    })),
    education: candidateContext.education.slice(0, 3),
    certifications: candidateContext.certifications.slice(0, 5).map((item) => ({
      name: item.name,
      issuer: item.issuer,
      date: item.date,
      scoreOrDetail: item.scoreOrDetail,
      notes: uniqueStrings(item.notes, 2),
    })),
    awardsOrScholarships: uniqueStrings(candidateContext.awardsOrScholarships, 6),
    warnings: uniqueStrings(candidateContext.warnings, 6),
    weakOrMissingAreas: uniqueStrings(candidateContext.weakOrMissingAreas, 8),
    sourceHierarchy: candidateContext.sourceStructure.slice(0, 5).map((item) => ({
      sectionName: item.sectionName,
      normalizedType: item.normalizedType,
      highSignal: item.highSignal,
      usefulDetails: uniqueStrings(item.usefulDetails, 3),
    })),
  };
}

export function buildCvComposerContext(args: {
  rawJobText: string;
  rawCvText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
  gapAnswers: GapAnswerForComposer[];
  sectionStrategy: SectionStrategy;
}) {
  const compactJobContext = compactJobContextForComposer(args.jobContext);
  const compactCandidateContext = compactCandidateContextForComposer(args.candidateContext);
  const jobExcerpts = selectJobExcerpts(args.rawJobText, args.jobContext);

  return {
    pageTarget: "one_page",
    sectionStrategy: args.sectionStrategy,
    jobContext: compactJobContext,
    candidateContext: compactCandidateContext,
    gapAnswers: args.gapAnswers.map((answer) => ({
      gapQuestionId: answer.gapQuestionId,
      question: normalizeWhitespace(answer.question),
      answer: normalizeWhitespace(answer.answer),
    })),
    rawJobSignals: {
      roleTitle: compactJobContext?.targetRoleTitle ?? null,
      mustHaves: compactJobContext?.mustHaveRequirements ?? [],
      recruiterPriorities: compactJobContext?.recruiterPriorities ?? [],
      expectedProofTypes: compactJobContext?.expectedProofTypes ?? [],
      culturalSignals: compactJobContext?.culturalSignals ?? [],
      excerpts: jobExcerpts,
    },
    rawCandidateCvText: clampText(args.rawCvText, maxRawCvChars),
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
      bulletShape: { text: "string", gapAnswerIds: ["gapQuestionId when used"] },
      notes: [
        "renderer owns layout",
        "keep education/certifications readable",
        "do not rely on renderer to invent or merge strategy",
      ],
    },
  };
}

export type CvComposerContext = ReturnType<typeof buildCvComposerContext>;

export function buildCvComposerUserPromptFromContext(context: CvComposerContext) {
  return `Compose the final one-page CV from this context.
Use sectionStrategy as the main source for section order and section labels.
Use rawCandidateCvText, gapAnswers, and compact context as evidence.

${JSON.stringify(context)}`;
}
