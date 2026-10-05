/**
 * BriefPanel component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * AI Pre-Consult Brief drawer/panel for the doctor portal.
 *
 * Rules:
 *  - Three structured parts:
 *     1. Since last visit
 *     2. Concerns
 *     3. Suggested checks
 *  - Source tag: "AI" (brand teal) or "Template" (indigo)
 *  - Skeleton loading state
 *  - Mandatory footer: "Decision support only. Doctor decides. Simulated data."
 */

"use client";

import * as React from "react";
import { Sparkles, FileText, X, RefreshCw, AlertCircle } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";

export interface BriefData {
  sinceLastVisit: string;
  concerns: string[];
  suggestedChecks: string[];
  source?: "llm" | "fallback";
  generatedAt?: string;
}

export interface BriefPanelProps {
  data?: BriefData | null;
  patientName?: string;
  loading?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onRefresh?: () => void;
  className?: string;
}

export function BriefPanel({
  data,
  patientName = "Patient",
  loading = false,
  onClose,
  onRefresh,
  className = "",
}: BriefPanelProps) {
  const isAi = data?.source === "llm" || !data?.source;

  return (
    <Card className={`p-6 flex flex-col gap-5 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--ink-300)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[var(--r-md)] bg-[var(--surface-100)] flex items-center justify-center text-[var(--brand-teal)] shrink-0">
            {isAi ? (
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <FileText className="w-5 h-5 stroke-[2.2]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-[var(--ink-900)]">
                Pre-Consult Brief
              </h3>
              {data && (
                <span
                  className={`font-data text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[var(--r-pill)] ${
                    isAi
                      ? "bg-[var(--brand-teal)]/15 text-[var(--brand-teal-600)]"
                      : "bg-[var(--brand-indigo)]/15 text-[var(--brand-indigo)]"
                  }`}
                >
                  {isAi ? "AI Generated" : "Template"}
                </span>
              )}
            </div>
            <p className="font-body text-xs text-[var(--ink-500)]">
              14-day longitudinal synthesis for {patientName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="p-1.5 text-[var(--ink-500)] hover:text-[var(--ink-900)] rounded hover:bg-[var(--surface-100)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)] disabled:opacity-50"
              aria-label="Regenerate brief"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[var(--ink-500)] hover:text-[var(--ink-900)] rounded hover:bg-[var(--surface-100)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)]"
              aria-label="Close brief panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4 py-2 animate-pulse">
          <div className="h-4 bg-[var(--surface-100)] rounded w-1/3"></div>
          <div className="h-12 bg-[var(--surface-100)] rounded w-full"></div>
          <div className="h-4 bg-[var(--surface-100)] rounded w-1/4 mt-4"></div>
          <div className="h-16 bg-[var(--surface-100)] rounded w-full"></div>
          <div className="h-4 bg-[var(--surface-100)] rounded w-1/3 mt-4"></div>
          <div className="h-12 bg-[var(--surface-100)] rounded w-full"></div>
        </div>
      ) : data ? (
        <div className="space-y-4 text-sm">
          {/* Section 1: Since last visit */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--ink-700)] mb-1.5">
              1. Since Last Visit
            </h4>
            <p className="font-body text-[var(--ink-900)] leading-relaxed bg-[var(--surface-50)] p-3 rounded-[var(--r-md)] border border-[var(--surface-100)]">
              {data.sinceLastVisit}
            </p>
          </div>

          {/* Section 2: Concerns */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--risk-amber)] mb-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              2. Key Concerns
            </h4>
            <ul className="space-y-1.5 bg-[var(--surface-50)] p-3 rounded-[var(--r-md)] border border-[var(--surface-100)]">
              {Array.isArray(data.concerns) ? (
                data.concerns.map((concern, idx) => (
                  <li key={idx} className="font-body text-[var(--ink-900)] flex items-start gap-2">
                    <span className="text-[var(--risk-amber)] font-bold">•</span>
                    <span>{concern}</span>
                  </li>
                ))
              ) : (
                <li className="font-body text-[var(--ink-900)]">{data.concerns}</li>
              )}
            </ul>
          </div>

          {/* Section 3: Suggested Checks */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--brand-teal-600)] mb-1.5">
              3. Suggested Clinical Checks
            </h4>
            <ul className="space-y-1.5 bg-[var(--surface-50)] p-3 rounded-[var(--r-md)] border border-[var(--surface-100)]">
              {Array.isArray(data.suggestedChecks) ? (
                data.suggestedChecks.map((check, idx) => (
                  <li key={idx} className="font-body text-[var(--ink-900)] flex items-start gap-2">
                    <span className="text-[var(--brand-teal)] font-bold">→</span>
                    <span>{check}</span>
                  </li>
                ))
              ) : (
                <li className="font-body text-[var(--ink-900)]">{data.suggestedChecks}</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="font-body text-sm text-[var(--ink-500)] mb-3">
            No pre-consult brief generated for this visit.
          </p>
          {onRefresh && (
            <Button variant="primary" size="sm" onClick={onRefresh}>
              <Sparkles className="w-4 h-4 mr-1.5" />
              Generate AI Brief
            </Button>
          )}
        </div>
      )}

      {/* Mandatory Disclaimer Footer */}
      <div className="pt-3 border-t border-[var(--surface-100)] text-center">
        <p className="font-body text-[11px] text-[var(--ink-500)] italic">
          Decision support only. Doctor decides. Simulated data.
        </p>
      </div>
    </Card>
  );
}
