import React from "react";
import { DoctorHeader } from "@/components/doctor/DoctorHeader";
import { PatientListPane } from "@/components/doctor/PatientListPane";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      {/* 64px Top Header */}
      <DoctorHeader urgentCount={1} />

      {/* Two-Pane Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-[1600px] w-full mx-auto">
        <PatientListPane />
        <main className="flex-1 overflow-y-auto bg-surface-50 p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mandatory Safety & Compliance Footer */}
      <footer className="h-10 bg-surface-0 border-t border-ink-300/30 px-6 flex items-center justify-between text-xs font-data text-ink-500">
        <span className="font-semibold uppercase tracking-wider">
          Decision support only. Not a diagnosis. Doctor decides.
        </span>
        <span className="hidden sm:inline bg-ink-100 text-ink-700 px-2 py-0.5 rounded-pill text-[11px]">
          Simulated clinical data
        </span>
      </footer>
    </div>
  );
}
