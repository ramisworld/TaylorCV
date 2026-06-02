import { z } from "zod";

const SenioritySchema = z.enum([
  "intern",
  "graduate",
  "junior",
  "mid",
  "senior",
  "lead",
  "manager",
  "executive",
  "unknown",
]);

const JobBriefSchema = z.object({
  targetRoleTitle: z.string().min(1),
  companyName: z.string().nullable(),
  marketOrLocation: z.string().nullable(),
  seniority: SenioritySchema,
  archetype: z.string().min(1),
  subArchetype: z.string().nullable(),
  roleSummary: z.string().min(1),
  topPriorities: z.array(z.string()).max(8),
  proofNeeds: z.array(z.string()).max(8),
  keywords: z.array(z.string()).max(16),
  cultureSignals: z.array(z.string()).max(6),
  risks: z.array(z.string()).max(6),
});

const CandidateBriefSchema = z.object({
  possibleHeadline: z.string().nullable(),
  strongestEvidence: z.array(z.string()).max(10),
  relevantSignals: z.array(z.string()).max(12),
  missingOrWeakProof: z.array(z.string()).max(8),
  usefulSections: z.array(z.string()).max(8),
  warnings: z.array(z.string()).max(6),
});

const DeterministicCandidateBasicsSchema = z.object({
  possibleName: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  linkedin: z.string().nullable(),
  github: z.string().nullable(),
  portfolio: z.string().nullable(),
  otherUrls: z.array(z.string()).max(12),
  sectionHeadings: z.array(z.string()).max(12),
});

const StoredCandidateProfileSchema = z.object({
  candidateBrief: CandidateBriefSchema,
  deterministicBasics: DeterministicCandidateBasicsSchema,
});

const GapQuestionOutputSchema = z.object({
  question: z.string().min(1).max(120),
  questionTitle: z.string().min(1).max(90),
  shortTitle: z.string().min(1).max(60),
  tinyExample: z.string().min(1).max(140),
  helperText: z.string().min(1).max(140),
  whyItMatters: z.string().min(1).max(140),
  targetArea: z.string().min(1).max(120),
  priority: z.enum(["high", "medium"]),
});

export const IntakeGapOutputSchema = z.object({
  jobBrief: JobBriefSchema,
  candidateBrief: CandidateBriefSchema,
  gapQuestions: z.array(GapQuestionOutputSchema).max(3),
});

export type IntakeGapOutput = z.infer<typeof IntakeGapOutputSchema>;
export type JobBrief = z.infer<typeof JobBriefSchema>;
export type CandidateBrief = z.infer<typeof CandidateBriefSchema>;
export type DeterministicCandidateBasics = z.infer<
  typeof DeterministicCandidateBasicsSchema
>;
export type StoredCandidateProfile = z.infer<typeof StoredCandidateProfileSchema>;
export type GapQuestionOutput = z.infer<typeof GapQuestionOutputSchema>;

const CvBulletClaimSchema = z.object({
  text: z.string().min(1),
  gapAnswerIds: z.array(z.string()),
});

const CvLinkSchema = z.object({
  label: z.string().nullable(),
  url: z.string().min(1),
  linkType: z.string().nullable(),
});

const CvHeaderSchema = z.object({
  name: z.string().nullable(),
  targetTitle: z.string().nullable(),
  location: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  links: z.array(CvLinkSchema),
});

const CvSkillGroupSchema = z.object({
  group: z.string().min(1),
  skills: z.array(z.string().min(1)),
});

const CvExperienceItemSchema = z.object({
  role: z.string().nullable(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  dates: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  bullets: z.array(CvBulletClaimSchema).min(1),
});

const CvProjectItemSchema = z.object({
  name: z.string().nullable(),
  descriptor: z.string().nullable(),
  dates: z.string().nullable(),
  bullets: z.array(CvBulletClaimSchema).min(1),
});

const CvEducationItemSchema = z.object({
  institution: z.string().nullable(),
  degree: z.string().nullable(),
  dates: z.string().nullable(),
  details: z.array(z.string()),
});

const DynamicCvSectionItemSchema = z.object({
  text: z.string().min(1),
  gapAnswerIds: z.array(z.string()),
});

const DynamicCvSectionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["bullets", "inline", "certifications"]),
  priority: z.enum(["primary", "secondary", "supporting"]),
  items: z.array(DynamicCvSectionItemSchema),
});

