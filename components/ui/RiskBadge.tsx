import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { RiskBand } from "@/lib/types";

interface RiskBadgeProps {
  band: RiskBand;
  score?: number;
  size?: "sm" | "md";
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  band,
  score,
  size = "md",
  showScore = true,
}) => {
  const config = {
    red: {
      bg: "bg-risk-red-bg",
      text: "text-risk-red",
      border: "border-risk-red/30",
      label: "RED",
      subLabel: "HIGH RISK",
      Icon: AlertTriangle,
    },
    yellow: {
      bg: "bg-risk-amber-bg",
      text: "text-risk-amber",
      border: "border-risk-amber/30",
      label: "YELLOW",
      subLabel: "ELEVATED",
      Icon: AlertCircle,
    },
    green: {
      bg: "bg-risk-green-bg",
      text: "text-risk-green",
      border: "border-risk-green/30",
      label: "GREEN",
      subLabel: "STABLE",
      Icon: CheckCircle2,
    },
  }[band];

  const IconComponent = config.Icon;
  const isSm = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-data font-semibold uppercase tracking-wider rounded-pill border ${config.bg} ${config.text} ${config.border} ${
        isSm ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs"
      }`}
    >
      <IconComponent className={isSm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{config.label}</span>
      {showScore && score !== undefined && (
        <span className="font-bold opacity-90">({score})</span>
      )}
    </span>
  );
};
