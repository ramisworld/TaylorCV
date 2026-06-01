import { Suspense } from "react";

import { AuthShell } from "../AuthShell";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <AuthShell mode="sign-in" />
    </Suspense>
  );
}
