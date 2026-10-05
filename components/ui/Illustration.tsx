/**
 * Illustration component & Original SVG Assets (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Renders original hand-drawn style line art with offset flat colour blobs.
 *
 * Design Spec:
 *  - Theme: "Where Work Happens" style — human, warm, not clinical.
 *  - Navy 2px strokes (var(--ink-900) / #0B1F4B).
 *  - Flat colour blobs from --blob-* tokens, offset by 4-8px (default 6px)
 *    like misregistered vintage print.
 *  - Original artwork only (elderly man + phone + dog; doctor + tablet).
 */

"use client";

import * as React from "react";

export type IllustrationName = "elderly-phone" | "doctor-tablet";

export interface IllustrationProps {
  name?: IllustrationName;
  width?: number | string;
  height?: number | string;
  offset?: number;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

/**
 * (a) Elderly man holding a phone with a dog at his feet
 */
export function ElderlyPhoneArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* ─── BLOB LAYER (Offset colour blocks) ─── */}
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        {/* Soft background aura blob */}
        <path
          d="M 60,180 C 40,80 140,40 220,50 C 300,60 360,120 350,220 C 340,300 240,340 150,330 C 70,320 80,260 60,180 Z"
          fill="var(--surface-100)"
        />
        {/* Teal shirt blob for elderly man */}
        <path
          d="M 175,135 Q 160,165 155,225 Q 185,245 240,230 Q 245,170 230,135 Z"
          fill="var(--blob-teal)"
        />
        {/* Sky blue trousers blob */}
        <path
          d="M 160,230 Q 155,295 160,315 Q 185,320 195,315 Q 195,270 200,245 Q 205,270 215,315 Q 235,320 245,315 Q 240,270 235,230 Z"
          fill="var(--blob-sky)"
        />
        {/* Warm Sun/Amber blob for head/skin tone */}
        <ellipse cx="205" cy="95" rx="26" ry="30" fill="var(--blob-sun)" />
        {/* Coral blob for smartphone */}
        <rect x="238" y="152" width="28" height="48" rx="8" fill="var(--blob-coral)" />
        {/* Coral/Sun blob for dog body */}
        <path
          d="M 85,285 Q 95,245 135,250 Q 150,265 145,310 Q 110,320 85,310 Z"
          fill="var(--blob-coral)"
        />
        {/* Leaf green decorative leaf/spark blob */}
        <path
          d="M 285,110 C 305,100 320,115 315,135 C 295,145 280,130 285,110 Z"
          fill="var(--blob-leaf)"
        />
      </g>

      {/* ─── NAVY LINE LAYER (Hand-drawn 2px strokes) ─── */}
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Ground shadow / baseline */}
        <path d="M 40,325 C 120,328 280,328 360,325" strokeDasharray="6 6" />

        {/* ── Man's Head & Face ── */}
        {/* spectacles */}
        <circle cx="198" cy="92" r="7" />
        <circle cx="216" cy="92" r="7" />
        <path d="M 205,92 L 209,92" />
        {/* nose & warm smile */}
        <path d="M 207,95 Q 206,102 203,105" />
        <path d="M 200,112 Q 208,118 216,112" />
        {/* chin & bald/curly side hair */}
        <path d="M 188,88 Q 185,105 195,122 Q 207,128 220,122 Q 228,105 225,88" />
        <path d="M 186,85 Q 183,72 195,70 Q 212,68 226,75 Q 228,82 227,88" />
        {/* gentle forehead smile lines */}
        <path d="M 201,80 Q 207,78 213,80" />

        {/* ── Man's Body & Clothes ── */}
        {/* collar */}
        <path d="M 197,125 L 207,138 L 217,125" />
        {/* shoulders & torso */}
        <path d="M 188,135 Q 165,148 160,185 L 156,232 L 238,232 L 235,185 Q 230,148 207,135" />
        {/* left arm holding phone */}
        <path d="M 230,155 Q 248,165 244,195 Q 236,198 228,190" />
        {/* right arm relaxed */}
        <path d="M 163,155 Q 150,185 152,215" />

        {/* ── Smartphone with heart health pulse ── */}
        <rect x="242" y="155" width="26" height="46" rx="6" />
        <path d="M 248,178 L 252,178 L 255,172 L 258,184 L 261,178 L 264,178" strokeWidth="1.8" />
        <circle cx="255" cy="195" r="2" />

        {/* ── Man's Trousers & Shoes ── */}
        <path d="M 162,232 L 165,315 L 192,315 L 196,255 L 202,255 L 206,315 L 233,315 L 236,232" />
        {/* shoes */}
        <path d="M 158,315 Q 155,322 170,324 Q 192,324 192,315 Z" />
        <path d="M 206,315 Q 206,324 228,324 Q 243,322 240,315 Z" />

        {/* ── Dog at his feet (Happy wagging companion) ── */}
        {/* dog head & floppy ears */}
        <path d="M 98,255 Q 90,245 84,258 Q 80,270 92,275 Q 106,278 116,270 Q 118,256 108,252 Z" />
        <path d="M 86,252 Q 80,250 78,262" /> {/* ear */}
        <circle cx="98" cy="260" r="1.5" fill="var(--ink-900)" /> {/* eye */}
        <circle cx="86" cy="268" r="2" fill="var(--ink-900)" /> {/* nose */}
        {/* dog body */}
        <path d="M 108,268 Q 128,265 142,285 L 140,315 L 126,315 L 124,295 L 114,295 L 110,315 L 94,315 Q 94,290 100,272" />
        {/* wagging tail */}
        <path d="M 142,282 Q 158,272 155,260" strokeWidth="2.2" />
        <path d="M 154,254 L 157,250" />
        <path d="M 160,258 L 165,256" />

        {/* Decorative heart / connection sparks */}
        <path
          d="M 282,145 C 278,138 270,140 270,146 C 270,154 282,162 282,162 C 282,162 294,154 294,146 C 294,140 286,138 282,145 Z"
          fill="var(--blob-coral)"
          stroke="var(--ink-900)"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}

