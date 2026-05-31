# TaylorCV PRD

## Product Summary

TaylorCV helps users create tailored, recruiter-readable CVs for specific jobs.

The user provides:

1. a job description
2. their CV, profile text or public LinkedIn URL
3. answers to 0-3 targeted gap questions when useful

TaylorCV returns:

1. a polished tailored CV preview
2. export-ready PDF/DOCX output
3. a structured CV draft that is evidence-backed, archetype-aware and renderer-compatible

TaylorCV is not a generic chatbot or template filler. It is a role-specific CV generation system that turns candidate evidence into a clean, credible document a recruiter can skim quickly.

## Product Goal

The goal is to make the candidate's strongest relevant proof visible quickly.

TaylorCV should help users produce CVs that are:

- tailored
- credible
- specific
- easy to skim
- evidence-heavy
- role-aware
- archetype-aware
- professionally formatted
- export-ready
- truthful
- fast to generate

A successful TaylorCV CV should make the recruiter think:

> This person matches the job, I can see the proof, and I can confidently pass them forward.

## Product Philosophy

TaylorCV should optimise for the fastest credible transmission of role-relevant evidence.

The product should not merely rewrite a CV. It should:

1. understand the job
2. understand the candidate
3. identify the expected proof for that career archetype
4. compare requirements against real evidence
5. ask only useful evidence-hunting questions
6. choose the right section strategy
7. generate a polished CV from structured data
8. render the output cleanly
9. avoid fabrication

## Target Users

TaylorCV is for job seekers who want a better CV for a specific role.

This includes:

- students and graduates
- early-career candidates
- software/AI/data candidates
- career changers
- professionals in regulated fields
- trades and practical roles
- marketing/sales candidates
- finance/accounting candidates
- design/creative candidates
- healthcare and nursing candidates
- teaching and education candidates
- operations/project/product candidates
- candidates with messy or under-explained experience

## Core User Journey

### Step 1: Start Application

The user starts a new CV tailoring flow.

The app should feel:

- simple
- fast
- guided
- premium
- low-friction

The user should not feel like they are filling out a long recruiting platform.

### Step 2: Paste Job Description

The user pastes a job description.

TaylorCV analyses:

- role title
- company if available
- market/location if available
- seniority
- role archetype
- sub-archetype
- must-have requirements
- nice-to-have requirements
- hidden/implicit requirements
- recruiter priorities
- expected proof types
- likely section emphasis
- ATS/application-channel assumptions where inferable

The user should not need to manually tag the job.

### Step 3: Upload CV or Provide Profile Source

The user provides one of:

- uploaded CV
- pasted CV/profile text
- public LinkedIn URL where supported

TaylorCV extracts:

- identity/contact details
- summary facts
- experience
- projects
- skills
- education
- certifications
- licences
- links
- useful proof
- metrics
- tools
- domain context
- missing details
- credibility warnings

The profile should preserve truth and avoid inventing facts.

### Step 4: Fit Scoring and Gap Detection

TaylorCV compares the job requirements against candidate evidence.

For each requirement, the system determines:

- fit level: high / medium / low / missing
- evidence supporting the fit
- importance
- whether the requirement needs visible CV proof
- whether a gap question could improve the final CV

The system should not expose a harsh scoring UI by default. Fit scoring is primarily internal orchestration.

### Step 5: Answer Gap Questions

TaylorCV asks 0-3 useful questions.

Questions should feel specific and intelligent.

Good questions ask for missing proof, not generic explanation.

Examples:

- Did this project have real users, measurable latency, cost constraints, reliability requirements or evaluation results?
- For this campaign, do you have conversion, engagement, revenue, ROAS or audience-growth numbers?
- For this clinical placement, what setting, patient population, procedures or systems did you work with?
- For this teaching experience, what year levels, subjects, class sizes or student outcomes can you mention?
- Have you coordinated, mentored or trained anyone? If yes, what was the group size and what changed because of your support?

The user should answer the questions before generation if the questions target important missing evidence.

Saving answers should be fast.

Gap answers must be integrated into the structured candidate profile/evidence inventory, not passed to the CV writer as loose notes.

### Step 6: Generate CV Strategy

Before writing the final CV, TaylorCV creates a CV strategy.

The strategy decides:

- target title
- professional subtitle
- archetype
- seniority positioning
- one-page vs two-page target
- section order
- section names
- top-third message
- strongest evidence to show early
- evidence to cut
- skills grouping
- summary angle
- tone
- ATS strictness
- formatting density

