/**
 * AuditRow component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Displays data access audit events ("Who viewed my data" list).
 *
 * Rules:
 *  - Font: Montserrat (actor name), DM Sans (category/purpose), Sora (timestamp)
 *  - Clear indication of accessor, data category, and timestamp
 */

import * as React from "react";
import { Eye, ShieldCheck } from "lucide-react";

export interface AuditRowProps {
  id?: string;
  actor: string;
  role?: string;
  category: string;
  action?: string;
  timestamp: string;
  className?: string;
}

export function AuditRow({
  actor,
  role = "Clinician",
  category,
  action = "Viewed clinical records",
  timestamp,
  className = "",
}: AuditRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3.5 px-4 border-b border-[var(--ink-300)] last:border-b-0 hover:bg-[var(--surface-50)] transition-colors ${className}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-[var(--r-md)] bg-[var(--surface-100)] flex items-center justify-center text-[var(--ink-700)] shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <Eye className="w-4 h-4" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-semibold text-sm text-[var(--ink-900)]">
              {actor}
            </span>
            <span className="font-data text-[10px] font-semibold text-[var(--ink-500)] bg-[var(--surface-100)] px-2 py-0.5 rounded-[var(--r-pill)]">
              {role}
            </span>
          </div>

          <p className="font-body text-xs text-[var(--ink-700)] mt-0.5">
            {action} • <strong className="text-[var(--ink-900)]">{category}</strong>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-right shrink-0">
        <ShieldCheck className="w-3.5 h-3.5 text-[var(--risk-green)]" aria-hidden="true" />
        <span className="font-data text-xs text-[var(--ink-500)]">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
