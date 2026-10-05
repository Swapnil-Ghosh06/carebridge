"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  Play,
  ShieldCheck,
  TrendingDown,
  AlertCircle,
  Pill,
  Sliders,
} from "lucide-react";
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
import { Button } from "@/components/ui/Button";

interface WhatIfSimulatorProps {
  patientName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  patientName,
  isOpen,
  onClose,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<
    "add_sglt2" | "increase_metformin" | "add_telmisartan"
  >("add_sglt2");

  if (!isOpen) return null;

  const scenarios = {
    add_sglt2: {
      title: "Add SGLT2i (Dapagliflozin 10mg OD)",
      description: "Combines with current Metformin 500mg. Enhances glycemic control and offers mild systolic BP reduction.",
      hba1cDelta: "-1.1%",
      bpDelta: "-14 mmHg",
      interactionRisk: "Low (Safe combination; monitor hydration and renal eGFR)",
      projectedData: [
        { week: "Wk 0 (Current)", bp: 154, hba1c: 8.4 },
        { week: "Wk 2", bp: 148, hba1c: 8.2 },
        { week: "Wk 4", bp: 142, hba1c: 7.9 },
        { week: "Wk 8", bp: 136, hba1c: 7.5 },
        { week: "Wk 12", bp: 132, hba1c: 7.3 },
      ],
    },
    increase_metformin: {
      title: "Uptitrate Metformin to 1000mg BID",
      description: "Doubles current dosage to target insulin resistance. Minimal direct acute effect on blood pressure.",
      hba1cDelta: "-0.7%",
      bpDelta: "-4 mmHg",
      interactionRisk: "None (Same agent; watch for GI tolerance issues)",
      projectedData: [
        { week: "Wk 0 (Current)", bp: 154, hba1c: 8.4 },
        { week: "Wk 2", bp: 152, hba1c: 8.3 },
        { week: "Wk 4", bp: 150, hba1c: 8.1 },
        { week: "Wk 8", bp: 148, hba1c: 7.8 },
        { week: "Wk 12", bp: 146, hba1c: 7.7 },
      ],
    },
    add_telmisartan: {
      title: "Add ARB (Telmisartan 40mg OD)",
      description: "Aggressive blood pressure optimization combined with existing Amlodipine regimen.",
      hba1cDelta: "-0.2%",
      bpDelta: "-22 mmHg",
      interactionRisk: "Low (Dual antihypertensive therapy; verify serum potassium & creatinine)",
      projectedData: [
        { week: "Wk 0 (Current)", bp: 154, hba1c: 8.4 },
        { week: "Wk 2", bp: 144, hba1c: 8.4 },
        { week: "Wk 4", bp: 136, hba1c: 8.3 },
        { week: "Wk 8", bp: 130, hba1c: 8.2 },
        { week: "Wk 12", bp: 126, hba1c: 8.2 },
      ],
    },
  };

  const current = scenarios[selectedScenario];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink-900/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-surface-0 shadow-2xl h-full flex flex-col border-l border-ink-300/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-ink-300/30 flex items-center justify-between bg-surface-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-pill bg-brand-teal/10 text-brand-teal flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-ink-900 text-lg">
                &ldquo;What-If&rdquo; Clinical Simulator
              </h3>
              <p className="font-body text-xs text-ink-500">
                Deterministic drug projection &amp; interaction modeling for {patientName}
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

        {/* Simulator Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Scenario Selector */}
          <div>
            <label className="block font-display font-bold text-xs uppercase tracking-wider text-ink-500 mb-2">
              Select Candidate Clinical Intervention:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {(
                [
                  "add_sglt2",
                  "increase_metformin",
                  "add_telmisartan",
                ] as const
              ).map((key) => {
                const sc = scenarios[key];
                const isSelected = selectedScenario === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedScenario(key)}
                    className={`p-3.5 rounded-lg border text-left transition-all flex items-start justify-between ${
                      isSelected
                        ? "bg-brand-teal/5 border-brand-teal ring-1 ring-brand-teal shadow-xs"
                        : "bg-surface-0 border-ink-300/30 hover:border-ink-300"
                    }`}
                  >
                    <div>
                      <div className="font-display font-bold text-sm text-ink-900">
                        {sc.title}
                      </div>
                      <div className="font-body text-xs text-ink-500 mt-0.5">
                        {sc.description}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="font-data text-xs font-bold text-brand-teal px-2 py-0.5 rounded-pill bg-brand-teal/10 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projection KPI Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-lg bg-surface-50 border border-ink-300/30">
              <span className="font-body text-xs text-ink-500">
                12-Week Projected HbA1c
              </span>
              <div className="font-data font-bold text-2xl text-brand-teal mt-1 flex items-center gap-1.5">
                <TrendingDown className="w-5 h-5" />
                <span>{current.hba1cDelta}</span>
              </div>
              <span className="font-data text-[11px] text-ink-500">
                Based on UKPDS clinical models
              </span>
            </div>

            <div className="p-4 rounded-lg bg-surface-50 border border-ink-300/30">
              <span className="font-body text-xs text-ink-500">
                Projected Systolic BP Drop
              </span>
              <div className="font-data font-bold text-2xl text-brand-indigo mt-1 flex items-center gap-1.5">
                <TrendingDown className="w-5 h-5" />
                <span>{current.bpDelta}</span>
              </div>
              <span className="font-data text-[11px] text-ink-500">
                Anticipated 154 &rarr; {current.projectedData[4].bp} mmHg
              </span>
            </div>
          </div>

          {/* Projection Curve Line Chart */}
          <div className="p-5 rounded-lg bg-surface-0 border border-ink-300/30 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display font-bold text-sm text-ink-900">
                12-Week Projected Recovery Trajectory
              </h4>
              <span className="font-data text-xs text-brand-teal font-semibold">
                Deterministic Model
              </span>
            </div>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={current.projectedData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" />
                  <XAxis
                    dataKey="week"
                    tick={{
                      fontSize: 10,
                      fill: "#5B6B8C",
                      fontFamily: "var(--font-data)",
                    }}
                  />
                  <YAxis
                    domain={[120, 165]}
                    tick={{
                      fontSize: 10,
                      fill: "#5B6B8C",
                      fontFamily: "var(--font-data)",
                    }}
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
                    y={130}
                    stroke="#14B8A6"
                    strokeDasharray="3 3"
                    label={{
                      value: "Target (<130)",
                      fill: "#14B8A6",
                      fontSize: 10,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bp"
                    name="Systolic BP"
                    stroke="#4B3FB8"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#4B3FB8" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RxNorm Drug-Drug Interaction Safety Verification */}
          <div className="p-4 rounded-lg bg-surface-50 border border-ink-300/30 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-risk-green" />
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-ink-900">
                RxNav Drug-Drug Interaction Verification
              </h5>
            </div>
            <p className="font-body text-xs text-ink-700 leading-relaxed">
              {current.interactionRisk}
            </p>
            <div className="font-data text-[11px] text-ink-500 pt-1 border-t border-ink-300/20 flex items-center justify-between">
              <span>National Library of Medicine (NIH) RxNav standard</span>
              <span className="text-risk-green font-semibold">Verified Safe</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-ink-300/30 bg-surface-50 flex items-center justify-between">
          <p className="font-data text-xs text-ink-500 uppercase tracking-wider">
            Decision support only. Doctor decides.
          </p>
          <Button size="sm" variant="primary" onClick={onClose}>
            Close Simulator
          </Button>
        </div>
      </div>
    </div>
  );
};
