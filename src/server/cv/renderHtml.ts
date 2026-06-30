import type { FinalCv } from "./agentSchemas";

export type CvRenderDensity = "normal" | "soft" | "compact" | "tight" | "compressed";

export const cvRenderDensities = [
  "normal",
  "soft",
  "compact",
  "tight",
  "compressed",
] as const satisfies readonly CvRenderDensity[];

const densityStyles = {
  normal: {
    pagePadding: "11.5mm 12mm 10mm",
    headerMargin: "4.5mm",
    h1Size: "25pt",
    h1Margin: "1.8mm",
    subtitleSize: "12.2pt",
    subtitleMargin: "1.8mm",
    contactSize: "10.7pt",
    sectionMargin: "4.1mm",
    h2Margin: "2.1mm",
    h2Padding: "1.2mm",
    h2Size: "17pt",
    paragraphSize: "10.9pt",
    paragraphLineHeight: "1.17",
    itemMargin: "2.2mm",
    compactItemMargin: "1.6mm",
    itemGap: "6mm",
    itemTitleSize: "11.1pt",
    itemMetaSize: "10.2pt",
    listMargin: "1mm 0 0 4.2mm",
    listItemMargin: "0.65mm 0",
    listItemPadding: "0.8mm",
    listItemSize: "10.15pt",
    listItemLineHeight: "1.08",
    skillsSize: "10.4pt",
    skillsLineHeight: "1.12",
    skillsMargin: "0.75mm",
    certMargin: "1.6mm",
  },
  soft: {
    pagePadding: "10.8mm 11.5mm 9.3mm",
    headerMargin: "3.9mm",
    h1Size: "24.2pt",
    h1Margin: "1.6mm",
    subtitleSize: "11.9pt",
    subtitleMargin: "1.6mm",
    contactSize: "10.45pt",
    sectionMargin: "3.65mm",
    h2Margin: "1.9mm",
    h2Padding: "1.05mm",
    h2Size: "16.4pt",
    paragraphSize: "10.6pt",
    paragraphLineHeight: "1.145",
    itemMargin: "1.95mm",
    compactItemMargin: "1.4mm",
    itemGap: "5.5mm",
    itemTitleSize: "10.85pt",
    itemMetaSize: "10pt",
    listMargin: "0.88mm 0 0 4.05mm",
    listItemMargin: "0.55mm 0",
    listItemPadding: "0.7mm",
    listItemSize: "9.95pt",
    listItemLineHeight: "1.06",
    skillsSize: "10.2pt",
    skillsLineHeight: "1.1",
    skillsMargin: "0.65mm",
    certMargin: "1.4mm",
  },
  compact: {
    pagePadding: "10mm 11mm 8.8mm",
    headerMargin: "3.4mm",
    h1Size: "23.5pt",
    h1Margin: "1.4mm",
    subtitleSize: "11.6pt",
    subtitleMargin: "1.4mm",
    contactSize: "10.2pt",
    sectionMargin: "3.2mm",
    h2Margin: "1.7mm",
    h2Padding: "0.9mm",
    h2Size: "15.8pt",
    paragraphSize: "10.3pt",
    paragraphLineHeight: "1.12",
    itemMargin: "1.7mm",
    compactItemMargin: "1.2mm",
    itemGap: "5mm",
    itemTitleSize: "10.6pt",
    itemMetaSize: "9.8pt",
    listMargin: "0.75mm 0 0 3.9mm",
    listItemMargin: "0.45mm 0",
    listItemPadding: "0.6mm",
    listItemSize: "9.7pt",
    listItemLineHeight: "1.04",
    skillsSize: "9.95pt",
    skillsLineHeight: "1.08",
    skillsMargin: "0.55mm",
    certMargin: "1.2mm",
  },
  tight: {
    pagePadding: "8.5mm 10mm 7.8mm",
    headerMargin: "2.7mm",
    h1Size: "22pt",
    h1Margin: "1.1mm",
    subtitleSize: "11pt",
    subtitleMargin: "1.1mm",
    contactSize: "9.8pt",
    sectionMargin: "2.5mm",
    h2Margin: "1.3mm",
    h2Padding: "0.7mm",
    h2Size: "14.6pt",
    paragraphSize: "9.8pt",
    paragraphLineHeight: "1.08",
    itemMargin: "1.3mm",
    compactItemMargin: "0.9mm",
    itemGap: "4mm",
    itemTitleSize: "10.1pt",
    itemMetaSize: "9.3pt",
    listMargin: "0.55mm 0 0 3.5mm",
    listItemMargin: "0.28mm 0",
    listItemPadding: "0.45mm",
    listItemSize: "9.25pt",
    listItemLineHeight: "1.01",
    skillsSize: "9.45pt",
    skillsLineHeight: "1.04",
    skillsMargin: "0.4mm",
    certMargin: "0.9mm",
  },
  compressed: {
    pagePadding: "7mm 9mm 6.8mm",
    headerMargin: "2.1mm",
    h1Size: "20.5pt",
    h1Margin: "0.8mm",
    subtitleSize: "10.4pt",
    subtitleMargin: "0.8mm",
    contactSize: "9.2pt",
    sectionMargin: "1.9mm",
    h2Margin: "1mm",
    h2Padding: "0.55mm",
    h2Size: "13.4pt",
    paragraphSize: "9.25pt",
    paragraphLineHeight: "1.04",
    itemMargin: "1mm",
    compactItemMargin: "0.7mm",
    itemGap: "3.4mm",
    itemTitleSize: "9.6pt",
    itemMetaSize: "8.9pt",
    listMargin: "0.4mm 0 0 3.1mm",
    listItemMargin: "0.16mm 0",
    listItemPadding: "0.35mm",
    listItemSize: "8.8pt",
    listItemLineHeight: "0.99",
    skillsSize: "9pt",
    skillsLineHeight: "1.01",
    skillsMargin: "0.28mm",
    certMargin: "0.7mm",
  },
} as const satisfies Record<CvRenderDensity, Record<string, string>>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function text(value: string | undefined) {
  return value ? escapeHtml(value) : "";
}