### Step 7: Generate CV Draft

TaylorCV composes the final CV using:

- job analysis
- candidate profile
- evidence items
- fit scores
- gap answers
- CV strategy

The CV must be structured JSON, not free-form markdown.

The writer should produce content only. The renderer controls final visual layout.

### Step 8: Quality Review

TaylorCV reviews the CV draft for:

- unsupported claims
- fake metrics
- missing must-have requirements
- weak/generic bullets
- wrong archetype section order
- duplicated content
- overclaiming seniority
- excessive density
- renderer incompatibility

The reviewer should return a pass or a small patch. Avoid repeated expensive loops unless the draft clearly fails.

### Step 9: Preview and Export

The user sees a polished preview.

The CV can be exported to PDF/DOCX using the renderer/export pipeline.

The final export should look like a finished professional document, not generated text placed into a template.

## User Experience Principles

The app should feel:

- focused
- premium
- fast
- intelligent
- low-friction
- practical
- trustworthy
- guided but not tedious

The app should not feel like:

- a generic chatbot
- a long form wizard
- a keyword-stuffing tool
- a scoring/ranking tool
- a complicated recruiting platform
- a generic document editor
- a visual design toy

## Core Product Requirements

### Job Analysis

The app must infer:

- target role
- company if available
- seniority
- market/location if available
- archetype
- sub-archetype
- must-have requirements
- nice-to-have requirements
- hidden requirements
- recruiter priorities
- expected proof types
- recommended section emphasis
- keywords/synonyms

The output should be structured as `JobSpec`.

### Candidate Profile

The app must extract structured facts from the candidate's input:

- identity
- contact details
- experience
- projects
- skills
- education
- certifications
- licences
- links
- achievements
- tools
- metrics
- warnings
- missing details

The output should be structured as `CandidateProfile` plus atomic `CandidateEvidenceItem[]`.

The profile must preserve truth and avoid inventing facts.

### Evidence Inventory

TaylorCV should not treat a skill list as proof by itself.

Every meaningful claim should map to evidence.

Evidence items should include:

- evidenceId
- source section
- source role/project/education/certification
- evidence type
- raw text
- normalized claim
- tools involved
- skills demonstrated
- outcome/result
- metric if present
- scale/context if present
- date/recency
- credibility level
- specificity level
- possible CV bullet version

### Fit Scoring

The system should compare each job requirement against the evidence inventory.

Each fit score should include:

- requirementId
- fit level: high / medium / low / missing
- importance
- best evidence IDs
- reason
- missing proof type
- whether a gap question is needed
- recommended CV placement

Fit scoring should be used to guide generation, not to shame the user.

### Gap Questions

The app should ask 0-3 questions.

Questions should be asked only when answers can materially improve the final CV.

Questions should be:

- role-specific
- evidence-hunting
- concise
- clear
- connected to high-priority requirements
- designed to reveal metrics, scale, outcomes, tools or context

Questions should not be:

- generic
- excessive
- repetitive
- about low-value missing details
- framed in a way that makes the user feel unqualified

### Gap Answer Integration

Gap answers must be saved and normalized.

Each useful answer should create or update evidence items.

The system should preserve:

- original answer text
- gapQuestionId
- related requirementIds
- extracted action/problem/result
- extracted metric/scale
- extracted tools/context
- confidence level

If a generated CV bullet uses a saved gap answer, the bullet should carry the relevant `gapAnswerIds`.

If a bullet does not use saved gap answers, `gapAnswerIds` should be an empty array.

### CV Strategy

The system must generate a structured CV strategy before writing.

The strategy should include:

- target title
- subtitle/domain line
- archetype
- tone
- section order
- section labels
- proof priorities
- evidence IDs selected for inclusion
- evidence IDs excluded and reason
- skills grouping
- summary angle
- layout density
- page target

### CV Generation

The generated CV must be:

- tailored to the job
- evidence-heavy
- concise
- skimmable
- credible
- archetype-aware
- renderer-compatible
- truthful
- professional

The generated CV must not invent:

- companies
- dates
- titles
- credentials
- licences
- metrics
- tools
- users
- revenue
- awards
- achievements
- publications

### Preview and Export

The final CV must render in the existing preview.

PDF/DOCX export should work from the final CV draft.

