import "server-only";

import { Prisma } from "../../../generated/prisma/index.js";

import { db } from "~/server/db";
import {
  StructuredCareerProfileSchema,
  type CandidateBrief,
  type DeterministicCandidateBasics,
  type StructuredCareerProfile,
} from "./cvSchemas";

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function optionalText(value: unknown) {
  const normalized = text(value);
  return normalized || undefined;
}

function id(prefix: string, value: string, index: number) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `${prefix}-${slug || index + 1}`;
}

function strings(values: unknown, max = 30) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map((value) => text(value)).filter(Boolean))].slice(0, max);
}

export function parseStructuredCareerProfile(value: unknown) {
  const result = StructuredCareerProfileSchema.safeParse(value);
  return result.success ? result.data : null;
}

export function profileJsonStructuredCareerProfile(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return parseStructuredCareerProfile(
    (value as { structuredCareerProfile?: unknown }).structuredCareerProfile
  );
}

export function emptyStructuredCareerProfile(args: {
  name?: string | null;
  email?: string | null;
}): StructuredCareerProfile {
  return {
    basics: {
      fullName: args.name?.trim() ?? "",
      currentRole: "",
      email: args.email?.trim() || undefined,
    },
    skills: [],
    experiences: [],
    projects: [],
    education: [],
    credentials: [],
    links: [],
    careerDetails: {},
    metadata: {
      source: "user_edited",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

export function normalizeStructuredCareerProfile(
  profile: StructuredCareerProfile,
  source: "intake_import" | "user_edited" = "user_edited"
): StructuredCareerProfile {
  const now = new Date().toISOString();
  const normalized: StructuredCareerProfile = {
    basics: {
      fullName: text(profile.basics.fullName),
      currentRole: text(profile.basics.currentRole),
      location: optionalText(profile.basics.location),
      phone: optionalText(profile.basics.phone),
      email: optionalText(profile.basics.email),
      profileImageUrl: optionalText(profile.basics.profileImageUrl),
    },
    skills: profile.skills
      .map((skill, index) => ({
        id: text(skill.id) || id("skill", skill.name, index),
        name: text(skill.name),
        category: optionalText(skill.category),
      }))
      .filter((skill) => skill.name),
    experiences: profile.experiences
      .map((experience, index) => ({
        id: text(experience.id) || id("exp", `${experience.title}-${experience.company}`, index),
        title: text(experience.title),
        company: text(experience.company),
        location: optionalText(experience.location),
        startDate: optionalText(experience.startDate),
        endDate: optionalText(experience.endDate),
        isCurrent: experience.isCurrent || undefined,
        bullets: experience.bullets
          .map((bullet, bulletIndex) => ({
            id: text(bullet.id) || id("bullet", bullet.text, bulletIndex),
            text: text(bullet.text),
          }))
          .filter((bullet) => bullet.text),
        tools: strings(experience.tools),
      }))
      .filter((experience) => experience.title && experience.company),
    projects: profile.projects
      .map((project, index) => ({
        id: text(project.id) || id("project", project.name, index),
        name: text(project.name),
        description: optionalText(project.description),
        bullets: (project.bullets ?? [])
          .map((bullet, bulletIndex) => ({
            id: text(bullet.id) || id("bullet", bullet.text, bulletIndex),
            text: text(bullet.text),
          }))
          .filter((bullet) => bullet.text),
        tools: strings(project.tools),
        links: (project.links ?? [])
          .map((link, linkIndex) => ({
            id: text(link.id) || id("link", link.url, linkIndex),
            label: optionalText(link.label),
            url: text(link.url),
          }))
          .filter((link) => link.url),
      }))
      .filter((project) => project.name),
    education: profile.education
      .map((education, index) => ({
        id: text(education.id) || id("edu", `${education.qualification}-${education.institution}`, index),
        institution: text(education.institution),
        qualification: text(education.qualification),
        field: optionalText(education.field),
        location: optionalText(education.location),
        startDate: optionalText(education.startDate),
        endDate: optionalText(education.endDate),
        details: strings(education.details),
      }))
      .filter((education) => education.institution && education.qualification),
    credentials: profile.credentials
      .map((credential, index) => ({
        id: text(credential.id) || id("cred", credential.name, index),
        name: text(credential.name),
        issuer: optionalText(credential.issuer),
        type: credential.type,
        issueDate: optionalText(credential.issueDate),
        expiryDate: optionalText(credential.expiryDate),
        credentialId: optionalText(credential.credentialId),
        url: optionalText(credential.url),
      }))
      .filter((credential) => credential.name),
    links: profile.links
      .map((link, index) => ({
        id: text(link.id) || id("link", link.url, index),
        label: text(link.label),
        url: text(link.url),
        type: link.type,
      }))
      .filter((link) => link.label && link.url),
    careerDetails: {
      yearsOfExperience: optionalText(profile.careerDetails.yearsOfExperience),
      targetRoles: strings(profile.careerDetails.targetRoles),
      industriesOfInterest: strings(profile.careerDetails.industriesOfInterest),
      preferredLocations: strings(profile.careerDetails.preferredLocations),
      openToRemote: profile.careerDetails.openToRemote,
    },
    metadata: {
      source,
      createdAt: profile.metadata.createdAt ?? now,
      updatedAt: now,
    },
  };

  return StructuredCareerProfileSchema.parse(normalized);
}

export function buildStructuredProfileFromLegacy(args: {
  candidateBrief: CandidateBrief;
  deterministicBasics: DeterministicCandidateBasics;
}): StructuredCareerProfile {
  const basics = args.deterministicBasics;
  const skills = args.candidateBrief.relevantSignals.map((skill, index) => ({
    id: id("skill", skill, index),
    name: skill,
  }));
  const links = [
    basics.linkedin
      ? { id: "link-linkedin", label: "LinkedIn", url: basics.linkedin, type: "linkedin" as const }
      : null,
    basics.github
      ? { id: "link-github", label: "GitHub", url: basics.github, type: "github" as const }
      : null,
    basics.portfolio
      ? { id: "link-portfolio", label: "Portfolio", url: basics.portfolio, type: "portfolio" as const }
      : null,
    ...basics.otherUrls.map((url, index) => ({
      id: id("link", url, index),
      label: "Website",
      url,
      type: "website" as const,
    })),
  ].filter((link): link is NonNullable<typeof link> => Boolean(link));

  return normalizeStructuredCareerProfile(
    {
      basics: {
        fullName: basics.possibleName ?? "",
        currentRole: args.candidateBrief.possibleHeadline ?? "",
        email: basics.email ?? undefined,
        phone: basics.phone ?? undefined,
      },
      skills,
      experiences: [],
      projects: [],
      education: [],
      credentials: [],
      links,
      careerDetails: {},
      metadata: { source: "intake_import" },
    },
    "intake_import"
  );
}

export function toProfileJson(args: {
  candidateBrief: CandidateBrief;
  strategySignals: Prisma.InputJsonValue;
  deterministicBasics: DeterministicCandidateBasics;
  structuredCareerProfile: StructuredCareerProfile | null;
}) {
  return {
    candidateBrief: args.candidateBrief,
    strategySignals: args.strategySignals,
    deterministicBasics: args.deterministicBasics,
    structuredCareerProfile: args.structuredCareerProfile,
  } as unknown as Prisma.InputJsonObject;
}

export async function findUserStructuredCareerProfile(userId: string) {
  const rows = await db.candidateProfile.findMany({
    where: {
      userId,
      archivedAt: null,
    },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });

  for (const row of rows) {
    const structuredCareerProfile = profileJsonStructuredCareerProfile(row.profileJson);
    if (structuredCareerProfile) {
      return { row, structuredCareerProfile };
    }
  }

  return null;
}

export async function saveUserStructuredCareerProfile(args: {
  userId: string;
  profile: StructuredCareerProfile;
}) {
  const profile = normalizeStructuredCareerProfile(args.profile, "user_edited");
  const existing = await findUserStructuredCareerProfile(args.userId);
  const profileJson = {
    structuredCareerProfile: profile,
  } as Prisma.InputJsonObject;

  if (existing) {
    await db.candidateProfile.update({
      where: { id: existing.row.id },
      data: {
        profileJson,
        contactInfoJson: profile.basics as Prisma.InputJsonValue,
        linksJson: profile.links as unknown as Prisma.InputJsonValue,
        skillsJson: profile.skills as unknown as Prisma.InputJsonValue,
        experienceJson: profile.experiences as unknown as Prisma.InputJsonValue,
        projectsJson: profile.projects as unknown as Prisma.InputJsonValue,
        educationJson: profile.education as unknown as Prisma.InputJsonValue,
        certificationsJson: profile.credentials as unknown as Prisma.InputJsonValue,
        toolsJson: profile.skills.map((skill) => skill.name) as Prisma.InputJsonValue,
        summary: profile.basics.currentRole || "Saved TaylorCV profile.",
      },
    });
    return profile;
  }

  await db.candidateProfile.create({
    data: {
      userId: args.userId,
      sourceType: "manual",
      profileSource: "dashboard_profile",
      profileJson,
      contactInfoJson: profile.basics as Prisma.InputJsonValue,
      linksJson: profile.links as unknown as Prisma.InputJsonValue,
      skillsJson: profile.skills as unknown as Prisma.InputJsonValue,
      experienceJson: profile.experiences as unknown as Prisma.InputJsonValue,
      projectsJson: profile.projects as unknown as Prisma.InputJsonValue,
      educationJson: profile.education as unknown as Prisma.InputJsonValue,
      certificationsJson: profile.credentials as unknown as Prisma.InputJsonValue,
      toolsJson: profile.skills.map((skill) => skill.name) as Prisma.InputJsonValue,
      achievementsJson: [] as Prisma.InputJsonValue,
      summary: profile.basics.currentRole || "Saved TaylorCV profile.",
    },
  });

  return profile;
}

export async function saveImportedProfileForUserIfMissing(args: {
  userId: string;
  profile: StructuredCareerProfile | null;
}) {
  if (!args.profile) return null;
  const existing = await findUserStructuredCareerProfile(args.userId);
  if (existing) return existing.structuredCareerProfile;
  const profile = normalizeStructuredCareerProfile(args.profile, "user_edited");
  return saveUserStructuredCareerProfile({ userId: args.userId, profile });
}
