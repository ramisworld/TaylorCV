import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getAuthSession } from "~/server/auth";

export async function requireDashboardUser(callbackUrl = "/dashboard") {
  const session = await getAuthSession(await headers());
  const userId = session?.user?.id;

  if (!userId) {
    redirect(`/auth?mode=sign-in&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return {
    id: userId,
    email: session.user.email,
    name: session.user.name ?? "",
  };
}
