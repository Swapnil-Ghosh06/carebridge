/**
 * CareBridge Live Simulator Control Panel (Phase 4 / Aryan & Swapin)
 * ─────────────────────────────────────────────────────────
 * Real-time event injection for demo rehearsals and live pitch.
 *
 * Capabilities:
 *  - Patient picker (Ramesh Sharma, Anita S., Suresh P.)
 *  - Event buttons: Miss dose, BP spike, Steps drop, Recover, Fast-forward escalation, Reset demo
 *  - Live fired alert log with status chips
 *  - Direct links to open Patient, Doctor, and Family viewports
 *  - Optimistic client simulation fallback if backend API is not yet running
 */

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sliders,
  RotateCcw,
  AlertTriangle,
  Activity,
  Footprints,
  CheckCircle2,
  FastForward,
  ExternalLink,
  Shield,
  Stethoscope,
  Smartphone,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RiskBadge, type RiskBand } from "@/components/ui/RiskBadge";
import { AlertItem, type AlertLevel } from "@/components/ui/AlertItem";
import { Toast, type ToastType } from "@/components/ui/Toast";

interface PatientOption {
  id: string;
  name: string;
  age: number;
  conditions: string;
  currentBand: RiskBand;
  currentScore: number;
}

const defaultPatients: PatientOption[] = [
  {
    id: "p1",
    name: "Ramesh Sharma",
    age: 68,
    conditions: "Diabetes, Hypertension",
    currentBand: "amber",
    currentScore: 52,
  },
  {
    id: "p2",
    name: "Anita S.",
    age: 54,
    conditions: "Hypertension",
    currentBand: "amber",
    currentScore: 45,
  },
  {
    id: "p3",
    name: "Suresh P.",
    age: 48,
    conditions: "Type-2 Diabetes",
    currentBand: "green",
    currentScore: 18,
  },
];

interface SimLog {
  id: string;
  timestamp: string;
  level: AlertLevel;
  event: string;
  message: string;
}

