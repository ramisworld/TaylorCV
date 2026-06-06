import { DashboardApplicationsPage } from "../_components/DashboardApplicationsPage";
import {
  companyLogoPath,
  getApplicationTitle,
  getCompanyName,
  getDashboardApplications,
  getLatestDraft,
  relativeTime,
  requireDashboardUser,
} from "../dashboard-utils";
import { normalizeTrackerStatus, trackerStatusLabels } from "../tracking-status";

export default async function ApplicationsPage() {
  const user = await requireDashboardUser("/dashboard/applications");
  const applications = await getDashboardApplications(user.id);

  return (
    <DashboardApplicationsPage
      applications={applications.map((application) => {
        const status = normalizeTrackerStatus(application.trackingStatus);
        const companyName = getCompanyName(application);

        return {
          id: application.id,
          title: getApplicationTitle(application),
          companyName,
          logoPath: companyLogoPath(companyName),
          trackingStatus: status,
          statusLabel: trackerStatusLabels[status],
          createdAtMs: application.createdAt.getTime(),
          updatedAtMs: application.updatedAt.getTime(),
          appliedLabel: relativeTime(application.createdAt),
          updatedLabel: relativeTime(application.updatedAt),
          hasCv: Boolean(getLatestDraft(application)),
        };
      })}
    />
  );
}
