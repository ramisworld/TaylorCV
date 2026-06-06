"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  normalizeTrackerStatus,
  trackerStatusLabels,
  trackerStatuses,
  type TrackerStatus,
} from "../tracking-status";

export function StatusSelect(props: {
  applicationId: string;
  value: string;
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState<TrackerStatus>(normalizeTrackerStatus(props.value));
  const updateStatus = api.application.updateTrackingStatus.useMutation({
    onSuccess: () => router.refresh(),
  });

  return (
    <label className={cn("relative inline-flex items-center", props.className)}>
      <span className="sr-only">Application status</span>
      <select
        className="h-10 min-w-[150px] cursor-pointer rounded-lg border border-[#d8e2f2] bg-white px-3 pr-9 text-sm font-extrabold text-[#17213d] shadow-sm outline-none transition focus:border-[#1158ff] focus:ring-4 focus:ring-blue-200/60 disabled:cursor-wait disabled:opacity-70"
        disabled={updateStatus.isPending}
        value={value}
        onChange={(event) => {
          const nextValue = normalizeTrackerStatus(event.target.value);
          setValue(nextValue);
          updateStatus.mutate({
            applicationId: props.applicationId,
            trackingStatus: nextValue,
          });
        }}
      >
        {trackerStatuses.map((status) => (
          <option key={status} value={status}>
            {trackerStatusLabels[status]}
          </option>
        ))}
      </select>
      {updateStatus.isPending ? (
        <Loader2 className="pointer-events-none absolute right-3 h-4 w-4 animate-spin text-[#617294]" />
      ) : null}
    </label>
  );
}
