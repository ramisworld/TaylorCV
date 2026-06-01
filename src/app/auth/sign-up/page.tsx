import { Suspense } from "react";

import { AuthShell } from "../AuthShell";

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell mode="sign-up" />
    </Suspense>
  );
}
