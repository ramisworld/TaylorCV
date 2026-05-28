"use client";

import { cn } from "~/lib/utils";

import styles from "./glass-smiley-orb.module.css";

interface GlassSmileyOrbProps {
  className?: string;
}

export function GlassSmileyOrb({ className }: GlassSmileyOrbProps) {
  return (
    <div className={cn(styles.orbRoot, className)}>
      {/* Outer translucent ring */}
      <div className={styles.orbOuterRing} />

      {/* Middle glass ring */}
      <div className={styles.orbMiddleRing}>
        <span className={styles.orbCoreHighlight} aria-hidden="true" />
      </div>

      {/* Inner core with face */}
      <div className={styles.orbCore}>
        <span className={styles.orbCoreHighlight} aria-hidden="true" />

        <svg
          aria-hidden="true"
          className={styles.orbFace}
          viewBox="0 0 54 54"
          fill="none"
        >
          <circle cx="19" cy="21" r="3.5" fill="currentColor" />
          <circle cx="35" cy="21" r="3.5" fill="currentColor" />
          <path
            d="M16.6 32.5c4.8 5.5 16 5.5 20.8 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3.4"
          />
        </svg>
      </div>
    </div>
  );
}
