# TaylorCV Agent Instructions

TaylorCV is a fast, structured CV generation app.

The app turns a job description, a candidate profile, and a few useful user answers into a polished, recruiter-readable, role-aware CV.

This repository should stay simple, efficient, and predictable.

## Core Product

TaylorCV helps users create better CVs by:

1. Understanding the target job.
2. Extracting useful candidate facts.
3. Asking only a few high-value missing-detail questions.
4. Writing a tailored structured CV.
5. Rendering the final CV through the existing preview/export system.

TaylorCV is not a candidate-ranking tool.

TaylorCV is not a general document generator.

TaylorCV is not a workflow with many competing AI agents.

## Core Architecture

TaylorCV has one main workflow:

submitJob
→ Job Intake Agent
→ save structured job analysis

submitCandidate
→ Candidate Profile + Gap Questions Agent
→ save structured candidate profile and gap questions

submitGapAnswers
→ save answers only
→ no AI call

generateCv
→ CV Composer Agent
→ save structured CV draft
→ renderer/export handles preview, PDF and DOCX

## Allowed AI Agents

Only these CV agents should exist:

1. Job Intake Agent
2. Candidate Profile + Gap Questions Agent
3. CV Composer Agent

Do not add more AI agents unless the user explicitly asks.

Do not add a separate answer-merging agent.
Do not add a separate strategy agent.
Do not add a separate quality-review agent.
Do not add a separate layout agent.
Do not add a scoring or ranking agent.

## Agent Responsibilities

### Job Intake Agent

Purpose:

Understand the hiring context from the job description.

It should produce:

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
- recommended section emphasis
- risks or ambiguities

It should not:

- judge the candidate
- write CV text
- ask user questions
- create final CV content

### Candidate Profile + Gap Questions Agent

Purpose:

Turn candidate text into a structured profile and ask only the most useful missing-detail questions.

It should produce:

- identity/contact information
- headline options
- summary facts
- experience facts
- project facts
- skills grouped by category
- education
- certifications
- useful links
- proof notes
- warnings
- 0 to 3 gap questions

Gap questions must be specific and useful.

Good gap questions ask for:

- metrics
- scope
- tools
- outcomes
- users/customers/stakeholders
- deployment or delivery details
- credentials
- leadership/context

It should not:

- write final CV text
- ask generic “tell me more” questions
- ask questions irrelevant to the role
- create any ranking or score

### CV Composer Agent

Purpose:

Create the final structured CV content.

It receives:

- job analysis
- candidate profile
- saved gap answers
- renderer contract

It outputs:

- blueprint
- cv

Blueprint explains the CV strategy.

CV is the actual structured CV document consumed by the renderer.

The composer must not output markdown, HTML, CSS, or free-form prose.

## Model-Facing CV Shape

CV bullets should use this simple shape:

{
"text": string,
"gapAnswerIds": string[]
}

Use gapAnswerIds only when a bullet uses a saved gap answer.

If a bullet does not use a saved gap answer, use:

{
"gapAnswerIds": []
}

Do not add extra source-tracking fields to model-facing CV output.

## Renderer Rule

The CV Composer owns content.

The renderer owns visual layout.

Do not redesign the renderer or export system unless the user specifically asks.

Final CV JSON must be compatible with parseStructuredCv().

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

- Job.analysisJson
- CandidateProfile.profileJson
- CvDraft.cvJson
- CvDraft.builderOutputJson

Do not add new workflow tables unless explicitly approved.

## Guardrails

Keep the architecture boring and clean.

Do not introduce:

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

- Job Intake Agent
- Candidate Profile + Gap Questions Agent

Use a stronger model for:

- CV Composer Agent

submitGapAnswers must not call AI.

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

Do not modify auth, billing, Stripe, landing visuals, or export styling unless the task specifically asks.

If changing Prisma schema:

1. create a migration
2. run prisma generate
3. restart the dev server if needed

If changing OpenAI structured schemas:

- every nested schema must have a concrete type
- do not use empty object schemas
- keep model-facing outputs simple and strict

If changing CV output:

- verify mock output passes schema
- verify final cvDraft.cvJson parses
- verify preview renders
- verify export still works

## Common Commands

Development:

npm run dev

Type check:

npx tsc --noEmit

Build:

npm run build

Prisma generate:

npx prisma generate

Prisma migration:

npx prisma migrate dev --name <clear_name>

Search code:

rg "<term>" .