export const StructuredCvDocumentSchema = z.object({
  sectionOrder: z.array(z.string().min(1)).min(1),
  header: CvHeaderSchema,
  summary: z.string().min(1),
  skills: z.object({ groups: z.array(CvSkillGroupSchema) }),
  experience: z.array(CvExperienceItemSchema),
  projects: z.array(CvProjectItemSchema),
  education: z.array(CvEducationItemSchema),
  certifications: z.array(z.string()),
  sections: z.array(DynamicCvSectionSchema),
  roleArchetype: z.string().nullable(),
});

export type StructuredCvDocument = z.infer<typeof StructuredCvDocumentSchema>;

const CvBlueprintSchema = z.object({
  sectionOrder: z.array(z.string().min(1)).min(1),
  briefRationale: z.string().min(1),
  warnings: z.array(z.string()),
});

export const CvComposerOutputSchema = z.object({
  blueprint: CvBlueprintSchema,
  cv: StructuredCvDocumentSchema,
});

export type CvComposerOutput = z.infer<typeof CvComposerOutputSchema>;
export type CvBlueprint = z.infer<typeof CvBlueprintSchema>;

export const GapAnswerForComposerSchema = z.object({
  gapQuestionId: z.string(),
  question: z.string(),
  targetArea: z.string(),
  whyItMatters: z.string(),
  answer: z.string(),
});

export type GapAnswerForComposer = z.infer<typeof GapAnswerForComposerSchema>;

const stringArrayJsonSchema = { type: "array", items: { type: "string" } } as const;

function boundedStringArrayJsonSchema(maxItems: number) {
  return {
    type: "array",
    maxItems,
    items: { type: "string" },
  } as const;
}

const seniorityJsonSchema = {
  type: "string",
  enum: [
    "intern",
    "graduate",
    "junior",
    "mid",
    "senior",
    "lead",
    "manager",
    "executive",
    "unknown",
  ],
} as const;

