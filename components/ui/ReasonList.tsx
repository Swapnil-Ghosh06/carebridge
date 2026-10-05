import React from "react";
import {
  AlertTriangle,
  Pill,
  Heart,
  Footprints,
  Droplet,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { RiskReason } from "@/lib/types";

export type { RiskReason };

export interface ReasonListProps {
  reasons: RiskReason[];
}  

export const ReasonList: React.FC<ReasonListProps> = ({ reasons }) => {
  if (!reasons || reasons.length === 0) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-md bg-risk-green-bg/40 border border-risk-green/20 text-risk-green">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span className="font-body text-sm font-medium">
          No active flags. Patient is currently stable within prescribed parameters.
        </span>
      </div>
    );
  }

  const getRuleIcon = (ruleId?: string) => {
    const rule = (ruleId || "").toUpperCase();
    if (rule.includes("MED")) return Pill;
    if (rule.includes("BP")) return Heart;
    if (rule.includes("STEPS")) return Footprints;
    if (rule.includes("GLUCOSE")) return Droplet;
    if (rule.includes("DATA") || rule.includes("TIME")) return Clock;
    return AlertTriangle;
  };

  return (
    <div className="space-y-2.5">
      {reasons.map((reason, idx) => {
        const ruleId = reason.rule_id || reason.ruleId;
        const IconComponent = getRuleIcon(ruleId);
        return (
          <div
            key={reason.id || ruleId || idx}
            className="flex items-start justify-between gap-3 p-3.5 rounded-md bg-surface-50 border border-ink-300/30 hover:border-ink-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-pill bg-risk-amber-bg text-risk-amber flex items-center justify-center shrink-0 mt-0.5">
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <p className="font-body font-medium text-ink-900 text-sm leading-snug">
                  {reason.text}
                </p>
                <span className="font-data text-xs text-ink-500">
                  Rule ID: {ruleId}
                </span>
              </div>
            </div>
            <span className="shrink-0 font-data text-xs font-semibold px-2 py-0.5 rounded-pill bg-ink-100 text-ink-700">
              +{reason.weight} pts
            </span>
          </div>
        );
      })}
    </div>
  );
};
