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

export const JobContextSchema = z.object({
  roleTitle: z.string().nullable(),
  companyName: z.string().nullable(),
  marketOrLocation: z.string().nullable(),
  seniority: SenioritySchema,
  roleFamily: z.string().min(1),
  subRoleFamily: z.string().nullable(),
  roleSummary: z.string().min(1),
  mustHaveRequirements: z.array(z.string()).max(10),
  responsibilities: z.array(z.string()).max(8),
  proofNeeds: z.array(z.string()).max(8),
  keywords: z.array(z.string()).max(20),
  risks: z.array(z.string()).max(5),
  exactPhrases: z.array(z.string()).max(8),
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

export const SectionSignalsSchema = z.object({
  candidateEvidenceLevel: CandidateEvidenceLevelSchema,
  candidatePresentationStage: CandidatePresentationStageSchema,
  candidateProfileType: CandidateProfileTypeSchema,
  strongestProofType: StrongestProofTypeSchema,
  experienceStrength: ProofStrengthSchema,
  projectStrength: ProofStrengthSchema,
  educationStrength: ProofStrengthSchema,
  certificationStrength: ProofStrengthSchema,
  transferableStrength: ProofStrengthSchema,
  roleFitStrength: ProofStrengthSchema,
  credentialsAreThreshold: z.boolean(),
  proofFirstRecommended: z.boolean(),
  hybridStructureRecommended: z.boolean(),
  founderFramingMode: FounderFramingModeSchema,
  founderFramingGuidance: z.string().min(1),
  recommendedFocus: z.string().min(1),
  positioningWarnings: z.array(z.string()).max(8),
});

export type SectionSignals = z.infer<typeof SectionSignalsSchema>;

export const DefaultSectionSignals: SectionSignals = {
  candidateEvidenceLevel: "emerging",
  candidatePresentationStage: "unknown",
  candidateProfileType: "unknown",
  strongestProofType: "unclear",
  experienceStrength: "weak",
  projectStrength: "weak",
  educationStrength: "weak",
  certificationStrength: "weak",
  transferableStrength: "weak",
  roleFitStrength: "moderate",
  credentialsAreThreshold: false,
  proofFirstRecommended: false,
  hybridStructureRecommended: false,
  founderFramingMode: "neutral",
  founderFramingGuidance:
    "Use founder or builder framing only when it is truthful and clearly useful for the target role.",
  recommendedFocus: "Lead with truthful role fit and the strongest available proof.",
  positioningWarnings: [],
};

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

const OptionalStringSchema = z
  .union([z.string(), z.null()])
  .optional()
  .transform((value) => value ?? undefined);
const OptionalBooleanSchema = z
  .union([z.boolean(), z.null()])
  .optional()
  .transform((value) => value ?? undefined);
const OptionalCredentialTypeSchema = z
  .union([CareerProfileCredentialTypeSchema, z.null()])
  .optional()
  .transform((value) => value ?? undefined);
const OptionalLinkTypeSchema = z
  .union([CareerProfileLinkTypeSchema, z.null()])
  .optional()
  .transform((value) => value ?? undefined);
const OptionalMetadataSourceSchema = z
  .union([z.enum(["intake_import", "user_edited"]), z.null()])
  .optional()
  .transform((value) => value ?? undefined);

const CompactProfileLinkSchema = z.object({
  label: OptionalStringSchema,
  url: z.string().min(1),
  type: OptionalLinkTypeSchema,
});

export const CompactProfileImportSchema = z.object({
  basics: z.object({
    fullName: OptionalStringSchema,
    currentRole: OptionalStringSchema,
    location: OptionalStringSchema,
    phone: OptionalStringSchema,
    email: OptionalStringSchema,
  }),
  skills: z.array(z.string().min(1)).max(40),
  experiences: z.array(
    z.object({
      title: OptionalStringSchema,
      company: OptionalStringSchema,
      location: OptionalStringSchema,
      startDate: OptionalStringSchema,
      endDate: OptionalStringSchema,
      isCurrent: OptionalBooleanSchema,
      bullets: z.array(z.string().min(1)).max(5).optional().default([]),
      tools: z.array(z.string().min(1)).max(12).optional().default([]),
    })
  ).max(7),
  projects: z.array(
    z.object({
      name: OptionalStringSchema,
      description: OptionalStringSchema,
      bullets: z.array(z.string().min(1)).max(5).optional().default([]),
      tools: z.array(z.string().min(1)).max(12).optional().default([]),
      links: z.array(CompactProfileLinkSchema).max(5).optional().default([]),
    })
  ).max(7),
  education: z.array(
    z.object({
      institution: OptionalStringSchema,
      qualification: OptionalStringSchema,
      field: OptionalStringSchema,
      location: OptionalStringSchema,
      startDate: OptionalStringSchema,
      endDate: OptionalStringSchema,
      details: z.array(z.string().min(1)).max(8).optional().default([]),
    })
  ).max(5),
  credentials: z.array(
    z.object({
      name: OptionalStringSchema,
      issuer: OptionalStringSchema,
      type: OptionalCredentialTypeSchema,
      issueDate: OptionalStringSchema,
      expiryDate: OptionalStringSchema,
      credentialId: OptionalStringSchema,
      url: OptionalStringSchema,
    })
  ).max(12),
  links: z.array(CompactProfileLinkSchema).max(10),
  careerDetails: z.object({
    yearsOfExperience: OptionalStringSchema,
    targetRoles: z.array(z.string().min(1)).max(8).optional().default([]),
    industriesOfInterest: z.array(z.string().min(1)).max(8).optional().default([]),
    preferredLocations: z.array(z.string().min(1)).max(8).optional().default([]),
    openToRemote: OptionalBooleanSchema,
  }),
});

export type CompactProfileImport = z.infer<typeof CompactProfileImportSchema>;

export const StructuredCareerProfileSchema = z.object({
  basics: z.object({
    fullName: z.string(),
    currentRole: z.string(),
    location: OptionalStringSchema,
    phone: OptionalStringSchema,
    email: OptionalStringSchema,
    profileImageUrl: OptionalStringSchema,
  }),
  skills: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      category: OptionalStringSchema,
    })
  ),
  experiences: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      company: z.string().min(1),
      location: OptionalStringSchema,
      startDate: OptionalStringSchema,
      endDate: OptionalStringSchema,
      isCurrent: OptionalBooleanSchema,
      bullets: z.array(CareerProfileBulletSchema),
      tools: z.array(z.string()).optional(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      description: OptionalStringSchema,
      bullets: z.array(CareerProfileBulletSchema).optional(),
      tools: z.array(z.string()).optional(),
      links: z
        .array(
          z.object({
            id: z.string().min(1),
            label: OptionalStringSchema,
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
      field: OptionalStringSchema,
      location: OptionalStringSchema,
      startDate: OptionalStringSchema,
      endDate: OptionalStringSchema,
      details: z.array(z.string()).optional(),
    })
  ),
  credentials: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      issuer: OptionalStringSchema,
      type: OptionalCredentialTypeSchema,
      issueDate: OptionalStringSchema,
      expiryDate: OptionalStringSchema,
      credentialId: OptionalStringSchema,
      url: OptionalStringSchema,
    })
  ),
  links: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      url: z.string().min(1),
      type: OptionalLinkTypeSchema,
    })
  ),
  careerDetails: z.object({
    yearsOfExperience: OptionalStringSchema,
    targetRoles: z.array(z.string()).optional(),
    industriesOfInterest: z.array(z.string()).optional(),
    preferredLocations: z.array(z.string()).optional(),
    openToRemote: OptionalBooleanSchema,
  }),
  metadata: z.object({
    source: OptionalMetadataSourceSchema,
    createdAt: OptionalStringSchema,
    updatedAt: OptionalStringSchema,
  }),
});

