"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "~/lib/utils";
import styles from "./missing-proof-score-glass-card.module.css";

interface MissingProofScoreGlassCardProps {
  className?: string;
}

function MatchStat(props: {
  label: string;
  percent: string;
  support: string;
}) {
  return (
    <div className={styles.stat}>
      <p className={styles.statLabel}>{props.label}</p>
      <div className={styles.statLine}>
        <span className={styles.percent}>{props.percent}</span>
        <span className={styles.match}>match</span>
      </div>
      <p className={styles.statSupport}>{props.support}</p>
    </div>
  );
}

export function MissingProofScoreGlassCard({
  className,
}: MissingProofScoreGlassCardProps) {
  return (
    <div className={cn(styles.scoreRoot, className)}>
      <div className={styles.scorePanel}>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.arrowButton} aria-hidden="true">
          <ArrowRight className={styles.arrowIcon} strokeWidth={2.2} />
        </div>

        <MatchStat label="Before answers" percent="58%" support="Initial match" />
        <MatchStat
          label="After answers"
          percent="92%"
          support="Stronger. Clearer. More impact."
        />
      </div>
    </div>
  );
}
