import { z } from "zod";

export const JobAnalysisSchema = z.object({
  targetRoleTitle: z.string().min(1),
  companyName: z.string().nullable(),
  market: z.string().nullable(),
  seniority: z.enum([
    "intern",
    "graduate",
    "junior",
    "mid",
    "senior",
    "lead",
    "manager",
    "executive",
    "unknown",
  ]),
  archetype: z.string().min(1),
  subArchetype: z.string().nullable(),
  roleSummary: z.string().min(1),
  mustHaveRequirements: z.array(z.string()),
  niceToHaveRequirements: z.array(z.string()),
  keywords: z.array(z.string()),
  recruiterPriorities: z.array(z.string()),
  expectedProofTypes: z.array(z.string()),
  recommendedSectionBias: z.array(z.string()),
  risksOrAmbiguities: z.array(z.string()),
});

export type JobAnalysis = z.infer<typeof JobAnalysisSchema>;

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
  descriptionFacts: z.array(z.string()),
  achievementFacts: z.array(z.string()),
  tools: z.array(z.string()),
  metrics: z.array(z.string()),
  proofNotes: z.array(z.string()),
});

const CandidateProjectFactSchema = z.object({
  name: z.string().min(1),
  descriptionFacts: z.array(z.string()),
  achievementFacts: z.array(z.string()),
  tools: z.array(z.string()),
  metrics: z.array(z.string()),
  links: z.array(z.string()),
  proofNotes: z.array(z.string()),
});

const GapQuestionOutputSchema = z.object({
  question: z.string().min(1),
  targetArea: z.string().min(1),
  whyItMatters: z.string().min(1),
  answerGuidance: z.string().min(1),
  expectedAnswerType: z.enum([
    "metric",
    "project_detail",
    "tooling",
    "scope",
    "credential",
    "outcome",
    "deployment",
    "leadership",
    "other",
  ]),
  priority: z.enum(["high", "medium"]),
});

export const CandidateProfileGapOutputSchema = z.object({
  candidateProfile: z.object({
    identity: CandidateIdentitySchema,
    headlineOptions: z.array(z.string()),
    summaryFacts: z.array(z.string()),
    experiences: z.array(CandidateExperienceFactSchema),
    projects: z.array(CandidateProjectFactSchema),
    skillsByGroup: z.array(
      z.object({ group: z.string().min(1), skills: z.array(z.string()) }),
    ),
    education: z.array(
      z.object({
        institution: z.string().min(1),
        qualification: z.string().min(1),
        dates: z.string().nullable(),
        notes: z.array(z.string()),
      }),
    ),
    certifications: z.array(
      z.object({
        name: z.string().min(1),
        issuer: z.string().nullable(),
        date: z.string().nullable(),
        notes: z.array(z.string()),
      }),
    ),
    links: z.array(z.string()),
    proofNotes: z.array(z.string()),
    warnings: z.array(z.string()),
  }),
  gapQuestions: z.array(GapQuestionOutputSchema).max(3),
});

export type CandidateProfileGapOutput = z.infer<
  typeof CandidateProfileGapOutputSchema
>;

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
  archetype: z.string().min(1),
  targetPositioning: z.string().min(1),
  sectionOrder: z.array(z.string().min(1)),
  contentPriorities: z.array(z.string()),
  contentToCut: z.array(z.string()),
  tone: z.string().min(1),
  spaceBudget: z.array(z.string()),
  riskWarnings: z.array(z.string()),
});

export const CvComposerOutputSchema = z.object({
  blueprint: CvBlueprintSchema,
  cv: StructuredCvDocumentSchema,
});

export type CvComposerOutput = z.infer<typeof CvComposerOutputSchema>;

export const GapAnswerForComposerSchema = z.object({
  gapQuestionId: z.string(),
  question: z.string(),
  answer: z.string(),
});

export type GapAnswerForComposer = z.infer<typeof GapAnswerForComposerSchema>;

