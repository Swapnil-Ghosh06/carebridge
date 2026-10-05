"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Vital } from "@/lib/types";

interface TrendChartsProps {
  vitals: Vital[];
}

export const TrendCharts: React.FC<TrendChartsProps> = ({ vitals }) => {
  // Extract BP data
  const bpVitals = vitals.filter((v) => v.type === "bp");
  const bpData = bpVitals.map((v) => ({
    name: v.recorded_at,
    systolic: v.value_a,
    diastolic: v.value_b || 80,
  }));

  // Extract Steps data
  const stepsVitals = vitals.filter((v) => v.type === "steps");
  const stepsData = stepsVitals.map((v) => ({
    name: v.recorded_at,
    steps: v.value_a,
  }));

  return (
    <div className="space-y-6">
      {/* BP Chart */}
      <div className="bg-surface-0 p-5 rounded-lg border border-ink-300/30 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-display font-bold text-ink-900 text-base">
              Blood Pressure Trend (7 Days)
            </h4>
            <p className="font-body text-xs text-ink-500">
              Systolic & Diastolic telemetric readings (mmHg)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-data">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-pill bg-brand-teal" />
              Systolic
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-pill bg-brand-indigo" />
              Diastolic
            </span>
            <span className="flex items-center gap-1.5 text-risk-red">
              <span className="w-4 h-0.5 bg-risk-red border-dashed" />
              Threshold (140/90)
            </span>
          </div>
        </div>

        <div className="h-60 w-full">
          {bpData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
                />
                <YAxis
                  domain={[60, 180]}
                  tick={{ fontSize: 11, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #B7C0D4",
                    fontFamily: "var(--font-data)",
                    fontSize: "12px",
                  }}
                />
                <ReferenceLine
                  y={140}
                  stroke="#E5484D"
                  strokeDasharray="4 4"
                  label={{ value: "Max Normal (140)", fill: "#E5484D", fontSize: 10 }}
                />
                <ReferenceLine y={90} stroke="#E5484D" strokeDasharray="4 4" />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#14B8A6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#14B8A6" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#4B3FB8"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#4B3FB8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs font-body text-ink-500">
              Patient has not shared blood pressure telemetry
            </div>
          )}
        </div>
      </div>

      {/* Steps Chart */}
      <div className="bg-surface-0 p-5 rounded-lg border border-ink-300/30 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-display font-bold text-ink-900 text-base">
              Daily Physical Activity Trend
            </h4>
            <p className="font-body text-xs text-ink-500">
              Steps captured via mobile pedometer sensor
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-data">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-pill bg-brand-teal" />
              Daily Steps
            </span>
            <span className="flex items-center gap-1.5 text-ink-500">
              <span className="w-4 h-0.5 bg-ink-300 border-dashed" />
              Target (5,000)
            </span>
          </div>
        </div>

        <div className="h-48 w-full">
          {stepsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stepsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
                />
                <YAxis
                  domain={[0, 9000]}
                  tick={{ fontSize: 11, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    border: "1px solid #B7C0D4",
                    fontFamily: "var(--font-data)",
                    fontSize: "12px",
                  }}
                />
                <ReferenceLine
                  y={5000}
                  stroke="#5B6B8C"
                  strokeDasharray="3 3"
                  label={{ value: "Daily Target", fill: "#5B6B8C", fontSize: 10 }}
                />
                <Line
                  type="monotone"
                  dataKey="steps"
                  stroke="#14B8A6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#14B8A6" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs font-body text-ink-500">
              Patient has not shared step count telemetry
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
