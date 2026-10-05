'use client';

import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

export interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
  languageLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function VoiceButton({
  isListening,
  onClick,
  languageLabel = 'हिं / EN',
  disabled = false,
  className = '',
}: VoiceButtonProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Pulsing Outer Rings when Listening */}
        {isListening && (
          <>
            <span className="absolute w-28 h-28 rounded-full bg-teal-400/20 animate-ping duration-1000" />
            <span className="absolute w-24 h-24 rounded-full bg-teal-500/30 animate-pulse duration-700" />
          </>
        )}

        {/* Main Circular Mic Button */}
        <button
          onClick={onClick}
          disabled={disabled}
          type="button"
          aria-label={isListening ? 'Listening... Tap to stop' : 'Tap to speak'}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            isListening
              ? 'bg-rose-500 text-white shadow-rose-200 ring-rose-400 scale-105'
              : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-200 ring-teal-400 active:scale-95'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isListening ? (
            <Volume2 className="w-9 h-9 animate-bounce" />
          ) : (
            <Mic className="w-9 h-9" />
          )}
        </button>
      </div>

      {/* Status Label & Language Chip */}
      <div className="flex items-center gap-2">
        <span
          className={`font-display text-sm font-bold ${
            isListening ? 'text-rose-600 animate-pulse' : 'text-navy-900'
          }`}
        >
          {isListening ? 'Listening...' : 'Tap to speak'}
        </span>
        <span className="font-data text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
          {languageLabel}
        </span>
      </div>
    </div>
  );
}
