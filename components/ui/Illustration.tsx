/**
 * Illustration component & Original SVG Assets (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Renders original hand-drawn style line art with offset flat colour blobs.
 *
 * Design Spec:
 *  - Theme: "Where Work Happens" style — human, warm, not clinical.
 *  - Navy 2.5px strokes (var(--ink-900) / #0B1F4B).
 *  - Flat colour blobs from --blob-* tokens, offset by 4-8px (default 6px)
 *    like misregistered vintage print.
 *  - Original artwork only (elderly man + phone + dog; doctor + tablet; family call; hero scene).
 */

"use client";

import * as React from "react";

export type IllustrationName =
  | "elderly-phone"
  | "doctor-tablet"
  | "family-call"
  | "hero-scene";

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
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <path
          d="M 60,180 C 40,80 140,40 220,50 C 300,60 360,120 350,220 C 340,300 240,340 150,330 C 70,320 80,260 60,180 Z"
          fill="var(--surface-100)"
        />
        <path
          d="M 175,135 Q 160,165 155,225 Q 185,245 240,230 Q 245,170 230,135 Z"
          fill="var(--blob-teal)"
        />
        <path
          d="M 160,230 Q 155,295 160,315 Q 185,320 195,315 Q 195,270 200,245 Q 205,270 215,315 Q 235,320 245,315 Q 240,270 235,230 Z"
          fill="var(--blob-sky)"
        />
        <ellipse cx="205" cy="95" rx="26" ry="30" fill="var(--blob-sun)" />
        <rect x="238" y="152" width="28" height="48" rx="8" fill="var(--blob-coral)" />
        <path
          d="M 85,285 Q 95,245 135,250 Q 150,265 145,310 Q 110,320 85,310 Z"
          fill="var(--blob-coral)"
        />
        <path
          d="M 285,110 C 305,100 320,115 315,135 C 295,145 280,130 285,110 Z"
          fill="var(--blob-leaf)"
        />
      </g>
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M 40,325 C 120,328 280,328 360,325" strokeDasharray="6 6" />
        <circle cx="198" cy="92" r="7" />
        <circle cx="216" cy="92" r="7" />
        <path d="M 205,92 L 209,92" />
        <path d="M 207,95 Q 206,102 203,105" />
        <path d="M 200,112 Q 208,118 216,112" />
        <path d="M 188,88 Q 185,105 195,122 Q 207,128 220,122 Q 228,105 225,88" />
        <path d="M 186,85 Q 183,72 195,70 Q 212,68 226,75 Q 228,82 227,88" />
        <path d="M 201,80 Q 207,78 213,80" />
        <path d="M 197,125 L 207,138 L 217,125" />
        <path d="M 188,135 Q 165,148 160,185 L 156,232 L 238,232 L 235,185 Q 230,148 207,135" />
        <path d="M 230,155 Q 248,165 244,195 Q 236,198 228,190" />
        <path d="M 163,155 Q 150,185 152,215" />
        <rect x="242" y="155" width="26" height="46" rx="6" />
        <path d="M 248,178 L 252,178 L 255,172 L 258,184 L 261,178 L 264,178" strokeWidth="1.8" />
        <circle cx="255" cy="195" r="2" />
        <path d="M 162,232 L 165,315 L 192,315 L 196,255 L 202,255 L 206,315 L 233,315 L 236,232" />
        <path d="M 158,315 Q 155,322 170,324 Q 192,324 192,315 Z" />
        <path d="M 206,315 Q 206,324 228,324 Q 243,322 240,315 Z" />
        <path d="M 98,255 Q 90,245 84,258 Q 80,270 92,275 Q 106,278 116,270 Q 118,256 108,252 Z" />
        <path d="M 86,252 Q 80,250 78,262" />
        <circle cx="98" cy="260" r="1.5" fill="var(--ink-900)" />
        <circle cx="86" cy="268" r="2" fill="var(--ink-900)" />
        <path d="M 108,268 Q 128,265 142,285 L 140,315 L 126,315 L 124,295 L 114,295 L 110,315 L 94,315 Q 94,290 100,272" />
        <path d="M 142,282 Q 158,272 155,260" strokeWidth="2.2" />
        <path d="M 154,254 L 157,250" />
        <path d="M 160,258 L 165,256" />
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
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <path
          d="M 70,190 C 50,90 150,50 230,60 C 310,70 370,130 360,230 C 350,310 250,350 160,340 C 80,330 90,270 70,190 Z"
          fill="var(--surface-100)"
        />
        <path
          d="M 165,140 Q 140,180 140,265 Q 200,275 260,265 Q 260,180 235,140 Z"
          fill="var(--blob-teal)"
        />
        <rect x="225" y="165" width="62" height="78" rx="8" fill="var(--blob-indigo)" />
        <ellipse cx="200" cy="95" rx="26" ry="30" fill="var(--blob-sun)" />
        <path
          d="M 158,265 Q 155,305 160,320 Q 185,325 195,320 Q 195,290 200,275 Q 205,290 215,320 Q 235,325 245,320 Q 245,305 242,265 Z"
          fill="var(--blob-sky)"
        />
        <circle cx="178" cy="180" r="14" fill="var(--blob-leaf)" />
      </g>
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M 40,328 C 120,330 280,330 360,328" strokeDasharray="6 6" />
        <path d="M 182,85 Q 180,68 196,65 Q 215,64 222,74 Q 224,85 220,95" />
        <circle cx="218" cy="72" r="8" />
        <path d="M 186,88 Q 185,108 196,122 Q 208,126 216,118 Q 222,105 220,88" />
        <circle cx="194" cy="94" r="2" fill="var(--ink-900)" />
        <circle cx="210" cy="94" r="2" fill="var(--ink-900)" />
        <path d="M 202,96 Q 203,103 200,105" />
        <path d="M 197,112 Q 203,117 211,112" />
        <path d="M 192,126 Q 185,150 188,175 Q 195,190 200,190 Q 205,190 212,175 Q 215,150 208,126" strokeWidth="2.2" />
        <circle cx="200" cy="195" r="5" />
        <path d="M 200,190 L 200,195" />
        <path d="M 195,124 L 200,140 L 205,124" />
        <path d="M 180,138 L 194,175 L 180,265" />
        <path d="M 220,138 L 206,175 L 220,265" />
        <path d="M 180,138 Q 155,150 148,185 L 145,265 L 255,265 L 252,185 Q 245,150 220,138" />
        <path d="M 240,165 Q 255,185 248,220" />
        <rect x="168" y="165" width="12" height="16" rx="2" />
        <path d="M 174,160 L 174,165" />
        <rect x="228" y="168" width="60" height="76" rx="6" />
        <path d="M 235,192 L 244,192 L 248,184 L 253,202 L 258,190 L 265,190 L 270,185 L 278,198 L 282,192" strokeWidth="1.8" />
        <rect x="235" y="212" width="8" height="18" rx="2" />
        <rect x="248" y="206" width="8" height="24" rx="2" />
        <rect x="261" y="216" width="8" height="14" rx="2" />
        <circle cx="276" cy="222" r="4" fill="var(--risk-green)" />
        <path d="M 160,265 L 165,320 L 190,320 L 195,278 L 205,278 L 210,320 L 235,320 L 240,265" />
        <path d="M 160,320 Q 158,326 172,328 Q 190,328 190,320 Z" />
        <path d="M 210,320 Q 210,328 228,328 Q 240,326 238,320 Z" />
        <path d="M 285,135 L 290,145 L 300,150 L 290,155 L 285,165 L 280,155 L 270,150 L 280,145 Z" fill="var(--blob-sun)" stroke="var(--ink-900)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * (c) Family member on a video call
 */
