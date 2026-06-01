import { z } from "zod";

import {
  canonicalPresentationSectionIds,
  cvAccentPalettes,
  cvAccentUsageTargets,
  cvBodySizes,
  cvCareerStyles,
  cvDensityTokens,
  cvDividerStyles,
  cvFontPairings,
  cvHeaderStyles,
  cvHeadingWeights,
  cvLayoutArchitectures,
  cvNameSizes,
  cvPageTargets,
  cvSectionContentStyles,
  cvSectionPriorities,
  cvSectionSpacings,
  cvSectionTreatments,
  cvSectionWidths,
  cvSkillsStyles,
  cvSubtitleStyles,
  cvTemplateIds,
} from "./cvPresentation.ts";

const SafeSectionLabelSchema = z
  .string()
  .trim()
  .min(1)
  .max(48)
  .regex(/^[^<>{}#[\];=]+$/)
  .nullable();

export const CvSectionPresentationSchema = z.object({
  treatment: z.enum(cvSectionTreatments),
  priority: z.enum(cvSectionPriorities),
  divider: z.boolean(),
  spacingBefore: z.enum(cvSectionSpacings),
  spacingAfter: z.enum(cvSectionSpacings),
  width: z.enum(cvSectionWidths),
  contentStyle: z.enum(cvSectionContentStyles),
});

export const CvLayoutStyleOutputSchema = z.object({
  schemaVersion: z.literal(1),
  layoutArchitecture: z.enum(cvLayoutArchitectures),
  templateId: z.enum(cvTemplateIds),
  careerStyle: z.enum(cvCareerStyles),
  density: z.enum(cvDensityTokens),
  pageTarget: z.enum(cvPageTargets),
  typography: z.object({
    fontPairing: z.enum(cvFontPairings),
    nameSize: z.enum(cvNameSizes),
    subtitleStyle: z.enum(cvSubtitleStyles),
    bodySize: z.enum(cvBodySizes),
    headingWeight: z.enum(cvHeadingWeights),
  }),
  colourSystem: z.object({
    accentPalette: z.enum(cvAccentPalettes),
    bodyText: z.literal("dark"),
    mutedText: z.literal("grey"),
    dividerStyle: z.enum(cvDividerStyles),
  }),
  accentUsageRules: z.object({
    useAccentFor: z.array(z.enum(cvAccentUsageTargets)),
    neverUseAccentForBodyText: z.literal(true),
    bodyTextMustRemain: z.literal("dark"),
    metadataTextMustRemain: z.literal("grey"),
  }),
  headerStyle: z.enum(cvHeaderStyles),
  skillsStyle: z.enum(cvSkillsStyles),
  sectionStyles: z.object(
    Object.fromEntries(
      canonicalPresentationSectionIds.map((section) => [
        section,
        CvSectionPresentationSchema.nullable(),
      ])
    ) as Record<
      (typeof canonicalPresentationSectionIds)[number],
      z.ZodNullable<typeof CvSectionPresentationSchema>
    >
  ),
  sectionLabelOverrides: z.object(
    Object.fromEntries(
      canonicalPresentationSectionIds.map((section) => [
        section,
        SafeSectionLabelSchema,
      ])
    ) as Record<
      (typeof canonicalPresentationSectionIds)[number],
      typeof SafeSectionLabelSchema
    >
  ),
  renderWarnings: z.array(z.string().max(220)),
  rationale: z.string().min(1).max(700),
});
