import type {
  CandidateProfileGapOutput,
  CvComposerOutput,
  JobAnalysis,
} from "../cvSchemas";

export const MOCK_JOB_ANALYSIS: JobAnalysis = {
  targetRoleTitle: "AI Software Engineer",
  companyName: "PastureIQ",
  market: "New Zealand agri-tech",
  seniority: "graduate",
  archetype: "technical",
  subArchetype: "ai-full-stack",
  roleSummary:
    "AI software engineering role focused on building practical AI-enabled web products, integrating model APIs, improving reliability, and shipping user-facing software in a small technical team.",
  mustHaveRequirements: [
    "Strong TypeScript or JavaScript skills",
    "Experience building full-stack web applications",
    "Ability to work with AI or machine learning APIs",
    "Clear communication and ownership of technical work",
    "Comfort debugging production-style software issues",
  ],
  niceToHaveRequirements: [
    "Experience with Python",
    "Experience with PostgreSQL",
    "Experience with cloud deployment",
    "Experience with evaluation, latency, reliability or cost constraints",
    "Interest in agriculture, field operations or real-world industry software",
  ],
  keywords: [
    "AI software engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "LLM applications",
    "API integration",
    "production systems",
    "reliability",
    "startup environment",
  ],
  recruiterPriorities: [
    "Can build and ship working software",
    "Understands practical AI product development",
    "Shows evidence of ownership, debugging and iteration",
    "Can communicate technical decisions clearly",
    "Has credible projects or work showing role-relevant ability",
  ],
  expectedProofTypes: [
    "Shipped projects or deployed products",
    "Technical stack and implementation detail",
    "Evidence of AI API integration or ML workflows",
    "Examples of debugging, reliability, latency or cost improvements",
    "User, customer, stakeholder or usage context",
  ],
  recommendedSectionBias: [
    "summary",
    "selected technical achievements",
    "projects",
    "skills",
    "experience",
    "education",
    "certifications",
  ],
  risksOrAmbiguities: [
    "Exact team structure is unclear",
    "Seniority expectations may depend on project depth and interview performance",
    "The role values practical shipped proof more than generic AI interest",
  ],
};

