import type { CvComposerOutput, IntakeGapOutput } from "../cvSchemas";

export const MOCK_INTAKE_GAP_OUTPUT: IntakeGapOutput = {
  profile: {
    basics: {
      fullName: "Jordan Lee",
      currentRole: "Computer Science student building full-stack AI products",
      location: "Auckland, New Zealand",
      phone: "+64 21 555 0198",
      email: "jordan.lee@example.com",
    },
    skills: ["TypeScript", "Next.js", "React", "Prisma", "PostgreSQL", "OpenAI APIs", "Zod"],
    experiences: [
      {
        title: "Independent Software Engineer",
        company: "Independent Projects",
        location: "Auckland, New Zealand",
        startDate: "2025-02",
        isCurrent: true,
        bullets: [
          "Built full-stack AI application workflows across frontend, backend, database and structured model-output layers.",
        ],
        tools: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
      },
    ],
    projects: [
      {
        name: "TaylorCV",
        description: "AI CV tailoring platform",
        bullets: [
          "Built a CV tailoring workflow that asks targeted gap questions and generates structured CV JSON for preview, PDF and DOCX export.",
        ],
        tools: ["TypeScript", "Next.js", "OpenAI APIs", "Zod"],
        links: [],
      },
    ],
    education: [
      {
        institution: "University of Auckland",
        qualification: "BSc",
        field: "Computer Science and Mathematics",
        location: "Auckland, New Zealand",
        startDate: "2025",
        details: ["Faculty scholarship recipient"],
      },
    ],
    credentials: [
      {
        name: "Microsoft Azure AI Engineer Associate",
        issuer: "Microsoft",
        type: "certification",
        issueDate: "2026",
      },
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/jordanlee",
        type: "linkedin",
      },
      {
        label: "GitHub",
        url: "https://github.com/jordanlee",
        type: "github",
      },
    ],
    careerDetails: {
      yearsOfExperience: "1+",
      targetRoles: ["AI Software Engineer"],
      industriesOfInterest: ["AI", "SaaS"],
      preferredLocations: ["Auckland", "Remote"],
      openToRemote: true,
    },
  },
  jobContext: {
    roleTitle: "AI Software Engineer",
    companyName: "PastureIQ",
    marketOrLocation: "Auckland, New Zealand",
    seniority: "graduate",
    roleFamily: "ai_ml_data_software",
    subRoleFamily: "ai-full-stack",
    roleSummary:
      "Early-career AI software role focused on building practical AI-enabled web products, integrating model APIs, improving reliability, and shipping user-facing software.",
    mustHaveRequirements: [
      "Build and ship useful software",
      "Work with practical AI product development",
      "Debug reliability and output-quality issues",
    ],
    responsibilities: [
      "Build user-facing AI product features",
      "Integrate model APIs into production workflows",
      "Improve reliability of structured outputs",
    ],
    proofNeeds: [
      "Shipped projects or deployed products",
      "Specific technical stack and implementation detail",
      "Usage, stakeholder, latency, reliability, evaluation or cost context",
    ],
    keywords: [
      "AI software engineer",
      "TypeScript",
      "React",
      "Next.js",
      "PostgreSQL",
      "LLM applications",
      "API integration",
      "reliability",
    ],
    risks: [
      "Commercial usage and deployment scale are unclear from the CV text",
      "Candidate should not be positioned as senior without stronger evidence",
    ],
    exactPhrases: ["AI software engineer", "LLM applications", "API integration"],
  },
  sectionSignals: {
    candidateEvidenceLevel: "credible",
    candidatePresentationStage: "student",
    candidateProfileType: "technical_builder",
    strongestProofType: "projects",
    experienceStrength: "weak",
    projectStrength: "strong",
    educationStrength: "moderate",
    certificationStrength: "moderate",
    transferableStrength: "moderate",
    roleFitStrength: "strong",
    credentialsAreThreshold: false,
    proofFirstRecommended: true,
    hybridStructureRecommended: true,
    founderFramingMode: "de_emphasise",
    founderFramingGuidance:
      "Prefer AI Product Engineer, Applied AI Engineer, or Independent Technical Project wording unless founder framing is explicitly useful.",
    recommendedFocus:
      "Lead with practical AI product proof, structured output reliability, and shipped full-stack implementation.",
    positioningWarnings: [
      "Do not overclaim seniority",
      "Do not use founder framing as the main identity for a normal employee role",
    ],
  },
  gapQuestions: [
    {
      question:
        "What testing, deployment, latency, cost, reliability, or output-quality evidence can you point to from TaylorCV?",
      shortTitle: "Measured results",
      targetArea: "TaylorCV reliability and quality proof",
      priority: "high",
    },
    {
      question:
        "Did TaylorCV or ReviewMate have real users, reviewers, or stakeholders who shaped what you built?",
      shortTitle: "Real users",
      targetArea: "user and stakeholder relevance",
      priority: "medium",
    },
  ],
};

