import { Suspense } from "react";

import { AuthShell } from "../AuthShell";

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell mode="forgot" />
    </Suspense>
  );
}
