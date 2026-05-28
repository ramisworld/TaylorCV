import {
  claimText,
  normalizeCvSections,
  type CvBulletClaim,
  type CvSectionId,
  type NormalizedCvSection,
  type StructuredCv,
} from "./cvDocument";
import {
  normalizeCvPresentation,
  presentationToRendererTokens,
  type PresentationSectionId,
  type RendererTokens,
} from "./cvPresentation";

export type CvRendererLayoutMetrics = {
  pageWidth: number;
  pageHeight: number;
  usedHeight: number;
  remainingHeight: number;
  remainingHeightPercent: number;
  sectionCount: number;
  bulletCount: number;
  fontScale: number;
  spacingScale: number;
  densityMode: string;
  omittedItemCount: number;
  presentationJsonUsed: boolean;
  pageAspectRatio: number;
  renderedSectionCount: number;
  renderedSectionIds: string[];
  bulletsRenderedBySection: Record<string, number>;
  omittedOverflowItemCounts: Record<string, number>;
  density: RendererTokens["density"];
  templateId: RendererTokens["templateId"];
  headerLayout: RendererTokens["headerLayout"];
};

export type CvRenderModel = {
  tokens: RendererTokens;
  sections: NormalizedCvSection[];
  metrics: CvRendererLayoutMetrics;
};

const a4AspectRatio = 210 / 297;
const pageWidth = 794;
const pageHeight = 1123;
const underfilledThresholdPercent = 16;
const maxExperienceBullets = 4;
const maxSupportingExperienceBullets = 2;
const maxHeroProjectBullets = 3;
const maxProjectBullets = 2;
const maxBulletSectionItems = 6;
const maxCertificationItems = 6;
const maxSkillGroups = 4;
const maxSkillsPerGroup = 6;
const maxSummaryParagraphs = 1;
const restoredUnderfillBulletBudget = 2;

function hasPresentationInput(value: unknown) {
  return Boolean(value && typeof value === "object");
}

function countBullets(section: NormalizedCvSection) {
  if (section.type === "bullets" || section.type === "certifications") {
    return section.bullets.length;
  }
  if (section.type === "experience" || section.type === "projects") {
    return section.items.reduce((total, item) => total + item.bullets.length, 0);
  }
  return 0;
}

function countRenderedBullets(sections: NormalizedCvSection[]) {
  return sections.reduce((total, section) => total + countBullets(section), 0);
}

function totalOmitted(omitted: Record<string, number>) {
  return Object.values(omitted).reduce((total, count) => total + count, 0);
}

function limitBullets(
  bullets: CvBulletClaim[],
  max: number,
  omitted: Record<string, number>,
  key: string,
  restoreBudget: { remaining: number }
) {
  if (bullets.length <= max) return bullets;
  const restored = Math.min(restoreBudget.remaining, bullets.length - max);
  restoreBudget.remaining -= restored;
  const limit = max + restored;
  omitted[key] = (omitted[key] ?? 0) + bullets.length - limit;
  return bullets.slice(0, limit);
}

