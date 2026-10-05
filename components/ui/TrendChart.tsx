/**
 * TrendChart component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Responsive line chart wrapper using Recharts for vitals (BP, Steps, Glucose).
 *
 * Rules:
 *  - Primary line: Brand teal (#14B8A6)
 *  - Secondary line: Brand indigo (#4B3FB8) or Mint
 *  - Threshold bands/reference lines for clinical ranges
 *  - Font: Sora for data points & axis numbers, DM Sans for tooltips & labels
 *  - Clean empty and loading states
 */

"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  CartesianGrid,
} from "recharts";
import { Card } from "./Card";

export interface DataPoint {
  date: string;
  value?: number;
  secondaryValue?: number;
  [key: string]: unknown;
}

export interface ThresholdConfig {
  min?: number;
  max?: number;
  label?: string;
}

export interface TrendChartProps {
  title?: string;
  subtitle?: string;
  data: DataPoint[];
  dataKey?: string;
  dataLabel?: string;
  secondaryDataKey?: string;
  secondaryDataLabel?: string;
  unit?: string;
  threshold?: ThresholdConfig;
  height?: number;
  strokeColor?: string;
  secondaryStrokeColor?: string;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  unit?: string;
}

function CustomTooltip({ active, payload, label, unit }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--surface-0)] p-3 rounded-[var(--r-md)] shadow-[var(--shadow-card)] border border-[var(--ink-300)] text-xs">
        <p className="font-data font-semibold text-[var(--ink-900)] mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 mt-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-body text-[var(--ink-500)]">{entry.name}:</span>
            <span className="font-data font-bold text-[var(--ink-900)]">
              {entry.value} {unit ? unit : ""}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function TrendChart({
  title,
  subtitle,
  data = [],
  dataKey = "value",
  dataLabel = "Value",
  secondaryDataKey,
  secondaryDataLabel = "Secondary",
  unit = "",
  threshold,
  height = 240,
  strokeColor = "#14B8A6",
  secondaryStrokeColor = "#4B3FB8",
  className = "",
}: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={`p-5 ${className}`}>
        {title && (
          <h4 className="font-display font-bold text-base text-[var(--ink-900)] mb-1">
            {title}
          </h4>
        )}
        <div
          className="flex items-center justify-center text-center font-body text-sm text-[var(--ink-500)]"
          style={{ height }}
        >
          No trend data recorded yet
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-5 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h4 className="font-display font-bold text-base text-[var(--ink-900)]">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="font-body text-xs text-[var(--ink-500)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#EEF2F8"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#5B6B8C", fontSize: 11, fontFamily: "var(--font-data)" }}
              axisLine={{ stroke: "#B7C0D4" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#5B6B8C", fontSize: 11, fontFamily: "var(--font-data)" }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
            />

            <Tooltip
              content={<CustomTooltip unit={unit} />}
              cursor={{ stroke: "#B7C0D4", strokeWidth: 1, strokeDasharray: "4 4" }}
            />

            {/* Optional threshold areas / lines */}
            {threshold?.max && (
              <ReferenceLine
                y={threshold.max}
                stroke="#F5A524"
                strokeDasharray="4 4"
                label={{
                  value: threshold.label || `Max: ${threshold.max}`,
                  position: "insideTopRight",
                  fill: "#F5A524",
                  fontSize: 10,
                  fontFamily: "var(--font-data)",
                }}
              />
            )}

            {threshold?.min && threshold?.max && (
              <ReferenceArea
                y1={threshold.min}
                y2={threshold.max}
                fill="#E6F6EE"
                fillOpacity={0.4}
              />
            )}

            <Line
              type="monotone"
              dataKey={dataKey}
              name={dataLabel}
              stroke={strokeColor}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: strokeColor, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: strokeColor }}
            />

            {secondaryDataKey && (
              <Line
                type="monotone"
                dataKey={secondaryDataKey}
                name={secondaryDataLabel}
                stroke={secondaryStrokeColor}
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: secondaryStrokeColor, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: secondaryStrokeColor }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
