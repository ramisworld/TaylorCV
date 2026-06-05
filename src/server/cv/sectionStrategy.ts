import "server-only";

import {
  DefaultStrategySignals,
  type CandidateBrief,
  type JobBrief,
  type StrategySignals,
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

export type SectionStrategy = {
  archetype: SectionStrategyArchetype;
  subArchetype: string | null;
  candidatePresentationStage: StrategySignals["candidatePresentationStage"];
  candidateProfileType: StrategySignals["candidateProfileType"];
  strongestProofType: StrategySignals["strongestProofType"];
  credentialsAreThreshold: boolean;
  proofFirstRecommended: boolean;
  hybridStructureRecommended: boolean;
  founderFramingMode: StrategySignals["founderFramingMode"];
  founderFramingGuidance: string;
  recommendedSectionOrder: string[];
  preferredSectionLabels: Record<string, string>;
  combineEducationAndCertifications: boolean;
  independentProjectTitleGuidance: string;
  forbiddenLateSectionKinds: string[];
  avoidDuplicateSections: boolean;
  topThirdPriorities: string[];
  sectionRationaleShort: string;
};

function normalizeArchetype(value: string | null | undefined): SectionStrategyArchetype {
  if (
    value &&
    (SECTION_STRATEGY_ARCHETYPES as readonly string[]).includes(value)
  ) {
    return value as SectionStrategyArchetype;
  }
  return "general_professional";
}

function effectiveArchetype(args: {
  jobBrief: JobBrief | null;
  strategySignals: StrategySignals;
}) {
  if (
    args.strategySignals.candidatePresentationStage === "career_changer" ||
    args.strategySignals.candidateProfileType === "career_changer"
  ) {
    return "career_changer" as const;
  }

  const archetype = normalizeArchetype(args.jobBrief?.archetype);
  if (
    archetype === "general_professional" &&
    (args.strategySignals.candidatePresentationStage === "student" ||
      args.strategySignals.candidatePresentationStage === "graduate")
  ) {
    return "graduate_early_career" as const;
  }

  return archetype;
}

function presentationStageFromSeniority(
  seniority: JobBrief["seniority"] | null | undefined
): StrategySignals["candidatePresentationStage"] {
  if (seniority === "intern") return "student";
  if (seniority === "graduate") return "graduate";
  if (seniority === "junior") return "early_career";
  if (seniority === "mid") return "mid_level";
  if (seniority === "senior" || seniority === "lead") return "senior_level";
  if (seniority === "manager" || seniority === "executive") return "senior_level";
  return "unknown";
}

function withDeterministicFallbacks(args: {
  jobBrief: JobBrief | null;
  strategySignals: StrategySignals;
}): StrategySignals {
  if (args.strategySignals.candidatePresentationStage !== "unknown") {
    return args.strategySignals;
  }

  return {
    ...args.strategySignals,
    candidatePresentationStage: presentationStageFromSeniority(
      args.jobBrief?.seniority
    ),
  };
}

function preferredLabelsFor(archetype: SectionStrategyArchetype) {
  if (archetype === "ai_ml_data_software") {
    return {
      selectedTechnicalAchievements: "Selected Technical Achievements",
      skills: "Technical Skills",
      experience: "Selected Experience",
      educationAndCertifications: "Education & Certifications",
      certifications: "Certifications",
    };
  }
  if (archetype === "marketing_sales_growth_comms") {
    return {
      selectedTechnicalAchievements: "Selected Achievements",
      skills: "Channels & Tools",
      experience: "Experience",
      educationAndCertifications: "Education & Certifications",
      certifications: "Certifications",
    };
  }
  if (archetype === "design_ux_creative") {
    return {
      selectedTechnicalAchievements: "Selected Work",
      skills: "Tools",
      experience: "Experience",
      educationAndCertifications: "Education & Certifications",
      certifications: "Certifications",
    };
  }
  if (archetype === "healthcare_clinical") {
    return {
      selectedTechnicalAchievements: "Selected Clinical Evidence",
      skills: "Clinical Skills",
      experience: "Clinical Experience",
      educationAndCertifications: "Education & Certifications",
      certifications: "Licences & Certifications",
    };
  }
  if (archetype === "trades_construction_field_service") {
    return {
      selectedTechnicalAchievements: "Selected Site Evidence",
      skills: "Tools & Equipment",
      experience: "Site Experience",
      educationAndCertifications: "Education & Certifications",
      certifications: "Licences & Certifications",
    };
  }
  if (archetype === "teaching_education" || archetype === "legal_regulatory") {
    return {
      selectedTechnicalAchievements: "Selected Achievements",
      skills: "Skills",
      experience: "Experience",
      educationAndCertifications: "Education & Certifications",
      certifications: "Licences & Certifications",
    };
  }

  return {
    selectedTechnicalAchievements: "Selected Achievements",
    skills: "Skills",
    experience: "Experience",
    educationAndCertifications: "Education & Certifications",
    certifications: "Certifications",
  };
}

function topThirdPrioritiesFor(args: {
  archetype: SectionStrategyArchetype;
  strategySignals: StrategySignals;
}) {
  if (args.strategySignals.credentialsAreThreshold) {
    return [
      "role fit",
      "must-have credentials",
      "credible practical proof",
      "setting-specific relevance",
    ];
  }

  if (args.strategySignals.proofFirstRecommended) {
    return [
      "role fit",
      args.strategySignals.strongestProofType.replace(/_/g, " "),
      "credible outcomes",
      "must-have tools or credentials",
    ];
  }

  if (args.archetype === "marketing_sales_growth_comms") {
    return ["role fit", "campaign or revenue proof", "channels or tools", "credible outcomes"];
  }
  if (args.archetype === "design_ux_creative") {
    return ["role fit", "selected work", "user or product impact", "core tools"];
  }
  if (args.archetype === "finance_accounting_audit_compliance") {
    return ["role fit", "relevant experience", "controls or modelling proof", "required systems"];
  }

  return ["role fit", "strongest relevant proof", "must-have tools or credentials", "credible outcomes"];
}

function normalizeSectionHint(value: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (normalized === "project" || normalized === "projects" || normalized === "ai projects") {
    return "projects";
  }
  if (normalized === "portfolio" || normalized === "selected portfolio") {
    return "portfolio";
  }
  if (normalized === "experience" || normalized === "work experience") {
    return "experience";
  }
  if (normalized === "education") return "education";
  if (normalized === "certifications" || normalized === "certification") {
    return "certifications";
  }
  if (normalized === "skills" || normalized === "technical skills") return "skills";
  return normalized;
}

function candidateSectionHints(candidateBrief: CandidateBrief | undefined) {
  return new Set((candidateBrief?.usefulSections ?? []).map(normalizeSectionHint).filter(Boolean));
}

function isTechnicalArchetype(archetype: SectionStrategyArchetype) {
  return archetype === "ai_ml_data_software";
}

function shouldUseProjectsSection(args: {
  archetype: SectionStrategyArchetype;
  subArchetype: string | null | undefined;
  strategySignals: StrategySignals;
  candidateBrief?: CandidateBrief;
}) {
  const hints = candidateSectionHints(args.candidateBrief);
  const strongestProof = args.strategySignals.strongestProofType;
  const stage = args.strategySignals.candidatePresentationStage;
  const profileType = args.strategySignals.candidateProfileType;
  const strongProjectProof = args.strategySignals.projectProofStrength === "strong";
  const weakFormalExperience = args.strategySignals.formalExperienceStrength === "weak";
  const normalizedSubArchetype = (args.subArchetype ?? "").toLowerCase();
  const hasProjectEvidenceHint =
    hints.has("projects") || hints.has("portfolio") || strongestProof === "projects" || strongestProof === "portfolio";

  if (!hasProjectEvidenceHint) return false;
  if (args.archetype === "research_academic_science" || args.archetype === "career_changer") {
    return true;
  }
  if (profileType === "career_changer" || stage === "student" || stage === "graduate") {
    return true;
  }
  if (normalizedSubArchetype.includes("research") || normalizedSubArchetype.includes("portfolio")) {
    return true;
  }
  if (strongestProof === "portfolio") return true;
  if (strongestProof === "projects" && strongProjectProof && weakFormalExperience) {
    return true;
  }
  return false;
}

function sectionOrderFor(args: {
  archetype: SectionStrategyArchetype;
  subArchetype: string | null | undefined;
  strategySignals: StrategySignals;
  candidateBrief?: CandidateBrief;
}) {
  const { archetype, strategySignals } = args;
  const proofFirst = strategySignals.proofFirstRecommended;
  const credentialsThreshold = strategySignals.credentialsAreThreshold;
  const strongestProof = strategySignals.strongestProofType;
  const allowProjects = shouldUseProjectsSection(args);

  if (credentialsThreshold) {
    if (archetype === "teaching_education" || archetype === "legal_regulatory") {
      return ["summary", "certifications", "experience", "education", "skills"];
    }
    return ["summary", "certifications", "experience", "skills", "education"];
  }

  if (archetype === "career_changer") {
    return allowProjects
      ? ["summary", "selected-achievements", "projects", "experience", "skills", "education", "certifications"]
      : ["summary", "selected-achievements", "experience", "skills", "education", "certifications"];
  }
  if (archetype === "graduate_early_career") {
    if (proofFirst || strongestProof === "projects" || strongestProof === "portfolio") {
      return allowProjects
        ? ["summary", "selected-achievements", "projects", "skills", "education", "certifications", "experience"]
        : ["summary", "selected-achievements", "skills", "experience", "education", "certifications"];
    }
    return ["summary", "education", "projects", "experience", "skills", "certifications"];
  }
  if (archetype === "marketing_sales_growth_comms") {
    return ["summary", "selected-achievements", "experience", "skills", "education", "certifications"];
  }
  if (archetype === "design_ux_creative") {
    return ["summary", "selected-work", "experience", "skills", "education", "certifications"];
  }
  if (archetype === "research_academic_science") {
    return ["summary", "education", "experience", "projects", "skills", "certifications"];
  }
  if (archetype === "finance_accounting_audit_compliance") {
    return ["summary", "experience", "skills", "education", "certifications"];
  }
  if (archetype === "healthcare_clinical" || archetype === "trades_construction_field_service") {
    return ["summary", "experience", "skills", "certifications", "education"];
  }
  if (archetype === "ai_ml_data_software") {
    if (proofFirst || strongestProof === "projects" || strongestProof === "portfolio") {
      return allowProjects
        ? ["summary", "selected-technical-achievements", "projects", "skills", "experience", "education", "certifications"]
        : ["summary", "selected-technical-achievements", "skills", "experience", "education", "certifications"];
    }
    return allowProjects
      ? ["summary", "experience", "projects", "skills", "education", "certifications"]
      : ["summary", "experience", "skills", "education", "certifications"];
  }

  if (proofFirst || strongestProof === "projects" || strongestProof === "portfolio") {
    return allowProjects
      ? ["summary", "selected-technical-achievements", "skills", "experience", "projects", "education", "certifications"]
      : ["summary", "selected-technical-achievements", "skills", "experience", "education", "certifications"];
  }

  return allowProjects
    ? ["summary", "experience", "skills", "projects", "education", "certifications"]
    : ["summary", "experience", "skills", "education", "certifications"];
}

function shouldCombineEducationAndCertifications(args: {
  archetype: SectionStrategyArchetype;
  strategySignals: StrategySignals;
}) {
  if (args.strategySignals.credentialsAreThreshold) return false;
  if (isTechnicalArchetype(args.archetype)) return true;
  return (
    args.strategySignals.educationCredentialStrength !== "strong" &&
    args.strategySignals.certificationStrength !== "strong"
  );
}

function firstNonEmpty(values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim()) ?? null;
}

