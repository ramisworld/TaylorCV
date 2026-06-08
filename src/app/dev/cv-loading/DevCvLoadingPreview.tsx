"use client";

import { useEffect, useState } from "react";

import { CVGenerationLoadingScreen } from "~/components/cv-flow/CVGenerationTransition";

const mockCandidateSource = {
  contactInfoJson: {
    email: "alex.taylor@example.com",
    fullName: "Alex Taylor",
    location: "Auckland, NZ",
    phone: "+64 21 555 0142",
    professionalTitle: "Applied AI Engineer",
  },
  jobTitle: "Senior AI Product Engineer",
  linksJson: {
    github: "github.com/alextaylor",
    linkedin: "linkedin.com/in/alextaylor",
    portfolio: "alextaylor.dev",
  },
  profileJson: {
    candidateBrief: {
      possibleHeadline: "Applied AI Engineer",
    },
    structuredCareerProfile: {
      basics: {
        currentRole: "Applied AI Engineer",
        email: "alex.taylor@example.com",
        fullName: "Alex Taylor",
        location: "Auckland, NZ",
        phone: "+64 21 555 0142",
      },
      careerDetails: {},
      credentials: [],
      education: [],
      experiences: [],
      links: [
        { id: "link-github", label: "GitHub", type: "github", url: "github.com/alextaylor" },
        { id: "link-linkedin", label: "LinkedIn", type: "linkedin", url: "linkedin.com/in/alextaylor" },
        { id: "link-portfolio", label: "Portfolio", type: "portfolio", url: "alextaylor.dev" },
      ],
      metadata: { source: "intake_import" },
      projects: [],
      skills: [],
    },
  },
};

export function DevCvLoadingPreview() {
  const [isReady, setIsReady] = useState(false);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    setIsReady(false);

    const readyTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 9000);

    return () => window.clearTimeout(readyTimer);
  }, [runKey]);

  return (
    <CVGenerationLoadingScreen
      candidateSource={mockCandidateSource}
      cv={null}
      isReady={isReady}
      key={runKey}
      onReveal={() => {
        window.setTimeout(() => {
          setRunKey((current) => current + 1);
        }, 1800);
      }}
    />
  );
}
