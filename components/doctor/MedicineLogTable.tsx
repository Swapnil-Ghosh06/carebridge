import React from "react";
import { Check, X, Clock, Pill } from "lucide-react";
import { MedLog } from "@/lib/types";

interface MedicineLogTableProps {
  logs: MedLog[];
}

export const MedicineLogTable: React.FC<MedicineLogTableProps> = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="p-6 text-center text-sm font-body text-ink-500 bg-surface-50 rounded-md border border-ink-300/30">
        Patient has not shared medication log history
      </div>
    );
  }

  const getStatusChip = (status: MedLog["status"]) => {
    switch (status) {
      case "taken":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-risk-green-bg text-risk-green font-data text-xs font-semibold">
            <Check className="w-3 h-3" />
            Taken
          </span>
        );
      case "missed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-risk-red-bg text-risk-red font-data text-xs font-semibold">
            <X className="w-3 h-3" />
            Missed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill bg-ink-100 text-ink-700 font-data text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border border-ink-300/30">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-surface-100/70 border-b border-ink-300/30 font-display text-xs text-ink-500 uppercase tracking-wider">
            <th className="py-3 px-4 font-semibold">Medication & Dose</th>
            <th className="py-3 px-4 font-semibold">Scheduled</th>
            <th className="py-3 px-4 font-semibold">Logged At</th>
            <th className="py-3 px-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-300/20 bg-surface-0 font-body">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-surface-50 transition-colors">
              <td className="py-3.5 px-4 font-medium text-ink-900 flex items-center gap-2">
                <Pill className="w-4 h-4 text-brand-teal shrink-0" />
                <div>
                  <div className="font-semibold">{log.medicine_name || "Prescribed Drug"}</div>
                  <div className="text-xs text-ink-500">{log.dose || "1 dose"}</div>
                </div>
              </td>
              <td className="py-3.5 px-4 text-ink-700 font-data text-xs">
                {log.scheduled_at}
              </td>
              <td className="py-3.5 px-4 text-ink-500 font-data text-xs">
                {log.taken_at || "—"}
              </td>
              <td className="py-3.5 px-4">{getStatusChip(log.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