export const MOCK_CANDIDATE_PROFILE_GAP: CandidateProfileGapOutput = {
  candidateProfile: {
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
    headlineOptions: [
      "AI Software Engineer focused on practical full-stack AI products",
      "Computer Science student building production-style AI web applications",
      "Full-stack developer with AI API, TypeScript and product-building experience",
    ],
    summaryFacts: [
      "Builds full-stack web applications using TypeScript, React, Next.js and PostgreSQL",
      "Has practical experience integrating AI APIs into user-facing workflows",
      "Interested in shipping reliable AI software for real-world business use cases",
      "Comfortable turning ambiguous product ideas into working prototypes",
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
          "Implemented backend routes, database models and structured AI outputs",
          "Worked across product design, frontend implementation and backend orchestration",
        ],
        achievementFacts: [
          "Created end-to-end workflows that turn raw user input into structured, renderer-ready documents",
          "Improved application reliability by validating model outputs before saving them to the database",
        ],
        tools: [
          "TypeScript",
          "Next.js",
          "React",
          "PostgreSQL",
          "Prisma",
          "OpenAI APIs",
          "Tailwind CSS",
        ],
        metrics: [],
        proofNotes: [
          "Strongest evidence is project-based rather than company-based",
          "Good fit for early-career AI software roles if project depth is clearly shown",
        ],
      },
    ],
    projects: [
      {
        name: "TaylorCV",
        descriptionFacts: [
          "AI-powered CV tailoring app that parses job descriptions, extracts candidate profiles, asks targeted gap questions and generates structured CV documents",
          "Designed a multi-step workflow from job analysis to candidate profiling, gap answer capture and final CV composition",
        ],
        achievementFacts: [
          "Built a structured-output backend architecture using typed schemas and database persistence",
          "Separated AI responsibilities into focused agents for job analysis, candidate profiling and CV composition",
          "Created renderer-compatible CV JSON for preview and export flows",
        ],
        tools: [
          "TypeScript",
          "Next.js",
          "Prisma",
          "PostgreSQL",
          "OpenAI Responses API",
          "Zod",
          "Tailwind CSS",
        ],
        metrics: [],
        links: ["https://github.com/jordanlee/taylorcv"],
        proofNotes: [
          "Best project to emphasise for AI software roles",
          "Shows product thinking, backend architecture and structured AI output handling",
        ],
      },
      {
        name: "ReviewMate",
        descriptionFacts: [
          "AI-assisted review summarisation tool for turning long customer feedback into themes, risks and action items",
          "Built a small dashboard for uploading review text and viewing structured summaries",
        ],
        achievementFacts: [
          "Used schema validation to keep generated summaries consistent",
          "Designed prompts to separate sentiment, feature requests, complaints and urgent issues",
        ],
        tools: ["Python", "TypeScript", "React", "OpenAI APIs"],
        metrics: [],
        links: ["https://github.com/jordanlee/reviewmate"],
        proofNotes: [
          "Useful supporting project for AI workflow and product judgement",
        ],
      },
    ],
    skillsByGroup: [
      {
        group: "Languages",
        skills: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        group: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
      },
      {
        group: "Backend and Data",
        skills: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"],
      },
      {
        group: "AI Engineering",
        skills: [
          "OpenAI APIs",
          "Structured outputs",
          "Prompt design",
          "Schema validation",
          "AI workflow design",
        ],
      },
    ],
    education: [
      {
        institution: "University of Auckland",
        qualification:
          "Bachelor of Science in Computer Science and Mathematics",
        dates: "2025 - Present",
        notes: [
          "Relevant study in programming, mathematics, algorithms and software systems",
        ],
      },
    ],
    certifications: [
      {
        name: "Microsoft Azure AI Engineer Associate",
        issuer: "Microsoft",
        date: "2026",
        notes: [
          "Covers Azure AI services, language processing, search and AI solution implementation",
        ],
      },
    ],
    links: [
      "https://github.com/jordanlee",
      "https://www.linkedin.com/in/jordanlee",
      "https://jordanlee.dev",
    ],
    proofNotes: [
      "Candidate is strongest when positioned as early-career but unusually practical",
      "Projects should be framed as shipped product systems, not school exercises",
      "Avoid overstating seniority or commercial production scale unless provided by user",
    ],
    warnings: [
      "Company employment history is limited, so project evidence must carry the CV",
      "Exact user counts, deployment details and performance metrics are not fully known",
    ],
  },
  gapQuestions: [
    {
      question:
        "For TaylorCV, do you have any real usage, deployment, latency, cost, evaluation or reliability details we can mention?",
      targetArea: "TaylorCV project impact",
      whyItMatters:
        "AI software roles value proof that the project works beyond a demo, especially around reliability, speed, cost and real users.",
      answerGuidance:
        "Examples: deployed on Vercel, tested by 5 users, reduced generation time, added schema validation, fixed failed model outputs, or handled PDF/DOCX export reliably.",
      expectedAnswerType: "deployment",
      priority: "high",
    },
    {
      question:
        "Which part of the AI workflow did you personally design or debug end-to-end?",
      targetArea: "technical ownership",
      whyItMatters:
        "Recruiters need to see your personal contribution, not just that the project exists.",
      answerGuidance:
        "Mention specific ownership such as schema design, agent orchestration, prompt design, database persistence, renderer compatibility or error handling.",
      expectedAnswerType: "project_detail",
      priority: "high",
    },
  ],
};

