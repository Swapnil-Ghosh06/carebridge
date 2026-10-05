"use client";

import React, { useState } from "react";
import { X, Check, Copy, FileCode2, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PatientDetail } from "@/lib/types";
import { generateFhirR4Bundle } from "@/lib/fhir/export";

interface FhirExportDrawerProps {
  detail: PatientDetail;
  isOpen: boolean;
  onClose: () => void;
}

export const FhirExportDrawer: React.FC<FhirExportDrawerProps> = ({
  detail,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bundle = generateFhirR4Bundle(detail);
  const jsonString = JSON.stringify(bundle, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-ink-900/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-surface-0 shadow-2xl h-full flex flex-col border-l border-ink-300/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-ink-300/30 flex items-center justify-between bg-surface-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-pill bg-brand-indigo/10 text-brand-indigo flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-ink-900 text-lg">
                ABDM / HL7 FHIR R4 Bundle
              </h3>
              <p className="font-body text-xs text-ink-500">
                Interoperability export for {detail.profile.name} (LOINC &amp; SNOMED CT)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-pill hover:bg-surface-100 text-ink-500 hover:text-ink-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* ABDM & FHIR Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-brand-teal/5 border border-brand-teal/20 text-xs">
            <div className="flex items-center gap-2 text-brand-teal font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Ayushman Bharat Digital Mission (ABDM) Compatible</span>
            </div>
            <div className="flex items-center gap-2 font-data text-ink-500">
              <span className="bg-surface-0 px-2 py-0.5 rounded border border-ink-300/30">
                HL7 FHIR v4.0.1
              </span>
              <span className="bg-surface-0 px-2 py-0.5 rounded border border-ink-300/30">
                {bundle.entry.length} Resources
              </span>
            </div>
          </div>

          {/* JSON Viewer */}
          <div className="relative">
            <div className="flex items-center justify-between bg-ink-900 text-white px-4 py-2 rounded-t-md text-xs font-data">
              <span>fhir-r4-bundle.json</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 hover:text-brand-mint transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-brand-mint" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy JSON"}</span>
              </button>
            </div>
            <pre className="p-4 bg-ink-900/95 text-brand-mint font-data text-xs rounded-b-md overflow-x-auto max-h-[460px] leading-relaxed select-all">
              {jsonString}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-ink-300/30 bg-surface-50 flex items-center justify-between">
          <span className="font-data text-xs text-ink-500">
            Standard FHIR R4 Collection Bundle
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={handleCopy} className="gap-1.5 text-xs">
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </Button>
            <Button size="sm" variant="primary" onClick={onClose} className="text-xs">
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
