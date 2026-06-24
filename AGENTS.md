# TaylorCV Agent Guide

## Commands

- `npm run dev` - local Next app.
- `npm run typecheck` - TypeScript verification.
- `npm run test:cv` - deterministic CV pipeline tests.
- `npm run build` - production build.
- `npx prisma generate` - refresh Prisma client after schema edits.
- `npx prisma migrate dev` - apply local migrations.

## Architecture Rules

- `/` is the landing hero only.
- `/dashboard` is the app.
- Keep the CV workflow dashboard-first and authenticated.
- Use `@openai/agents` with Zod v4 `outputType`.
- Do not add agent handoffs, sessions, memory, open-ended tool loops or streaming for the MVP.
- Run A1 `profileExtract` and A2 `jobAnalyze` in parallel for first-time users.
- Repeat users skip A1 and reuse `CareerProfile`.
- State belongs in Postgres/Prisma, not in an agent session.

## Model Policy

Model names are env-driven:

```txt
OPENAI_PROFILE_MODEL=gpt-5.4-nano
OPENAI_JOB_MODEL=gpt-5.4-nano
OPENAI_QUESTIONS_MODEL=gpt-5.4-nano
OPENAI_WRITER_MODEL=gpt-5.5
```

Every model call must produce an `AgentRun` with step, model, status, tokens, cached tokens, cost and duration. Use this data to decide when cheaper models are good enough.

## CV Writing Rules

- The writer base prompt lives in `prompts/writer-base.v1.md`.
- Keep that prompt as a stable prefix for prompt caching.
- Do not inline the writer prompt in code.
- Never invent employers, titles, dates, metrics, tools, credentials or seniority.
- Real paid work goes under Experience.
- Real self-directed/product/coursework builds go under Projects.
- Do not fake experience by turning projects into employers.
- Write for a talent lead first and technical reviewer second.
- Remove unverified claims in code after the model returns.

## Rendering Rules

- Render structured CV JSON to deterministic HTML.
- Use Playwright to print the same HTML to PDF.
- The preview iframe and downloaded PDF must come from the same stored draft.
- PDF must fit one A4 page before persistence.
- Overflow compaction is deterministic and priority-rank based.
