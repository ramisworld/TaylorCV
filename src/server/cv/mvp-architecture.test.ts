import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { estimateCost } from "../../lib/modelPricing.ts";
import { FinalCvSchema, type FinalCv, type JobAnalyze, type ProfileExtract } from "./agentSchemas.ts";
import { runInitialProfileAndJobAnalysis } from "./initialAnalysis.ts";
import { normalizeExtractedProfile } from "./profileNormalize.ts";
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
      display: "section",
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
  assert.match(prompt, /early-career AI\/ML candidates/);
  assert.match(prompt, /Each real certification should stay as its own bullet by default/);
  assert.match(prompt, /may omit details that are irrelevant, duplicative, distracting/);
  assert.match(prompt, /Compress bullets before dropping an entire project/);
});

test("writer prompt treats six bullets as a ceiling, not a target", async () => {
  const prompt = await readFile("prompts/writer-base.v1.md", "utf8");
  assert.match(prompt, /Six bullets is a hard schema ceiling, not a goal/);
  assert.match(prompt, /Prefer fewer sharper bullets over dense clumps/);
  assert.match(prompt, /merge or drop overlapping bullets/);
});

test("writer prompt avoids rubric-sounding summary language", async () => {
  const prompt = await readFile("prompts/writer-base.v1.md", "utf8");
  assert.match(prompt, /Make the summary understandable without knowing project names/);
  assert.match(prompt, /Strongest evidence is/);
  assert.match(prompt, /Never write like an evaluator rubric/);
  assert.match(prompt, /AI\/ML Engineer focused on Applied ML Systems/);
  assert.match(prompt, /Graduate research assistant working on hardware-algorithm co-design/);
  assert.match(prompt, /Honest adjacent match/);
});

test("writer prompt distinguishes junior research from senior scientist positioning", async () => {
  const prompt = await readFile("prompts/writer-base.v1.md", "utf8");
  assert.match(prompt, /Junior research \/ graduate researcher/);
  assert.match(prompt, /Do not imply independent senior scientist scope/);
  assert.match(prompt, /Senior research scientist/);
  assert.match(prompt, /Do not use "Research Scientist," "Senior Researcher," or similar titles unless the vault supports that level/);
});

test("writer prompt has strong-education placement without defaulting education first", async () => {
  const prompt = await readFile("prompts/writer-base.v1.md", "utf8");
  assert.match(prompt, /Education placement/);
  assert.match(prompt, /only when the job materially values education\/research credentials/);
  assert.match(prompt, /Ivy\/top-tier equivalent/);
  assert.match(prompt, /No summary does not automatically mean Education goes first/);
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

test("generation uses one writer call without retry budget rewrites", async () => {
  const [agents, applicationRouter] = await Promise.all([
    readFile("src/server/cv/agents.ts", "utf8"),
    readFile("src/server/api/routers/application.ts", "utf8"),
  ]);
  assert.doesNotMatch(agents, /writerRetry/);
  assert.doesNotMatch(agents, /tighterBudget/);
  assert.doesNotMatch(applicationRouter, /tighterBudget/);
  assert.match(applicationRouter, /typography adjustments only/);
});

test("project-labelled profile experience is normalized into projects", () => {
  const source = profile();
  source.experience.push({
    role: "AI Software Engineer",
    company: "TaylorCV",
    location: "Auckland, NZ",
    dates: "Project",
    employmentType: "contract",
    bullets: ["Built an agent workflow for tailored CV generation."],
    tools: ["TypeScript", "PostgreSQL"],
    links: [],
  });

  const normalized = normalizeExtractedProfile(source);

  assert.equal(
    normalized.experience.some((item) => item.company === "TaylorCV"),
    false
  );
  assert.deepEqual(
    normalized.projects.find(
      (item) => item.name === "TaylorCV" && item.descriptor === "AI Software Engineer"
    ),
    {
      name: "TaylorCV",
      descriptor: "AI Software Engineer",
      dates: "Project",
      bullets: ["Built an agent workflow for tailored CV generation."],
      tools: ["TypeScript", "PostgreSQL"],
      links: [],
    }
  );
});

test("final CV schema accepts six bullets but rejects seven", () => {
  const sixBulletCv = cv();
  sixBulletCv.experience[0]!.bullets = Array.from({ length: 6 }, (_, index) => ({
    text: `Distinct evidence bullet ${index + 1}`,
    priorityRank: index + 1,
    evidenceRefs: [],
  }));

  assert.doesNotThrow(() => FinalCvSchema.parse(sixBulletCv));

  const sevenBulletCv = cv();
  sevenBulletCv.experience[0]!.bullets = Array.from({ length: 7 }, (_, index) => ({
    text: `Distinct evidence bullet ${index + 1}`,
    priorityRank: index + 1,
    evidenceRefs: [],
  }));

  assert.throws(() => FinalCvSchema.parse(sevenBulletCv), /Too big/);
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

test("summary can render as a headingless lede or be omitted", () => {
  const ledeCv = cv();
  ledeCv.summary = {
    text: "Graduate research assistant working on hardware-algorithm co-design.",
    display: "lede",
    priorityRank: 1,
  };
  const ledeHtml = renderCvHtml(ledeCv);
  assert.match(ledeHtml, /<div class="lede"><p>Graduate research assistant/);
  assert.doesNotMatch(ledeHtml, /Professional Summary/);

  const omittedCv = cv();
  omittedCv.summary = {
    text: "This should not render.",
    display: "omit",
    priorityRank: 1,
  };
  const omittedHtml = renderCvHtml(omittedCv);
  assert.doesNotMatch(omittedHtml, /This should not render/);
  assert.doesNotMatch(omittedHtml, /Professional Summary/);
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
      ["normal", "soft", "compact", "tight", "compressed"].includes(
        rendered.metrics.layoutDensity
      )
    );
    assert.ok(rendered.metrics.pageHeightPx > 0);
    assert.ok(rendered.metrics.contentHeightPx > 0);
    assert.ok(rendered.metrics.pageUtilization > 0);
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
