CREATE INDEX IF NOT EXISTS "candidate_chunks_embedding_idx"
  ON "candidate_chunks"
  USING ivfflat ("embedding" vector_cosine_ops)
  WITH (lists = 100);
