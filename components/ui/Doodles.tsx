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

export function DoodleDaisy({
  size = 28,
  className = "",
  color = "var(--ink-900)",
  centerColor = "var(--accent-yellow)",
}: {
  size?: number;
  className?: string;
  color?: string;
  centerColor?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 8 rounded flower petals */}
      <circle cx="16" cy="6" r="4.5" fill={color} />
      <circle cx="16" cy="26" r="4.5" fill={color} />
      <circle cx="6" cy="16" r="4.5" fill={color} />
      <circle cx="26" cy="16" r="4.5" fill={color} />
      <circle cx="9" cy="9" r="4.5" fill={color} />
      <circle cx="23" cy="23" r="4.5" fill={color} />
      <circle cx="9" cy="23" r="4.5" fill={color} />
      <circle cx="23" cy="9" r="4.5" fill={color} />
      {/* Flower core */}
      <circle cx="16" cy="16" r="5" fill={centerColor} stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function DoodleClaudCloud({
  width = 72,
  height = 46,
  className = "",
  fill = "var(--surface-0)",
  stroke = "var(--ink-900)",
}: {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
  stroke?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cartoon cloud outline with soft bumps */}
      <path
        d="M22 42C12 42 6 34 8 25C9 16 19 14 25 15C29 8 41 6 48 11C54 6 67 9 68 18C75 19 78 28 73 35C69 41 62 42 54 42H22Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cartoon eyes */}
      <circle cx="34" cy="26" r="2.5" fill={stroke} />
      <circle cx="48" cy="26" r="2.5" fill={stroke} />
      {/* Winking or playful smile */}
      <path
        d="M38 31C40 34 44 34 46 31"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rosy blush */}
      <circle cx="28" cy="30" r="3" fill="var(--accent-pink)" opacity="0.6" />
      <circle cx="54" cy="30" r="3" fill="var(--accent-pink)" opacity="0.6" />
    </svg>
  );
}

export function DoodleHandPress({
  className = "",
  width = 64,
  height = 64,
  stroke = "var(--ink-900)",
}: {
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hand pressing downward with pointing index finger */}
      <path
        d="M32 4L32 38"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M26 24C23 20 18 20 17 26C16 32 20 37 26 38"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 34C37 34 42 32 42 27C42 23 37 22 34 25"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Button being pressed */}
      <rect
        x="18"
        y="42"
        width="28"
        height="12"
        rx="4"
        fill="var(--accent-yellow)"
        stroke={stroke}
        strokeWidth="2.5"
      />
      {/* Click ripple rays */}
      <path d="M12 44L7 40" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M52 44L57 40" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 58L32 63" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

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

/**
 * Authentic Surrealist Art Collage from Daisy Inspiration (Screenshot 4):
 * Classical portrait silhouette with open glowing pink brain, floating 3D shiny sphere,
 * yellow smiling daisy scribble, silver foil ghost, golden ribbon wave, and handwriting.
 */
