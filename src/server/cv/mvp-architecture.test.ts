import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { estimateCost } from "../../lib/modelPricing.ts";
import type { FinalCv, JobAnalyze, ProfileExtract } from "./agentSchemas.ts";
import { runInitialProfileAndJobAnalysis } from "./initialAnalysis.ts";
import { renderCvHtml } from "./renderHtml.ts";
import { closePdfRenderer, renderPdfWithTypographyFit } from "./renderPdf.ts";
import { sectionOrderForSeniority } from "./seniorityStrategy.ts";

function profile(): ProfileExtract {
  return {
    basics: {
      fullName: "Rami Alobaidy",
      currentTitle: "AI Engineer",
      links: [],
    },
    about: { targetRoles: [] },
    seniority: "junior",
    experience: [
      {
        role: "AI Engineer",
        company: "AICodeLabs",
        dates: "2025 - 2026",
        bullets: ["Improved benchmark score by 56% using QLoRA and LLM evaluation."],
        tools: ["TypeScript", "Python", "QLoRA"],
        links: [],
      },
    ],
    projects: [
      {
        name: "TaylorCV",
        bullets: ["Built a Next.js app with tRPC and PostgreSQL."],
        tools: ["TypeScript", "Next.js", "PostgreSQL"],
        links: [],
      },
    ],
    skills: ["TypeScript", "Python", "Next.js", "PostgreSQL", "QLoRA"],
    skillGroups: [],
    education: [],
    certifications: [],
    metrics: ["56%"],
    achievements: [],
    evidenceNotes: [],
    preferences: { roleTypes: [], industries: [], locations: [], exclusions: [] },
  };
}

function job(): JobAnalyze {
  return {
    targetRole: "AI Engineer",
    mustHaveSkills: ["TypeScript", "Python", "Next.js"],
    niceToHaveSkills: [],
    responsibilities: [],
    proofNeeds: [],
    recruiterPriorities: [],
    keywords: ["TypeScript", "Python", "Next.js"],
  };
}

function cv(): FinalCv {
  return {
    header: {
      name: "Rami Alobaidy",
      targetTitle: "AI Engineer",
      links: [],
    },
    sectionOrder: ["summary", "experience", "projects", "skills", "education"],
    summary: {
      text: "AI Engineer with practical model and product evidence.",
      priorityRank: 1,
    },
    experience: [
      {
        role: "AI Engineer",
        company: "AICodeLabs",
        dates: "2025 - 2026",
        priorityRank: 1,
        bullets: [
          { text: "Improved benchmark score by 56% using QLoRA.", priorityRank: 1, evidenceRefs: [] },
          { text: "Invented a 99% revenue metric.", priorityRank: 9, evidenceRefs: [] },
          { text: "Built evaluation workflow in Python.", priorityRank: 2, evidenceRefs: [] },
        ],
      },
      {
        role: "Founder",
        company: "FakeCorp",
        dates: "2021",
        priorityRank: 9,
        bullets: [{ text: "Scaled revenue by 200%.", priorityRank: 9, evidenceRefs: [] }],
      },
    ],
    projects: [
      {
        name: "TaylorCV",
        priorityRank: 1,
        bullets: [{ text: "Built a Next.js app with tRPC.", priorityRank: 1, evidenceRefs: [] }],
      },
    ],
    skills: [
      {
        group: "Tools",
        skills: ["TypeScript", "Python", "Go"],
        priorityRank: 1,
      },
    ],
    education: [],
    certifications: [
      { text: "Important certification", priorityRank: 1 },
      { text: "Low priority cert", priorityRank: 9 },
    ],
    publications: [],
    warnings: [],
  };
}

test("seniority maps to required section order", () => {
  assert.deepEqual(sectionOrderForSeniority("intern"), [
    "education",
    "projects",
    "skills",
    "experience",
  ]);
  assert.deepEqual(sectionOrderForSeniority("senior"), [
    "summary",
    "experience",
    "skills",
    "education",
  ]);
});

test("writer prompt forbids unsupported seniority in displayed title", async () => {
  const prompt = await readFile("prompts/writer-base.v1.md", "utf8");
  assert.match(prompt, /Use a truthful candidate title aligned to the posting/);
  assert.match(prompt, /Never put Senior, Staff, Lead, Principal, Manager, Architect/);
  assert.match(prompt, /false seniority is worse/);
});

