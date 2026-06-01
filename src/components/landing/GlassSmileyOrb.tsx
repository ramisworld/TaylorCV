"use client";

import { cn } from "~/lib/utils";

import styles from "./glass-smiley-orb.module.css";

interface GlassSmileyOrbProps {
  className?: string;
}

export function GlassSmileyOrb({ className }: GlassSmileyOrbProps) {
  return (
    <div className={cn(styles.orbRoot, className)}>
      <span className={styles.orbHalo} aria-hidden="true" />
      <span className={styles.orbRingOuter} aria-hidden="true" />
      <span className={styles.orbRingInner} aria-hidden="true" />

      <div className={styles.orbCore}>
        <span className={styles.orbCoreHighlight} aria-hidden="true" />
        <span className={styles.orbCoreCaustic} aria-hidden="true" />

        <svg
          aria-hidden="true"
          className={styles.orbFace}
          viewBox="0 0 72 72"
          fill="none"
        >
          <circle cx="20.5" cy="27" r="5.5" fill="currentColor" />
          <circle cx="51.5" cy="27" r="5.5" fill="currentColor" />
          <path
            d="M18 41.5C22.8 49.7 29.2 53.9 36 53.9C42.8 53.9 49.2 49.7 54 41.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="5.25"
          />
        </svg>
      </div>
    </div>
  );
}
