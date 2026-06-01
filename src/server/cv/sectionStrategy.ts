import "server-only";

import type {
  CandidateContext,
  GapAnswerForComposer,
  JobContext,
} from "./cvSchemas";

export const SECTION_STRATEGY_ARCHETYPES = [
  "ai_ml_data_software",
  "healthcare_clinical",
  "teaching_education",
  "trades_construction_field_service",
  "finance_accounting_audit_compliance",
  "marketing_sales_growth_comms",
  "design_ux_creative",
  "product_project_operations_business",
  "research_academic_science",
  "legal_regulatory",
  "graduate_early_career",
  "career_changer",
  "general_professional",
] as const;

export type SectionStrategyArchetype =
  (typeof SECTION_STRATEGY_ARCHETYPES)[number];

export const CAREER_STAGE_VALUES = [
  "graduate",
  "early_career",
  "mid_career",
  "senior",
] as const;

export type CareerStage = (typeof CAREER_STAGE_VALUES)[number];

export type SectionStrategy = {
  archetype: SectionStrategyArchetype;
  careerStage: CareerStage;
  credentialsAreThreshold: boolean;
  proofFirstRecommended: boolean;
  recommendedSectionOrder: string[];
  preferredSectionLabels: Record<string, string>;
  combineEducationAndCertifications: boolean;
  independentProjectTitleGuidance: string;
  forbiddenLateSectionKinds: string[];
  avoidDuplicateSections: boolean;
  topThirdPriorities: string[];
  sectionRationaleShort: string;
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function corpus(parts: Array<string | null | undefined>) {
  return normalizeText(parts.filter(Boolean).join(" "));
}

function includesAny(text: string, patterns: string[]) {
  return patterns.some((pattern) => text.includes(pattern));
}

function firstNonEmpty(values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim()) ?? null;
}

function inferArchetype(args: {
  rawJobText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
}): SectionStrategyArchetype {
  const text = corpus([
    args.rawJobText,
    args.jobContext?.archetype,
    args.jobContext?.subArchetype,
    args.jobContext?.roleSummary,
    ...(args.jobContext?.mustHaveRequirements ?? []),
    ...(args.jobContext?.keywords ?? []),
    ...(args.candidateContext.skillsByGroup.flatMap((group) => group.skills) ?? []),
  ]);

  if (includesAny(text, ["nurse", "clinical", "patient", "hospital", "registered nurse", "emr"])) {
    return "healthcare_clinical";
  }
  if (includesAny(text, ["teacher", "classroom", "curriculum", "student learning", "practicum"])) {
    return "teaching_education";
  }
  if (includesAny(text, ["electrician", "construction", "apprentice", "site", "ticket", "fault finding"])) {
    return "trades_construction_field_service";
  }
  if (includesAny(text, ["audit", "accounting", "finance", "compliance", "month end", "tax", "forecast"])) {
    return "finance_accounting_audit_compliance";
  }
  if (includesAny(text, ["marketing", "growth", "campaign", "sales", "pipeline", "crm", "roas"])) {
    return "marketing_sales_growth_comms";
  }
  if (includesAny(text, ["design", "ux", "ui", "portfolio", "figma", "creative"])) {
    return "design_ux_creative";
  }
  if (includesAny(text, ["product manager", "project manager", "operations", "program manager", "roadmap"])) {
    return "product_project_operations_business";
  }
  if (includesAny(text, ["research", "publication", "laboratory", "scientist", "grant", "academic"])) {
    return "research_academic_science";
  }
  if (includesAny(text, ["legal", "law", "regulatory", "admission", "bar", "matter"])) {
    return "legal_regulatory";
  }
  if (
    includesAny(text, [
      "ai",
      "ml",
      "machine learning",
      "software engineer",
      "developer",
      "data",
      "typescript",
      "python",
      "react",
      "backend",
    ])
  ) {
    return "ai_ml_data_software";
  }

  return "general_professional";
}

