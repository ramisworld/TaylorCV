import "server-only";

import {
  DefaultSectionSignals,
  type JobContext,
  type SectionSignals,
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
  candidatePresentationStage: SectionSignals["candidatePresentationStage"];
  candidateProfileType: SectionSignals["candidateProfileType"];
  strongestProofType: SectionSignals["strongestProofType"];
  credentialsAreThreshold: boolean;
  proofFirstRecommended: boolean;
  hybridStructureRecommended: boolean;
  founderFramingMode: SectionSignals["founderFramingMode"];
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
  jobContext: JobContext | null;
  sectionSignals: SectionSignals;
}) {
  if (
    args.sectionSignals.candidatePresentationStage === "career_changer" ||
    args.sectionSignals.candidateProfileType === "career_changer"
  ) {
    return "career_changer" as const;
  }

  const archetype = normalizeArchetype(args.jobContext?.roleFamily);
  if (
    archetype === "general_professional" &&
    (args.sectionSignals.candidatePresentationStage === "student" ||
      args.sectionSignals.candidatePresentationStage === "graduate")
  ) {
    return "graduate_early_career" as const;
  }

  return archetype;
}

function presentationStageFromSeniority(
  seniority: JobContext["seniority"] | null | undefined
): SectionSignals["candidatePresentationStage"] {
  if (seniority === "intern") return "student";
  if (seniority === "graduate") return "graduate";
  if (seniority === "junior") return "early_career";
  if (seniority === "mid") return "mid_level";
  if (seniority === "senior" || seniority === "lead") return "senior_level";
  if (seniority === "manager" || seniority === "executive") return "senior_level";
  return "unknown";
}

function withDeterministicFallbacks(args: {
  jobContext: JobContext | null;
  sectionSignals: SectionSignals;
}): SectionSignals {
  if (args.sectionSignals.candidatePresentationStage !== "unknown") {
    return args.sectionSignals;
  }

  return {
    ...args.sectionSignals,
    candidatePresentationStage: presentationStageFromSeniority(
      args.jobContext?.seniority
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
  sectionSignals: SectionSignals;
}) {
  if (args.sectionSignals.credentialsAreThreshold) {
    return [
      "role fit",
      "must-have credentials",
      "credible practical proof",
      "setting-specific relevance",
    ];
  }

  if (args.sectionSignals.proofFirstRecommended) {
    return [
      "role fit",
      args.sectionSignals.strongestProofType.replace(/_/g, " "),
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

function isTechnicalArchetype(archetype: SectionStrategyArchetype) {
  return archetype === "ai_ml_data_software";
}

function shouldUseProjectsSection(args: {
  archetype: SectionStrategyArchetype;
  subArchetype: string | null | undefined;
  sectionSignals: SectionSignals;
}) {
  const strongestProof = args.sectionSignals.strongestProofType;
  const stage = args.sectionSignals.candidatePresentationStage;
  const profileType = args.sectionSignals.candidateProfileType;
  const strongProjectProof = args.sectionSignals.projectStrength === "strong";
  const weakFormalExperience = args.sectionSignals.experienceStrength === "weak";
  const normalizedSubArchetype = (args.subArchetype ?? "").toLowerCase();
  const hasProjectEvidenceHint =
    strongestProof === "projects" || strongestProof === "portfolio";

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
  sectionSignals: SectionSignals;
}) {
  const { archetype, sectionSignals } = args;
  const proofFirst = sectionSignals.proofFirstRecommended;
  const credentialsThreshold = sectionSignals.credentialsAreThreshold;
  const strongestProof = sectionSignals.strongestProofType;
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
  sectionSignals: SectionSignals;
}) {
  if (args.sectionSignals.credentialsAreThreshold) return false;
  if (isTechnicalArchetype(args.archetype)) return true;
  return (
    args.sectionSignals.educationStrength !== "strong" &&
    args.sectionSignals.certificationStrength !== "strong"
  );
}

function firstNonEmpty(values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === "string" && value.trim()) ?? null;
}

export function buildSectionStrategy(args: {
  jobContext: JobContext | null;
  sectionSignals?: SectionSignals;
}): SectionStrategy {
  const sectionSignals = withDeterministicFallbacks({
    jobContext: args.jobContext,
    sectionSignals: args.sectionSignals ?? DefaultSectionSignals,
  });
  const archetype = effectiveArchetype({
    jobContext: args.jobContext,
    sectionSignals,
  });
  const preferredSectionLabels = preferredLabelsFor(archetype);
  const combineEducationAndCertifications =
    shouldCombineEducationAndCertifications({ archetype, sectionSignals });
  const recommendedSectionOrder = sectionOrderFor({
    archetype,
    subArchetype: args.jobContext?.subRoleFamily,
    sectionSignals,
  }).filter(
    (section) => !combineEducationAndCertifications || section !== "certifications"
  );

  const roleHint = firstNonEmpty([
    args.jobContext?.roleTitle,
    sectionSignals.recommendedFocus,
  ]) ?? "target role";
  const sectionRationaleShort = sectionSignals.proofFirstRecommended
    ? `Proof-first strategy for ${roleHint}: ${sectionSignals.recommendedFocus}`
    : sectionSignals.credentialsAreThreshold
      ? `Credential-aware strategy for ${roleHint}: threshold credentials need early visibility.`
      : `Conservative strategy for ${roleHint}: ${sectionSignals.recommendedFocus}`;

  return {
    archetype,
    subArchetype: args.jobContext?.subRoleFamily ?? null,
    candidatePresentationStage: sectionSignals.candidatePresentationStage,
    candidateProfileType: sectionSignals.candidateProfileType,
    strongestProofType: sectionSignals.strongestProofType,
    credentialsAreThreshold: sectionSignals.credentialsAreThreshold,
    proofFirstRecommended: sectionSignals.proofFirstRecommended,
    hybridStructureRecommended: sectionSignals.hybridStructureRecommended,
    founderFramingMode: sectionSignals.founderFramingMode,
    founderFramingGuidance: sectionSignals.founderFramingGuidance,
    recommendedSectionOrder,
    preferredSectionLabels,
    combineEducationAndCertifications,
    independentProjectTitleGuidance: sectionSignals.founderFramingGuidance,
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
      sectionSignals,
    }),
    sectionRationaleShort,
  };
}