/**
 * (b) Doctor holding a clinical tablet
 */
export function DoctorTabletArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* ─── BLOB LAYER (Offset colour blocks) ─── */}
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        {/* Soft aura blob */}
        <path
          d="M 70,190 C 50,90 150,50 230,60 C 310,70 370,130 360,230 C 350,310 250,350 160,340 C 80,330 90,270 70,190 Z"
          fill="var(--surface-100)"
        />
        {/* Doctor coat teal blob */}
        <path
          d="M 165,140 Q 140,180 140,265 Q 200,275 260,265 Q 260,180 235,140 Z"
          fill="var(--blob-teal)"
        />
        {/* Indigo tablet screen blob */}
        <rect x="225" y="165" width="62" height="78" rx="8" fill="var(--blob-indigo)" />
        {/* Warm Sun/Amber blob for head/skin tone */}
        <ellipse cx="200" cy="95" rx="26" ry="30" fill="var(--blob-sun)" />
        {/* Sky blue trousers blob */}
        <path
          d="M 158,265 Q 155,305 160,320 Q 185,325 195,320 Q 195,290 200,275 Q 205,290 215,320 Q 235,325 245,320 Q 245,305 242,265 Z"
          fill="var(--blob-sky)"
        />
        {/* Leaf green badge/accent blob */}
        <circle cx="178" cy="180" r="14" fill="var(--blob-leaf)" />
      </g>

      {/* ─── NAVY LINE LAYER (Hand-drawn 2px strokes) ─── */}
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Baseline ground */}
        <path d="M 40,328 C 120,330 280,330 360,328" strokeDasharray="6 6" />

        {/* ── Doctor's Head & Friendly Face ── */}
        <path d="M 182,85 Q 180,68 196,65 Q 215,64 222,74 Q 224,85 220,95" /> {/* Hair / bun */}
        <circle cx="218" cy="72" r="8" /> {/* Hair bun */}
        {/* face contour */}
        <path d="M 186,88 Q 185,108 196,122 Q 208,126 216,118 Q 222,105 220,88" />
        {/* eyes, nose, smile */}
        <circle cx="194" cy="94" r="2" fill="var(--ink-900)" />
        <circle cx="210" cy="94" r="2" fill="var(--ink-900)" />
        <path d="M 202,96 Q 203,103 200,105" />
        <path d="M 197,112 Q 203,117 211,112" />

        {/* ── Stethoscope around neck ── */}
        <path d="M 192,126 Q 185,150 188,175 Q 195,190 200,190 Q 205,190 212,175 Q 215,150 208,126" strokeWidth="2.2" />
        <circle cx="200" cy="195" r="5" />
        <path d="M 200,190 L 200,195" />

        {/* ── Doctor Coat & Scrubs ── */}
        <path d="M 195,124 L 200,140 L 205,124" /> {/* inner collar */}
        {/* coat lapels */}
        <path d="M 180,138 L 194,175 L 180,265" />
        <path d="M 220,138 L 206,175 L 220,265" />
        {/* shoulders & arms */}
        <path d="M 180,138 Q 155,150 148,185 L 145,265 L 255,265 L 252,185 Q 245,150 220,138" />
        {/* left arm holding tablet */}
        <path d="M 240,165 Q 255,185 248,220" />
        {/* ID badge clip */}
        <rect x="168" y="165" width="12" height="16" rx="2" />
        <path d="M 174,160 L 174,165" />

        {/* ── Clinical Tablet with Chart/Vitals ── */}
        <rect x="228" y="168" width="60" height="76" rx="6" />
        {/* screen waveform / chart line */}
        <path d="M 235,192 L 244,192 L 248,184 L 253,202 L 258,190 L 265,190 L 270,185 L 278,198 L 282,192" strokeWidth="1.8" />
        {/* bar graph indicators */}
        <rect x="235" y="212" width="8" height="18" rx="2" />
        <rect x="248" y="206" width="8" height="24" rx="2" />
        <rect x="261" y="216" width="8" height="14" rx="2" />
        <circle cx="276" cy="222" r="4" fill="var(--risk-green)" />

        {/* ── Trousers & Shoes ── */}
        <path d="M 160,265 L 165,320 L 190,320 L 195,278 L 205,278 L 210,320 L 235,320 L 240,265" />
        <path d="M 160,320 Q 158,326 172,328 Q 190,328 190,320 Z" />
        <path d="M 210,320 Q 210,328 228,328 Q 240,326 238,320 Z" />

        {/* Status spark indicator */}
        <path d="M 285,135 L 290,145 L 300,150 L 290,155 L 285,165 L 280,155 L 270,150 L 280,145 Z" fill="var(--blob-sun)" stroke="var(--ink-900)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * Illustration Wrapper component
 */
export function Illustration({
  name = "elderly-phone",
  width = "100%",
  height = "auto",
  offset = 6,
  className = "",
  children,
  ariaLabel,
}: IllustrationProps) {
  return (
    <div
      role="img"
      aria-label={
        ariaLabel ||
        (name === "elderly-phone"
          ? "Elderly patient checking health on phone with dog companion"
          : "Doctor reviewing patient trends on tablet")
      }
      style={{ width, height }}
      className={`relative inline-block select-none ${className}`}
    >
      {children ? (
        children
      ) : name === "elderly-phone" ? (
        <ElderlyPhoneArt offset={offset} />
      ) : (
        <DoctorTabletArt offset={offset} />
      )}
    </div>
  );
}
