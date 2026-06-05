import type { CvComposerOutput, IntakeGapOutput } from "../cvSchemas";

export const MOCK_INTAKE_GAP_OUTPUT: IntakeGapOutput = {
  jobBrief: {
    targetRoleTitle: "AI Software Engineer",
    companyName: "PastureIQ",
    marketOrLocation: "Auckland, New Zealand",
    seniority: "graduate",
    archetype: "ai_ml_data_software",
    subArchetype: "ai-full-stack",
    roleSummary:
      "Early-career AI software role focused on building practical AI-enabled web products, integrating model APIs, improving reliability, and shipping user-facing software.",
    topPriorities: [
      "Can build and ship useful software",
      "Understands practical AI product development",
      "Can debug reliability and output-quality issues",
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
    cultureSignals: [
      "Curiosity shown through practical learning",
      "Ownership in ambiguous product work",
      "Product-minded care for useful outcomes",
    ],
    risks: [
      "Commercial usage and deployment scale are unclear from the CV text",
      "Candidate should not be positioned as senior without stronger evidence",
    ],
  },
  candidateBrief: {
    possibleHeadline: "Computer Science student building full-stack AI products",
    strongestEvidence: [
      "TaylorCV proves full-stack AI product development with structured model outputs",
      "ReviewMate supports customer-feedback analysis and schema-based AI workflows",
      "Original CV includes relevant Azure AI certification and scholarship detail",
    ],
    relevantSignals: [
      "TypeScript",
      "React",
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "OpenAI APIs",
      "Structured outputs",
      "Schema validation",
      "Azure AI certification",
      "Scholarship",
    ],
    missingOrWeakProof: [
      "Real usage, deployment, latency, cost and reliability evidence is not fully stated",
      "Stakeholder communication examples are not fully stated",
    ],
    usefulSections: ["Projects", "Education", "Certifications", "Skills"],
    warnings: [
      "Project evidence is stronger than formal employment history",
      "Avoid unsupported user counts or production-scale claims",
    ],
  },
  strategySignals: {
    candidateEvidenceLevel: "credible",
    candidatePresentationStage: "student",
    candidateProfileType: "technical_builder",
    strongestProofType: "projects",
    formalExperienceStrength: "weak",
    projectProofStrength: "strong",
    educationCredentialStrength: "moderate",
    certificationStrength: "moderate",
    transferableProofStrength: "moderate",
    roleFitStrength: "strong",
    credentialsAreThreshold: false,
    proofFirstRecommended: true,
    hybridStructureRecommended: true,
    founderFramingMode: "de_emphasise",
    founderFramingGuidance:
      "Prefer AI Product Engineer, Applied AI Engineer, or Independent Technical Project wording unless founder framing is explicitly useful.",
    recommendedFocus:
      "Lead with practical AI product proof, structured output reliability, and shipped full-stack implementation.",
    primaryFraming:
      "Early-career AI software candidate with strong independent product proof.",
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
      exampleAnswer:
        "I tested TaylorCV across multiple CVs, tightened schema validation, and reduced failed outputs during preview and export.",
      whyItMatters:
        "This would turn the AI project from a build claim into stronger engineering proof.",
      targetArea: "TaylorCV reliability and quality proof",
      priority: "high",
    },
    {
      question:
        "Did TaylorCV or ReviewMate have real users, reviewers, or stakeholders who shaped what you built?",
      shortTitle: "Real users",
      exampleAnswer:
        "A recruiter reviewed the workflow, asked for clearer proof sections, and that feedback changed how I structured the CV output.",
      whyItMatters:
        "This adds product and communication proof instead of making the work sound purely academic.",
      targetArea: "user and stakeholder relevance",
      priority: "medium",
    },
  ],
};

export const MOCK_CV_COMPOSER_OUTPUT: CvComposerOutput = {
  blueprint: {
    sectionOrder: [
      "summary",
      "selected-technical-achievements",
      "projects",
      "skills",
      "experience",
      "education",
    ],
    briefRationale:
      "Lead with role fit and strongest technical proof because project evidence is stronger than formal experience for this target role.",
    warnings: ["Do not position the candidate as senior", "Do not invent usage metrics"],
  },
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
          {
            text: "Validated AI-generated document data before storage, preview and export to keep outputs consistent.",
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
            text: "Built a CV tailoring workflow that saves raw job and CV text, asks targeted gap questions and generates structured CV JSON for preview, PDF and DOCX export.",
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
        details: [
          "Programming, mathematics, algorithms and software systems",
          "Faculty scholarship recipient",
        ],
      },
    ],
    certifications: [
      "Microsoft Azure AI Engineer Associate - Microsoft, 2026 - Passed with distinction",
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
