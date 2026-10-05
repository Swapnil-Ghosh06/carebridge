'use client';

import React from 'react';
import { Pill, Check, Clock } from 'lucide-react';
import { Button } from './Button';

export interface MedicineCardProps {
  id: string;
  name: string;
  dose: string;
  time?: string;
  instructions?: string;
  status: 'taken' | 'missed' | 'pending';
  onMarkTaken?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function MedicineCard({
  id,
  name,
  dose,
  time = 'Scheduled',
  instructions,
  status,
  onMarkTaken,
  isLoading = false,
  className = '',
}: MedicineCardProps) {
  const isTaken = status === 'taken';
  const isMissed = status === 'missed';

  return (
    <div
      className={`bg-white rounded-2xl border p-5 transition-all duration-200 ${
        isTaken
          ? 'border-emerald-200 bg-emerald-50/30'
          : isMissed
          ? 'border-rose-200 bg-rose-50/20'
          : 'border-gray-100 shadow-card'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`p-3 rounded-2xl flex-shrink-0 ${
              isTaken
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-teal-50 text-teal-600'
            }`}
          >
            {isTaken ? <Check className="w-6 h-6" /> : <Pill className="w-6 h-6" />}
          </div>

          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-navy-900 leading-tight">
              {name}
            </h3>
            <p className="font-body text-base sm:text-lg font-medium text-navy-700 mt-0.5">
              {dose}
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-sm sm:text-base text-gray-500 font-body">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{time}</span>
              </span>
              {instructions && (
                <>
                  <span>•</span>
                  <span>{instructions}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status Chip if already processed */}
        {isTaken && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-body text-sm font-semibold">
            <Check className="w-4 h-4" /> Taken
          </span>
        )}

        {isMissed && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 font-body text-sm font-semibold">
            Missed
          </span>
        )}
      </div>

      {/* Action button if pending */}
      {!isTaken && !isMissed && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
          <Button
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            onClick={() => onMarkTaken && onMarkTaken(id)}
            className="text-base sm:text-lg min-h-[50px] shadow-sm flex items-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>Mark as Taken</span>
          </Button>
        </div>
      )}
    </div>
  );
}
