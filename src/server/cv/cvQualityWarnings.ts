import {
  normalizeCvSectionsWithMetadata,
  type StructuredCv,
} from "../../lib/cvDocument.ts";

import type { CandidateContext, JobContext } from "./cvSchemas";

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
  const corpus = normalizeText(
    [
      rawJobText,
      jobContext?.archetype ?? "",
      ...(jobContext?.mustHaveRequirements ?? []),
      ...(jobContext?.expectedProofTypes ?? []),
    ].join(" ")
  );

  return textIncludesAny(corpus, [
    "license",
    "licence",
    "registration",
    "registered",
    "certification required",
    "must hold",
    "admission",
    "bar",
    "board certified",
    "teaching certificate",
    "teacher registration",
    "nursing registration",
    "ticket",
    "work rights",
    "visa",
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

function sectionOrderKeys(cv: StructuredCv) {
  return cv.sectionOrder.map((section) => normalizeText(section));
}

function findSectionIndex(keys: string[], patterns: RegExp) {
  return keys.findIndex((key) => patterns.test(key));
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
    "operator founder",
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
    "builder founder",
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

export function collectCvQualityWarnings(args: {
  rawJobText: string;
  jobContext: JobContext | null;
  candidateContext: CandidateContext;
  cv: StructuredCv;
}) {
  const { rawJobText, jobContext, candidateContext, cv } = args;
  const normalizedSections = normalizeCvSectionsWithMetadata(cv);
  const orderKeys = normalizedSections.sections.map((section) => normalizeText(section.id));
  const originalOrderKeys = sectionOrderKeys(cv);
  const isTechnical = isTechnicalArchetype(cv.roleArchetype ?? jobContext?.archetype ?? null);
  const proofFirstExpected =
    isTechnical &&
    !isRegulatedOrCredentialHeavy(jobContext, rawJobText) &&
    hasStrongProjectOrProofSection(cv) &&
    (candidateContext.projects.length > 0 ||
      candidateContext.notableEvidence.some((item) =>
        /project|system|deployment|evaluation|benchmark|latency|reliability|cost/i.test(item)
      ));

  const firstNonSummaryIndex = orderKeys.findIndex((key) => key !== "summary");
  const selectedIndex = findSectionIndex(
    orderKeys,
    /selected|highlight|achievement|portfolio|campaign results|selected work|systems/
  );
  const educationIndex = orderKeys.findIndex((key) => key === "education");
  const certificationsIndex = orderKeys.findIndex((key) => key === "certifications");
  const projectsIndex = orderKeys.findIndex((key) => key === "projects");
  const hasSelectedSection = selectedIndex >= 0;

  return uniqueWarnings([
    proofFirstExpected && orderKeys[firstNonSummaryIndex] === "skills"
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
    hasSelectedSection && !originalOrderKeys.some((key) => /selected|highlight|achievement|portfolio|campaign/.test(key))
      ? "selected_or_highlights_section_too_late"
      : null,
    proofFirstExpected &&
    ((educationIndex >= 0 && projectsIndex >= 0 && educationIndex < projectsIndex) ||
      (certificationsIndex >= 0 && projectsIndex >= 0 && certificationsIndex < projectsIndex) ||
      (educationIndex >= 0 && hasSelectedSection && educationIndex < selectedIndex) ||
      (certificationsIndex >= 0 && hasSelectedSection && certificationsIndex < selectedIndex))
      ? "education_or_certifications_above_stronger_technical_proof_when_not_threshold"
      : null,
  ]);
}