function compactSection(
  section: NormalizedCvSection,
  omitted: Record<string, number>,
  restoreBudget: { remaining: number }
): NormalizedCvSection {
  if (section.type === "summary" || section.type === "inline") {
    if (section.paragraphs.length <= maxSummaryParagraphs) return section;
    const restored = Math.min(
      restoreBudget.remaining,
      section.paragraphs.length - maxSummaryParagraphs
    );
    restoreBudget.remaining -= restored;
    const limit = maxSummaryParagraphs + restored;
    omitted[section.id] = (omitted[section.id] ?? 0) + section.paragraphs.length - limit;
    return {
      ...section,
      paragraphs: section.paragraphs.slice(0, limit),
    };
  }

  if (section.type === "certifications") {
    return {
      ...section,
      bullets: limitBullets(
        section.bullets,
        maxCertificationItems,
        omitted,
        section.id,
        restoreBudget
      ),
    };
  }

  if (section.type === "bullets") {
    return {
      ...section,
      bullets: limitBullets(
        section.bullets,
        maxBulletSectionItems,
        omitted,
        section.id,
        restoreBudget
      ),
    };
  }

  if (section.type === "experience") {
    return {
      ...section,
      items: section.items.map((item, index) => ({
        ...item,
        bullets: limitBullets(
          item.bullets,
          index === 0 ? maxExperienceBullets : maxSupportingExperienceBullets,
          omitted,
          `${section.id}.${index}`,
          restoreBudget
        ),
      })),
    };
  }

  if (section.type === "projects") {
    return {
      ...section,
      items: section.items.map((item, index) => ({
        ...item,
        bullets: limitBullets(
          item.bullets,
          index === 0 ? maxHeroProjectBullets : maxProjectBullets,
          omitted,
          `${section.id}.${index}`,
          restoreBudget
        ),
      })),
    };
  }

  if (section.type === "skills") {
    const groups = section.groups.slice(0, maxSkillGroups).map((group, index) => {
      if (group.skills.length > maxSkillsPerGroup) {
        omitted[`${section.id}.${index}`] = (omitted[`${section.id}.${index}`] ?? 0) +
          group.skills.length - maxSkillsPerGroup;
      }
      return {
        ...group,
        skills: group.skills.slice(0, maxSkillsPerGroup),
      };
    });
    if (section.groups.length > groups.length) {
      omitted[section.id] = (omitted[section.id] ?? 0) + section.groups.length - groups.length;
    }
    return {
      ...section,
      groups,
    };
  }

  return section;
}

function compactSections(
  sections: NormalizedCvSection[],
  restoreBudgetCount = 0
) {
  const omittedOverflowItemCounts: Record<string, number> = {};
  const restoreBudget = { remaining: restoreBudgetCount };
  return {
    sections: sections.map((section) =>
      compactSection(section, omittedOverflowItemCounts, restoreBudget)
    ),
    omittedOverflowItemCounts,
  };
}

function uniqueDetails(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeSingleCertificationIntoEducation(
  sections: NormalizedCvSection[]
): NormalizedCvSection[] {
  const certificationSection = sections.find((section) => section.type === "certifications");
  const educationSection = sections.find((section) => section.type === "education");
  if (
    !certificationSection ||
    certificationSection.type !== "certifications" ||
    !educationSection ||
    educationSection.type !== "education"
  ) {
    return sections;
  }
  if (certificationSection.bullets.length !== 1 || certificationSection.priority === "primary") {
    return sections;
  }
  const credentialText = claimText(certificationSection.bullets[0]!);
  if (!credentialText) return sections;
  return sections
    .map((section) => {
      if (section !== educationSection || section.type !== "education") return section;
      const items = section.items.length
        ? section.items.map((item, itemIndex) =>
            itemIndex === 0
              ? {
                  ...item,
                  details: uniqueDetails([...item.details, `Credential: ${credentialText}`]),
                }
              : item
          )
        : [{
            institution: null,
            degree: "Credential",
            dates: null,
            details: [credentialText],
          }];
      return {
        ...section,
        label: /credential/i.test(section.label) ? section.label : "Education & Credentials",
        items,
      };
    })
    .filter((section) => section !== certificationSection);
}

function scaleTokens(
  tokens: RendererTokens,
  options: {
    fontScale: number;
    spacingScale: number;
    credentialSpacingScale?: number;
  }
): RendererTokens {
  const fontScale = options.fontScale;
  const spacingScale = options.spacingScale;
  const credentialSpacingScale = options.credentialSpacingScale ?? 1;

  return {
    ...tokens,
    nameSize: Number(Math.min(tokens.nameSize * fontScale, tokens.nameSize + 6).toFixed(2)),
    subtitleSize: Number(Math.min(tokens.subtitleSize * fontScale, tokens.subtitleSize + 3).toFixed(2)),
    bodySize: Number(Math.min(tokens.bodySize * fontScale, tokens.bodySize + 2.8).toFixed(2)),
    headingSize: Number(Math.min(tokens.headingSize * fontScale, tokens.headingSize + 4).toFixed(2)),
    lineHeight: Number(Math.min(tokens.lineHeight + (spacingScale - 1) * 0.22, 1.76).toFixed(3)),
    sectionGap: Number(Math.min(tokens.sectionGap * spacingScale, tokens.sectionGap + 48).toFixed(2)),
    itemGap: Number(
      Math.min(tokens.itemGap * spacingScale * credentialSpacingScale, tokens.itemGap + 14).toFixed(2)
    ),
    bulletGap: Number(Math.min(tokens.bulletGap * spacingScale, tokens.bulletGap + 3).toFixed(2)),
  };
}

function pagePadding(tokens: RendererTokens) {
  return {
    vertical: tokens.pagePadding * 2,
    horizontal: tokens.pagePadding * 2,
  };
}

function estimateLines(text: string, tokens: RendererTokens, width: number) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return 0;
  const averageCharacterWidth = tokens.bodySize * 0.48;
  const charactersPerLine = Math.max(28, Math.floor(width / averageCharacterWidth));
  return Math.max(1, Math.ceil(normalized.length / charactersPerLine));
}

