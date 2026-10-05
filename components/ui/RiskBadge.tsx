/**
 * RiskBadge component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Displays the patient risk level.
 *
 * STRICT RULES (from RULES.md and DESIGN.md):
 *  1. ALWAYS shows icon + text label. Never colour alone.
 *  2. Risk colours (--risk-*) are ONLY used here and nowhere else.
 *  3. Font: Sora, uppercase, tracking-wide (font-data)
 *  4. Accessible: aria-label includes the band name in full
 *
 * Risk bands (from ARCHITECTURE.md):
 *   Green  = 0–39
 *   Yellow/Amber = 40–69 (displayed as "MODERATE" per DESIGN.md)
 *   Red    = 70–100
 */

import * as React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

export type RiskBand = "green" | "amber" | "yellow" | "red";

export interface RiskBadgeProps {
  band: RiskBand;
  /** Numeric score (0–100). Shown alongside badge if provided. */
  score?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const bandConfig: Record<
  "red" | "amber" | "green",
  {
    label: string;
    icon: React.ElementType;
    textColor: string;
    bgColor: string;
    ariaLabel: string;
  }
> = {
  red: {
    label: "HIGH RISK",
    icon: AlertCircle,
    textColor: "text-[var(--risk-red)]",
    bgColor: "bg-[var(--risk-red-bg)]",
    ariaLabel: "High risk — urgent attention needed",
  },
  amber: {
    label: "MODERATE",
    icon: AlertTriangle,
    textColor: "text-[var(--risk-amber)]",
    bgColor: "bg-[var(--risk-amber-bg)]",
    ariaLabel: "Moderate risk — monitor closely",
  },
  green: {
    label: "LOW RISK",
    icon: CheckCircle2,
    textColor: "text-[var(--risk-green)]",
    bgColor: "bg-[var(--risk-green-bg)]",
    ariaLabel: "Low risk — stable",
  },
};

const sizeConfig = {
  sm: {
    iconSize: 12,
    textClass: "text-[11px] tracking-[0.06em]",
    padding: "px-2 py-0.5 gap-1",
  },
  md: {
    iconSize: 14,
    textClass: "text-[12px] tracking-[0.04em]",
    padding: "px-3 py-1 gap-1.5",
  },
  lg: {
    iconSize: 16,
    textClass: "text-[13px] tracking-[0.04em]",
    padding: "px-4 py-1.5 gap-2",
  },
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  band,
  score,
  size = "md",
  className = "",
}) => {
  const normalizedBand = (band === "yellow" ? "amber" : band) || "green";
  const config = bandConfig[normalizedBand as "red" | "amber" | "green"] || bandConfig.green;
  const { iconSize, textClass, padding } = sizeConfig[size];
  const Icon = config.icon;

  return (
    <span
      role="status"
      aria-label={`${config.ariaLabel}${score !== undefined ? `, score ${score}` : ""}`}
      className={[
        "inline-flex items-center rounded-[var(--r-pill)]",
        "font-data font-semibold uppercase",
        config.bgColor,
        config.textColor,
        padding,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Icon is always present — colour alone is not sufficient for accessibility */}
      <Icon
        size={iconSize}
        aria-hidden="true"
        className="shrink-0"
        strokeWidth={2.5}
      />
      {/* Text label is always present — never rely on colour alone */}
      <span className={textClass}>{config.label}</span>
      {/* Optional score — uses Sora font */}
      {score !== undefined && (
        <span
          className={[textClass, "opacity-70 ml-0.5"].join(" ")}
          aria-hidden="true"
        >
          {score}
        </span>
      )}
    </span>
  );
};

RiskBadge.displayName = "RiskBadge";
