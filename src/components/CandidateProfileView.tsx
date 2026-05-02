"use client";

import { useState } from "react";

import type { RouterOutputs } from "~/trpc/react";

type ApplicationState = NonNullable<
  RouterOutputs["application"]["getApplicationState"]
>;

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function CandidateProfileView(props: {
  profile: ApplicationState["candidateProfile"];
  evidence: ApplicationState["candidateChunks"];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!props.profile) return null;

  const strengths = [
    ...new Set([
      ...stringArray(props.profile.skillsJson),
      ...stringArray(props.profile.toolsJson),
    ]),
  ].slice(0, 8);
  const strongestEvidence = props.evidence.slice(0, 5);
  const remainingEvidence = props.evidence.slice(5);

  return (
    <section className="border-b border-zinc-200 py-4">
      <details
        className="rounded-md border border-zinc-200 bg-white p-4"
        open={isExpanded}
        onToggle={(event) => setIsExpanded(event.currentTarget.open)}
      >
        <summary className="cursor-pointer text-sm font-medium text-zinc-800">
          View profile evidence
        </summary>
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <p className="text-sm text-zinc-700">{props.profile.summary}</p>
          {strengths.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {strengths.map((strength) => (
                <span
                  className="rounded bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800"
                  key={strength}
                >
                  {strength}
                </span>
              ))}
            </div>
          ) : null}

          {strongestEvidence.length > 0 ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-zinc-950">
                Background evidence
              </p>
              {[...strongestEvidence, ...remainingEvidence].map((item) => (
                <p
                  className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700"
                  key={item.id}
                >
                  {item.content}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </details>
    </section>
  );
}
