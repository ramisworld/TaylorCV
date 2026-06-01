"use client";

import { useEffect, useMemo } from "react";

import {
  claimText,
  personalContactItems,
  joinPresent,
  type CvEducationItem,
  type CvExperienceItem,
  type CvProjectItem,
  type NormalizedCvSection,
  type StructuredCv,
} from "~/lib/cvDocument";
import { buildCvRenderModel, renderSectionLabel } from "~/lib/cvRenderModel";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeading(props: {
  children: string;
  headingColor: string;
  headingSize: number;
  headingWeight: number;
}) {
  return (
    <h2
      className="border-b pb-[7px] uppercase leading-none tracking-normal"
      style={{
        borderColor: "#b8bec7",
        color: props.headingColor,
        fontSize: props.headingSize,
        fontWeight: Math.max(850, props.headingWeight),
      }}
    >
      {props.children}
    </h2>
  );
}

function BulletList(props: { bullets: string[]; bodySize: number; lineHeight: number }) {
  return (
    <ul
      className="mt-1.5 list-disc space-y-0.5 pl-4 text-[#1f2937]"
      style={{ fontSize: props.bodySize, lineHeight: props.lineHeight }}
    >
      {props.bullets.map((bullet, index) => (
        <li key={`${bullet}-${index}`}>{bullet}</li>
      ))}
    </ul>
  );
}

function ItemHeading(props: {
  title: string;
  meta: string;
  bodySize: number;
  mutedColor: string;
}) {
  if (!props.title && !props.meta) return null;

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
      {props.title ? (
        <p
          className="font-semibold leading-snug text-[#111827]"
          style={{ fontSize: props.bodySize + 0.8 }}
        >
          {props.title}
        </p>
      ) : null}
      {props.meta ? (
        <p className="leading-snug" style={{ color: props.mutedColor, fontSize: props.bodySize - 0.2 }}>
          {props.meta}
        </p>
      ) : null}
    </div>
  );
}

function ExperienceBlock(props: {
  item: CvExperienceItem;
  index: number;
  bodySize: number;
  lineHeight: number;
  mutedColor: string;
}) {
  const title = joinPresent([props.item.role, props.item.company], " - ");
  const meta = joinPresent([props.item.dates, props.item.location], " | ");

  return (
    <div data-cv-experience-item key={`${title}-${props.index}`}>
      <ItemHeading
        bodySize={props.bodySize}
        meta={meta}
        mutedColor={props.mutedColor}
        title={title}
      />
      <BulletList
        bodySize={props.bodySize}
        bullets={props.item.bullets.map(claimText)}
        lineHeight={props.lineHeight}
      />
    </div>
  );
}

function ProjectBlock(props: {
  item: CvProjectItem;
  index: number;
  bodySize: number;
  lineHeight: number;
  mutedColor: string;
}) {
  const title = joinPresent([props.item.name, props.item.descriptor], " - ");

  return (
    <div key={`${title}-${props.index}`}>
      <ItemHeading
        bodySize={props.bodySize}
        meta={props.item.dates ?? ""}
        mutedColor={props.mutedColor}
        title={title}
      />
      <BulletList
        bodySize={props.bodySize}
        bullets={props.item.bullets.map(claimText)}
        lineHeight={props.lineHeight}
      />
    </div>
  );
}

