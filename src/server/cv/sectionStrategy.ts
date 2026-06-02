import "server-only";

import type {
  CandidateBrief,
  DeterministicCandidateBasics,
  GapAnswerForComposer,
  JobBrief,
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
  subArchetype: string | null;
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
  rawCvText: string;
  jobBrief: JobBrief | null;
  candidateBrief: CandidateBrief;
}) {
  const text = corpus([
    args.rawJobText,
    args.rawCvText,
    args.jobBrief?.archetype,
    args.jobBrief?.subArchetype,
    args.jobBrief?.roleSummary,
    ...(args.jobBrief?.keywords ?? []),
    ...args.candidateBrief.relevantSignals,
    ...args.candidateBrief.strongestEvidence,
  ]);

  if (includesAny(text, ["nurse", "clinical", "patient", "hospital", "registered nurse", "emr"])) {
    return "healthcare_clinical" as const;
  }
  if (includesAny(text, ["teacher", "classroom", "curriculum", "student learning", "practicum"])) {
    return "teaching_education" as const;
  }
  if (includesAny(text, ["electrician", "construction", "apprentice", "site", "ticket", "fault finding"])) {
    return "trades_construction_field_service" as const;
  }
  if (includesAny(text, ["audit", "accounting", "finance", "compliance", "month end", "tax", "forecast"])) {
    return "finance_accounting_audit_compliance" as const;
  }
  if (includesAny(text, ["marketing", "growth", "campaign", "sales", "pipeline", "crm", "roas"])) {
    return "marketing_sales_growth_comms" as const;
  }
  if (includesAny(text, ["design", "ux", "ui", "portfolio", "figma", "creative"])) {
    return "design_ux_creative" as const;
  }
  if (includesAny(text, ["product manager", "project manager", "operations", "program manager", "roadmap"])) {
    return "product_project_operations_business" as const;
  }
  if (includesAny(text, ["research", "publication", "laboratory", "scientist", "grant", "academic"])) {
    return "research_academic_science" as const;
  }
  if (includesAny(text, ["legal", "law", "regulatory", "admission", "bar", "matter"])) {
    return "legal_regulatory" as const;
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
    return "ai_ml_data_software" as const;
  }

  return "general_professional" as const;
}

function inferCareerStage(args: {
  rawCvText: string;
  rawJobText: string;
  jobBrief: JobBrief | null;
  candidateBrief: CandidateBrief;
  deterministicBasics: DeterministicCandidateBasics;
}) {
  const seniority = args.jobBrief?.seniority ?? "unknown";
  if (seniority === "intern" || seniority === "graduate") return "graduate";
  if (seniority === "junior") return "early_career";
  if (["senior", "lead", "manager", "executive"].includes(seniority)) return "senior";

  const text = corpus([
    args.rawCvText,
    args.rawJobText,
    args.candidateBrief.possibleHeadline,
    ...args.deterministicBasics.sectionHeadings,
  ]);

  if (includesAny(text, ["student", "graduate", "intern", "bachelor", "master", "university"])) {
    return "graduate";
  }
  if (includesAny(text, ["lead", "manager", "head of", "director", "principal"])) {
    return "senior";
  }
  if (includesAny(text, ["3 years", "4 years", "5 years", "senior"])) {
    return "mid_career";
  }
  return "early_career";
}

