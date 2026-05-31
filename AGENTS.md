# TaylorCV Agent Instructions

TaylorCV is a fast, structured CV tailoring app.

The app turns a job description, a candidate CV/profile, and a few useful user answers into a polished, recruiter-readable, role-aware CV.

This repository should stay simple, efficient, and predictable.

## Core Product

TaylorCV helps users create better CVs by:

1. Saving the target job description.
2. Saving the candidate’s current CV/profile text.
3. Asking only a few high-value missing-detail questions.
4. Writing a tailored structured CV using one strong final composer model.
5. Rendering the final CV through the existing preview/export system.

TaylorCV is not a candidate-ranking tool.

TaylorCV is not a general document generator.

TaylorCV is not a workflow with many competing AI agents.

TaylorCV should not use RAG, chunks, embeddings, or vector search for the MVP.

## Core Architecture

TaylorCV has one main workflow:

submitJob
→ save raw job description
→ no AI call by default

submitCandidate
→ save raw candidate CV/profile text
→ Intake + Gap Questions Agent
→ save structured job/candidate context and gap questions

submitGapAnswers
→ save answers only
→ no AI call

generateCv
→ CV Composer Agent
→ save structured CV draft
→ renderer/export handles preview, PDF and DOCX

## Allowed AI Agents

Only these CV agents should exist for MVP:

1. Intake + Gap Questions Agent
2. CV Composer Agent

Do not add more AI agents unless the user explicitly asks.

Do not add:

- separate job intake agent
- separate candidate profile agent
- separate answer-merging agent
- separate strategy agent
- separate quality-review agent
- separate layout agent
- scoring/ranking agent
- retrieval agent

## Agent 1: Intake + Gap Questions Agent

Purpose:

Use the raw job description and raw candidate CV/profile text to create enough structured context for the final composer and ask only the most useful missing-detail questions.

It should run on a fast/mini model.

It should produce:

Job context:

- target role title
- company name if available
- market/location if available
- seniority
- role archetype
- role summary
- must-have requirements
- nice-to-have requirements
- keywords
- recruiter priorities
- expected proof types
- risks or ambiguities

Candidate context:

- identity/contact information
- current title/headline if available
- experience facts
- project facts
- skills grouped by category
- education
- certifications
- useful links
- notable evidence
- missing or weak areas
- warnings

Gap questions:

- 0 to 3 questions
- each question should include a tiny example
- each question should include why it matters
- each question should include answer guidance

Gap questions must be:

- casual
- concise
- easy to answer
- specific to the job and candidate
- evidence-seeking
- not generic
- not long or intimidating

Good gap questions ask for:

- metrics
- scope
- tools
- outcomes
- users/customers/stakeholders
- deployment or delivery details
- credentials
- leadership/context

Bad gap question:

> Can you tell me more about your experience?

Good gap question:

> Did this project have any real users, testing results, latency, cost, quality, or reliability improvements? Example: faster responses, lower token cost, better accuracy, or fewer failed outputs.

The Intake + Gap Questions Agent should not:

- write the final CV
- produce final CV bullets
- create layout decisions
- over-optimize the CV
- add fake facts
- ask irrelevant questions
- ask more than 3 questions

## Agent 2: CV Composer Agent

Purpose:

Create the final structured CV content.

It receives:

- raw job description
- raw candidate CV/profile text
- structured job context from Agent 1
- structured candidate context from Agent 1
- saved gap questions and answers
- distilled Composer Quality Policy from `Quality.md`
- renderer contract / strict CV schema

It outputs:

- blueprint
- cv

The blueprint explains the CV strategy.

The cv is the actual structured CV document consumed by the renderer.

The CV Composer should run on a strong model.

The composer must not output markdown, HTML, CSS, or free-form prose.

## Quality.md Is The Source Of Truth

`Quality.md` is the canonical CV quality standard for TaylorCV.

It explains:

- recruiter psychology
- proof-first writing
- archetype-specific section strategy
- bullet writing
- metrics
- formatting
- gap answer usage
- final quality checks

Do not paste all of `Quality.md` into every prompt.

Instead, maintain a distilled Composer Quality Policy derived from `Quality.md`.

The distilled policy should be compact enough for latency/cost, but strong enough to teach the composer how to write excellent CVs.

## Composer Quality Policy Must Teach

The CV Composer must understand that:

- a great CV is a compressed proof map
- the recruiter should see fit within seconds
- the top third of the CV is critical
- proof beats promises
- every important claim must come from the CV/profile or gap answers
- section order depends on archetype, seniority, credentials, proof strength, and page budget
- every section must earn its space
- one universal template is wrong
- bullets should use action + object + scope/result
- real metrics are good
- fake metrics are bad
- truthful scale/context is better than invented numbers
- soft skills should be proven through examples, not listed as empty claims
- no unsupported claims
- no keyword stuffing
- no generic filler
- no em dashes by default
- avoid comma-heavy AI phrasing
- avoid words like “dynamic,” “results-driven,” “proven track record,” “leveraged,” and “cutting-edge” unless directly justified
- certifications should be readable, not clumped
- education should be readable and structured
- one page does not mean overly short
- use the full page intelligently

## Flight-Risk / Founder-Framing Rule

Do not make candidates look like a flight risk unless the target role benefits from founder/startup framing.

For normal employment applications, avoid overusing titles like:

- Founder
- CEO
- Startup Founder
- Entrepreneur

If the user built their own project or product, prefer safer employment-oriented wording when truthful:

- AI Product Engineer
- Builder / Developer
- Applied AI Engineer
- Full-Stack AI Developer
- Independent AI Project
- Technical Project

Use founder framing only when:

- the uploaded CV clearly requires it,
- the target job values founder experience,
- or the user explicitly asks for it.

