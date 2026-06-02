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

  const jobBrief = {
    targetRoleTitle: "AI Application Engineer",
    companyName: "Taylor Labs",
    marketOrLocation: "Auckland",
    seniority: "mid",
    archetype: "ai_ml_data_software",
    subArchetype: "full-stack-ai",
    roleSummary: "Build AI applications with OpenAI, PostgreSQL, and full-stack TypeScript.",
    topPriorities: ["Technical depth", "Shipped products"],
    proofNeeds: ["Projects", "Technical skills", "Deployment workflows"],
    keywords: ["AI", "OpenAI", "TypeScript", "Next.js", "PostgreSQL"],
    cultureSignals: ["Ownership", "Product-minded engineering"],
    risks: [],
  };

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
      analysisJson: { jobBrief },
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
      analysisJson: { jobBrief },
    },
  });

  const candidateBrief = {
    possibleHeadline: "Full-Stack AI Developer",
    strongestEvidence: [
      "Built RenovAI end-to-end with OpenAI integration",
      "Three years building full-stack TypeScript applications",
    ],
    relevantSignals: [
      "OpenAI",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "SQL",
      "React",
      "Node.js",
    ],
    missingOrWeakProof: ["More deployment and production-usage detail would strengthen the CV"],
    usefulSections: ["Projects", "Skills", "Experience"],
    warnings: [],
  };

  const deterministicBasics = {
    possibleName: "Seed Candidate",
    email: "seed@example.com",
    phone: null,
    linkedin: null,
    github: null,
    portfolio: null,
    otherUrls: [],
    sectionHeadings: ["Experience", "Projects", "Skills"],
  };

  await prisma.candidateProfile.upsert({
    where: { id: seedProfileId },
    update: {
      summary:
        "Full-stack developer with practical OpenAI, PostgreSQL, Next.js, and TypeScript experience.",
      skillsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      projectsJson: [],
      educationJson: [],
      certificationsJson: [],
      experienceJson: [],
      toolsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      achievementsJson: candidateBrief.strongestEvidence,
      profileJson: {
        candidateBrief,
        deterministicBasics,
      },
      contactInfoJson: {
        fullName: deterministicBasics.possibleName,
        professionalTitle: candidateBrief.possibleHeadline,
        location: "Auckland",
        email: deterministicBasics.email,
        phone: deterministicBasics.phone,
      },
      linksJson: {
        linkedin: deterministicBasics.linkedin,
        github: deterministicBasics.github,
        portfolio: deterministicBasics.portfolio,
        other: deterministicBasics.otherUrls,
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
      projectsJson: [],
      educationJson: [],
      certificationsJson: [],
      experienceJson: [],
      toolsJson: ["OpenAI", "PostgreSQL", "Next.js", "TypeScript"],
      achievementsJson: candidateBrief.strongestEvidence,
      profileJson: {
        candidateBrief,
        deterministicBasics,
      },
      contactInfoJson: {
        fullName: deterministicBasics.possibleName,
        professionalTitle: candidateBrief.possibleHeadline,
        location: "Auckland",
        email: deterministicBasics.email,
        phone: deterministicBasics.phone,
      },
      linksJson: {
        linkedin: deterministicBasics.linkedin,
        github: deterministicBasics.github,
        portfolio: deterministicBasics.portfolio,
        other: deterministicBasics.otherUrls,
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
