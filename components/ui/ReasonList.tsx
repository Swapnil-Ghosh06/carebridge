/**
 * ReasonList component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * "Why flagged" panel — shows risk rule reasons.
 * Used inside the doctor patient detail page.
 *
 * Rules:
 *  - Rule text: DM Sans (font-body)
 *  - Weight chip: Sora (font-data)
 *  - Icon: lucide-react, matches rule category
 *  - Empty state must be shown when reasons = []
 *  - No data fetching inside
 */

import * as React from "react";
import {
  Pill,
  HeartPulse,
  Footprints,
  Droplet,
  Hospital,
  WifiOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export interface RiskReason {
  ruleId?: string;
  text: string;
  weight: number;
}

export interface ReasonListProps {
  reasons: RiskReason[];
  className?: string;
}

// Map rule IDs from ARCHITECTURE.md §4 to icons
const ruleIcon: Record<string, React.ElementType> = {
  MED_ADHERENCE_LOW:  Pill,
  MED_MISSED_STREAK:  Pill,
  BP_TREND_UP:        HeartPulse,
  BP_HIGH_ABS:        HeartPulse,
  STEPS_DROP:         Footprints,
  GLUCOSE_HIGH:       Droplet,
  RECENT_DISCHARGE:   Hospital,
  NO_DATA_48H:        WifiOff,
};

// Weight chip colour — brand/ink tokens, NEVER risk tokens
function weightChipClass(weight: number): string {
  if (weight >= 20) return "bg-[var(--surface-100)] text-[var(--ink-700)]";
  if (weight >= 15) return "bg-[var(--surface-100)] text-[var(--ink-500)]";
  return "bg-[var(--surface-50)] text-[var(--ink-300)]";
}

export const ReasonList: React.FC<ReasonListProps> = ({
  reasons = [],
  className = "",
}) => {
  if (!reasons || reasons.length === 0) {
    return (
      <div
        className={[
          "flex flex-col items-center justify-center py-10 gap-3",
          "text-center",
          className,
        ].join(" ")}
        role="status"
        aria-label="No active risk flags"
      >
        <CheckCircle2
          size={32}
          className="text-[var(--risk-green)]"
          aria-hidden="true"
        />
        <p className="font-body text-sm text-[var(--ink-500)]">
          No active flags
        </p>
        <p className="font-body text-xs text-[var(--ink-300)]">
          Patient metrics are within normal ranges.
        </p>
      </div>
    );
  }

  // Sort by weight descending — highest weight first
  const sorted = [...reasons].sort((a, b) => b.weight - a.weight);

  return (
    <ul
      className={["space-y-2", className].filter(Boolean).join(" ")}
      aria-label="Risk reasons"
    >
      {sorted.map((reason, index) => {
        const Icon = (reason.ruleId ? ruleIcon[reason.ruleId] : null) ?? AlertCircle;
        return (
          <li
            key={`${reason.ruleId || "rule"}-${index}`}
            className={[
              "flex items-start gap-3 p-3",
              "bg-[var(--surface-0)] rounded-[var(--r-md)]",
              "border border-[var(--ink-300)]",
            ].join(" ")}
          >
            {/* Rule icon */}
            <span
              className="mt-0.5 shrink-0 text-[var(--ink-500)]"
              aria-hidden="true"
            >
              <Icon size={16} />
            </span>

            {/* Reason text */}
            <span className="flex-1 font-body text-sm text-[var(--ink-700)] leading-relaxed">
              {reason.text}
            </span>

            {/* Weight chip — Sora, shows rule severity */}
            <span
              className={[
                "shrink-0 font-data text-[10px] font-semibold",
                "px-1.5 py-0.5 rounded-[var(--r-sm)]",
                weightChipClass(reason.weight),
              ].join(" ")}
              aria-label={`weight ${reason.weight}`}
              title={`Contributes ${reason.weight} points to risk score`}
            >
              +{reason.weight}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

ReasonList.displayName = "ReasonList";
