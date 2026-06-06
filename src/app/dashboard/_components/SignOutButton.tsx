"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "~/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#d8e2f2] bg-white px-5 text-sm font-extrabold text-[#17213d] shadow-sm hover:bg-[#f7faff]"
      onClick={() => {
        void authClient.signOut();
        router.push("/");
      }}
      type="button"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