## Section Strategy

The composer must choose sections dynamically.

Do not always use:

- Summary
- Skills
- Experience
- Education
- Certifications

That is too generic.

The professional summary should normally appear first below the header.

After the summary, section choice and order should depend on:

- target role
- archetype
- seniority
- candidate stage
- required credentials
- strongest available proof
- job requirements
- recruiter screening logic
- page budget

### Section Strategy Examples

AI/software/data:

- Professional Summary
- Selected Technical Achievements or Selected AI Systems
- Technical Skills
- Experience
- Projects if useful
- Education & Certifications

Nursing/healthcare:

- Professional Summary
- Licences & Certifications
- Clinical Experience
- Clinical Skills
- Education

Teaching:

- Professional Summary
- Teaching Experience
- Education
- Certifications
- Skills / Professional Development

Marketing/sales/growth:

- Professional Summary
- Campaign Results or Selected Achievements
- Experience
- Channels / Tools
- Education / Certifications

Finance/accounting:

- Professional Summary
- Experience
- Finance / Technical Skills
- Certifications / Exams
- Education

Design/UX/creative:

- Professional Summary
- Portfolio / Selected Work
- Experience
- Tools
- Education

Trades/construction/field service:

- Professional Summary
- Licences / Tickets
- Site Experience
- Tools / Equipment
- Safety Training
- Education / Apprenticeship

Graduate/early-career:

- Professional Summary
- Education
- Projects
- Experience
- Skills
- Certifications

Career changer:

- Professional Summary
- Selected Transferable Evidence
- Projects or Relevant Experience
- Professional Experience
- Education / Certifications

These are examples, not hard templates.

Strongest proof beats the default order.

## Model-Facing CV Shape

CV bullets should use this simple shape:

```json
{
  "text": "string",
  "gapAnswerIds": []
}
```

Use `gapAnswerIds` only when a bullet uses a saved gap answer.

If a bullet does not use a saved gap answer, use an empty array.

Do not add extra source-tracking fields to model-facing CV output unless explicitly approved.

## Structured CV Output

The final CV JSON must be compatible with `parseStructuredCv()`.

The final CV should include:

- `sectionOrder`
- `header`
- `summary`
- `skills`
- `experience`
- `projects`
- `education`
- `certifications`
- `sections`
- `roleArchetype`

All top-level fields must exist.

Arrays can be empty where appropriate.

## Renderer Rule

The CV Composer owns content.

The renderer owns visual layout.

The renderer should not call AI.

The renderer should not invent content.

The renderer should not decide candidate strategy.

The renderer should not silently merge sections, delete content, or trim important bullets to force fit.

The renderer may deterministically:

- normalize links
- render education cleanly
- render certifications cleanly
- adjust typography and spacing
- warn about layout issues

## Renderer/Export Quality Rules

Preview, PDF, and DOCX should all remain aligned.

Fix and preserve:

- clean name/title/contact hierarchy
- readable subtitle under the name
- LinkedIn/GitHub/portfolio links should not be broken or double-prefixed
- certifications should never become a messy paragraph
- education should not have random bolding or ugly hierarchy
- long links should be cleanly shortened or safely wrapped
- no orphan section headings
- no obvious bottom gaps when strong content exists
- no excessive compression

## Database Objects

The core workflow should use these objects:

- Application
- Job
- CandidateProfile
- GapQuestion
- GapAnswer
- CvDraft
- AgentRun

Useful JSON fields:

- `Job.analysisJson`
- `CandidateProfile.profileJson`
- `CvDraft.cvJson`
- `CvDraft.builderOutputJson`

Do not add new workflow tables unless explicitly approved.

## Guardrails

Keep the architecture boring and clean.

Do not introduce:

- RAG
- chunks
- embeddings
- vector search
- candidate ranking
- match scores
- confidence scores
- evidence-matching systems
- extra retrieval/source-tracking systems
- unnecessary workflow tables
- unnecessary AI calls
- v2/v3 canonical workflow names
- duplicate agent pipelines
- speculative future architecture

If a task seems to require a new subsystem, stop and explain the tradeoff before implementing it.

## Performance Rules

Use a fast model for:

- Intake + Gap Questions Agent

Use a stronger model for:

- CV Composer Agent

`submitJob` should not call AI by default.

`submitGapAnswers` must not call AI.

Renderer/export must not call AI.

Every agent run should log:

- agent name
- model
- duration
- status
- token usage if available
- estimated cost if available

## Development Rules

Make small, scoped changes.

Do not redesign unrelated UI.

Do not modify auth, billing, Stripe, landing visuals, or unrelated export styling unless the task specifically asks.

If changing Prisma schema:

1. create a migration
2. run prisma generate
3. restart the dev server if needed

Avoid Prisma schema changes unless the existing JSON fields cannot support the MVP.

If changing OpenAI structured schemas:

- every nested schema must have a concrete type
- do not use empty object schemas
- keep model-facing outputs simple and strict
- update mocks
- update JSON schemas passed to the model API

If changing CV output:

- verify mock output passes schema
- verify final `cvDraft.cvJson` parses
- verify preview renders
- verify export still works

If changing CV backend workflow logic:

- manually test the full app flow:
  1. paste job description
  2. upload CV
  3. answer gap questions
  4. generate final CV
  5. inspect preview
  6. export PDF/DOCX if relevant

Automated tests are useful, but do not create a large test framework unless explicitly asked.

## Common Commands

Development:

```bash
npm run dev
```

Type check:

```bash
npx tsc --noEmit
```

Build:

```bash
npm run build
```

Prisma generate:

```bash
npx prisma generate
```

Prisma migration:

```bash
npx prisma migrate dev --name <clear_name>
```

Search code:

```bash
rg "<term>" .
```
