import { Suspense } from "react";

import { AuthShell } from "./AuthShell";

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell />
    </Suspense>
  );
}
