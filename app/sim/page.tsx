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
} from "lucide-react";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";

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
    <div className="min-h-screen bg-surface-50 text-ink-900 p-4 md:p-8 font-body">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between bg-surface-0 p-6 rounded-2xl border border-ink-300/40 shadow-card gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2 bg-brand-teal/10 rounded-xl text-brand-teal">
                <Activity className="w-6 h-6" />
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-ink-900">
                CareBridge Simulator Control Panel
              </h1>
            </div>
            <p className="text-sm text-ink-500 mt-1">
              Live event injector and time fast-forwarder for hackathon demo evaluation. (Simulated data)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/doctor"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-surface-100 hover:bg-surface-100/80 text-ink-700 transition"
              target="_blank"
            >
              Doctor Portal <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-surface-100 hover:bg-surface-100/80 text-ink-700 transition"
              target="_blank"
            >
              Admin ROI <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={resetDemo}
              disabled={loadingAction === "reset"}
              className="!py-2 !text-xs !min-h-0"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              {loadingAction === "reset" ? "Resetting..." : "Reset Demo"}
            </Button>
          </div>
        </header>

        {/* Patient Selection Tabs */}
        <div className="flex gap-2 border-b border-ink-300/40 pb-2">
          {patients.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                selectedId === p.id
                  ? "bg-brand-teal text-white shadow-sm"
                  : "bg-surface-0 text-ink-700 hover:bg-surface-100 border border-ink-300/30"
              }`}
            >
              <span>{p.name}</span>
              <span className="font-data text-xs px-2 py-0.5 rounded-full bg-black/10">
                {p.score} pts
              </span>
            </button>
          ))}
        </div>

        {/* Selected Patient Live Status Card */}
        {selectedPatient && (
          <div className="bg-surface-0 rounded-2xl p-6 border border-ink-300/40 shadow-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink-300/30 pb-4">
              <div>
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">
                  Target Demo Patient
                </span>
                <h2 className="text-2xl font-bold font-display text-ink-900 mt-0.5">
                  {selectedPatient.name} ({selectedPatient.age} yrs)
                </h2>
                <p className="text-sm text-ink-500 mt-1">
                  Active Flag: <span className="font-medium text-ink-700">{selectedPatient.topReason}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-ink-500 block">Risk Score</span>
                  <span className="text-3xl font-bold font-data text-ink-900">
                    {selectedPatient.score}
                  </span>
                </div>
                <RiskBadge band={selectedPatient.band} score={selectedPatient.score} />
              </div>
            </div>

            {/* Action Buttons Matrix */}
            <div className="mt-6">
              <h3 className="text-xs font-bold text-ink-500 uppercase tracking-wider mb-3">
                Inject Telemetry Events (Simulated)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => triggerEvent("miss_dose")}
                  disabled={loadingAction === "miss_dose"}
                  className="flex items-center gap-3 p-4 rounded-xl border border-risk-amber/40 bg-risk-amber-bg/40 hover:bg-risk-amber-bg text-left transition"
                >
                  <Pill className="w-5 h-5 text-risk-amber flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm font-display text-ink-900">1. Miss Dose</div>
                    <div className="text-xs text-ink-500">Inject missed Metformin dose</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerEvent("bp_spike")}
                  disabled={loadingAction === "bp_spike"}
                  className="flex items-center gap-3 p-4 rounded-xl border border-risk-red/40 bg-risk-red-bg/40 hover:bg-risk-red-bg text-left transition"
                >
                  <HeartPulse className="w-5 h-5 text-risk-red flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm font-display text-ink-900">2. BP Spike</div>
                    <div className="text-xs text-ink-500">Inject 156/98 mmHg (Critical)</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerEvent("steps_drop")}
                  disabled={loadingAction === "steps_drop"}
                  className="flex items-center gap-3 p-4 rounded-xl border border-ink-300/50 bg-surface-50 hover:bg-surface-100 text-left transition"
                >
                  <TrendingDown className="w-5 h-5 text-ink-700 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm font-display text-ink-900">3. Steps Drop</div>
                    <div className="text-xs text-ink-500">Simulate reduced walking</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerEvent("recover")}
                  disabled={loadingAction === "recover"}
                  className="flex items-center gap-3 p-4 rounded-xl border border-risk-green/40 bg-risk-green-bg/40 hover:bg-risk-green-bg text-left transition"
                >
                  <CheckCircle2 className="w-5 h-5 text-risk-green flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm font-display text-ink-900">4. Recover</div>
                    <div className="text-xs text-ink-500">Restore normal vitals</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Escalation Ladder Controls */}
            <div className="mt-6 pt-6 border-t border-ink-300/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-ink-500 uppercase tracking-wider block">
                  Escalation Ladder (Demo Mode: 10s Family, 25s Doctor)
                </span>
                <p className="text-xs text-ink-500 mt-0.5">
                  Simulates missed dose escalation alerts without waiting hours.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-medium text-ink-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoTick}
                    onChange={(e) => setAutoTick(e.target.checked)}
                    className="rounded border-ink-300 text-brand-teal focus:ring-brand-teal"
                  />
                  Auto-tick (5s)
                </label>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={fastForwardEscalation}
                  disabled={loadingAction === "ff"}
                  className="!py-2 !text-xs !min-h-0"
                >
                  <FastForward className="w-3.5 h-3.5 mr-1" />
                  Fast-Forward to Doctor
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Live Alerts & Event Log */}
        <div className="bg-surface-0 rounded-2xl p-6 border border-ink-300/40 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-teal" />
              <h3 className="text-sm font-bold font-display uppercase tracking-wider text-ink-900">
                Live Simulator & Escalation Timeline
              </h3>
            </div>
            <span className="text-xs text-ink-500">Showing last {logs.length} events</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-sm text-ink-500">
                Ready for simulation. Click an event button above to inject telemetry.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-3 rounded-xl border border-ink-300/30 bg-surface-50 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    {log.level === "doctor" ? (
                      <ShieldAlert className="w-4 h-4 text-risk-red mt-0.5 flex-shrink-0" />
                    ) : log.level === "family" ? (
                      <AlertTriangle className="w-4 h-4 text-risk-amber mt-0.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-brand-teal mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold text-ink-900 mr-2">{log.message}</span>
                      <span className="text-[11px] text-ink-500 font-data uppercase">
                        [{log.level}]
                      </span>
                    </div>
                  </div>
                  <span className="font-data text-ink-500 whitespace-nowrap ml-4">{log.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
