import type {
  CandidateProfileGapOutput,
  GapAnswerForComposer,
  JobAnalysis,
} from "../cvSchemas";

export const CV_COMPOSER_SYSTEM_PROMPT = `
You are TaylorCV's CV Composer.

Return JSON only, matching the provided schema exactly.

Produce:
- blueprint: the CV strategy
- cv: the renderer-ready CV

Rules:
- You own content strategy, section choice, section labels, section order, and what evidence earns space.
- The renderer will preserve your content and order and will only adjust typography and spacing.
- Produce a one-page recruiter CV.
- The professional summary must be the first content section directly below the header.
- sectionOrder must begin with "summary".
- blueprint.sectionOrder must match cv.sectionOrder.

Quality bar:
- Treat the CV as a compressed proof map.
- Make target fit obvious in the top third.
- Follow the job context for recruiter priorities, expected proof types, and section emphasis.
- Prioritise the strongest relevant proof early.
- Every section and bullet must earn space.
- Prefer fewer, stronger bullets over exhaustive coverage.
- Cut weaker, repetitive, generic or low-evidence material yourself.
- Keep the writing concise, skimmable, specific, and credible.
- No keyword stuffing. No vague filler. No overclaiming seniority.

Truth rules:
- Use only facts supported by the candidate profile or saved gap answers.
- Never invent employers, job titles, dates, credentials, tools, metrics, users, revenue, licences, awards, or achievements.
- Use exact metrics only when provided.
- If exact metrics are missing, use truthful context instead of fabricated numbers.

Writing rules:
- Write bullets as evidence, not responsibilities.
- Prefer action + object + scope/result.
- Use present tense for current work when appropriate and past tense for completed work.
- Use a gap answer only when it adds credible, role-relevant proof.
- If a bullet uses a saved gap answer, include that answer's gapQuestionId in gapAnswerIds. Otherwise use [].

Dynamic sections:
- Use extra sections only when they add stronger proof than a canonical section would.
- If you create a dynamic section, place its id in sectionOrder exactly where it belongs.
- If no extra section improves the CV, return sections: [].

Blueprint:
- blueprint.spaceBudget should describe the one-page editorial strategy, not rigid quotas.
`;

type CvComposerCandidateProfile = CandidateProfileGapOutput["candidateProfile"];

function buildCvComposerContext(args: {
  jobAnalysis: JobAnalysis;
  candidateProfile: CvComposerCandidateProfile;
  gapAnswers: GapAnswerForComposer[];
}) {
  return {
    pageTarget: "one_page",
    job: {
      title: args.jobAnalysis.targetRoleTitle,
      market: args.jobAnalysis.market,
      seniority: args.jobAnalysis.seniority,
      archetype: args.jobAnalysis.archetype,
      mustHaves: args.jobAnalysis.mustHaveRequirements,
      priorities: args.jobAnalysis.recruiterPriorities,
      proofTypes: args.jobAnalysis.expectedProofTypes,
      sectionBias: args.jobAnalysis.recommendedSectionBias,
    },
    candidate: {
      identity: {
        fullName: args.candidateProfile.identity.fullName,
        currentTitle: args.candidateProfile.identity.currentTitle,
        location: args.candidateProfile.identity.location,
        email: args.candidateProfile.identity.email,
        phone: args.candidateProfile.identity.phone,
        linkedin: args.candidateProfile.identity.linkedin,
        github: args.candidateProfile.identity.github,
        portfolio: args.candidateProfile.identity.portfolio,
      },
      summaryFacts: args.candidateProfile.summaryFacts,
      experience: args.candidateProfile.experiences.map((experience) => ({
        title: experience.title,
        organization: experience.organization,
        dates: {
          start: experience.startDate,
          end: experience.endDate,
        },
        achievements: experience.achievementFacts,
        tools: experience.tools,
        metrics: experience.metrics,
      })),
      projects: args.candidateProfile.projects.map((project) => ({
        name: project.name,
        achievements: project.achievementFacts,
        tools: project.tools,
        metrics: project.metrics,
        links: project.links,
      })),
      skills: args.candidateProfile.skillsByGroup,
      education: args.candidateProfile.education.map((item) => ({
        institution: item.institution,
        qualification: item.qualification,
        dates: item.dates,
      })),
      certifications: args.candidateProfile.certifications.map((item) => ({
        name: item.name,
        issuer: item.issuer,
        date: item.date,
      })),
      warnings: args.candidateProfile.warnings,
    },
    gapAnswers: args.gapAnswers.map((gapAnswer) => ({
      gapQuestionId: gapAnswer.gapQuestionId,
      answer: gapAnswer.answer,
    })),
    renderingRules: {
      summaryFirst: true,
      pageTarget: "one_page",
    },
  };
}

export function buildCvComposerUserPrompt(args: {
  jobAnalysis: JobAnalysis;
  candidateProfile: CvComposerCandidateProfile;
  gapAnswers: GapAnswerForComposer[];
}): string {
  return `Compose the final one-page CV from this structured context. Keep the professional summary first below the header, prioritise the strongest relevant proof, and keep every claim truthful.\n${JSON.stringify(buildCvComposerContext(args))}`;
}
