// src/components/landing/MissingProofScoreGlassCard.tsx

"use client";

import { cn } from "~/lib/utils";
import styles from "./missing-proof-score-glass-card.module.css";

interface MissingProofScoreGlassCardProps {
  className?: string;
}

function TrendIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 10.5C3 10.5 4 7.5 6.5 7.5C9 7.5 10 4.5 12.5 4.5C15 4.5 16 2 18.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 1.5H18.5V4.5"
        stroke="currentColor"
        strokeWidth="1.5"
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
  strokeOpacity,
  className,
  labelClassName,
}: {
  percent: number;
  size: number;
  strokeWidth: number;
  rotation: number;
  gradientId: string;
  gradientStops: React.ReactNode;
  strokeOpacity?: number;
  className?: string;
  labelClassName?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div
      className={cn(styles.ringWrap, className)}
      style={{ width: size, height: size }}
    >
      <svg
        className={styles.ringSvg}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {gradientStops}
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(210, 218, 240, 0.28)"
          strokeWidth={strokeWidth}
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
          opacity={strokeOpacity ?? 1}
        />
      </svg>
      <div className={cn(styles.ringLabel, labelClassName)}>
        <span className={styles.ringValue}>{percent}%</span>
      </div>
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
          {/* LEFT META */}
          <div className={styles.metaBefore}>
            <span className={styles.badge}>Before</span>
            <span className={styles.metaLabel}>Initial match</span>
          </div>

          {/* 58 RING */}
          <div className={styles.ringBefore}>
            <InlineRing
              percent={58}
              size={140}
              strokeWidth={10}
              rotation={150}
              gradientId="grad-58"
              gradientStops={
                <>
                  <stop offset="0%" stopColor="#7a9aff" />
                  <stop offset="55%" stopColor="#a0aaff" />
                  <stop offset="100%" stopColor="#c4b8ff" />
                </>
              }
              strokeOpacity={0.82}
              labelClassName={styles.ringLabelWeak}
            />
          </div>

          {/* GLASS ARROW ORB */}
          <div className={styles.glassOrb}>
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className={styles.orbSvg}
              aria-hidden="true"
            >
              <defs>
                <radialGradient
                  id="orb-grad"
                  cx="35%"
                  cy="30%"
                  r="65%"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
                  <stop offset="22%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="68%" stopColor="rgba(210,220,255,0.10)" />
                  <stop offset="100%" stopColor="rgba(130,120,255,0.22)" />
                </radialGradient>
                <radialGradient
                  id="orb-highlight"
                  cx="32%"
                  cy="26%"
                  r="38%"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="55%" stopColor="rgba(255,255,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <filter id="orb-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(58,70,135,0.12)" />
                </filter>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="url(#orb-grad)"
                filter="url(#orb-shadow)"
              />
              <circle cx="34" cy="30" r="16" fill="url(#orb-highlight)" />
              <path
                d="M38 50h24M52 40l10 10-10 10"
                stroke="#5c4dff"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* 92 RING */}
          <div className={styles.ringAfter}>
            <InlineRing
              percent={92}
              size={140}
              strokeWidth={10}
              rotation={50}
              gradientId="grad-92"
              gradientStops={
                <>
                  <stop offset="0%" stopColor="#b08aff" />
                  <stop offset="35%" stopColor="#6b5cff" />
                  <stop offset="70%" stopColor="#3b6aff" />
                  <stop offset="100%" stopColor="#5c4dff" />
                </>
              }
              labelClassName={styles.ringLabelStrong}
            />
          </div>

          {/* RIGHT META */}
          <div className={styles.metaAfter}>
            <span className={styles.badge}>After</span>
            <h3 className={styles.metaHeadline}>Stronger match</h3>
            <span className={styles.improvementChip}>
              <TrendIcon className={styles.trendIcon} />
              +34 point improvement
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
