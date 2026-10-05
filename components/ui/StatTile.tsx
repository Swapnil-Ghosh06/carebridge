/**
 * StatTile component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Displays a health metric tile: big Sora number, DM Sans label,
 * optional unit, optional trend arrow.
 *
 * Used on: Patient home (steps, medicines, BP), Admin ROI panel.
 *
 * Rules:
 *  - Stat number: Sora 700 (font-data)
 *  - Label: DM Sans 500 (font-body)
 *  - Trend arrow: only up/down/neutral — no risk colours
 *  - Trend colouring: brand-teal for positive, ink-500 for neutral,
 *    ink-700 for negative (risk colours reserved for RiskBadge only)
 *  - No hardcoded patient data — props only
 */

import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type TrendDirection = "up" | "down" | "neutral";

export interface StatTileProps {
  /** Primary statistic value */
  value: string | number;
  /** Descriptive label shown below the value */
  label: string;
  /** Unit shown after value (e.g. "steps", "mmHg", "/10") */
  unit?: string;
  /** Optional trend direction */
  trend?: TrendDirection;
  /** Short description of the trend (e.g. "+12% vs last week") */
  trendLabel?: string;
  /**
   * Whether the "up" trend is positive (e.g. steps = good when up)
   * or negative (e.g. BP = bad when up). Affects icon colour.
   * Defaults to true (up is positive).
   */
  upIsGood?: boolean;
  /** Icon to show in the top-left corner */
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const trendIcon: Record<TrendDirection, React.ElementType> = {
  up:      TrendingUp,
  down:    TrendingDown,
  neutral: Minus,
};

const valueSize = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
};

const labelSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const StatTile: React.FC<StatTileProps> = ({
  value,
  label,
  unit,
  trend,
  trendLabel,
  upIsGood = true,
  icon,
  size = "md",
  className = "",
}) => {
  const TrendIcon = trend ? trendIcon[trend] : null;

  // Trend colour logic — uses brand/ink tokens, never risk tokens
  const trendColor =
    trend === "neutral"
      ? "text-[var(--ink-500)]"
      : trend === "up"
        ? upIsGood
          ? "text-[var(--brand-teal)]"
          : "text-[var(--ink-700)]"
        : upIsGood
          ? "text-[var(--ink-700)]"
          : "text-[var(--brand-teal)]";

  return (
    <div
      className={[
        "bg-[var(--surface-0)] rounded-[var(--r-lg)] shadow-[var(--shadow-card)]",
        "p-5 flex flex-col gap-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Optional icon */}
      {icon && (
        <span className="text-[var(--ink-500)] mb-1" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Value row */}
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className={["font-data font-bold text-[var(--ink-900)]", valueSize[size]].join(" ")}
          aria-label={`${label}: ${value}${unit ? " " + unit : ""}`}
        >
          {value}
        </span>
        {unit && (
          <span className="font-body text-[var(--ink-500)] text-sm">{unit}</span>
        )}
      </div>

      {/* Label */}
      <span className={["font-body font-medium text-[var(--ink-500)]", labelSize[size]].join(" ")}>
        {label}
      </span>

      {/* Trend */}
      {trend && TrendIcon && (
        <div className={["flex items-center gap-1 mt-1", trendColor].join(" ")}>
          <TrendIcon size={14} aria-hidden="true" />
          {trendLabel && (
            <span className="font-body text-xs">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

StatTile.displayName = "StatTile";