function estimateParagraphHeight(text: string, tokens: RendererTokens, width: number) {
  return estimateLines(text, tokens, width) * tokens.bodySize * tokens.lineHeight;
}

function estimateBulletHeight(text: string, tokens: RendererTokens, width: number) {
  return estimateParagraphHeight(text, tokens, Math.max(160, width - 24)) + tokens.bulletGap;
}

function estimateSectionHeight(section: NormalizedCvSection, tokens: RendererTokens, contentWidth: number) {
  const headingHeight = tokens.headingSize + 6 + 8;

  if (section.type === "summary" || section.type === "inline") {
    return (
      headingHeight +
      section.paragraphs.reduce(
        (total, paragraph) => total + estimateParagraphHeight(paragraph, tokens, contentWidth) + 4,
        0
      )
    );
  }

  if (section.type === "bullets") {
    return (
      headingHeight +
      section.bullets.reduce(
        (total, bullet) => total + estimateBulletHeight(claimText(bullet), tokens, contentWidth),
        0
      )
    );
  }

  if (section.type === "certifications") {
    const rowCount = Math.min(section.bullets.length, maxCertificationItems);
    return (
      headingHeight +
      6 +
      estimateParagraphHeight(
        section.bullets.slice(0, rowCount).map(claimText).join(" · "),
        tokens,
        contentWidth
      )
    );
  }

  if (section.type === "experience") {
    return (
      headingHeight +
      section.items.reduce(
        (total, item) =>
          total +
          tokens.itemGap +
          tokens.bodySize * 1.35 +
          item.bullets.reduce(
            (bulletTotal, bullet) =>
              bulletTotal + estimateBulletHeight(claimText(bullet), tokens, contentWidth),
            0
          ),
        0
      )
    );
  }

  if (section.type === "projects") {
    return (
      headingHeight +
      section.items.reduce(
        (total, item) =>
          total +
          tokens.itemGap +
          tokens.bodySize * 1.35 +
          item.bullets.reduce(
            (bulletTotal, bullet) =>
              bulletTotal + estimateBulletHeight(claimText(bullet), tokens, contentWidth),
            0
          ),
        0
      )
    );
  }

  if (section.type === "skills") {
    const groupTextHeight = section.groups.reduce((total, group) => {
      const text = `${group.group}: ${group.skills.join(", ")}`;
      return total + estimateParagraphHeight(text, tokens, contentWidth) + 4;
    }, 0);
    return headingHeight + groupTextHeight;
  }

  if (section.type !== "education") return headingHeight;

  return (
    headingHeight +
    section.items.reduce((total, item) => {
      const titleHeight = item.institution || item.degree || item.dates ? tokens.bodySize * 1.35 : 0;
      const detailsHeight = item.details.length
        ? estimateParagraphHeight(item.details.join(", "), tokens, contentWidth)
        : 0;
      return total + tokens.itemGap + titleHeight + detailsHeight;
    }, 0)
  );
}