export const MOCK_CV_COMPOSER_OUTPUT: CvComposerOutput = {
  blueprint: {
    archetype: "technical",
    targetPositioning:
      "Early-career AI software engineer with strong project-based evidence in full-stack AI product development",
    sectionOrder: [
      "summary",
      "selected-technical-achievements",
      "projects",
      "skills",
      "experience",
      "education",
      "certifications",
    ],
    contentPriorities: [
      "Show practical AI product-building ability early",
      "Make TaylorCV the main proof point",
      "Highlight TypeScript, Next.js, Prisma, PostgreSQL and structured AI output experience",
      "Avoid overstating seniority or commercial production scale",
    ],
    contentToCut: [
      "Generic claims about passion or teamwork",
      "Unsupported metrics",
      "Long explanations of coursework",
    ],
    tone: "Clear, practical, technical and credible",
    spaceBudget: [
      "Keep the summary concise and proof-led so the top third clarifies role fit immediately",
      "Use a short selected achievements section only because it adds stronger technical proof than another supporting section would",
      "Give most space to TaylorCV and the strongest supporting project evidence",
      "Keep skills grouped and scan-friendly without crowding out project proof",
    ],
    riskWarnings: [
      "Candidate should not be positioned as a senior engineer",
      "Metrics should only be used where supplied",
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
      targetTitle:
        "AI Software Engineer | Full-Stack AI Products | TypeScript & Python",
      location: "Auckland, New Zealand",
      phone: "+64 21 555 0198",
      email: "jordan.lee@example.com",
      links: [
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/in/jordanlee",
          linkType: null,
        },
        {
          label: "GitHub",
          url: "https://github.com/jordanlee",
          linkType: null,
        },
      ],
    },
    summary:
      "Computer Science and Mathematics student building practical full-stack AI products with TypeScript, Next.js, Prisma, PostgreSQL and OpenAI APIs. Strongest proof is TaylorCV: an end-to-end CV tailoring workflow that converts job descriptions, candidate profiles and gap answers into structured renderer-ready CV documents.",
    skills: {
      groups: [
        {
          group: "Languages",
          skills: ["TypeScript", "JavaScript", "Python", "SQL"],
        },
        {
          group: "Frontend",
          skills: ["React", "Next.js", "Tailwind CSS"],
        },
        {
          group: "Backend and Data",
          skills: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"],
        },
        {
          group: "AI Engineering",
          skills: [
            "OpenAI APIs",
            "Structured outputs",
            "Prompt design",
            "Schema validation",
            "AI workflow orchestration",
          ],
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
            text: "Implemented typed schemas and validation paths to keep AI-generated document data consistent before rendering or export.",
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
            text: "Built a multi-step AI workflow that parses job descriptions, extracts candidate profiles, asks targeted gap questions and generates structured CV documents for preview/export.",
            gapAnswerIds: [],
          },
          {
            text: "Designed the backend around focused agents for job intake, candidate profiling and CV composition, reducing unnecessary scoring and retrieval complexity.",
            gapAnswerIds: [],
          },
          {
            text: "Used TypeScript, Next.js, Prisma, PostgreSQL, Zod and OpenAI structured outputs to persist validated CV data for a renderer-driven export pipeline.",
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
            text: "Built a small AI-assisted dashboard that turns long-form customer feedback into structured themes, risks and action items.",
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
          "Relevant study in programming, mathematics, algorithms and software systems",
        ],
      },
    ],
    certifications: ["Microsoft Azure AI Engineer Associate — Microsoft, 2026"],
    sections: [
      {
        id: "selected-technical-achievements",
        label: "Selected Technical Achievements",
        type: "bullets",
        priority: "primary",
        items: [
          {
            text: "Built schema-first AI workflows where model output is validated before being stored or rendered.",
            gapAnswerIds: [],
          },
          {
            text: "Designed product flows that keep AI agents focused on narrow responsibilities instead of one large generic prompt.",
            gapAnswerIds: [],
          },
          {
            text: "Connected job analysis, candidate profiling, gap-answer capture and CV composition into one end-to-end application flow.",
            gapAnswerIds: [],
          },
        ],
      },
    ],
    roleArchetype: "technical",
  },
};
