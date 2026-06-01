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

const CandidateIdentitySchema = z.object({
  fullName: z.string().nullable(),
  currentTitle: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  linkedin: z.string().nullable(),
  github: z.string().nullable(),
  portfolio: z.string().nullable(),
});

const CandidateExperienceFactSchema = z.object({
  title: z.string().min(1),
  organization: z.string().nullable(),
  location: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  descriptionFacts: z.array(z.string()).max(6),
  achievementFacts: z.array(z.string()).max(6),
  tools: z.array(z.string()).max(10),
  metrics: z.array(z.string()).max(6),
  originalBullets: z.array(z.string()).max(6),
});

const CandidateProjectFactSchema = z.object({
  name: z.string().min(1),
  descriptionFacts: z.array(z.string()).max(6),
  achievementFacts: z.array(z.string()).max(6),
  tools: z.array(z.string()).max(10),
  metrics: z.array(z.string()).max(6),
  links: z.array(z.string()).max(4),
  originalBullets: z.array(z.string()).max(6),
});

const CandidateEducationFactSchema = z.object({
  institution: z.string().nullable(),
  qualification: z.string().nullable(),
  dates: z.string().nullable(),
  details: z.array(z.string()).max(4),
  awardsOrScholarships: z.array(z.string()).max(4),
});

const CandidateCertificationFactSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().nullable(),
  date: z.string().nullable(),
  scoreOrDetail: z.string().nullable(),
  notes: z.array(z.string()).max(3),
});

const SourceStructureItemSchema = z.object({
  sectionName: z.string().min(1),
  sectionOrder: z.number().int().nonnegative(),
  normalizedType: z.enum([
    "summary",
    "experience",
    "projects",
    "skills",
    "education",
    "certifications",
    "awards",
    "portfolio",
    "other",
  ]),
  highSignal: z.boolean(),
  usefulDetails: z.array(z.string()).max(4),
});

const JobContextSchema = z.object({
  targetRoleTitle: z.string().min(1),
  companyName: z.string().nullable(),
  marketOrLocation: z.string().nullable(),
  seniority: SenioritySchema,
  archetype: z.string().min(1),
  subArchetype: z.string().nullable(),
  roleSummary: z.string().min(1),
  mustHaveRequirements: z.array(z.string()).max(8),
  niceToHaveRequirements: z.array(z.string()).max(6),
  keywords: z.array(z.string()).max(16),
  recruiterPriorities: z.array(z.string()).max(8),
  expectedProofTypes: z.array(z.string()).max(8),
  culturalSignals: z.array(z.string()).max(6),
  risksOrAmbiguities: z.array(z.string()).max(6),
});

const CandidateContextSchema = z.object({
  identity: CandidateIdentitySchema,
  currentHeadline: z.string().nullable(),
  summaryFacts: z.array(z.string()).max(8),
  experiences: z.array(CandidateExperienceFactSchema).max(8),
  projects: z.array(CandidateProjectFactSchema).max(8),
  skillsByGroup: z.array(
    z.object({ group: z.string().min(1), skills: z.array(z.string()).max(12) })
  ).max(8),
  education: z.array(CandidateEducationFactSchema).max(6),
  certifications: z.array(CandidateCertificationFactSchema).max(8),
  awardsOrScholarships: z.array(z.string()).max(6),
  links: z.array(z.string()).max(8),
  notableEvidence: z.array(z.string()).max(10),
  weakOrMissingAreas: z.array(z.string()).max(8),
  sourceStructure: z.array(SourceStructureItemSchema).max(6),
  warnings: z.array(z.string()).max(6),
});

const GapQuestionOutputSchema = z.object({
  question: z.string().min(1).max(220),
  tinyExample: z.string().min(1).max(260),
  whyItMatters: z.string().min(1).max(260),
  answerGuidance: z.string().min(1).max(260),
  targetArea: z.string().min(1).max(120),
  priority: z.enum(["high", "medium"]),
});