const GapQuestionOutputSchema = z.object({
  question: z
    .string()
    .min(25)
    .max(220)
    .regex(/\?\s*$/, "Gap question must end with a question mark."),
  shortTitle: z.string().min(3).max(40),
  targetArea: z.string().min(1).max(120),
  priority: z.enum(["high", "medium"]),
});

export const IntakeGapOutputSchema = z.object({
  profile: CompactProfileImportSchema.nullable(),
  jobContext: JobContextSchema,
  sectionSignals: SectionSignalsSchema,
  gapQuestions: z.array(GapQuestionOutputSchema).max(3),
});

export type IntakeGapOutput = z.infer<typeof IntakeGapOutputSchema>;
export type JobContext = z.infer<typeof JobContextSchema>;
export type StructuredCareerProfile = z.infer<typeof StructuredCareerProfileSchema>;
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
  type: z.enum(["bullets", "inline"]),
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
  cv: StructuredCvDocumentSchema,
});

export type CvComposerOutput = z.infer<typeof CvComposerOutputSchema>;
export type CvBlueprint = z.infer<typeof CvBlueprintSchema>;

export const GapAnswerForComposerSchema = z.object({
  gapQuestionId: z.string(),
  question: z.string(),
  targetArea: z.string(),
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
      required: ["fullName", "currentRole", "location", "phone", "email", "profileImageUrl"],
      properties: {
        fullName: { type: "string" },
        currentRole: { type: "string" },
        location: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        email: { type: ["string", "null"] },
        profileImageUrl: { type: ["string", "null"] },
      },
    },
    skills: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "name", "category"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          category: { type: ["string", "null"] },
        },
      },
    },
    experiences: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "title",
          "company",
          "location",
          "startDate",
          "endDate",
          "isCurrent",
          "bullets",
          "tools",
        ],
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          company: { type: "string" },
          location: { type: ["string", "null"] },
          startDate: { type: ["string", "null"] },
          endDate: { type: ["string", "null"] },
          isCurrent: { type: ["boolean", "null"] },
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
        required: ["id", "name", "description", "bullets", "tools", "links"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: ["string", "null"] },
          bullets: { type: "array", items: careerProfileBulletJsonSchema },
          tools: stringArrayJsonSchema,
          links: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["id", "label", "url"],
              properties: {
                id: { type: "string" },
                label: { type: ["string", "null"] },
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
        required: [
          "id",
          "institution",
          "qualification",
          "field",
          "location",
          "startDate",
          "endDate",
          "details",
        ],
        properties: {
          id: { type: "string" },
          institution: { type: "string" },
          qualification: { type: "string" },
          field: { type: ["string", "null"] },
          location: { type: ["string", "null"] },
          startDate: { type: ["string", "null"] },
          endDate: { type: ["string", "null"] },
          details: stringArrayJsonSchema,
        },
      },
    },
    credentials: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "name",
          "issuer",
          "type",
          "issueDate",
          "expiryDate",
          "credentialId",
          "url",
        ],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          issuer: { type: ["string", "null"] },
          type: {
            type: ["string", "null"],
            enum: ["certification", "licence", "credential", "award", "other", null],
          },
          issueDate: { type: ["string", "null"] },
          expiryDate: { type: ["string", "null"] },
          credentialId: { type: ["string", "null"] },
          url: { type: ["string", "null"] },
        },
      },
    },
    links: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "label", "url", "type"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          url: { type: "string" },
          type: {
            type: ["string", "null"],
            enum: ["linkedin", "github", "portfolio", "kaggle", "medium", "website", "other", null],
          },
        },
      },
    },
    careerDetails: {
      type: "object",
      additionalProperties: false,
      required: [
        "yearsOfExperience",
        "targetRoles",
        "industriesOfInterest",
        "preferredLocations",
        "openToRemote",
      ],
      properties: {
        yearsOfExperience: { type: ["string", "null"] },
        targetRoles: stringArrayJsonSchema,
        industriesOfInterest: stringArrayJsonSchema,
        preferredLocations: stringArrayJsonSchema,
        openToRemote: { type: ["boolean", "null"] },
      },
    },
    metadata: {
      type: "object",
      additionalProperties: false,
      required: ["source", "createdAt", "updatedAt"],
      properties: {
        source: { type: ["string", "null"], enum: ["intake_import", "user_edited", null] },
        createdAt: { type: ["string", "null"] },
        updatedAt: { type: ["string", "null"] },
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

const compactProfileLinkJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["label", "url", "type"],
  properties: {
    label: { type: ["string", "null"] },
    url: { type: "string" },
    type: {
      type: ["string", "null"],
      enum: ["linkedin", "github", "portfolio", "kaggle", "medium", "website", "other", null],
    },
  },
} as const;

const compactProfileImportJsonSchema = {
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
  ],
  properties: {
    basics: {
      type: "object",
      additionalProperties: false,
      required: ["fullName", "currentRole", "location", "phone", "email"],
      properties: {
        fullName: { type: ["string", "null"] },
        currentRole: { type: ["string", "null"] },
        location: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        email: { type: ["string", "null"] },
      },
    },
    skills: boundedStringArrayJsonSchema(40),
    experiences: {
      type: "array",
      maxItems: 7,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "company", "location", "startDate", "endDate", "isCurrent", "bullets", "tools"],
        properties: {
          title: { type: ["string", "null"] },
          company: { type: ["string", "null"] },
          location: { type: ["string", "null"] },
          startDate: { type: ["string", "null"] },
          endDate: { type: ["string", "null"] },
          isCurrent: { type: ["boolean", "null"] },
          bullets: boundedStringArrayJsonSchema(5),
          tools: boundedStringArrayJsonSchema(12),
        },
      },
    },
    projects: {
      type: "array",
      maxItems: 7,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "description", "bullets", "tools", "links"],
        properties: {
          name: { type: ["string", "null"] },
          description: { type: ["string", "null"] },
          bullets: boundedStringArrayJsonSchema(5),
          tools: boundedStringArrayJsonSchema(12),
          links: { type: "array", maxItems: 5, items: compactProfileLinkJsonSchema },
        },
      },
    },
    education: {
      type: "array",
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["institution", "qualification", "field", "location", "startDate", "endDate", "details"],
        properties: {
          institution: { type: ["string", "null"] },
          qualification: { type: ["string", "null"] },
          field: { type: ["string", "null"] },
          location: { type: ["string", "null"] },
          startDate: { type: ["string", "null"] },
          endDate: { type: ["string", "null"] },
          details: boundedStringArrayJsonSchema(8),
        },
      },
    },
    credentials: {
      type: "array",
      maxItems: 12,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "issuer", "type", "issueDate", "expiryDate", "credentialId", "url"],
        properties: {
          name: { type: ["string", "null"] },
          issuer: { type: ["string", "null"] },
          type: {
            type: ["string", "null"],
            enum: ["certification", "licence", "credential", "award", "other", null],
          },
          issueDate: { type: ["string", "null"] },
          expiryDate: { type: ["string", "null"] },
          credentialId: { type: ["string", "null"] },
          url: { type: ["string", "null"] },
        },
      },
    },
    links: { type: "array", maxItems: 10, items: compactProfileLinkJsonSchema },
    careerDetails: {
      type: "object",
      additionalProperties: false,
      required: ["yearsOfExperience", "targetRoles", "industriesOfInterest", "preferredLocations", "openToRemote"],
      properties: {
        yearsOfExperience: { type: ["string", "null"] },
        targetRoles: boundedStringArrayJsonSchema(8),
        industriesOfInterest: boundedStringArrayJsonSchema(8),
        preferredLocations: boundedStringArrayJsonSchema(8),
        openToRemote: { type: ["boolean", "null"] },
      },
    },
  },
} as const;

const jobContextJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "roleTitle",
    "companyName",
    "marketOrLocation",
    "seniority",
    "roleFamily",
    "subRoleFamily",
    "roleSummary",
    "mustHaveRequirements",
    "responsibilities",
    "proofNeeds",
    "keywords",
    "risks",
    "exactPhrases",
  ],
  properties: {
    roleTitle: { type: ["string", "null"] },
    companyName: { type: ["string", "null"] },
    marketOrLocation: { type: ["string", "null"] },
    seniority: seniorityJsonSchema,
    roleFamily: { type: "string" },
    subRoleFamily: { type: ["string", "null"] },
    roleSummary: { type: "string" },
    mustHaveRequirements: boundedStringArrayJsonSchema(10),
    responsibilities: boundedStringArrayJsonSchema(8),
    proofNeeds: boundedStringArrayJsonSchema(8),
    keywords: boundedStringArrayJsonSchema(20),
    risks: boundedStringArrayJsonSchema(5),
    exactPhrases: boundedStringArrayJsonSchema(8),
  },
} as const;

const sectionSignalsJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "candidateEvidenceLevel",
    "candidatePresentationStage",
    "candidateProfileType",
    "strongestProofType",
    "experienceStrength",
    "projectStrength",
    "educationStrength",
    "certificationStrength",
    "transferableStrength",
    "roleFitStrength",
    "credentialsAreThreshold",
    "proofFirstRecommended",
    "hybridStructureRecommended",
    "founderFramingMode",
    "founderFramingGuidance",
    "recommendedFocus",
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
    experienceStrength: proofStrengthJsonSchema,
    projectStrength: proofStrengthJsonSchema,
    educationStrength: proofStrengthJsonSchema,
    certificationStrength: proofStrengthJsonSchema,
    transferableStrength: proofStrengthJsonSchema,
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
    positioningWarnings: boundedStringArrayJsonSchema(8),
  },
} as const;

export const AgentJsonSchemas = {
  intakeGap: {
    type: "object",
    additionalProperties: false,
    required: ["profile", "jobContext", "sectionSignals", "gapQuestions"],
    properties: {
      profile: {
        anyOf: [compactProfileImportJsonSchema, { type: "null" }],
      },
      jobContext: jobContextJsonSchema,
      sectionSignals: sectionSignalsJsonSchema,
      gapQuestions: {
        type: "array",
        maxItems: 3,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["question", "shortTitle", "targetArea", "priority"],
          properties: {
            question: {
              type: "string",
              minLength: 25,
              maxLength: 220,
              pattern: "\\?\\s*$",
            },
            shortTitle: { type: "string", minLength: 3, maxLength: 40 },
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
    required: ["cv"],
    properties: {
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
                  enum: ["bullets", "inline"],
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
