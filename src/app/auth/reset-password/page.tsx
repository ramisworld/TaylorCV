import { redirect } from "next/navigation";

export default function LegacyResetPasswordPage() {
  redirect("/auth?mode=sign-in");
}
