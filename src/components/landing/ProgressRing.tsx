"use client";

import { cn } from "~/lib/utils";

import styles from "./progress-ring.module.css";

interface ProgressRingProps {
  percent: 58 | 92;
  size?: number;
  strokeWidth?: number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export function ProgressRing({
  percent,
  size = 120,
  strokeWidth = 10,
  className,
  labelClassName,
  valueClassName,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const isStrong = percent === 92;

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
            id={`progress-gradient-${percent}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {isStrong ? (
              <>
                <stop offset="0%" stopColor="#1f4fff" />
                <stop offset="50%" stopColor="#6054ff" />
                <stop offset="100%" stopColor="#8a36e8" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#6974ff" />
                <stop offset="50%" stopColor="#5c64ff" />
                <stop offset="100%" stopColor="#865bff" />
              </>
            )}
          </linearGradient>
          <filter id={`ring-glow-${percent}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(120, 130, 170, 0.12)"
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#progress-gradient-${percent})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          filter={`url(#ring-glow-${percent})`}
          style={{
            transition: "stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>

      {/* Centered percentage text */}
      <div className={cn(styles.ringLabel, labelClassName)}>
        <span className={cn(styles.ringPercent, valueClassName)}>{percent}%</span>
      </div>
    </div>
  );
}
