"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Video, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ActionsBarProps {
  patientId: string;
  patientName: string;
  onActionTriggered?: (actionType: "call" | "message" | "teleconsult", note: string) => void;
}

export const ActionsBar: React.FC<ActionsBarProps> = ({
  patientId,
  patientName,
  onActionTriggered,
}) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleAction = async (type: "call" | "message" | "teleconsult") => {
    setLoadingAction(type);
    try {
      const res = await fetch("/api/doctor/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          type,
          note: `Triggered from Doctor Portal for ${patientName}`,
        }),
      });

      if (!res.ok) throw new Error("Action failed");
      const data = await res.json();

      setToastType("success");
      setToastMessage(data.message);
      if (onActionTriggered) {
        onActionTriggered(type, data.message);
      }
    } catch {
      setToastType("error");
      setToastMessage("Failed to initiate action. Please try again.");
    } finally {
      setLoadingAction(null);
      setTimeout(() => {
        setToastMessage(null);
      }, 4500);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="md"
          variant="primary"
          onClick={() => handleAction("call")}
          disabled={loadingAction !== null}
          className="gap-2 shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>Call Patient</span>
        </Button>

        <Button
          size="md"
          variant="secondary"
          onClick={() => handleAction("message")}
          disabled={loadingAction !== null}
          className="gap-2 shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send Message</span>
        </Button>

        <Button
          size="md"
          variant="ghost"
          onClick={() => handleAction("teleconsult")}
          disabled={loadingAction !== null}
          className="gap-2 shadow-sm border-brand-teal text-brand-teal hover:bg-brand-teal/5"
        >
          <Video className="w-4 h-4" />
          <span>Book Teleconsult</span>
        </Button>
      </div>

      {/* Action Toast Feedback */}
      {toastMessage && (
        <div
          className={`mt-3 p-3.5 rounded-md flex items-center gap-2.5 text-sm font-body shadow-md border animate-in fade-in slide-in-from-top-2 duration-200 ${
            toastType === "success"
              ? "bg-risk-green-bg text-risk-green border-risk-green/30"
              : "bg-risk-red-bg text-risk-red border-risk-red/30"
          }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
