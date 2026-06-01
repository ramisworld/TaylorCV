"use client";

import {
  Document as PdfDocument,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

import {
  claimText,
  isRecord,
  joinPresent,
  personalContactItems,
  textArray,
  textOrNull,
  type NormalizedCvSection,
  type StructuredCv,
} from "~/lib/cvDocument";
import type { RendererTokens } from "~/lib/cvPresentation";
import {
  buildCvRenderModel,
  renderSectionLabel,
  type CvRenderModel,
} from "~/lib/cvRenderModel";

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function cvFileName(cv: StructuredCv, extension: "pdf" | "docx") {
  const base = [
    cv.header.name ?? "Taylor CV",
    cv.header.targetTitle ?? "Tailored CV",
  ]
    .join(" ")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${base || "Taylor-CV"}.${extension}`;
}

const styles = StyleSheet.create({
  page: {
    padding: 42,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#18181b",
    lineHeight: 1.35,
  },
  header: {
    textAlign: "center",
    marginBottom: 18,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  meta: {
    fontSize: 9.5,
    color: "#3f3f46",
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d8",
    paddingBottom: 3,
    marginBottom: 6,
  },
  itemTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
  },
  itemMeta: {
    fontSize: 9.5,
    color: "#52525b",
  },
  bulletRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 2,
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
  paragraph: {
    marginBottom: 2,
  },
});

function BulletList(props: { bullets: string[]; tokens: RendererTokens }) {
  return (
    <View>
      {props.bullets.map((bullet, index) => (
        <View
          style={[
            styles.bulletRow,
            { marginBottom: props.tokens.bulletGap },
          ]}
          key={`${bullet}-${index}`}
        >
          <Text style={[styles.bullet, { color: props.tokens.bodyTextColor }]}>-</Text>
          <Text
            style={[styles.bulletText, { color: props.tokens.bodyTextColor }]}
          >
            {bullet}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PdfSection(props: {
  title: string;
  children: React.ReactNode;
  tokens: RendererTokens;
}) {
  return (
    <View style={[styles.section, { marginBottom: props.tokens.sectionGap }]}>
      <Text
        style={[
          styles.heading,
          {
            color: props.tokens.bodyTextColor,
            borderBottomWidth: props.tokens.dividerStyle === "no_rule" ? 0 : 1,
            borderBottomColor: props.tokens.dividerColor,
            fontSize: props.tokens.headingSize,
          },
        ]}
      >
        {props.title}
      </Text>
      {props.children}
    </View>
  );
}

function dynamicText(value: unknown): string | null {
  if (typeof value === "string") return value.trim() || null;
  if (!isRecord(value)) return null;

  return (
    textOrNull(value.text) ??
    textOrNull(value.content) ??
    textOrNull(value.summary) ??
    textOrNull(value.label) ??
    null
  );
}

function dynamicTitle(value: unknown) {
  if (!isRecord(value)) return null;
  return joinPresent(
    [
      textOrNull(value.title),
      textOrNull(value.name),
      textOrNull(value.degree),
      textOrNull(value.company),
      textOrNull(value.institution),
      textOrNull(value.descriptor),
    ],
    " - "
  );
}

function dynamicMeta(value: unknown) {
  if (!isRecord(value)) return null;
  return joinPresent([textOrNull(value.dates), textOrNull(value.location)], " | ");
}

function dynamicBullets(value: unknown): string[] {
  if (typeof value === "string") return [value.trim()].filter(Boolean);
  if (!isRecord(value)) return [];

  const bullets = textArray(value.bullets);
  if (bullets.length > 0) return bullets;

  const details = textArray(value.details);
  if (details.length > 0) return details;

  const items = textArray(value.items);
  if (items.length > 0) return items;

  const text = dynamicText(value);
  return text ? [text] : [];
}

function isNonEmptyText(value: string | null): value is string {
  return Boolean(value);
}

function renderNormalizedPdfSection(section: NormalizedCvSection, tokens: RendererTokens) {
  const title = renderSectionLabel(section, tokens);

  if (section.type === "summary" || section.type === "inline") {
    return (
      <PdfSection title={title} key={section.id} tokens={tokens}>
        {section.paragraphs.map((paragraph, index) => (
          <Text
            key={`${section.id}-paragraph-${index}`}
            style={[
              styles.paragraph,
              {
                color: tokens.bodyTextColor,
                fontSize: tokens.bodySize,
                lineHeight: tokens.lineHeight,
              },
            ]}
          >
            {paragraph}
          </Text>
        ))}
      </PdfSection>
    );
  }

  if (section.type === "bullets" || section.type === "certifications") {
    return (
      <PdfSection title={title} key={section.id} tokens={tokens}>
        <BulletList bullets={section.bullets.map(claimText)} tokens={tokens} />
      </PdfSection>
    );
  }

  if (section.type === "experience") {
    return (
      <PdfSection title={title} key={section.id} tokens={tokens}>
        {section.items.map((item, index) => {
          const title = joinPresent([item.role, item.company], " - ");
          const meta = joinPresent([item.dates, item.location], " | ");
          return (
            <View key={`${section.id}-item-${index}`} style={{ marginBottom: tokens.itemGap }}>
              {title || meta ? (
                <View style={styles.itemTitleRow}>
                  <Text style={[styles.itemTitle, { color: tokens.bodyTextColor }]}>
                    {title}
                  </Text>
                  <Text style={[styles.itemMeta, { color: tokens.mutedTextColor }]}>
                    {meta}
                  </Text>
                </View>
              ) : null}
              <BulletList bullets={item.bullets.map(claimText)} tokens={tokens} />
            </View>
          );
        })}
      </PdfSection>
    );
  }

  if (section.type === "projects") {
    return (
      <PdfSection title={title} key={section.id} tokens={tokens}>
        {section.items.map((item, index) => {
          const title = joinPresent([item.name, item.descriptor], " - ");
          return (
            <View key={`${section.id}-item-${index}`} style={{ marginBottom: tokens.itemGap }}>
              {title || item.dates ? (
                <View style={styles.itemTitleRow}>
                  <Text style={[styles.itemTitle, { color: tokens.bodyTextColor }]}>
                    {title}
                  </Text>
                  <Text style={[styles.itemMeta, { color: tokens.mutedTextColor }]}>
                    {item.dates ?? ""}
                  </Text>
                </View>
              ) : null}
              <BulletList bullets={item.bullets.map(claimText)} tokens={tokens} />
            </View>
          );
        })}
      </PdfSection>
    );
  }

  if (section.type === "skills") {
    return (
      <PdfSection title={title} key={section.id} tokens={tokens}>
        {section.groups.map((group) => (
          <Text
            style={[
              styles.paragraph,
              {
                color: tokens.bodyTextColor,
                fontSize: tokens.bodySize,
                marginBottom: tokens.bulletGap,
              },
            ]}
            key={group.group}
          >
            <Text style={{ fontFamily: "Helvetica-Bold", color: tokens.bodyTextColor }}>
              {group.group}:{" "}
            </Text>
            {group.skills.join(", ")}
          </Text>
        ))}
      </PdfSection>
    );
  }

  if (section.type !== "education") return null;

  return (
    <PdfSection title={title} key={section.id} tokens={tokens}>
      {section.items.map((item, index) => {
        return (
          <View key={`${section.id}-item-${index}`} style={{ marginBottom: tokens.itemGap }}>
            {item.degree ? (
              <Text style={[styles.itemTitle, { color: tokens.bodyTextColor }]}>
                {item.degree}
              </Text>
            ) : null}
            {item.institution || item.dates ? (
              <View style={styles.itemTitleRow}>
                <Text style={[styles.itemMeta, { color: tokens.mutedTextColor }]}>
                  {item.institution ?? ""}
                </Text>
                <Text style={[styles.itemMeta, { color: tokens.mutedTextColor }]}>
                  {item.dates ?? ""}
                </Text>
              </View>
            ) : null}
            {item.details.length > 0 ? (
              <Text
                style={{
                  color: tokens.mutedTextColor,
                  fontSize: tokens.bodySize - 0.2,
                  lineHeight: tokens.lineHeight,
                }}
              >
                {item.details.join(", ")}
              </Text>
            ) : null}
          </View>
        );
      })}
    </PdfSection>
  );
}

function CvPdfDocument(props: { cv: StructuredCv; model: CvRenderModel }) {
  const { sections, tokens } = props.model;
  const meta = personalContactItems(props.cv.header);
  const pdfHeaderAlign = tokens.headerLayout === "centered" ? "center" as const : "left" as const;

  return (
    <PdfDocument>
      <Page
        size="A4"
        style={[
          styles.page,
          {
            padding: tokens.pagePadding,
            fontSize: tokens.bodySize,
            fontFamily: tokens.pdfFontFamily,
            color: tokens.bodyTextColor,
            lineHeight: tokens.lineHeight,
          },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              textAlign: pdfHeaderAlign,
              marginBottom: tokens.sectionGap + 2,
            },
          ]}
        >
          {props.cv.header.name ? (
            <Text
              style={[
                styles.name,
                {
                  color: tokens.bodyTextColor,
                  fontSize: tokens.nameSize,
                  fontFamily: tokens.pdfFontFamily,
                },
              ]}
            >
              {props.cv.header.name}
            </Text>
          ) : null}
          {props.cv.header.targetTitle ? (
            <Text
              style={[
                styles.meta,
                {
                  color: tokens.mutedTextColor,
                  fontSize: tokens.subtitleSize + 0.4,
                  fontFamily: tokens.pdfFontFamily,
                },
              ]}
            >
              {props.cv.header.targetTitle}
            </Text>
          ) : null}
          {meta.length > 0 ? (
            <Text
              style={[
                styles.meta,
                {
                  color: tokens.mutedTextColor,
                  fontSize: tokens.subtitleSize,
                },
              ]}
            >
              {meta.map((item) => item.value).join(" | ")}
            </Text>
          ) : null}
        </View>
        {sections.map((section) => renderNormalizedPdfSection(section, tokens))}
      </Page>
    </PdfDocument>
  );
}

function docxColor(hex: string) {
  return hex.replace("#", "").toUpperCase();
}

function heading(text: string, tokens: RendererTokens) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: tokens.headingWeight >= 600,
        color: docxColor(tokens.bodyTextColor),
        font: tokens.docxFontFamily,
        size: Math.round(tokens.headingSize * 2),
      }),
    ],
    border:
      tokens.dividerStyle === "no_rule"
        ? undefined
        : {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: docxColor(tokens.dividerColor),
            },
          },
    spacing: {
      before: Math.round(tokens.sectionGap * 12),
      after: Math.round(tokens.itemGap * 10),
    },
  });
}

function bullet(text: string, tokens: RendererTokens) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        color: docxColor(tokens.bodyTextColor),
        font: tokens.docxFontFamily,
        size: Math.round(tokens.bodySize * 2),
      }),
    ],
    bullet: { level: 0 },
    spacing: { after: Math.round(tokens.bulletGap * 14) },
  });
}

function paragraph(text: string, tokens: RendererTokens, bold = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold,
        color: docxColor(tokens.bodyTextColor),
        font: tokens.docxFontFamily,
        size: Math.round(tokens.bodySize * 2),
      }),
    ],
  });
}

function pushNormalizedDocxSection(
  children: Paragraph[],
  section: NormalizedCvSection,
  tokens: RendererTokens
) {
  const sectionTitle = renderSectionLabel(section, tokens).toUpperCase();

  if (section.type === "summary" || section.type === "inline") {
    children.push(heading(sectionTitle, tokens));
    children.push(...section.paragraphs.map((text) => paragraph(text, tokens)));
    return;
  }

  if (section.type === "bullets" || section.type === "certifications") {
    children.push(heading(sectionTitle, tokens));
    children.push(...section.bullets.map((item) => bullet(claimText(item), tokens)));
    return;
  }

  children.push(heading(sectionTitle, tokens));

  if (section.type === "skills") {
    for (const group of section.groups) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${group.group}: `,
              bold: true,
              color: docxColor(tokens.bodyTextColor),
              font: tokens.docxFontFamily,
            }),
            new TextRun({
              text: group.skills.join(", "),
              color: docxColor(tokens.bodyTextColor),
              font: tokens.docxFontFamily,
            }),
          ],
        })
      );
    }
    return;
  }

  if (section.type === "experience") {
    for (const item of section.items) {
      const title = joinPresent([item.role, item.company], " - ");
      const meta = joinPresent([item.dates, item.location], " | ");
      if (title || meta) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                bold: true,
                color: docxColor(tokens.bodyTextColor),
                font: tokens.docxFontFamily,
              }),
              new TextRun({
                text: meta ? ` | ${meta}` : "",
                color: docxColor(tokens.mutedTextColor),
                font: tokens.docxFontFamily,
              }),
            ],
          })
        );
      }
      children.push(...item.bullets.map((item) => bullet(item.text, tokens)));
    }
    return;
  }

  if (section.type === "projects") {
    for (const item of section.items) {
      const title = joinPresent([item.name, item.descriptor], " - ");
      const meta = item.dates;
      if (title || meta) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                bold: true,
                color: docxColor(tokens.bodyTextColor),
                font: tokens.docxFontFamily,
              }),
              new TextRun({
                text: meta ? ` | ${meta}` : "",
                color: docxColor(tokens.mutedTextColor),
                font: tokens.docxFontFamily,
              }),
            ],
          })
        );
      }
      children.push(...item.bullets.map((item) => bullet(item.text, tokens)));
    }
    return;
  }

  if (section.type !== "education") return;

  for (const item of section.items) {
    const meta = item.dates;
    if (item.degree) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: item.degree,
              bold: true,
              color: docxColor(tokens.bodyTextColor),
              font: tokens.docxFontFamily,
            }),
          ],
        })
      );
    }
    if (item.institution || meta) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: item.institution ?? "",
              color: docxColor(tokens.mutedTextColor),
              font: tokens.docxFontFamily,
            }),
            new TextRun({
              text: meta ? `${item.institution ? " | " : ""}${meta}` : "",
              color: docxColor(tokens.mutedTextColor),
              font: tokens.docxFontFamily,
            }),
          ],
        })
      );
    }
    if (item.details.length > 0) {
      children.push(paragraph(item.details.join(", "), tokens));
    }
  }
}

