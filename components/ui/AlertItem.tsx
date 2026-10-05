import React from 'react';
import { AlertCircle, Bell, UserCheck, ShieldAlert, Clock } from 'lucide-react';
import { AlertLevel, AlertAudience } from '@/lib/types';

export interface AlertItemProps {
  id: string;
  level: AlertLevel;
  audience: AlertAudience;
  message: string;
  createdAt: string;
  acknowledgedAt?: string | null;
  onAcknowledge?: (id: string) => void;
  className?: string;
}

export function AlertItem({
  id,
  level,
  audience,
  message,
  createdAt,
  acknowledgedAt,
  onAcknowledge,
  className = '',
}: AlertItemProps) {
  const levelStyles = {
    reminder: {
      border: 'border-blue-200 bg-blue-50/40',
      iconBg: 'bg-blue-100 text-blue-700',
      badge: 'bg-blue-100 text-blue-800',
      Icon: Bell,
      label: 'Gentle Reminder',
    },
    family: {
      border: 'border-amber-200 bg-amber-50/40',
      iconBg: 'bg-amber-100 text-amber-700',
      badge: 'bg-amber-100 text-amber-800',
      Icon: AlertCircle,
      label: 'Family Alert',
    },
    doctor: {
      border: 'border-rose-200 bg-rose-50/40',
      iconBg: 'bg-rose-100 text-rose-700',
      badge: 'bg-rose-100 text-rose-800',
      Icon: ShieldAlert,
      label: 'Clinic Escalation',
    },
  };

  const current = levelStyles[level] || levelStyles.reminder;
  const IconComponent = current.Icon;

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${current.border} ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`p-2.5 rounded-xl flex-shrink-0 ${current.iconBg}`}>
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`font-data text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${current.badge}`}
            >
              {current.label}
            </span>
            <span className="font-body text-xs text-gray-500 capitalize flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> For {audience}
            </span>
            <span className="text-gray-300">•</span>
            <span className="font-body text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {createdAt}
            </span>
          </div>

          <p className="font-body text-base sm:text-lg text-navy-900 font-medium leading-relaxed">
            {message}
          </p>

          {!acknowledgedAt && onAcknowledge && (
            <div className="mt-3">
              <button
                onClick={() => onAcknowledge(id)}
                className="font-display font-semibold text-xs sm:text-sm text-teal-700 hover:text-teal-800 underline underline-offset-2"
              >
                Mark as read
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