function inferCareerStage(args: {
  rawJobText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
}): CareerStage {
  const seniority = args.jobContext?.seniority ?? "unknown";
  if (seniority === "intern" || seniority === "graduate") return "graduate";
  if (seniority === "junior") return "early_career";
  if (seniority === "senior" || seniority === "lead" || seniority === "manager" || seniority === "executive") {
    return "senior";
  }

  const currentEducation = args.candidateContext.education.some((item) =>
    /\bpresent\b|\bcurrent\b|202[56]/i.test(item.dates ?? "")
  );
  if (currentEducation && args.candidateContext.experiences.length <= 2) return "graduate";
  if (args.candidateContext.experiences.length <= 2) return "early_career";
  if (args.candidateContext.experiences.length >= 5) return "senior";
  return "mid_career";
}

function credentialsAreThreshold(rawJobText: string, jobContext: JobContext | null) {
  const text = corpus([
    rawJobText,
    jobContext?.roleSummary,
    ...(jobContext?.mustHaveRequirements ?? []),
    ...(jobContext?.expectedProofTypes ?? []),
  ]);

  return includesAny(text, [
    "license",
    "licence",
    "registration",
    "registered",
    "board certified",
    "teaching certificate",
    "teacher registration",
    "must hold",
    "required certification",
    "admission",
    "bar",
    "clearance",
    "work rights",
    "visa",
    "ticket",
  ]);
}

function candidateHasStrongProjectProof(candidateContext: CandidateContext) {
  const evidenceCorpus = corpus([
    ...candidateContext.notableEvidence,
    ...candidateContext.projects.flatMap((project) => [
      ...project.achievementFacts,
      ...project.descriptionFacts,
      ...project.metrics,
      ...project.originalBullets,
    ]),
  ]);

  return (
    candidateContext.projects.length > 0 &&
    includesAny(evidenceCorpus, [
      "deployed",
      "shipped",
      "evaluation",
      "latency",
      "reliability",
      "cost",
      "structured output",
      "system",
      "benchmark",
      "stakeholder",
      "customer",
      "user",
      "workflow",
    ])
  );
}

function experienceStrongerThanProjects(candidateContext: CandidateContext) {
  const experienceSignals = candidateContext.experiences.reduce((total, item) => {
    return total + item.achievementFacts.length + item.metrics.length + item.originalBullets.length;
  }, 0);
  const projectSignals = candidateContext.projects.reduce((total, item) => {
    return total + item.achievementFacts.length + item.metrics.length + item.originalBullets.length;
  }, 0);
  return experienceSignals > projectSignals + 2;
}

function educationAndCertificationsAreShort(candidateContext: CandidateContext) {
  const educationLines = candidateContext.education.reduce(
    (total, item) => total + 1 + item.details.length,
    0
  );
  const certificationLines = candidateContext.certifications.reduce(
    (total, item) => total + 1 + item.notes.length,
    0
  );

  return educationLines <= 5 && certificationLines <= 5;
}

function candidateMayNeedFounderDeframing(candidateContext: CandidateContext) {
  const text = corpus([
    candidateContext.identity.currentTitle,
    candidateContext.currentHeadline,
    ...candidateContext.summaryFacts,
    ...candidateContext.experiences.map((item) => item.title),
  ]);

  return includesAny(text, ["founder", "ceo", "entrepreneur", "builder"]);
}

function topThirdPrioritiesFor(archetype: SectionStrategyArchetype, credentialsThreshold: boolean) {
  if (credentialsThreshold) {
    return [
      "role fit",
      "must-have credentials",
      "credible practical proof",
      "setting-specific relevance",
    ];
  }

  if (archetype === "marketing_sales_growth_comms") {
    return ["role fit", "campaign or revenue proof", "channels or tools", "credible outcomes"];
  }
  if (archetype === "design_ux_creative") {
    return ["role fit", "selected work", "user or product impact", "core tools"];
  }
  if (archetype === "finance_accounting_audit_compliance") {
    return ["role fit", "relevant experience", "controls or modelling proof", "required systems"];
  }

  return ["role fit", "strongest relevant proof", "must-have tools or credentials", "credible outcomes"];
}

