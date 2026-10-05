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
      <div className="bg-[#FEE2E2] border-2 border-red-600 p-6 rounded-3xl shadow-[4px_4px_0px_#DC2626] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 border-2 border-ink-900 shadow-[2px_2px_0px_#121214]">
            <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white border border-ink-900">
                Urgent Action Required
              </span>
              <span className="font-mono text-xs text-red-900 font-bold">
                Risk Score: 86 / 100
              </span>
            </div>
            <h3 className="font-serif font-black text-2xl text-ink-900 mt-1">
              Ramesh K. (68) Flagged RED
            </h3>
            <p className="font-sans text-xs text-red-900 font-medium mt-0.5">
              Consecutive missed Metformin doses + sharp systolic BP escalation (155/95 mmHg).
            </p>
          </div>
        </div>

        <Link href="/doctor/p1">
          <button className="bg-ink-900 text-white font-mono text-xs font-bold px-5 py-3 rounded-full border-2 border-ink-900 shadow-[2px_2px_0px_#121214] hover:bg-ink-800 transition flex items-center gap-2 shrink-0 cursor-pointer">
            <span>Review Patient</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Clinical Telemetry Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-ink-900 rounded-2xl p-5 shadow-[4px_4px_0px_#121214]">
          <span className="font-mono text-xs font-bold text-ink-500 uppercase block mb-1">
            Active Monitored Cohort
          </span>
          <div className="font-serif font-black text-3xl text-ink-900">
            42 <span className="text-xs font-mono font-normal text-ink-500">patients</span>
          </div>
          <span className="font-mono text-[10px] text-ink-500 mt-1 block">
            Sunrise Clinic roster
          </span>
        </div>

        <div className="bg-[#FEE2E2] border-2 border-ink-900 rounded-2xl p-5 shadow-[4px_4px_0px_#121214]">
          <span className="font-mono text-xs font-bold text-red-700 uppercase block mb-1">
            Requires Immediate Review
          </span>
          <div className="font-serif font-black text-3xl text-red-900">
            1 <span className="text-xs font-mono font-normal text-red-700">patient</span>
          </div>
          <span className="font-mono text-[10px] text-red-800 font-bold mt-1 block">
            Ramesh K. (Red band)
          </span>
        </div>

        <div className="bg-[#D4F77C] border-2 border-ink-900 rounded-2xl p-5 shadow-[4px_4px_0px_#121214]">
          <span className="font-mono text-xs font-bold text-ink-700 uppercase block mb-1">
            Cohort Adherence (7d)
          </span>
          <div className="font-serif font-black text-3xl text-ink-900">
            88.4% <span className="text-xs font-mono font-normal text-ink-600">avg</span>
          </div>
          <span className="font-mono text-[10px] text-ink-700 mt-1 block font-bold">
            14-day continuous loop
          </span>
        </div>
      </div>

      {/* Quick Orientation Card */}
      <div className="bg-white border-2 border-ink-900 rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#121214]">
        <h3 className="font-serif font-black text-xl text-ink-900 mb-2 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-700" />
          <span>CareBridge Continuous Decision Support</span>
        </h3>
        <p className="font-sans text-xs sm:text-sm text-ink-700 leading-relaxed mb-6">
          CareBridge ingests real-world patient data (pedometers, Bluetooth/voice BP logs, and smart medicine confirmations) to provide automated clinical risk rankings. Select a patient from the left column to inspect trends, view human-readable flags, generate AI pre-consult briefs, and execute one-tap clinical interventions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-ink-900">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#EDE9FE] border-2 border-ink-900 shadow-[2px_2px_0px_#121214]">
            <Sparkles className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-black text-sm text-ink-900">
                AI Pre-Consult Briefs
              </h4>
              <p className="font-sans text-xs text-ink-700 mt-1">
                Deterministic 3-part summaries (Since last visit, Concerns, Suggested checks) under 90 words.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#D4F77C] border-2 border-ink-900 shadow-[2px_2px_0px_#121214]">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-black text-sm text-ink-900">
                DPDP Act Consent-Driven
              </h4>
              <p className="font-sans text-xs text-ink-800 mt-1">
                Patients control stream access; doctor views maintain comprehensive audit logs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
