# TaylorCV Architecture

TaylorCV is a fast, structured CV tailoring app.

The architecture should stay simple for MVP: deterministic intake, two AI calls at most, and a deterministic renderer/export pipeline.

The goal is to produce excellent tailored CVs without building a complex multi-agent backend.

## Core Principle

TaylorCV should behave like a guided version of a great CV-writing conversation:

1. Understand the target job.
2. Understand the candidate’s current CV.
3. Ask only a few useful missing-detail questions.
4. Use one strong final composer model to produce the finished structured CV.
5. Render the final CV through deterministic preview, PDF, and DOCX logic.

Quality should come from:

- the long-form `Quality.md` standard,
- a strong final composer prompt distilled from `Quality.md`,
- the raw job description,
- the raw uploaded CV text,
- a structured candidate profile,
- the user’s gap answers,
- and a strict renderer-ready CV schema.

Do not rebuild RAG, chunks, embeddings, vector search, or a many-agent workflow.

## High-Level Workflow

1. User starts an application.
2. User pastes a job description.
3. Backend saves the raw job description.
4. User uploads or pastes their CV/profile text.
5. Backend extracts text and saves the raw CV/profile text.
6. Fast mini model runs the Intake + Gap Questions Agent.
7. User answers or skips 0 to 3 concise gap questions.
8. Backend saves answers only.
9. Strong model runs the CV Composer Agent.
10. Renderer/export creates the preview, PDF, and DOCX.

## Flow Diagram

createApplication
→ Application row

submitJob
→ save Job.rawText
→ no AI call by default

submitCandidate
→ save CandidateProfile.rawCvText
→ run Intake + Gap Questions Agent
→ save structured job/candidate context in JSON
→ save GapQuestion rows

submitGapAnswers
→ save GapAnswer rows
→ no AI call

generateCv
→ CV Composer Agent
→ CvDraft.cvJson
→ CvDraft.builderOutputJson
→ preview/export

## Why This Architecture

The previous 3-agent workflow was too slow and still lost quality because the final composer received a flattened profile instead of the full source material.

The MVP should be closer to how a strong manual ChatGPT CV-writing pass works:

- give the final model the full job description,
- give it the full current CV text,
- give it the user’s gap answers,
- give it a distilled version of the CV quality standard,
- force it to output strict structured CV JSON,
- then let the renderer make the document look professional.

The final composer should be the main intelligence layer.

## Frontend Flow

The main frontend stages are:

1. `job_description`
2. `cv_upload`
3. `gap_questions`
4. `cv_generating`
5. `final_cv`

Relevant files are likely:

- `src/app/page.tsx`
- `src/components/cv-flow/JobDescriptionStep.tsx`
- `src/components/cv-flow/CvUploadStep.tsx`
- `src/components/cv-flow/GapQuestionsStep.tsx`
- `src/components/cv-flow/CvGeneratingStep.tsx`
- `src/components/cv-flow/FinalCvStep.tsx`
- `src/components/cv-flow/A4CvPreview.tsx`

The UI should feel simple:

- paste job
- upload CV
- answer a few useful questions
- receive final CV
- export

If there are zero gap questions, the user should move smoothly to CV generation.

## API Router

Main router:

- `src/server/api/routers/application.ts`

Canonical procedures:

- `createApplication`
- `resetApplication`
- `submitJob`
- `submitCandidate`
- `submitGapAnswers`
- `generateCv`
- `getApplicationState`
- `authorizeExport`

Do not introduce versioned canonical names.

## Workflow Service

Main service:

- `src/server/cv/cvWorkflow.service.ts`

Responsibilities:

- load and validate application state
- save raw job/CV inputs
- call the correct agent at the correct time
- persist outputs
- update application status/currentStep
- return frontend-ready state
- keep the workflow simple

## Allowed AI Agents

Only these CV agents should exist for MVP:

1. Intake + Gap Questions Agent
2. CV Composer Agent

Do not add:

- separate job intake agent
- separate candidate profile agent
- separate answer-merging agent
- separate strategy agent
- separate quality-review agent
- separate layout agent
- scoring/ranking agent
- retrieval agent

## Deterministic Intake

`submitJob` should save the job description without calling AI.

`submitCandidate` should save the raw CV/profile text and then run the Intake + Gap Questions Agent.

The app may use simple deterministic helpers for:

- text extraction from uploaded files,
- basic contact cleanup,
- basic URL normalization,
- whitespace cleanup,
- safe preview strings,
- file metadata.

Do not try to make deterministic parsing responsible for deep CV judgement. The strong composer model should still receive the raw CV text.

## Agent 1: Intake + Gap Questions Agent

Model:

- fast/mini model

When it runs:

- after both job description and candidate CV/profile text are available

Input:

