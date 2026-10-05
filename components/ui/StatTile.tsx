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
  subValue?: string;
  /** Optional trend direction */
  trend?: TrendDirection;
  /** Short description of the trend (e.g. "+12% vs last week") */
  trendLabel?: string;
  trendText?: string;
  target?: string;
  variant?: string;
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
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const valueSize = {
  sm: "text-base sm:text-xl",
  md: "text-xl sm:text-3xl",
  lg: "text-2xl sm:text-4xl",
};

const labelSize = {
  sm: "text-[11px] sm:text-xs",
  md: "text-xs sm:text-sm",
  lg: "text-sm sm:text-base",
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
  upIsGood = true,
  icon,
  size = "md",
  className = "",
}) => {
  const TrendIcon = trend ? trendIcon[trend] : null;
  const activeTrendLabel = trendText || trendLabel;
  const displayUnit = unit || subValue;

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
        "bg-[var(--surface-0)] rounded-[18px] border-2 border-[var(--ink-900)] shadow-[2px_2px_0px_var(--ink-900)] sm:shadow-[3px_3px_0px_var(--ink-900)]",
        "p-3 sm:p-4.5 flex flex-col justify-between gap-1 transition-all",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        {/* Optional icon */}
        {icon && (
          <div className="mb-1.5 flex items-center justify-between" aria-hidden="true">
            <span className="p-1 rounded-lg bg-[var(--surface-100)] inline-flex items-center justify-center text-[var(--ink-900)]">
              {icon}
            </span>
          </div>
        )}

        {/* Value row */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span
            className={["font-data font-bold text-[var(--ink-900)] tracking-tight leading-none", valueSize[size]].join(" ")}
            aria-label={`${label}: ${value}${displayUnit ? " " + displayUnit : ""}`}
          >
            {value}
          </span>
          {displayUnit && (
            <span className="font-body text-[var(--ink-500)] text-[11px] sm:text-xs font-medium">{displayUnit}</span>
          )}
        </div>

        {/* Label */}
        <span className={["font-body font-bold text-[var(--ink-800)] line-clamp-1 mt-1 block leading-tight", labelSize[size]].join(" ")}>
          {label}
        </span>
      </div>

      <div>
        {/* Target/Goal secondary note */}
        {target && (
          <span className="font-body text-[10px] sm:text-[11px] text-[var(--ink-500)] font-medium block mt-0.5 line-clamp-1">
            {target}
          </span>
        )}

        {/* Trend */}
        {trend && TrendIcon && (
          <div className={["flex items-center gap-1 mt-1 font-medium", trendColor].join(" ")}>
            <TrendIcon size={12} className="shrink-0" aria-hidden="true" />
            {activeTrendLabel && (
              <span className="font-body text-[10px] sm:text-[11px] line-clamp-1">{activeTrendLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

StatTile.displayName = "StatTile";