function estimateHeaderHeight(cv: StructuredCv, tokens: RendererTokens, contentWidth: number) {
  let height = 0;
  if (cv.header.name) height += tokens.nameSize * 1.03;
  if (cv.header.targetTitle) height += 4 + (tokens.subtitleSize + 1) * 1.3;
  const contacts = [
    cv.header.location,
    cv.header.phone,
    cv.header.email,
    ...cv.header.links.map((link) => link.label || link.url),
  ].filter(Boolean);
  if (contacts.length > 0) {
    height += 8 + Math.ceil(contacts.join(" | ").length / Math.max(38, contentWidth / 6.4)) * 20;
  }
  return height > 0 ? height + 20 : 0;
}

function estimateUsedHeight(
  cv: StructuredCv,
  sections: NormalizedCvSection[],
  tokens: RendererTokens
) {
  const padding = pagePadding(tokens);
  const contentWidth = pageWidth - padding.horizontal;
  const headerHeight = estimateHeaderHeight(cv, tokens, contentWidth);
  const sectionHeights = sections.reduce(
    (total, section, index) =>
      total +
      estimateSectionHeight(section, tokens, contentWidth) +
      (index === sections.length - 1 ? 0 : tokens.sectionGap),
    0
  );
  return Math.round(padding.vertical + headerHeight + sectionHeights);
}

function buildMetrics(args: {
  cv: StructuredCv;
  sections: NormalizedCvSection[];
  tokens: RendererTokens;
  omittedOverflowItemCounts: Record<string, number>;
  presentationJsonUsed: boolean;
  densityMode: string;
  fontScale: number;
  spacingScale: number;
}): CvRendererLayoutMetrics {
  const usedHeight = estimateUsedHeight(args.cv, args.sections, args.tokens);
  const remainingHeight = Math.max(0, pageHeight - usedHeight);
  const bulletsRenderedBySection = Object.fromEntries(
    args.sections.map((section) => [section.id, countBullets(section)])
  );

  return {
    pageWidth,
    pageHeight,
    usedHeight,
    remainingHeight,
    remainingHeightPercent: Number(((remainingHeight / pageHeight) * 100).toFixed(1)),
    sectionCount: args.sections.length,
    bulletCount: countRenderedBullets(args.sections),
    fontScale: args.fontScale,
    spacingScale: args.spacingScale,
    densityMode: args.densityMode,
    omittedItemCount: totalOmitted(args.omittedOverflowItemCounts),
    presentationJsonUsed: args.presentationJsonUsed,
    pageAspectRatio: Number(a4AspectRatio.toFixed(4)),
    renderedSectionCount: args.sections.length,
    renderedSectionIds: args.sections.map((section) => section.id),
    bulletsRenderedBySection,
    omittedOverflowItemCounts: args.omittedOverflowItemCounts,
    density: args.tokens.density,
    templateId: args.tokens.templateId,
    headerLayout: args.tokens.headerLayout,
  };
}

