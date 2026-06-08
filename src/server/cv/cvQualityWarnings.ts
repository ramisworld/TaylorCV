import type { StructuredCv } from "../../lib/cvDocument.ts";

import {
  normalizeCvSectionsWithMetadata,
  normalizeSectionId,
} from "../../lib/cvDocument.ts";

import type {
  JobContext,
  SectionSignals,
  StructuredCvDocument,
} from "./cvSchemas";
import type { SectionStrategy } from "./sectionStrategy";

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function uniqueWarnings(warnings: Array<string | null | undefined>) {
  return [...new Set(warnings.filter((warning): warning is string => Boolean(warning)))];
}

function textIncludesAny(text: string, patterns: string[]) {
  return patterns.some((pattern) => text.includes(pattern));
}

function isTechnicalArchetype(value: string | null | undefined) {
  const normalized = normalizeText(value ?? "");
  return textIncludesAny(normalized, [
    "ai",
    "ml",
    "machine learning",
    "data",
    "software",
    "technical",
    "engineering",
    "developer",
  ]);
}

function isRegulatedOrCredentialHeavy(jobContext: JobContext | null, rawJobText: string) {
  const source = normalizeText(
    [
      rawJobText,
      jobContext?.roleFamily ?? "",
      ...(jobContext?.mustHaveRequirements ?? []),
      ...(jobContext?.proofNeeds ?? []),
    ].join(" ")
  );

  return textIncludesAny(source, [
    "license",
    "licence",
    "registration",
    "registered",
    "certification required",
    "must hold",
    "admission",
    "bar",
    "board certified",
    "teacher registration",
    "nursing registration",
    "ticket",
    "clearance",
  ]);
}

function hasStrongProjectOrProofSection(cv: StructuredCv) {
  if (cv.projects.length > 0) return true;
  return cv.sections.some((section) =>
    /selected|highlight|achievement|portfolio|campaign|systems|work/i.test(
      `${section.id} ${section.label}`
    )
  );
}

function findSelectedSectionIds(cv: StructuredCv | StructuredCvDocument) {
  return cv.sections
    .filter((section) =>
      /selected|highlight|achievement|portfolio|campaign|systems|work/i.test(
        `${section.id} ${section.label}`
      )
    )
    .map((section) => section.id);
}

function sectionOrderKeys(cv: StructuredCv | StructuredCvDocument) {
  return cv.sectionOrder.map((section) => normalizeText(section));
}

function sectionIndex(sectionOrder: string[], target: string) {
  const normalized = normalizeText(target);
  return sectionOrder.findIndex((value) => normalizeText(value) === normalized);
}

function dynamicSectionExists(cv: StructuredCv | StructuredCvDocument, entry: string) {
  const normalizedEntry = normalizeText(entry);
  return cv.sections.some(
    (section) =>
      normalizeText(section.id) === normalizedEntry ||
      normalizeText(section.label) === normalizedEntry
  );
}

function hasContentForSectionEntry(cv: StructuredCv | StructuredCvDocument, entry: string) {
  const canonicalId = normalizeSectionId(entry);
  if (canonicalId === "summary") return cv.summary.trim().length > 0;
  if (canonicalId === "skills") return cv.skills.groups.some((group) => group.skills.length > 0);
  if (canonicalId === "experience") return cv.experience.length > 0;
  if (canonicalId === "projects") return cv.projects.length > 0;
  if (canonicalId === "education") return cv.education.length > 0;
  if (canonicalId === "certifications") return cv.certifications.length > 0;
  return dynamicSectionExists(cv, entry);
}

function normalizedStrategyOrder(args: {
  cv: StructuredCv | StructuredCvDocument;
  sectionStrategy: SectionStrategy;
}) {
  return args.sectionStrategy.recommendedSectionOrder.filter((entry) =>
    hasContentForSectionEntry(args.cv, entry)
  );
}

function normalizedComposerOrder(cv: StructuredCv | StructuredCvDocument) {
  return cv.sectionOrder.map((entry) => normalizeSectionId(entry) ?? entry).filter(Boolean);
}

