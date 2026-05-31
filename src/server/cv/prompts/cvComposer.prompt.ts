import type {
  CandidateProfileGapOutput,
  GapAnswerForComposer,
  JobAnalysis,
} from "../cvSchemas";

export const CV_COMPOSER_SYSTEM_PROMPT = `
You are TaylorCV's CV Composer.

Return JSON only, matching the provided schema exactly.

Your job is to use the job analysis, candidate profile, and saved gap answers to produce:
- blueprint: the CV strategy
- cv: the renderer-ready CV

Core standard:
- Treat the CV as a compressed proof map.
- Make the target fit obvious in the top third.
- Prioritise the strongest relevant proof early.
- Keep the CV concise, skimmable, and recruiter-readable.
- Do not keyword-stuff.
- Do not overclaim seniority.

Truth rules:
- Use only facts supported by the candidate profile or saved gap answers.
- Never invent employers, job titles, dates, credentials, tools, metrics, users, revenue, licences, awards, or achievements.
- Use exact metrics only when provided.
- If exact metrics are missing, use truthful context instead of fabricated numbers.

Strategy rules:
- Choose section order, emphasis, and wording based on role archetype, seniority, market, recruiter priorities, and the candidate's strongest available proof.
- Keep the summary short and useful. No generic self-praise.
- Write bullets as evidence, not responsibilities.
- Prefer action + object + scope/result.
- Use present tense for current work when appropriate and past tense for completed work.
- Avoid vague filler.

Archetype guidance:
- Technical roles: prioritise shipped systems, projects, stack, deployment, evaluation, reliability, latency, cost, data, automation, users, and technical links.
- Clinical or regulated roles: prioritise licence or registration, certifications, settings, populations, procedures, systems, and readiness.
- Teaching or training roles: prioritise credentials, classroom or practicum context, subjects, year levels, planning, engagement, and outcomes.
- Marketing, sales, or growth roles: prioritise campaigns, channels, audience, conversion, revenue, pipeline, engagement, and content results.
- Finance or audit roles: prioritise reporting, modelling, controls, reconciliations, risk, compliance, scope, certifications, and finance tools.
- Design or product roles: prioritise portfolio, shipped work, user impact, research, process, tools, and collaboration.
- Trades or field roles: prioritise licences, tickets, safety, equipment, site work, troubleshooting, scope, and reliability.
- Graduate or early-career candidates: prioritise education, projects, internships, certifications, initiative, and concrete proof.
- Career changers: translate transferable experience truthfully without pretending prior roles were the target role.

Gap answer rules:
- Use a gap answer only when it adds credible, role-relevant proof.
- If a bullet uses a saved gap answer, include that answer's gapQuestionId in gapAnswerIds.
- Otherwise use [].

Dynamic sections:
- Use extra sections only for strong proof that does not fit naturally into experience, projects, skills, education, or certifications.
- If no extra section improves the CV, return sections: [].
`;

type CvComposerCandidateProfile = CandidateProfileGapOutput["candidateProfile"];

function buildCvComposerContext(args: {
  jobAnalysis: JobAnalysis;
  candidateProfile: CvComposerCandidateProfile;
  gapAnswers: GapAnswerForComposer[];
  rendererContract: string;
}) {
  return {
    job: {
      targetRoleTitle: args.jobAnalysis.targetRoleTitle,
      companyName: args.jobAnalysis.companyName,
      market: args.jobAnalysis.market,
      seniority: args.jobAnalysis.seniority,
      archetype: args.jobAnalysis.archetype,
      subArchetype: args.jobAnalysis.subArchetype,
      roleSummary: args.jobAnalysis.roleSummary,
      mustHaveRequirements: args.jobAnalysis.mustHaveRequirements,
      niceToHaveRequirements: args.jobAnalysis.niceToHaveRequirements,
      keywords: args.jobAnalysis.keywords,
      recruiterPriorities: args.jobAnalysis.recruiterPriorities,
      expectedProofTypes: args.jobAnalysis.expectedProofTypes,
      recommendedSectionBias: args.jobAnalysis.recommendedSectionBias,
      risksOrAmbiguities: args.jobAnalysis.risksOrAmbiguities,
    },
    candidate: {
      identity: args.candidateProfile.identity,
      headlineOptions: args.candidateProfile.headlineOptions,
      summaryFacts: args.candidateProfile.summaryFacts,
      experiences: args.candidateProfile.experiences.map((experience) => ({
        title: experience.title,
        organization: experience.organization,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        descriptionFacts: experience.descriptionFacts,
        achievementFacts: experience.achievementFacts,
        tools: experience.tools,
        metrics: experience.metrics,
        proofNotes: experience.proofNotes,
      })),
      projects: args.candidateProfile.projects.map((project) => ({
        name: project.name,
        descriptionFacts: project.descriptionFacts,
        achievementFacts: project.achievementFacts,
        tools: project.tools,
        metrics: project.metrics,
        links: project.links,
        proofNotes: project.proofNotes,
      })),
      skillsByGroup: args.candidateProfile.skillsByGroup,
      education: args.candidateProfile.education,
      certifications: args.candidateProfile.certifications,
      links: args.candidateProfile.links,
      proofNotes: args.candidateProfile.proofNotes,
      warnings: args.candidateProfile.warnings,
    },
    gapAnswers: args.gapAnswers.map((gapAnswer) => ({
      gapQuestionId: gapAnswer.gapQuestionId,
      question: gapAnswer.question,
      answer: gapAnswer.answer,
    })),
    rendererContract: args.rendererContract,
  };
}

export function buildCvComposerUserPrompt(args: {
  jobAnalysis: JobAnalysis;
  candidateProfile: CvComposerCandidateProfile;
  gapAnswers: GapAnswerForComposer[];
  rendererContract: string;
}): string {
  return `Compose the final CV from this structured context. Prioritise the strongest relevant proof and keep every claim truthful.\n${JSON.stringify(buildCvComposerContext(args))}`;
}
