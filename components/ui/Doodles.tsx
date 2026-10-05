/**
 * CareBridge Hand-Drawn Doodles & Flourishes (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Authentic hand-drawn artistic vector micro-graphics.
 * Inspired by the "Where Work Happens" and "Belle" boutique designer aesthetic:
 * Arched doodle canopies, wavy arrows, sparkling stars, sleeping pet & sitting
 * character on baseline, brush highlights, and playful swirls.
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

/**
 * Hand-drawn person sitting cross-legged holding a device / laptop
 * matching the character from the Belle inspiration design.
 */
export function DoodleSittingPerson({
  className = "",
  width = 110,
  height = 95,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Soft color blob background layer */}
      <path
        d="M30 35C20 45 25 75 40 85C60 92 85 85 92 70C98 50 80 30 65 30C50 30 40 25 30 35Z"
        fill="var(--blob-sky)"
        opacity="0.35"
      />
      <circle cx="58" cy="18" r="12" fill="var(--blob-sun)" opacity="0.4" />

      {/* Head & hair */}
      <path
        d="M50 16C50 10 56 6 62 6C68 6 72 10 72 17C72 24 66 28 60 28C54 28 50 22 50 16Z"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Hair flowing back */}
      <path
        d="M52 10C46 14 42 22 46 32C48 36 52 38 54 40"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Face profile & smile */}
      <circle cx="64" cy="16" r="1.5" fill="var(--ink-900)" />
      <path d="M62 20C65 21 68 20 69 18" stroke="var(--ink-900)" strokeWidth="1.8" strokeLinecap="round" />

      {/* Torso & arms holding laptop */}
      <path
        d="M54 30C50 40 48 55 52 65"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M60 28C68 34 72 45 74 58"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Crossed legs on the floor */}
      <path
        d="M45 68C32 72 24 82 28 88C32 92 50 92 65 90C80 88 92 90 96 85C100 80 94 72 82 70"
        stroke="var(--ink-900)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Laptop / tablet held in lap */}
      <rect
        x="36"
        y="50"
        width="28"
        height="20"
        rx="2"
        transform="rotate(-15 36 50)"
        fill="var(--surface-0)"
        stroke="var(--ink-900)"
        strokeWidth="2"
      />
      {/* Heart or cross sticker on laptop */}
      <path
        d="M48 52C46 50 43 51 43 53C43 56 47 58 48 59C49 58 53 56 53 53C53 51 50 50 48 52Z"
        fill="var(--blob-coral)"
      />

      {/* Hands holding the device */}
      <path
        d="M56 46C52 50 46 55 42 60"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Left Arch Canopy of Hand-Drawn Doodles matching the Belle reference image.
 */
export function DoodleCanopyLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Colored Offset Blobs */}
      <path
        d="M50 80C30 90 20 120 40 135C60 150 85 140 90 120C95 100 70 70 50 80Z"
        fill="var(--blob-sky)"
        opacity="0.5"
      />
      <path
        d="M170 30C155 35 150 60 165 72C180 85 200 75 202 58C205 40 185 25 170 30Z"
        fill="var(--blob-leaf)"
        opacity="0.45"
      />
      <path
        d="M110 140C95 145 92 170 108 180C125 190 145 180 145 160C145 140 125 135 110 140Z"
        fill="var(--blob-coral)"
        opacity="0.55"
      />

      {/* Clouds and loops */}
      <path
        d="M60 70C55 58 70 45 85 52C98 40 120 48 118 64C130 65 135 82 124 94C115 104 95 100 85 98C72 105 58 95 60 82Z"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Spiral swirl */}
      <path
        d="M125 75C130 60 145 58 152 70C158 82 142 95 132 88C124 82 130 72 138 74"
        stroke="var(--ink-900)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Stars & Sparkles */}
      <path
        d="M145 110L149 122L162 123L152 131L155 144L145 137L134 144L137 131L127 123L140 122L145 110Z"
        fill="var(--blob-sun)"
        stroke="var(--ink-900)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M65 135L67 141L73 142L68 146L70 152L65 149L60 152L62 146L57 142L63 141L65 135Z"
        stroke="var(--ink-900)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Wavy lines and confetti */}
      <path
        d="M75 110C90 102 105 118 120 110"
        stroke="var(--ink-900)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="175" cy="115" r="3.5" fill="var(--blob-coral)" />
      <circle cx="95" cy="35" r="2.5" fill="var(--ink-900)" />
      <circle cx="35" cy="110" r="3" fill="var(--blob-sun)" />

      {/* Little geometric flower */}
      <path
        d="M185 45C180 40 175 52 185 52C195 52 190 40 185 45Z"
        stroke="var(--ink-900)"
        strokeWidth="1.8"
      />
      <path
        d="M185 52C180 57 190 65 185 52Z"
        stroke="var(--ink-900)"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/**
 * Right Arch Canopy of Hand-Drawn Doodles matching the Belle reference image.
 */
export function DoodleCanopyRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Colored Offset Blobs */}
      <path
        d="M210 70C190 85 185 115 205 130C225 145 250 135 255 115C260 95 235 65 210 70Z"
        fill="var(--blob-coral)"
        opacity="0.45"
      />
      <path
        d="M80 40C65 45 60 70 75 82C90 95 110 85 112 68C115 50 95 35 80 40Z"
        fill="var(--blob-sun)"
        opacity="0.55"
      />
      <path
        d="M140 90C125 95 120 120 138 132C155 142 175 132 175 112C175 92 155 85 140 90Z"
        fill="var(--blob-sky)"
        opacity="0.5"
      />

      {/* Large Star */}
      <path
        d="M85 55L90 70L106 72L93 83L97 99L85 90L72 99L76 83L63 72L79 70L85 55Z"
        fill="var(--blob-coral)"
        stroke="var(--ink-900)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Playful Curly Wave */}
      <path
        d="M20 30C40 10 70 50 95 25C115 5 135 35 150 20"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Heart with scribble */}
      <path
        d="M225 95C215 80 195 85 195 102C195 120 225 140 225 140C225 140 255 120 255 102C255 85 235 80 225 95Z"
        stroke="var(--ink-900)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tiny heart */}
      <path
        d="M235 155C230 148 220 150 220 158C220 166 235 175 235 175C235 175 250 166 250 158C250 150 240 148 235 155Z"
        fill="var(--blob-coral)"
      />

      {/* Sparkles and dots */}
      <path
        d="M125 140C125 146 130 150 136 150C130 150 125 154 125 160C125 154 120 150 114 150C120 150 125 146 125 140Z"
        fill="var(--ink-900)"
      />
      <circle cx="160" cy="65" r="3.5" fill="var(--ink-900)" />
      <circle cx="215" cy="45" r="2.5" fill="var(--blob-sun)" />
      <circle cx="180" cy="155" r="3" fill="var(--blob-coral)" />

      {/* Swirl bracket */}
      <path
        d="M95 150C85 155 80 165 85 175C90 185 82 195 75 190"
        stroke="var(--ink-900)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
