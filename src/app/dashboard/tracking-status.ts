export const trackerStatuses = [
  "ready",
  "applied",
  "response",
  "interview",
  "offer",
  "accepted",
  "rejected",
] as const;

export type TrackerStatus = (typeof trackerStatuses)[number];

export const trackerStatusLabels: Record<TrackerStatus, string> = {
  ready: "Ready",
  applied: "Applied",
  response: "Response",
  interview: "Interview",
  offer: "Offer",
  accepted: "Accepted",
  rejected: "Rejected",
};

export function normalizeTrackerStatus(value: string): TrackerStatus {
  return trackerStatuses.includes(value as TrackerStatus)
    ? (value as TrackerStatus)
    : "ready";
}