function contactLine(cv: FinalCv) {
  const items = [
    cv.header.location,
    cv.header.phone,
    cv.header.email,
    ...cv.header.links.map((link) => link.url),
  ].filter(Boolean) as string[];
  return items.map(text).join(" | ");
}

function bullets(items: Array<{ text: string }>) {
  if (!items.length) return "";
  return `<ul>${items.map((item) => `<li>${text(item.text)}</li>`).join("")}</ul>`;
}

function renderExperience(cv: FinalCv) {
  if (!cv.experience.length) return "";
  return section(
    "Experience",
    cv.experience
      .map((item) => {
        const meta = [item.location, item.dates].filter(Boolean).join(" | ");
        return `<div class="item"><div class="item-head"><strong>${text(item.role)} | ${text(item.company)}</strong><em>${text(meta)}</em></div>${bullets(item.bullets)}</div>`;
      })
      .join("")
  );
}

function renderProjects(cv: FinalCv) {
  if (!cv.projects.length) return "";
  return section(
    "Projects",
    cv.projects
      .map((item) => {
        const title = [item.name, item.descriptor].filter(Boolean).join(" | ");
        return `<div class="item"><div class="item-head"><strong>${text(title)}</strong><em>${text(item.dates)}</em></div>${bullets(item.bullets)}</div>`;
      })
      .join("")
  );
}

function renderSkills(cv: FinalCv) {
  if (!cv.skills.length) return "";
  return section(
    "Technical Skills",
    `<div class="skills">${cv.skills
      .map(
        (group) =>
          `<p><strong>${text(group.group)}:</strong> ${group.skills.map(text).join(", ")}</p>`
      )
      .join("")}</div>`
  );
}

function renderEducation(cv: FinalCv) {
  if (!cv.education.length && !cv.certifications.length) return "";
  const education = cv.education
    .map((item) => {
      const title = [item.institution, item.degree].filter(Boolean).join(" | ");
      return `<div class="item compact"><div class="item-head"><strong>${text(title)}</strong><em>${text(item.dates)}</em></div>${item.details.length ? `<p class="muted">${item.details.map(text).join(". ")}</p>` : ""}</div>`;
    })
    .join("");
  const certifications = cv.certifications.length
    ? `<p class="cert-label"><strong>Certifications:</strong></p>${bullets(cv.certifications)}`
    : "";
  return section("Education & Certifications", `${education}${certifications}`);
}