function credentialsAreThreshold(rawJobText: string, jobBrief: JobBrief | null) {
  const text = corpus([
    rawJobText,
    jobBrief?.roleSummary,
    ...(jobBrief?.topPriorities ?? []),
    ...(jobBrief?.proofNeeds ?? []),
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

function candidateHasStrongProjectProof(args: {
  rawCvText: string;
  candidateBrief: CandidateBrief;
  gapAnswers: GapAnswerForComposer[];
}) {
  const evidenceCorpus = corpus([
    args.rawCvText,
    ...args.candidateBrief.strongestEvidence,
    ...args.candidateBrief.relevantSignals,
    ...args.gapAnswers.map((item) => item.answer),
  ]);

  return includesAny(evidenceCorpus, [
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
    "project",
  ]);
}

function educationAndCertificationsAreShort(args: {
  rawCvText: string;
  deterministicBasics: DeterministicCandidateBasics;
}) {
  const text = args.rawCvText;
  const hasEducation = /education|university|bachelor|master|degree/i.test(text);
  const hasCertifications =
    /certification|certificate|licensed|licence|exam|associate/i.test(text);
  return hasEducation && hasCertifications && args.deterministicBasics.sectionHeadings.length <= 8;
}

function candidateMayNeedFounderDeframing(args: {
  rawCvText: string;
  candidateBrief: CandidateBrief;
}) {
  const text = corpus([
    args.rawCvText,
    args.candidateBrief.possibleHeadline,
    ...args.candidateBrief.relevantSignals,
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
  rawCvText: string;
  jobBrief: JobBrief | null;
  candidateBrief: CandidateBrief;
  careerStage: CareerStage;
  strongProjectProof: boolean;
}) {
  if (args.careerStage === "graduate") return false;

  const targetRole = corpus([
    args.jobBrief?.targetRoleTitle,
    args.jobBrief?.archetype,
    args.rawJobText.slice(0, 220),
  ]);
  const currentProfile = corpus([
    args.candidateBrief.possibleHeadline,
    args.rawCvText.slice(0, 500),
    ...args.candidateBrief.relevantSignals,
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
  rawCvText: string;
  jobBrief: JobBrief | null;
  candidateBrief: CandidateBrief;
  deterministicBasics: DeterministicCandidateBasics;
  gapAnswers: GapAnswerForComposer[];
}): SectionStrategy {
  const archetype = inferArchetype(args);
  const careerStage = inferCareerStage(args);
  const credentialsThreshold = credentialsAreThreshold(args.rawJobText, args.jobBrief);
  const strongProjectProof = candidateHasStrongProjectProof(args);
  const founderRisk = candidateMayNeedFounderDeframing(args);
  const careerChanger = inferCareerChanger({
    rawJobText: args.rawJobText,
    rawCvText: args.rawCvText,
    jobBrief: args.jobBrief,
    candidateBrief: args.candidateBrief,
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
    (effectiveArchetype === "ai_ml_data_software" ||
      effectiveArchetype === "marketing_sales_growth_comms" ||
      effectiveArchetype === "design_ux_creative" ||
      effectiveArchetype === "graduate_early_career" ||
      effectiveArchetype === "career_changer") &&
    (strongProjectProof || gapAnswerBoost);

  const combineEducationAndCertifications =
    !credentialsThreshold &&
    educationAndCertificationsAreShort({
      rawCvText: args.rawCvText,
      deterministicBasics: args.deterministicBasics,
    });

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

  if (combineEducationAndCertifications) {
    recommendedSectionOrder = recommendedSectionOrder.filter(
      (section) => section !== "certifications"
    );
  }

  const independentProjectTitleGuidance = founderRisk
    ? "Prefer Applied AI Engineer / AI Product Engineer / Independent Technical Project wording over Founder or Builder for normal employee applications unless founder framing is clearly useful."
    : "Prefer employee-fit wording for independent projects unless founder framing is clearly useful.";

  const roleHint = firstNonEmpty([
    args.jobBrief?.targetRoleTitle,
    args.candidateBrief.possibleHeadline,
  ]) ?? "target role";
  const rationale = proofFirstRecommended
    ? `Proof-first strategy for ${roleHint}: strong project or systems evidence should appear before generic support sections.`
    : credentialsThreshold
      ? `Credential-aware strategy for ${roleHint}: threshold credentials need early visibility before broader supporting proof.`
      : `Conservative strategy for ${roleHint}: lead with clear role fit and keep supporting proof compact and non-duplicative.`;

  return {
    archetype: effectiveArchetype,
    subArchetype: args.jobBrief?.subArchetype ?? null,
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