function EducationLine(props: {
  item: CvEducationItem;
  index: number;
  bodySize: number;
  mutedColor: string;
}) {
  const degree = props.item.degree ?? "";
  const institution = props.item.institution ?? "";
  const detailText = props.item.details.join(", ");

  return (
    <div key={`${degree}-${institution}-${props.index}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <div className="min-w-0">
          {degree ? (
            <p
              className="font-semibold leading-snug text-[#111827]"
              style={{ fontSize: props.bodySize + 0.5 }}
            >
              {degree}
            </p>
          ) : null}
          {institution ? (
            <p
              className="leading-snug"
              style={{ color: props.mutedColor, fontSize: props.bodySize - 0.1 }}
            >
              {institution}
            </p>
          ) : null}
        </div>
        {props.item.dates ? (
          <p className="leading-snug" style={{ color: props.mutedColor, fontSize: props.bodySize - 0.2 }}>
            {props.item.dates}
          </p>
        ) : null}
      </div>
      {detailText ? (
        <p className="mt-0.5 leading-snug text-[#374151]" style={{ fontSize: props.bodySize - 0.2 }}>
          {detailText}
        </p>
      ) : null}
    </div>
  );
}

function CertificationList(props: {
  items: string[];
  bodySize: number;
  lineHeight: number;
}) {
  if (props.items.length === 0) return null;
  const compactItems = props.items.map((item) => item.replace(/\s+/g, " ").trim()).filter(Boolean);

  return (
    <ul
      className="mt-1.5 list-disc space-y-0.5 pl-4 font-medium text-[#1f2937]"
      style={{ fontSize: props.bodySize - 0.1, lineHeight: props.lineHeight }}
    >
      {compactItems.map((item, index) => (
        <li key={`${item}-${index}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SkillsBlock(props: {
  groups: Array<{ group: string; skills: string[] }>;
  bodySize: number;
  lineHeight: number;
  headingColor: string;
}) {
  return (
    <dl className="mt-2 grid gap-y-1.5">
      {props.groups.map((group) => (
        <div
          className="grid min-w-0 grid-cols-[132px_1fr] gap-x-3 border-b border-[#edf0f3] pb-1.5 last:border-b-0 last:pb-0"
          key={group.group}
        >
          <dt
            className="font-extrabold leading-snug tracking-normal"
            style={{ color: props.headingColor, fontSize: Math.max(props.bodySize - 0.1, 11) }}
          >
            {group.group}
          </dt>
          <dd
            className="min-w-0 text-[#1f2937]"
            style={{ fontSize: props.bodySize, lineHeight: props.lineHeight }}
          >
            {group.skills.map((skill, index) => (
              <span className="inline" key={`${group.group}-${skill}`}>
                {skill}
                {index < group.skills.length - 1 ? (
                  <span className="mr-1.5 text-[#6b7280]" aria-hidden="true">
                    ,
                  </span>
                ) : null}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function renderSection(
  section: NormalizedCvSection,
  tokens: ReturnType<typeof buildCvRenderModel>["tokens"]
) {
  const sectionTitle = renderSectionLabel(section, tokens);

  return (
    <section key={section.id}>
      <SectionHeading
        headingColor={tokens.bodyTextColor}
        headingSize={tokens.headingSize}
        headingWeight={tokens.headingWeight}
      >
        {sectionTitle}
      </SectionHeading>
      {section.type === "summary" || section.type === "inline" ? (
        <div className="mt-2 space-y-1.5">
          {section.paragraphs.map((paragraph, index) => (
            <p
              className="font-medium text-[#1f2937]"
              key={`${section.id}-${index}`}
              style={{ fontSize: tokens.bodySize, lineHeight: tokens.lineHeight }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : section.type === "bullets" ? (
        <BulletList
          bodySize={tokens.bodySize}
          bullets={section.bullets.map(claimText)}
          lineHeight={tokens.lineHeight}
        />
      ) : section.type === "certifications" ? (
        <CertificationList
          bodySize={tokens.bodySize}
          items={section.bullets.map(claimText)}
          lineHeight={tokens.lineHeight}
        />
      ) : section.type === "projects" ? (
        <div className="mt-2 space-y-2.5">
          {section.items.map((item, index) => (
            <ProjectBlock
              bodySize={tokens.bodySize}
              index={index}
              item={item}
              key={`${item.name}-${index}`}
              lineHeight={tokens.lineHeight}
              mutedColor={tokens.mutedTextColor}
            />
          ))}
        </div>
      ) : section.type === "experience" ? (
        <div className="mt-2 space-y-2.5">
          {section.items.map((item, index) => (
            <ExperienceBlock
              bodySize={tokens.bodySize}
              index={index}
              item={item}
              key={`${item.role}-${index}`}
              lineHeight={tokens.lineHeight}
              mutedColor={tokens.mutedTextColor}
            />
          ))}
        </div>
      ) : section.type === "skills" ? (
        <SkillsBlock
          bodySize={tokens.bodySize}
          groups={section.groups}
          headingColor={tokens.bodyTextColor}
          lineHeight={tokens.lineHeight}
        />
      ) : section.type === "education" ? (
        <div className="mt-2 space-y-1.5">
          {section.items.map((item, index) => (
            <EducationLine
              bodySize={tokens.bodySize}
              index={index}
              item={item}
              key={`${item.institution}-${index}`}
              mutedColor={tokens.mutedTextColor}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function CVDocumentRenderer(props: {
  cv: StructuredCv;
  presentationJson?: unknown;
  className?: string;
}) {
  const model = useMemo(
    () => buildCvRenderModel(props.cv, props.presentationJson),
    [props.cv, props.presentationJson]
  );
  const contact = personalContactItems(props.cv.header);
  const { tokens } = model;
  const headerAlignClass = tokens.headerLayout === "centered" ? "text-center" : "text-left";
  const shouldDistributeUnderfilledPage = false;

  useEffect(() => {
    console.info(
      "CV_RENDERER_LAYOUT_METRICS",
      JSON.stringify({ ...model.metrics, renderTarget: "preview" })
    );
  }, [model.metrics]);

  return (
    <article
      className={cn(
        "mx-auto w-full max-w-[794px] overflow-hidden bg-white text-zinc-950 shadow-2xl shadow-black/30",
        props.className
      )}
      data-cv-document
      style={{
        aspectRatio: "210 / 297",
        boxSizing: "border-box",
        fontFamily: tokens.fontFamily,
        height: "1123px",
        minHeight: "1123px",
        padding: tokens.pagePaddingCss,
      }}
    >
      {props.cv.header.name || props.cv.header.targetTitle || contact.length > 0 ? (
        <header className={headerAlignClass}>
          {props.cv.header.name ? (
            <h1
              className="font-bold leading-[1.03] tracking-normal"
              style={{ color: tokens.bodyTextColor, fontSize: tokens.nameSize }}
            >
              {props.cv.header.name}
            </h1>
          ) : null}
          {props.cv.header.targetTitle ? (
            <p
              className="mt-1 max-w-[680px] font-medium leading-snug"
              style={{ color: tokens.mutedTextColor, fontSize: Math.max(tokens.subtitleSize - 0.35, 11.2) }}
            >
              {props.cv.header.targetTitle}
            </p>
          ) : null}
          {contact.length > 0 ? (
            <div
              className={cn(
                "mt-2 flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-1 leading-snug",
                tokens.headerLayout === "centered" ? "justify-center" : "justify-start"
              )}
              style={{
                color: tokens.mutedTextColor,
                fontSize: contact.length > 4 ? tokens.subtitleSize - 0.8 : tokens.subtitleSize - 0.35,
              }}
            >
              {contact.map((item, index) => (
                <span className="inline-flex min-w-0 max-w-full items-center" key={`${item.kind}-${item.value}`}>
                  <span className="break-words [overflow-wrap:anywhere]">{item.value}</span>
                  {index < contact.length - 1 ? (
                    <span className="mx-1.5 text-[#9ca3af]" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}
        </header>
      ) : null}
      <div
        className="mt-5"
        style={{
          alignContent: shouldDistributeUnderfilledPage ? "space-between" : undefined,
          display: "grid",
          gap: tokens.sectionGap,
          minHeight: shouldDistributeUnderfilledPage ? "calc(100% - 92px)" : undefined,
        }}
      >
        {model.sections.map((section) => renderSection(section, tokens))}
      </div>
    </article>
  );
}