export function FamilyCallArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <path
          d="M 80,180 C 60,70 160,50 240,60 C 320,70 370,140 350,240 C 330,320 220,350 140,330 C 70,310 90,260 80,180 Z"
          fill="var(--surface-100)"
        />
        <rect x="145" y="110" width="130" height="170" rx="14" fill="var(--blob-sky)" />
        <ellipse cx="210" cy="170" rx="28" ry="32" fill="var(--blob-sun)" />
        <path d="M 170,210 Q 155,270 265,270 Q 250,210 210,210 Z" fill="var(--blob-coral)" />
        <circle cx="285" cy="115" r="16" fill="var(--blob-leaf)" />
      </g>
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <rect x="145" y="110" width="130" height="170" rx="14" />
        <circle cx="210" cy="120" r="3" fill="var(--ink-900)" />
        <path d="M 190,165 Q 185,140 210,138 Q 235,140 230,165" />
        <circle cx="202" cy="168" r="2" fill="var(--ink-900)" />
        <circle cx="218" cy="168" r="2" fill="var(--ink-900)" />
        <path d="M 210,172 L 208,178" />
        <path d="M 204,185 Q 210,190 216,185" />
        <path d="M 230,150 Q 242,160 238,180" />
        <path d="M 180,210 Q 165,230 162,270 L 258,270 Q 255,230 240,210" />
        <path d="M 240,225 Q 255,215 258,195 Q 250,192 245,200" />
        <path
          d="M 285,115 C 280,108 272,110 272,116 C 272,124 285,132 285,132 C 285,132 298,124 298,116 C 298,110 290,108 285,115 Z"
          fill="var(--blob-coral)"
          stroke="var(--ink-900)"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}

/**
 * (d) Hero scene: patient, dog, daughter, and doctor together
 */
