// src/components/landing/MissingProofScoreGlassCard.tsx

"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "~/lib/utils";
import styles from "./missing-proof-score-glass-card.module.css";

interface MissingProofScoreGlassCardProps {
  className?: string;
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 17"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 13.4L8.8 7.8L13.1 10L22.4 2.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3 2.6H22.8V7.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InlineRing({
  percent,
  size,
  strokeWidth,
  rotation,
  gradientId,
  gradientStops,
  strokeOpacity = 1,
  labelClassName,
}: {
  percent: number;
  size: number;
  strokeWidth: number;
  rotation: number;
  gradientId: string;
  gradientStops: ReactNode;
  strokeOpacity?: number;
  labelClassName?: string;
}) {
  const radius = (size - strokeWidth - 3) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className={styles.ringWrap}
      style={{ "--ring-size": `${size}px` } as CSSProperties}
    >
      <svg
        className={styles.ringSvg}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id={gradientId} x1="8%" y1="2%" x2="92%" y2="98%">
            {gradientStops}
          </linearGradient>

          <linearGradient
            id={`${gradientId}-tube`}
            x1="12%"
            y1="0%"
            x2="88%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
            <stop offset="34%" stopColor="rgba(234,240,255,0.48)" />
            <stop offset="68%" stopColor="rgba(255,255,255,0.62)" />
            <stop offset="100%" stopColor="rgba(204,215,255,0.36)" />
          </linearGradient>

          <filter
            id={`${gradientId}-tube-shadow`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="7"
              floodColor="rgba(76,76,160,0.12)"
            />
          </filter>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId}-tube)`}
          strokeWidth={strokeWidth + 5}
          opacity="0.74"
          filter={`url(#${gradientId}-tube-shadow)`}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.56)"
          strokeWidth={strokeWidth + 1}
          opacity="0.7"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          opacity={strokeOpacity}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.38)"
          strokeWidth="1.4"
          opacity="0.72"
        />
      </svg>

      <div className={cn(styles.ringLabel, labelClassName)}>
        <span className={styles.ringValue}>{percent}%</span>
      </div>
    </div>
  );
}

function GlassArrowOrb() {
  return (
    <div className={styles.glassOrb} aria-hidden="true">
      <span className={styles.orbGlow} />
      <span className={styles.orbHighlight} />
      <span className={styles.orbCaustic} />
      <span className={styles.orbRimFlash} />

      <svg viewBox="0 0 94 94" fill="none" className={styles.orbSvg}>
        <defs>
          <radialGradient id="match-orb-body" cx="30%" cy="21%" r="80%">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.56)" />
            <stop offset="52%" stopColor="rgba(225,232,255,0.18)" />
            <stop offset="100%" stopColor="rgba(107,94,255,0.22)" />
          </radialGradient>

          <linearGradient id="match-orb-rim" x1="8%" y1="6%" x2="90%" y2="92%">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="38%" stopColor="rgba(255,255,255,0.48)" />
            <stop offset="68%" stopColor="rgba(185,196,255,0.24)" />
            <stop offset="100%" stopColor="rgba(108,93,255,0.24)" />
          </linearGradient>

          <radialGradient id="match-orb-glint" cx="34%" cy="26%" r="34%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
            <stop offset="58%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <circle cx="47" cy="47" r="40.8" fill="url(#match-orb-body)" />
        <circle cx="36" cy="31" r="17" fill="url(#match-orb-glint)" />
        <circle
          cx="47"
          cy="47"
          r="40.8"
          stroke="url(#match-orb-rim)"
          strokeWidth="1.7"
        />

        <path
          d="M34.5 47H58.5M49.5 38L58.8 47L49.5 56"
          stroke="#5c4dff"
          strokeWidth="4.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function MissingProofScoreGlassCard({
  className,
}: MissingProofScoreGlassCardProps) {
  return (
    <div className={cn(styles.scoreRoot, className)}>
      <div className={styles.scoreGlass}>
        <span className={styles.scoreRim} aria-hidden="true" />
        <span className={styles.scoreInnerRim} aria-hidden="true" />
        <span className={styles.scoreTopHighlight} aria-hidden="true" />
        <span className={styles.scoreBottomHighlight} aria-hidden="true" />
        <span className={styles.scoreCausticOne} aria-hidden="true" />
        <span className={styles.scoreCausticTwo} aria-hidden="true" />
        <span className={styles.scorePrism} aria-hidden="true" />
        <span className={styles.scoreDots} aria-hidden="true" />

        <div className={styles.scoreContent}>
          <div className={styles.metaBefore}>
            <span className={styles.badge}>Before</span>
            <span className={styles.metaLabel}>Initial match</span>
          </div>

          <div className={styles.ringBefore}>
            <InlineRing
              percent={58}
              size={150}
              strokeWidth={11.5}
              rotation={-96}
              gradientId="missing-proof-ring-58"
              strokeOpacity={0.76}
              labelClassName={styles.ringLabelWeak}
              gradientStops={
                <>
                  <stop offset="0%" stopColor="#d9d0ff" />
                  <stop offset="34%" stopColor="#ad94ff" />
                  <stop offset="66%" stopColor="#8287ff" />
                  <stop offset="100%" stopColor="#75a3ff" />
                </>
              }
            />
          </div>

          <GlassArrowOrb />

          <div className={styles.ringAfter}>
            <InlineRing
              percent={92}
              size={150}
              strokeWidth={11.5}
              rotation={-96}
              gradientId="missing-proof-ring-92"
              labelClassName={styles.ringLabelStrong}
              gradientStops={
                <>
                  <stop offset="0%" stopColor="#c193ff" />
                  <stop offset="29%" stopColor="#8658ff" />
                  <stop offset="61%" stopColor="#4d62ff" />
                  <stop offset="100%" stopColor="#2e6dff" />
                </>
              }
            />
          </div>

          <div className={styles.metaAfter}>
            <span className={styles.badge}>After</span>
            <h3 className={styles.metaHeadline}>Stronger match</h3>
            <span className={styles.improvementChip}>
              <TrendIcon className={styles.trendIcon} />
              <span>+34 point improvement</span>
            </span>
            <span className={styles.metaSupport}>
              Clearer evidence. Better alignment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
