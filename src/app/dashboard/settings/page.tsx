import { SignOutButton } from "../_components/SignOutButton";
import { requireDashboardUser } from "../dashboard-utils";
import { db } from "~/server/db";

export default async function SettingsPage() {
  const user = await requireDashboardUser("/dashboard/settings");
  const accounts = await db.account.findMany({
    where: { userId: user.id },
    select: { providerId: true },
    orderBy: { createdAt: "asc" },
  });
  const methods = accounts.map((account) => account.providerId).filter(Boolean);

  return (
    <section className="rounded-[18px] border border-[#dce5f2] bg-white p-6 shadow-[0_20px_60px_rgba(47,68,115,0.08)] sm:p-7">
      <div className="mb-7">
        <h1 className="text-[28px] font-black tracking-normal text-[#071026]">Settings</h1>
        <p className="mt-2 text-[15px] font-bold text-[#617294]">
          Basic account and privacy controls.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[14px] border border-[#e1e8f3] bg-[#f8fbff] p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#617294]">
            Account email
          </p>
          <p className="mt-2 text-lg font-black text-[#071026]">{user.email}</p>
        </div>

        <div className="rounded-[14px] border border-[#e1e8f3] bg-[#f8fbff] p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#617294]">
            Sign-in method
          </p>
          <p className="mt-2 text-lg font-black text-[#071026]">
            {methods.length ? methods.join(", ") : "Email link"}
          </p>
        </div>

        <div className="rounded-[14px] border border-[#e1e8f3] bg-[#f8fbff] p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#617294]">
            Privacy
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#33466d]">
            Your applications and generated CVs are only loaded for your signed-in account.
          </p>
        </div>

        <div className="rounded-[14px] border border-[#e1e8f3] bg-[#f8fbff] p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#617294]">
            Delete account
          </p>
          <button
            className="mt-3 inline-flex h-10 cursor-not-allowed items-center rounded-lg border border-[#d8e2f2] bg-white px-4 text-sm font-extrabold text-[#8490a8]"
            disabled
            type="button"
          >
            Not available yet
          </button>
        </div>
      </div>

      <div className="mt-7">
        <SignOutButton />
      </div>
    </section>
  );
}
