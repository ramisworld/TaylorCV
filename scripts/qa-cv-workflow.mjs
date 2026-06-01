import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { PrismaClient } from "../generated/prisma/index.js";

const defaultFixtureDir = "test-fixtures/private/rami-halter";
const defaultCvPath = path.resolve(defaultFixtureDir, "rami_cv.pdf");
const defaultJobPath = path.resolve(defaultFixtureDir, "job-description.txt");
const cvPath = path.resolve(process.env.QA_CV_FILE ?? defaultCvPath);
const jobPath = path.resolve(process.env.QA_JOB_FILE ?? defaultJobPath);
const port = process.env.QA_CV_PORT ?? "3035";
const baseUrl = process.env.QA_CV_BASE_URL ?? `http://127.0.0.1:${port}`;
const strict = process.env.QA_CV_STRICT === "true";
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const artifactDir = path.resolve("artifacts/cv-workflow", runId);

function now() {
  return Date.now();
}

function duration(start) {
  return Date.now() - start;
}

function requireFixture(filePath, label) {
  if (!existsSync(filePath)) {
    throw new Error(`${label} fixture is missing: ${filePath}`);
  }
}

async function waitForServer(url, timeoutMs = 60_000) {
  const started = now();
  while (duration(started) < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Keep waiting.
    }
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function waitForEither(page, targets, timeout = 180_000) {
  const winner = await Promise.race(
    targets.map(async (target) => {
      await page.getByText(target.pattern).waitFor({ state: "visible", timeout });
      return target;
    })
  );
  if (winner.error) {
    const bodyText = await page.locator("body").innerText().catch(() => "");
    throw new Error(`${winner.label}: ${bodyText.slice(0, 1200)}`);
  }
  return winner.label;
}

function startServer() {
  if (process.env.QA_CV_BASE_URL) return null;
  return spawn(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", port],
    {
      cwd: process.cwd(),
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );
}

function extractApplicationId(url, fallback) {
  try {
    return new URL(url).searchParams.get("applicationId") ?? fallback ?? null;
  } catch {
    return fallback ?? null;
  }
}

async function readQuestions(page) {
  return page.locator("textarea").evaluateAll((textareas) =>
    textareas.map((textarea, index) => {
      let card = textarea.parentElement;
      while (card?.parentElement) {
        const text = card.textContent ?? "";
        const questionText = text.replace(/Your answer.*/i, "").replace(/^\d+\s*/, "").trim();
        if (
          text.includes("Your answer") &&
          card.querySelectorAll("textarea").length === 1 &&
          questionText.length > 20
        ) {
          break;
        }
        card = card.parentElement;
      }
      const text = card?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      return {
        index,
        text: text
          .replace(/^\d+\s*/, "")
          .replace(/Your answer.*/i, "")
          .trim() || `Gap question ${index + 1}`,
      };
    })
  );
}

async function answerGapQuestions(page) {
  const answerTextareas = page.locator("textarea");
  const count = await answerTextareas.count();
  if (count === 0) {
    await page.getByRole("button", { name: /Generate my CV/i }).click();
    return [];
  }

  const questions = await readQuestions(page);
  const answers = [];
  const envAnswers = process.env.QA_GAP_ANSWERS_JSON
    ? JSON.parse(process.env.QA_GAP_ANSWERS_JSON)
    : null;

  if (Array.isArray(envAnswers)) {
    for (const question of questions) {
      const answer = String(envAnswers[question.index] ?? "").trim();
      answers.push({ question: question.text, answer });
      await answerTextareas.nth(question.index).fill(answer);
    }
    await page.getByRole("button", { name: /Use these answers/i }).click();
    return answers;
  }

  const rl = readline.createInterface({ input, output });

  console.log("\nGap questions from the app:");
  for (const question of questions) {
    console.log(`\n${question.index + 1}. ${question.text}`);
    const answer = await rl.question("Answer as Rami, concise and truthful: ");
    answers.push({ question: question.text, answer });
    await answerTextareas.nth(question.index).fill(answer.trim());
  }
  rl.close();

  await page.getByRole("button", { name: /Use these answers/i }).click();
  return answers;
}

function qualityWarnings(finalText, renderMetrics) {
  const text = finalText.replace(/\s+/g, " ").trim();
  const warnings = [];
  if (!text) return warnings;
  if (/https?:\/\/(www\.)?linkedin\.com|www\.linkedin\.com\/www\.linkedin\.com/i.test(text)) {
    warnings.push("LinkedIn/contact normalization looks suspicious.");
  }
  if (text.includes("—")) warnings.push("Final CV contains em dashes.");
  if (/poor CV outputs|weak evidence retrieval/i.test(text)) {
    warnings.push("Final CV uses awkward negative product phrasing.");
  }
  if (!/Selected .*?(Achievements|Projects|Systems)|Technical Achievements|AI Systems/i.test(text)) {
    warnings.push("No obvious proof-first selected achievements/projects section found.");
  }
  if (/Certifications\s+[A-Z][^.]{180,}$/i.test(text)) {
    warnings.push("Certifications may still be clumped instead of scannable.");
  }
  const latestMetrics = renderMetrics.at(-1)?.payload;
  const layoutWarnings = latestMetrics?.layoutWarnings;
  if (Array.isArray(layoutWarnings) && layoutWarnings.length > 0) {
    warnings.push(`Renderer layout warnings: ${layoutWarnings.join(", ")}`);
  }
  const remaining = latestMetrics?.remainingHeightPercent;
  if (typeof remaining === "number" && remaining > 18) {
    warnings.push(`Possible underfill: ${remaining}% page height remaining.`);
  }
  return warnings;
}

async function loadAgentRuns(applicationId) {
  if (!applicationId) return [];
  const prisma = new PrismaClient();
  try {
    return await prisma.agentRun.findMany({
      where: { applicationId },
      orderBy: { createdAt: "asc" },
      select: {
        agentName: true,
        model: true,
        status: true,
        durationMs: true,
        promptTokens: true,
        completionTokens: true,
        totalTokens: true,
        estimatedCostUsd: true,
        error: true,
        createdAt: true,
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  requireFixture(cvPath, "CV");
  requireFixture(jobPath, "Job description");
  await mkdir(artifactDir, { recursive: true });

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("Playwright is not installed. Run npm install first.");
  }

  const server = startServer();
  let serverOutput = "";
  server?.stdout.on("data", (chunk) => {
    const value = chunk.toString();
    serverOutput += value;
    process.stdout.write(value);
  });
  server?.stderr.on("data", (chunk) => {
    const value = chunk.toString();
    serverOutput += value;
    process.stderr.write(value);
  });

  const browserConsole = [];
  const pageErrors = [];
  const failedResponses = [];
  const stepTimings = {};
  const runStarted = now();
  let browser;
  let applicationId = null;
  let finalText = "";
  let gapAnswers = [];
  let workflowError = null;

  try {
    await waitForServer(baseUrl);
    browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1500 },
    });
    const page = await context.newPage();

    page.on("console", async (message) => {
      const entry = { type: message.type(), text: message.text(), payload: null };
      try {
        const args = message.args();
        if (args.length >= 2) entry.payload = await args[1].jsonValue();
      } catch {
        // Some console args are not serializable.
      }
      browserConsole.push(entry);
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("response", (response) => {
      const status = response.status();
      if (status >= 400) {
        failedResponses.push({ status, url: response.url() });
      }
    });

    const jobText = await (await import("node:fs/promises")).readFile(jobPath, "utf8");

    let start = now();
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.clear());
    await page.getByRole("button", { name: /^See what my CV is missing/i }).click();
    await page.getByPlaceholder("Paste the full job description here...").waitFor({ state: "visible", timeout: 30_000 });
    applicationId = extractApplicationId(page.url(), await page.evaluate(() => localStorage.getItem("currentApplicationId")));
    stepTimings.startApplicationMs = duration(start);

    start = now();
    await page.getByPlaceholder("Paste the full job description here...").fill(jobText);
    await page.getByRole("button", { name: /Build the job brief/i }).click();
    await waitForEither(page, [
      { label: "cv_upload", pattern: /Add your current CV/i },
      { label: "job_intake_error", pattern: /Taylor could not complete the AI step|analysis service|OpenAI Responses API/i, error: true },
    ]);
    stepTimings.submitJobStepMs = duration(start);

    start = now();
    await page.setInputFiles("#cv-upload", cvPath);
    const uploadedFileName = path.basename(cvPath).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    await page.getByText(new RegExp(`${uploadedFileName}|CV text ready`, "i")).waitFor({ state: "visible", timeout: 30_000 });
    await page.getByRole("button", { name: /Build my profile/i }).click();
    await waitForEither(page, [
      { label: "gap_questions", pattern: /A few useful details|No extra questions needed/i },
      { label: "candidate_profile_error", pattern: /Taylor could not complete the AI step|analysis service|OpenAI Responses API/i, error: true },
    ]);
    stepTimings.candidateProfileStepMs = duration(start);

    start = now();
    gapAnswers = await answerGapQuestions(page);
    await waitForEither(page, [
      { label: "final_cv", pattern: /Your tailored one-page CV is ready/i },
      { label: "composer_error", pattern: /Taylor could not complete the AI step|analysis service|OpenAI Responses API/i, error: true },
    ], 240_000);
    stepTimings.gapAndComposerStepMs = duration(start);

    const document = page.locator("[data-cv-document]");
    await document.waitFor({ state: "visible", timeout: 30_000 });
    await document.screenshot({ path: path.join(artifactDir, "final-cv.png") });
    finalText = await document.innerText();
    await writeFile(path.join(artifactDir, "final-cv-text.txt"), finalText);

    applicationId = extractApplicationId(page.url(), applicationId);
    await browser.close();
    browser = null;
  } catch (error) {
    workflowError = error instanceof Error ? error.stack ?? error.message : String(error);
    if (browser) {
      try {
        const pages = browser.contexts().flatMap((context) => context.pages());
        const page = pages[0];
        if (page) await page.screenshot({ path: path.join(artifactDir, "failure-page.png"), fullPage: true });
      } catch {
        // Best effort failure artifact.
      }
      await browser.close();
    }
  } finally {
    server?.kill();
    await writeFile(path.join(artifactDir, "server.log"), serverOutput);
  }

  const agentRuns = await loadAgentRuns(applicationId);
  const renderMetrics = browserConsole.filter((entry) =>
    /CV_RENDER_METRICS|CV_RENDERER_LAYOUT_METRICS/.test(entry.text)
  );
  const warnings = qualityWarnings(finalText, renderMetrics);
  const totalCost = agentRuns.reduce((sum, run) => sum + Number(run.estimatedCostUsd ?? 0), 0);
  const report = {
    runId,
    applicationId,
    baseUrl,
    cvPath,
    jobPath,
    artifactDir,
    totalWorkflowMs: duration(runStarted),
    stepTimings,
    totalEstimatedCostUsd: Math.round(totalCost * 1_000_000) / 1_000_000,
    agentRuns,
    gapAnswers,
    warnings,
    pageErrors,
    failedResponses,
    renderMetrics,
    workflowError,
  };

  await writeFile(path.join(artifactDir, "agent-runs.json"), JSON.stringify(agentRuns, null, 2));
  await writeFile(path.join(artifactDir, "browser-console.json"), JSON.stringify(browserConsole, null, 2));
  await writeFile(path.join(artifactDir, "report.json"), JSON.stringify(report, null, 2));

  if (workflowError) {
    await writeFile(path.join(artifactDir, "failure.txt"), workflowError);
    throw new Error(`CV workflow failed. Artifacts: ${artifactDir}\n${workflowError}`);
  }

  console.log(`\nSaved workflow artifacts to ${artifactDir}`);
  console.log(`Final CV screenshot: ${path.join(artifactDir, "final-cv.png")}`);
  console.table(
    agentRuns.map((run) => ({
      agent: run.agentName,
      model: run.model,
      status: run.status,
      ms: run.durationMs,
      tokens: run.totalTokens,
      cost: run.estimatedCostUsd,
    }))
  );
  if (warnings.length) {
    console.warn("\nQuality warnings:");
    for (const warning of warnings) console.warn(`- ${warning}`);
    if (strict) process.exitCode = 1;
  }
}

main().catch(async (error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  await mkdir(artifactDir, { recursive: true });
  await writeFile(path.join(artifactDir, "failure.txt"), message);
  console.error(`\nCV workflow QA failed. Artifacts: ${artifactDir}`);
  console.error(message);
  process.exit(1);
});
