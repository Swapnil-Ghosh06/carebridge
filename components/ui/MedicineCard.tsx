/**
 * MedicineCard component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Displays a scheduled medication for the patient portal.
 *
 * Rules:
 *  - Font: Montserrat (name), DM Sans (dose, timing, instructions), Sora (time/status)
 *  - Large, easily-tappable "Taken" button (>= 48px height for elderly accessibility)
 *  - Status badge: pending (teal/neutral), taken (green), missed (amber/red)
 *  - No embedded data fetching — purely driven by props
 */

"use client";

import * as React from "react";
import { Pill, Check, Clock, AlertCircle } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";

export type MedicineStatus = "pending" | "taken" | "missed";

export interface MedicineCardProps {
  id?: string;
  name: string;
  dose: string;
  time: string;
  instructions?: string;
  status?: MedicineStatus;
  takenAt?: string;
  loading?: boolean;
  isLoading?: boolean;
  onTake?: () => void;
  onMarkTaken?: (id: string) => void;
  onUndo?: () => void;
  className?: string;
}

export function MedicineCard({
  id,
  name,
  dose,
  time,
  instructions = "With water",
  status = "pending",
  takenAt,
  loading = false,
  isLoading = false,
  onTake,
  onMarkTaken,
  onUndo,
  className = "",
}: MedicineCardProps) {
  const isTaken = status === "taken";
  const isMissed = status === "missed";
  const isBusy = loading || isLoading;
  const handleTake = () => {
    if (onMarkTaken && id) {
      onMarkTaken(id);
    } else if (onTake) {
      onTake();
    }
  };

  return (
    <Card
      variant={isTaken ? "flat" : "default"}
      className={`p-5 transition-all duration-200 ${
        isTaken ? "opacity-90 border-[var(--risk-green-bg)]" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Medicine details */}
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-[var(--r-md)] flex items-center justify-center shrink-0 ${
              isTaken
                ? "bg-[var(--risk-green-bg)] text-[var(--risk-green)]"
                : isMissed
                ? "bg-[var(--risk-amber-bg)] text-[var(--risk-amber)]"
                : "bg-[var(--surface-100)] text-[var(--brand-indigo)]"
            }`}
            aria-hidden="true"
          >
            {isTaken ? (
              <Check className="w-6 h-6 stroke-[2.5]" />
            ) : isMissed ? (
              <AlertCircle className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <Pill className="w-6 h-6 stroke-[2]" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display font-bold text-lg text-[var(--ink-900)] leading-tight">
                {name}
              </h3>
              <span className="font-body text-sm text-[var(--ink-500)] font-medium">
                ({dose})
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-[var(--ink-500)] font-body">
              <Clock className="w-4 h-4 text-[var(--ink-300)]" aria-hidden="true" />
              <span className="font-data font-semibold text-[var(--ink-700)]">
                {time}
              </span>
              <span>•</span>
              <span>{instructions}</span>
            </div>

            {isTaken && takenAt && (
              <p className="font-body text-xs text-[var(--risk-green)] font-medium mt-1">
                ✓ Logged as taken at {takenAt}
              </p>
            )}

            {isMissed && (
              <p className="font-body text-xs text-[var(--risk-amber)] font-medium mt-1">
                ⚠️ Scheduled dose was missed
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex items-center">
          {isTaken ? (
            <div className="flex items-center gap-2">
              <span className="font-data text-xs font-bold uppercase tracking-wider text-[var(--risk-green)] bg-[var(--risk-green-bg)] px-3 py-1.5 rounded-[var(--r-pill)]">
                Taken
              </span>
              {onUndo && (
                <button
                  type="button"
                  onClick={onUndo}
                  className="font-body text-xs text-[var(--ink-500)] hover:text-[var(--ink-700)] underline ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)] rounded"
                >
                  Undo
                </button>
              )}
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              loading={isBusy}
              onClick={handleTake}
              className="min-w-[110px] min-h-[48px] shadow-sm"
              aria-label={`Mark ${name} ${dose} as taken`}
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              Taken
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