function renderPublications(cv: FinalCv) {
  if (!cv.publications.length) return "";
  return section("Publications", bullets(cv.publications));
}

function section(label: string, body: string) {
  return `<section><h2>${escapeHtml(label)}</h2>${body}</section>`;
}

function sectionHtml(sectionId: string, cv: FinalCv) {
  if (sectionId === "summary" && cv.summary.text && cv.summary.display !== "omit") {
    const summaryText = `<p>${text(cv.summary.text)}</p>`;
    if (cv.summary.display === "lede") {
      return `<div class="lede">${summaryText}</div>`;
    }
    return section("Professional Summary", summaryText);
  }
  if (sectionId === "experience") return renderExperience(cv);
  if (sectionId === "projects") return renderProjects(cv);
  if (sectionId === "skills") return renderSkills(cv);
  if (sectionId === "education") return renderEducation(cv);
  if (sectionId === "publications") return renderPublications(cv);
  return "";
}

export function renderCvHtml(
  cv: FinalCv,
  options: { density?: CvRenderDensity } = {}
) {
  const styles = densityStyles[options.density ?? "normal"];
  const orderedSections = Array.from(
    new Set([...cv.sectionOrder, "summary", "experience", "projects", "skills", "education"])
  )
    .map((sectionId) => sectionHtml(sectionId, cv))
    .filter(Boolean)
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${text(cv.header.name)} CV</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; background: #f3f5f8; }
    body { font-family: Georgia, "Times New Roman", serif; color: #111; }
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      background: white;
      padding: ${styles.pagePadding};
      overflow: hidden;
    }
    header { text-align: center; margin-bottom: ${styles.headerMargin}; }
    h1 { margin: 0 0 ${styles.h1Margin}; font-size: ${styles.h1Size}; line-height: 1.05; font-weight: 500; }
    .subtitle { margin: 0 0 ${styles.subtitleMargin}; font-size: ${styles.subtitleSize}; line-height: 1.12; font-weight: 700; }
    .contact { margin: 0; font-size: ${styles.contactSize}; line-height: 1.12; }
    .lede { margin-top: ${styles.headerMargin}; }
    .lede p { font-size: ${styles.paragraphSize}; line-height: ${styles.paragraphLineHeight}; }
    section { margin-top: ${styles.sectionMargin}; }
    h2 {
      margin: 0 0 ${styles.h2Margin};
      padding-bottom: ${styles.h2Padding};
      border-bottom: 0.4pt solid #b9b9b9;
      font-size: ${styles.h2Size};
      line-height: 1.05;
      font-weight: 500;
    }
    p { margin: 0; font-size: ${styles.paragraphSize}; line-height: ${styles.paragraphLineHeight}; }
    .item { margin-top: ${styles.itemMargin}; }
    .item.compact { margin-top: ${styles.compactItemMargin}; }
    .item-head { display: flex; align-items: baseline; justify-content: space-between; gap: ${styles.itemGap}; }
    .item-head strong { min-width: 0; font-size: ${styles.itemTitleSize}; line-height: 1.06; }
    .item-head em { flex: 0 0 auto; font-size: ${styles.itemMetaSize}; line-height: 1.06; }
    ul { margin: ${styles.listMargin}; padding: 0; }
    li { margin: ${styles.listItemMargin}; padding-left: ${styles.listItemPadding}; font-size: ${styles.listItemSize}; line-height: ${styles.listItemLineHeight}; }
    .skills p { margin-top: ${styles.skillsMargin}; font-size: ${styles.skillsSize}; line-height: ${styles.skillsLineHeight}; }
    .muted { color: #555; font-style: italic; margin-top: 0.6mm; }
    .cert-label { margin-top: ${styles.certMargin}; }
    @media screen {
      .page { box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18); }
    }
  </style>
</head>
<body>
  <main class="page">
    <header>
      <h1>${text(cv.header.name)}</h1>
      <p class="subtitle">${text(cv.header.targetTitle)}</p>
      <p class="contact">${contactLine(cv)}</p>
    </header>
    ${orderedSections}
  </main>
</body>
</html>`;
}
