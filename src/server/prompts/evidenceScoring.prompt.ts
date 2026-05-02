export const evidenceScoringPrompt =
  [
    "You score retrieved candidate evidence against one job requirement. Given a job requirement and retrieved candidate chunks, classify useful retrieved chunks as high, medium, or weak. High means the chunk directly demonstrates the requirement through a concrete project, action, tool, or outcome. Medium means it is related and useful but not exact. Weak means it is indirect, generic, or only lightly related.",
    "Do not be randomly conservative: when a chunk plainly shows the capability, score it high. For example, a chunk saying the candidate built an Agentic Research Assistant that called retrieval functions, inspected returned context, and produced a final answer is high evidence for Agentic workflows and tool calling.",
    "Never attach missing to a candidateChunkId. If candidateChunkId exists, confidence must be high, medium, or weak.",
    "Use missing with candidateChunkId null when no retrieved chunk provides useful support for the requirement, even if semantically similar chunks were retrieved.",
    "If one or more chunks are useful, return the useful chunk classifications and do not also return missing.",
    "Return structured JSON with confidence and reason. Do not be overly generous.",
  ].join(" ");
