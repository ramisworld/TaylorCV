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

const CandidateEvidenceLevelSchema = z.enum([
  "limited",
  "emerging",
  "credible",
  "strong",
]);

const CandidatePresentationStageSchema = z.enum([
  "student",
  "graduate",
  "early_career",
  "mid_level",
  "senior_level",
  "career_changer",
  "unknown",
]);

const CandidateProfileTypeSchema = z.enum([
  "student",
  "graduate",
  "technical_builder",
  "operator",
  "specialist",
  "generalist",
  "career_changer",
  "experienced_professional",
  "unknown",
]);

const StrongestProofTypeSchema = z.enum([
  "formal_experience",
  "projects",
  "education",
  "certifications",
  "portfolio",
  "research",
  "transferable_experience",
  "mixed",
  "unclear",
]);

const ProofStrengthSchema = z.enum(["weak", "moderate", "strong"]);

const FounderFramingModeSchema = z.enum([
  "highlight",
  "neutral",
  "de_emphasise",
  "avoid",
]);

const StrategySignalsSchema = z.object({
  candidateEvidenceLevel: CandidateEvidenceLevelSchema,
  candidatePresentationStage: CandidatePresentationStageSchema,
  candidateProfileType: CandidateProfileTypeSchema,
  strongestProofType: StrongestProofTypeSchema,
  formalExperienceStrength: ProofStrengthSchema,
  projectProofStrength: ProofStrengthSchema,
  educationCredentialStrength: ProofStrengthSchema,
  certificationStrength: ProofStrengthSchema,
  transferableProofStrength: ProofStrengthSchema,
  roleFitStrength: ProofStrengthSchema,
  credentialsAreThreshold: z.boolean(),
  proofFirstRecommended: z.boolean(),
  hybridStructureRecommended: z.boolean(),
  founderFramingMode: FounderFramingModeSchema,
  founderFramingGuidance: z.string().min(1),
  recommendedFocus: z.string().min(1),
  primaryFraming: z.string().min(1),
  positioningWarnings: z.array(z.string()).max(8),
});

export type StrategySignals = z.infer<typeof StrategySignalsSchema>;

export const DefaultStrategySignals: StrategySignals = {
  candidateEvidenceLevel: "emerging",
  candidatePresentationStage: "unknown",
  candidateProfileType: "unknown",
  strongestProofType: "unclear",
  formalExperienceStrength: "weak",
  projectProofStrength: "weak",
  educationCredentialStrength: "weak",
  certificationStrength: "weak",
  transferableProofStrength: "weak",
  roleFitStrength: "moderate",
  credentialsAreThreshold: false,
  proofFirstRecommended: false,
  hybridStructureRecommended: false,
  founderFramingMode: "neutral",
  founderFramingGuidance:
    "Use founder or builder framing only when it is truthful and clearly useful for the target role.",
  recommendedFocus: "Lead with truthful role fit and the strongest available proof.",
  primaryFraming: "Role-aligned candidate with relevant evidence for the target role.",
  positioningWarnings: [],
};

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

const CareerProfileLinkTypeSchema = z.enum([
  "linkedin",
  "github",
  "portfolio",
  "kaggle",
  "medium",
  "website",
  "other",
]);

const CareerProfileCredentialTypeSchema = z.enum([
  "certification",
  "licence",
  "credential",
  "award",
  "other",
]);

const CareerProfileBulletSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});

