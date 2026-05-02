"use client";

import { useState } from "react";

import type { RouterOutputs } from "~/trpc/react";

type ApplicationState = NonNullable<
  RouterOutputs["application"]["getApplicationState"]
>;

export function JobDNAView(props: {
  job: ApplicationState["job"];
  requirements: ApplicationState["jobRequirements"];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!props.job) return null;

  const topRequirements = [...props.requirements]
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 } as const;
      return rank[a.importance] - rank[b.importance];
    })
    .slice(0, 5);

  return (
    <section className="border-b border-zinc-200 py-4">
      <details
        className="rounded-md border border-zinc-200 bg-white p-4"
        open={isExpanded}
        onToggle={(event) => setIsExpanded(event.currentTarget.open)}
      >
        <summary className="cursor-pointer text-sm font-medium text-zinc-800">
          View job analysis
        </summary>
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <p className="font-medium text-zinc-950">
            {props.job.title}
            {props.job.company ? ` - ${props.job.company}` : ""}
          </p>
          <p className="mt-2 text-sm text-zinc-700">{props.job.summary}</p>
          {topRequirements.length > 0 ? (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-normal text-zinc-500">
                Top requirements
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {topRequirements.map((requirement) => (
                  <span
                    className="rounded bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800"
                    key={requirement.id}
                  >
                    {requirement.label}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {props.requirements.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-md border border-zinc-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="border-b border-zinc-200 text-zinc-600">
                  <tr>
                    <th className="p-3">Requirement</th>
                    <th className="p-3">Importance</th>
                    <th className="p-3">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {props.requirements.map((requirement) => (
                    <tr className="border-b border-zinc-100" key={requirement.id}>
                      <td className="p-3 font-medium text-zinc-950">
                        {requirement.label}
                      </td>
                      <td className="p-3 text-zinc-700">
                        {requirement.importance}
                      </td>
                      <td className="p-3 text-zinc-700">
                        {requirement.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </details>
    </section>
  );
}
