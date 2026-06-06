import { DashboardOverview } from "./_components/DashboardOverview";
import {
  calculateMetrics,
  getApplicationTitle,
  getCompanyName,
  getDashboardApplications,
  getParsedLatestCv,
  relativeTime,
  requireDashboardUser,
} from "./dashboard-utils";
import { normalizeTrackerStatus, trackerStatusLabels } from "./tracking-status";

function firstName(name: string, email: string) {
  const source = name.trim() || email.split("@")[0] || "there";
  return source.split(/\s+/)[0] ?? "there";
}

function getGreeting(args: {
  applicationCount: number;
  hasClaimedApplication: boolean;
  name: string;
}) {
  if (args.hasClaimedApplication) {
    return {
      title: `Your tailored CV is ready, ${args.name} 👋`,
      subtitle: "Review your CV, download it, or track the application from here.",
    };
  }

  if (args.applicationCount === 0) {
    return {
      title: `Welcome to TaylorCV, ${args.name} 👋`,
      subtitle: "Create your first tailored CV and start tracking applications.",
    };
  }

  return {
    title: `Welcome back, ${args.name} 👋`,
    subtitle: "Track your applications and tailor CVs that get results.",
  };
}

export default async function DashboardPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await requireDashboardUser("/dashboard");
  const searchParams = props.searchParams ? await props.searchParams : {};
  const applications = await getDashboardApplications(user.id);
  const metrics = calculateMetrics(applications);
  const latestWithCv = applications.find((application) => getParsedLatestCv(application));
  const latestCv = latestWithCv ? getParsedLatestCv(latestWithCv) : null;
  const claimedApplicationId = searchParams.applicationId;
  const hasClaimedApplication =
    typeof claimedApplicationId === "string" &&
    applications.some((application) => application.id === claimedApplicationId);
  const greeting = getGreeting({
    applicationCount: applications.length,
    hasClaimedApplication,
    name: firstName(user.name, user.email),
  });

  const overviewApplications = applications.map((application) => ({
    id: application.id,
    title: getApplicationTitle(application),
    companyName: getCompanyName(application),
    trackingStatus: application.trackingStatus,
    relativeCreatedAt: relativeTime(application.createdAt),
    searchableStatus: trackerStatusLabels[normalizeTrackerStatus(application.trackingStatus)],
  }));

  return (
    <DashboardOverview
      applications={overviewApplications}
      greeting={greeting}
      latestCv={
        latestWithCv && latestCv
          ? {
              application: overviewApplications.find(
                (application) => application.id === latestWithCv.id
              )!,
              cv: latestCv.cv,
              presentationJson: latestCv.draft.presentationJson,
            }
          : null
      }
      metrics={metrics}
    />
  );
}
