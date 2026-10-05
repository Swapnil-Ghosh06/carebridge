"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Sparkles,
  FileText,
  AlertTriangle,
  History,
  ShieldCheck,
  User,
  Clock,
  Bell,
  RefreshCw,
} from "lucide-react";
import { PatientDetail, AuditLog } from "@/lib/types";
import { MOCK_PATIENT_DETAILS, MOCK_AUDIT_LOGS } from "@/lib/mockData";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ReasonList } from "@/components/ui/ReasonList";
import { Button } from "@/components/ui/Button";
import { ActionsBar } from "@/components/doctor/ActionsBar";
import { TrendCharts } from "@/components/doctor/TrendCharts";
import { MedicineLogTable } from "@/components/doctor/MedicineLogTable";
import { SharedDataPanel } from "@/components/doctor/SharedDataPanel";
import { BriefPanel } from "@/components/doctor/BriefPanel";
import { AuditRow } from "@/components/ui/AuditRow";

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = (params?.id as string) || "p1";

  const [detail, setDetail] = useState<PatientDetail | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeTab, setActiveTab] = useState<"clinical" | "audit">("clinical");
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPatientDetail = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/patients/${patientId}`);
      if (res.ok) {
        const data = await res.json();
        setDetail(data);
      } else {
        setDetail(MOCK_PATIENT_DETAILS[patientId] || MOCK_PATIENT_DETAILS["p1"]);
      }
    } catch {
      setDetail(MOCK_PATIENT_DETAILS[patientId] || MOCK_PATIENT_DETAILS["p1"]);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  const fetchAuditLogs = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/patients/${patientId}/audit`);
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      } else {
        setAuditLogs(MOCK_AUDIT_LOGS.filter((l) => l.patient_id === patientId));
      }
    } catch {
      setAuditLogs(MOCK_AUDIT_LOGS.filter((l) => l.patient_id === patientId));
    }
  }, [patientId]);

  useEffect(() => {
    setLoading(true);
    fetchPatientDetail();
    fetchAuditLogs();
  }, [fetchPatientDetail, fetchAuditLogs]);

  if (loading || !detail) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-ink-500 gap-2 font-display">
        <RefreshCw className="w-5 h-5 animate-spin text-brand-teal" />
        <span>Loading patient telemetry and risk data...</span>
      </div>
    );
  }

  const { profile, risk, vitals, medLogs, alerts, consents = [] } = detail;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Patient Profile Header Card */}
      <div className="bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-ink-300/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-pill bg-brand-indigo/10 text-brand-indigo font-display font-extrabold text-xl flex items-center justify-center shrink-0">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display font-bold text-2xl text-ink-900 leading-tight">
                  {profile.name}
                </h2>
                <RiskBadge band={risk.band} score={risk.score} size="md" />
              </div>
              <p className="font-body text-xs text-ink-500 mt-1 flex items-center gap-3">
                <span>Age: <strong className="text-ink-700 font-data">{profile.age}</strong></span>
                <span>•</span>
                <span>Language: <strong className="text-ink-700 font-data">{profile.language}</strong></span>
                <span>•</span>
                <span>ID: <strong className="text-ink-700 font-data">{profile.id}</strong></span>
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {profile.conditions.map((condition) => (
                  <span
                    key={condition}
                    className="font-data text-xs px-2.5 py-0.5 rounded-pill bg-ink-100 text-ink-700 font-semibold"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Pre-Consult Brief Trigger Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsBriefOpen(true)}
              className="gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-brand-mint" />
              <span>Pre-Consult Brief</span>
            </Button>
          </div>
        </div>

        {/* One-Tap Doctor Interventions Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-display font-bold text-xs uppercase text-ink-500 tracking-wider">
            Clinical Interventions:
          </span>
          <ActionsBar
            patientId={profile.id}
            patientName={profile.name}
            onActionTriggered={() => fetchAuditLogs()}
          />
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-3 border-b border-ink-300/30">
        <button
          onClick={() => setActiveTab("clinical")}
          className={`pb-3 px-2 font-display text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "clinical"
              ? "border-brand-teal text-brand-teal"
              : "border-transparent text-ink-500 hover:text-ink-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Clinical Telemetry & Flags</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`pb-3 px-2 font-display text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "audit"
              ? "border-brand-teal text-brand-teal"
              : "border-transparent text-ink-500 hover:text-ink-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>DPDP Consent & Access Log</span>
          <span className="font-data text-xs px-1.5 py-0.5 rounded-pill bg-ink-100 text-ink-700">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Clinical Telemetry & Risk */}
      {activeTab === "clinical" && (
        <div className="space-y-6">
          {/* Why Flagged Panel */}
          <div className="bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-ink-900 text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-risk-amber" />
                  <span>Clinical Risk Rationale (&ldquo;Why Flagged&rdquo;)</span>
                </h3>
                <p className="font-body text-xs text-ink-500">
                  Deterministic transparent rule triggers calculated from telemetry
                </p>
              </div>
              <div className="font-data text-xs text-ink-500">
                Total Risk Score: <strong className="text-ink-900 text-sm">{risk.score}/100</strong>
              </div>
            </div>
            <ReasonList reasons={risk.reasons} />
          </div>

          {/* Telemetry Charts: BP & Steps Trends */}
          <TrendCharts vitals={vitals} />

          {/* Medication Adherence Table */}
          <div className="bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-display font-bold text-ink-900 text-base">
                  Prescription & Adherence History
                </h4>
                <p className="font-body text-xs text-ink-500">
                  Recent dose confirmations captured via patient voice & tap interface
                </p>
              </div>
            </div>
            <MedicineLogTable logs={medLogs} />
          </div>

          {/* Alerts Timeline */}
          {alerts && alerts.length > 0 && (
            <div className="bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card">
              <h4 className="font-display font-bold text-ink-900 text-base mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-teal" />
                <span>Escalation Ladder Alerts History</span>
              </h4>
              <div className="space-y-2.5">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3.5 rounded-md bg-surface-50 border border-ink-300/30 flex items-start justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-data font-bold uppercase px-2 py-0.5 rounded-pill text-[10px] ${
                            alert.level === "doctor"
                              ? "bg-risk-red-bg text-risk-red"
                              : alert.level === "family"
                              ? "bg-risk-amber-bg text-risk-amber"
                              : "bg-surface-100 text-ink-700"
                          }`}
                        >
                          {alert.level} alert
                        </span>
                        <span className="font-body text-ink-500">
                          Target: {alert.audience}
                        </span>
                      </div>
                      <p className="font-body font-medium text-ink-900 text-sm">
                        {alert.message}
                      </p>
                    </div>
                    <span className="font-data text-ink-500 shrink-0">
                      {alert.created_at}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: DPDP Consent & Access Log */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <SharedDataPanel consents={consents} />

          <div className="bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-display font-bold text-ink-900 text-base flex items-center gap-2">
                  <History className="w-4 h-4 text-brand-teal" />
                  <span>Clinical Access Audit Trail</span>
                </h4>
                <p className="font-body text-xs text-ink-500">
                  Immutable record of patient telemetric data views by clinic staff
                </p>
              </div>
              <span className="font-data text-xs text-ink-500">
                DPDP Section 6 Compliance
              </span>
            </div>

            <div className="space-y-2.5">
              {auditLogs.length === 0 ? (
                <div className="p-8 text-center text-xs font-body text-ink-500">
                  No audit entries recorded yet
                </div>
              ) : (
                auditLogs.map((log) => <AuditRow key={log.id} log={log} />)
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pre-Consult Brief Drawer */}
      <BriefPanel
        patientId={profile.id}
        patientName={profile.name}
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
      />
    </div>
  );
}
