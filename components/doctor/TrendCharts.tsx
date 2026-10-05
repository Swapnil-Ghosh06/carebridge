"use client";

import React, { useState } from "react";
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
import { Watch, AlertTriangle, ShieldCheck, Heart, Footprints } from "lucide-react";
import { Vital } from "@/lib/types";
import { analyzeWearableTelemetry } from "@/lib/wearable/ingester";

interface TrendChartsProps {
  vitals: Vital[];
}

export const TrendCharts: React.FC<TrendChartsProps> = ({ vitals }) => {
  const [activeView, setActiveView] = useState<"cardio" | "wearable">("cardio");

  // Extract BP and Heart Rate data
  const bpVitals = vitals.filter((v) => v.type === "bp");
  const cardioData = bpVitals.map((v, idx) => {
    // Nocturnal HR spike simulation for Days 5-7 (104-112 bpm)
    const nocturnalHr = idx >= 4 ? 104 + (idx - 4) * 4 : 64 + (idx % 3) * 3;
    return {
      name: v.recorded_at,
      systolic: v.value_a,
      diastolic: v.value_b || 80,
      nocturnalHr,
    };
  });

  // Extract Steps data
  const stepsVitals = vitals.filter((v) => v.type === "steps");
  const stepsData = stepsVitals.map((v) => ({
    name: v.recorded_at,
    steps: v.value_a,
  }));

  const wearableAnalysis = analyzeWearableTelemetry(vitals);

  return (
    <div className="space-y-6">
      {/* Smartwatch Anomaly Strip */}
      {wearableAnalysis.anomalies.length > 0 && (
        <div className="bg-risk-amber-bg/40 border border-risk-amber/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Watch className="w-4 h-4 text-risk-amber" />
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-risk-amber">
                Smartwatch Biometric Anomalies Detected
              </h5>
            </div>
            <span className="font-data text-[11px] font-semibold text-ink-500">
              Apple Watch / WearOS Sync
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
            {wearableAnalysis.anomalies.map((anom, idx) => (
              <div
                key={idx}
                className="bg-surface-0 p-3 rounded-md border border-risk-amber/30 text-xs font-body"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-ink-900">{anom.title}</span>
                  <span className="font-data font-bold text-[10px] px-1.5 py-0.2 rounded bg-risk-amber-bg text-risk-amber">
                    {anom.severity}
                  </span>
                </div>
                <p className="text-ink-700 leading-relaxed text-[11px]">
                  {anom.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chart Switcher */}
      <div className="bg-surface-0 p-5 rounded-lg border border-ink-300/30 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="font-display font-bold text-ink-900 text-base">
              Clinical Telemetry &amp; Sensor Streams
            </h4>
            <p className="font-body text-xs text-ink-500">
              Continuous 7-day monitoring: BP, Nocturnal PPG Heart Rate, and Mobility
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-surface-100 rounded-pill font-display text-xs font-semibold">
            <button
              onClick={() => setActiveView("cardio")}
              className={`px-3 py-1 rounded-pill transition-colors flex items-center gap-1.5 ${
                activeView === "cardio"
                  ? "bg-surface-0 text-ink-900 shadow-xs"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-brand-teal" />
              <span>Blood Pressure &amp; HR</span>
            </button>
            <button
              onClick={() => setActiveView("wearable")}
              className={`px-3 py-1 rounded-pill transition-colors flex items-center gap-1.5 ${
                activeView === "wearable"
                  ? "bg-surface-0 text-ink-900 shadow-xs"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              <Watch className="w-3.5 h-3.5 text-brand-indigo" />
              <span>Smartwatch Pedometer</span>
            </button>
          </div>
        </div>

        {/* View 1: Blood Pressure & Nocturnal HR */}
        {activeView === "cardio" && (
          <div>
            <div className="flex flex-wrap items-center justify-between text-xs font-data mb-3 pb-2 border-b border-ink-300/20">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-pill bg-brand-teal" />
                  Systolic (mmHg)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-pill bg-brand-indigo" />
                  Diastolic (mmHg)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-pill bg-risk-amber" />
                  Nocturnal HR (bpm)
                </span>
              </div>
              <span className="text-risk-red flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-risk-red border-dashed" />
                Hypertension Stage 2 Threshold (140)
              </span>
            </div>

            <div className="h-64 w-full">
              {cardioData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cardioData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
                    />
                    <YAxis
                      domain={[50, 180]}
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
                      label={{ value: "Max Safe Systolic", fill: "#E5484D", fontSize: 10 }}
                    />
                    <ReferenceLine
                      y={100}
                      stroke="#F5A524"
                      strokeDasharray="3 3"
                      label={{ value: "Nocturnal HR Alert", fill: "#F5A524", fontSize: 10 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="#14B8A6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#14B8A6" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#4B3FB8"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#4B3FB8" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="nocturnalHr"
                      stroke="#F5A524"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3, fill: "#F5A524" }}
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
        )}

        {/* View 2: Smartwatch Pedometer */}
        {activeView === "wearable" && (
          <div>
            <div className="flex items-center justify-between text-xs font-data mb-3 pb-2 border-b border-ink-300/20">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-pill bg-brand-teal" />
                Daily Walking Steps
              </span>
              <span className="text-ink-500 flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-ink-300 border-dashed" />
                Prescribed Target (5,000 steps)
              </span>
            </div>

            <div className="h-64 w-full">
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
                      label={{ value: "Prescribed Target", fill: "#5B6B8C", fontSize: 10 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="steps"
                      stroke="#14B8A6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#14B8A6" }}
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
        )}
      </div>
    </div>
  );
};
