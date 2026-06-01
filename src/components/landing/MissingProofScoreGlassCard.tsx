"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "~/lib/utils";
import styles from "./missing-proof-score-glass-card.module.css";

interface MissingProofScoreGlassCardProps {
  className?: string;
}

function useCountUp(target: number, shouldStart: boolean, durationMs = 1300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;

      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [durationMs, shouldStart, target]);

  return value;
}

function MatchStat(props: {
  label: string;
  percent: number;
  support: string;
}) {
  return (
    <div className={styles.stat}>
      <p className={styles.statLabel}>{props.label}</p>
      <div className={styles.statLine}>
        <span className={styles.percent}>{props.percent}%</span>
        <span className={styles.match}>match</span>
      </div>
      <p className={styles.statSupport}>{props.support}</p>
    </div>
  );
}

export function MissingProofScoreGlassCard({
  className,
}: MissingProofScoreGlassCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const node = rootRef.current;

    if (!node || hasEnteredView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasEnteredView(true);
        observer.disconnect();
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasEnteredView]);

  const beforePercent = useCountUp(58, hasEnteredView);
  const afterPercent = useCountUp(92, hasEnteredView);

  return (
    <div className={cn(styles.scoreRoot, className)} ref={rootRef}>
      <div className={styles.scorePanel}>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.arrowButton} aria-hidden="true">
          <ArrowRight className={styles.arrowIcon} strokeWidth={2.2} />
        </div>

        <MatchStat
          label="Before answers"
          percent={beforePercent}
          support="Initial match"
        />
        <MatchStat
          label="After answers"
          percent={afterPercent}
          support="Stronger. Clearer. More impact."
        />
      </div>
    </div>
  );
}