export default function SimControlPage() {
  const [patients, setPatients] = React.useState<PatientOption[]>(defaultPatients);
  const [selectedPatientId, setSelectedPatientId] = React.useState<string>("p1");
  const [logs, setLogs] = React.useState<SimLog[]>([
    {
      id: "log-1",
      timestamp: "10:30 AM",
      level: "reminder",
      event: "Morning Schedule",
      message: "Scheduled morning dose Metformin 500mg (Ramesh Sharma).",
    },
  ]);
  const [toast, setToast] = React.useState<{
    type: ToastType;
    title: string;
    message: string;
  } | null>(null);
  const [loadingAction, setLoadingAction] = React.useState<string | null>(null);

  const activePatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0];

  const addLog = (level: AlertLevel, event: string, message: string) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLogs((prev) => [{ id: `log-${Date.now()}`, timestamp: time, level, event, message }, ...prev]);
  };

  const showToast = (type: ToastType, title: string, message: string) => {
    setToast({ type, title, message });
  };

  const handleSimEvent = async (eventType: string) => {
    setLoadingAction(eventType);

    try {
      // Attempt to dispatch to actual API endpoint
      const res = await fetch("/api/sim/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          eventType,
        }),
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        showToast("success", "Event Dispatched", data.message || `Dispatched ${eventType}`);
      } else {
        // Optimistic client-side local fallback simulation for demo resiliency
        if (eventType === "miss_dose") {
          setPatients((prev) =>
            prev.map((p) =>
              p.id === selectedPatientId
                ? { ...p, currentBand: "amber", currentScore: Math.min(68, p.currentScore + 18) }
                : p
            )
          );
          addLog(
            "family",
            "Missed Dose",
            `Missed evening dose of Metformin 500mg logged for ${activePatient.name}. Family notified.`
          );
          showToast(
            "warning",
            "Missed Dose Injected",
            `Ramesh Sharma missed Metformin. Escalation ladder triggered.`
          );
        } else if (eventType === "bp_spike") {
          setPatients((prev) =>
            prev.map((p) =>
              p.id === selectedPatientId
                ? { ...p, currentBand: "red", currentScore: 84 }
                : p
            )
          );
          addLog(
            "urgent",
            "BP Spike Escalation",
            `Critical systolic BP 155/95 mmHg recorded for ${activePatient.name}. Worsened to RED (Score: 84).`
          );
          showToast(
            "error",
            "Critical Clinical Flag",
            `${activePatient.name} flipped to RED. Doctor list re-sort triggered.`
          );
        } else if (eventType === "steps_drop") {
          setPatients((prev) =>
            prev.map((p) =>
              p.id === selectedPatientId
                ? { ...p, currentScore: Math.min(100, p.currentScore + 12) }
                : p
            )
          );
          addLog(
            "doctor",
            "Mobility Drop",
            `Daily step count dropped 45% below 14-day average for ${activePatient.name}.`
          );
          showToast("info", "Mobility Trend Injected", "Steps dropped 45% vs 14-day baseline.");
        } else if (eventType === "recover") {
          setPatients((prev) =>
            prev.map((p) =>
              p.id === selectedPatientId
                ? { ...p, currentBand: "green", currentScore: 22 }
                : p
            )
          );
          addLog(
            "reminder",
            "Vitals Stabilized",
            `Blood pressure returned to 120/80 mmHg; Metformin taken on schedule. Returned to GREEN.`
          );
          showToast("success", "Patient Recovered", `${activePatient.name} returned to LOW RISK (Score: 22).`);
        } else if (eventType === "fast_forward") {
          addLog(
            "urgent",
            "Fast-Forward Escalation",
            `Advanced escalation timer: Level 2 (Family ping) -> Level 3 (Doctor teleconsult alert).`
          );
          showToast("info", "Escalation Advanced", "Dispatched clinic notification to Dr. Meera Rao.");
        }
      }
    } catch {
      showToast("error", "Error", "Simulator event failed");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleReset = async () => {
    setLoadingAction("reset");
    try {
      await fetch("/api/sim/reset", { method: "POST" }).catch(() => null);
      setPatients(defaultPatients);
      setLogs([
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          level: "reminder",
          event: "Simulator Reset",
          message: "Demo state restored to initial baseline seed data.",
        },
      ]);
      showToast("success", "Simulator Reset", "Demo data restored to initial seed state.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--surface-50)] p-6 sm:p-10">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-6 right-6 z-50">
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* ── Top Header ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[var(--ink-300)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--ink-900)] text-[var(--surface-0)] flex items-center justify-center">
              <Sliders className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-2xl text-[var(--ink-900)]">
                Demo Event Simulator & Control Panel
              </h1>
              <p className="font-body text-xs text-[var(--ink-500)]">
                Phase 4 Demo Hardening • Trigger live escalations and score recalculations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              loading={loadingAction === "reset"}
              className="border-[var(--ink-300)] text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset Demo State
            </Button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--r-pill)] bg-[var(--risk-green-bg)] text-[var(--risk-green)] font-data text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Sim Active</span>
            </div>
          </div>
        </div>

        {/* ── Direct Portal Links ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/patient"
            target="_blank"
            className="flex items-center justify-between p-4 rounded-[var(--r-md)] bg-[var(--surface-0)] border border-[var(--ink-300)] shadow-sm hover:border-[var(--brand-teal)] hover:shadow transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--r-md)] bg-[var(--brand-teal)]/15 text-[var(--brand-teal-600)] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[var(--ink-900)] group-hover:text-[var(--brand-teal)]">
                  Patient Screen (P2/P3)
                </h4>
                <p className="font-body text-[11px] text-[var(--ink-500)]">
                  Ramesh Home & Voice Logging
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--ink-300)] group-hover:text-[var(--brand-teal)]" />
          </Link>

          <Link
            href="/doctor"
            target="_blank"
            className="flex items-center justify-between p-4 rounded-[var(--r-md)] bg-[var(--surface-0)] border border-[var(--ink-300)] shadow-sm hover:border-[var(--brand-indigo)] hover:shadow transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--r-md)] bg-[var(--brand-indigo)]/15 text-[var(--brand-indigo)] flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[var(--ink-900)] group-hover:text-[var(--brand-indigo)]">
                  Doctor Portal (D1/D2)
                </h4>
                <p className="font-body text-[11px] text-[var(--ink-500)]">
                  Queue, Flags & Pre-Consult Brief
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--ink-300)] group-hover:text-[var(--brand-indigo)]" />
          </Link>

          <Link
            href="/family"
            target="_blank"
            className="flex items-center justify-between p-4 rounded-[var(--r-md)] bg-[var(--surface-0)] border border-[var(--ink-300)] shadow-sm hover:border-[var(--blob-coral)] hover:shadow transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--r-md)] bg-[var(--blob-coral)]/15 text-[var(--blob-coral)] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[var(--ink-900)] group-hover:text-[var(--blob-coral)]">
                  Family Feed (F1/F2)
                </h4>
                <p className="font-body text-[11px] text-[var(--ink-500)]">
                  Alert Timeline & Check-in
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--ink-300)] group-hover:text-[var(--blob-coral)]" />
          </Link>
        </div>

        {/* ── Main Simulator Control Grid ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Patient Picker & Event Trigger Buttons */}
          <div className="lg:col-span-6 space-y-6">
            {/* Patient Picker Card */}
            <Card className="p-6">
              <h3 className="font-display font-bold text-base text-[var(--ink-900)] mb-3">
                1. Select Target Patient
              </h3>
              <div className="space-y-2.5">
                {patients.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatientId(p.id)}
                    className={`w-full text-left p-3.5 rounded-[var(--r-md)] border flex items-center justify-between transition-all ${
                      selectedPatientId === p.id
                        ? "border-[var(--brand-teal)] bg-[var(--surface-50)] shadow-sm"
                        : "border-[var(--ink-300)] hover:bg-[var(--surface-50)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-[var(--ink-900)]">
                          {p.name}
                        </span>
                        <span className="font-body text-xs text-[var(--ink-500)]">
                          ({p.age}y)
                        </span>
                        {p.id === "p1" && (
                          <span className="font-data text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--brand-teal)]/15 text-[var(--brand-teal-600)]">
                            DEMO HERO
                          </span>
                        )}
                      </div>
                      <p className="font-body text-xs text-[var(--ink-500)] mt-0.5">
                        {p.conditions}
                      </p>
                    </div>

                    <RiskBadge band={p.currentBand} score={p.currentScore} size="sm" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Event Injection Buttons */}
            <Card className="p-6">
              <h3 className="font-display font-bold text-base text-[var(--ink-900)] mb-1.5">
                2. Inject Clinical Scenario Events
              </h3>
              <p className="font-body text-xs text-[var(--ink-500)] mb-5">
                Simulate events against {activePatient.name} to demonstrate real-time risk transitions
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Event 1: Miss Dose */}
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleSimEvent("miss_dose")}
                  loading={loadingAction === "miss_dose"}
                  className="justify-start text-xs bg-[var(--risk-amber-bg)] text-[var(--ink-900)] border border-[var(--risk-amber)]/30 hover:bg-[var(--risk-amber-bg)]/80"
                >
                  <AlertTriangle className="w-4 h-4 text-[var(--risk-amber)] mr-2 shrink-0" />
                  <span>Miss Dose (Metformin)</span>
                </Button>

                {/* Event 2: BP Spike */}
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => handleSimEvent("bp_spike")}
                  loading={loadingAction === "bp_spike"}
                  className="justify-start text-xs shadow-sm"
                >
                  <Activity className="w-4 h-4 mr-2 shrink-0" />
                  <span>BP Spike (155/95) → RED</span>
                </Button>

                {/* Event 3: Steps Drop */}
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => handleSimEvent("steps_drop")}
                  loading={loadingAction === "steps_drop"}
                  className="justify-start text-xs"
                >
                  <Footprints className="w-4 h-4 text-[var(--ink-500)] mr-2 shrink-0" />
                  <span>Steps Drop (-45%)</span>
                </Button>

                {/* Event 4: Fast Forward */}
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => handleSimEvent("fast_forward")}
                  loading={loadingAction === "fast_forward"}
                  className="justify-start text-xs"
                >
                  <FastForward className="w-4 h-4 text-[var(--brand-indigo)] mr-2 shrink-0" />
                  <span>Fast-Forward Escalation</span>
                </Button>

                {/* Event 5: Recover */}
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleSimEvent("recover")}
                  loading={loadingAction === "recover"}
                  className="sm:col-span-2 justify-center text-xs mt-1"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2 shrink-0" />
                  <span>Log Recovery (Dose Taken + BP Normal) → GREEN</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Live Event & Alert Stream */}
          <div className="lg:col-span-6">
            <Card className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--ink-300)]">
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--ink-900)]">
                    Live Dispatched Alert Stream
                  </h3>
                  <p className="font-body text-xs text-[var(--ink-500)]">
                    Audit log of fired notifications and escalation steps
                  </p>
                </div>
                <span className="font-data text-xs font-bold text-[var(--ink-500)] bg-[var(--surface-100)] px-2.5 py-1 rounded-[var(--r-pill)]">
                  {logs.length} Events
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[520px] flex-1 pr-1">
                {logs.map((log) => (
                  <AlertItem
                    key={log.id}
                    level={log.level}
                    time={log.timestamp}
                    message={log.message}
                    actionLabel={log.level === "urgent" ? "Escalated" : undefined}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── Demo Script Quick Reference ──────────────────────── */}
        <Card variant="flat" className="p-6 border border-[var(--ink-300)]">
          <h3 className="font-display font-bold text-sm text-[var(--ink-900)] uppercase tracking-wider mb-2">
            Pitch Demo Sequence (2-Minute Walkthrough)
          </h3>
          <ol className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-body text-[var(--ink-700)]">
            <li className="bg-[var(--surface-0)] p-3 rounded-[var(--r-sm)] border border-[var(--surface-100)]">
              <strong className="font-display block text-[var(--ink-900)] mb-1">1. Patient Voice</strong>
              Log morning Metformin in Hindi via voice button.
            </li>
            <li className="bg-[var(--surface-0)] p-3 rounded-[var(--r-sm)] border border-[var(--surface-100)]">
              <strong className="font-display block text-[var(--ink-900)] mb-1">2. Inject Miss</strong>
              Click &quot;Miss Dose&quot; on Simulator.
            </li>
            <li className="bg-[var(--surface-0)] p-3 rounded-[var(--r-sm)] border border-[var(--surface-100)]">
              <strong className="font-display block text-[var(--ink-900)] mb-1">3. Family Ping</strong>
              Fast-forward to Level 2 family escalation alert.
            </li>
            <li className="bg-[var(--surface-0)] p-3 rounded-[var(--r-sm)] border border-[var(--surface-100)]">
              <strong className="font-display block text-[var(--ink-900)] mb-1">4. BP Spike</strong>
              Click &quot;BP Spike&quot; — Ramesh flips to RED and slides to top.
            </li>
            <li className="bg-[var(--surface-0)] p-3 rounded-[var(--r-sm)] border border-[var(--surface-100)]">
              <strong className="font-display block text-[var(--ink-900)] mb-1">5. Pre-Consult</strong>
              Open Why Flagged list + AI Pre-Consult Brief drawer.
            </li>
            <li className="bg-[var(--surface-0)] p-3 rounded-[var(--r-sm)] border border-[var(--surface-100)]">
              <strong className="font-display block text-[var(--ink-900)] mb-1">6. 1-Tap Action</strong>
              Tap &quot;Call patient&quot; — toast confirms outreach.
            </li>
          </ol>
        </Card>
      </div>
    </main>
  );
}