- raw job description
- raw candidate CV/profile text
- concise extract from `Quality.md` relevant to gap-question quality, if needed

Output:

- structured job context
- structured candidate context
- 0 to 3 gap questions

Purpose:

This agent prepares the final composer context and asks only the few missing-detail questions that can materially improve the final CV.

It should be fast and cheap.

It should not write the final CV.

It should not overthink the full CV strategy.

### Intake + Gap Output Should Include

Job context:

- targetRoleTitle
- companyName if available
- market/location if available
- seniority
- archetype
- subArchetype
- roleSummary
- mustHaveRequirements
- niceToHaveRequirements
- keywords
- recruiterPriorities
- expectedProofTypes
- risksOrAmbiguities

Candidate context:

- identity/contact information
- current title/headline if present
- experience items
- project items
- education
- certifications
- skills grouped by category
- links
- notable evidence
- missing or weak areas
- warnings

Gap questions:

- question
- tiny example
- whyItMatters
- targetArea
- answerGuidance
- priority

Gap questions should be:

- casual
- concise
- easy to understand
- specific to the job and candidate
- optional but useful
- no more than 3

Bad gap question:

> Can you tell me more about your experience?

Good gap question:

> Did TaylorCV or RenovAI have any real usage, latency, cost, quality, or reliability results? Example: users, testing numbers, faster responses, lower token cost, or better retrieval accuracy.

## Agent 2: CV Composer Agent

Model:

- strong model, usually GPT-5.4 or equivalent

When it runs:

- after gap answers are saved or skipped

Input:

- raw job description
- raw candidate CV/profile text
- structured job context from Agent 1
- structured candidate context from Agent 1
- gap questions and answers
- distilled Composer Quality Policy from `Quality.md`
- strict renderer contract / structured CV schema

Output:

- blueprint
- cv

Purpose:

The CV Composer creates the final structured CV content.

It is the main intelligence layer.

It should decide:

- the candidate’s target positioning,
- career archetype,
- section order,
- section names,
- strongest evidence,
- what to include,
- what to cut,
- wording,
- tone,
- one-page content budget,
- and how to avoid flight-risk or overclaiming problems.

The composer must output strict renderer-ready JSON.

It must not output markdown, HTML, CSS, or free-form CV prose.

## Composer Quality Policy

The composer prompt must be built from `Quality.md`.

`Quality.md` is the source of truth for CV quality.

Do not paste all of `Quality.md` into every model call. It is too long and will waste tokens.

Instead, maintain a compact Composer Quality Policy derived from it.

This policy should teach the composer that:

- a great CV is a compressed proof map
- the top third must make target fit obvious
- proof beats promises
- every important claim needs evidence
- section order changes by archetype, seniority, credentials, strongest proof, and page budget
- one layout should not be forced on every career
- bullets should use action + object + scope/result
- metrics should be real or grounded
- if exact metrics are missing, use truthful scale/context
- never invent employers, tools, credentials, dates, metrics, awards, users, or achievements
- avoid generic filler and keyword stuffing
- avoid AI-sounding language
- no em dashes by default
- reduce comma-heavy phrasing
- do not clump certifications
- do not make the candidate look like a flight risk unless the target role genuinely benefits from founder/startup framing
- one page does not mean overly short
- use the full page intelligently

## Section Strategy

The composer must choose sections dynamically.

Do not use one universal section order.

The professional summary should normally appear first below the header, then the composer should choose the remaining sections based on:

- role archetype
- seniority
- candidate stage
- regulated credential requirements
- strongest available proof
- target role requirements
- recruiter screening logic
- page budget

### Section Strategy Precedence

1. Threshold credentials come early when they matter.

Examples:

- nurse registration
- teaching certification
- trade licence
- legal admission
- required professional certification

2. Strongest role-relevant proof beats archetype defaults.

Examples:

- AI/software/data: shipped systems, technical projects, evals, deployment, technical achievements
- nursing: clinical experience, patient settings, procedures, certifications
- teaching: classroom/practicum experience, subjects, year levels, credentials
- marketing/sales: campaign results, revenue, conversion, pipeline, audience growth
- design: portfolio, selected work, shipped outcomes, design process
- finance/accounting: reporting, modelling, audit, controls, certifications
- trades: licences, safety, equipment, site work, repairs, fault-finding
- civil/construction engineering: project scope, site/design work, compliance, drawings, tools, safety, stakeholders

3. Seniority changes order.

Examples:

- graduate: education/projects may come early
- early-career technical candidate: projects/technical achievements may beat work history
- experienced professional: experience usually carries more weight
- senior leader: selected achievements or leadership impact may come early
- career changer: transferable proof may need a hybrid structure

4. Archetype gives the default, not the final answer.

Do not build brittle templates.

5. Page budget decides what gets cut or restored.

