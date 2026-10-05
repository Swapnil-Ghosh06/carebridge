/**
 * VoiceButton component (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Large circular microphone action button for elderly patient voice logging.
 *
 * Rules:
 *  - Large touch target (>= 72px)
 *  - Animated pulse ring when listening (Framer Motion)
 *  - Language chip (en-IN / hi-IN / kn-IN)
 *  - States: idle | listening | processing | error
 *  - Accessible with aria-pressed, aria-label, and keyboard focus
 */

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mic, Loader2, AlertCircle } from "lucide-react";
import { micPulseVariants } from "@/design/motion";

export type VoiceState = "idle" | "listening" | "processing" | "error";
export type VoiceLanguage = "en-IN" | "hi-IN" | "kn-IN";

export interface VoiceButtonProps {
  state?: VoiceState;
  language?: VoiceLanguage;
  onToggle?: () => void;
  onLanguageChange?: (lang: VoiceLanguage) => void;
  disabled?: boolean;
  className?: string;
  size?: "md" | "lg";
}

const langLabels: Record<VoiceLanguage, { name: string; native: string }> = {
  "en-IN": { name: "English", native: "English" },
  "hi-IN": { name: "Hindi", native: "हिन्दी" },
  "kn-IN": { name: "Kannada", native: "ಕನ್ನಡ" },
};

export function VoiceButton({
  state = "idle",
  language = "hi-IN",
  onToggle,
  onLanguageChange,
  disabled = false,
  className = "",
  size = "lg",
}: VoiceButtonProps) {
  const isListening = state === "listening";
  const isProcessing = state === "processing";
  const isError = state === "error";

  const buttonDimension = size === "lg" ? "w-20 h-20" : "w-16 h-16";
  const iconSize = size === "lg" ? "w-8 h-8" : "w-6 h-6";

  const cycleLanguage = () => {
    if (!onLanguageChange || isListening) return;
    const order: VoiceLanguage[] = ["hi-IN", "kn-IN", "en-IN"];
    const nextIdx = (order.indexOf(language) + 1) % order.length;
    onLanguageChange(order[nextIdx]);
  };

  return (
    <div className={`flex flex-col items-center gap-3 select-none ${className}`}>
      {/* Mic Button & Pulse Rings */}
      <div className="relative flex items-center justify-center">
        {/* Animated pulse wave ring 1 */}
        {isListening && (
          <motion.div
            variants={micPulseVariants}
            initial="initial"
            animate="pulse"
            className="absolute rounded-full bg-[var(--brand-teal)]/25 pointer-events-none -inset-3"
          />
        )}

        {/* Animated pulse wave ring 2 */}
        {isListening && (
          <motion.div
            variants={micPulseVariants}
            initial="initial"
            animate="pulse"
            transition={{ delay: 0.4, duration: 1.6, repeat: Infinity }}
            className="absolute rounded-full bg-[var(--brand-teal)]/15 pointer-events-none -inset-6"
          />
        )}

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled || isProcessing}
          aria-pressed={isListening}
          aria-label={
            isListening
              ? "Listening for voice input. Tap to stop."
              : isProcessing
              ? "Processing voice audio"
              : `Tap to speak in ${langLabels[language]?.name}`
          }
          className={`relative z-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${buttonDimension} ${
            isListening
              ? "bg-[var(--brand-teal)] text-[var(--surface-0)] scale-105 shadow-[0_0_24px_rgba(20,184,166,0.4)]"
              : isProcessing
              ? "bg-[var(--surface-100)] text-[var(--brand-teal)] cursor-wait"
              : isError
              ? "bg-[var(--risk-red-bg)] text-[var(--risk-red)]"
              : "bg-[var(--ink-900)] text-[var(--surface-0)] hover:bg-[var(--ink-700)] active:scale-95"
          } focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-teal)] focus-visible:ring-offset-2 disabled:opacity-50`}
        >
          {isProcessing ? (
            <Loader2 className={`${iconSize} animate-spin`} />
          ) : isError ? (
            <AlertCircle className={iconSize} />
          ) : isListening ? (
            <Mic className={`${iconSize} stroke-[2.5]`} />
          ) : (
            <Mic className={iconSize} />
          )}
        </button>
      </div>

      {/* Status Text & Language Selector */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="font-display font-semibold text-sm text-[var(--ink-900)]">
          {isListening
            ? "Listening..."
            : isProcessing
            ? "Recognising speech..."
            : isError
            ? "Microphone error"
            : "Tap to speak"}
        </p>

        {/* Language selector chip */}
        <button
          type="button"
          onClick={cycleLanguage}
          disabled={isListening}
          aria-label={`Current language is ${langLabels[language]?.name}. Tap to change language.`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--r-pill)] bg-[var(--surface-100)] hover:bg-[var(--ink-300)]/30 text-[var(--ink-700)] font-data text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)]"
        >
          <span>{langLabels[language]?.native}</span>
          <span className="text-[var(--ink-500)] text-[10px]">
            ({langLabels[language]?.name})
          </span>
        </button>
      </div>
    </div>
  );
}
