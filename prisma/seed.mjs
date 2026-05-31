import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const seedAnonymousSessionId = "seed-anonymous-session";
const seedApplicationId = "seed-application";
const seedJobId = "seed-job";
const seedProfileId = "seed-candidate-profile";

async function main() {
  await prisma.anonymousSession.upsert({
    where: { id: seedAnonymousSessionId },
    update: {},
    create: { id: seedAnonymousSessionId },
  });

  await prisma.application.upsert({
    where: { id: seedApplicationId },
    update: {
      anonymousSessionId: seedAnonymousSessionId,
      status: "candidate_added",
      currentStep: "candidate_added",
    },
    create: {
      id: seedApplicationId,
      anonymousSessionId: seedAnonymousSessionId,
      status: "candidate_added",
      currentStep: "candidate_added",
    },
  });

  await prisma.job.upsert({
    where: { applicationId: seedApplicationId },
    update: {
      rawText:
        "Build an AI application using OpenAI, PostgreSQL, Next.js, TypeScript, and deployment workflows.",
      title: "AI Application Engineer",
      company: "Taylor Labs",
      seniority: "Mid-level",
      summary:
        "A role building end-to-end AI applications with OpenAI, PostgreSQL, and full-stack TypeScript.",
      analysisJson: {
        targetRoleTitle: "AI Application Engineer",
        companyName: "Taylor Labs",
        market: "Auckland",
        seniority: "mid",
        archetype: "technical",
        subArchetype: null,
        roleSummary: "Build AI applications with OpenAI, PostgreSQL, and full-stack TypeScript.",
        mustHaveRequirements: ["OpenAI", "TypeScript", "Next.js"],
        niceToHaveRequirements: ["PostgreSQL", "deployment experience"],
        keywords: ["AI", "OpenAI", "TypeScript", "Next.js", "PostgreSQL"],
        recruiterPriorities: ["Technical depth", "Shipped products"],
        expectedProofTypes: ["Projects", "Technical skills"],
        recommendedSectionBias: ["projects", "skills", "experience"],
        risksOrAmbiguities: [],
      },
    },
    create: {
      id: seedJobId,
      applicationId: seedApplicationId,
      rawText:
        "Build an AI application using OpenAI, PostgreSQL, Next.js, TypeScript, and deployment workflows.",
      title: "AI Application Engineer",
      company: "Taylor Labs",
      seniority: "Mid-level",
      summary:
        "A role building end-to-end AI applications with OpenAI, PostgreSQL, and full-stack TypeScript.",
      analysisJson: {
        targetRoleTitle: "AI Application Engineer",
        companyName: "Taylor Labs",
        market: "Auckland",
        seniority: "mid",
        archetype: "technical",
        subArchetype: null,
        roleSummary: "Build AI applications with OpenAI, PostgreSQL, and full-stack TypeScript.",
        mustHaveRequirements: ["OpenAI", "TypeScript", "Next.js"],
        niceToHaveRequirements: ["PostgreSQL", "deployment experience"],
        keywords: ["AI", "OpenAI", "TypeScript", "Next.js", "PostgreSQL"],
        recruiterPriorities: ["Technical depth", "Shipped products"],
        expectedProofTypes: ["Projects", "Technical skills"],
        recommendedSectionBias: ["projects", "skills", "experience"],
        risksOrAmbiguities: [],
      },
    },
  });

  await prisma.candidateProfile.upsert({
    where: { id: seedProfileId },
    update: {
      summary:
        "Full-stack developer with practical OpenAI, PostgreSQL, Next.js, and TypeScript experience.",
      skillsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      projectsJson: [{ name: "RenovAI", tools: ["OpenAI", "Next.js"] }],
      educationJson: [],
      certificationsJson: [],
      experienceJson: [{ title: "Full-Stack Developer", organization: "TechCo" }],
      toolsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      achievementsJson: [],
      profileJson: {
        identity: {
          fullName: "Seed Candidate",
          currentTitle: "Full-Stack Developer",
          location: "Auckland",
          email: "seed@example.com",
          phone: null,
          linkedin: null,
          github: null,
          portfolio: null,
        },
        headlineOptions: ["Full-Stack AI Developer"],
        summaryFacts: [
          "3 years building full-stack TypeScript applications",
          "Experience with OpenAI APIs and PostgreSQL",
        ],
        experiences: [
          {
            title: "Full-Stack Developer",
            organization: "TechCo",
            location: "Auckland",
            startDate: "2022-01",
            endDate: null,
            descriptionFacts: ["Built internal tools and web applications"],
            achievementFacts: ["Reduced build times by 40%"],
            tools: ["Next.js", "TypeScript", "PostgreSQL"],
            metrics: [],
            proofNotes: [],
          },
        ],
        projects: [
          {
            name: "RenovAI",
            descriptionFacts: ["AI-powered renovation planning tool"],
            achievementFacts: ["Built end-to-end with OpenAI integration"],
            tools: ["OpenAI", "Next.js", "TypeScript"],
            metrics: [],
            links: [],
            proofNotes: [],
          },
        ],
        skillsByGroup: [
          { group: "Languages", skills: ["TypeScript", "JavaScript", "SQL"] },
          { group: "Frameworks", skills: ["Next.js", "React", "Node.js"] },
          { group: "AI/ML", skills: ["OpenAI"] },
        ],
        education: [],
        certifications: [],
        links: [],
        proofNotes: [],
        warnings: [],
      },
    },
    create: {
      id: seedProfileId,
      anonymousSessionId: seedAnonymousSessionId,
      sourceApplicationId: seedApplicationId,
      sourceType: "cv_upload",
      rawCvText: null,
      rawBackgroundText:
        "Built RenovAI with OpenAI, Next.js, TypeScript, and PostgreSQL.",
      summary:
        "Full-stack developer with practical OpenAI, PostgreSQL, Next.js, and TypeScript experience.",
      skillsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      projectsJson: [{ name: "RenovAI", tools: ["OpenAI", "Next.js"] }],
      educationJson: [],
      certificationsJson: [],
      experienceJson: [{ title: "Full-Stack Developer", organization: "TechCo" }],
      toolsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      achievementsJson: [],
      profileJson: {
        identity: {
          fullName: "Seed Candidate",
          currentTitle: "Full-Stack Developer",
          location: "Auckland",
          email: "seed@example.com",
          phone: null,
          linkedin: null,
          github: null,
          portfolio: null,
        },
        headlineOptions: ["Full-Stack AI Developer"],
        summaryFacts: [
          "3 years building full-stack TypeScript applications",
          "Experience with OpenAI APIs and PostgreSQL",
        ],
        experiences: [
          {
            title: "Full-Stack Developer",
            organization: "TechCo",
            location: "Auckland",
            startDate: "2022-01",
            endDate: null,
            descriptionFacts: ["Built internal tools and web applications"],
            achievementFacts: ["Reduced build times by 40%"],
            tools: ["Next.js", "TypeScript", "PostgreSQL"],
            metrics: [],
            proofNotes: [],
          },
        ],
        projects: [
          {
            name: "RenovAI",
            descriptionFacts: ["AI-powered renovation planning tool"],
            achievementFacts: ["Built end-to-end with OpenAI integration"],
            tools: ["OpenAI", "Next.js", "TypeScript"],
            metrics: [],
            links: [],
            proofNotes: [],
          },
        ],
        skillsByGroup: [
          { group: "Languages", skills: ["TypeScript", "JavaScript", "SQL"] },
          { group: "Frameworks", skills: ["Next.js", "React", "Node.js"] },
          { group: "AI/ML", skills: ["OpenAI"] },
        ],
        education: [],
        certifications: [],
        links: [],
        proofNotes: [],
        warnings: [],
      },
    },
  });

  console.log("Seed complete");
  console.log(`Anonymous session ID: ${seedAnonymousSessionId}`);
  console.log(`Application ID: ${seedApplicationId}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