If space is tight, cut low-priority proof.
If the page underfills and strong relevant proof remains, restore the strongest unused proof.

## Structured CV Contract

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

Bullet shape:

```json
{
  "text": "string",
  "gapAnswerIds": []
}
```

Use `gapAnswerIds` only when a bullet uses a saved gap answer.

If a bullet does not use a saved gap answer, use an empty array.

## Blueprint

The composer should also output a blueprint for debugging.

Blueprint should include:

- archetype
- target positioning
- section order
- section strategy
- strongest evidence used
- content intentionally cut
- tone decisions
- space budget
- risks or warnings

The blueprint is not rendered to the user.

It helps developers understand why the CV was written that way.

## Renderer Responsibilities

The CV Composer owns:

- content
- section choice
- section labels
- section order
- proof prioritisation
- one-page content budgeting

The renderer owns:

- typography
- spacing
- visual layout
- preview scaling
- PDF export
- DOCX export

The renderer must not:

- call AI
- invent content
- decide candidate strategy
- silently merge sections
- delete bullets
- trim important content to force fit

The renderer may:

- apply deterministic typography and spacing rules
- render certifications as readable bullets/lines
- render education with clear hierarchy
- normalize links
- warn about layout issues

## Renderer/Export Layer

Relevant files:

- `src/lib/cvDocument.ts`
- `src/lib/cvPresentation.ts`
- `src/lib/cvRenderModel.ts`
- `src/lib/cvExport.tsx`
- `src/components/CVDocumentRenderer.tsx`

Renderer/export must handle:

- clean header hierarchy
- readable subtitle under the name
- clean contact line
- full or cleanly shortened LinkedIn/GitHub/portfolio links
- no broken or double-prefixed links
- readable education
- readable certifications
- no certification paragraph clumps
- consistent preview/PDF/DOCX output
- no ugly bottom gap where strong content exists
- no orphan headings
- no excessive compression

## Database Strategy

Core models:

- Application
- Job
- CandidateProfile
- GapQuestion
- GapAnswer
- CvDraft
- AgentRun

No new workflow tables should be added by default.

Job stores:

- raw job text
- structured job context from Agent 1 if available

CandidateProfile stores:

- raw candidate text
- structured candidate context from Agent 1

GapQuestion stores:

- question
- tiny example
- why it matters
- answer guidance
- status
- metadata JSON if useful

GapAnswer stores:

- user answer
- skipped/answered state

CvDraft stores:

- `cvJson`
- `cvText` if useful
- `presentationJson` if needed
- `builderOutputJson` for blueprint/metadata

AgentRun stores:

- agent name
- model
- duration
- status
- token usage
- estimated cost
- error if failed

## State Changes

`submitJob` should:

- save raw job text
- update Application to job-added state
- not call AI by default

`submitCandidate` should:

- save raw candidate text
- load raw job text
- run Intake + Gap Questions Agent
- save structured job/candidate context
- save GapQuestion rows
- update Application to candidate/gap-question state

`submitGapAnswers` should:

- save GapAnswer rows
- update GapQuestion statuses
- update Application to answers-added state
- not call AI

`generateCv` should:

- load raw job text
- load raw candidate text
- load structured job/candidate context if available
- load gap questions and answers
- build composer context
- run CV Composer Agent
- validate structured CV
- save CvDraft
- update Application to CV-ready state

`authorizeExport` should:

- verify application ownership/session access
- verify CvDraft exists
- allow export

Do not add billing gating here unless the task explicitly asks.

## Cost and Latency Strategy

The MVP should target:

- one fast model call for gap questions
- one strong model call for final CV generation
- no AI call on submitGapAnswers
- no AI calls in renderer/export

Expected model usage:

- Intake + Gap Questions Agent: fast/mini model
- CV Composer Agent: strong model

Do not pass the full `Quality.md` into every request.

Use a distilled Composer Quality Policy.

The raw job description and raw CV should be included in the final composer context because flattening loses important details.

## Mock Mode

`USE_MOCK_AI=true` should allow the entire flow to work without live model calls.

Mock outputs must pass the same schemas as real outputs.

Mock composer output must produce valid `cvDraft.cvJson`.

## Guardrails

Do not add RAG.

Do not add chunks.

Do not add embeddings.

Do not add vector search.

Do not add extra AI agents by default.

Do not add extra database models by default.

Do not make the UI depend on hidden scores.

Do not make the final CV depend on non-renderer-compatible JSON.

Do not let the LLM render visual layout directly.

Do not modify unrelated systems while working on the CV workflow.

## Architecture Principle

TaylorCV quality should come from:

- one good mini-model gap question pass,
- one excellent final composer pass,
- `Quality.md` distilled into a strong composer prompt,
- raw source context preserved,
- strict structured output,
- deterministic rendering.

Not from a complicated backend.
