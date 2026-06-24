# TaylorCV

Dashboard-first MVP for turning a user's existing CV and a target job description into a one-page, recruiter-readable PDF.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env`.

3. Start Postgres:

```bash
docker compose up -d
```

4. Apply migrations and generate Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

5. Start the app:

```bash
npm run dev
```

Keep `USE_MOCK_AI="true"` for local UI and pipeline work without OpenAI credentials.

## Real OpenAI Mode

```bash
USE_MOCK_AI="false"
OPENAI_API_KEY="..."
OPENAI_PROFILE_MODEL="gpt-5.4-nano"
OPENAI_JOB_MODEL="gpt-5.4-nano"
OPENAI_QUESTIONS_MODEL="gpt-5.4-nano"
OPENAI_WRITER_MODEL="gpt-5.5"
```

The app uses `@openai/agents` structured outputs. A1 profile extraction and A2 job analysis run in parallel for first-time users; repeat users reuse the saved `CareerProfile`.

## Checks

```bash
npm run typecheck
npm run test:cv
npm run build
```
