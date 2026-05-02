"use client";

import type { ReactNode } from "react";

import type { RouterOutputs } from "~/trpc/react";

type ApplicationState = NonNullable<
  RouterOutputs["application"]["getApplicationState"]
>;

type CvHeader = {
  name: string | null;
  targetTitle: string | null;
  location: string | null;
  phone: string | null;
  email: string | null;
  links: Array<{ label: string | null; url: string }>;
};

type SkillGroup = {
  label: string;
  items: string[];
};

type CvExperienceItem = {
  title: string | null;
  company: string | null;
  dates: string | null;
  location: string | null;
  bullets: string[];
};

type CvProjectItem = {
  name: string | null;
  descriptor: string | null;
  dates: string | null;
  bullets: string[];
};

type CvEducationItem = {
  institution: string | null;
  degree: string | null;
  dates: string | null;
  details: string[];
};

type StructuredCv = {
  sectionOrder: string[];
  header: CvHeader;
  summary: string;
  skills: { groups: SkillGroup[] };
  experience: CvExperienceItem[];
  projects: CvProjectItem[];
  education: CvEducationItem[];
  certifications: string[];
};

type CvSectionId =
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function textOrNull(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function textArray(value: unknown) {
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

function parseSkillGroups(value: unknown): SkillGroup[] | null {
  if (!isRecord(value) || !Array.isArray(value.groups)) return null;

  return value.groups
    .filter(isRecord)
    .map((group) => ({
      label: textOrNull(group.label),
      items: textArray(group.items),
    }))
    .filter(
      (group): group is SkillGroup =>
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

function parseStructuredCv(value: unknown): StructuredCv | null {
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

function joinPresent(values: Array<string | null | undefined>, separator: string) {
  return values.filter(Boolean).join(separator);
}

function linkText(link: { label: string | null; url: string }) {
  return link.label && link.label !== link.url ? `${link.label}: ${link.url}` : link.url;
}

function normalizeSectionId(section: string): CvSectionId | null {
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

function orderedSections(sectionOrder: string[]) {
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

function SectionHeading(props: { children: ReactNode }) {
  return (
    <h2 className="border-b border-zinc-300 pb-1 text-[11px] font-bold uppercase tracking-normal text-zinc-950">
      {props.children}
    </h2>
  );
}

function BulletList(props: { bullets: string[] }) {
  return (
    <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[12.5px] leading-[1.45] text-zinc-800">
      {props.bullets.map((bullet, index) => (
        <li key={`${bullet}-${index}`}>{bullet}</li>
      ))}
    </ul>
  );
}

function StructuredCvPaper(props: { cv: StructuredCv }) {
  const headerMeta = [
    props.cv.header.targetTitle,
    props.cv.header.location,
    props.cv.header.phone,
    props.cv.header.email,
    ...props.cv.header.links.map(linkText),
  ].filter(Boolean);
  const sectionOrder = orderedSections(props.cv.sectionOrder);

  function renderSection(section: CvSectionId) {
    if (section === "summary") {
      return (
        <section key="summary">
          <SectionHeading>Summary</SectionHeading>
          <p className="mt-2 text-[12.5px] leading-[1.5] text-zinc-800">
            {props.cv.summary}
          </p>
        </section>
      );
    }

    if (section === "projects") {
      if (props.cv.projects.length === 0) return null;

      return (
        <section key="projects">
          <SectionHeading>Selected Projects</SectionHeading>
          <div className="mt-2 space-y-3">
            {props.cv.projects.map((project, index) => {
              const title = joinPresent(
                [project.name, project.descriptor],
                " - "
              );

              return (
                <div key={`${title}-${index}`}>
                  {(title || project.dates) ? (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      {title ? (
                        <p className="text-[13px] font-semibold leading-snug">
                          {title}
                        </p>
                      ) : null}
                      {project.dates ? (
                        <p className="text-[12px] leading-snug text-zinc-600">
                          {project.dates}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  <BulletList bullets={project.bullets} />
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    if (section === "experience") {
      if (props.cv.experience.length === 0) return null;

      return (
        <section key="experience">
          <SectionHeading>Experience</SectionHeading>
          <div className="mt-2 space-y-3">
            {props.cv.experience.map((item, index) => {
              const title = joinPresent([item.title, item.company], " - ");
              const meta = joinPresent([item.dates, item.location], " | ");

              return (
                <div key={`${title}-${index}`}>
                  {(title || meta) ? (
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      {title ? (
                        <p className="text-[13px] font-semibold leading-snug">
                          {title}
                        </p>
                      ) : null}
                      {meta ? (
                        <p className="text-[12px] leading-snug text-zinc-600">
                          {meta}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  <BulletList bullets={item.bullets} />
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    if (section === "education") {
      if (props.cv.education.length === 0) return null;

      return (
        <section key="education">
          <SectionHeading>Education</SectionHeading>
          <div className="mt-2 space-y-2">
            {props.cv.education.map((item, index) => {
              const title = joinPresent([item.degree, item.institution], " - ");

              return (
                <div key={`${title}-${index}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    {title ? (
                      <p className="text-[13px] font-semibold leading-snug">
                        {title}
                      </p>
                    ) : null}
                    {item.dates ? (
                      <p className="text-[12px] leading-snug text-zinc-600">
                        {item.dates}
                      </p>
                    ) : null}
                  </div>
                  {item.details.length > 0 ? (
                    <p className="mt-1 text-[12.5px] leading-[1.45] text-zinc-700">
                      {item.details.join("; ")}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    if (section === "certifications") {
      if (props.cv.certifications.length === 0) return null;

      return (
        <section key="certifications">
          <SectionHeading>Certifications</SectionHeading>
          <p className="mt-2 text-[12.5px] leading-[1.45] text-zinc-800">
            {props.cv.certifications.join("; ")}
          </p>
        </section>
      );
    }

    if (section === "skills") {
      if (props.cv.skills.groups.length === 0) return null;

      return (
        <section key="skills">
          <SectionHeading>Skills</SectionHeading>
          <dl className="mt-2 space-y-1.5 text-[12.5px] leading-[1.45]">
            {props.cv.skills.groups.map((group) => (
              <div
                className="grid gap-1 sm:grid-cols-[130px_1fr]"
                key={group.label}
              >
                <dt className="font-semibold text-zinc-950">{group.label}:</dt>
                <dd className="text-zinc-800">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    }

    return null;
  }

  return (
    <article className="mx-auto max-w-[820px] border border-zinc-200 bg-white px-8 py-7 text-zinc-950 shadow-sm sm:px-10 sm:py-9">
      {(props.cv.header.name || headerMeta.length > 0) ? (
        <header className="text-center">
          {props.cv.header.name ? (
            <h1 className="text-2xl font-bold leading-tight tracking-normal">
              {props.cv.header.name}
            </h1>
          ) : null}
          {headerMeta.length > 0 ? (
            <p className="mt-1 text-[12px] leading-5 text-zinc-700">
              {headerMeta.join(" | ")}
            </p>
          ) : null}
        </header>
      ) : null}

      <div className="mt-5 space-y-4">{sectionOrder.map(renderSection)}</div>
    </article>
  );
}

function FallbackPaper(props: { text: string }) {
  return (
    <article className="mx-auto max-w-[820px] border border-zinc-200 bg-white px-8 py-7 shadow-sm sm:px-10 sm:py-9">
      <pre className="whitespace-pre-wrap font-sans text-[12.5px] leading-6 text-zinc-800">{props.text}</pre>
    </article>
  );
}

export function CVPreview(props: {
  value: string;
  cvDraft: ApplicationState["cvDraft"] | null;
  onChange: (value: string) => void;
  onGenerateCv: () => void;
  onCopy: () => void;
  isGeneratingCv: boolean;
  isPrimary?: boolean;
  disabled?: boolean;
}) {
  const cvJson = props.cvDraft?.cvJson;
  const structuredCv = parseStructuredCv(cvJson);
  const cvText = props.cvDraft?.cvText ?? props.value;
  const buttonClass = props.isPrimary
    ? "rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-400"
    : "rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 disabled:cursor-not-allowed disabled:text-zinc-400";

  return (
    <section className="space-y-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">Final CV</h2>
          <p className="text-sm text-zinc-600">
            Generate a polished document from your strongest role-specific evidence.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={buttonClass}
            disabled={props.disabled || props.isGeneratingCv}
            onClick={props.onGenerateCv}
            type="button"
          >
            {props.isGeneratingCv
              ? "Writing CV..."
              : props.cvDraft
                ? "Regenerate final CV"
                : "Generate final CV"}
          </button>
          <button
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 disabled:cursor-not-allowed disabled:text-zinc-400"
            disabled={!cvText}
            onClick={props.onCopy}
            type="button"
          >
            Copy CV
          </button>
        </div>
      </div>

      {structuredCv ? (
        <StructuredCvPaper cv={structuredCv} />
      ) : cvText ? (
        <FallbackPaper text={cvText} />
      ) : (
        <div className="mx-auto max-w-[820px] border border-dashed border-zinc-300 bg-white px-8 py-12 text-center text-sm text-zinc-600">
          Your final CV will appear here as a clean document preview.
        </div>
      )}

      <details className="rounded-md border border-zinc-200 bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium text-zinc-800">
          Plain text fallback
        </summary>
        <textarea
          className="mt-3 min-h-72 w-full resize-y rounded-md border border-zinc-300 bg-white p-3 font-mono text-sm text-zinc-950 outline-none focus:border-zinc-900"
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
          value={cvText}
        />
      </details>
    </section>
  );
}