export function buildCvRenderModel(
  cv: StructuredCv,
  presentationJson?: unknown
): CvRenderModel {
  const presentation = normalizeCvPresentation(presentationJson, cv);
  const baseTokens = presentationToRendererTokens(presentation);
  const allSections = mergeSingleCertificationIntoEducation(normalizeCvSections(cv));
  const presentationJsonUsed = hasPresentationInput(presentationJson);
  let tokenState = baseTokens;
  let fontScale = 1;
  let spacingScale = 1;
  let densityMode: string = baseTokens.density;
  let { sections, omittedOverflowItemCounts } = compactSections(allSections);
  let metrics = buildMetrics({
    cv,
    sections,
    tokens: tokenState,
    omittedOverflowItemCounts,
    presentationJsonUsed,
    densityMode,
    fontScale,
    spacingScale,
  });

  if (metrics.remainingHeightPercent > underfilledThresholdPercent) {
    spacingScale = 1.18;
    densityMode = `${baseTokens.density}_underfill_spacing`;
    tokenState = scaleTokens(baseTokens, { fontScale, spacingScale });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (metrics.remainingHeightPercent > underfilledThresholdPercent) {
    fontScale = 1.08;
    densityMode = `${baseTokens.density}_underfill_font`;
    tokenState = scaleTokens(baseTokens, { fontScale, spacingScale });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (
    metrics.remainingHeightPercent > underfilledThresholdPercent &&
    totalOmitted(omittedOverflowItemCounts) > 0
  ) {
    ({ sections, omittedOverflowItemCounts } = compactSections(
      allSections,
      restoredUnderfillBulletBudget
    ));
    densityMode = `${baseTokens.density}_underfill_restored_content`;
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (metrics.remainingHeightPercent > underfilledThresholdPercent) {
    spacingScale = Math.max(spacingScale, 1.28);
    fontScale = Math.max(fontScale, 1.1);
    densityMode = `${baseTokens.density}_underfill_supporting_spacing`;
    tokenState = scaleTokens(baseTokens, {
      fontScale,
      spacingScale,
      credentialSpacingScale: 1.12,
    });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (metrics.remainingHeightPercent > 28 && sections.length >= 4) {
    spacingScale = Math.max(spacingScale, 1.4);
    fontScale = Math.max(fontScale, 1.14);
    densityMode = `${baseTokens.density}_underfill_page_fill`;
    tokenState = scaleTokens(baseTokens, {
      fontScale,
      spacingScale,
      credentialSpacingScale: 1.18,
    });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (metrics.remainingHeightPercent > 36 && sections.length >= 3) {
    spacingScale = Math.max(spacingScale, 1.52);
    fontScale = Math.max(fontScale, 1.18);
    densityMode = `${baseTokens.density}_underfill_large_readable`;
    tokenState = scaleTokens(baseTokens, {
      fontScale,
      spacingScale,
      credentialSpacingScale: 1.22,
    });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (
    countRenderedBullets(sections) <= 8 &&
    sections.length <= 7 &&
    metrics.remainingHeightPercent > 10
  ) {
    spacingScale = Math.max(spacingScale, baseTokens.density === "compact" ? 2.05 : 1.48);
    fontScale = Math.max(fontScale, baseTokens.density === "compact" ? 1.28 : 1.16);
    densityMode = `${baseTokens.density}_light_cv_expanded`;
    tokenState = scaleTokens(baseTokens, {
      fontScale,
      spacingScale,
      credentialSpacingScale: 1.28,
    });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (densityMode.endsWith("_light_cv_expanded") && metrics.usedHeight > pageHeight) {
    spacingScale = baseTokens.density === "compact" ? 1.72 : 1.3;
    fontScale = baseTokens.density === "compact" ? 1.2 : 1.1;
    densityMode = `${baseTokens.density}_light_cv_expanded_medium`;
    tokenState = scaleTokens(baseTokens, {
      fontScale,
      spacingScale,
      credentialSpacingScale: 1.16,
    });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (metrics.usedHeight > pageHeight) {
    spacingScale = 0.9;
    fontScale = 0.96;
    densityMode = `${baseTokens.density}_overflow_compact`;
    tokenState = scaleTokens(baseTokens, { fontScale, spacingScale });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  if (metrics.usedHeight > pageHeight) {
    spacingScale = 0.82;
    fontScale = 0.93;
    densityMode = `${baseTokens.density}_overflow_tight`;
    tokenState = scaleTokens(baseTokens, { fontScale, spacingScale });
    metrics = buildMetrics({
      cv,
      sections,
      tokens: tokenState,
      omittedOverflowItemCounts,
      presentationJsonUsed,
      densityMode,
      fontScale,
      spacingScale,
    });
  }

  return {
    tokens: tokenState,
    sections,
    metrics,
  };
}

export function renderSectionLabel(
  section: NormalizedCvSection,
  tokens: RendererTokens
) {
  return section.label || tokens.labelFor(section.id as CvSectionId | PresentationSectionId);
}
