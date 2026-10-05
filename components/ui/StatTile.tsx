import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatTileProps {
  label: string;
  value: string | number;
  subValue?: string;
  unit?: string;
  target?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  variant?: 'teal' | 'indigo' | 'amber' | 'green' | 'default';
  className?: string;
}

export function StatTile({
  label,
  value,
  subValue,
  unit,
  target,
  icon,
  trend,
  trendText,
  variant = 'default',
  className = '',
}: StatTileProps) {
  const iconBgMap = {
    teal: 'bg-teal-50 text-teal-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-emerald-50 text-emerald-600',
    default: 'bg-gray-100 text-navy-700',
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-card p-4 sm:p-5 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-body text-sm font-medium text-gray-500 line-clamp-1">
          {label}
        </span>
        {icon && (
          <div className={`p-2 rounded-xl flex items-center justify-center ${iconBgMap[variant]}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-1">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="font-data font-bold text-2xl sm:text-3xl text-navy-900 tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="font-body text-xs font-semibold text-gray-400">
              {unit}
            </span>
          )}
          {subValue && (
            <span className="font-data text-xs font-medium text-gray-500">
              {subValue}
            </span>
          )}
        </div>

        {target && (
          <p className="font-body text-xs text-gray-400 mt-0.5">
            {target}
          </p>
        )}

        {trend && (
          <div className="flex items-center gap-1 mt-2 text-xs font-data">
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-risk-red" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-risk-green" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5 text-gray-500" />}
            <span
              className={
                trend === 'up'
                  ? 'text-risk-red font-semibold'
                  : trend === 'down'
                  ? 'text-risk-green font-semibold'
                  : 'text-gray-500'
              }
            >
              {trendText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
