import type { StructuredCv } from "../../lib/cvDocument.ts";

import { normalizeCvSectionsWithMetadata } from "../../lib/cvDocument.ts";

import type {
  CandidateContext,
  CvBlueprint,
  JobContext,
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
      jobContext?.archetype ?? "",
      ...(jobContext?.mustHaveRequirements ?? []),
      ...(jobContext?.expectedProofTypes ?? []),
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
      ...(jobContext?.recruiterPriorities ?? []),
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
  let sectionOrder = [...args.cv.sectionOrder];

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
  candidateContext: CandidateContext;
  sectionStrategy?: SectionStrategy;
  blueprint?: CvBlueprint;
  cv: StructuredCv;
  layoutWarnings?: string[];
}) {
  const { rawJobText, jobContext, cv } = args;
  const inferredProofFirstExpected =
    isTechnicalArchetype(cv.roleArchetype ?? jobContext?.archetype ?? null) &&
    !isRegulatedOrCredentialHeavy(jobContext, rawJobText) &&
    hasStrongProjectOrProofSection(cv) &&
    (args.candidateContext.projects.length > 0 ||
      args.candidateContext.notableEvidence.some((item) =>
        /project|system|deployment|evaluation|benchmark|latency|reliability|cost/i.test(item)
      ));
  const proofFirstExpected =
    args.sectionStrategy?.proofFirstRecommended ?? inferredProofFirstExpected;
  const normalizedSections = normalizeCvSectionsWithMetadata(cv);
  const orderKeys = normalizedSections.sections.map((section) => normalizeText(section.id));
  const selectedIndex = orderKeys.findIndex((key) =>
    /selected|highlight|achievement|portfolio|campaign results|selected work|systems/.test(key)
  );
  const educationIndex = orderKeys.findIndex((key) => key === "education");
  const certificationsIndex = orderKeys.findIndex((key) => key === "certifications");
  const hasSelectedSection = selectedIndex >= 0;

  return uniqueWarnings([
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
    hasFounderFraming(cv) && !jobRewardsFounderFraming(rawJobText, jobContext)
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
    args.blueprint &&
    normalizeText(args.blueprint.sectionOrder[0] ?? "") !== "summary"
      ? "blueprint_section_order_invalid"
      : null,
    ...(args.layoutWarnings ?? []),
  ]);
}
