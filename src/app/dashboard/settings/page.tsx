import Image from "next/image";
import {
  BadgeCheck,
  Check,
  FileCheck2,
  FileText,
  Rocket,
  ShieldCheck,
  Star,
} from "lucide-react";

import { requireDashboardUser } from "../dashboard-utils";
import { getEntitlementState } from "~/server/services/entitlement.service";
import { UpgradeBillingButton } from "./UpgradeBillingButton";

function usageMessage(args: { isFree: boolean; quota: number; remaining: number }) {
  if (!args.isFree) return "Your plan is active for this billing period.";
  if (args.remaining <= 0) return "You've used your free CV generation.";
  return `You have ${args.remaining} free CV generation${args.remaining === 1 ? "" : "s"} left.`;
}

export default async function SettingsPage() {
  const user = await requireDashboardUser("/dashboard/settings");
  const entitlement = await getEntitlementState(user.id);
  const quota = entitlement.plan.cvGenerationQuota;
  const used = Math.min(entitlement.used, quota);
  const remaining = Math.max(0, quota - entitlement.used);
  const progress = quota > 0 ? Math.min(100, Math.round((used / quota) * 100)) : 0;
  const isFree = entitlement.planKey === "free";
  const isPaid = !isFree;
  const planLabel = isFree ? "Free Plan" : `${entitlement.plan.displayName} Plan`;
  const usageCopy = usageMessage({ isFree, quota, remaining });

  return (
    <div className="h-full min-h-0 overflow-y-auto pb-8 lg:pr-1">
      <section className="w-full">
        <header className="flex flex-col gap-4 pt-1 pr-0 lg:min-h-[64px] lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:pr-[250px]">
          <div>
            <h1 className="text-[28px] font-semibold leading-tight tracking-normal text-[#08112f] sm:text-[30px]">
              Plans & Billing
            </h1>
            <p className="mt-2 text-[14px] font-medium leading-6 text-[#42517c]">
              Manage your plan and unlock the full power of TaylorCV.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-transparent text-[13px] font-medium text-[#4f5193] lg:mt-3">
            <ShieldCheck className="h-4 w-4 text-[#605ee8]" />
            Secure & encrypted
          </div>
        </header>

        <section className="mt-7 rounded-[18px] border border-[#dce5f5] bg-white/82 px-5 py-6 shadow-[0_20px_54px_rgba(64,76,128,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:px-7 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)_90px] lg:items-center">
            <div className="flex items-center gap-5">
              <div className="grid h-[74px] w-[74px] shrink-0 place-items-center rounded-[17px] bg-[linear-gradient(145deg,#f1edff,#e4eaff)] shadow-[0_15px_30px_rgba(92,83,187,0.13),inset_0_1px_0_rgba(255,255,255,0.86)]">
                <FileText className="h-9 w-9 fill-[#5c37f1]/10 text-[#4238f2] stroke-[2.1]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#38436c]">Current Plan</p>
                <h2 className="mt-2 text-[25px] font-semibold leading-none text-[#08112f]">
                  {planLabel}
                </h2>
                <p className="mt-3 text-[14px] font-medium text-[#68739b]">
                  {isFree ? "You get 1 free CV generation." : "Your Pro features are active."}
                </p>
              </div>
            </div>

            <div className="border-[#dce3f0] lg:border-l lg:pl-12">
              <p className="text-[13px] font-semibold text-[#38436c]">Usage</p>
              <h2 className="mt-2 text-[26px] font-semibold leading-none text-[#08112f]">
                {used} of {quota} used
              </h2>
              <div className="mt-4 h-[6px] overflow-hidden rounded-full bg-[#e4e7ff]">
                <div
                  aria-label={`${progress}% of plan usage used`}
                  className="h-full rounded-full bg-[linear-gradient(90deg,#7f7aff,#5235ed)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-[13px] font-medium leading-5 text-[#68739b]">
                {usageCopy}
              </p>
            </div>

            <div className="hidden justify-self-end lg:block">
              <div className="relative grid h-[76px] w-[76px] place-items-center rounded-full bg-[#f0edff] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <FileCheck2 className="h-9 w-9 fill-[#5d40f0]/10 text-[#5a40ee]" />
                <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-white text-[#6d63f3] shadow-[0_8px_18px_rgba(75,72,180,0.16)]">
                  <Check className="h-5 w-5 stroke-[3]" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7 overflow-hidden rounded-[20px] border border-[#d8e0f2] bg-[linear-gradient(105deg,#eef1ff_0%,#f7f9ff_48%,#ffffff_100%)] shadow-[0_24px_70px_rgba(65,75,130,0.14),inset_0_1px_0_rgba(255,255,255,0.92)]">
          <div className="grid lg:min-h-[520px] lg:grid-cols-[minmax(0,0.56fr)_minmax(480px,0.44fr)] 2xl:min-h-[560px]">
            <div className="relative min-h-[290px] overflow-hidden bg-[#ecefff] sm:min-h-[360px] lg:min-h-full">
              <Image
                alt="A person walking up stone steps toward a mountain flag"
                className="object-cover object-[48%_center]"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                src="/assets/man_walking.png"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6f7ff] to-transparent lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[34%] lg:bg-gradient-to-r lg:from-transparent lg:to-[#fbfcff]" />
            </div>

            <div className="flex items-center px-6 py-8 sm:px-10 lg:px-12 lg:py-10 xl:px-14 2xl:px-16">
              <div className="w-full max-w-[640px]">
                <div className="inline-flex items-center gap-2 rounded-[9px] bg-[#eee8ff] px-3 py-2 text-[13px] font-semibold text-[#5131ef] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
                  <Rocket className="h-4 w-4" />
                  Unlock your next opportunity
                </div>

                <h2 className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-normal text-[#08112f] sm:text-[50px] lg:text-[46px] xl:text-[54px]">
                  Unlock unlimited
                  <span className="block text-[#4d38f2]">CV generations.</span>
                </h2>
                <p className="mt-5 max-w-[560px] text-[16px] font-medium leading-7 text-[#5d678f]">
                  Go further with TaylorCV Pro and create the perfect CV for every opportunity.
                </p>

                <ul className="mt-6 grid gap-4">
                  {[
                    "Unlimited CV generations",
                    "Advanced AI tailoring for every role",
                    "Export to PDF & DOCX",
                  ].map((benefit) => (
                    <li className="flex items-center gap-3 text-[14px] font-medium text-[#596489]" key={benefit}>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[linear-gradient(180deg,#a79cff,#7268f2)] text-white shadow-[0_8px_16px_rgba(102,91,231,0.22)]">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-[#08112f]">
                  <span>{isPaid ? "Trusted by job seekers" : "Loved by job seekers"}</span>
                  <span className="flex items-center gap-1 text-[#ffbd1f]" aria-label="Five star rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star className="h-4 w-4 fill-current" key={index} />
                    ))}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-[44px] font-semibold leading-none tracking-normal text-[#08112f]">
                        $9.99
                      </span>
                      <span className="pb-1.5 text-[15px] font-medium text-[#536180]">/month</span>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-[13px] font-medium text-[#68739b]">
                      <BadgeCheck className="h-4 w-4 text-[#6a62f0]" />
                      Cancel anytime.
                    </p>
                  </div>

                  <UpgradeBillingButton isPaid={isPaid} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
