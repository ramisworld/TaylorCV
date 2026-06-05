import "server-only";

import {
  claimText,
  isRecord,
  normalizeCvSectionsWithMetadata,
  parseStructuredCv,
  textOrNull,
  type StructuredCv,
} from "~/lib/cvDocument";
import { buildCvRenderModel } from "~/lib/cvRenderModel";
import { asNonEmptyStringArray } from "~/lib/adminFormat";

function arrayValue(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function objectValue(value: unknown) {
  return isRecord(value) ? value : null;
}

function sectionOrderFrom(value: unknown) {
  if (!isRecord(value)) return [];
  return asNonEmptyStringArray(value.sectionOrder);
}

function normalizeKey(value: string) {
  return value.trim().toLowerCase();
}

function uniqueStrings(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function collectBulletEntries(cv: StructuredCv) {
  const entries: Array<{ location: string; text: string; gapAnswerIds: string[] }> = [];

  for (const item of cv.experience) {
    const label = [item.role, item.company].filter(Boolean).join(" @ ") || "Experience";
    for (const bullet of item.bullets) {
      entries.push({
        location: `Experience / ${label}`,
        text: claimText(bullet),
        gapAnswerIds: bullet.gapAnswerIds,
      });
    }
  }

  for (const item of cv.projects) {
    const label = [item.name, item.descriptor].filter(Boolean).join(" - ") || "Project";
    for (const bullet of item.bullets) {
      entries.push({
        location: `Projects / ${label}`,
        text: claimText(bullet),
        gapAnswerIds: bullet.gapAnswerIds,
      });
    }
  }

  for (const section of cv.sections) {
    const sectionItems = arrayValue(section.items);
    for (const item of sectionItems) {
      if (!isRecord(item)) continue;
      const text = textOrNull(item.text) ?? textOrNull(item.content);
      if (!text) continue;
      entries.push({
        location: `Dynamic / ${section.label}`,
        text,
        gapAnswerIds: asNonEmptyStringArray(item.gapAnswerIds),
      });
    }
  }

  return entries;
}

function duplicateValues(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    const normalized = normalizeKey(value);
    if (seen.has(normalized)) duplicates.add(value);
    seen.add(normalized);
  }

  return [...duplicates];
}

function countEmDashes(cv: StructuredCv) {
  const sectionsText = cv.sections
    .flatMap((section) => arrayValue(section.items))
    .map((item) =>
      isRecord(item) ? textOrNull(item.text) ?? textOrNull(item.content) ?? "" : ""
    )
    .join("\n");
  const content = [
    cv.header.name ?? "",
    cv.header.targetTitle ?? "",
    cv.summary,
    ...cv.experience.flatMap((item) => [
      item.role ?? "",
      item.company ?? "",
      ...item.bullets.map(claimText),
    ]),
    ...cv.projects.flatMap((item) => [
      item.name ?? "",
      item.descriptor ?? "",
      ...item.bullets.map(claimText),
    ]),
    ...cv.education.flatMap((item) => [
      item.institution ?? "",
      item.degree ?? "",
      ...item.details,
    ]),
    ...cv.certifications,
    sectionsText,
  ].join("\n");

  return (content.match(/—/g) ?? []).length;
}

function emptyOrWeakSections(cv: StructuredCv) {
  const warnings: string[] = [];
  const normalized = normalizeCvSectionsWithMetadata(cv);
  const renderedIds = new Set(normalized.sections.map((section) => normalizeKey(section.id)));
  const requestedIds = uniqueStrings(cv.sectionOrder.map(normalizeKey));

  if (cv.summary.trim().length < 90) warnings.push("Summary is unusually short.");
  if (cv.skills.groups.reduce((total, group) => total + group.skills.length, 0) < 3) {
    warnings.push("Skills section is thin.");
  }

  for (const requestedId of requestedIds) {
    if (!renderedIds.has(requestedId)) {
      warnings.push(`Section in sectionOrder is empty or missing from render output: ${requestedId}`);
    }
  }

  return warnings;
}

function sectionOrderWarnings(entries: Array<{ label: string; sections: string[] }>) {
  const comparable = entries.filter((entry) => entry.sections.length > 0);
  const warnings: string[] = [];

  for (let index = 1; index < comparable.length; index += 1) {
    const previous = comparable[index - 1];
    const current = comparable[index];
    if (!previous || !current) continue;
    if (previous.sections.map(normalizeKey).join("|") !== current.sections.map(normalizeKey).join("|")) {
      warnings.push(`${previous.label} differs from ${current.label}.`);
    }
  }

  return warnings;
}

export function getBuilderOutputRecord(value: unknown) {
  return objectValue(value);
}

export function buildSectionOrderDebug(args: {
  cvJson: unknown;
  builderOutputJson?: unknown;
  presentationJson?: unknown;
}) {
  const builderOutput = getBuilderOutputRecord(args.builderOutputJson);
  const rawComposerOutput = objectValue(builderOutput?.composerOutput);
  const topLevelBlueprint = objectValue(builderOutput?.blueprint);
  const rawBlueprint = objectValue(rawComposerOutput?.blueprint) ?? topLevelBlueprint;
  const rawComposerCv = objectValue(rawComposerOutput?.cv);
  const storedSectionStrategy = objectValue(builderOutput?.sectionStrategy);
  const parsedCv = parseStructuredCv(args.cvJson);
  const renderModel = parsedCv
    ? buildCvRenderModel(parsedCv, args.presentationJson)
    : null;
  const renderedOrder =
    renderModel?.metrics.renderedSectionIds ??
    asNonEmptyStringArray(objectValue(builderOutput?.renderMetrics)?.renderedSectionIds);

  const comparedOrders = [
    {
      label: "sectionStrategy.recommendedSectionOrder",
      sections: asNonEmptyStringArray(storedSectionStrategy?.recommendedSectionOrder),
    },
    {
      label: "composer blueprint.sectionOrder",
      sections: sectionOrderFrom(rawBlueprint),
    },
    {
      label: "composer cv.sectionOrder",
      sections: sectionOrderFrom(rawComposerCv),
    },
    {
      label: "parsed structured cv.sectionOrder",
      sections: parsedCv?.sectionOrder ?? [],
    },
    {
      label: "rendered / actual order",
      sections: renderedOrder,
    },
  ];

  return {
    parsedCv,
    renderModel,
    comparedOrders,
    warnings: sectionOrderWarnings(comparedOrders),
  };
}

export function buildCvDebugSnapshot(args: {
  cvJson: unknown;
  builderOutputJson?: unknown;
  presentationJson?: unknown;
  gapAnswerIds?: string[];
}) {
  const orderDebug = buildSectionOrderDebug(args);
  const cv = orderDebug.parsedCv;

  if (!cv) {
    return {
      parsedCv: null,
      orderDebug,
      duplicateSectionIds: [],
      missingExpectedSections: [],
      bulletsWithTooManyCommas: [],
      emDashCount: 0,
      emptyOrWeakSections: ["Stored CV JSON does not parse with parseStructuredCv()."],
      unusedGapAnswerIds: args.gapAnswerIds ?? [],
      qualityWarnings: [],
    };
  }

  const renderModel = orderDebug.renderModel ?? buildCvRenderModel(cv, args.presentationJson);
  const normalizedSections = normalizeCvSectionsWithMetadata(cv);
  const expectedIds = normalizedSections.sections.map((section) => section.id);
  const renderedIds = renderModel.metrics.renderedSectionIds;
  const requestedIds = cv.sectionOrder;
  const missingExpectedSections = expectedIds.filter(
    (id) => !requestedIds.some((value) => normalizeKey(value) === normalizeKey(id)) || !renderedIds.some((value) => normalizeKey(value) === normalizeKey(id))
  );

  const bulletEntries = collectBulletEntries(cv);
  const bulletsWithTooManyCommas = bulletEntries
    .filter((entry) => (entry.text.match(/,/g) ?? []).length >= 4)
    .map((entry) => ({
      location: entry.location,
      commaCount: (entry.text.match(/,/g) ?? []).length,
      text: entry.text,
    }));

  const usedGapAnswerIds = uniqueStrings(
    bulletEntries.flatMap((entry) => entry.gapAnswerIds).filter(Boolean)
  );
  const unusedGapAnswerIds = uniqueStrings(args.gapAnswerIds ?? []).filter(
    (id) => !usedGapAnswerIds.includes(id)
  );
  const builderOutput = getBuilderOutputRecord(args.builderOutputJson);
  const qualityWarnings = asNonEmptyStringArray(builderOutput?.qualityWarnings);

  return {
    parsedCv: cv,
    orderDebug,
    duplicateSectionIds: uniqueStrings([
      ...duplicateValues(requestedIds),
      ...duplicateValues(renderedIds),
    ]),
    missingExpectedSections: uniqueStrings(missingExpectedSections),
    bulletsWithTooManyCommas,
    emDashCount: countEmDashes(cv),
    emptyOrWeakSections: emptyOrWeakSections(cv),
    unusedGapAnswerIds,
    qualityWarnings,
  };
}
