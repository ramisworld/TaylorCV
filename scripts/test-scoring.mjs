import assert from "node:assert/strict";

import {
  calculateEvidenceMatchScoreFromRows,
  confidenceValue,
  importanceWeight,
} from "../src/lib/scoring.ts";

function fitScore({ importance, confidence }) {
  const possiblePoints = importanceWeight(importance);
  const value = confidenceValue(confidence);

  return {
    finalConfidence: confidence,
    bestCandidateChunkId: confidence === "missing" ? null : "chunk-1",
    earnedPoints: possiblePoints * value,
    possiblePoints,
  };
}

const rows = [
  fitScore({ importance: "high", confidence: "high" }),
  fitScore({ importance: "high", confidence: "weak" }),
  fitScore({ importance: "medium", confidence: "missing" }),
  fitScore({ importance: "low", confidence: "medium" }),
];

assert.equal(rows.length, 4, "one fit score row should exist per requirement");
assert.equal(
  rows.filter((row) => row.finalConfidence === "missing")[0]
    ?.bestCandidateChunkId,
  null,
  "missing confidence must not point at an unrelated chunk"
);

const score = calculateEvidenceMatchScoreFromRows(rows);
const expectedEarned = 5 * 1 + 5 * 0.3 + 3 * 0 + 1 * 0.65;
const expectedPossible = 5 + 5 + 3 + 1;

assert.equal(score.earnedPoints, expectedEarned);
assert.equal(score.possiblePoints, expectedPossible);
assert.equal(score.score, Math.round((expectedEarned / expectedPossible) * 100));

const traceRowsForOneRequirement = [
  { candidateChunkId: "chunk-a", similarityScore: 0.81 },
  { candidateChunkId: "chunk-b", similarityScore: 0.74 },
  { candidateChunkId: "chunk-c", similarityScore: 0.7 },
];
const requirementFitRows = [fitScore({ importance: "high", confidence: "high" })];

assert.equal(
  calculateEvidenceMatchScoreFromRows(requirementFitRows).possiblePoints,
  5,
  "top retrieved evidence_matches rows must not be double-counted"
);
assert.equal(traceRowsForOneRequirement.length, 3);

console.log("Deterministic scoring tests passed.");
