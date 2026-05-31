"use client";

import { cn } from "~/lib/utils";

import styles from "./glass-smiley-orb.module.css";

interface GlassSmileyOrbProps {
  className?: string;
}

export function GlassSmileyOrb({ className }: GlassSmileyOrbProps) {
  return (
    <div className={cn(styles.orbRoot, className)}>
      <span className={styles.orbHalo} />
      <span className={styles.orbRingLarge} />
      <span className={styles.orbRingMedium} />

      <div className={styles.orbCore}>
        <span className={styles.orbCoreHighlight} aria-hidden="true" />
        <span className={styles.orbCoreCaustic} aria-hidden="true" />

        <svg
          aria-hidden="true"
          className={styles.orbFace}
          viewBox="0 0 72 72"
          fill="none"
        >
          <circle cx="23.5" cy="27" r="5.1" fill="currentColor" />
          <circle cx="48.5" cy="27" r="5.1" fill="currentColor" />
          <path
            d="M21.5 43.5c6.1 8.2 22.9 8.2 29 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="4.7"
          />
        </svg>
      </div>
    </div>
  );
}