The renderer should be deterministic and controlled. AI should not freely invent layout/CSS.

## Backend Agent Architecture

TaylorCV should use a small number of clear agents rather than a large, fragile multi-agent system.

### 1. Job Intelligence Agent

Purpose:

- parse the job description
- infer archetype/seniority
- extract requirements
- identify proof expectations

Recommended model:

- fast/mini model

Output:

- `JobSpec`
- `JobRequirement[]`

### 2. Candidate Profiler and Evidence Extractor

Purpose:

- parse uploaded CV/profile/LinkedIn text
- extract candidate profile
- create atomic evidence items

Recommended model:

- fast/mini model

Output:

- `CandidateProfile`
- `CandidateEvidenceItem[]`

### 3. Fit and Gap Agent

Purpose:

- compare requirements to evidence
- score fit
- decide whether gap questions are needed

Recommended model:

- fast/mini model

Output:

- `RequirementFitScore[]`
- candidate gap targets

### 4. Gap Question Agent

Purpose:

- generate 0-3 sharp questions

This can be merged with the Fit and Gap Agent if latency is better.

Output:

- `GapQuestion[]`

### 5. Gap Answer Integrator

Purpose:

- convert user answers into structured evidence
- update candidate profile/evidence inventory

Recommended model:

- fast/mini model

Output:

- updated `CandidateProfile`
- new/updated `CandidateEvidenceItem[]`

### 6. CV Strategy Agent

Purpose:

- choose section order
- choose proof priorities
- decide what to include/cut
- set tone and layout density

Recommended model:

- fast/mini model, unless case is complex

Output:

- `CvStrategy`

### 7. CV Writer Agent

Purpose:

- generate the final structured CV document

Recommended model:

- stronger model

Output:

- `CvDocument` JSON only

The CV Writer must not output markdown or HTML as the primary source of truth.

### 8. CV Quality Reviewer

Purpose:

- check unsupported claims, generic writing, missing must-haves and archetype mismatch

Recommended model:

- fast/mini model

Output:

- pass/fail
- patch instructions if needed

### 9. Renderer / Layout Controller

Purpose:

- deterministically render the final CV
- enforce layout constraints
- export PDF/DOCX

This is not an AI agent.

It should control spacing, page fit, line breaks, section headings, density and export quality.

## Suggested Data Model

The database can be changed to support the new architecture.

Recommended core models:

### Application

Represents one CV tailoring attempt for one job.

Fields:

- id
- userId / anonymousSessionId
- status
- createdAt
- updatedAt
- currentStep
- selectedCvDraftId

### JobPosting

Stores the raw and parsed job.

Fields:

- id
- applicationId
- rawJobDescription
- companyName
- roleTitle
- market
- location
- seniority
- archetype
- subArchetype
- parsedJson

### JobRequirement

Stores extracted job requirements.

Fields:

- id
- jobPostingId
- sourceText
- normalizedText
- category
- importance
- requirementType
- expectedEvidenceType
- keywordsJson
- mustAppearInTopThird

### CandidateSource

Stores uploaded/pasted/link source metadata.

Fields:

- id
- applicationId
- sourceType
- rawText
- fileName
- fileMimeType
- linkedInUrl
- extractionStatus

### CandidateProfileSnapshot

Stores normalized candidate profile at a point in time.

Fields:

- id
- applicationId
- version
- profileJson
- createdFrom
- createdAt

### CandidateEvidenceItem

Stores atomic evidence items.

Fields:

- id
- applicationId
- profileSnapshotId
- sourceType
- sourceLabel
- rawText
- normalizedClaim
- evidenceType
- toolsJson
- skillsJson
- outcome
- metric
- scale
- dateRange
- confidence
- specificity
- relevance

### RequirementFitScore

Stores fit between requirements and evidence.

Fields:

- id
- applicationId
- requirementId
- fitLevel
- importance
- bestEvidenceIdsJson
- reason
- missingProofType
- needsGapQuestion
- recommendedPlacement

### GapQuestion

Stores generated questions.

Fields:

- id
- applicationId
- questionText
- targetRequirementIdsJson
- targetEvidenceType
- importance
- required
- reason
- orderIndex

### GapAnswer

Stores user answers.

Fields:

- id
- gapQuestionId
- applicationId
- rawAnswer
- normalizedEvidenceJson
- createdEvidenceIdsJson
- confidence
- createdAt