export const MOCK_CV_COMPOSER_OUTPUT: CvComposerOutput = {
  cv: {
    sectionOrder: [
      "summary",
      "selected-technical-achievements",
      "projects",
      "skills",
      "experience",
      "education",
    ],
    header: {
      name: "Jordan Lee",
      targetTitle: "AI Software Engineer | Full-Stack AI Products | TypeScript & Python",
      location: "Auckland, New Zealand",
      phone: "+64 21 555 0198",
      email: "jordan.lee@example.com",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/jordanlee", linkType: null },
        { label: "GitHub", url: "https://github.com/jordanlee", linkType: null },
      ],
    },
    summary:
      "Computer Science and Mathematics student building practical full-stack AI products with TypeScript, Next.js, Prisma, PostgreSQL and OpenAI APIs. Strongest proof is TaylorCV: an AI CV workflow that saves raw job/CV context, asks targeted gap questions and generates structured renderer-ready CV documents.",
    skills: {
      groups: [
        { group: "Languages", skills: ["TypeScript", "JavaScript", "Python", "SQL"] },
        { group: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"] },
        { group: "Backend and Data", skills: ["Node.js", "Prisma", "PostgreSQL"] },
        {
          group: "AI Engineering",
          skills: ["OpenAI APIs", "Structured outputs", "Prompt design", "Schema validation"],
        },
      ],
    },
    experience: [
      {
        role: "Independent Software Engineer",
        company: "Independent Projects",
        location: "Auckland, New Zealand",
        dates: "Feb 2025 - Present",
        startDate: "2025-02",
        endDate: null,
        bullets: [
          {
            text: "Built full-stack AI application workflows across frontend, backend, database and structured model-output layers.",
            gapAnswerIds: [],
          },
        ],
      },
    ],
    projects: [
      {
        name: "TaylorCV",
        descriptor: "AI CV tailoring platform",
        dates: "2026",
        bullets: [
          {
            text: "Built a CV tailoring workflow that saves job and CV context, asks targeted gap questions and generates structured CV JSON for preview, PDF and DOCX export.",
            gapAnswerIds: [],
          },
          {
            text: "Used TypeScript, Next.js, Prisma, PostgreSQL, Zod and OpenAI structured outputs to persist validated CV data for deterministic rendering.",
            gapAnswerIds: [],
          },
        ],
      },
    ],
    education: [
      {
        institution: "University of Auckland",
        degree: "BSc Computer Science and Mathematics",
        dates: "2025 - Present",
        details: ["Programming, mathematics, algorithms and software systems"],
      },
    ],
    certifications: [
      "Microsoft Azure AI Engineer Associate - Microsoft, 2026",
    ],
    sections: [
      {
        id: "selected-technical-achievements",
        label: "Selected Technical Achievements",
        type: "bullets",
        priority: "primary",
        items: [
          {
            text: "Built schema-first AI workflows where model output is validated before storage or rendering.",
            gapAnswerIds: [],
          },
          {
            text: "Created renderer-compatible CV JSON for preview and export across PDF and DOCX flows.",
            gapAnswerIds: [],
          },
        ],
      },
    ],
    roleArchetype: "ai_ml_data_software",
  },
};
