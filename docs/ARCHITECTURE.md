# TaylorCV Architecture

## Summary

TaylorCV is now a dashboard-first app. The landing page is only the front door; authenticated users build and revisit tailored CVs from `/dashboard`.

The MVP uses a stateless OpenAI Agents SDK pipeline, Prisma/Postgres persistence, deterministic hallucination stripping, and Playwright HTML-to-PDF rendering. PDF preview and download use the same stored HTML/PDF artifact.

## Runtime Flow

```txt
Landing hero
  -> auth
  -> dashboard
  -> upload/paste CV
  -> paste job description
  -> A1 profileExtract + A2 jobAnalyze in parallel
  -> A3 questions/match score
  -> user answers + notes
  -> A4 writer
  -> hallucination gate
  -> deterministic compaction
  -> Playwright PDF
  -> stored preview/download
```

Returning users already have a `CareerProfile`, so repeat applications skip A1 and run A2 -> A3 -> A4.

## Agents

The app uses `@openai/agents` with Zod v4 `outputType`.

- No handoffs.
- No sessions or model memory.
- No tools in the MVP.
- No streaming.
- Each step is one structured-output model call.
- State lives in Postgres, not inside agent sessions.

Default model env vars:

```txt
OPENAI_PROFILE_MODEL=gpt-5.4-nano
OPENAI_JOB_MODEL=gpt-5.4-nano
OPENAI_QUESTIONS_MODEL=gpt-5.4-nano
OPENAI_WRITER_MODEL=gpt-5.5
```

A1 and A2 run concurrently for first-time users. A4 uses `prompts/writer-base.v1.md` as a stable prompt-cacheable prefix, then appends seniority strategy and user/job data.

## CV Quality Rules

The writer prompt is derived from the style of `rami_cv.pdf`:

- recruiter-first, technical-reviewer-second
- direct summary
- concrete bullets with action, tools, proof and real metrics
- no generic AI phrasing
- projects under Projects, not fake Experience
- no invented employers, dates, metrics, tools or seniority

Seniority controls section order:

- Intern: Education -> Projects -> Skills -> Experience
- Junior: Summary -> Experience -> Projects -> Skills -> Education
- Intermediate: Summary -> Experience -> Skills -> Projects -> Education
- Senior: Summary -> Experience -> Skills -> Education
- Research: Publications -> Experience -> Projects -> Education

## Hallucination And Fit

The writer emits priority ranks for sections, items, bullets and certifications.

After A4 returns, a pure post-run transform strips untraceable employers, dates, metrics and skills before persistence. Skills must be in both the candidate profile and the job description. If anything is stripped, the application stores a warning for the dashboard.

Overflow is handled in code:

1. Drop lowest-priority certifications.
2. Drop lowest-priority project.
3. Drop lowest-priority experience bullets.
4. Drop lowest-priority project bullets.
5. If still overflowing, run one tighter A4 retry.

## Rendering

`FinalCv` is rendered to deterministic HTML/CSS. Playwright prints that HTML to A4 PDF. The dashboard iframe reads the same stored HTML from `/api/applications/[applicationId]/preview`; download reads the stored PDF from `/api/applications/[applicationId]/pdf`.

The PDF render step checks page count. A draft is not persisted if it cannot fit one page after deterministic compaction and one tighter writer retry.

## Data Model

Core tables:

- `CareerProfile`: user-owned base CV extraction.
- `CvApplication`: job, match, questions, answers, status and warnings.
- `CvDraft`: final structured JSON, sanitized JSON, HTML and PDF bytes.
- `AgentRun`: model, step, status, tokens, cached tokens, cost and duration.

`AgentRun` is an A/B harness, not just logs. Model changes should be env-only; compare quality/cost/latency through persisted runs.
