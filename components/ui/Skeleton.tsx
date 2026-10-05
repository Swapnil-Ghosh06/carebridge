/**
 * Skeleton component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Reusable animated shimmer loader for loading states.
 *
 * Rules:
 *  - Uses surface tokens (--surface-100 / --surface-50)
 *  - Supports text, rectangular card, and circular avatar variants
 */

import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded-[var(--r-sm)]",
    rectangular: "rounded-[var(--r-md)]",
    circular: "rounded-full",
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-[var(--surface-100)] ${variantClasses} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}