### CvStrategy

Stores section/order/proof strategy.

Fields:

- id
- applicationId
- strategyJson
- sectionOrderJson
- selectedEvidenceIdsJson
- excludedEvidenceJson
- tone
- pageTarget
- createdAt

### CvDraft

Stores generated CV document.

Fields:

- id
- applicationId
- strategyId
- version
- status
- cvDocumentJson
- qualityStatus
- qualityNotesJson
- createdAt

### CvRenderArtifact

Stores render/export metadata.

Fields:

- id
- cvDraftId
- format
- storagePath
- pageCount
- renderStatus
- renderWarningsJson
- createdAt

### AgentRun

Stores model-call observability.

Fields:

- id
- applicationId
- agentName
- model
- promptVersion
- schemaName
- status
- durationMs
- inputHash
- outputHash
- errorMessage
- createdAt

### TokenUsage

Stores token and cost data.

Fields:

- id
- agentRunId
- model
- inputTokens
- cachedInputTokens
- outputTokens
- reasoningTokens
- estimatedCostUsd
- createdAt

### ModelPricing

Stores model pricing for cost estimation.

Fields:

- id
- model
- inputPerMillion
- cachedInputPerMillion
- outputPerMillion
- effectiveFrom
- effectiveTo

### PromptVersion

Stores prompt version metadata.

Fields:

- id
- name
- version
- checksum
- active
- notes
- createdAt

## Structured Output Requirements

All agent outputs must be schema-validated.

Use strict structured outputs where possible.

Validation failures should be logged and handled.

The system should not continue with malformed core outputs.

Required structured outputs:

- `JobSpec`
- `JobRequirement[]`
- `CandidateProfile`
- `CandidateEvidenceItem[]`
- `RequirementFitScore[]`
- `GapQuestion[]`
- `CvStrategy`
- `CvDocument`
- `CvQualityReview`

## Canonical CV Document Requirements

The final CV should be stored as structured JSON.

Recommended shape:

- header
  - fullName
  - targetTitle
  - subtitle
  - location
  - phone
  - email
  - links
- summary
- sections[]
  - sectionId
  - type
  - title
  - order
  - items[]
- skillGroups[]
- educationItems[]
- certificationItems[]
- metadata
  - archetype
  - targetRole
  - pageTarget
  - evidenceIdsUsed
  - gapAnswerIdsUsed

Every bullet should be able to reference:

- evidenceIds
- gapAnswerIds
- relatedRequirementIds

## CV Output Expectations

The CV should usually include:

- header
- target title
- contact information
- professional summary
- role-relevant sections
- experience
- projects if relevant
- skills
- education
- certifications/licences where relevant

The exact section order should depend on role archetype and candidate background.

## Archetype Behaviour

### AI, Software, Data and Technical Roles

Prioritise:

- shipped systems
- projects
- technical stack
- deployment
- reliability
- evaluation
- users
- latency
- cost
- GitHub/portfolio links

Projects can appear early if they are the strongest proof.

### Clinical and Healthcare Roles

Prioritise:

- licence/registration
- certifications
- clinical settings
- patient populations
- procedures
- placements
- EMR systems
- safety and care standards

Credentials should appear early.

### Teaching and Education Roles

Prioritise:

- credentials
- practicum/classroom experience
- subjects
- year levels
- lesson planning
- student engagement
- assessment
- student outcomes

### Marketing, Sales and Growth Roles

Prioritise:

- campaigns
- channels
- conversion
- engagement
- revenue
- pipeline
- audience growth
- content output
- CRM/tools

### Finance, Accounting, Audit and Banking Roles

Prioritise:

- reporting
- modelling
- reconciliations
- audit scope
- controls
- budgets
- risk/compliance
- certifications
- finance tools

Tone should be conservative and precise.

### Design, Product, UX and Creative Roles

Prioritise:

- portfolio
- selected work
- shipped outcomes
- design process
- research
- tools
- user/customer impact

### Trades, Construction and Field Service Roles

Prioritise:

- licences
- tickets
- safety training
- equipment
- site work
- repairs
- fault finding
- project scope

### Graduate and Early-Career Roles

Prioritise:

- education
- projects
- internships
- certifications
- coursework when directly relevant
- leadership
- initiative

Do not make early-career candidates sound like fake senior professionals.

### Career Changers

Translate transferable experience truthfully.

Do not pretend past roles were target-role experience.

