import type {
  CvComposerOutput,
  IntakeGapOutput,
} from "../cvSchemas";

export const MOCK_INTAKE_GAP_OUTPUT: IntakeGapOutput = {
  jobContext: {
    targetRoleTitle: "AI Software Engineer",
    companyName: "PastureIQ",
    marketOrLocation: "Auckland, New Zealand",
    seniority: "graduate",
    archetype: "technical",
    subArchetype: "ai-full-stack",
    roleSummary:
      "Early-career AI software role focused on building practical AI-enabled web products, integrating model APIs, improving reliability, and shipping user-facing software.",
    mustHaveRequirements: [
      "TypeScript or JavaScript development",
      "Full-stack web application experience",
      "Practical AI or machine-learning API work",
      "Debugging and ownership of technical delivery",
    ],
    niceToHaveRequirements: [
      "Python",
      "PostgreSQL",
      "Cloud deployment",
      "Latency, reliability, evaluation or cost-improvement work",
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
    recruiterPriorities: [
      "Can build and ship useful software",
      "Understands practical AI product development",
      "Can debug reliability and output-quality issues",
      "Can explain technical tradeoffs clearly",
    ],
    expectedProofTypes: [
      "Shipped projects or deployed products",
      "Specific technical stack and implementation detail",
      "AI API integration or structured model-output workflows",
      "Usage, stakeholder, latency, reliability, evaluation or cost context",
    ],
    culturalSignals: [
      "Curiosity shown through practical learning",
      "Ownership in ambiguous product work",
      "Clear communication with users or stakeholders",
      "Product-minded care for useful outcomes",
    ],
    risksOrAmbiguities: [
      "Commercial usage and deployment scale are unclear from the CV text",
      "Candidate should not be positioned as senior without stronger evidence",
    ],
  },
  candidateContext: {
    identity: {
      fullName: "Jordan Lee",
      currentTitle: "Computer Science Student and AI Software Builder",
      location: "Auckland, New Zealand",
      email: "jordan.lee@example.com",
      phone: "+64 21 555 0198",
      linkedin: "https://www.linkedin.com/in/jordanlee",
      github: "https://github.com/jordanlee",
      portfolio: "https://jordanlee.dev",
    },
    currentHeadline: "Computer Science student building full-stack AI products",
    summaryFacts: [
      "Builds full-stack applications with TypeScript, React, Next.js, Prisma and PostgreSQL",
      "Integrates OpenAI APIs into structured user-facing workflows",
      "Uses schema validation to keep generated document data renderer-ready",
    ],
    experiences: [
      {
        title: "Freelance Software Builder",
        organization: "Independent Projects",
        location: "Auckland, New Zealand",
        startDate: "2025-02",
        endDate: "Present",
        descriptionFacts: [
          "Built web application prototypes for CV generation, document workflows and AI-assisted writing",
          "Worked across product design, frontend, backend and database layers",
        ],
        achievementFacts: [
          "Created workflows that turn raw user input into structured, renderer-ready documents",
          "Validated model outputs before saving them to the database",
        ],
        tools: [
          "TypeScript",
          "Next.js",
          "React",
          "PostgreSQL",
          "Prisma",
          "OpenAI APIs",
        ],
        metrics: [],
        originalBullets: [
          "Created end-to-end workflows that turn raw user input into structured, renderer-ready documents",
          "Improved application reliability by validating model outputs before saving them to the database",
        ],
      },
    ],
    projects: [
      {
        name: "TaylorCV",
        descriptionFacts: [
          "AI-powered CV tailoring app that saves raw job and CV text, asks gap questions, and generates structured CV JSON",
          "Renderer exports preview, PDF and DOCX from the structured CV document",
        ],
        achievementFacts: [
          "Built a typed backend workflow using strict schemas and database persistence",
          "Reduced backend complexity by simplifying the AI pipeline around intake/gap questions and final CV composition",
          "Created renderer-compatible CV JSON for preview and export flows",
        ],
        tools: [
          "TypeScript",
          "Next.js",
          "Prisma",
          "PostgreSQL",
          "OpenAI Responses API",
          "Zod",
        ],
        metrics: [],
        links: ["https://github.com/jordanlee/taylorcv"],
        originalBullets: [
          "Built a structured-output backend architecture using typed schemas and database persistence",
          "Created renderer-compatible CV JSON for preview and export flows",
        ],
      },
      {
        name: "ReviewMate",
        descriptionFacts: [
          "AI-assisted review summarisation dashboard for turning customer feedback into themes, risks and action items",
        ],
        achievementFacts: [
          "Used prompt design and schema validation to separate sentiment, feature requests, complaints and urgent issues",
        ],
        tools: ["Python", "TypeScript", "React", "OpenAI APIs"],
        metrics: [],
        links: ["https://github.com/jordanlee/reviewmate"],
        originalBullets: [
          "Built a small dashboard for uploading review text and viewing structured summaries",
        ],
      },
    ],
    skillsByGroup: [
      { group: "Languages", skills: ["TypeScript", "JavaScript", "Python", "SQL"] },
      { group: "Frontend", skills: ["React", "Next.js", "Tailwind CSS"] },
      { group: "Backend and Data", skills: ["Node.js", "Prisma", "PostgreSQL"] },
      {
        group: "AI Engineering",
        skills: ["OpenAI APIs", "Structured outputs", "Prompt design", "Schema validation"],
      },
    ],
    education: [
      {
        institution: "University of Auckland",
        qualification: "Bachelor of Science in Computer Science and Mathematics",
        dates: "2025 - Present",
        details: ["Programming, mathematics, algorithms and software systems"],
        awardsOrScholarships: ["Faculty scholarship recipient"],
      },
    ],
    certifications: [
      {
        name: "Microsoft Azure AI Engineer Associate",
        issuer: "Microsoft",
        date: "2026",
        scoreOrDetail: "Passed with distinction",
        notes: ["Azure AI services, language processing, search and AI solution implementation"],
      },
    ],
    awardsOrScholarships: ["Faculty scholarship recipient"],
    links: [
      "https://github.com/jordanlee",
      "https://www.linkedin.com/in/jordanlee",
      "https://jordanlee.dev",
    ],
    notableEvidence: [
      "TaylorCV proves full-stack AI product development with structured model outputs",
      "ReviewMate supports customer-feedback analysis and schema-based AI workflows",
      "Original CV includes relevant Azure AI certification and scholarship detail",
    ],
    weakOrMissingAreas: [
      "Real usage, deployment, latency, cost and reliability evidence is not fully stated",
      "Stakeholder communication examples are not fully stated",
    ],
    sourceStructure: [
      {
        sectionName: "Projects",
        sectionOrder: 0,
        normalizedType: "projects",
        highSignal: true,
        usefulDetails: ["TaylorCV", "ReviewMate", "GitHub links"],
      },
      {
        sectionName: "Education",
        sectionOrder: 1,
        normalizedType: "education",
        highSignal: true,
        usefulDetails: ["Computer Science and Mathematics", "scholarship"],
      },
      {
        sectionName: "Certifications",
        sectionOrder: 2,
        normalizedType: "certifications",
        highSignal: true,
        usefulDetails: ["Azure AI Engineer Associate", "distinction"],
      },
    ],
    warnings: [
      "Project evidence is stronger than formal employment history",
      "Avoid unsupported user counts or production-scale claims",
    ],
  },
  gapQuestions: [
    {
      question:
        "Have you measured any latency, cost, reliability, or output-quality improvements in TaylorCV?",
      tinyExample:
        "For example, faster generation, lower token cost, fewer failed outputs, or reliability across multiple CVs.",
      whyItMatters:
        "This would turn the AI project from a build claim into stronger engineering proof.",
      answerGuidance:
        "A short honest note with numbers or concrete testing context is enough.",
      targetArea: "TaylorCV reliability and quality proof",
      priority: "high",
    },
    {
      question:
        "Have you explained TaylorCV or another technical project to a user, teammate, or non-technical person?",
      tinyExample:
        "For example, walking someone through a model result, product decision, or system tradeoff.",
      whyItMatters:
        "The job values communication, but the CV needs a real example rather than a personality claim.",
      answerGuidance:
        "Mention who it was for, what you explained, and what changed afterward.",
      targetArea: "communication and stakeholder proof",
      priority: "medium",
    },
  ],
};

export const MOCK_CV_COMPOSER_OUTPUT: CvComposerOutput = {
  blueprint: {
    archetype: "technical",
    seniority: "graduate",
    targetPositioning:
      "Early-career AI software engineer with strong project evidence in full-stack AI product development",
    sectionOrder: [
      "summary",
      "selected-technical-achievements",
      "projects",
      "skills",
      "experience",
      "education",
      "certifications",
    ],
    sectionReasons: [
      {
        section: "summary",
        reason: "Anchor the top third with role fit and strongest honest proof.",
      },
      {
        section: "selected-technical-achievements",
        reason: "Lead with technical proof because project evidence is stronger than formal experience.",
      },
      {
        section: "projects",
        reason: "Show implementation depth for the strongest AI systems.",
      },
      {
        section: "skills",
        reason: "Keep the stack easy to scan after proof is established.",
      },
      {
        section: "experience",
        reason: "Support the project-heavy top third with ongoing software-building context.",
      },
      {
        section: "education",
        reason: "Preserve relevant degree and scholarship proof for an early-career profile.",
      },
      {
        section: "certifications",
        reason: "Keep the AI credential visible without crowding stronger evidence.",
      },
    ],
    riskWarnings: [
      "Do not position the candidate as senior",
      "Do not invent usage metrics",
    ],
    omittedImportantDetails: [
      "No verified production usage or performance metrics were available",
      "No stronger formal employment history than the independent project work provided",
    ],
  },
  cv: {
    sectionOrder: [
      "summary",
      "selected-technical-achievements",
      "projects",
      "skills",
      "experience",
      "education",
      "certifications",
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
        role: "Freelance Software Builder",
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
          {
            text: "Simplified the backend around one intake/gap pass and one final composer pass, avoiding unnecessary scoring and retrieval complexity.",
            gapAnswerIds: [],
          },
        ],
      },
      {
        name: "ReviewMate",
        descriptor: "AI customer feedback summarisation tool",
        dates: "2025",
        bullets: [
          {
            text: "Built an AI-assisted dashboard that turns long-form customer feedback into structured themes, risks and action items.",
            gapAnswerIds: [],
          },
          {
            text: "Separated sentiment, complaints, feature requests and urgent issues using prompt design and schema validation.",
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
            text: "Connected raw source intake, gap-answer capture and CV composition into one preview-ready application flow.",
            gapAnswerIds: [],
          },
          {
            text: "Preserved links, certifications, education details and source CV hierarchy for the final composer instead of flattening evidence into a lossy blob.",
            gapAnswerIds: [],
          },
        ],
      },
    ],
    roleArchetype: "technical",
  },
};
