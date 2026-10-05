import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatTileProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendText?: string;
  accentColor?: string;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  subValue,
  trend,
  trendText,
}) => {
  return (
    <div className="bg-surface-0 rounded-lg p-5 border border-ink-300/30 shadow-card flex flex-col justify-between">
      <span className="text-sm font-medium font-body text-ink-500 mb-2">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold font-data text-ink-900">
          {value}
        </span>
        {subValue && (
          <span className="text-sm font-medium font-data text-ink-500">
            {subValue}
          </span>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs font-data">
          {trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-risk-red" />}
          {trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-risk-green" />}
          {trend === "neutral" && <Minus className="w-3.5 h-3.5 text-ink-500" />}
          <span
            className={
              trend === "up"
                ? "text-risk-red font-semibold"
                : trend === "down"
                ? "text-risk-green font-semibold"
                : "text-ink-500"
            }
          >
            {trendText}
          </span>
        </div>
      )}
    </div>
  );
};
