"use client";

import { useState } from "react";

import { LandingPage } from "~/components/landing/LandingPage";

function goToDashboardAuth() {
  window.location.href = `/auth?mode=sign-up&callbackUrl=${encodeURIComponent("/dashboard")}`;
}

export default function Home() {
  const [isRouting, setIsRouting] = useState(false);

  function handleGetStarted() {
    setIsRouting(true);
    goToDashboardAuth();
  }

  return (
    <LandingPage
      error={null}
      isLoading={isRouting}
      onGetStarted={handleGetStarted}
    />
  );
}
