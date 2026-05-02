ALTER TABLE "applications"
ADD COLUMN "dream_role" TEXT,
ADD COLUMN "original_evidence_match_score" DOUBLE PRECISION,
ADD COLUMN "updated_evidence_match_score" DOUBLE PRECISION;

CREATE TABLE "requirement_fit_scores" (
  "id" TEXT NOT NULL,
  "application_id" TEXT NOT NULL,
  "job_requirement_id" TEXT NOT NULL,
  "final_confidence" "EvidenceConfidence" NOT NULL,
  "best_candidate_chunk_id" TEXT,
  "reason" TEXT NOT NULL,
  "importance_weight" DOUBLE PRECISION NOT NULL,
  "confidence_value" DOUBLE PRECISION NOT NULL,
  "earned_points" DOUBLE PRECISION NOT NULL,
  "possible_points" DOUBLE PRECISION NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "requirement_fit_scores_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "requirement_fit_scores_application_id_job_requirement_id_key"
ON "requirement_fit_scores"("application_id", "job_requirement_id");

CREATE INDEX "requirement_fit_scores_application_id_idx"
ON "requirement_fit_scores"("application_id");

CREATE INDEX "requirement_fit_scores_job_requirement_id_idx"
ON "requirement_fit_scores"("job_requirement_id");

CREATE INDEX "requirement_fit_scores_best_candidate_chunk_id_idx"
ON "requirement_fit_scores"("best_candidate_chunk_id");

ALTER TABLE "requirement_fit_scores"
ADD CONSTRAINT "requirement_fit_scores_application_id_fkey"
FOREIGN KEY ("application_id") REFERENCES "applications"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "requirement_fit_scores"
ADD CONSTRAINT "requirement_fit_scores_job_requirement_id_fkey"
FOREIGN KEY ("job_requirement_id") REFERENCES "job_requirements"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "requirement_fit_scores"
ADD CONSTRAINT "requirement_fit_scores_best_candidate_chunk_id_fkey"
FOREIGN KEY ("best_candidate_chunk_id") REFERENCES "candidate_chunks"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
