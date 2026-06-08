"use client";

import {
  ArrowRight,
  Check,
  LockKeyhole,
  LockOpen,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { A4CvPreview } from "~/components/cv-flow/A4CvPreview";
import { TaylorBrand, TaylorLogoMark } from "~/components/TaylorBrand";
import { FlowStepper } from "~/components/cv-flow/FlowStepper";
import {
  contactItems,
  isRecord,
  normalizeCvSections,
  type CvHeader,
  type StructuredCv,
} from "~/lib/cvDocument";

import styles from "./cv-generation-transition.module.css";

const generationSteps = [
  "Analyzing experience",
  "Matching job requirements",
  "Writing your CV",
  "Complete",
] as const;

const loadingTasks = [
  "Analyzing your experience",
  "Matching evidence to the role",
  "Refining achievements & impact",
  "Generating your tailored CV",
] as const;

const stageMilestones = [27, 50, 72, 96] as const;

type CandidatePreviewSource = {
  profileJson?: unknown;
  contactInfoJson?: unknown;
  linksJson?: unknown;
  jobTitle?: string | null;
};

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function fallbackHeader(source?: CandidatePreviewSource | null): CvHeader {
  const profile = isRecord(source?.profileJson) ? source.profileJson : {};
  const structuredCareerProfile = isRecord(profile.structuredCareerProfile)
    ? profile.structuredCareerProfile
    : {};
  const basics = isRecord(structuredCareerProfile.basics)
    ? structuredCareerProfile.basics
    : {};
  const contact = isRecord(source?.contactInfoJson)
    ? source.contactInfoJson
    : {};
  const links = isRecord(source?.linksJson) ? source.linksJson : {};
  const profileLinks = Array.isArray(structuredCareerProfile.links)
    ? structuredCareerProfile.links.filter(isRecord)
    : [];
  const typedLink = (type: string) =>
    profileLinks.find((link) => text(link.type) === type);
  const otherUrls = profileLinks
    .filter((link) => !["linkedin", "github", "portfolio"].includes(text(link.type) ?? ""))
    .map((link) => link.url);

  return {
    name: text(contact.fullName) ?? text(basics.fullName) ?? "Your CV",
    targetTitle:
      text(source?.jobTitle) ??
      text(contact.professionalTitle) ??
      text(basics.currentRole) ??
      "Tailored CV",
    email: text(contact.email) ?? text(basics.email),
    phone: text(contact.phone) ?? text(basics.phone),
    location: text(contact.location) ?? text(basics.location),
    links: [
      (text(links.linkedin) ?? text(typedLink("linkedin")?.url))
        ? {
            label: "LinkedIn",
            url: (text(links.linkedin) ?? text(typedLink("linkedin")?.url)) as string,
            linkType: "personal_contact",
          }
        : null,
      (text(links.github) ?? text(typedLink("github")?.url))
        ? {
            label: "GitHub",
            url: (text(links.github) ?? text(typedLink("github")?.url)) as string,
            linkType: "personal_contact",
          }
        : null,
      (text(links.portfolio) ?? text(typedLink("portfolio")?.url))
        ? {
            label: "Portfolio",
            url: (text(links.portfolio) ?? text(typedLink("portfolio")?.url)) as string,
            linkType: "portfolio_link",
          }
        : null,
      ...otherUrls
        .map((url) => text(url))
        .filter((url): url is string => Boolean(url))
        .slice(0, 1)
        .map((url) => ({
          label: "Website",
          url,
          linkType: "personal_contact",
        })),
    ].filter((link): link is { label: string; url: string; linkType: string } =>
      Boolean(link),
    ),
  };
}

const fallbackLoadingSections = [
  "Professional Summary",
  "Key Achievements",
  "Professional Experience",
  "Education",
  "Skills",
  "Tools & Technologies",
];

function loadingDocumentSections(cv: StructuredCv | null) {
  const realSections = cv
    ? normalizeCvSections(cv)
        .map((section) => section.label)
        .filter(Boolean)
    : [];

  const merged = [...realSections];

  for (const fallback of fallbackLoadingSections) {
    if (
      !merged.some(
        (section) => section.toLowerCase() === fallback.toLowerCase(),
      )
    ) {
      merged.push(fallback);
    }
  }

  return merged.slice(0, 6);
}

function SecureChrome(props: { children: React.ReactNode }) {
  return (
    <section className={styles.secureChrome}>
      <div className={styles.secureBackground} />
      <div className={styles.secureBottomWash} />

      <div className={styles.secureTopbar}>
        <TaylorLogoMark className={styles.secureLogo} />

        <div className={styles.secureLabel}>
          <ShieldCheck className="h-4 w-4 text-[#5a78b1]" />
          Your data is secure
        </div>
      </div>

      {props.children}
    </section>
  );
}

function GenerationHeader() {
  return (
    <header className={styles.generationHeader}>
      <TaylorBrand
        className={styles.generationBrand}
        markClassName="h-10 w-10 sm:h-11 sm:w-11"
        textClassName="text-[22px] font-[700] tracking-[-0.045em] text-[#07134a] sm:text-[26px]"
      />

      <div className={styles.generationStepper}>
        <FlowStepper currentStep={4} />
      </div>
    </header>
  );
}

function SparkleGlyph(props: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={props.className}
      fill="none"
      viewBox="0 0 52 52"
    >
      <path
        d="M19.7 7.7l3.1 9.1 8.9 3.2-8.9 3.2-3.1 9.1-3.2-9.1-8.8-3.2 8.8-3.2 3.2-9.1z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M35.7 18.5l2 5.7 5.6 2-5.6 2.1-2 5.7-2-5.7-5.6-2.1 5.6-2 2-5.7zM22.4 34.5l1.2 3.6 3.5 1.3-3.5 1.2-1.2 3.7-1.3-3.7-3.5-1.2 3.5-1.3 1.3-3.6z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}

function SearchGlyph() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <circle
        cx="12.2"
        cy="12.2"
        r="7.4"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M17.8 17.8l6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}

function PuzzleGlyph() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <path
        d="M11.2 4.7h5.7v4.1h1.8a3.2 3.2 0 110 6.4h-1.8v3.9h-4.2v-1.4a3.2 3.2 0 10-6.4 0v1.4H3.7v-7h4.1v-2H3.7V4.7h4.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function RatingStar(props: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={props.className}
      fill="currentColor"
      shapeRendering="geometricPrecision"
      viewBox="0 0 20 19"
    >
      <path d="M10 0.9l2.9 5.88 6.5.95-4.7 4.57 1.11 6.47L10 15.72 4.19 18.77 5.3 12.3.6 7.73l6.5-.95L10 .9z" />
    </svg>
  );
}

