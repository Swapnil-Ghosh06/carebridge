import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { RiskBand } from '@/lib/types';

export interface RiskBadgeProps {
  band: RiskBand;
  score?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  className?: string;
}

export function RiskBadge({
  band,
  score,
  label,
  size = 'md',
  showScore = true,
  className = '',
}: RiskBadgeProps) {
  const bandConfig = {
    green: {
      defaultLabel: 'STABLE',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-500',
      Icon: CheckCircle2,
    },
    yellow: {
      defaultLabel: 'ELEVATED',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-500',
      Icon: AlertCircle,
    },
    red: {
      defaultLabel: 'HIGH RISK',
      bgColor: 'bg-rose-50 text-rose-700 border-rose-200',
      dotColor: 'bg-rose-500',
      Icon: AlertTriangle,
    },
  };

  const current = bandConfig[band] || bandConfig.green;
  const displayLabel = label ?? current.defaultLabel;
  const IconComponent = current.Icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-data font-semibold tracking-wider uppercase border rounded-full ${current.bgColor} ${sizeClasses[size]} ${className}`}
    >
      <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{displayLabel}</span>
      {showScore && typeof score === 'number' && (
        <span className="opacity-90 font-bold">({score})</span>
      )}
    </span>
  );
}
