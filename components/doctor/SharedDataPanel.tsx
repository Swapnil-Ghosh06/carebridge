import React from "react";
import { ShieldCheck, ShieldAlert, Activity, Pill, Footprints, Droplet } from "lucide-react";
import { Consent, ConsentCategory } from "@/lib/types";

interface SharedDataPanelProps {
  consents: Consent[];
}

export const SharedDataPanel: React.FC<SharedDataPanelProps> = ({ consents }) => {
  const categories: { key: ConsentCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "vitals", label: "Blood Pressure & Heart Rate", icon: Activity },
    { key: "medicines", label: "Medication Adherence Logs", icon: Pill },
    { key: "steps", label: "Pedometer & Step Counts", icon: Footprints },
    { key: "glucose", label: "Blood Glucose Levels", icon: Droplet },
  ];

  const consentMap = (consents || []).reduce<Record<string, boolean>>((acc, curr) => {
    acc[curr.category] = curr.granted;
    return acc;
  }, {});

  return (
    <div className="bg-surface-0 rounded-lg border border-ink-300/30 p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-display font-bold text-ink-900 text-base">
            Patient Data Sharing Permissions
          </h4>
          <p className="font-body text-xs text-ink-500">
            DPDP Act consent status as configured by the patient
          </p>
        </div>
        <span className="font-data text-xs px-2.5 py-1 rounded-pill bg-brand-teal/10 text-brand-teal font-semibold">
          Consent-Governed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isGranted = consentMap[cat.key] !== false;
          const Icon = cat.icon;

          return (
            <div
              key={cat.key}
              className={`p-3.5 rounded-md border flex items-center justify-between text-sm ${
                isGranted
                  ? "bg-surface-50 border-ink-300/30"
                  : "bg-surface-100/50 border-dashed border-ink-300/50 opacity-70"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-pill flex items-center justify-center ${
                    isGranted
                      ? "bg-brand-teal/10 text-brand-teal"
                      : "bg-ink-100 text-ink-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-body font-semibold text-ink-900 text-xs">
                    {cat.label}
                  </div>
                  <div className="font-body text-xs text-ink-500">
                    {isGranted ? "Active clinical stream" : "Patient has not shared this"}
                  </div>
                </div>
              </div>

              {isGranted ? (
                <span className="inline-flex items-center gap-1 font-data text-xs text-risk-green font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Shared
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 font-data text-xs text-ink-500 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5 text-risk-amber" />
                  Hidden
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
