import type { ReactNode } from "react";
import { headers } from "next/headers";

import { DashboardShell } from "./_components/DashboardShell";
import { getAuthSession } from "~/server/auth";

export default async function DashboardLayout(props: { children: ReactNode }) {
  const session = await getAuthSession(await headers());
  const user = session?.user;

  return (
    <DashboardShell userEmail={user?.email ?? ""} userName={user?.name ?? ""}>
      {props.children}
    </DashboardShell>
  );
}
