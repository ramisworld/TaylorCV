-- Extend gap questions with coach-facing guidance.
ALTER TABLE "gap_questions"
ADD COLUMN "why_it_matters" TEXT,
ADD COLUMN "answer_guidance" TEXT,
ADD COLUMN "example_angles_json" JSONB;

-- Store one guided evidence coach intro per application.
CREATE TABLE "gap_coach_insights" (
  "id" TEXT NOT NULL,
  "application_id" TEXT NOT NULL,
  "opening_message" TEXT NOT NULL,
  "job_wants" TEXT NOT NULL,
  "candidate_strengths_json" JSONB NOT NULL,
  "candidate_concerns_json" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "gap_coach_insights_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "gap_coach_insights_application_id_key"
ON "gap_coach_insights"("application_id");

CREATE INDEX "gap_coach_insights_application_id_idx"
ON "gap_coach_insights"("application_id");

ALTER TABLE "gap_coach_insights"
ADD CONSTRAINT "gap_coach_insights_application_id_fkey"
FOREIGN KEY ("application_id") REFERENCES "applications"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