export const StructuredCareerProfileSchema = z.object({
  basics: z.object({
    fullName: z.string(),
    currentRole: z.string(),
    location: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    profileImageUrl: z.string().optional(),
  }),
  skills: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      category: z.string().optional(),
    })
  ),
  experiences: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      company: z.string().min(1),
      location: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      isCurrent: z.boolean().optional(),
      bullets: z.array(CareerProfileBulletSchema),
      tools: z.array(z.string()).optional(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      description: z.string().optional(),
      bullets: z.array(CareerProfileBulletSchema).optional(),
      tools: z.array(z.string()).optional(),
      links: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().optional(),
            url: z.string().min(1),
          })
        )
        .optional(),
    })
  ),
  education: z.array(
    z.object({
      id: z.string().min(1),
      institution: z.string().min(1),
      qualification: z.string().min(1),
      field: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      details: z.array(z.string()).optional(),
    })
  ),
  credentials: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      issuer: z.string().optional(),
      type: CareerProfileCredentialTypeSchema.optional(),
      issueDate: z.string().optional(),
      expiryDate: z.string().optional(),
      credentialId: z.string().optional(),
      url: z.string().optional(),
    })
  ),
  links: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      url: z.string().min(1),
      type: CareerProfileLinkTypeSchema.optional(),
    })
  ),
  careerDetails: z.object({
    yearsOfExperience: z.string().optional(),
    targetRoles: z.array(z.string()).optional(),
    industriesOfInterest: z.array(z.string()).optional(),
    preferredLocations: z.array(z.string()).optional(),
    openToRemote: z.boolean().optional(),
  }),
  metadata: z.object({
    source: z.enum(["intake_import", "user_edited"]).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

const StoredCandidateProfileSchema = z.object({
  candidateBrief: CandidateBriefSchema,
  strategySignals: StrategySignalsSchema.default(DefaultStrategySignals),
  deterministicBasics: DeterministicCandidateBasicsSchema,
  structuredCareerProfile: StructuredCareerProfileSchema.nullable().optional(),
});

const GapQuestionOutputSchema = z.object({
  question: z
    .string()
    .min(25)
    .max(220)
    .regex(/\?\s*$/, "Gap question must end with a question mark."),
  shortTitle: z.string().min(3).max(40),
  exampleAnswer: z.string().min(20).max(220),
  whyItMatters: z.string().min(20).max(180),
  targetArea: z.string().min(1).max(120),
  priority: z.enum(["high", "medium"]),
});

export const IntakeGapOutputSchema = z.object({
  jobBrief: JobBriefSchema,
  candidateBrief: CandidateBriefSchema,
  strategySignals: StrategySignalsSchema,
  gapQuestions: z.array(GapQuestionOutputSchema).max(3),
  structuredCareerProfile: StructuredCareerProfileSchema.nullable(),
});

export type IntakeGapOutput = z.infer<typeof IntakeGapOutputSchema>;
export type JobBrief = z.infer<typeof JobBriefSchema>;
export type CandidateBrief = z.infer<typeof CandidateBriefSchema>;
export type DeterministicCandidateBasics = z.infer<
  typeof DeterministicCandidateBasicsSchema
>;
export type StructuredCareerProfile = z.infer<typeof StructuredCareerProfileSchema>;
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

const careerProfileBulletJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "text"],
  properties: {
    id: { type: "string" },
    text: { type: "string" },
  },
} as const;

const structuredCareerProfileJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "basics",
    "skills",
    "experiences",
    "projects",
    "education",
    "credentials",
    "links",
    "careerDetails",
    "metadata",
  ],
  properties: {
    basics: {
      type: "object",
      additionalProperties: false,
      required: ["fullName", "currentRole"],
      properties: {
        fullName: { type: "string" },
        currentRole: { type: "string" },
        location: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        profileImageUrl: { type: "string" },
      },
    },
    skills: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          category: { type: "string" },
        },
      },
    },
    experiences: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "title", "company", "bullets"],
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          company: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          isCurrent: { type: "boolean" },
          bullets: { type: "array", items: careerProfileBulletJsonSchema },
          tools: stringArrayJsonSchema,
        },
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          bullets: { type: "array", items: careerProfileBulletJsonSchema },
          tools: stringArrayJsonSchema,
          links: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "url"],
              properties: {
                id: { type: "string" },
                label: { type: "string" },
                url: { type: "string" },
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
        required: ["id", "institution", "qualification"],
        properties: {
          id: { type: "string" },
          institution: { type: "string" },
          qualification: { type: "string" },
          field: { type: "string" },
          location: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
          details: stringArrayJsonSchema,
        },
      },
    },
    credentials: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          issuer: { type: "string" },
          type: {
            type: "string",
            enum: ["certification", "licence", "credential", "award", "other"],
          },
          issueDate: { type: "string" },
          expiryDate: { type: "string" },
          credentialId: { type: "string" },
          url: { type: "string" },
        },
      },
    },
    links: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "label", "url"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          url: { type: "string" },
          type: {
            type: "string",
            enum: ["linkedin", "github", "portfolio", "kaggle", "medium", "website", "other"],
          },
        },
      },
    },
    careerDetails: {
      type: "object",
      additionalProperties: false,
      required: [],
      properties: {
        yearsOfExperience: { type: "string" },
        targetRoles: stringArrayJsonSchema,
        industriesOfInterest: stringArrayJsonSchema,
        preferredLocations: stringArrayJsonSchema,
        openToRemote: { type: "boolean" },
      },
    },
    metadata: {
      type: "object",
      additionalProperties: false,
      required: [],
      properties: {
        source: { type: "string", enum: ["intake_import", "user_edited"] },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
} as const;

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

const proofStrengthJsonSchema = {
  type: "string",
  enum: ["weak", "moderate", "strong"],
} as const;

const strategySignalsJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "candidateEvidenceLevel",
    "candidatePresentationStage",
    "candidateProfileType",
    "strongestProofType",
    "formalExperienceStrength",
    "projectProofStrength",
    "educationCredentialStrength",
    "certificationStrength",
    "transferableProofStrength",
    "roleFitStrength",
    "credentialsAreThreshold",
    "proofFirstRecommended",
    "hybridStructureRecommended",
    "founderFramingMode",
    "founderFramingGuidance",
    "recommendedFocus",
    "primaryFraming",
    "positioningWarnings",
  ],
  properties: {
    candidateEvidenceLevel: {
      type: "string",
      enum: ["limited", "emerging", "credible", "strong"],
    },
    candidatePresentationStage: {
      type: "string",
      enum: [
        "student",
        "graduate",
        "early_career",
        "mid_level",
        "senior_level",
        "career_changer",
        "unknown",
      ],
    },
    candidateProfileType: {
      type: "string",
      enum: [
        "student",
        "graduate",
        "technical_builder",
        "operator",
        "specialist",
        "generalist",
        "career_changer",
        "experienced_professional",
        "unknown",
      ],
    },
    strongestProofType: {
      type: "string",
      enum: [
        "formal_experience",
        "projects",
        "education",
        "certifications",
        "portfolio",
        "research",
        "transferable_experience",
        "mixed",
        "unclear",
      ],
    },
    formalExperienceStrength: proofStrengthJsonSchema,
    projectProofStrength: proofStrengthJsonSchema,
    educationCredentialStrength: proofStrengthJsonSchema,
    certificationStrength: proofStrengthJsonSchema,
    transferableProofStrength: proofStrengthJsonSchema,
    roleFitStrength: proofStrengthJsonSchema,
    credentialsAreThreshold: { type: "boolean" },
    proofFirstRecommended: { type: "boolean" },
    hybridStructureRecommended: { type: "boolean" },
    founderFramingMode: {
      type: "string",
      enum: ["highlight", "neutral", "de_emphasise", "avoid"],
    },
    founderFramingGuidance: { type: "string" },
    recommendedFocus: { type: "string" },
    primaryFraming: { type: "string" },
    positioningWarnings: boundedStringArrayJsonSchema(8),
  },
} as const;

export const AgentJsonSchemas = {
  intakeGap: {
    type: "object",
    additionalProperties: false,
    required: [
      "jobBrief",
      "candidateBrief",
      "strategySignals",
      "gapQuestions",
      "structuredCareerProfile",
    ],
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
      strategySignals: strategySignalsJsonSchema,
      gapQuestions: {
        type: "array",
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "question",
            "shortTitle",
            "exampleAnswer",
            "whyItMatters",
            "targetArea",
            "priority",
          ],
          properties: {
            question: {
              type: "string",
              minLength: 25,
              maxLength: 220,
              pattern: "\\?\\s*$",
            },
            shortTitle: { type: "string", minLength: 3, maxLength: 40 },
            exampleAnswer: { type: "string", minLength: 20, maxLength: 220 },
            whyItMatters: { type: "string", minLength: 20, maxLength: 180 },
            targetArea: { type: "string", maxLength: 120 },
            priority: { type: "string", enum: ["high", "medium"] },
          },
        },
      },
      structuredCareerProfile: {
        anyOf: [structuredCareerProfileJsonSchema, { type: "null" }],
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
