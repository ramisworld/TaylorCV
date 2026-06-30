import { z } from "zod";

export const SenioritySchema = z.enum([
  "intern",
  "junior",
  "intermediate",
  "senior",
  "research",
]);

export type Seniority = z.infer<typeof SenioritySchema>;

const PrioritySchema = z.number().int().min(1).max(99);

const LinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const SkillGroupSchema = z.object({
  group: z.string(),
  skills: z.array(z.string()).default([]),
});

export const ProfileExtractSchema = z.object({
  basics: z.object({
    fullName: z.string().min(1),
    currentTitle: z.string().optional(),
    location: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    links: z.array(LinkSchema).default([]),
  }),
  about: z
    .object({
      summary: z.string().optional(),
      extraInfo: z.string().optional(),
      targetRoles: z.array(z.string()).default([]),
      availability: z.string().optional(),
      workRights: z.string().optional(),
    })
    .default({ targetRoles: [] }),
  seniority: SenioritySchema,
  experience: z
    .array(
      z.object({
        role: z.string(),
        company: z.string(),
        location: z.string().optional(),
        dates: z.string().optional(),
        bullets: z.array(z.string()).default([]),
        tools: z.array(z.string()).default([]),
        employmentType: z.enum(["paid", "internship", "contract", "self_employed", "project"]).optional(),
        links: z.array(LinkSchema).default([]),
      })
    )
    .default([]),
  projects: z
    .array(
      z.object({
        name: z.string(),
        descriptor: z.string().optional(),
        dates: z.string().optional(),
        bullets: z.array(z.string()).default([]),
        tools: z.array(z.string()).default([]),
        links: z.array(LinkSchema).default([]),
      })
    )
    .default([]),
  skills: z.array(z.string()).default([]),
  skillGroups: z.array(SkillGroupSchema).default([]),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string().optional(),
        dates: z.string().optional(),
        details: z.array(z.string()).default([]),
      })
    )
    .default([]),
  certifications: z.array(z.string()).default([]),
  metrics: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  evidenceNotes: z.array(z.string()).default([]),
  preferences: z
    .object({
      roleTypes: z.array(z.string()).default([]),
      industries: z.array(z.string()).default([]),
      locations: z.array(z.string()).default([]),
      exclusions: z.array(z.string()).default([]),
    })
    .default({ roleTypes: [], industries: [], locations: [], exclusions: [] }),
});

export type ProfileExtract = z.infer<typeof ProfileExtractSchema>;
export const CandidateVaultSchema = ProfileExtractSchema;
export type CandidateVault = ProfileExtract;

export const JobAnalyzeSchema = z.object({
  targetRole: z.string().min(1),
  company: z.string().optional(),
  senioritySignal: SenioritySchema.optional(),
  mustHaveSkills: z.array(z.string()).default([]),
  niceToHaveSkills: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  proofNeeds: z.array(z.string()).default([]),
  recruiterPriorities: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
});

export type JobAnalyze = z.infer<typeof JobAnalyzeSchema>;

export const QuestionsSchema = z.object({
  matchScore: z.number().int().min(0).max(100),
  questions: z
    .array(
      z.object({
        id: z.string(),
        question: z.string(),
        whyItMatters: z.string(),
      })
    )
    .max(3),
});

export type QuestionsOutput = z.infer<typeof QuestionsSchema>;

const CvBulletSchema = z.object({
  text: z.string().min(1),
  priorityRank: PrioritySchema,
  evidenceRefs: z.array(z.string()).default([]),
});

const CvExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  location: z.string().optional(),
  dates: z.string().optional(),
  priorityRank: PrioritySchema,
  bullets: z.array(CvBulletSchema).min(1).max(6),
});

const CvProjectSchema = z.object({
  name: z.string(),
  descriptor: z.string().optional(),
  dates: z.string().optional(),
  priorityRank: PrioritySchema,
  bullets: z.array(CvBulletSchema).min(1).max(6),
});

export const FinalCvSchema = z.object({
  header: z.object({
    name: z.string(),
    targetTitle: z.string(),
    location: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
  }),
  sectionOrder: z.array(z.string()).min(3),
  summary: z
    .object({
      text: z.string().default(""),
      display: z.enum(["section", "lede", "omit"]).default("section"),
      priorityRank: PrioritySchema.default(1),
    })
    .default({ text: "", display: "omit", priorityRank: 1 }),
  experience: z.array(CvExperienceSchema).max(3).default([]),
  projects: z.array(CvProjectSchema).max(3).default([]),
  skills: z
    .array(
      z.object({
        group: z.string(),
        skills: z.array(z.string()).min(1),
        priorityRank: PrioritySchema,
      })
    )
    .default([]),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string().optional(),
        dates: z.string().optional(),
        details: z.array(z.string()).default([]),
        priorityRank: PrioritySchema,
      })
    )
    .default([]),
  certifications: z
    .array(
      z.object({
        text: z.string(),
        priorityRank: PrioritySchema,
      })
    )
    .default([]),
  publications: z
    .array(
      z.object({
        text: z.string(),
        priorityRank: PrioritySchema,
      })
    )
    .default([]),
  warnings: z.array(z.string()).default([]),
});

export type FinalCv = z.infer<typeof FinalCvSchema>;