test("writer prompt preserves useful core evidence without forcing every vault item", async () => {
  const prompt = await readFile("prompts/writer-base.v1.md", "utf8");
  assert.match(prompt, /Preserve the candidate's useful core evidence inventory/);
  assert.match(prompt, /may omit details that are irrelevant, duplicative, distracting/);
  assert.match(prompt, /Compress bullets before dropping an entire project/);
});

test("question agent asks concise candidate-friendly questions", async () => {
  const agents = await readFile("src/server/cv/agents.ts", "utf8");
  assert.match(agents, /Questions are for the candidate, not an analyst/);
  assert.match(agents, /Keep each question under 18 words/);
  assert.match(agents, /Do not combine multiple long examples in one question/);
});

test("writer receives candidate vault instead of raw CV evidence", async () => {
  const agents = await readFile("src/server/cv/agents.ts", "utf8");
  assert.match(agents, /candidateVault: args\.profile/);
  assert.doesNotMatch(agents, /rawCvEvidence/);
});

test("fitting uses typography instead of deterministic content removal", async () => {
  const renderPdf = await readFile("src/server/cv/renderPdf.ts", "utf8");
  assert.doesNotMatch(renderPdf, /compactCvOnce/);
  assert.doesNotMatch(renderPdf, /renderPdfWithCompaction/);
  assert.doesNotMatch(renderPdf, /compactionAttempts/);
  assert.doesNotMatch(renderPdf, /compactionReasons/);
  assert.match(renderPdf, /renderPdfWithTypographyFit/);
  assert.match(renderPdf, /cvRenderDensities/);
  assert.match(renderPdf, /fitAttempts/);
  assert.match(renderPdf, /fitReasons/);
});

test("certifications remain as bullets in the rendered CV", () => {
  const html = renderCvHtml(cv(), { density: "compressed" });
  assert.match(html, /<strong>Certifications:<\/strong><\/p><ul>/);
  assert.match(html, /Important certification/);
  assert.match(html, /Low priority cert/);
});

test("PDF fitting renders one page without removing structured content", async () => {
  const source = cv();
  try {
    const rendered = await renderPdfWithTypographyFit(source);

    assert.equal(rendered.metrics.pageCount, 1);
    assert.ok(Buffer.isBuffer(rendered.pdf));
    assert.match(rendered.pdf.subarray(0, 8).toString("latin1"), /^%PDF-/);
    assert.deepEqual(rendered.cv, source);
    assert.equal(rendered.cv.certifications.length, source.certifications.length);
    assert.equal(
      rendered.cv.experience[0]?.bullets.length,
      source.experience[0]?.bullets.length
    );
    assert.match(rendered.html, /Important certification/);
    assert.match(rendered.html, /Low priority cert/);
    assert.ok(
      ["normal", "compact", "tight", "compressed"].includes(
        rendered.metrics.layoutDensity
      )
    );
  } finally {
    await closePdfRenderer();
  }
});

test("writer output is not patched with deterministic certification appends", async () => {
  const agents = await readFile("src/server/cv/agents.ts", "utf8");
  assert.doesNotMatch(agents, /preserveProfileCertifications/);
  assert.doesNotMatch(agents, /normalizedCredential/);
  assert.doesNotMatch(agents, /certifications\.slice\(0, 4\)/);
});

test("pricing covers all default model tiers with cached input", () => {
  for (const model of ["gpt-5.5", "gpt-5.4", "gpt-5.4-mini", "gpt-5.4-nano"]) {
    const cost = estimateCost({
      model,
      inputTokens: 10_000,
      cachedInputTokens: 8_000,
      outputTokens: 1_000,
    });
    assert.equal(typeof cost, "number");
    assert.ok((cost ?? 0) > 0);
  }
});

test("initial profile and job analysis runs concurrently", async () => {
  const events: string[] = [];
  const started = Date.now();
  const result = await runInitialProfileAndJobAnalysis({
    profileTask: async () => {
      events.push("profile-start");
      await new Promise((resolve) => setTimeout(resolve, 60));
      events.push("profile-end");
      return "profile";
    },
    jobTask: async () => {
      events.push("job-start");
      await new Promise((resolve) => setTimeout(resolve, 60));
      events.push("job-end");
      return "job";
    },
  });

  assert.deepEqual(result, { profile: "profile", job: "job" });
  assert.deepEqual(events.slice(0, 2).sort(), ["job-start", "profile-start"]);
  assert.ok(Date.now() - started < 105);
});
