"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ShieldCheck, Activity, Users, Sparkles } from "lucide-react";
import { StatTile } from "@/components/ui/StatTile";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DoctorOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Urgent Alert Banner */}
      <div className="bg-risk-red-bg border border-risk-red/30 p-6 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-pill bg-risk-red text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-data font-bold text-xs uppercase px-2.5 py-0.5 rounded-pill bg-risk-red text-white">
                Urgent Action Required
              </span>
              <span className="font-data text-xs text-risk-red font-semibold">
                Risk Score: 75 / 100
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-ink-900 mt-1">
              Ramesh K. (62) flagged RED
            </h3>
            <p className="font-body text-sm text-ink-700 mt-0.5">
              Consecutive missed Metformin doses + sharp 14% systolic BP escalation.
            </p>
          </div>
        </div>

        <Link href="/doctor/p1">
          <Button variant="danger" size="md" className="gap-2 shrink-0">
            <span>Review Patient</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Clinical Telemetry Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatTile
          label="Active Monitored Cohort"
          value="42"
          subValue="patients"
          trend="neutral"
          trendText="Sunrise Clinic roster"
        />
        <StatTile
          label="Requires Immediate Review"
          value="1"
          subValue="patient"
          trend="up"
          trendText="Ramesh K. (Red band)"
        />
        <StatTile
          label="Adherence Rate (7d)"
          value="88.4%"
          subValue="avg"
          trend="down"
          trendText="-3.2% this week"
        />
      </div>

      {/* Quick Orientation Card */}
      <Card className="p-6">
        <h3 className="font-display font-bold text-lg text-ink-900 mb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-teal" />
          <span>CareBridge Continuous Decision Support</span>
        </h3>
        <p className="font-body text-sm text-ink-700 leading-relaxed mb-4">
          CareBridge ingests real-world patient data (pedometers, Bluetooth/voice BP logs, and smart medicine confirmations) to provide automated clinical risk rankings. Select a patient from the left column to inspect trends, view human-readable flags, generate AI pre-consult briefs, and execute one-tap clinical interventions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-ink-300/30">
          <div className="flex items-start gap-3 p-3.5 rounded-md bg-surface-50 border border-ink-300/30">
            <Sparkles className="w-5 h-5 text-brand-indigo shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-semibold text-sm text-ink-900">
                AI Pre-Consult Briefs
              </h4>
              <p className="font-body text-xs text-ink-500 mt-0.5">
                Deterministic 3-part summaries (Since last visit, Concerns, Suggested checks) under 90 words.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-md bg-surface-50 border border-ink-300/30">
            <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-semibold text-sm text-ink-900">
                DPDP Act Consent-Driven
              </h4>
              <p className="font-body text-xs text-ink-500 mt-0.5">
                Patients control stream access; doctor views maintain comprehensive audit logs.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
