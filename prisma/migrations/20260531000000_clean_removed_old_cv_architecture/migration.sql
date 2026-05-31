-- Clean up old CV architecture fields from Application model
ALTER TABLE "applications" DROP COLUMN IF EXISTS "original_evidence_match_score";
ALTER TABLE "applications" DROP COLUMN IF EXISTS "updated_evidence_match_score";
ALTER TABLE "applications" DROP COLUMN IF EXISTS "match_label";
ALTER TABLE "applications" DROP COLUMN IF EXISTS "cv_angle";
ALTER TABLE "applications" DROP COLUMN IF EXISTS "match_analysis_json";

-- Remove old ApplicationStatus enum values
-- Note: PostgreSQL does not support removing individual enum values directly.
-- The enum is recreated with only the active values.
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
CREATE TYPE "ApplicationStatus" AS ENUM ('started', 'job_added', 'candidate_added', 'questions_ready', 'answers_added', 'cv_ready');
ALTER TABLE "applications" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "applications" ALTER COLUMN "status" TYPE "ApplicationStatus" USING "status"::text::"ApplicationStatus";
ALTER TABLE "applications" ALTER COLUMN "status" SET DEFAULT 'started';
DROP TYPE "ApplicationStatus_old";