function hasFounderFraming(cv: StructuredCv) {
  const source = normalizeText(
    [
      cv.header.targetTitle ?? "",
      cv.summary,
      ...cv.experience.flatMap((item) => [item.role ?? "", item.company ?? ""]),
      ...cv.projects.map((item) => item.descriptor ?? ""),
    ].join(" ")
  );

  return textIncludesAny(source, [
    "founder",
    "ceo",
    "entrepreneur",
    "startup founder",
    "builder",
  ]);
}

function jobRewardsFounderFraming(rawJobText: string, jobContext: JobContext | null) {
  const source = normalizeText(
    [
      rawJobText,
      jobContext?.roleSummary ?? "",
      ...(jobContext?.keywords ?? []),
      ...(jobContext?.mustHaveRequirements ?? []),
    ].join(" ")
  );

  return textIncludesAny(source, [
    "founder",
    "startup",
    "0 to 1",
    "zero to one",
    "operator",
    "entrepreneurial",
  ]);
}

function overlappingSelectedAndProjectProof(cv: StructuredCv) {
  const projectBullets = new Set(
    cv.projects.flatMap((project) => project.bullets.map((bullet) => normalizeText(bullet.text)))
  );
  const selectedBullets = cv.sections
    .filter((section) =>
      /selected|highlight|achievement|portfolio|campaign|systems|work/i.test(
        `${section.id} ${section.label}`
      )
    )
    .flatMap((section) =>
      section.items
        .map((item) =>
          typeof item === "object" && item && "text" in item && typeof item.text === "string"
            ? normalizeText(item.text)
            : ""
        )
        .filter(Boolean)
    );

  if (projectBullets.size === 0 || selectedBullets.length === 0) return false;
  return selectedBullets.some((bullet) => projectBullets.has(bullet));
}

function moveSection(sectionOrder: string[], sectionId: string, nextIndex: number) {
  const currentIndex = sectionOrder.findIndex(
    (value) => normalizeText(value) === normalizeText(sectionId)
  );
  if (currentIndex < 0) return sectionOrder;
  const next = [...sectionOrder];
  const [removed] = next.splice(currentIndex, 1);
  if (!removed) return sectionOrder;
  const boundedIndex = Math.max(0, Math.min(next.length, nextIndex));
  next.splice(boundedIndex, 0, removed);
  return next;
}

function ensureEducationThenCertifications(sectionOrder: string[]) {
  const educationIndex = sectionIndex(sectionOrder, "education");
  const certificationsIndex = sectionIndex(sectionOrder, "certifications");
  if (educationIndex < 0 || certificationsIndex < 0) return sectionOrder;

  const withoutCert = sectionOrder.filter(
    (section) => normalizeText(section) !== "certifications"
  );
  const nextEducationIndex = sectionIndex(withoutCert, "education");
  withoutCert.splice(nextEducationIndex + 1, 0, "certifications");
  return withoutCert;
}

export function repairCvForSectionStrategy(args: {
  cv: StructuredCvDocument;
  sectionStrategy: SectionStrategy;
}) {
  const selectedIds = findSelectedSectionIds(args.cv);
  const warnings: string[] = [];
  const recommendedOrder = normalizedStrategyOrder(args);
  const composerOrder = normalizedComposerOrder(args.cv);
  let sectionOrder = [...recommendedOrder];

  if (
    composerOrder.map(normalizeText).join("|") !==
    recommendedOrder.map(normalizeText).join("|")
  ) {
    warnings.push("composer_section_order_differs_from_strategy");
  }

  if (
    args.cv.projects.length > 0 &&
    !args.sectionStrategy.recommendedSectionOrder.some(
      (entry) => normalizeSectionId(entry) === "projects"
    )
  ) {
    warnings.push("unsupported_projects_section_present");
  }

  if (args.sectionStrategy.proofFirstRecommended && selectedIds.length > 0) {
    const selectedId = selectedIds[0];
    if (!selectedId) {
      return {
        cv: {
          ...args.cv,
          sectionOrder,
        },
        repairedWarnings: warnings,
      };
    }
    const selectedIndex = sectionOrder.findIndex(
      (section) => normalizeText(section) === normalizeText(selectedId)
    );
    const skillsIndex = sectionIndex(sectionOrder, "skills");
    const educationIndex = sectionIndex(sectionOrder, "education");
    const certificationsIndex = sectionIndex(sectionOrder, "certifications");
    const tooLate =
      selectedIndex > 1 &&
      ((skillsIndex >= 0 && selectedIndex > skillsIndex) ||
        (educationIndex >= 0 && selectedIndex > educationIndex) ||
        (certificationsIndex >= 0 && selectedIndex > certificationsIndex));
    if (tooLate) {
      sectionOrder = moveSection(sectionOrder, selectedId, 1);
      warnings.push("selected_or_highlights_section_moved_near_top");
    }
  }

  if (args.sectionStrategy.combineEducationAndCertifications) {
    const nextOrder = ensureEducationThenCertifications(sectionOrder);
    if (nextOrder.join("|") !== sectionOrder.join("|")) {
      sectionOrder = nextOrder;
      warnings.push("education_and_certifications_kept_adjacent");
    }
  }

  return {
    cv: {
      ...args.cv,
      sectionOrder,
    },
    repairedWarnings: warnings,
  };
}

