import { requireDashboardUser } from "../dashboard-utils";
import { ProfileWorkspace } from "./ProfileWorkspace";
import {
  emptyStructuredCareerProfile,
  findUserStructuredCareerProfile,
} from "~/server/cv/structuredProfile.service";

export default async function ProfilePage() {
  const user = await requireDashboardUser("/dashboard/profile");
  const saved = await findUserStructuredCareerProfile(user.id);
  const profile =
    saved?.structuredCareerProfile ??
    emptyStructuredCareerProfile({ name: user.name, email: user.email });

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-6">
      <header className="flex items-start justify-between gap-5 pt-1 pr-0 lg:pr-[190px]">
        <div>
          <h1 className="text-[24px] font-semibold leading-tight text-[#081543]">
            Profile
          </h1>
          <p className="mt-2 text-[13px] font-medium text-[#536485]">
            Manage your professional profile and career information.
          </p>
        </div>
      </header>
      <ProfileWorkspace initialProfile={profile} />
    </div>
  );
}
