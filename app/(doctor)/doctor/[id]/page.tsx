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
  Sliders,
  FileCode2,
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
import { WhatIfSimulator } from "@/components/doctor/WhatIfSimulator";
import { FhirExportDrawer } from "@/components/doctor/FhirExportDrawer";
import { AuditRow } from "@/components/ui/AuditRow";

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = (params?.id as string) || "p1";

  const [detail, setDetail] = useState<PatientDetail | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeTab, setActiveTab] = useState<"clinical" | "audit">("clinical");
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [isFhirOpen, setIsFhirOpen] = useState(false);
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink-900 shadow-[5px_5px_0px_#121214]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-ink-900">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FEE159] border-2 border-ink-900 text-ink-900 font-serif font-black text-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#121214]">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-ink-900 leading-tight">
                  {profile.name}
                </h2>
                <RiskBadge band={risk.band} score={risk.score} size="md" />
              </div>
              <p className="font-mono text-xs text-ink-500 mt-1.5 flex flex-wrap items-center gap-2">
                <span>Age: <strong className="text-ink-900">{profile.age}</strong></span>
                <span>•</span>
                <span>Language: <strong className="text-ink-900">{profile.language}</strong></span>
                <span>•</span>
                <span>ID: <strong className="text-ink-900">{profile.id}</strong></span>
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {profile.conditions.map((condition) => (
                  <span
                    key={condition}
                    className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#EDE9FE] border border-ink-900 text-ink-900 font-bold"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical Decision Support Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsBriefOpen(true)}
              className="gap-2 bg-[#D4F77C] text-ink-900 border-2 border-ink-900 shadow-[2px_2px_0px_#121214]"
            >
              <Sparkles className="w-4 h-4 text-ink-900" />
              <span>Pre-Consult Brief</span>
            </Button>

            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsWhatIfOpen(true)}
              className="gap-2 bg-white text-ink-900 border-2 border-ink-900 shadow-[2px_2px_0px_#121214]"
            >
              <Sliders className="w-4 h-4 text-ink-900" />
              <span>&ldquo;What-If&rdquo; Simulator</span>
            </Button>
          </div>
        </div>

        {/* One-Tap Doctor Interventions Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-mono font-bold text-xs uppercase text-ink-700 tracking-wider">
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
      <div className="flex items-center gap-2 font-mono text-xs font-bold">
        <button
          onClick={() => setActiveTab("clinical")}
          className={`px-4 py-2 rounded-full border-2 border-ink-900 flex items-center gap-2 transition cursor-pointer ${
            activeTab === "clinical"
              ? "bg-[#D4F77C] text-ink-900 shadow-[2px_2px_0px_#121214]"
              : "bg-white text-ink-700 hover:bg-[#FAF8F5]"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Clinical Telemetry & Flags</span>
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`px-4 py-2 rounded-full border-2 border-ink-900 flex items-center gap-2 transition cursor-pointer ${
            activeTab === "audit"
              ? "bg-[#D4F77C] text-ink-900 shadow-[2px_2px_0px_#121214]"
              : "bg-white text-ink-700 hover:bg-[#FAF8F5]"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>DPDP Consent & Access Log</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-ink-900 text-white">
            {auditLogs.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Clinical Telemetry & Risk */}
      {activeTab === "clinical" && (
        <div className="space-y-6">
          {/* Why Flagged Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink-900 shadow-[5px_5px_0px_#121214]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-ink-900">
              <div>
                <h3 className="font-serif font-black text-ink-900 text-xl flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>Clinical Risk Rationale (&ldquo;Why Flagged&rdquo;)</span>
                </h3>
                <p className="font-mono text-xs text-ink-500 mt-0.5">
                  Deterministic transparent rule triggers calculated from telemetry
                </p>
              </div>
              <div className="font-mono text-xs text-ink-600 font-bold">
                Total Risk Score: <strong className="text-ink-900 text-sm">{risk.score}/100</strong>
              </div>
            </div>
            <ReasonList reasons={risk.reasons} />
          </div>

          {/* Telemetry Charts: BP & Steps Trends */}
          <TrendCharts vitals={vitals} />

          {/* Medication Adherence Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink-900 shadow-[5px_5px_0px_#121214]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-ink-900">
              <div>
                <h4 className="font-serif font-black text-ink-900 text-lg">
                  Prescription & Adherence History
                </h4>
                <p className="font-mono text-xs text-ink-500 mt-0.5">
                  Recent dose confirmations captured via patient voice & tap interface
                </p>
              </div>
            </div>
            <MedicineLogTable logs={medLogs} />
          </div>

          {/* Alerts Timeline */}
          {alerts && alerts.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-ink-900 shadow-[5px_5px_0px_#121214]">
              <h4 className="font-serif font-black text-ink-900 text-lg mb-3 flex items-center gap-2 pb-3 border-b-2 border-ink-900">
                <Bell className="w-4 h-4 text-ink-700" />
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

          {/* ABDM / FHIR Interoperability Card */}
          <div className="bg-surface-0 rounded-lg p-5 border border-ink-300/30 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-display font-bold text-ink-900 text-sm flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-brand-indigo" />
                <span>Ayushman Bharat Digital Mission (ABDM) / FHIR R4 Bundle</span>
              </h4>
              <p className="font-body text-xs text-ink-500 mt-0.5">
                Standardized interoperability collection with LOINC and SNOMED CT coded telemetry
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsFhirOpen(true)}
              className="gap-2 shrink-0 text-xs border-brand-indigo text-brand-indigo hover:bg-brand-indigo/5"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Preview &amp; Export FHIR R4</span>
            </Button>
          </div>

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

      {/* What-If Clinical Drug Simulator Drawer */}
      <WhatIfSimulator
        patientName={profile.name}
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
      />

      {/* ABDM / HL7 FHIR R4 Bundle Export Drawer */}
      <FhirExportDrawer
        detail={detail}
        isOpen={isFhirOpen}
        onClose={() => setIsFhirOpen(false)}
      />
    </div>
  );
}