export function collectCvQualityWarnings(args: {
  rawJobText: string;
  jobContext: JobContext | null;
  sectionSignals?: SectionSignals;
  sectionStrategy?: SectionStrategy;
  cv: StructuredCv;
  layoutWarnings?: string[];
}) {
  const { rawJobText, cv } = args;
  const inferredProofFirstExpected =
    isTechnicalArchetype(cv.roleArchetype ?? args.jobContext?.roleFamily ?? null) &&
    !isRegulatedOrCredentialHeavy(args.jobContext, rawJobText) &&
    hasStrongProjectOrProofSection(cv) &&
    args.sectionSignals?.strongestProofType === "projects";
  const proofFirstExpected =
    args.sectionStrategy?.proofFirstRecommended ?? inferredProofFirstExpected;
  const normalizedSections = normalizeCvSectionsWithMetadata(cv);
  const strategyOrder = args.sectionStrategy
    ? normalizedStrategyOrder({ cv, sectionStrategy: args.sectionStrategy })
    : [];
  const orderKeys = normalizedSections.sections.map((section) => normalizeText(section.id));
  const selectedIndex = orderKeys.findIndex((key) =>
    /selected|highlight|achievement|portfolio|campaign results|selected work|systems/.test(key)
  );
  const educationIndex = orderKeys.findIndex((key) => key === "education");
  const certificationsIndex = orderKeys.findIndex((key) => key === "certifications");
  const hasSelectedSection = selectedIndex >= 0;

  return uniqueWarnings([
    args.sectionStrategy &&
    normalizedComposerOrder(cv).map(normalizeText).join("|") !==
      strategyOrder.map(normalizeText).join("|")
      ? "section_order_differs_from_strategy"
      : null,
    proofFirstExpected && orderKeys[1] === "skills"
      ? "section_order_starts_with_skills_after_summary_when_proof_first_expected"
      : null,
    hasSelectedSection &&
    (selectedIndex > 2 ||
      (educationIndex >= 0 && selectedIndex > educationIndex) ||
      (certificationsIndex >= 0 && selectedIndex > certificationsIndex))
      ? "selected_or_highlights_section_too_late"
      : null,
    cv.projects.length > 0 && hasSelectedSection && overlappingSelectedAndProjectProof(cv)
      ? "duplicate_projects_and_selected_achievements_possible"
      : null,
    hasFounderFraming(cv) && !jobRewardsFounderFraming(rawJobText, args.jobContext)
      ? "founder_framing_risk_for_employee_application"
      : null,
    normalizedSections.warnings.includes("nonempty_section_missing_from_section_order")
      ? "nonempty_section_missing_from_section_order"
      : null,
    normalizedSections.warnings.includes("appended_unordered_section")
      ? "appended_unordered_section"
      : null,
    proofFirstExpected &&
    ((educationIndex >= 0 && hasSelectedSection && educationIndex < selectedIndex) ||
      (certificationsIndex >= 0 && hasSelectedSection && certificationsIndex < selectedIndex))
      ? "education_or_certifications_above_stronger_technical_proof_when_not_threshold"
      : null,
    args.sectionStrategy &&
    cv.projects.length > 0 &&
    !args.sectionStrategy.recommendedSectionOrder.some(
      (entry) => normalizeSectionId(entry) === "projects"
    )
      ? "unsupported_projects_section_present"
      : null,
    ...(args.layoutWarnings ?? []),
  ]);
}