function preferredLabelsFor(archetype: SectionStrategyArchetype) {
  if (archetype === "ai_ml_data_software") {
    return {
      selectedTechnicalAchievements: "Selected Technical Achievements",
      skills: "Technical Skills",
      experience: "Selected Experience",
      educationAndCertifications: "Education & Certifications",
    };
  }
  if (archetype === "marketing_sales_growth_comms") {
    return {
      selectedTechnicalAchievements: "Selected Achievements",
      skills: "Channels & Tools",
      experience: "Experience",
      educationAndCertifications: "Education & Certifications",
    };
  }
  if (archetype === "design_ux_creative") {
    return {
      selectedTechnicalAchievements: "Selected Work",
      skills: "Tools",
      experience: "Experience",
      educationAndCertifications: "Education & Certifications",
    };
  }

  return {
    selectedTechnicalAchievements: "Selected Achievements",
    skills: "Skills",
    experience: "Experience",
    educationAndCertifications: "Education & Certifications",
  };
}

function inferCareerChanger(args: {
  rawJobText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
  careerStage: CareerStage;
  strongProjectProof: boolean;
}) {
  if (args.careerStage === "graduate") return false;

  const targetRole = corpus([
    args.jobContext?.targetRoleTitle,
    args.jobContext?.archetype,
    args.rawJobText.slice(0, 220),
  ]);
  const currentProfile = corpus([
    args.candidateContext.identity.currentTitle,
    args.candidateContext.currentHeadline,
    ...args.candidateContext.experiences.map((item) => item.title),
  ]);

  const targetSignals = [
    "engineer",
    "developer",
    "data",
    "ai",
    "ml",
    "designer",
    "marketing",
    "sales",
    "finance",
    "account",
    "teacher",
    "nurse",
    "legal",
    "operations",
    "product",
  ].filter((signal) => targetRole.includes(signal));
  const currentOverlap = targetSignals.filter((signal) => currentProfile.includes(signal));

  return targetSignals.length > 0 && currentOverlap.length === 0 && args.strongProjectProof;
}

