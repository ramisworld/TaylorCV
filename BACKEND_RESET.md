# TaylorCV Dashboard-First Backend Reset

## Current Shape

- Auth, Better Auth sessions, tRPC, Prisma, and the landing hero are preserved.
- The old admin, billing, Stripe, placeholder workflow, and legacy export paths are removed from the active app.
- `/dashboard` is now the product surface for upload, job analysis, questions, generation, preview, and download.
- CV generation runs through a hard-wired, stateless OpenAI Agents SDK pipeline with Zod v4 structured outputs.
- Preview HTML and PDF export share the same stored HTML source so the browser preview and downloaded PDF match.

## Agent Pipeline

- A1 `profileExtract` builds the persisted `CareerProfile` and seniority signal.
- A2 `jobAnalyze` extracts role requirements and proof needs.
- A1 and A2 run in parallel for first-time users; repeat users skip A1.
- A3 `questions` creates match score, improvement cards, and targeted questions.
- A4 `writer` uses the versioned `prompts/writer-base.v1.md` prompt and writes the final structured CV.

## Guardrails

- Paid roles stay under Experience; real projects stay under Projects.
- The post-run hallucination gate strips untraceable employers, dates, metrics, and skills.
- Skills are constrained to the intersection of the user's profile and the job description.
- One-page fit is enforced by deterministic compaction before any rare tighter writer retry.
