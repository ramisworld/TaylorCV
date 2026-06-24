import { chromium, type Browser } from "playwright";

import type { FinalCv } from "./agentSchemas";
import { cvRenderDensities, renderCvHtml } from "./renderHtml.ts";

let browserPromise: Promise<Browser> | null = null;

async function getBrowser() {
  browserPromise ??= chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  return browserPromise;
}

export async function closePdfRenderer() {
  const browser = await browserPromise;
  browserPromise = null;
  await browser?.close();
}

function countPdfPages(buffer: Buffer) {
  const text = buffer.toString("latin1");
  return (text.match(/\/Type\s*\/Page\b/g) ?? []).length;
}

async function htmlToPdf(html: string) {
  const browser = await getBrowser();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  try {
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdf = await page.pdf({
      format: "A4",
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      printBackground: true,
      preferCSSPageSize: true,
    });
    return Buffer.from(pdf);
  } finally {
    await page.close();
  }
}

export async function renderPdfWithTypographyFit(cv: FinalCv) {
  const current = structuredClone(cv);
  let lastRender: {
    html: string;
    pdf: Buffer;
    pageCount: number;
    density: string;
  } | null = null;

  for (const [attempt, density] of cvRenderDensities.entries()) {
    const html = renderCvHtml(current, { density });
    const pdf = await htmlToPdf(html);
    const pageCount = countPdfPages(pdf);
    lastRender = { html, pdf, pageCount, density };

    if (pageCount <= 1) {
      return {
        cv: current,
        html,
        pdf,
        metrics: {
          pageCount,
          fitAttempts: attempt,
          fitReasons:
            density === "normal" ? [] : [`Applied ${density} typography`],
          layoutDensity: density,
        },
      };
    }
  }

  if (!lastRender) {
    throw new Error("TaylorCV could not render this CV.");
  }

  return {
    cv: current,
    html: lastRender.html,
    pdf: lastRender.pdf,
    metrics: {
      pageCount: lastRender.pageCount,
      fitAttempts: cvRenderDensities.length - 1,
      fitReasons: [`Applied ${lastRender.density} typography`],
      layoutDensity: lastRender.density,
      failedToFit: true,
    },
  };
}
