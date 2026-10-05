/**
 * Toast component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Feedback notifications for actions (e.g. "Metformin logged as taken", "Action recorded").
 *
 * Rules:
 *  - Font: DM Sans (message), Montserrat (title/action), Sora (badge/time)
 *  - Types: success | info | warning | error
 *  - Accessible with aria-live="polite" or role="status"
 */

"use client";

import * as React from "react";
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const typeConfig: Record<
  ToastType,
  {
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-[var(--risk-green)]",
    bgColor: "bg-[var(--surface-0)]",
    borderColor: "border-[var(--risk-green)]",
  },
  info: {
    icon: Info,
    iconColor: "text-[var(--brand-teal)]",
    bgColor: "bg-[var(--surface-0)]",
    borderColor: "border-[var(--brand-teal)]",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-[var(--risk-amber)]",
    bgColor: "bg-[var(--surface-0)]",
    borderColor: "border-[var(--risk-amber)]",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-[var(--risk-red)]",
    bgColor: "bg-[var(--surface-0)]",
    borderColor: "border-[var(--risk-red)]",
  },
};

export function Toast({
  type = "success",
  title,
  message,
  duration = 4000,
  onClose,
  className = "",
}: ToastProps) {
  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-3 p-4 rounded-[var(--r-md)] shadow-[var(--shadow-card)] border-l-4 ${config.borderColor} ${config.bgColor} border-t border-r border-b border-[var(--ink-300)] max-w-md w-full transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${className}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && (
          <h5 className="font-display font-bold text-sm text-[var(--ink-900)] mb-0.5">
            {title}
          </h5>
        )}
        <p className="font-body text-sm text-[var(--ink-700)] leading-snug">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[var(--ink-300)] hover:text-[var(--ink-700)] p-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)]"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
