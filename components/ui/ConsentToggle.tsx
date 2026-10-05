/**
 * ConsentToggle component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Granular patient privacy toggle for data category sharing.
 *
 * Rules:
 *  - Clear plain language explanations ("You decide what your doctor can see")
 *  - Categories: vitals | medicines | steps | glucose
 *  - Accessible switch role with aria-checked
 *  - Optimistic UI compatible
 */

"use client";

import * as React from "react";
import { Activity, Pill, Footprints, Heart, Shield } from "lucide-react";
import { Card } from "./Card";

export type ConsentCategory = "vitals" | "medicines" | "steps" | "glucose";

export interface ConsentToggleProps {
  category: ConsentCategory;
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const categoryIcons: Record<ConsentCategory, React.ElementType> = {
  vitals: Activity,
  medicines: Pill,
  steps: Footprints,
  glucose: Heart,
};

export function ConsentToggle({
  category,
  label,
  description,
  enabled,
  onChange,
  disabled = false,
  className = "",
}: ConsentToggleProps) {
  const Icon = categoryIcons[category] || Shield;

  const handleToggle = () => {
    if (!disabled) {
      onChange(!enabled);
    }
  };

  return (
    <Card
      variant="default"
      className={`p-4 transition-all duration-200 ${
        disabled ? "opacity-60" : "hover:border-[var(--ink-300)]"
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Icon & Details */}
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-[var(--r-md)] flex items-center justify-center shrink-0 ${
              enabled
                ? "bg-[var(--brand-teal)]/15 text-[var(--brand-teal-600)]"
                : "bg-[var(--surface-100)] text-[var(--ink-500)]"
            }`}
            aria-hidden="true"
          >
            <Icon className="w-5 h-5 stroke-[2.2]" />
          </div>

          <div>
            <h4 className="font-display font-semibold text-base text-[var(--ink-900)]">
              {label}
            </h4>
            <p className="font-body text-xs text-[var(--ink-500)] mt-0.5 leading-snug">
              {description}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={disabled}
          onClick={handleToggle}
          aria-label={`Allow doctor to view ${label}`}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)] focus-visible:ring-offset-2 ${
            enabled ? "bg-[var(--brand-teal)]" : "bg-[var(--ink-300)]"
          } ${disabled ? "cursor-not-allowed" : ""}`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-[var(--surface-0)] shadow-md ring-0 transition duration-200 ease-in-out ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </Card>
  );
}
