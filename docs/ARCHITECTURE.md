# TaylorCV Architecture

TaylorCV is a structured CV generation app.

It uses a small 3-agent backend workflow and an existing deterministic renderer/export pipeline.

The goal is to produce excellent tailored CVs without creating a complex system.

## High-Level Workflow

1. User starts an application.
2. User pastes a job description.
3. Backend parses the job into structured job analysis.
4. User uploads or pastes CV/profile text.
5. Backend extracts a structured candidate profile.
6. Backend asks 0 to 3 high-value gap questions.
7. User answers or skips those questions.
8. Backend saves answers only.
9. Backend composes a final structured CV.
10. Renderer/export creates preview, PDF and DOCX.

## Flow Diagram

submitJob
→ Job Intake Agent
→ Job.analysisJson

submitCandidate
→ Candidate Profile + Gap Questions Agent
→ CandidateProfile.profileJson
→ GapQuestion rows

submitGapAnswers
→ GapAnswer rows
→ no AI call

generateCv
→ CV Composer Agent
→ CvDraft.cvJson
→ CvDraft.builderOutputJson
→ preview/export

## Frontend Flow

The main frontend user stages are:

1. job_description
2. cv_upload
3. gap_questions
4. cv_generating
5. final_cv

Relevant files are likely:

- src/app/page.tsx
- src/components/cv-flow/JobDescriptionStep.tsx
- src/components/cv-flow/CvUploadStep.tsx
- src/components/cv-flow/GapQuestionsStep.tsx
- src/components/cv-flow/CvGeneratingStep.tsx
- src/components/cv-flow/FinalCvStep.tsx
- src/components/cv-flow/A4CvPreview.tsx

The UI should feel simple:

- paste job
- upload CV
- answer a few useful questions
- receive final CV
- export

If there are zero gap questions, the user should move smoothly to CV generation.

## API Router

Main router:

- src/server/api/routers/application.ts

Canonical procedures:

- createApplication
- resetApplication
- submitJob
- submitCandidate
- submitGapAnswers
- generateCv
- getApplicationState
- authorizeExport

Do not introduce versioned canonical names.

## Workflow Service

Main service:

- src/server/cv/cvWorkflow.service.ts

Responsibilities:

- load and validate application state
- call the correct agent
- persist outputs
- update application status/currentStep
- return frontend-ready state
- keep the workflow simple

## Agent Files

Agent implementation files:

- src/server/cv/agents/jobIntake.agent.ts
- src/server/cv/agents/candidateProfileGap.agent.ts
- src/server/cv/agents/cvComposer.agent.ts

Prompt files:

- src/server/cv/prompts/jobIntake.prompt.ts
- src/server/cv/prompts/candidateProfileGap.prompt.ts
- src/server/cv/prompts/cvComposer.prompt.ts

Shared runner:

- src/server/cv/agents/runAgent.ts

Schemas:

- src/server/cv/cvSchemas.ts

OpenAI utilities:

- src/lib/openai.ts
- src/lib/modelPricing.ts

## Agent 1: Job Intake Agent

Input:

- raw job description

Output:

- targetRoleTitle
- companyName
- market
- seniority
- archetype
- subArchetype
- roleSummary
- mustHaveRequirements
- niceToHaveRequirements
- keywords
- recruiterPriorities
- expectedProofTypes
- recommendedSectionBias
- risksOrAmbiguities

Purpose:

The Job Intake Agent identifies what kind of CV the job requires.

It should understand the target role, seniority, industry, requirements, recruiter priorities, and likely proof expected.

It does not evaluate the candidate.

It does not write final CV content.

## Agent 2: Candidate Profile + Gap Questions Agent

Input:

- job analysis
- raw candidate CV/profile text

Output:

- structured candidate profile
- 0 to 3 gap questions

Purpose:

This agent extracts real candidate facts and asks only the few questions that would materially improve the final CV.

Gap questions should be specific and evidence-seeking.

Examples of useful missing information:

- measurable impact
- users or customers
- scale or scope
- tools used
- deployment or delivery details
- clinical setting
- class size
- campaign results
- finance/audit scope
- licence or certification details

