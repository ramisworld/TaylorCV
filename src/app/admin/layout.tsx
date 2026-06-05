import { AdminForbiddenState, AdminShell } from "~/components/admin/AdminUi";
import { requireAdmin } from "~/server/auth";

export default async function AdminLayout(props: { children: React.ReactNode }) {
  const access = await requireAdmin("/admin");

  if (!access.isAdmin) {
    return (
      <AdminForbiddenState
        email={access.email}
        hasGoogleAccount={access.hasGoogleAccount}
        isAllowedEmail={access.isAllowedEmail}
      />
    );
  }

  return <AdminShell userEmail={access.email}>{props.children}</AdminShell>;
}
