/**
 * PatientRow component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Doctor portal patient list row.
 * Props typed to match GET /api/patients → list item shape.
 *
 * Rules:
 *  - Avatar: initials, no photo (privacy)
 *  - Name + age: Montserrat (font-display)
 *  - Top reason, last seen: DM Sans (font-body)
 *  - Risk badge: always from <RiskBadge> — never inline colour
 *  - No data fetching inside
 *  - Supports both nested `patient` object and flattened props
 */

import * as React from "react";
import { Clock } from "lucide-react";
import { RiskBadge, type RiskBand } from "./RiskBadge";

export interface PatientRowData {
  id: string;
  name: string;
  age: number;
  score?: number;
  riskScore?: number;
  band?: RiskBand;
  riskBand?: RiskBand;
  topReason?: string;
  lastSeen?: string; // ISO date string or relative text
}

export type PatientRowProps =
  | {
      patient: PatientRowData;
      id?: never;
      name?: never;
      age?: never;
      score?: never;
      riskScore?: never;
      band?: never;
      riskBand?: never;
      topReason?: never;
      lastSeen?: never;
      isSelected?: boolean;
      onClick?: (id: string) => void;
      className?: string;
    }
  | {
      patient?: never;
      id: string;
      name: string;
      age: number;
      score?: number;
      riskScore?: number;
      band?: RiskBand;
      riskBand?: RiskBand;
      topReason?: string;
      lastSeen?: string;
      isSelected?: boolean;
      onClick?: (id: string) => void;
      className?: string;
    };

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function formatLastSeen(val?: string): string {
  if (!val) return "recently";
  if (val.includes("ago") || val.includes("just now")) return val;
  const diff = Date.now() - new Date(val).getTime();
  if (isNaN(diff)) return val;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const avatarBg: Record<RiskBand, string> = {
  red: "bg-[var(--surface-100)] text-[var(--ink-700)]",
  amber: "bg-[var(--surface-100)] text-[var(--ink-700)]",
  green: "bg-[var(--surface-100)] text-[var(--ink-700)]",
};

export const PatientRow: React.FC<PatientRowProps> = (props) => {
  const patientData = props.patient || {
    id: props.id!,
    name: props.name!,
    age: props.age!,
    score: props.score ?? props.riskScore,
    band: props.band ?? props.riskBand ?? "green",
    topReason: props.topReason,
    lastSeen: props.lastSeen,
  };

  const id = patientData.id;
  const name = patientData.name;
  const age = patientData.age;
  const band = patientData.band ?? patientData.riskBand ?? "green";
  const score = patientData.score ?? patientData.riskScore;
  const topReason = patientData.topReason || "No active flags";
  const lastSeen = patientData.lastSeen;
  const isSelected = props.isSelected || false;
  const onClick = props.onClick;

  const handleClick = () => onClick?.(id);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${name}, ${age} years old. ${band} risk. ${topReason}`}
      onClick={handleClick}
      onKeyDown={handleKey}
      className={[
        "flex items-center gap-4 px-5 py-4",
        "border-b border-[var(--ink-300)] last:border-b-0",
        "cursor-pointer select-none",
        "transition-colors duration-[180ms] ease-out",
        isSelected
          ? "bg-[var(--surface-100)]"
          : "bg-[var(--surface-0)] hover:bg-[var(--surface-50)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] focus-visible:outline-offset-[-2px]",
        props.className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Avatar */}
      <div
        className={[
          "w-10 h-10 rounded-[var(--r-pill)] shrink-0",
          "flex items-center justify-center",
          "font-display font-bold text-sm",
          avatarBg[band],
        ].join(" ")}
        aria-hidden="true"
      >
        {initials(name)}
      </div>

      {/* Name + reason */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-display font-semibold text-sm text-[var(--ink-900)] truncate">
            {name}
          </span>
          <span className="font-body text-xs text-[var(--ink-500)] shrink-0">
            {age}y
          </span>
        </div>
        <p className="font-body text-xs text-[var(--ink-500)] truncate mt-0.5">
          {topReason}
        </p>
      </div>

      {/* Badge + last seen */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <RiskBadge band={band} score={score} size="sm" />
        <div className="flex items-center gap-1 text-[var(--ink-300)]">
          <Clock size={10} aria-hidden="true" />
          <span className="font-body text-[10px]">
            {formatLastSeen(lastSeen)}
          </span>
        </div>
      </div>
    </div>
  );
};

PatientRow.displayName = "PatientRow";
