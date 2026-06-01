import { Suspense } from "react";

import { AuthShell } from "../AuthShell";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell mode="reset" />
    </Suspense>
  );
}