export const AgentJsonSchemas = {
  intakeGap: {
    type: "object",
    additionalProperties: false,
    required: ["jobBrief", "candidateBrief", "gapQuestions"],
    properties: {
      jobBrief: {
        type: "object",
        additionalProperties: false,
        required: [
          "targetRoleTitle",
          "companyName",
          "marketOrLocation",
          "seniority",
          "archetype",
          "subArchetype",
          "roleSummary",
          "topPriorities",
          "proofNeeds",
          "keywords",
          "cultureSignals",
          "risks",
        ],
        properties: {
          targetRoleTitle: { type: "string" },
          companyName: { type: ["string", "null"] },
          marketOrLocation: { type: ["string", "null"] },
          seniority: seniorityJsonSchema,
          archetype: { type: "string" },
          subArchetype: { type: ["string", "null"] },
          roleSummary: { type: "string" },
          topPriorities: boundedStringArrayJsonSchema(8),
          proofNeeds: boundedStringArrayJsonSchema(8),
          keywords: boundedStringArrayJsonSchema(16),
          cultureSignals: boundedStringArrayJsonSchema(6),
          risks: boundedStringArrayJsonSchema(6),
        },
      },
      candidateBrief: {
        type: "object",
        additionalProperties: false,
        required: [
          "possibleHeadline",
          "strongestEvidence",
          "relevantSignals",
          "missingOrWeakProof",
          "usefulSections",
          "warnings",
        ],
        properties: {
          possibleHeadline: { type: ["string", "null"] },
          strongestEvidence: boundedStringArrayJsonSchema(10),
          relevantSignals: boundedStringArrayJsonSchema(12),
          missingOrWeakProof: boundedStringArrayJsonSchema(8),
          usefulSections: boundedStringArrayJsonSchema(8),
          warnings: boundedStringArrayJsonSchema(6),
        },
      },
      gapQuestions: {
        type: "array",
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "question",
            "questionTitle",
            "shortTitle",
            "tinyExample",
            "helperText",
            "whyItMatters",
            "targetArea",
            "priority",
          ],
          properties: {
            question: { type: "string", maxLength: 120 },
            questionTitle: { type: "string", maxLength: 90 },
            shortTitle: { type: "string", maxLength: 60 },
            tinyExample: { type: "string", maxLength: 140 },
            helperText: { type: "string", maxLength: 140 },
            whyItMatters: { type: "string", maxLength: 140 },
            targetArea: { type: "string", maxLength: 120 },
            priority: { type: "string", enum: ["high", "medium"] },
          },
        },
      },
    },
  },
  cvComposer: {
    type: "object",
    additionalProperties: false,
    required: ["blueprint", "cv"],
    properties: {
      blueprint: {
        type: "object",
        additionalProperties: false,
        required: ["sectionOrder", "briefRationale", "warnings"],
        properties: {
          sectionOrder: { ...stringArrayJsonSchema, minItems: 1 },
          briefRationale: { type: "string" },
          warnings: stringArrayJsonSchema,
        },
      },
      cv: {
        type: "object",
        additionalProperties: false,
        required: [
          "sectionOrder",
          "header",
          "summary",
          "skills",
          "experience",
          "projects",
          "education",
          "certifications",
          "sections",
          "roleArchetype",
        ],
        properties: {
          sectionOrder: { ...stringArrayJsonSchema, minItems: 1 },
          header: {
            type: "object",
            additionalProperties: false,
            required: [
              "name",
              "targetTitle",
              "location",
              "phone",
              "email",
              "links",
            ],
            properties: {
              name: { type: ["string", "null"] },
              targetTitle: { type: ["string", "null"] },
              location: { type: ["string", "null"] },
              phone: { type: ["string", "null"] },
              email: { type: ["string", "null"] },
              links: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["label", "url", "linkType"],
                  properties: {
                    label: { type: ["string", "null"] },
                    url: { type: "string" },
                    linkType: { type: ["string", "null"] },
                  },
                },
              },
            },
          },
          summary: { type: "string" },
          skills: {
            type: "object",
            additionalProperties: false,
            required: ["groups"],
            properties: {
              groups: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["group", "skills"],
                  properties: {
                    group: { type: "string" },
                    skills: stringArrayJsonSchema,
                  },
                },
              },
            },
          },
          experience: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "role",
                "company",
                "location",
                "dates",
                "startDate",
                "endDate",
                "bullets",
              ],
              properties: {
                role: { type: ["string", "null"] },
                company: { type: ["string", "null"] },
                location: { type: ["string", "null"] },
                dates: { type: ["string", "null"] },
                startDate: { type: ["string", "null"] },
                endDate: { type: ["string", "null"] },
                bullets: {
                  type: "array",
                  minItems: 1,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["text", "gapAnswerIds"],
                    properties: {
                      text: { type: "string" },
                      gapAnswerIds: stringArrayJsonSchema,
                    },
                  },
                },
              },
            },
          },
          projects: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["name", "descriptor", "dates", "bullets"],
              properties: {
                name: { type: ["string", "null"] },
                descriptor: { type: ["string", "null"] },
                dates: { type: ["string", "null"] },
                bullets: {
                  type: "array",
                  minItems: 1,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["text", "gapAnswerIds"],
                    properties: {
                      text: { type: "string" },
                      gapAnswerIds: stringArrayJsonSchema,
                    },
                  },
                },
              },
            },
          },
          education: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["institution", "degree", "dates", "details"],
              properties: {
                institution: { type: ["string", "null"] },
                degree: { type: ["string", "null"] },
                dates: { type: ["string", "null"] },
                details: stringArrayJsonSchema,
              },
            },
          },
          certifications: stringArrayJsonSchema,
          sections: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "label", "type", "priority", "items"],
              properties: {
                id: { type: "string" },
                label: { type: "string" },
                type: {
                  type: "string",
                  enum: ["bullets", "inline", "certifications"],
                },
                priority: {
                  type: "string",
                  enum: ["primary", "secondary", "supporting"],
                },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["text", "gapAnswerIds"],
                    properties: {
                      text: { type: "string" },
                      gapAnswerIds: stringArrayJsonSchema,
                    },
                  },
                },
              },
            },
          },
          roleArchetype: { type: ["string", "null"] },
        },
      },
    },
  },
} as const;

export const StoredCandidateProfileJsonSchema =
  StoredCandidateProfileSchema;
