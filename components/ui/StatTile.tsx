/**
 * StatTile component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Displays a health metric tile: big Sora number, DM Sans label,
 * optional unit, optional trend arrow.
 *
 * Used on: Patient home (steps, medicines, BP), Admin ROI panel.
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
  subValue?: string;
  /** Optional trend direction */
  trend?: TrendDirection;
  /** Short description of the trend */
  trendLabel?: string;
  trendText?: string;
  target?: string;
  variant?: string;
  accentColor?: string;
  /**
   * Whether the "up" trend is positive
   */
  upIsGood?: boolean;
  /** Icon to show in the top-left corner */
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const trendIcon: Record<TrendDirection, React.ElementType> = {
  up: TrendingUp,
  down: TrendingDown,
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
  subValue,
  trend,
  trendLabel,
  trendText,
  target,
  variant,
  accentColor,
  upIsGood = true,
  icon,
  size = "md",
  className = "",
}) => {
  const TrendIcon = trend ? trendIcon[trend] : null;
  const effectiveTrendText = trendLabel || trendText;

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
        "p-5 flex flex-col justify-between gap-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className={["font-body font-medium text-[var(--ink-500)]", labelSize[size]].join(" ")}>
          {label}
        </span>
        {icon && (
          <span className="text-[var(--ink-500)]" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      {/* Value row */}
      <div className="flex items-baseline gap-1.5 flex-wrap my-1">
        <span
          className={["font-data font-bold text-[var(--ink-900)]", valueSize[size]].join(" ")}
          aria-label={`${label}: ${value}${unit ? " " + unit : ""}`}
        >
          {value}
        </span>
        {unit && (
          <span className="font-body text-[var(--ink-500)] text-sm">{unit}</span>
        )}
        {subValue && (
          <span className="font-body text-[var(--ink-500)] text-xs ml-1">{subValue}</span>
        )}
      </div>

      {/* Footer: Target and/or Trend */}
      <div className="flex items-center justify-between text-xs mt-1">
        {target && (
          <span className="font-body text-[var(--ink-500)]">{target}</span>
        )}

        {trend && TrendIcon && (
          <div className={["flex items-center gap-1", trendColor].join(" ")}>
            <TrendIcon size={14} aria-hidden="true" />
            {effectiveTrendText && (
              <span className="font-body text-xs">{effectiveTrendText}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

StatTile.displayName = "StatTile";