export function HeroSceneArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg
      viewBox="0 0 600 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <path
          d="M 60,180 C 40,60 200,30 320,40 C 460,50 560,110 540,230 C 520,330 380,360 220,340 C 80,320 80,260 60,180 Z"
          fill="var(--surface-100)"
        />
        <path d="M 120,150 Q 100,200 95,280 Q 150,290 190,280 Q 185,200 170,150 Z" fill="var(--blob-teal)" />
        <ellipse cx="145" cy="110" rx="22" ry="26" fill="var(--blob-sun)" />
        <path d="M 50,285 Q 60,250 95,255 Q 110,270 105,310 Q 75,320 50,310 Z" fill="var(--blob-coral)" />
        <path d="M 260,170 Q 240,215 235,285 Q 285,295 325,285 Q 320,215 305,170 Z" fill="var(--blob-sky)" />
        <ellipse cx="282" cy="120" rx="20" ry="24" fill="var(--blob-sun)" />
        <path d="M 400,140 Q 370,185 365,280 Q 430,290 480,280 Q 475,185 450,140 Z" fill="var(--blob-indigo)" />
        <ellipse cx="425" cy="100" rx="22" ry="26" fill="var(--blob-sun)" />
        <rect x="440" y="160" width="45" height="60" rx="6" fill="var(--brand-mint)" />
      </g>
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M 30,325 C 180,330 420,330 570,325" strokeDasharray="6 6" />
        {/* Patient */}
        <circle cx="140" cy="108" r="6" />
        <circle cx="154" cy="108" r="6" />
        <path d="M 146,108 L 148,108" />
        <path d="M 143,122 Q 148,126 153,122" />
        <path d="M 130,105 Q 128,90 145,88 Q 162,90 160,105" />
        <path d="M 130,145 L 145,155 L 160,145" />
        <path d="M 130,150 Q 110,165 105,285 L 185,285 Q 180,165 160,150" />
        <rect x="165" y="170" width="22" height="38" rx="4" />
        <path d="M 105,285 L 110,322 L 132,322 L 135,285 L 155,285 L 158,322 L 180,322 L 185,285" />
        {/* Dog */}
        <circle cx="65" cy="270" r="1.5" fill="var(--ink-900)" />
        <path d="M 55,265 Q 50,260 55,275 Q 65,282 75,275 Q 78,265 70,262 Z" />
        <path d="M 72,275 Q 88,272 98,290 L 96,322 L 60,322 Q 60,295 68,280" />
        <path d="M 98,288 Q 112,278 110,268" />
        {/* Daughter */}
        <circle cx="276" cy="118" r="2" fill="var(--ink-900)" />
        <circle cx="288" cy="118" r="2" fill="var(--ink-900)" />
        <path d="M 280,128 Q 284,132 288,128" />
        <path d="M 268,115 Q 265,98 282,96 Q 298,98 296,115" />
        <path d="M 296,112 Q 306,120 302,138" />
        <path d="M 270,165 Q 250,180 245,285 L 315,285 Q 310,180 290,165" />
        <path d="M 245,285 L 250,322 L 270,322 L 275,285 L 285,285 L 290,322 L 310,322 L 315,285" />
        {/* Doctor */}
        <circle cx="418" cy="98" r="2" fill="var(--ink-900)" />
        <circle cx="432" cy="98" r="2" fill="var(--ink-900)" />
        <path d="M 422,108 Q 426,112 430,108" />
        <path d="M 410,95 Q 408,78 425,76 Q 442,78 440,95" />
        <circle cx="438" cy="84" r="6" />
        <path d="M 418,122 Q 412,140 415,155 Q 425,165 435,155 Q 438,140 432,122" />
        <circle cx="425" cy="168" r="4" />
        <path d="M 405,145 Q 380,160 375,285 L 465,285 Q 460,160 435,145" />
        <rect x="440" y="165" width="44" height="58" rx="5" />
        <path d="M 375,285 L 380,322 L 405,322 L 410,285 L 430,285 L 435,322 L 460,322 L 465,285" />
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
          : name === "doctor-tablet"
          ? "Doctor reviewing patient trends on tablet"
          : name === "family-call"
          ? "Family member on a video call"
          : "Community care team: patient, dog, family, and doctor")
      }
      style={{ width, height }}
      className={`relative inline-block select-none ${className}`}
    >
      {children ? (
        children
      ) : name === "elderly-phone" ? (
        <ElderlyPhoneArt offset={offset} />
      ) : name === "doctor-tablet" ? (
        <DoctorTabletArt offset={offset} />
      ) : name === "family-call" ? (
        <FamilyCallArt offset={offset} />
      ) : (
        <HeroSceneArt offset={offset} />
      )}
    </div>
  );
}