export function buildSectionStrategy(args: {
  jobBrief: JobBrief | null;
  candidateBrief?: CandidateBrief;
  strategySignals?: StrategySignals;
}): SectionStrategy {
  const strategySignals = withDeterministicFallbacks({
    jobBrief: args.jobBrief,
    strategySignals: args.strategySignals ?? DefaultStrategySignals,
  });
  const archetype = effectiveArchetype({
    jobBrief: args.jobBrief,
    strategySignals,
  });
  const preferredSectionLabels = preferredLabelsFor(archetype);
  const combineEducationAndCertifications =
    shouldCombineEducationAndCertifications({ archetype, strategySignals });
  const recommendedSectionOrder = sectionOrderFor({
    archetype,
    subArchetype: args.jobBrief?.subArchetype,
    strategySignals,
    candidateBrief: args.candidateBrief,
  }).filter(
    (section) => !combineEducationAndCertifications || section !== "certifications"
  );

  const roleHint = firstNonEmpty([
    args.jobBrief?.targetRoleTitle,
    strategySignals.primaryFraming,
  ]) ?? "target role";
  const sectionRationaleShort = strategySignals.proofFirstRecommended
    ? `Proof-first strategy for ${roleHint}: ${strategySignals.recommendedFocus}`
    : strategySignals.credentialsAreThreshold
      ? `Credential-aware strategy for ${roleHint}: threshold credentials need early visibility.`
      : `Conservative strategy for ${roleHint}: ${strategySignals.recommendedFocus}`;

  return {
    archetype,
    subArchetype: args.jobBrief?.subArchetype ?? null,
    candidatePresentationStage: strategySignals.candidatePresentationStage,
    candidateProfileType: strategySignals.candidateProfileType,
    strongestProofType: strategySignals.strongestProofType,
    credentialsAreThreshold: strategySignals.credentialsAreThreshold,
    proofFirstRecommended: strategySignals.proofFirstRecommended,
    hybridStructureRecommended: strategySignals.hybridStructureRecommended,
    founderFramingMode: strategySignals.founderFramingMode,
    founderFramingGuidance: strategySignals.founderFramingGuidance,
    recommendedSectionOrder,
    preferredSectionLabels,
    combineEducationAndCertifications,
    independentProjectTitleGuidance: strategySignals.founderFramingGuidance,
    forbiddenLateSectionKinds: [
      "selected",
      "highlights",
      "achievements",
      "portfolio",
      "campaignresults",
      "campaign results",
    ],
    avoidDuplicateSections: true,
    topThirdPriorities: topThirdPrioritiesFor({
      archetype,
      strategySignals,
    }),
    sectionRationaleShort,
  };
}
