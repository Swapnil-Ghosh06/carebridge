"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  FastForward,
  TrendingDown,
  HeartPulse,
  Pill,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Clock,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";
import { DoodleDaisy, DoodleHandPress } from "@/components/ui/Doodles";

interface PatientSummary {
  id: string;
  name: string;
  age: number;
  score: number;
  band: "green" | "yellow" | "red";
  topReason: string;
}

interface AlertLogItem {
  id: string;
  time: string;
  level: "reminder" | "family" | "doctor";
  message: string;
}

export default function SimulatorPage() {
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string>("p1");
  const [logs, setLogs] = useState<AlertLogItem[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [autoTick, setAutoTick] = useState<boolean>(true);

  // Fetch current patients status
  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/patients");
      if (res.ok) {
        const data = await res.json();
        setPatients(data);
      }
    } catch {
      // Ignore network errors
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // Automatic escalation tick in demo mode
  useEffect(() => {
    if (!autoTick) return;
    const tickInterval = setInterval(async () => {
      try {
        const res = await fetch("/api/escalation/tick", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          if (data.fired && data.fired.length > 0) {
            const newEntries: AlertLogItem[] = data.fired.map((a: any) => ({
              id: a.id,
              time: new Date().toLocaleTimeString(),
              level: a.level,
              message: a.message,
            }));
            setLogs((prev) => [...newEntries, ...prev].slice(0, 30));
            fetchStatus();
          }
        }
      } catch {
        // Ignore background polling errors
      }
    }, 5000);

    return () => clearInterval(tickInterval);
  }, [autoTick]);

  const triggerEvent = async (kind: "miss_dose" | "bp_spike" | "steps_drop" | "recover") => {
    setLoadingAction(kind);
    try {
      const res = await fetch("/api/sim/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: selectedId, kind }),
      });
      if (res.ok) {
        const data = await res.json();
        setLogs((prev) => [
          {
            id: `log-${Date.now()}`,
            time: new Date().toLocaleTimeString(),
            level: data.newRisk.band === "red" ? "doctor" : "reminder",
            message: data.message,
          },
          ...prev,
        ]);
        await fetchStatus();
      }
    } catch {
      // Ignore errors
    } finally {
      setLoadingAction(null);
    }
  };

  const fastForwardEscalation = async () => {
    setLoadingAction("ff");
    try {
      const res = await fetch("/api/escalation/tick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forceStage: "doctor" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.fired) {
          const newEntries: AlertLogItem[] = data.fired.map((a: any) => ({
            id: a.id,
            time: new Date().toLocaleTimeString(),
            level: a.level,
            message: `[FAST-FORWARD] ${a.message}`,
          }));
          setLogs((prev) => [...newEntries, ...prev]);
        }
        await fetchStatus();
      }
    } catch {
      // Ignore errors
    } finally {
      setLoadingAction(null);
    }
  };

  const resetDemo = async () => {
    setLoadingAction("reset");
    try {
      const res = await fetch("/api/sim/reset", { method: "POST" });
      if (res.ok) {
        setLogs((prev) => [
          {
            id: `log-${Date.now()}`,
            time: new Date().toLocaleTimeString(),
            level: "reminder",
            message: "Simulation reset to baseline seed state.",
          },
          ...prev,
        ]);
        await fetchStatus();
      }
    } catch {
      // Ignore errors
    } finally {
      setLoadingAction(null);
    }
  };

  const selectedPatient = patients.find((p) => p.id === selectedId) || patients[0];

  return (
    <div className="min-h-screen bg-grid-paper text-ink-900 p-4 md:p-8 font-sans selection:bg-[#FEE159]">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Breadcrumb & Return to Home */}
        <div className="flex items-center justify-between font-mono text-xs font-bold">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-ink-900 shadow-[2px_2px_0px_#121214] hover:shadow-[3px_3px_0px_#121214] transition-all"
          >
            <DoodleDaisy size={14} />
            <span>← CareBridge Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>CRCE Hackathon Judge Panel</span>
          </div>
        </div>

        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 md:p-8 rounded-3xl border-2 border-ink-900 shadow-[5px_5px_0px_#121214] gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#FEE159] border-2 border-ink-900 flex items-center justify-center shadow-[2px_2px_0px_#121214]">
                <Sliders className="w-6 h-6 text-ink-900 stroke-[2.2]" />
              </span>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-500 bg-[#EDE9FE] px-2.5 py-0.5 rounded border border-ink-900">
                  Interactive Sandbox
                </span>
                <h1 className="text-2xl md:text-3xl font-black font-serif tracking-tight text-ink-900 mt-1">
                  Simulator Control Panel
                </h1>
              </div>
            </div>
            <p className="font-mono text-xs text-ink-600 mt-2 max-w-xl">
              Inject telemetry events and fast-forward escalation stages to evaluate real-time deterministic triage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
            <Link
              href="/doctor"
              className="inline-flex items-center gap-1.5 px-4 py-2 font-bold rounded-full bg-[#EDE9FE] hover:bg-[#DDD6FE] text-ink-900 border-2 border-ink-900 shadow-[2px_2px_0px_#121214] transition"
              target="_blank"
            >
              Doctor Cockpit <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 font-bold rounded-full bg-[#D4F77C] hover:bg-[#C8F35C] text-ink-900 border-2 border-ink-900 shadow-[2px_2px_0px_#121214] transition"
              target="_blank"
            >
              Admin ROI <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={resetDemo}
              disabled={loadingAction === "reset"}
              className="inline-flex items-center gap-1.5 px-4 py-2 font-bold rounded-full bg-[#FEE2E2] hover:bg-[#FECACA] text-red-900 border-2 border-ink-900 shadow-[2px_2px_0px_#121214] active:translate-y-0.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{loadingAction === "reset" ? "Resetting..." : "Reset Demo"}</span>
            </button>
          </div>
        </header>

        {/* Patient Selection Tabs */}
        <div className="flex flex-wrap gap-2.5">
          {patients.map((p) => {
            const isSelected = selectedId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold border-2 border-ink-900 transition cursor-pointer ${
                  isSelected
                    ? "bg-[#D4F77C] text-ink-900 shadow-[3px_3px_0px_#121214] -translate-y-0.5"
                    : "bg-white text-ink-700 hover:bg-[#FAF8F5] shadow-[2px_2px_0px_#121214]"
                }`}
              >
                <span>{p.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border border-ink-900 ${
                    p.band === "red"
                      ? "bg-red-200 text-red-900"
                      : p.band === "green"
                      ? "bg-emerald-200 text-emerald-900"
                      : "bg-amber-200 text-amber-900"
                  }`}
                >
                  {p.score} pts
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Patient Live Status Card */}
        {selectedPatient && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-ink-900 shadow-[5px_5px_0px_#121214]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-ink-900 pb-5">
              <div>
                <span className="font-mono text-[10px] font-bold text-ink-500 uppercase tracking-wider bg-[#FEE159] px-2.5 py-0.5 rounded border border-ink-900">
                  Target Simulated Patient
                </span>
                <h2 className="text-2xl md:text-3xl font-black font-serif text-ink-900 mt-2">
                  {selectedPatient.name} ({selectedPatient.age} yrs)
                </h2>
                <p className="font-mono text-xs text-ink-600 mt-1">
                  Active Clinical Reason: <span className="font-bold text-ink-900">{selectedPatient.topReason}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-mono text-[10px] uppercase font-bold text-ink-500 block">
                    Calculated Risk Score
                  </span>
                  <span className="text-3xl font-black font-mono text-ink-900">
                    {selectedPatient.score} <span className="text-sm font-normal text-ink-500">/ 100</span>
                  </span>
                </div>
                <RiskBadge band={selectedPatient.band} score={selectedPatient.score} size="lg" />
              </div>
            </div>

            {/* Action Buttons Matrix */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono text-xs font-bold text-ink-700 uppercase tracking-wider">
                  Inject Simulated Telemetry Events
                </h3>
                <span className="font-mono text-[10px] text-ink-500">One tap injects live data</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Miss Dose */}
                <button
                  onClick={() => triggerEvent("miss_dose")}
                  disabled={loadingAction === "miss_dose"}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-ink-900 bg-[#FEF3C7] hover:bg-[#FDE68A] shadow-[3px_3px_0px_#121214] hover:shadow-[4px_4px_0px_#121214] text-left transition cursor-pointer active:translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink-900 flex items-center justify-center shrink-0">
                    <Pill className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="font-bold text-xs font-mono text-ink-900">1. Miss Dose</div>
                    <div className="font-sans text-[11px] text-ink-600 mt-0.5">Skip Metformin dose</div>
                  </div>
                </button>

                {/* 2. BP Spike */}
                <button
                  onClick={() => triggerEvent("bp_spike")}
                  disabled={loadingAction === "bp_spike"}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-ink-900 bg-[#FEE2E2] hover:bg-[#FECACA] shadow-[3px_3px_0px_#121214] hover:shadow-[4px_4px_0px_#121214] text-left transition cursor-pointer active:translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink-900 flex items-center justify-center shrink-0">
                    <HeartPulse className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xs font-mono text-ink-900">2. BP Spike</div>
                    <div className="font-sans text-[11px] text-ink-600 mt-0.5">156/98 mmHg (Critical)</div>
                  </div>
                </button>

                {/* 3. Steps Drop */}
                <button
                  onClick={() => triggerEvent("steps_drop")}
                  disabled={loadingAction === "steps_drop"}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-ink-900 bg-[#EDE9FE] hover:bg-[#DDD6FE] shadow-[3px_3px_0px_#121214] hover:shadow-[4px_4px_0px_#121214] text-left transition cursor-pointer active:translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink-900 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5 text-indigo-700" />
                  </div>
                  <div>
                    <div className="font-bold text-xs font-mono text-ink-900">3. Steps Drop</div>
                    <div className="font-sans text-[11px] text-ink-600 mt-0.5">Passive wearable -52%</div>
                  </div>
                </button>

                {/* 4. Recover */}
                <button
                  onClick={() => triggerEvent("recover")}
                  disabled={loadingAction === "recover"}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-ink-900 bg-[#DCFCE7] hover:bg-[#BBF7D0] shadow-[3px_3px_0px_#121214] hover:shadow-[4px_4px_0px_#121214] text-left transition cursor-pointer active:translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink-900 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-bold text-xs font-mono text-ink-900">4. Recover</div>
                    <div className="font-sans text-[11px] text-ink-600 mt-0.5">Log med & restore baseline</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Escalation Ladder Controls */}
            <div className="mt-8 pt-6 border-t-2 border-ink-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-ink-700 uppercase tracking-wider block">
                  3-Stage Escalation Ladder (Judge Demo Acceleration)
                </span>
                <p className="font-mono text-xs text-ink-500 mt-0.5">
                  Stage 1: Patient Voice → Stage 2: Family WhatsApp (10s) → Stage 3: Doctor Alert (25s)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 font-mono text-xs font-bold text-ink-700 cursor-pointer bg-[#FBF9F4] px-3 py-2 rounded-xl border border-ink-900">
                  <input
                    type="checkbox"
                    checked={autoTick}
                    onChange={(e) => setAutoTick(e.target.checked)}
                    className="rounded border-ink-900 text-ink-900"
                  />
                  <span>Auto-tick (5s)</span>
                </label>

                <button
                  onClick={fastForwardEscalation}
                  disabled={loadingAction === "ff"}
                  className="bg-[#D4F77C] text-ink-900 font-mono text-xs font-bold px-4 py-2 rounded-xl border-2 border-ink-900 shadow-[2px_2px_0px_#121214] hover:shadow-[3px_3px_0px_#121214] active:translate-y-0.5 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Fast-Forward to Doctor Alert</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Alerts & Event Log */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-ink-900 shadow-[5px_5px_0px_#121214]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-ink-900">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-ink-700" />
              <h3 className="font-serif font-black text-lg text-ink-900">
                Live Simulator & Escalation Timeline
              </h3>
            </div>
            <span className="font-mono text-xs text-ink-500 font-bold">
              Showing last {logs.length} events
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-8 font-mono text-xs text-ink-500">
                Ready for simulation. Click an event button above to inject telemetry.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3.5 rounded-xl border-2 border-ink-900 bg-[#FAF8F5] shadow-[2px_2px_0px_#121214] font-mono text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    {log.level === "doctor" ? (
                      <ShieldAlert className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    ) : log.level === "family" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold text-ink-900 mr-2">{log.message}</span>
                      <span className="text-[10px] text-ink-500 uppercase px-1.5 py-0.5 rounded bg-white border border-ink-300">
                        [{log.level}]
                      </span>
                    </div>
                  </div>
                  <span className="text-ink-500 whitespace-nowrap ml-4 font-bold">{log.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
