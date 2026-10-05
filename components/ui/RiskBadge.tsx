import React from 'react';
import { RiskBand } from '@/lib/types';

export interface RiskBadgeProps {
  band: RiskBand;
  score?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RiskBadge({
  band,
  score,
  label,
  size = 'md',
  className = '',
}: RiskBadgeProps) {
  const bandConfig = {
    green: {
      defaultLabel: 'Stable',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-500',
    },
    yellow: {
      defaultLabel: 'Moderate',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-500',
    },
    red: {
      defaultLabel: 'High Attention',
      bgColor: 'bg-rose-50 text-rose-700 border-rose-200',
      dotColor: 'bg-rose-500',
    },
  };

  const current = bandConfig[band] || bandConfig.green;
  const displayLabel = label ?? current.defaultLabel;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-data font-semibold tracking-wider uppercase border rounded-full ${current.bgColor} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${current.dotColor} animate-pulse`} />
      <span>{displayLabel}</span>
      {typeof score === 'number' && (
        <span className="opacity-80 font-bold">({score})</span>
      )}
    </span>
  );
}
