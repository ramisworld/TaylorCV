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
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

import {
  joinPresent,
  linkText,
  orderedSections,
  type CvSectionId,
  type StructuredCv,
} from "~/lib/cvDocument";

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

function BulletList(props: { bullets: string[] }) {
  return (
    <View>
      {props.bullets.map((bullet, index) => (
        <View style={styles.bulletRow} key={`${bullet}-${index}`}>
          <Text style={styles.bullet}>-</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </View>
  );
}

function PdfSection(props: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{props.title}</Text>
      {props.children}
    </View>
  );
}

function CvPdfDocument(props: { cv: StructuredCv }) {
  const meta = [
    props.cv.header.targetTitle,
    props.cv.header.location,
    props.cv.header.phone,
    props.cv.header.email,
    ...props.cv.header.links.map(linkText),
  ].filter(Boolean);

  function renderSection(section: CvSectionId) {
    if (section === "summary") {
      return (
        <PdfSection title="Summary" key="summary">
          <Text style={styles.paragraph}>{props.cv.summary}</Text>
        </PdfSection>
      );
    }

    if (section === "projects" && props.cv.projects.length > 0) {
      return (
        <PdfSection title="Selected Projects" key="projects">
          {props.cv.projects.map((project, index) => {
            const title = joinPresent([project.name, project.descriptor], " - ");
            return (
              <View key={`${title}-${index}`} style={{ marginBottom: 7 }}>
                {title || project.dates ? (
                  <View style={styles.itemTitleRow}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemMeta}>{project.dates ?? ""}</Text>
                  </View>
                ) : null}
                <BulletList bullets={project.bullets} />
              </View>
            );
          })}
        </PdfSection>
      );
    }

    if (section === "experience" && props.cv.experience.length > 0) {
      return (
        <PdfSection title="Experience" key="experience">
          {props.cv.experience.map((item, index) => {
            const title = joinPresent([item.title, item.company], " - ");
            const meta = joinPresent([item.dates, item.location], " | ");
            return (
              <View key={`${title}-${index}`} style={{ marginBottom: 7 }}>
                {title || meta ? (
                  <View style={styles.itemTitleRow}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemMeta}>{meta}</Text>
                  </View>
                ) : null}
                <BulletList bullets={item.bullets} />
              </View>
            );
          })}
        </PdfSection>
      );
    }

    if (section === "skills" && props.cv.skills.groups.length > 0) {
      return (
        <PdfSection title="Skills" key="skills">
          {props.cv.skills.groups.map((group) => (
            <Text style={styles.paragraph} key={group.label}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{group.label}: </Text>
              {group.items.join(", ")}
            </Text>
          ))}
        </PdfSection>
      );
    }

    if (section === "education" && props.cv.education.length > 0) {
      return (
        <PdfSection title="Education" key="education">
          {props.cv.education.map((item, index) => {
            const title = joinPresent([item.degree, item.institution], " - ");
            return (
              <View key={`${title}-${index}`} style={{ marginBottom: 5 }}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>{title}</Text>
                  <Text style={styles.itemMeta}>{item.dates ?? ""}</Text>
                </View>
                {item.details.length > 0 ? (
                  <Text>{item.details.join("; ")}</Text>
                ) : null}
              </View>
            );
          })}
        </PdfSection>
      );
    }

    if (section === "certifications" && props.cv.certifications.length > 0) {
      return (
        <PdfSection title="Certifications" key="certifications">
          <Text>{props.cv.certifications.join("; ")}</Text>
        </PdfSection>
      );
    }

    return null;
  }

  return (
    <PdfDocument>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {props.cv.header.name ? (
            <Text style={styles.name}>{props.cv.header.name}</Text>
          ) : null}
          {meta.length > 0 ? (
            <Text style={styles.meta}>{meta.join(" | ")}</Text>
          ) : null}
        </View>
        {orderedSections(props.cv.sectionOrder).map(renderSection)}
      </Page>
    </PdfDocument>
  );
}

function heading(text: string) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 180, after: 80 },
  });
}

function bullet(text: string) {
  return new Paragraph({
    children: [new TextRun(text)],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

export async function exportCvPdf(cv: StructuredCv) {
  const blob = await pdf(<CvPdfDocument cv={cv} />).toBlob();
  downloadBlob(blob, cvFileName(cv, "pdf"));
}

export async function exportCvDocx(cv: StructuredCv) {
  const children: Paragraph[] = [];
  const meta = [
    cv.header.targetTitle,
    cv.header.location,
    cv.header.phone,
    cv.header.email,
    ...cv.header.links.map(linkText),
  ].filter(Boolean);

  if (cv.header.name) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: cv.header.name, bold: true, size: 32 })],
      })
    );
  }
  if (meta.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: meta.join(" | "), size: 19 })],
        spacing: { after: 180 },
      })
    );
  }

  for (const section of orderedSections(cv.sectionOrder)) {
    if (section === "summary") {
      children.push(heading("SUMMARY"), new Paragraph(cv.summary));
    }

    if (section === "projects" && cv.projects.length > 0) {
      children.push(heading("SELECTED PROJECTS"));
      for (const project of cv.projects) {
        const title = joinPresent([project.name, project.descriptor], " - ");
        if (title || project.dates) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: title, bold: true }),
                new TextRun({ text: project.dates ? ` | ${project.dates}` : "" }),
              ],
            })
          );
        }
        children.push(...project.bullets.map(bullet));
      }
    }

    if (section === "experience" && cv.experience.length > 0) {
      children.push(heading("EXPERIENCE"));
      for (const item of cv.experience) {
        const title = joinPresent([item.title, item.company], " - ");
        const metaText = joinPresent([item.dates, item.location], " | ");
        if (title || metaText) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: title, bold: true }),
                new TextRun({ text: metaText ? ` | ${metaText}` : "" }),
              ],
            })
          );
        }
        children.push(...item.bullets.map(bullet));
      }
    }

    if (section === "skills" && cv.skills.groups.length > 0) {
      children.push(heading("SKILLS"));
      for (const group of cv.skills.groups) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${group.label}: `, bold: true }),
              new TextRun(group.items.join(", ")),
            ],
          })
        );
      }
    }

    if (section === "education" && cv.education.length > 0) {
      children.push(heading("EDUCATION"));
      for (const item of cv.education) {
        const title = joinPresent([item.degree, item.institution], " - ");
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: title, bold: true }),
              new TextRun({ text: item.dates ? ` | ${item.dates}` : "" }),
            ],
          })
        );
        if (item.details.length > 0) {
          children.push(new Paragraph(item.details.join("; ")));
        }
      }
    }

    if (section === "certifications" && cv.certifications.length > 0) {
      children.push(heading("CERTIFICATIONS"));
      children.push(new Paragraph(cv.certifications.join("; ")));
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, cvFileName(cv, "docx"));
}