Show the bridge between past evidence and the target job.

## Rendering and Export Requirements

The renderer must produce a polished final document.

Renderer responsibilities:

- layout the structured CV document
- enforce one-page/two-page constraints
- prevent overflow
- avoid awkward bottom gaps
- prevent orphan headings
- avoid ugly wrapping
- keep contact lines clean
- keep skills readable
- keep education/certification sections clean
- export to PDF/DOCX
- keep output ATS-readable where possible

The renderer should use controlled style tokens, not arbitrary AI-generated CSS.

Style tokens can include:

- font family
- font size scale
- heading style
- divider style
- accent colour
- spacing density
- bullet density
- header alignment
- section spacing

The AI should not freely invent layout.

## Performance Expectations

The app should aim for:

- fast job parsing
- fast candidate profiling
- fast fit scoring
- instant gap answer saving
- efficient CV generation
- clear loading states
- reliable final preview

Suggested model usage:

- Job Intelligence: fast/mini model
- Candidate Profiler: fast/mini model
- Fit and Gap: fast/mini model
- Gap Answer Integrator: fast/mini model
- CV Strategy: fast/mini model unless complex
- CV Writer: stronger model
- Quality Reviewer: fast/mini model

Avoid extra AI calls unless clearly necessary.

Avoid RAG unless the source material becomes too large or persistent cross-application memory is reintroduced.

Prefer structured profile/evidence inventory over vector search for the core MVP flow.

## Observability and Cost Logging

Every AI call must log:

- agent name
- model
- prompt version
- schema name
- start time
- end time
- durationMs
- status
- retry count
- validation result
- input tokens
- cached input tokens if available
- output tokens
- reasoning tokens if available
- estimated cost
- error message if failed

Cost formula:

- ((nonCachedInputTokens _ inputRate) + (cachedInputTokens _ cachedRate) + (outputTokens \* outputRate)) / 1,000,000

Pricing should be stored in config/database, not hardcoded throughout the codebase.

Console logs in development should clearly show:

- which agent is running
- how long it took
- token usage
- estimated cost
- schema validation success/failure
- whether a retry happened

## Trust and Safety

TaylorCV must not fabricate.

If the candidate did not provide a fact, do not invent it.

Do not invent:

- companies
- job titles
- dates
- credentials
- licences
- metrics
- tools
- users
- revenue
- awards
- achievements
- publications
- employment history

If a metric is missing, use truthful context instead of fake numbers.

If evidence is weak, write carefully rather than exaggerating.

The product should help candidates present themselves well, not misrepresent themselves.

The candidate should be able to defend every claim in an interview.

## Non-Goals

TaylorCV should not become:

- a candidate scoring system
- a recruiter dashboard
- a ranking platform
- a complex multi-agent research system
- a generic document editor
- a visual design tool
- an ATS myth/keyword-stuffing product
- a resume keyword spammer
- a fake credential or fake metric generator

## Success Criteria

A successful TaylorCV generation should satisfy:

- target role is obvious in the top third
- strongest proof is visible early
- section order fits the role
- bullets are specific
- claims are supported by evidence
- metrics are truthful
- CV is easy to skim
- archetype behaviour is correct
- final output renders correctly
- export works
- page fit is polished
- no unnecessary AI calls were made
- token/cost/duration logs exist for every model call

## Acceptance Tests

TaylorCV should be tested against at least these archetypes:

1. AI engineer
2. software engineer
3. data analyst
4. nurse
5. teacher
6. marketer
7. accountant/finance analyst
8. designer/UX candidate
9. tradesperson
10. graduate candidate
11. career changer

Each test should verify:

- different section order where appropriate
- correct proof priorities
- no fabricated claims
- useful gap questions
- evidence-backed bullets
- readable final render
- successful PDF export
- successful DOCX export where supported
- agent run logging

## Failure Conditions

The product fails if:

- every archetype receives the same structure
- generated CVs sound generic or AI-written
- the CV invents facts
- bullets are mostly responsibilities
- skills are listed without proof
- the top third does not show role fit
- gap questions are generic
- CV output is free-form markdown instead of structured JSON
- renderer output has overflow, awkward gaps, cramped sections or broken wrapping
- model calls are unlogged
- costs are not traceable
- schema validation is bypassed

## Final Product Principle

TaylorCV should not make users sound artificially impressive.

It should make their real evidence impossible to miss.
