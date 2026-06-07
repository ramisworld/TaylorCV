"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

export function UpgradeBillingButton(props: { isPaid: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const checkout = api.billing.createCheckoutSession.useMutation();
  const portal = api.billing.createPortalSession.useMutation();
  const isPending = checkout.isPending || portal.isPending;

  async function handleClick() {
    setError(null);
    try {
      const result = props.isPaid
        ? await portal.mutateAsync()
        : await checkout.mutateAsync({ planKey: "pro_monthly" });
      window.location.assign(result.url);
    } catch (event) {
      const message = event instanceof Error ? event.message : "Billing is not available yet.";
      setError(message === "ALREADY_HAS_SUBSCRIPTION" ? "Your subscription is already active." : message);
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        className={cn(
          "taylor-premium-button inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-[10px] border px-8 text-[16px] font-semibold text-white shadow-[0_20px_48px_rgba(65,61,230,0.28),0_0_34px_rgba(117,93,255,0.18)] disabled:pointer-events-none disabled:opacity-70 sm:min-w-[220px]",
          props.isPaid ? "sm:min-w-[230px]" : ""
        )}
        disabled={isPending}
        type="button"
        onClick={handleClick}
      >
        {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        <span>{props.isPaid ? "Manage subscription" : "Upgrade to Pro"}</span>
        {!isPending ? <ArrowRight className="h-5 w-5 stroke-[2.5]" /> : null}
      </button>
      {error ? (
        <p className="mt-3 max-w-[300px] text-[12px] font-medium leading-5 text-[#6b568c]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
