import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getAuthSession } from "~/server/auth";

import { DashboardWorkspace } from "./DashboardWorkspace";

export default async function DashboardPage() {
  const session = await getAuthSession(await headers());
  if (!session?.user?.id) {
    redirect(`/auth?mode=sign-in&callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  return (
    <DashboardWorkspace
      userEmail={session.user.email}
      userName={session.user.name ?? ""}
    />
  );
}