export async function exportCvPdf(cv: StructuredCv, presentation?: unknown) {
  const model = buildCvRenderModel(cv, presentation);
  console.info(
    "CV_RENDERER_LAYOUT_METRICS",
    JSON.stringify({ ...model.metrics, renderTarget: "pdf_export" })
  );
  const blob = await pdf(
    <CvPdfDocument cv={cv} model={model} />
  ).toBlob();
  downloadBlob(blob, cvFileName(cv, "pdf"));
}

export async function exportCvDocx(cv: StructuredCv, presentation?: unknown) {
  const model = buildCvRenderModel(cv, presentation);
  console.info(
    "CV_RENDERER_LAYOUT_METRICS",
    JSON.stringify({ ...model.metrics, renderTarget: "docx_export" })
  );
  const { sections, tokens } = model;
  const children: Paragraph[] = [];
  const headerAlignment = cv.header.name && tokens.headerLayout === "centered"
      ? AlignmentType.CENTER
      : AlignmentType.LEFT;
  const meta = personalContactItems(cv.header);

  if (cv.header.name) {
    children.push(
      new Paragraph({
        alignment: headerAlignment,
        children: [
          new TextRun({
            text: cv.header.name,
            bold: true,
            size: Math.round(tokens.nameSize * 2),
            color: docxColor(tokens.bodyTextColor),
            font: tokens.docxFontFamily,
          }),
        ],
      })
    );
  }
  if (cv.header.targetTitle) {
    children.push(
      new Paragraph({
        alignment: headerAlignment,
        children: [
          new TextRun({
            text: cv.header.targetTitle,
            size: Math.round(tokens.subtitleSize * 2),
            color: docxColor(tokens.mutedTextColor),
            font: tokens.docxFontFamily,
          }),
        ],
      })
    );
  }
  if (meta.length > 0) {
    children.push(
      new Paragraph({
        alignment: headerAlignment,
        children: [
          new TextRun({
            text: meta.map((item) => item.value).join(" | "),
            size: Math.round(tokens.subtitleSize * 2),
            color: docxColor(tokens.mutedTextColor),
            font: tokens.docxFontFamily,
          }),
        ],
        spacing: { after: 180 },
      })
    );
  }

  for (const section of sections) {
    pushNormalizedDocxSection(children, section, tokens);
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, cvFileName(cv, "docx"));
}
