'use client';

import React from 'react';
import { Heart, Activity, Pill, Droplets, Sparkles, CheckCircle2, Circle } from 'lucide-react';

export interface GoalItemProps {
  id: string;
  category: 'steps' | 'medicine' | 'bp' | 'glucose' | 'other' | string;
  target: string;
  by?: string;
  isCompleted?: boolean;
  onComplete?: (id: string) => void;
  disabled?: boolean;
  className?: string;
}

export const GoalItem: React.FC<GoalItemProps> = ({
  id,
  category,
  target,
  by,
  isCompleted = false,
  onComplete,
  disabled = false,
  className = '',
}) => {
  const getCategoryIcon = () => {
    const cat = category.toLowerCase();
    if (cat.includes('bp') || cat.includes('blood pressure') || cat.includes('heart')) {
      return <Heart className="w-5 h-5 text-teal-600 shrink-0" />;
    }
    if (cat.includes('step') || cat.includes('walk') || cat.includes('activity')) {
      return <Activity className="w-5 h-5 text-teal-600 shrink-0" />;
    }
    if (cat.includes('med') || cat.includes('pill') || cat.includes('drug')) {
      return <Pill className="w-5 h-5 text-teal-600 shrink-0" />;
    }
    if (cat.includes('sugar') || cat.includes('glucose')) {
      return <Droplets className="w-5 h-5 text-teal-600 shrink-0" />;
    }
    return <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />;
  };

  const handleClick = () => {
    if (disabled || isCompleted) return;
    onComplete?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !isCompleted) {
      e.preventDefault();
      onComplete?.(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={isCompleted}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group flex items-center justify-between p-3.5 sm:p-4 min-h-[56px] rounded-2xl border transition-all duration-200 select-none ${
        isCompleted
          ? 'bg-emerald-50/70 border-emerald-200 cursor-default'
          : 'bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer active:scale-[0.99]'
      } ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        <div
          className={`p-2.5 rounded-xl shrink-0 transition-colors ${
            isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-teal-50 text-teal-700'
          }`}
        >
          {getCategoryIcon()}
        </div>

        <div className="min-w-0">
          <p
            className={`font-body font-medium text-lg sm:text-[20px] leading-snug tracking-tight transition-colors ${
              isCompleted
                ? 'line-through text-slate-400 font-normal'
                : 'text-navy-900 group-hover:text-teal-950'
            }`}
          >
            {target}
          </p>
          {by && (
            <p className="font-body text-[13px] text-slate-500 mt-0.5 tracking-normal">
              By {by}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0 pl-2">
        {isCompleted ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-body text-xs font-semibold">Done</span>
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-teal-500 flex items-center justify-center transition-colors">
            <Circle className="w-3.5 h-3.5 text-transparent group-hover:text-teal-400/50 fill-current transition-colors" />
          </div>
        )}
      </div>
    </div>
  );
};
