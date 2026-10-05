/**
 * CareBridge Hand-Drawn Doodles & Flourishes (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Authentic hand-drawn artistic vector micro-graphics.
 * Inspired by the "Where Work Happens" and "Belle" designer portfolio style:
 * Wavy arrows, sparkling stars, sleeping pet on baseline, brush highlights,
 * and playful swirls.
 */

"use client";

import * as React from "react";

export function DoodleSparkle({
  className = "",
  size = 20,
  color = "currentColor",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
        fill={color}
      />
    </svg>
  );
}

export function DoodleStar({
  className = "",
  size = 18,
  stroke = "var(--ink-900)",
  fill = "var(--blob-sun)",
}: {
  className?: string;
  size?: number;
  stroke?: string;
  fill?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 3L14.5 9L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 9L12 3Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleUnderline({
  className = "",
  color = "var(--blob-coral)",
  width = 160,
  height = 14,
}: {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 9C45 3 115 2 157 8M10 12C55 7 105 6 148 11"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleCircle({
  className = "",
  color = "var(--brand-teal)",
  width = 140,
  height = 46,
}: {
  className?: string;
  color?: string;
  width?: number | string;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 24C10 11 36 4 72 4C112 4 135 12 135 24C135 36 104 42 66 42C24 42 4 33 6 22C7 16 18 10 32 8"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="2 0.5"
      />
    </svg>
  );
}

export function DoodleArrowCurved({
  className = "",
  color = "var(--ink-900)",
  width = 54,
  height = 42,
}: {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Playful looping arrow */}
      <path
        d="M4 8C18 3 34 8 40 18C44 26 38 34 30 32C24 30 26 20 36 22C43 23 48 29 50 34"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 36L50 36L49 28"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleHeart({
  className = "",
  size = 20,
  fill = "var(--blob-coral)",
  stroke = "var(--ink-900)",
}: {
  className?: string;
  size?: number;
  fill?: string;
  stroke?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleSleepingCat({
  className = "",
  width = 90,
  height = 42,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Soft warm spot blob */}
      <ellipse cx="45" cy="24" rx="26" ry="12" fill="var(--blob-sun)" opacity="0.8" />
      {/* Hand drawn cat line art sleeping curled up */}
      <path
        d="M18 32C18 20 28 14 42 14C56 14 68 20 68 32"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Cat head & ears */}
      <path
        d="M20 28C16 26 14 20 18 16L22 20L26 16C28 20 26 26 22 28"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sleeping eyes */}
      <path d="M17 22C19 23 21 23 23 22" stroke="var(--ink-900)" strokeWidth="1.6" strokeLinecap="round" />
      {/* Curled tail */}
      <path
        d="M68 28C74 24 82 25 80 31C78 35 72 34 68 32"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Zzz floating sleep indicator */}
      <text x="32" y="10" fontFamily="var(--font-data)" fontSize="9" fontWeight="700" fill="var(--ink-500)">
        z z Z
      </text>
    </svg>
  );
}

export function DoodleRibbonWave({
  className = "",
  width = 240,
  height = 50,
  color = "var(--brand-teal)",
}: {
  className?: string;
  width?: number | string;
  height?: number;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 38C40 8 90 52 140 16C185 -14 215 42 234 18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
    </svg>
  );
}
