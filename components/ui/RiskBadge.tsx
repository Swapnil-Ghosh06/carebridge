import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { RiskBand } from "@/lib/types";

export type { RiskBand };

export interface RiskBadgeProps {
  band: RiskBand | "amber";
  score?: number;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  band: rawBand,
  score,
  size = "md",
  showScore = true,
  className = "",
}) => {
  const band: RiskBand = rawBand === "amber" ? "yellow" : rawBand;

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
  }[band] || {
    bg: "bg-risk-green-bg",
    text: "text-risk-green",
    border: "border-risk-green/30",
    label: "GREEN",
    subLabel: "STABLE",
    Icon: CheckCircle2,
  };

  const IconComponent = config.Icon;
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  }[size];

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-data font-semibold uppercase tracking-wider rounded-pill border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <IconComponent className={iconSizes} />
      <span>{config.label}</span>
      {showScore && score !== undefined && (
        <span className="font-bold opacity-90">({score})</span>
      )}
    </span>
  );
};
