import { PatientSnapshot, RiskBand, RiskReason } from "@/lib/types";
import { RISK_RULES } from "./rules";

export interface ComputeRiskResult {
  score: number;
  band: RiskBand;
  reasons: RiskReason[];
}

export function computeRisk(snapshot: PatientSnapshot): ComputeRiskResult {
  const reasons: RiskReason[] = [];
  let totalScore = 0;

  for (const rule of RISK_RULES) {
    try {
      const evaluation = rule.evaluate(snapshot);
      if (evaluation.hit) {
        totalScore += rule.weight;
        reasons.push({
          rule_id: rule.id,
          text: evaluation.text || rule.label,
          weight: rule.weight,
        });
      }
    } catch {
      // Continue safely on single rule exception
    }
  }

  // Cap score at 100
  const score = Math.min(100, Math.max(0, totalScore));

  // Bands per ARCHITECTURE.md: 0-39 Green, 40-69 Yellow, 70-100 Red
  let band: RiskBand = "green";
  if (score >= 70) {
    band = "red";
  } else if (score >= 40) {
    band = "yellow";
  }

  // Sort reasons by weight descending so most severe flag appears first
  reasons.sort((a, b) => b.weight - a.weight);

  return {
    score,
    band,
    reasons,
  };
}
