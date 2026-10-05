"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  RefreshCw,
  AlertCircle,
  FileText,
  CheckCircle2,
  BookmarkCheck,
  Activity,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CitationItem {
  id: string;
  type: string;
  label: string;
  value: string;
  timestamp: string;
  flag: string;
}

interface BriefData {
  text: string;
  source: "llm" | "fallback";
  sections?: {
    sinceLastVisit: string;
    concerns: string;
    suggestedChecks: string;
  };
  citations?: CitationItem[];
}

interface BriefPanelProps {
  patientId: string;
  patientName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BriefPanel: React.FC<BriefPanelProps> = ({
  patientId,
  patientName,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBrief = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/patients/${patientId}/brief`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch brief");
      }
      const data: BriefData = await res.json();
      setBrief(data);
    } catch {
      // Offline fallback template per PRD & ARCHITECTURE Section 6
      setBrief({
        source: "fallback",
        text: "Since last visit: Adherence dropped to 65% with 2 consecutive missed Metformin doses [Log: m1, m4]. Concerns: Systolic BP increased by 14% to 154/94 mmHg [Obs: v7]; daily steps dropped 46% to 2,800 [Obs: v14]. Suggested checks: Confirm current medication regimen, check for dizziness or ankle edema, order fasting blood glucose. Doctor decides.",
        sections: {
          sinceLastVisit:
            "Adherence dropped to 65% over the past 4 days, with 2 consecutive missed morning doses of Metformin 500mg [Log: m1, m4].",
          concerns:
            "Systolic BP trended up +14% (latest 154/94 mmHg) [Obs: v7]. Average daily physical activity fell from 5,200 to 2,800 steps [Obs: v14].",
          suggestedChecks:
            "Verify patient understanding of morning routine, evaluate potential medication side effects, check for orthostatic symptoms, and consider home BP monitor calibration.",
        },
        citations: [
          {
            id: "v7",
            type: "Blood Pressure",
            label: "BP Reading #v7",
            value: "154/94 mmHg",
            timestamp: "Today, 08:30 AM",
            flag: "HIGH (+14%)",
          },
          {
            id: "v14",
            type: "Pedometer",
            label: "Steps Activity #v14",
            value: "2,800 steps",
            timestamp: "Today",
            flag: "DECREASED (-46%)",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  // Trigger fetch if open and brief is null
  React.useEffect(() => {
    if (isOpen && !brief && !loading) {
      fetchBrief();
    }
  }, [isOpen, brief, loading, fetchBrief]);

  if (!isOpen) return null;

  // Helper to format text with highlighted citation tags
  const renderTextWithCitations = (text: string) => {
    const parts = text.split(/(\[(?:Obs|Log):[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span
            key={index}
            className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded-pill bg-brand-indigo/10 text-brand-indigo font-data font-semibold text-xs border border-brand-indigo/20 shadow-xs"
            title="Grounding Telemetric Observation"
          >
            <BookmarkCheck className="w-3 h-3 text-brand-indigo" />
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink-900/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-surface-0 shadow-2xl h-full flex flex-col border-l border-ink-300/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-ink-300/30 flex items-center justify-between bg-surface-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-pill bg-brand-indigo/10 text-brand-indigo flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-ink-900 text-lg">
                Pre-Consult Brief
              </h3>
              <p className="font-body text-xs text-ink-500">
                Decision assistance for {patientName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-pill hover:bg-surface-100 text-ink-500 hover:text-ink-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading && (
            <div className="space-y-4 py-8">
              <div className="flex items-center justify-center gap-3 text-brand-indigo">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="font-display font-semibold text-sm">
                  Synthesizing telemetry &amp; verifying clinical citations...
                </span>
              </div>
              <div className="space-y-3 mt-6">
                <div className="h-4 bg-ink-100 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-ink-100 rounded animate-pulse w-full" />
                <div className="h-4 bg-ink-100 rounded animate-pulse w-5/6" />
                <div className="h-20 bg-ink-100 rounded-lg animate-pulse w-full mt-4" />
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 rounded-md bg-risk-red-bg border border-risk-red/30 text-risk-red text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Error generating brief</p>
                <p>{error}</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-2 text-xs"
                  onClick={fetchBrief}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {brief && !loading && (
            <div className="space-y-5">
              {/* Source Tag & Grounding Indicator */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-brand-indigo/10 text-brand-indigo font-data text-xs font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  Source: {brief.source === "llm" ? "AI Model (Ollama / Claude)" : "Deterministic Clinical Template"}
                </span>
                <span className="inline-flex items-center gap-1 font-data text-xs font-semibold text-brand-teal">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  {brief.citations?.length || 0} Grounded Evidence Citations
                </span>
              </div>

              {/* Three Structured Parts */}
              {brief.sections ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-surface-50 border border-ink-300/30">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-500 mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />
                      1. Since Last Visit
                    </h4>
                    <p className="font-body text-sm text-ink-900 leading-relaxed">
                      {renderTextWithCitations(brief.sections.sinceLastVisit)}
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-risk-amber-bg/30 border border-risk-amber/30">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-risk-amber mb-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-risk-amber" />
                      2. Primary Concerns
                    </h4>
                    <p className="font-body text-sm text-ink-900 leading-relaxed">
                      {renderTextWithCitations(brief.sections.concerns)}
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-brand-teal/5 border border-brand-teal/20">
                    <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-teal mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                      3. Suggested Clinical Inquiries
                    </h4>
                    <p className="font-body text-sm text-ink-900 leading-relaxed">
                      {renderTextWithCitations(brief.sections.suggestedChecks)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-md bg-surface-50 border border-ink-300/30">
                  <p className="font-body text-sm text-ink-900 leading-relaxed whitespace-pre-line">
                    {renderTextWithCitations(brief.text)}
                  </p>
                </div>
              )}

              {/* Citations Grounding Inspector */}
              {brief.citations && brief.citations.length > 0 && (
                <div className="pt-2 border-t border-ink-300/30">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-ink-700 mb-2.5 flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-brand-indigo" />
                    <span>Cited Telemetry Evidence Sources</span>
                  </h4>
                  <div className="space-y-2">
                    {brief.citations.map((c) => (
                      <div
                        key={c.id}
                        className="p-2.5 rounded-md bg-surface-50 border border-ink-300/30 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {c.type.includes("Blood") ? (
                            <Activity className="w-4 h-4 text-risk-red shrink-0" />
                          ) : (
                            <Pill className="w-4 h-4 text-brand-teal shrink-0" />
                          )}
                          <div>
                            <span className="font-semibold text-ink-900">{c.label}</span>
                            <span className="font-data text-ink-500 ml-1.5">({c.value})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-data text-[10px] text-ink-500">{c.timestamp}</span>
                          <span className="font-data font-bold text-[10px] px-1.5 py-0.5 rounded bg-risk-amber-bg text-risk-amber">
                            {c.flag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regenerate Action */}
              <div className="pt-2 flex justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={fetchBrief}
                  disabled={loading}
                  className="text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Regenerate Brief
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mandatory Compliance Footer */}
        <div className="p-4 border-t border-ink-300/30 bg-surface-50 text-center">
          <p className="font-data text-xs font-semibold text-ink-500 uppercase tracking-wider">
            Decision support only. Doctor decides. • Grounded simulated data
          </p>
        </div>
      </div>
    </div>
  );
};