function TargetGlyph() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="9.4" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="14" cy="14" r="5.2" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="14" cy="14" r="1.7" fill="currentColor" />
    </svg>
  );
}

function NorthStarGlyph() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <path
        d="M14 3.5l2.1 7.4 7.4 3.1-7.4 3.1L14 24.5l-2.1-7.4L4.5 14l7.4-3.1L14 3.5z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <path
        d="M5 6.2v3.1M3.4 7.8h3.2M22 20v3.1M20.4 21.6h3.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function StatusPill(props: { children: React.ReactNode; dot?: boolean }) {
  return (
    <span className={styles.statusPill}>
      {props.dot ? <span className={styles.statusDot} /> : null}
      {props.children}
    </span>
  );
}

function CircularProgressToTick(props: {
  ready: boolean;
  onSuccessShown?: () => void;
}) {
  const [progress, setProgress] = useState(8);
  const [showTick, setShowTick] = useState(false);

  const radius = 47;
  const circumference = 2 * Math.PI * radius;
  const visibleProgress = props.ready ? 100 : progress;

  useEffect(() => {
    if (props.ready) {
      setProgress(100);

      const tickTimer = window.setTimeout(() => {
        setShowTick(true);
        props.onSuccessShown?.();
      }, 520);

      return () => window.clearTimeout(tickTimer);
    }

    const startedAt = performance.now();
    const startValue = progress;
    let frame = 0;

    const animateProgress = (time: number) => {
      const elapsed = time - startedAt;
      const ratio = Math.min(elapsed / 25000, 1);
      const eased = 1 - (1 - ratio) ** 2.2;

      setProgress(Math.min(96, startValue + (96 - startValue) * eased));
      frame = window.requestAnimationFrame(animateProgress);
    };

    frame = window.requestAnimationFrame(animateProgress);

    return () => window.cancelAnimationFrame(frame);

    // Starts once for a continuous, non-jumpy 25s fill.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ready]);

  return (
    <div className={styles.progressShell}>
      <div className={styles.progressParticles} aria-hidden="true">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={styles.progressOuterRing} />
      <div className={styles.progressInnerRing} />

      <svg
        className={styles.progressSvg}
        height="108"
        viewBox="0 0 128 128"
        width="108"
      >
        <defs>
          <linearGradient
            id="generation-progress-gradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1d5ff3" />
            <stop offset="52%" stopColor="#2f7cff" />
            <stop offset="100%" stopColor="#79b7ff" />
          </linearGradient>
        </defs>

        <circle
          cx="64"
          cy="64"
          fill="rgba(255,255,255,0.86)"
          r="58"
          stroke="#edf2fc"
          strokeWidth="1"
        />

        <circle
          cx="64"
          cy="64"
          fill="none"
          r={radius}
          stroke="#e8eef9"
          strokeLinecap="round"
          strokeWidth="9"
        />

        <motion.circle
          animate={{
            strokeDashoffset: circumference * (1 - visibleProgress / 100),
          }}
          cx="64"
          cy="64"
          fill="none"
          r={radius}
          stroke="url(#generation-progress-gradient)"
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeWidth="9"
          transition={{ duration: props.ready ? 0.55 : 0.25, ease: "easeOut" }}
        />
      </svg>

      <div className={styles.progressCenter}>
        {showTick ? (
          <motion.span
            animate={{ scale: 1, opacity: 1 }}
            className={styles.progressTick}
            initial={{ scale: 0.72, opacity: 0 }}
          >
            <Check className="h-6 w-6" strokeWidth={3.25} />
          </motion.span>
        ) : (
          <span className={styles.progressPercent}>
            {Math.round(visibleProgress)}%
          </span>
        )}
      </div>
    </div>
  );
}

function CompletionConfetti(props: { active: boolean }) {
  if (!props.active) return null;

  return (
    <div className={styles.confetti} aria-hidden="true">
      {Array.from({ length: 22 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function GenerationStepRow(props: { ready: boolean }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (props.ready) {
      setActiveStep(3);
      return;
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, 2));
    }, 4300);

    return () => window.clearInterval(timer);
  }, [props.ready]);

  return (
    <div className={styles.stepRow}>
      {generationSteps.map((step, index) => {
        const isComplete = index < activeStep || (props.ready && index === 3);
        const isActive = !props.ready && index === activeStep;

        return (
          <div className={styles.stepContents} key={step}>
            <span className={styles.stepItem}>
              <span
                className={[
                  styles.stepDot,
                  isComplete ? styles.stepDotComplete : "",
                  isActive ? styles.stepDotActive : "",
                ].join(" ")}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : isActive ? (
                  <span className={styles.stepSpinner} />
                ) : null}
              </span>
              {step}
            </span>

            {index < generationSteps.length - 1 ? (
              <span
                className={[
                  styles.stepConnector,
                  isComplete ? styles.stepConnectorComplete : "",
                ].join(" ")}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function LoadingLine(props: {
  width: string;
  short?: boolean;
  faint?: boolean;
}) {
  return (
    <span
      className={[
        styles.loadingCvLine,
        props.short ? styles.loadingCvLineShort : "",
        props.faint ? styles.loadingCvLineFaint : "",
      ].join(" ")}
      style={{ width: props.width }}
    />
  );
}

function LoadingAchievementGrid() {
  return (
    <div className={styles.loadingAchievementGrid}>
      {[0, 1, 2, 3].map((item) => (
        <div className={styles.loadingBulletRow} key={item}>
          <span className={styles.loadingBulletDot} />
          <div className={styles.loadingBulletLines}>
            <LoadingLine width={item % 2 === 0 ? "88%" : "76%"} />
            <LoadingLine faint width={item % 2 === 0 ? "68%" : "58%"} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingExperienceTimeline() {
  return (
    <div className={styles.loadingExperienceTimeline}>
      {[0, 1, 2].map((entry) => (
        <div className={styles.loadingExperienceEntry} key={entry}>
          <span className={styles.loadingTimelineDot} />

          {entry < 2 ? <span className={styles.loadingTimelineLine} /> : null}

          <div className={styles.loadingExperienceContent}>
            <div className={styles.loadingEntryHeader}>
              <LoadingLine width={entry === 0 ? "42%" : "34%"} />
              <LoadingLine short width={entry === 0 ? "22%" : "18%"} />
            </div>

            <div className={styles.loadingEntryBody}>
              <LoadingLine width="86%" />
              <LoadingLine width="78%" />
              <LoadingLine width={entry === 2 ? "64%" : "72%"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingChipRows() {
  return (
    <div className={styles.loadingChipGrid}>
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          className={styles.loadingChip}
          key={index}
          style={{
            width: `${46 + ((index * 17) % 48)}px`,
          }}
        />
      ))}
    </div>
  );
}

function LoadingPlainLines(props: { compact?: boolean }) {
  return (
    <div className={styles.loadingPlainLines}>
      <LoadingLine width="94%" />
      <LoadingLine width="86%" />
      {!props.compact ? <LoadingLine width="68%" /> : null}
    </div>
  );
}

function LoadingCvSection(props: { label: string; index: number }) {
  const lower = props.label.toLowerCase();

  const isAchievements =
    lower.includes("achievement") || lower.includes("accomplishment");
  const isExperience =
    lower.includes("experience") ||
    lower.includes("employment") ||
    lower.includes("work");
  const isChips =
    lower.includes("skill") ||
    lower.includes("tool") ||
    lower.includes("technolog") ||
    lower.includes("certification");

  return (
    <section className={styles.loadingCvSection}>
      <div className={styles.loadingCvSectionHeader}>
        <span className={styles.loadingCvSectionIcon}>
          {isAchievements ? "✧" : isExperience ? "•" : isChips ? "◆" : "○"}
        </span>

        <h3>{props.label}</h3>
      </div>

      <div className={styles.loadingCvSectionContent}>
        {isAchievements ? (
          <LoadingAchievementGrid />
        ) : isExperience ? (
          <LoadingExperienceTimeline />
        ) : isChips ? (
          <LoadingChipRows />
        ) : (
          <LoadingPlainLines compact={props.index > 3} />
        )}
      </div>
    </section>
  );
}

function CVLoadingPreview(props: {
  cv: StructuredCv | null;
  source?: CandidatePreviewSource | null;
}) {
  const header = props.cv?.header ?? fallbackHeader(props.source);
  const sections = loadingDocumentSections(props.cv);
  const details = contactItems(header).slice(0, 4);

  return (
    <div className={styles.loadingPreviewStage}>
      <div className={styles.loadingStageBeam} />
      <div className={styles.loadingStageBaseGlow} />

      <article className={styles.loadingPreviewDocument}>
        <div className={styles.loadingPreviewPaperInner}>
          <header className={styles.loadingCvHeader}>
            <h2 className={styles.loadingCvName}>{header.name}</h2>

            {header.targetTitle ? (
              <p className={styles.loadingCvTitle}>{header.targetTitle}</p>
            ) : null}

            {details.length ? (
              <div className={styles.loadingCvContacts}>
                {details.map((item, index) => (
                  <span
                    className={styles.loadingCvContact}
                    key={`${item.kind}-${item.value}`}
                  >
                    {index > 0 ? (
                      <span className={styles.loadingCvContactDivider} />
                    ) : null}
                    {item.value}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div className={styles.loadingCvBody}>
            {sections.map((section, index) => (
              <LoadingCvSection
                index={index}
                key={`${section}-${index}`}
                label={section}
              />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function CVRevealDocument(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
}) {
  if (!props.cv) {
    return (
      <div className={styles.cvRevealStage}>
        <div className="grid h-full place-items-center text-[#66728b]">
          CV data is loading.
        </div>
      </div>
    );
  }

  const documentStyle = {
    background: "#ffffff",
    border: "0",
    borderRadius: "28px 28px 0 0",
    boxShadow:
      "0 30px 80px rgba(70, 88, 130, 0.13), 0 12px 32px rgba(84, 107, 158, 0.08)",
    outline: "none",
    overflow: "hidden",
  };

  return (
    <div className={styles.cvRevealStage}>
      <div className={styles.cvRevealSharpLayer}>
        <A4CvPreview
          className={styles.cvRevealPreview}
          cv={props.cv}
          documentStyle={documentStyle}
          fitToHeight={false}
          maxScale={1.18}
          presentationJson={props.presentationJson}
        />
      </div>

      <div className={styles.cvRevealBlurLayer} aria-hidden="true">
        <A4CvPreview
          className={styles.cvRevealPreview}
          cv={props.cv}
          documentStyle={documentStyle}
          fitToHeight={false}
          maxScale={1.18}
          presentationJson={props.presentationJson}
        />
      </div>

      <div className={styles.lockBadgeWrap}>
        <span className={styles.lockBadgeOuter}>
          <LockKeyhole className="h-7 w-7" strokeWidth={2.25} />
        </span>
      </div>
    </div>
  );
}

function CVPreviewCard(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
}) {
  return (
    <div className={styles.cvRevealWrap}>
      <CVRevealDocument
        cv={props.cv}
        presentationJson={props.presentationJson}
      />
    </div>
  );
}

function randomStageDuration() {
  return 2000 + Math.random() * 2000;
}

function useGenerationProgress(isReady: boolean, hasError: boolean) {
  const [activeStage, setActiveStage] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(16);
  const readyRef = useRef(isReady);
  const errorRef = useRef(hasError);

  useEffect(() => {
    readyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    errorRef.current = hasError;
  }, [hasError]);

  useEffect(() => {
    if (hasError) return;
    let frame = 0;

    const tick = () => {
      setProgress((current) => {
        const target = targetRef.current;
        if (current >= target) return current;
        return Math.min(
          target,
          current + Math.max(0.035, (target - current) * 0.018),
        );
      });
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [hasError]);

  useEffect(() => {
    if (hasError) return;
    let cancelled = false;
    const timers: number[] = [];

    const runStage = (stage: number) => {
      if (cancelled || readyRef.current || errorRef.current) return;
      setActiveStage(stage);
      targetRef.current =
        stage === 0 ? 18 : stage === 1 ? 42 : stage === 2 ? 64 : 94;

      if (stage >= 3) return;

      const timer = window.setTimeout(() => {
        if (cancelled || errorRef.current) return;
        setCompletedStages(stage + 1);
        targetRef.current = stageMilestones[stage as 0 | 1 | 2];
        window.setTimeout(() => runStage(stage + 1), 360);
      }, randomStageDuration());
      timers.push(timer);
    };

    runStage(0);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [hasError]);

  useEffect(() => {
    if (!isReady || hasError) return;
    setCompletedStages(4);
    setActiveStage(3);
    targetRef.current = 100;
    setProgress(100);
  }, [hasError, isReady]);

  return {
    activeStage,
    completedStages,
    progress: Math.min(100, Math.round(progress)),
  };
}

function LoadingStatusIcon(props: {
  state: "complete" | "active" | "pending";
}) {
  if (props.state === "complete") {
    return (
      <motion.span
        animate={{ opacity: 1, scale: 1 }}
        className={styles.loadingCheck}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
      </motion.span>
    );
  }

  if (props.state === "active")
    return <span className={styles.loadingSpinner} />;

  return <span className={styles.loadingPendingDot} />;
}

function LoadingTaskRow(props: {
  index: number;
  label: string;
  state: "complete" | "active" | "pending";
}) {
  const icons = [
    <SearchGlyph key="search" />,
    <PuzzleGlyph key="puzzle" />,
    <TargetGlyph key="target" />,
    <NorthStarGlyph key="star" />,
  ];

  return (
    <div className={styles.loadingTaskRow}>
      <span
        className={[
          styles.loadingTaskIcon,
          props.index === 3 ? styles.loadingTaskIconPink : "",
        ].join(" ")}
      >
        {icons[props.index]}
      </span>
      <span className={styles.loadingTaskText}>{props.label}</span>
      <LoadingStatusIcon state={props.state} />
    </div>
  );
}

export function CVGenerationLoadingScreen(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
  candidateSource?: CandidatePreviewSource | null;
  isReady: boolean;
  error?: string | null;
  onReveal: () => void;
  onRetry?: () => void;
}) {
  const hasError = Boolean(props.error);
  const { activeStage, completedStages, progress } = useGenerationProgress(
    props.isReady,
    hasError,
  );

  useEffect(() => {
    if (!props.isReady || hasError) return;

    const revealTimer = window.setTimeout(props.onReveal, 520);

    return () => window.clearTimeout(revealTimer);
  }, [hasError, props.isReady, props.onReveal]);

  return (
    <section className={styles.generationPage}>
      <div className={styles.generationBackground} />
      <GenerationHeader />

      <main className={styles.generationMain}>
        <div className={styles.sparkleOrb}>
          <SparkleGlyph className={styles.sparkleIcon} />
        </div>

        <h1 className={styles.generationHeadline}>Building your tailored CV</h1>

        <p className={styles.generationSubtitle}>
          Our AI is carefully crafting a CV that best showcases your strengths
          and aligns with the role.
        </p>

        <div className={styles.linearProgressGroup}>
          <div
            aria-label={`CV generation progress ${progress}%`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className={styles.linearProgressTrack}
            role="progressbar"
          >
            <motion.span
              animate={{ width: `${progress}%` }}
              className={styles.linearProgressFill}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
          <span className={styles.linearProgressPercent}>{progress}%</span>
        </div>

        <div className={styles.loadingTaskList}>
          {loadingTasks.map((task, index) => {
            const state =
              index < completedStages
                ? "complete"
                : index === activeStage && !hasError
                  ? "active"
                  : "pending";

            return (
              <LoadingTaskRow
                index={index}
                key={task}
                label={task}
                state={state}
              />
            );
          })}
        </div>

        {props.error ? (
          <div className={styles.generationError} role="alert">
            <p>{props.error}</p>
            {props.onRetry ? (
              <button onClick={props.onRetry} type="button">
                Try again
              </button>
            ) : null}
          </div>
        ) : null}

        <p className={styles.generationSecurityNote}>
          <span className={styles.generationSecurityIcon}>
            <LockKeyhole className="h-4 w-4" strokeWidth={2.3} />
          </span>
          Your information is secure and private
        </p>
      </main>
    </section>
  );
}

export function CVGenerationLoadingState(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
  candidateSource?: CandidatePreviewSource | null;
  isReady: boolean;
  error?: string | null;
  onReveal: () => void;
  onRetry?: () => void;
}) {
  return <CVGenerationLoadingScreen {...props} />;
}

export function GeneratedCVPreviewState(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
  onUnlock: () => void;
}) {
  return (
    <SecureChrome>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className={styles.generatedState}
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <StatusPill dot>Tailored CV ready</StatusPill>

        <h1 className={styles.generatedHeadline}>Your tailored CV is ready</h1>

        <p className={styles.generatedSubtitle}>
          Preview your CV below and unlock the full version to download and
          share.
        </p>

        <CVPreviewCard
          cv={props.cv}
          presentationJson={props.presentationJson}
        />

        <div className={styles.unlockArea}>
          <button
            className={`taylor-premium-button ${styles.unlockButton}`}
            onClick={props.onUnlock}
            type="button"
          >
            <span className={styles.unlockButtonLeft}>
              <LockOpen className="h-6 w-6" strokeWidth={2.15} />
              Unlock full CV
            </span>
            <ArrowRight className="h-7 w-7" strokeWidth={2.25} />
          </button>

          <p className={styles.unlockMicrocopy}>
            <LockKeyhole className="h-3.5 w-3.5" strokeWidth={2.2} />
            Quick unlock • Download instantly • Secure & private
          </p>
        </div>

        <div className={styles.trustRow}>
          <span className={styles.starGroup} aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingStar className={styles.pointStar} key={index} />
            ))}
          </span>

          <span className={styles.trustCopy}>Join 11,000+ NZ job seekers</span>

          <span className={styles.trustDivider} />

          <span className={styles.trustQuote}>
            “TaylorCV helped me get more interviews in just two weeks.” – Sarah,
            Product Manager
          </span>
        </div>
      </motion.div>
    </SecureChrome>
  );
}
