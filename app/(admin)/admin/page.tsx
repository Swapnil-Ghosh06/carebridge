"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  ShieldCheck,
  Building2,
  RefreshCw,
} from "lucide-react";
import { StatTile } from "@/components/ui/StatTile";
import { Card } from "@/components/ui/Card";
import { AdminROIResponse } from "@/lib/types";
import { MOCK_ADMIN_ROI } from "@/lib/mockData";

export default function AdminROIPage() {
  const [data, setData] = useState<AdminROIResponse>(MOCK_ADMIN_ROI);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchROI = async () => {
      try {
        const res = await fetch("/api/admin/roi");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        setData(MOCK_ADMIN_ROI);
      }
    };
    fetchROI();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-data text-xs font-semibold px-2.5 py-0.5 rounded-pill bg-brand-teal/10 text-brand-teal">
              Monthly Value Realization
            </span>
            <span className="font-data text-xs text-ink-500">
              Q4 FY26 Snapshot
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-ink-900 mt-1">
            Clinic Clinical Impact &amp; ROI Analytics
          </h2>
          <p className="font-body text-sm text-ink-700 mt-0.5">
            Realized hospital cost savings, doctor efficiency metrics, and readmission prevention statistics.
          </p>
        </div>

        <div className="p-4 rounded-md bg-brand-teal/5 border border-brand-teal/20 text-right shrink-0">
          <div className="font-body text-xs text-ink-500">Estimated Total Cost Avoidance</div>
          <div className="font-data font-bold text-2xl text-brand-teal">
            ₹6,30,000
          </div>
          <div className="font-data text-[11px] text-ink-500">
            Across 14 prevented readmissions
          </div>
        </div>
      </div>

      {/* Primary KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile
          label="Patients Monitored"
          value={data.patientsMonitored}
          subValue="active"
          trend="up"
          trendText="+12% enrollment this mo"
        />
        <StatTile
          label="Alerts Actioned"
          value={data.alertsActioned}
          subValue="events"
          trend="up"
          trendText="100% within SLA (<3 hrs)"
        />
        <StatTile
          label="Readmissions Averted"
          value={data.readmissionsPrevented}
          subValue="cases"
          trend="down"
          trendText="-35% vs historic baseline"
        />
        <StatTile
          label="Doctor Hours Saved"
          value={`${data.doctorHoursSaved}h`}
          subValue="monthly"
          trend="up"
          trendText="~18 mins saved / flagged review"
        />
      </div>

      {/* Telemetry Charts & Clinic Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts per day chart */}
        <div className="lg:col-span-2 bg-surface-0 rounded-lg p-6 border border-ink-300/30 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-ink-900 text-base">
                Clinical Alerts Resolved Daily (Last 5 Days)
              </h3>
              <p className="font-body text-xs text-ink-500">
                Volume of high and moderate risk alerts actioned via doctor one-tap interventions
              </p>
            </div>
            <span className="font-data text-xs text-ink-500 font-semibold px-2 py-1 rounded bg-surface-50 border border-ink-300/30">
              Avg: 20 alerts/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.alertsPerDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F8" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#5B6B8C", fontFamily: "var(--font-data)" }}
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
                <Bar dataKey="count" fill="#14B8A6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Highlights Card */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-ink-900 text-base mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand-indigo" />
              <span>Operational Efficiency</span>
            </h3>
            <div className="space-y-4 text-sm font-body">
              <div className="p-3 rounded-md bg-surface-50 border border-ink-300/20">
                <span className="font-semibold text-ink-900 block text-xs uppercase text-ink-500">
                  Pre-Consult Synthesis
                </span>
                <p className="text-ink-700 text-xs mt-1">
                  AI Pre-Consult Brief generates in <strong>&lt; 3.8s</strong>, replacing manual review of raw charts.
                </p>
              </div>

              <div className="p-3 rounded-md bg-surface-50 border border-ink-300/20">
                <span className="font-semibold text-ink-900 block text-xs uppercase text-ink-500">
                  Care Loop Closure
                </span>
                <p className="text-ink-700 text-xs mt-1">
                  Average time from Red risk flag to patient contact is <strong>14 minutes</strong>.
                </p>
              </div>

              <div className="p-3 rounded-md bg-surface-50 border border-ink-300/20">
                <span className="font-semibold text-ink-900 block text-xs uppercase text-ink-500">
                  Family Engagement
                </span>
                <p className="text-ink-700 text-xs mt-1">
                  Family notifications resolved <strong>64%</strong> of missed dose events before doctor escalation.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Assumptions Accordion ("How we estimate this") */}
      <div className="bg-surface-0 rounded-lg border border-ink-300/30 shadow-card overflow-hidden">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-brand-indigo" />
            <h4 className="font-display font-bold text-ink-900 text-sm">
              How we estimate this (Actuarial &amp; Clinical Assumptions)
            </h4>
          </div>
          {isAccordionOpen ? (
            <ChevronUp className="w-4 h-4 text-ink-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-ink-500" />
          )}
        </button>

        {isAccordionOpen && (
          <div className="p-5 pt-0 border-t border-ink-300/20 bg-surface-50/50">
            <ul className="space-y-2 font-body text-xs text-ink-700 list-disc list-inside mt-3">
              {data.assumptions.map((assumption, idx) => (
                <li key={idx} className="leading-relaxed">
                  {assumption}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
