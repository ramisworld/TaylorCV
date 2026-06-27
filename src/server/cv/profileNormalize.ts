import type { ProfileExtract } from "./agentSchemas";

function isProjectLabel(value?: string | null) {
  return Boolean(value && /\bproject\b/i.test(value));
}

function isProjectExperience(item: ProfileExtract["experience"][number]) {
  return item.employmentType === "project" || isProjectLabel(item.dates);
}

function projectNameFromExperience(item: ProfileExtract["experience"][number]) {
  return item.company.trim() || item.role.trim();
}

export function normalizeExtractedProfile(profile: ProfileExtract): ProfileExtract {
  const experience: ProfileExtract["experience"] = [];
  const projects: ProfileExtract["projects"] = [...profile.projects];

  for (const item of profile.experience) {
    if (!isProjectExperience(item)) {
      experience.push(item);
      continue;
    }

    projects.push({
      name: projectNameFromExperience(item),
      descriptor: item.role,
      dates: item.dates,
      bullets: item.bullets,
      tools: item.tools,
      links: item.links,
    });
  }

  return {
    ...profile,
    experience,
    projects,
  };
}
