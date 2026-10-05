'use client';

import React from 'react';
import { Shield, ShieldOff } from 'lucide-react';

export interface ConsentToggleProps {
  id: string;
  category: 'vitals' | 'medicines' | 'steps' | 'glucose';
  title: string;
  description: string;
  granted: boolean;
  onToggle: (category: 'vitals' | 'medicines' | 'steps' | 'glucose', granted: boolean) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function ConsentToggle({
  category,
  title,
  description,
  granted,
  onToggle,
  icon,
  disabled = false,
}: ConsentToggleProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card flex items-start justify-between gap-4 transition-all">
      <div className="flex items-start gap-3.5">
        {icon && (
          <div
            className={`p-2.5 rounded-xl flex-shrink-0 ${
              granted
                ? 'bg-teal-50 text-teal-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {icon}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-display font-bold text-base text-navy-900 leading-snug">
              {title}
            </h4>
            <span
              className={`font-data text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                granted
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              {granted ? (
                <>
                  <Shield className="w-3 h-3 text-emerald-600" />
                  Shared
                </>
              ) : (
                <>
                  <ShieldOff className="w-3 h-3 text-gray-500" />
                  Private
                </>
              )}
            </span>
          </div>
          <p className="font-body text-xs text-gray-500 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Accessible Toggle Button (min 48px touch target) */}
      <button
        type="button"
        role="switch"
        aria-checked={granted}
        disabled={disabled}
        onClick={() => onToggle(category, !granted)}
        className={`relative inline-flex flex-shrink-0 items-center h-8 w-14 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 p-1 ${
          granted ? 'bg-teal-600' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            granted ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
