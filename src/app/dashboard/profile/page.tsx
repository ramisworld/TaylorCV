import { ProfileForm } from "../_components/ProfileForm";
import { requireDashboardUser } from "../dashboard-utils";
import { isRecord, textOrNull } from "~/lib/cvDocument";
import { db } from "~/server/db";

export default async function ProfilePage() {
  const user = await requireDashboardUser("/dashboard/profile");
  const profile = await db.candidateProfile.findFirst({
    where: {
      userId: user.id,
      archivedAt: null,
    },
    orderBy: { updatedAt: "desc" },
  });

  const contact: Record<string, unknown> = isRecord(profile?.contactInfoJson)
    ? profile.contactInfoJson
    : {};
  const links: Record<string, unknown> = isRecord(profile?.linksJson)
    ? profile.linksJson
    : {};

  return (
    <section className="rounded-[18px] border border-[#dce5f2] bg-white p-6 shadow-[0_20px_60px_rgba(47,68,115,0.08)] sm:p-7">
      <div className="mb-7">
        <h1 className="text-[28px] font-black tracking-normal text-[#071026]">Profile</h1>
        <p className="mt-2 text-[15px] font-bold text-[#617294]">
          Manage the baseline information TaylorCV can use for future applications.
        </p>
      </div>
      <ProfileForm
        initialValues={{
          fullName: user.name || textOrNull(contact.fullName) || "",
          email: user.email,
          location: textOrNull(contact.location) || "",
          linkedIn: textOrNull(links.linkedIn) || "",
          github: textOrNull(links.github) || "",
          portfolio: textOrNull(links.portfolio) || "",
          otherLinks: textOrNull(links.otherLinks) || "",
          currentTargetTitle: textOrNull(contact.currentTargetTitle) || "",
          baseCv: profile?.rawCvText ?? "",
        }}
      />
    </section>
  );
}