It does not write the final CV.

It does not create a score.

## Agent 3: CV Composer Agent

Input:

- job analysis
- candidate profile
- gap answers
- renderer contract

Output:

- blueprint
- cv

Purpose:

The CV Composer creates the final structured CV.

The blueprint explains the strategy:

- archetype
- target positioning
- section order
- content priorities
- content to cut
- tone
- space budget
- risk warnings

The cv object contains the actual renderer-ready CV.

The composer should choose section order and wording based on:

- role archetype
- seniority
- market
- job priorities
- candidate background
- strongest available proof

## Structured CV Contract

The final CV should include:

- sectionOrder
- header
- summary
- skills
- experience
- projects
- education
- certifications
- sections
- roleArchetype

All top-level fields must exist.

Arrays can be empty where appropriate.

sectionOrder must not be empty.

summary must not be empty.

Bullet shape:

{
"text": string,
"gapAnswerIds": string[]
}

Dynamic sections should only be used for optional extra sections that are not already covered by top-level fields.

Examples:

- Selected Technical Achievements
- Campaign Highlights
- Clinical Highlights
- Leadership Highlights
- Selected Portfolio Work

Normal experience, projects, skills, education and certifications should use the top-level fields.

## Renderer/Export Layer

Relevant files:

- src/lib/cvDocument.ts
- src/lib/cvPresentation.ts
- src/lib/cvRenderModel.ts
- src/lib/cvExport.tsx
- src/components/CVDocumentRenderer.tsx

Renderer responsibilities:

- parse structured CV JSON
- normalize CV sections
- render preview
- support PDF export
- support DOCX export

The renderer should not decide candidate strategy.

The renderer should not call AI.

The renderer should not contain business workflow logic.

## Database Strategy

Core models:

- Application
- Job
- CandidateProfile
- GapQuestion
- GapAnswer
- CvDraft
- AgentRun

Job stores:

- raw job text
- structured job analysis

CandidateProfile stores:

- raw candidate text
- structured profile

GapQuestion stores:

- question
- why it matters
- answer guidance
- status

GapAnswer stores:

- user answer
- skipped/answered state

CvDraft stores:

- cvJson
- cvText if useful
- presentationJson if needed
- builderOutputJson for blueprint/metadata

AgentRun stores:

- agent name
- model
- duration
- status
- token usage
- estimated cost
- error if failed

## State Changes

submitJob should:

- run Job Intake Agent
- save Job
- update Application to job-added state

submitCandidate should:

- load job analysis
- run Candidate Profile + Gap Questions Agent
- save CandidateProfile
- save GapQuestion rows
- update Application to candidate/gap-question state

submitGapAnswers should:

- save GapAnswer rows
- update GapQuestion statuses
- update Application to answers-added state
- not call AI

generateCv should:

- load job analysis
- load candidate profile
- load gap questions and answers
- run CV Composer Agent
- validate structured CV
- save CvDraft
- update Application to CV-ready state

authorizeExport should:

- verify application ownership/session access
- verify CvDraft exists
- allow export

Do not add billing gating here unless the task explicitly asks.

## Mock Mode

USE_MOCK_AI=true should allow the entire flow to work without live model calls.

Mock outputs must pass the same schemas as real outputs.

Mock composer output must produce valid cvDraft.cvJson.

## Cost and Latency Strategy

The system should be fast and cheap.

Expected model usage:

- Job Intake Agent: fast model
- Candidate Profile + Gap Questions Agent: fast model
- CV Composer Agent: strong model
- submitGapAnswers: no model

Avoid extra AI calls unless explicitly approved.

Avoid large prompt payloads when structured data is already available.

## Guardrails

Do not create a new subsystem when a simple function or schema is enough.

Do not add extra agents by default.

Do not add extra database models by default.

Do not make the UI depend on hidden scores.

Do not make the final CV depend on non-renderer-compatible JSON.

Do not modify unrelated systems while working on the CV workflow.

## Architecture Principle

TaylorCV quality should come from:

- strong job understanding
- strong candidate profiling
- useful gap questions
- excellent CV composition
- strict schemas
- deterministic rendering

Not from a complicated backend.