export function buildSectionStrategy(args: {
  rawJobText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
  gapAnswers: GapAnswerForComposer[];
}): SectionStrategy {
  const archetype = inferArchetype(args);
  const careerStage = inferCareerStage(args);
  const credentialsThreshold = credentialsAreThreshold(args.rawJobText, args.jobContext);
  const strongProjectProof = candidateHasStrongProjectProof(args.candidateContext);
  const experienceDominant = experienceStrongerThanProjects(args.candidateContext);
  const founderRisk = candidateMayNeedFounderDeframing(args.candidateContext);
  const careerChanger = inferCareerChanger({
    rawJobText: args.rawJobText,
    jobContext: args.jobContext,
    candidateContext: args.candidateContext,
    careerStage,
    strongProjectProof,
  });
  const effectiveArchetype =
    careerChanger
      ? "career_changer"
      : careerStage === "graduate" && archetype === "general_professional"
        ? "graduate_early_career"
        : archetype;
  const preferredSectionLabels = preferredLabelsFor(effectiveArchetype);
  const gapAnswerBoost = args.gapAnswers.some((item) =>
    /deploy|latency|cost|result|stakeholder|user|customer|reliability|evaluation/i.test(
      item.answer
    )
  );

  const proofFirstRecommended =
    !credentialsThreshold &&
    (archetype === "ai_ml_data_software" ||
      archetype === "marketing_sales_growth_comms" ||
      archetype === "design_ux_creative" ||
      archetype === "graduate_early_career") &&
    (strongProjectProof || gapAnswerBoost) &&
    !experienceDominant;

  const combineEducationAndCertifications =
    !credentialsThreshold &&
    args.candidateContext.education.length > 0 &&
    args.candidateContext.certifications.length > 0 &&
    educationAndCertificationsAreShort(args.candidateContext);

  let recommendedSectionOrder: string[];
  switch (effectiveArchetype) {
    case "healthcare_clinical":
      recommendedSectionOrder = ["summary", "certifications", "experience", "skills", "education"];
      break;
    case "teaching_education":
      recommendedSectionOrder = ["summary", "certifications", "experience", "education", "skills"];
      break;
    case "trades_construction_field_service":
      recommendedSectionOrder = ["summary", "certifications", "experience", "skills", "education"];
      break;
    case "finance_accounting_audit_compliance":
      recommendedSectionOrder = credentialsThreshold
        ? ["summary", "certifications", "experience", "skills", "education"]
        : ["summary", "experience", "skills", "education", "certifications"];
      break;
    case "marketing_sales_growth_comms":
      recommendedSectionOrder = ["summary", "selected-achievements", "experience", "skills", "education", "certifications"];
      break;
    case "design_ux_creative":
      recommendedSectionOrder = ["summary", "selected-work", "experience", "skills", "education", "certifications"];
      break;
    case "research_academic_science":
      recommendedSectionOrder = ["summary", "education", "experience", "projects", "skills", "certifications"];
      break;
    case "legal_regulatory":
      recommendedSectionOrder = ["summary", "certifications", "experience", "education", "skills"];
      break;
    case "career_changer":
      recommendedSectionOrder = ["summary", "selected-achievements", "projects", "experience", "skills", "education", "certifications"];
      break;
    default:
      recommendedSectionOrder = proofFirstRecommended
        ? ["summary", "selected-technical-achievements", "skills", "experience", "education", "certifications"]
        : ["summary", "experience", "skills", "projects", "education", "certifications"];
      break;
  }

  if (careerStage === "graduate" && !credentialsThreshold && proofFirstRecommended) {
    recommendedSectionOrder = [
      "summary",
      "selected-technical-achievements",
      "skills",
      "experience",
      "education",
      "certifications",
    ];
  }

  if (combineEducationAndCertifications) {
    recommendedSectionOrder = recommendedSectionOrder.filter(
      (section) => section !== "certifications"
    );
  }

  const independentProjectTitleGuidance = founderRisk
    ? "Prefer Applied AI Engineer / AI Product Engineer / Independent Technical Project wording over Founder or Builder for normal employee applications unless founder framing is clearly useful."
    : "Prefer employee-fit wording for independent projects unless founder framing is clearly useful.";

  const roleHint = firstNonEmpty([
    args.jobContext?.targetRoleTitle,
    args.candidateContext.identity.currentTitle,
    args.candidateContext.currentHeadline,
  ]) ?? "target role";
  const rationale = proofFirstRecommended
    ? `Proof-first strategy for ${roleHint}: project or system evidence is stronger and more relevant than formal experience, so selected proof should appear before skills.`
    : credentialsThreshold
      ? `Credential-aware strategy for ${roleHint}: threshold credentials need early visibility before broader supporting proof.`
      : `Conservative strategy for ${roleHint}: lead with the clearest role fit and keep supporting proof compact and non-duplicative.`;

  return {
    archetype:
      effectiveArchetype,
    careerStage,
    credentialsAreThreshold: credentialsThreshold,
    proofFirstRecommended,
    recommendedSectionOrder,
    preferredSectionLabels,
    combineEducationAndCertifications,
    independentProjectTitleGuidance,
    forbiddenLateSectionKinds: [
      "selected",
      "highlights",
      "achievements",
      "portfolio",
      "campaignresults",
      "campaign results",
    ],
    avoidDuplicateSections: true,
    topThirdPriorities: topThirdPrioritiesFor(effectiveArchetype, credentialsThreshold),
    sectionRationaleShort: rationale,
  };
}
