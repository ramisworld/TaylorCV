"use client";

import {
  BarChart3,
  Check,
  MessageCircleQuestion,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { TaylorLogoMark } from "~/components/TaylorBrand";
import { cn } from "~/lib/utils";

import styles from "./missing-proof-section.module.css";

const questions = [
  "What was the biggest\nproject you led?",
  "What actions did you take\nand who did you collaborate with?",
  "What tools or frameworks\ndid you use and what was the result?",
] as const;

const qualifyRows = [
  { icon: Search, label: "Analyzes role" },
  { icon: Sparkles, label: "Finds gaps" },
  { icon: ShieldCheck, label: "Strengthens proof" },
] as const;

const resultRows = [
  {
    icon: BarChart3,
    title: "Stronger leadership signals",
    subtitle: "Impact and scope clearly highlighted",
  },
  {
    icon: UsersRound,
    title: "Quantified results added",
    subtitle: "Measurable outcomes increase match",
  },
  {
    icon: Settings,
    title: "Keywords aligned",
    subtitle: "Better alignment with job requirements",
  },
] as const;

const STORY_DURATION_MS = 5600;
const FINAL_BEFORE_SCORE = 58;
const FINAL_AFTER_SCORE = 92;
const INITIAL_AFTER_SCORE = 58;

const afterRingStartStops = ["#7148f2", "#674df2", "#5a53f1", "#7b55f4"] as const;
const afterRingEndStops = ["#5d55f6", "#465df5", "#2866f8", "#126cff"] as const;
const afterRingStopPairs = afterRingStartStops.map((startColor, index) => [
  startColor,
  afterRingEndStops[index] ?? startColor,
] as const);

function GradientShield() {
  return (
    <svg aria-hidden="true" className={styles.shieldIcon} viewBox="0 0 28 28">
      <defs>
        <clipPath id="qualified-shield-clip">
          <path d="M14 3.2 23 6.85v6.95c0 5.7-3.75 10.25-9 11.75-5.25-1.5-9-6.05-9-11.75V6.85L14 3.2Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#qualified-shield-clip)">
        <rect fill="#1768ff" height="28" width="14" />
        <rect fill="#16bf78" height="28" width="14" x="14" />
      </g>
      <path
        d="M14 3.2 23 6.85v6.95c0 5.7-3.75 10.25-9 11.75-5.25-1.5-9-6.05-9-11.75V6.85L14 3.2Z"
        fill="none"
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="0.8"
      />
      <path
        d="m9.35 14.1 2.95 2.82 6.35-7"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.95"
      />
    </svg>
  );
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function blendHexColor(from: string, to: string, progress: number) {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  const channel = (fromValue: number, toValue: number) =>
    Math.round(fromValue + (toValue - fromValue) * progress);

  return `rgb(${channel(start.r, end.r)}, ${channel(start.g, end.g)}, ${channel(start.b, end.b)})`;
}

export function MissingProofSection() {
  const ringRadius = 93;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasStartedRef = useRef(false);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [beforeScore, setBeforeScore] = useState(FINAL_BEFORE_SCORE);
  const [afterScore, setAfterScore] = useState(FINAL_AFTER_SCORE);
  const [afterRingColorProgress, setAfterRingColorProgress] = useState(1);
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ringProgress = afterScore / 100;
  const ringOffset = ringCircumference * (1 - ringProgress);
  const afterRingStops = afterRingStopPairs.map(([startColor, endColor]) =>
    blendHexColor(startColor, endColor, afterRingColorProgress),
  );

  useEffect(() => {
    if (isReducedMotion) {
      setBeforeScore(FINAL_BEFORE_SCORE);
      setAfterScore(FINAL_AFTER_SCORE);
      setAfterRingColorProgress(1);
      setHasFinished(true);
      return;
    }

    setBeforeScore(0);
    setAfterScore(INITIAL_AFTER_SCORE);
    setAfterRingColorProgress(0);
  }, [isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasStartedRef.current || !entry?.isIntersecting) return;
        hasStartedRef.current = true;
        setIsActive(true);
      },
      { threshold: 0.38 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isReducedMotion]);

  useEffect(() => {
    if (!isActive || isReducedMotion) return;

    let beforeFrame = 0;
    let afterFrame = 0;
    const timers: number[] = [];

    const animateNumber = (
      from: number,
      to: number,
      duration: number,
      setter: (value: number) => void,
      onFrame?: (progress: number) => void,
    ) => {
      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = easeInOutCubic(progress);
        onFrame?.(eased);
        setter(Math.round(from + (to - from) * eased));
        if (progress < 1) {
          return requestAnimationFrame(tick);
        }
        onFrame?.(1);
        setter(to);
        return 0;
      };
      return requestAnimationFrame(tick);
    };

    beforeFrame = animateNumber(0, FINAL_BEFORE_SCORE, 1450, setBeforeScore);
    timers.push(
      window.setTimeout(() => {
        afterFrame = animateNumber(
          INITIAL_AFTER_SCORE,
          FINAL_AFTER_SCORE,
          1650,
          setAfterScore,
          setAfterRingColorProgress,
        );
      }, 3550),
      window.setTimeout(() => {
        setHasFinished(true);
      }, STORY_DURATION_MS),
    );

    return () => {
      cancelAnimationFrame(beforeFrame);
      cancelAnimationFrame(afterFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isActive, isReducedMotion]);

  return (
    <section
      className={cn(
        styles.section,
        isActive && styles.storyActive,
        hasFinished && styles.storyFinished,
      )}
      id="how-it-works"
      ref={sectionRef}
    >
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <div className={styles.inner}>
        <div className={styles.leftColumn}>
          <h2 className={styles.headline}>
            <span>From unclear to</span>
            <span className={styles.gradientText}>interview ready.</span>
          </h2>
          <p className={styles.subcopy}>
            TaylorCV finds what&apos;s missing,
            <br />
            strengthens your proof, and gets you noticed.
          </p>

          <article className={styles.beforeCard}>
            <p className={styles.labelDark}>Before</p>
            <div className={styles.scoreLine}>
              <span>{beforeScore}%</span>
              <strong>match</strong>
            </div>
            <div className={styles.weakPill}>
              <span />
              Weak proof
            </div>
          </article>

          <div className={styles.questionStack}>
            {questions.map((question, index) => (
              <article
                className={cn(
                  styles.questionCard,
                  styles[`questionCard${index + 1}`],
                  styles[`storyQuestion${index + 1}`],
                )}
                key={question}
              >
                <span className={styles.questionIcon}>
                  <MessageCircleQuestion aria-hidden="true" />
                </span>
                <p>{question}</p>
                <span className={styles.questionNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            ))}
          </div>
        </div>

        <article className={styles.qualifyCard}>
          <div className={styles.qualifyTitle}>
            <TaylorLogoMark className={styles.qualifyLogo} />
            <h3>TaylorCV qualifies</h3>
          </div>
          <div className={styles.qualifyRows}>
            {qualifyRows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  className={cn(styles.qualifyRow, styles[`storyQualify${qualifyRows.indexOf(row) + 1}`])}
                  key={row.label}
                >
                  <span className={styles.metalIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <p>{row.label}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className={styles.afterPanel}>
          <p className={styles.afterLabel}>After</p>

          <div className={styles.ringWrap}>
            <svg aria-hidden="true" className={styles.ring} viewBox="0 0 220 220">
              <defs>
                <linearGradient id="after-ring" x1="182" x2="38" y1="30" y2="184">
                  <stop offset="0%" stopColor={afterRingStops[0]} />
                  <stop offset="35%" stopColor={afterRingStops[1]} />
                  <stop offset="68%" stopColor={afterRingStops[2]} />
                  <stop offset="100%" stopColor={afterRingStops[3]} />
                </linearGradient>
              </defs>
              <circle
                cx="110"
                cy="110"
                fill="none"
                r={ringRadius}
                stroke="#e7eaff"
                strokeWidth="12"
              />
              <circle
                cx="110"
                cy="110"
                fill="none"
                r={ringRadius}
                stroke="url(#after-ring)"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                strokeWidth="12"
                transform="rotate(-90 110 110)"
              />
            </svg>
            <div className={styles.ringText}>
              <span>{afterScore}%</span>
              <p>match</p>
            </div>
          </div>

          <div className={styles.qualifiedPill}>
            <GradientShield />
            <span>Qualified for interview</span>
          </div>

          <div className={styles.resultStack}>
            {resultRows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  className={cn(
                    styles.resultCard,
                    styles[`storyResult${resultRows.indexOf(row) + 1}`],
                  )}
                  key={row.title}
                >
                  <span className={styles.resultIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{row.title}</h3>
                    <p>{row.subtitle}</p>
                  </div>
                  <span className={styles.checkIcon}>
                    <Check aria-hidden="true" />
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.miniCvCard}>
            <div className={styles.cvPreview}>
              <div className={styles.avatarRow}>
                <span className={styles.avatar} />
                <span className={styles.shortLine} />
              </div>
              <span className={styles.cvLineWide} />
              <span className={styles.cvLine} />
              <span className={styles.cvLineWide} />
              <span className={styles.cvLineShort} />
            </div>
            <div className={styles.cvCopy}>
              <h3>Senior Product Manager</h3>
              <p>2M+ users &bull; Activation up 28%</p>
              <span />
              <span />
              <span />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
