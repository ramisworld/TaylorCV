export type CvHeader = {
  name: string | null;
  targetTitle: string | null;
  location: string | null;
  phone: string | null;
  email: string | null;
  links: Array<{ label: string | null; url: string }>;
};

export type CvSkillGroup = {
  label: string;
  items: string[];
};

export type CvExperienceItem = {
  title: string | null;
  company: string | null;
  dates: string | null;
  location: string | null;
  bullets: string[];
};

export type CvProjectItem = {
  name: string | null;
  descriptor: string | null;
  dates: string | null;
  bullets: string[];
};

export type CvEducationItem = {
  institution: string | null;
  degree: string | null;
  dates: string | null;
  details: string[];
};

export type StructuredCv = {
  sectionOrder: string[];
  header: CvHeader;
  summary: string;
  skills: { groups: CvSkillGroup[] };
  experience: CvExperienceItem[];
  projects: CvProjectItem[];
  education: CvEducationItem[];
  certifications: string[];
};

export type CvSectionId =
  | "summary"
  | "projects"
  | "experience"
  | "skills"
  | "education"
  | "certifications";

const defaultSectionOrder: CvSectionId[] = [
  "summary",
  "projects",
  "experience",
  "skills",
  "education",
  "certifications",
];

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function textOrNull(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function textArray(value: unknown) {
  return Array.isArray(value)
    ? value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    : [];
}

function parseHeader(value: unknown): CvHeader | null {
  if (!isRecord(value)) return null;

  const links = Array.isArray(value.links)
    ? value.links
        .filter(isRecord)
        .map((link) => ({
          label: textOrNull(link.label),
          url: textOrNull(link.url),
        }))
        .filter((link): link is { label: string | null; url: string } =>
          Boolean(link.url)
        )
    : [];

  return {
    name: textOrNull(value.name),
    targetTitle: textOrNull(value.targetTitle),
    location: textOrNull(value.location),
    phone: textOrNull(value.phone),
    email: textOrNull(value.email),
    links,
  };
}

function parseSkillGroups(value: unknown): CvSkillGroup[] | null {
  if (!isRecord(value) || !Array.isArray(value.groups)) return null;

  return value.groups
    .filter(isRecord)
    .map((group) => ({
      label: textOrNull(group.label),
      items: textArray(group.items),
    }))
    .filter(
      (group): group is CvSkillGroup =>
        Boolean(group.label) && group.items.length > 0
    );
}

function parseExperience(value: unknown): CvExperienceItem[] | null {
  if (!Array.isArray(value)) return null;

  return value
    .filter(isRecord)
    .map((item) => ({
      title: textOrNull(item.title),
      company: textOrNull(item.company),
      dates: textOrNull(item.dates),
      location: textOrNull(item.location),
      bullets: textArray(item.bullets),
    }))
    .filter((item) => item.bullets.length > 0);
}

function parseProjects(value: unknown): CvProjectItem[] | null {
  if (!Array.isArray(value)) return null;

  return value
    .filter(isRecord)
    .map((item) => ({
      name: textOrNull(item.name),
      descriptor: textOrNull(item.descriptor),
      dates: textOrNull(item.dates),
      bullets: textArray(item.bullets),
    }))
    .filter((item) => item.bullets.length > 0);
}

function parseEducation(value: unknown): CvEducationItem[] | null {
  if (!Array.isArray(value)) return null;

  return value
    .filter(isRecord)
    .map((item) => ({
      institution: textOrNull(item.institution),
      degree: textOrNull(item.degree),
      dates: textOrNull(item.dates),
      details: textArray(item.details),
    }))
    .filter((item) =>
      Boolean(item.institution || item.degree || item.dates || item.details.length)
    );
}

export function parseStructuredCv(value: unknown): StructuredCv | null {
  if (!isRecord(value)) return null;

  const header = parseHeader(value.header);
  const sectionOrder = textArray(value.sectionOrder);
  const summary = textOrNull(value.summary);
  const skillGroups = parseSkillGroups(value.skills);
  const experience = parseExperience(value.experience);
  const projects = parseProjects(value.projects);
  const education = parseEducation(value.education);
  const certifications = textArray(value.certifications);

  if (
    !header ||
    sectionOrder.length === 0 ||
    !summary ||
    !skillGroups ||
    !experience ||
    !projects ||
    !education
  ) {
    return null;
  }

  return {
    sectionOrder,
    header,
    summary,
    skills: { groups: skillGroups },
    experience,
    projects,
    education,
    certifications,
  };
}

export function joinPresent(
  values: Array<string | null | undefined>,
  separator: string
) {
  return values.filter(Boolean).join(separator);
}

export function linkText(link: { label: string | null; url: string }) {
  return link.label && link.label !== link.url
    ? `${link.label}: ${link.url}`
    : link.url;
}

export function normalizeSectionId(section: string): CvSectionId | null {
  const normalized = section.toLowerCase().replace(/[^a-z]+/g, " ").trim();

  if (!normalized || normalized === "header") return null;
  if (normalized === "summary" || normalized === "professional summary") {
    return "summary";
  }
  if (
    normalized === "project" ||
    normalized === "projects" ||
    normalized === "selected project" ||
    normalized === "selected projects"
  ) {
    return "projects";
  }
  if (normalized === "experience" || normalized === "work experience") {
    return "experience";
  }
  if (normalized === "skill" || normalized === "skills") return "skills";
  if (normalized === "education") return "education";
  if (normalized === "certification" || normalized === "certifications") {
    return "certifications";
  }

  return null;
}

export function orderedSections(sectionOrder: string[]) {
  const sections: CvSectionId[] = [];

  for (const section of sectionOrder) {
    const normalized = normalizeSectionId(section);
    if (normalized && !sections.includes(normalized)) {
      sections.push(normalized);
    }
  }

  for (const section of defaultSectionOrder) {
    if (!sections.includes(section)) sections.push(section);
  }

  return sections;
}