export function DaisyMonaLisaCollage({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Shiny 3D Pink Sphere Gradient */}
        <radialGradient id="sphereGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FF77B2" />
          <stop offset="70%" stopColor="#D92672" />
          <stop offset="100%" stopColor="#800D3C" />
        </radialGradient>
        {/* Silver Foil Ghost Gradient */}
        <linearGradient id="silverFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        {/* Golden Ribbon Gradient */}
        <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* ─── 1. FLOATING 3D SHINY SPHERE (Top center) ──────────── */}
      <circle cx="270" cy="50" r="26" fill="url(#sphereGrad)" filter="drop-shadow(3px 5px 6px rgba(0,0,0,0.25))" />
      {/* Specular highlight glint on sphere */}
      <ellipse cx="260" cy="42" rx="7" ry="4" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 260 42)" />

      {/* ─── 2. SILVER FOIL GHOST STICKER (Top Right) ──────────── */}
      <g transform="translate(380, 50)" filter="drop-shadow(2px 3px 4px rgba(0,0,0,0.2))">
        <path
          d="M25 0C11.2 0 0 11.2 0 25C0 35 6 42 10 48C13 52 18 48 22 52C26 56 31 52 35 56C39 52 44 54 48 50C52 46 50 35 50 25C50 11.2 38.8 0 25 0Z"
          fill="url(#silverFoil)"
          stroke="#121214"
          strokeWidth="2"
        />
        {/* Ghost eyes and playful mouth */}
        <circle cx="18" cy="22" r="3.5" fill="#121214" />
        <circle cx="32" cy="22" r="3.5" fill="#121214" />
        <ellipse cx="25" cy="32" rx="4" ry="5" fill="#121214" />
      </g>

      {/* ─── 3. HANDWRITTEN MATH / SCRIPT EQUATIONS (Upper Right) ── */}
      <g stroke="#121214" strokeWidth="1.2" opacity="0.6" strokeLinecap="round">
        <path d="M220 120C240 110 260 115 280 108" />
        <path d="M215 130C235 125 270 135 295 122" />
        <path d="M225 142C250 138 275 145 300 136" />
        <path d="M210 155C230 152 260 158 285 150" />
        <path d="M230 168C255 165 280 172 310 160" />
        <text x="320" y="125" fontFamily="monospace" fontSize="9" fill="#121214" opacity="0.7">
          e^{"{"}iπ{"}"}+1=0
        </text>
        <text x="325" y="145" fontFamily="monospace" fontSize="8" fill="#121214" opacity="0.7">
          ∇×B = μ₀J
        </text>
      </g>

      {/* ─── 4. YELLOW SMILING DAISY FLOWER STICKER (Center Right) ── */}
      <g transform="translate(320, 160)" filter="drop-shadow(2px 3px 0px #121214)">
        {/* Scribbled Stem */}
        <path d="M25 45C22 60 28 75 24 90" stroke="#121214" strokeWidth="2.5" strokeLinecap="round" />
        {/* Flower Petals */}
        <ellipse cx="25" cy="10" rx="9" ry="14" fill="#FDE047" stroke="#121214" strokeWidth="2" />
        <ellipse cx="25" cy="40" rx="9" ry="14" fill="#FDE047" stroke="#121214" strokeWidth="2" />
        <ellipse cx="10" cy="25" rx="14" ry="9" fill="#FDE047" stroke="#121214" strokeWidth="2" />
        <ellipse cx="40" cy="25" rx="14" ry="9" fill="#FDE047" stroke="#121214" strokeWidth="2" />
        <ellipse cx="14" cy="14" rx="10" ry="12" fill="#FDE047" stroke="#121214" strokeWidth="2" transform="rotate(-45 14 14)" />
        <ellipse cx="36" cy="36" rx="10" ry="12" fill="#FDE047" stroke="#121214" strokeWidth="2" transform="rotate(-45 36 36)" />
        <ellipse cx="14" cy="36" rx="10" ry="12" fill="#FDE047" stroke="#121214" strokeWidth="2" transform="rotate(45 14 36)" />
        <ellipse cx="36" cy="14" rx="10" ry="12" fill="#FDE047" stroke="#121214" strokeWidth="2" transform="rotate(45 36 14)" />
        {/* Flower Center with Smile */}
        <circle cx="25" cy="25" r="13" fill="#FFFFFF" stroke="#121214" strokeWidth="2" />
        <circle cx="20" cy="22" r="2" fill="#121214" />
        <circle cx="30" cy="22" r="2" fill="#121214" />
        <path d="M20 27C22 31 28 31 30 27" stroke="#121214" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ─── 5. GOLDEN RIBBON SQUIGGLE (Far Right) ─────────────── */}
      <g transform="translate(390, 220)">
        <path
          d="M0 20C15 5 25 35 40 20C55 5 65 35 80 20"
          stroke="url(#goldRibbon)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="drop-shadow(2px 3px 4px rgba(0,0,0,0.2))"
        />
      </g>

      {/* ─── 6. MONA LISA / RENAISSANCE PORTRAIT WITH EXPOSED BRAIN ── */}
      <g transform="translate(180, 200)">
        {/* Soft pink highlight aura behind head */}
        <ellipse cx="110" cy="140" rx="95" ry="120" fill="#FF5C98" opacity="0.3" filter="blur(16px)" />

        {/* Outer Hot Pink Cutout Border Silhouette (matching Daisy) */}
        <path
          d="M110 50C70 50 35 80 30 130C25 180 15 220 0 280H220C205 220 195 180 190 130C185 80 150 50 110 50Z"
          fill="#1E1E24"
          stroke="#FF5C98"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Draped Renaissance Garment */}
        <path
          d="M10 280C25 240 45 200 65 190C85 200 135 200 155 190C175 200 195 240 210 280H10Z"
          fill="#2C2B30"
          stroke="#121214"
          strokeWidth="2"
        />
        {/* Garment Fold Lines */}
        <path d="M65 190C75 220 85 250 90 280" stroke="#121214" strokeWidth="1.8" />
        <path d="M155 190C145 220 135 250 130 280" stroke="#121214" strokeWidth="1.8" />

        {/* Neck & Chest Area */}
        <path
          d="M85 160C85 185 135 185 135 160V140H85V160Z"
          fill="#F6E7D2"
          stroke="#121214"
          strokeWidth="1.8"
        />

        {/* Face Outline & Classic Mona Lisa Features */}
        <path
          d="M75 110C75 145 90 168 110 168C130 168 145 145 145 110C145 95 140 85 110 85C80 85 75 95 75 110Z"
          fill="#FCEBD6"
          stroke="#121214"
          strokeWidth="2"
        />
        {/* Soft classic renaissance hair parted down middle */}
        <path
          d="M68 95C65 125 60 165 55 190C68 175 75 145 78 120"
          fill="#3B2F2F"
          stroke="#121214"
          strokeWidth="1.8"
        />
        <path
          d="M152 95C155 125 160 165 165 190C152 175 145 145 142 120"
          fill="#3B2F2F"
          stroke="#121214"
          strokeWidth="1.8"
        />

        {/* Serene eyes, subtle eyebrows, and enigmatic smile */}
        <ellipse cx="96" cy="118" rx="4" ry="2.5" fill="#4B382A" />
        <ellipse cx="124" cy="118" rx="4" ry="2.5" fill="#4B382A" />
        <path d="M90 112C95 110 102 110 105 112" stroke="#4B382A" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M115 112C118 110 125 110 130 112" stroke="#4B382A" strokeWidth="1.2" strokeLinecap="round" />
        {/* Nose bridge */}
        <path d="M110 115V132L114 135" stroke="#4B382A" strokeWidth="1.4" strokeLinecap="round" />
        {/* Famous gentle smile */}
        <path d="M102 146C106 149 114 149 118 146" stroke="#4B382A" strokeWidth="1.8" strokeLinecap="round" />

        {/* ─── THE ICONIC EXPOSED GLOWING BRAIN (Top of Head) ──── */}
        <g transform="translate(68, 40)">
          {/* Glowing pink brain convolutions */}
          <path
            d="M42 45C30 45 15 35 15 22C15 10 26 0 42 0C58 0 69 10 69 22C69 35 54 45 42 45Z"
            fill="#FF77B2"
            stroke="#121214"
            strokeWidth="2.5"
          />
          {/* Convoluted gyri and sulci curves */}
          <path
            d="M25 20C30 15 36 25 42 18C48 12 55 22 60 16M28 28C34 24 38 32 46 26C52 22 58 28 62 25M35 8C38 14 42 8 46 12"
            stroke="#800D3C"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Sparkles radiating from brain thoughts */}
          <path d="M42 -6L42 -14" stroke="#FF5C98" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 -2L12 -8" stroke="#FF5C98" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 -2L72 -8" stroke="#FF5C98" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

