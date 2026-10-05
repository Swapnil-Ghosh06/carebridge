"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, RefreshCw, Filter } from "lucide-react";
import { PatientListItem, RiskBand } from "@/lib/types";
import { PatientRow } from "@/components/ui/PatientRow";
import { MOCK_PATIENT_LIST } from "@/lib/mockData";

export const PatientListPane: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const activeId = params?.id as string | undefined;

  const [patients, setPatients] = useState<PatientListItem[]>(MOCK_PATIENT_LIST);
  const [filter, setFilter] = useState<"all" | RiskBand>("all");
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch / Polling simulation
  const fetchPatients = async () => {
    try {
      const res = await fetch("/api/patients");
      if (res.ok) {
        const data = await res.json();
        setPatients(data);
      }
    } catch {
      // Use mock data fallback
      setPatients(MOCK_PATIENT_LIST);
    }
  };

  useEffect(() => {
    fetchPatients();
    // 3s polling interval per ARCHITECTURE.md Section 8
    const interval = setInterval(fetchPatients, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchPatients();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Filter and search
  const filteredPatients = patients
    .filter((p) => {
      if (filter !== "all" && p.band !== filter) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          (p.conditions?.some((c) => c.toLowerCase().includes(query)) ?? false) ||
          (p.topReason?.toLowerCase().includes(query) ?? false)
        );
      }
      return true;
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="w-full md:w-[380px] shrink-0 border-r border-ink-300/30 bg-surface-0 flex flex-col h-full">
      {/* Top Controls: Search & Refresh */}
      <div className="p-4 border-b border-ink-300/30 space-y-3 bg-surface-50/50">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-ink-900 text-sm flex items-center gap-1.5">
            <span>Risk-Ranked Action List</span>
            <span className="font-data text-xs px-2 py-0.5 rounded-pill bg-brand-indigo/10 text-brand-indigo">
              {filteredPatients.length}
            </span>
          </h3>
          <button
            onClick={handleManualRefresh}
            className="p-1.5 rounded-pill hover:bg-surface-100 text-ink-500 hover:text-ink-900 transition-colors"
            title="Refresh patient risk scores"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-brand-teal" : ""}`}
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            placeholder="Search patient, condition, flag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-surface-0 border border-ink-300/40 rounded-md text-xs font-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-1 focus:ring-brand-teal"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 text-xs font-display">
          <Filter className="w-3 h-3 text-ink-500 mr-1 shrink-0" />
          {(["all", "red", "yellow", "green"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setFilter(b)}
              className={`px-2.5 py-1 rounded-pill text-xs font-semibold capitalize transition-colors ${
                filter === b
                  ? "bg-ink-900 text-white"
                  : "bg-surface-0 border border-ink-300/30 text-ink-700 hover:bg-surface-100"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Rows List with Framer Motion Layout Reordering */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredPatients.length === 0 ? (
          <div className="p-8 text-center text-xs font-body text-ink-500">
            No patients match current filter
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <PatientRow
              key={patient.id}
              patient={patient}
              isSelected={activeId === patient.id}
              onClick={() => router.push(`/doctor/${patient.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};
