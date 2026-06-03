"use client";

import {
  ArrowRight,
  Check,
  ChevronLeft,
  Clock,
  LockKeyhole,
  LockOpen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { A4CvPreview } from "~/components/cv-flow/A4CvPreview";
import { TaylorBrand } from "~/components/TaylorBrand";
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
  const basics = isRecord(profile.deterministicBasics)
    ? profile.deterministicBasics
    : {};
  const brief = isRecord(profile.candidateBrief) ? profile.candidateBrief : {};
  const contact = isRecord(source?.contactInfoJson)
    ? source.contactInfoJson
    : {};
  const links = isRecord(source?.linksJson) ? source.linksJson : {};
  const otherUrls = Array.isArray(links.other)
    ? links.other
    : Array.isArray(basics.otherUrls)
      ? basics.otherUrls
      : [];

  return {
    name: text(contact.fullName) ?? text(basics.possibleName) ?? "Your CV",
    targetTitle:
      text(source?.jobTitle) ??
      text(contact.professionalTitle) ??
      text(brief.possibleHeadline) ??
      "Tailored CV",
    email: text(contact.email) ?? text(basics.email),
    phone: text(contact.phone) ?? text(basics.phone),
    location: text(contact.location),
    links: [
      (text(links.linkedin) ?? text(basics.linkedin))
        ? {
            label: "LinkedIn",
            url: (text(links.linkedin) ?? text(basics.linkedin)) as string,
            linkType: "personal_contact",
          }
        : null,
      (text(links.github) ?? text(basics.github))
        ? {
            label: "GitHub",
            url: (text(links.github) ?? text(basics.github)) as string,
            linkType: "personal_contact",
          }
        : null,
      (text(links.portfolio) ?? text(basics.portfolio))
        ? {
            label: "Portfolio",
            url: (text(links.portfolio) ?? text(basics.portfolio)) as string,
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

function previewSections(cv: StructuredCv | null) {
  if (!cv) return ["Professional Summary", "Experience", "Skills"];

  return normalizeCvSections(cv)
    .map((section) => section.label)
    .filter(Boolean)
    .slice(0, 3);
}

function SecureChrome(props: { children: React.ReactNode }) {
  return (
    <section className={styles.secureChrome}>
      <div className={styles.secureBackground} />
      <div className={styles.secureBottomWash} />

      <div className={styles.secureTopbar}>
        <TaylorBrand
          className="gap-3"
          markClassName="h-9 w-9 sm:h-10 sm:w-10"
          textClassName="text-[18px] font-[650] tracking-[-0.045em] text-[#0b1637] sm:text-[20px]"
        />

        <div className={styles.secureLabel}>
          <ShieldCheck className="h-4 w-4 text-[#5a78b1]" />
          Your data is secure
        </div>
      </div>

      {props.children}
    </section>
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

function SkeletonSectionLines(props: { index: number }) {
  const widths = [
    ["92%", "86%", "54%"],
    ["74%", "91%", "72%", "88%"],
    ["68%", "82%", "58%"],
  ][props.index] ?? ["86%", "72%", "64%"];

  return (
    <div className="mt-3 space-y-2.5">
      {widths.map((width, index) => (
        <span
          className={styles.skeletonLine}
          key={`${width}-${index}`}
          style={{ width }}
        />
      ))}
    </div>
  );
}

function CVLoadingPreview(props: {
  cv: StructuredCv | null;
  source?: CandidatePreviewSource | null;
}) {
  const header = props.cv?.header ?? fallbackHeader(props.source);
  const sections = previewSections(props.cv);
  const details = contactItems(header).slice(0, 5);

  return (
    <div className={styles.loadingPreview}>
      <div>
        <h2 className={styles.loadingPreviewName}>{header.name}</h2>

        {header.targetTitle ? (
          <p className={styles.loadingPreviewTitle}>{header.targetTitle}</p>
        ) : null}

        {details.length ? (
          <div className={styles.loadingPreviewDetails}>
            {details.map((item) => (
              <span
                className={styles.loadingPreviewDetail}
                key={`${item.kind}-${item.value}`}
              >
                <span className={styles.loadingPreviewDetailDot} />
                <span className="truncate">{item.value}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.loadingSections}>
        {sections.map((section, index) => (
          <section
            className={index > 0 ? "py-5" : "pb-5"}
            key={`${section}-${index}`}
          >
            <div className="flex items-start gap-5">
              <span className={styles.loadingSectionIcon}>
                <Sparkles className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className={styles.loadingSectionTitle}>{section}</h3>
                <SkeletonSectionLines index={index} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className={styles.loadingPreviewFade} />
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
    borderTopLeftRadius: "26px",
    borderTopRightRadius: "26px",
    boxShadow:
      "0 34px 86px rgba(70, 88, 130, 0.13), 0 12px 34px rgba(84, 107, 158, 0.08)",
    outline: "none",
  };

  return (
    <div className={styles.cvRevealStage}>
      <div className={styles.cvRevealSharpLayer}>
        <A4CvPreview
          className={styles.cvRevealPreview}
          cv={props.cv}
          documentStyle={documentStyle}
          fitToHeight={false}
          maxScale={1.24}
          presentationJson={props.presentationJson}
        />
      </div>

      <div className={styles.cvRevealBlurLayer} aria-hidden="true">
        <A4CvPreview
          className={styles.cvRevealPreview}
          cv={props.cv}
          documentStyle={documentStyle}
          fitToHeight={false}
          maxScale={1.24}
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

export function CVGenerationLoadingState(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
  candidateSource?: CandidatePreviewSource | null;
  isReady: boolean;
  onReveal: () => void;
}) {
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    if (!props.isReady) return;

    const revealTimer = window.setTimeout(props.onReveal, 2200);

    return () => window.clearTimeout(revealTimer);
  }, [props.isReady, props.onReveal]);

  return (
    <SecureChrome>
      <div className={styles.loadingState}>
        <div className="relative mx-auto w-max">
          <CircularProgressToTick
            onSuccessShown={() => setConfettiActive(true)}
            ready={props.isReady}
          />
          <CompletionConfetti active={confettiActive} />
        </div>

        <div className="mt-3">
          <StatusPill dot>
            {props.isReady ? "100% Complete" : "Creating CV"}
          </StatusPill>
        </div>

        <h1 className={styles.loadingHeadline}>Creating your tailored CV</h1>

        <p className={styles.loadingSubtitle}>
          We&apos;re analyzing your experience and tailoring it to the role.
        </p>

        <GenerationStepRow ready={props.isReady} />

        <CVLoadingPreview cv={props.cv} source={props.candidateSource} />

        <p className={styles.loadingTime}>
          <Clock className="h-4 w-4" />
          Usually takes under 30 seconds
        </p>
      </div>
    </SecureChrome>
  );
}

export function GeneratedCVPreviewState(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
  onBack: () => void;
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
        <div className={styles.successIconShell}>
          <div className={styles.progressParticles} aria-hidden="true">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className={styles.successRingOne} />
          <div className={styles.successRingTwo} />
          <div className={styles.successRingThree} />

          <span className={styles.successTick}>
            <Check className="h-10 w-10" strokeWidth={3.2} />
          </span>
        </div>

        <div className="-mt-1">
          <StatusPill dot>100% Complete</StatusPill>
        </div>

        <h1 className={styles.generatedHeadline}>Your tailored CV is ready!</h1>

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
            className={styles.unlockButton}
            onClick={props.onUnlock}
            type="button"
          >
            <span className={styles.unlockButtonLeft}>
              <LockOpen className="h-6 w-6" strokeWidth={2.15} />
              Unlock full CV
            </span>
            <ArrowRight className="h-7 w-7" strokeWidth={2.25} />
          </button>

          <button
            className={styles.backButton}
            onClick={props.onBack}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to edit answers
          </button>
        </div>

        <div className={styles.trustRow}>
          <span className={styles.starGroup} aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <span className={styles.pointStar} key={index}>
                ★
              </span>
            ))}
          </span>

          <span className={styles.trustCopy}>Join 11,000+ NZ job seekers</span>

          <span className={styles.trustDivider} />

          <span className={styles.trustQuote}>
            “TaylorCV helped me get more interviews in just two weeks.”
          </span>
        </div>
      </motion.div>
    </SecureChrome>
  );
}
