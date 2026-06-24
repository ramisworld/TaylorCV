DROP TABLE IF EXISTS "agent_runs" CASCADE;
DROP TABLE IF EXISTS "cv_drafts" CASCADE;
DROP TABLE IF EXISTS "cv_applications" CASCADE;
DROP TABLE IF EXISTS "career_profiles" CASCADE;
DROP TABLE IF EXISTS "cv_generation_usage" CASCADE;
DROP TABLE IF EXISTS "cv_strategies" CASCADE;
DROP TABLE IF EXISTS "evidence_matches" CASCADE;
DROP TABLE IF EXISTS "candidate_chunks" CASCADE;
DROP TABLE IF EXISTS "candidate_profiles" CASCADE;
DROP TABLE IF EXISTS "gap_answers" CASCADE;
DROP TABLE IF EXISTS "gap_questions" CASCADE;
DROP TABLE IF EXISTS "gap_coach_insights" CASCADE;
DROP TABLE IF EXISTS "requirement_fit_scores" CASCADE;
DROP TABLE IF EXISTS "job_requirements" CASCADE;
DROP TABLE IF EXISTS "jobs" CASCADE;
DROP TABLE IF EXISTS "applications" CASCADE;
DROP TABLE IF EXISTS "billing_accounts" CASCADE;
DROP TABLE IF EXISTS "stripe_webhook_events" CASCADE;
DROP TABLE IF EXISTS "abuse_signal_events" CASCADE;

DROP TYPE IF EXISTS "PlanFamily" CASCADE;
DROP TYPE IF EXISTS "PlanVariant" CASCADE;
DROP TYPE IF EXISTS "BillingSubscriptionStatus" CASCADE;
DROP TYPE IF EXISTS "StripeWebhookProcessingStatus" CASCADE;
DROP TYPE IF EXISTS "AbuseAction" CASCADE;
DROP TYPE IF EXISTS "AbuseDecision" CASCADE;
DROP TYPE IF EXISTS "AgentRunStatus" CASCADE;
DROP TYPE IF EXISTS "ButtonAnswer" CASCADE;
DROP TYPE IF EXISTS "GapQuestionStatus" CASCADE;
DROP TYPE IF EXISTS "EvidenceConfidence" CASCADE;
DROP TYPE IF EXISTS "ChunkType" CASCADE;
DROP TYPE IF EXISTS "SourceType" CASCADE;
DROP TYPE IF EXISTS "Importance" CASCADE;
DROP TYPE IF EXISTS "RequirementType" CASCADE;
DROP TYPE IF EXISTS "ApplicationStatus" CASCADE;

ALTER TABLE "users" DROP COLUMN IF EXISTS "billing_account_id";

CREATE TABLE "career_profiles" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "raw_cv_text" TEXT NOT NULL,
  "raw_cv_file_name" TEXT,
  "profile_json" JSONB NOT NULL,
  "seniority" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "career_profiles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cv_applications" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "career_profile_id" TEXT NOT NULL,
  "job_text" TEXT NOT NULL,
  "job_analysis_json" JSONB,
  "match_json" JSONB,
  "questions_json" JSONB,
  "answers_json" JSONB,
  "extra_notes" TEXT,
  "match_score" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'questions_ready',
  "warning_json" JSONB,
  "error" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "cv_applications_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cv_drafts" (
  "id" TEXT NOT NULL,
  "application_id" TEXT NOT NULL,
  "structured_cv_json" JSONB NOT NULL,
  "sanitized_cv_json" JSONB NOT NULL,
  "html" TEXT NOT NULL,
  "pdf_bytes" BYTEA NOT NULL,
  "render_metrics_json" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cv_drafts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "agent_runs" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "application_id" TEXT,
  "step" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "input_tokens" INTEGER,
  "cached_input_tokens" INTEGER,
  "output_tokens" INTEGER,
  "cost_usd" DECIMAL(10,6),
  "duration_ms" INTEGER,
  "error" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "agent_runs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "career_profiles_user_id_key" ON "career_profiles"("user_id");
CREATE INDEX "career_profiles_user_id_idx" ON "career_profiles"("user_id");
CREATE INDEX "cv_applications_user_id_created_at_idx" ON "cv_applications"("user_id", "created_at");
CREATE INDEX "cv_applications_career_profile_id_idx" ON "cv_applications"("career_profile_id");
CREATE INDEX "cv_applications_status_idx" ON "cv_applications"("status");
CREATE UNIQUE INDEX "cv_drafts_application_id_key" ON "cv_drafts"("application_id");
CREATE INDEX "agent_runs_user_id_created_at_idx" ON "agent_runs"("user_id", "created_at");
CREATE INDEX "agent_runs_application_id_idx" ON "agent_runs"("application_id");
CREATE INDEX "agent_runs_step_created_at_idx" ON "agent_runs"("step", "created_at");

ALTER TABLE "career_profiles"
  ADD CONSTRAINT "career_profiles_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cv_applications"
  ADD CONSTRAINT "cv_applications_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cv_applications"
  ADD CONSTRAINT "cv_applications_career_profile_id_fkey"
  FOREIGN KEY ("career_profile_id") REFERENCES "career_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cv_drafts"
  ADD CONSTRAINT "cv_drafts_application_id_fkey"
  FOREIGN KEY ("application_id") REFERENCES "cv_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "agent_runs"
  ADD CONSTRAINT "agent_runs_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "agent_runs"
  ADD CONSTRAINT "agent_runs_application_id_fkey"
  FOREIGN KEY ("application_id") REFERENCES "cv_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
