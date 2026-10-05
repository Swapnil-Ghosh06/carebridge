"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { PatientListItem } from "@/lib/types";
import { RiskBadge } from "./RiskBadge";

interface PatientRowProps {
  patient: PatientListItem;
  isSelected?: boolean;
  onClick?: () => void;
}

export const PatientRow: React.FC<PatientRowProps> = ({
  patient,
  isSelected = false,
  onClick,
}) => {
  // Initials for avatar
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const getBorderColor = () => {
    if (isSelected) return "border-brand-teal ring-2 ring-brand-teal/20 bg-surface-100";
    if (patient.band === "red") return "border-risk-red/40 hover:border-risk-red bg-risk-red-bg/20";
    return "border-ink-300/30 hover:border-ink-300 bg-surface-0";
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={onClick}
      className={`p-4 rounded-md border cursor-pointer transition-all duration-200 shadow-sm relative ${getBorderColor()}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-pill bg-brand-indigo/10 text-brand-indigo font-display font-bold flex items-center justify-center text-sm">
            {initials}
          </div>
          <div>
            <h4 className="font-display font-bold text-ink-900 text-base leading-tight">
              {patient.name}
            </h4>
            <span className="font-body text-xs text-ink-500">
              Age {patient.age}{patient.conditions?.length ? ` • ${patient.conditions.join(", ")}` : ""}
            </span>
          </div>
        </div>
        <RiskBadge band={patient.band} score={patient.score} size="sm" />
      </div>

      <div className="mt-2.5 pt-2 border-t border-ink-300/20 flex flex-col gap-1.5">
        <div className="text-xs font-body text-ink-700 flex items-start gap-1.5">
          <span className="font-semibold text-ink-900 shrink-0">Flag:</span>
          <span className="truncate">{patient.topReason || "Stable adherence"}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-ink-500 font-data">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-ink-500" />
            <span>Seen {patient.lastSeen}</span>
          </span>
          <ChevronRight className="w-4 h-4 text-ink-500" />
        </div>
      </div>
    </motion.div>
  );
};