export const AgentJsonSchemas = {
  jobIntake: {
    type: "object",
    additionalProperties: false,
    required: [
      "targetRoleTitle",
      "companyName",
      "market",
      "seniority",
      "archetype",
      "subArchetype",
      "roleSummary",
      "mustHaveRequirements",
      "niceToHaveRequirements",
      "keywords",
      "recruiterPriorities",
      "expectedProofTypes",
      "recommendedSectionBias",
      "risksOrAmbiguities",
    ],
    properties: {
      targetRoleTitle: { type: "string" },
      companyName: { type: ["string", "null"] },
      market: { type: ["string", "null"] },
      seniority: {
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
      },
      archetype: { type: "string" },
      subArchetype: { type: ["string", "null"] },
      roleSummary: { type: "string" },
      mustHaveRequirements: {
        type: "array",
        items: { type: "string" },
      },
      niceToHaveRequirements: {
        type: "array",
        items: { type: "string" },
      },
      keywords: { type: "array", items: { type: "string" } },
      recruiterPriorities: {
        type: "array",
        items: { type: "string" },
      },
      expectedProofTypes: {
        type: "array",
        items: { type: "string" },
      },
      recommendedSectionBias: {
        type: "array",
        items: { type: "string" },
      },
      risksOrAmbiguities: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
  candidateProfileGap: {
    type: "object",
    additionalProperties: false,
    required: ["candidateProfile", "gapQuestions"],
    properties: {
      candidateProfile: {
        type: "object",
        additionalProperties: false,
        required: [
          "identity",
          "headlineOptions",
          "summaryFacts",
          "experiences",
          "projects",
          "skillsByGroup",
          "education",
          "certifications",
          "links",
          "proofNotes",
          "warnings",
        ],
        properties: {
          identity: {
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
          },
          headlineOptions: {
            type: "array",
            items: { type: "string" },
          },
          summaryFacts: {
            type: "array",
            items: { type: "string" },
          },
          experiences: {
            type: "array",
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
                "proofNotes",
              ],
              properties: {
                title: { type: "string" },
                organization: { type: ["string", "null"] },
                location: { type: ["string", "null"] },
                startDate: { type: ["string", "null"] },
                endDate: { type: ["string", "null"] },
                descriptionFacts: {
                  type: "array",
                  items: { type: "string" },
                },
                achievementFacts: {
                  type: "array",
                  items: { type: "string" },
                },
                tools: { type: "array", items: { type: "string" } },
                metrics: { type: "array", items: { type: "string" } },
                proofNotes: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
          projects: {
            type: "array",
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
                "proofNotes",
              ],
              properties: {
                name: { type: "string" },
                descriptionFacts: {
                  type: "array",
                  items: { type: "string" },
                },
                achievementFacts: {
                  type: "array",
                  items: { type: "string" },
                },
                tools: { type: "array", items: { type: "string" } },
                metrics: { type: "array", items: { type: "string" } },
                links: { type: "array", items: { type: "string" } },
                proofNotes: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
          skillsByGroup: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["group", "skills"],
              properties: {
                group: { type: "string" },
                skills: { type: "array", items: { type: "string" } },
              },
            },
          },
          education: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["institution", "qualification", "dates", "notes"],
              properties: {
                institution: { type: "string" },
                qualification: { type: "string" },
                dates: { type: ["string", "null"] },
                notes: { type: "array", items: { type: "string" } },
              },
            },
          },
          certifications: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["name", "issuer", "date", "notes"],
              properties: {
                name: { type: "string" },
                issuer: { type: ["string", "null"] },
                date: { type: ["string", "null"] },
                notes: { type: "array", items: { type: "string" } },
              },
            },
          },
          links: { type: "array", items: { type: "string" } },
          proofNotes: { type: "array", items: { type: "string" } },
          warnings: { type: "array", items: { type: "string" } },
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
            "targetArea",
            "whyItMatters",
            "answerGuidance",
            "expectedAnswerType",
            "priority",
          ],
          properties: {
            question: { type: "string" },
            targetArea: { type: "string" },
            whyItMatters: { type: "string" },
            answerGuidance: { type: "string" },
            expectedAnswerType: {
              type: "string",
              enum: [
                "metric",
                "project_detail",
                "tooling",
                "scope",
                "credential",
                "outcome",
                "deployment",
                "leadership",
                "other",
              ],
            },
            priority: {
              type: "string",
              enum: ["high", "medium"],
            },
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
          "targetPositioning",
          "sectionOrder",
          "contentPriorities",
          "contentToCut",
          "tone",
          "spaceBudget",
          "riskWarnings",
        ],
        properties: {
          archetype: { type: "string" },
          targetPositioning: { type: "string" },
          sectionOrder: {
            type: "array",
            items: { type: "string" },
          },
          contentPriorities: {
            type: "array",
            items: { type: "string" },
          },
          contentToCut: {
            type: "array",
            items: { type: "string" },
          },
          tone: { type: "string" },
          spaceBudget: {
            type: "array",
            items: { type: "string" },
          },
          riskWarnings: {
            type: "array",
            items: { type: "string" },
          },
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
          sectionOrder: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
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
                    skills: {
                      type: "array",
                      items: { type: "string" },
                    },
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
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["text", "gapAnswerIds"],
                    properties: {
                      text: { type: "string" },
                      gapAnswerIds: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                  minItems: 1,
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
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["text", "gapAnswerIds"],
                    properties: {
                      text: { type: "string" },
                      gapAnswerIds: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                  minItems: 1,
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
                details: {
                  type: "array",
                  items: { type: "string" },
                },
              },
            },
          },
          certifications: {
            type: "array",
            items: { type: "string" },
          },
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
                      gapAnswerIds: {
                        type: "array",
                        items: { type: "string" },
                      },
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