export const IntakeGapOutputSchema = z.object({
  jobContext: JobContextSchema,
  candidateContext: CandidateContextSchema,
  gapQuestions: z.array(GapQuestionOutputSchema).max(3),
});

export type IntakeGapOutput = z.infer<typeof IntakeGapOutputSchema>;
export type JobContext = z.infer<typeof JobContextSchema>;
export type CandidateContext = z.infer<typeof CandidateContextSchema>;
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

const CvSectionReasonSchema = z.object({
  section: z.string().min(1),
  reason: z.string().min(1),
});

const CvBlueprintSchema = z.object({
  archetype: z.string().min(1),
  seniority: SenioritySchema.or(z.string().min(1)),
  targetPositioning: z.string().min(1),
  sectionOrder: z.array(z.string().min(1)),
  sectionReasons: z.array(CvSectionReasonSchema).min(1),
  riskWarnings: z.array(z.string()),
  omittedImportantDetails: z.array(z.string()),
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

const candidateIdentityJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "fullName",
    "currentTitle",
    "location",
    "email",
    "phone",
    "linkedin",
    "github",
    "portfolio",
  ],
  properties: {
    fullName: { type: ["string", "null"] },
    currentTitle: { type: ["string", "null"] },
    location: { type: ["string", "null"] },
    email: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    linkedin: { type: ["string", "null"] },
    github: { type: ["string", "null"] },
    portfolio: { type: ["string", "null"] },
  },
} as const;

const sourceStructureJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "sectionName",
    "sectionOrder",
    "normalizedType",
    "highSignal",
    "usefulDetails",
  ],
  properties: {
    sectionName: { type: "string" },
    sectionOrder: { type: "integer", minimum: 0 },
    normalizedType: {
      type: "string",
      enum: [
        "summary",
        "experience",
        "projects",
        "skills",
        "education",
        "certifications",
        "awards",
        "portfolio",
        "other",
      ],
    },
    highSignal: { type: "boolean" },
    usefulDetails: boundedStringArrayJsonSchema(4),
  },
} as const;

