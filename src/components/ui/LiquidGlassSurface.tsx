"use client";

import { cn } from "~/lib/utils";

import styles from "./liquid-glass-surface.module.css";

type LiquidGlassSurfaceProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "pill" | "circle";
};

export function LiquidGlassSurface({
  children,
  className,
  contentClassName,
  variant = "pill",
}: LiquidGlassSurfaceProps) {
  return (
    <div
      className={cn(
        styles.surface,
        variant === "circle" ? styles.circle : styles.pill,
        className
      )}
    >
      <span aria-hidden="true" className={styles.shimmer} />
      <span aria-hidden="true" className={styles.caustic} />
      <div className={cn(styles.content, contentClassName)}>{children}</div>
    </div>
  );
}