export const AgentJsonSchemas = {
  intakeGap: {
    type: "object",
    additionalProperties: false,
    required: ["jobContext", "candidateContext", "gapQuestions"],
    properties: {
      jobContext: {
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
          "mustHaveRequirements",
          "niceToHaveRequirements",
          "keywords",
          "recruiterPriorities",
          "expectedProofTypes",
          "culturalSignals",
          "risksOrAmbiguities",
        ],
        properties: {
          targetRoleTitle: { type: "string" },
          companyName: { type: ["string", "null"] },
          marketOrLocation: { type: ["string", "null"] },
          seniority: seniorityJsonSchema,
          archetype: { type: "string" },
          subArchetype: { type: ["string", "null"] },
          roleSummary: { type: "string" },
          mustHaveRequirements: boundedStringArrayJsonSchema(8),
          niceToHaveRequirements: boundedStringArrayJsonSchema(6),
          keywords: boundedStringArrayJsonSchema(16),
          recruiterPriorities: boundedStringArrayJsonSchema(8),
          expectedProofTypes: boundedStringArrayJsonSchema(8),
          culturalSignals: boundedStringArrayJsonSchema(6),
          risksOrAmbiguities: boundedStringArrayJsonSchema(6),
        },
      },
      candidateContext: {
        type: "object",
        additionalProperties: false,
        required: [
          "identity",
          "currentHeadline",
          "summaryFacts",
          "experiences",
          "projects",
          "skillsByGroup",
          "education",
          "certifications",
          "awardsOrScholarships",
          "links",
          "notableEvidence",
          "weakOrMissingAreas",
          "sourceStructure",
          "warnings",
        ],
        properties: {
          identity: candidateIdentityJsonSchema,
          currentHeadline: { type: ["string", "null"] },
          summaryFacts: boundedStringArrayJsonSchema(8),
          experiences: {
            type: "array",
            maxItems: 8,
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "title",
                "organization",
                "location",
                "startDate",
                "endDate",
                "descriptionFacts",
                "achievementFacts",
                "tools",
                "metrics",
                "originalBullets",
              ],
              properties: {
                title: { type: "string" },
                organization: { type: ["string", "null"] },
                location: { type: ["string", "null"] },
                startDate: { type: ["string", "null"] },
                endDate: { type: ["string", "null"] },
                descriptionFacts: boundedStringArrayJsonSchema(6),
                achievementFacts: boundedStringArrayJsonSchema(6),
                tools: boundedStringArrayJsonSchema(10),
                metrics: boundedStringArrayJsonSchema(6),
                originalBullets: boundedStringArrayJsonSchema(6),
              },
            },
          },
          projects: {
            type: "array",
            maxItems: 8,
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "name",
                "descriptionFacts",
                "achievementFacts",
                "tools",
                "metrics",
                "links",
                "originalBullets",
              ],
              properties: {
                name: { type: "string" },
                descriptionFacts: boundedStringArrayJsonSchema(6),
                achievementFacts: boundedStringArrayJsonSchema(6),
                tools: boundedStringArrayJsonSchema(10),
                metrics: boundedStringArrayJsonSchema(6),
                links: boundedStringArrayJsonSchema(4),
                originalBullets: boundedStringArrayJsonSchema(6),
              },
            },
          },
          skillsByGroup: {
            type: "array",
            maxItems: 8,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["group", "skills"],
              properties: {
                group: { type: "string" },
                skills: boundedStringArrayJsonSchema(12),
              },
            },
          },
          education: {
            type: "array",
            maxItems: 6,
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "institution",
                "qualification",
                "dates",
                "details",
                "awardsOrScholarships",
              ],
              properties: {
                institution: { type: ["string", "null"] },
                qualification: { type: ["string", "null"] },
                dates: { type: ["string", "null"] },
                details: boundedStringArrayJsonSchema(4),
                awardsOrScholarships: boundedStringArrayJsonSchema(4),
              },
            },
          },
          certifications: {
            type: "array",
            maxItems: 8,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["name", "issuer", "date", "scoreOrDetail", "notes"],
              properties: {
                name: { type: "string" },
                issuer: { type: ["string", "null"] },
                date: { type: ["string", "null"] },
                scoreOrDetail: { type: ["string", "null"] },
                notes: boundedStringArrayJsonSchema(3),
              },
            },
          },
          awardsOrScholarships: boundedStringArrayJsonSchema(6),
          links: boundedStringArrayJsonSchema(8),
          notableEvidence: boundedStringArrayJsonSchema(10),
          weakOrMissingAreas: boundedStringArrayJsonSchema(8),
          sourceStructure: { type: "array", maxItems: 6, items: sourceStructureJsonSchema },
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
            "tinyExample",
            "whyItMatters",
            "answerGuidance",
            "targetArea",
            "priority",
          ],
          properties: {
            question: { type: "string", maxLength: 220 },
            tinyExample: { type: "string", maxLength: 260 },
            whyItMatters: { type: "string", maxLength: 260 },
            answerGuidance: { type: "string", maxLength: 260 },
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
        required: [
          "archetype",
          "seniority",
          "targetPositioning",
          "sectionOrder",
          "sectionReasons",
          "riskWarnings",
          "omittedImportantDetails",
        ],
        properties: {
          archetype: { type: "string" },
          seniority: seniorityJsonSchema,
          targetPositioning: { type: "string" },
          sectionOrder: stringArrayJsonSchema,
          sectionReasons: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["section", "reason"],
              properties: {
                section: { type: "string" },
                reason: { type: "string" },
              },
            },
          },
          riskWarnings: stringArrayJsonSchema,
          omittedImportantDetails: stringArrayJsonSchema,
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
