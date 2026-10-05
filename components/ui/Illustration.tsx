/**
 * CareBridge Illustration Suite (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Original, bespoke hand-drawn vector art with offset flat colour shapes.
 * Inspired directly by the iconic "Where Work Happens" and "G Suite: All Together Now"
 * editorial illustration campaigns.
 *
 * Rules:
 *  - 2.5px hand-drawn navy ink strokes (var(--ink-900))
 *  - Flat, playful, offset organic and geometric color blocks (--blob-*)
 *  - Real human moments, expressive characters, friendly companion dog
 *  - Doodled ribbons, annotations, and speech bubbles
 */

"use client";

import * as React from "react";

export type IllustrationName =
  | "hero-scene"
  | "elderly-phone"
  | "doctor-tablet"
  | "family-call"
  | "data-funnel";

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
 * 1. MASTERPIECE HERO SCENE ("Where Care Happens")
 * ──────────────────────────────────────────────────
 * Multi-generational collaborative scene:
 * - Grandfather Ramesh holding phone with green adherence badge
 * - Companion dog stretching playfully at his feet
 * - Daughter Priya waving warmly from a video bubble with heart sparks
 * - Dr. Meera Rao reviewing a clinical tablet with waveform charts
 * - Interconnected ribbon waves and vibrant offset color blocks
 */
export function MasterpieceHeroArt({ offset = 8 }: { offset?: number }) {
  return (
    <svg
      viewBox="0 0 720 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
    >
      {/* ─── COLOR BLOCK LAYER (Offset misregistered print effect) ─── */}
      <g transform={`translate(${offset}, ${offset})`} opacity="0.9">
        {/* Big sunshine aura circle */}
        <circle cx="360" cy="180" r="140" fill="var(--blob-sun)" opacity="0.25" />

        {/* Ramesh's Teal shirt block */}
        <path
          d="M 120,220 C 100,260 90,340 90,380 C 150,390 190,380 200,340 C 200,280 180,220 150,210 Z"
          fill="var(--blob-teal)"
        />
        {/* Ramesh's Sky Blue trousers */}
        <path d="M 95,380 L 110,430 L 140,430 L 150,380 L 185,430 L 205,430 L 195,380 Z" fill="var(--blob-sky)" />
        {/* Ramesh head tone */}
        <ellipse cx="150" cy="155" rx="30" ry="34" fill="var(--blob-sun)" />

        {/* Dog coral/tangerine block */}
        <path
          d="M 40,370 Q 50,320 95,330 Q 115,350 110,410 Q 70,430 40,410 Z"
          fill="var(--blob-coral)"
        />

        {/* Daughter's Coral dress block */}
        <path
          d="M 330,230 Q 300,290 290,380 Q 360,390 410,380 Q 400,290 370,230 Z"
          fill="var(--blob-coral)"
        />
        {/* Daughter head tone */}
        <ellipse cx="350" cy="165" rx="26" ry="30" fill="var(--blob-sun)" />
        {/* Video check-in screen teal rectangle */}
        <rect x="300" y="80" width="100" height="70" rx="12" fill="var(--blob-teal)" opacity="0.3" />

        {/* Doctor's Deep Indigo coat block */}
        <path
          d="M 520,190 Q 480,250 470,380 Q 560,395 620,380 Q 610,250 570,190 Z"
          fill="var(--blob-indigo)"
        />
        {/* Doctor mint tablet screen */}
        <rect x="560" y="220" width="70" height="90" rx="8" fill="var(--brand-mint)" />
        {/* Doctor head tone */}
        <ellipse cx="545" cy="135" rx="28" ry="32" fill="var(--blob-sun)" />

        {/* Floating vibrant accent shapes */}
        <path d="M 230,80 C 270,50 310,90 280,120 Z" fill="var(--blob-berry)" />
        <circle cx="490" cy="90" r="22" fill="var(--blob-leaf)" />
        <rect x="180" y="240" width="40" height="60" rx="6" fill="var(--blob-coral)" />
      </g>

      {/* ─── NAVY LINE LAYER (Hand-Drawn Charcoal/Ink Strokes) ─── */}
      <g
        stroke="var(--ink-900)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Ground baseline */}
        <path d="M 20,435 C 200,438 520,438 700,435" strokeDasharray="8 8" />

        {/* Playful ribbon connection swoosh overhead */}
        <path
          d="M 60,110 C 180,-20 380,40 480,-10 C 560,-50 640,40 680,100"
          stroke="var(--blob-teal)"
          strokeWidth="3.5"
          strokeDasharray="6 6"
        />

        {/* ─── 1. RAMESH (PATIENT) ─── */}
        {/* Spectacles & kind face */}
        <circle cx="140" cy="150" r="8" />
        <circle cx="160" cy="150" r="8" />
        <path d="M 148,150 L 152,150" />
        <path d="M 150,154 Q 149,162 145,166" />
        <path d="M 142,174 Q 150,180 160,174" />
        {/* Head outline & cheerful smile */}
        <path d="M 130,145 Q 126,128 142,125 Q 165,123 172,135 Q 175,145 170,170 Q 155,188 135,178" />
        {/* Collar & Torso */}
        <path d="M 140,185 L 150,198 L 162,185" />
        <path d="M 130,195 Q 105,215 100,265 L 95,380 L 198,380 L 195,265 Q 190,215 162,195" />
        {/* Right arm holding smartphone */}
        <path d="M 175,230 Q 198,245 194,295 L 175,295" />
        {/* Left arm relaxed with thumbs up gesture */}
        <path d="M 110,230 Q 80,270 95,310" />

        {/* Smartphone with green check & heart icon */}
        <rect x="185" y="245" width="34" height="58" rx="7" />
        <path d="M 194,272 L 199,277 L 208,266" stroke="var(--brand-teal)" strokeWidth="2.4" />
        <path d="M 195,290 L 210,290" strokeWidth="1.5" />

        {/* Speech Bubble: "दवाई ले ली ✓" */}
        <g transform="translate(60, 85)">
          <rect x="0" y="0" width="105" height="34" rx="10" fill="var(--surface-0)" stroke="var(--ink-900)" strokeWidth="2" />
          <path d="M 60,34 L 68,44 L 74,34 Z" fill="var(--surface-0)" stroke="var(--ink-900)" strokeWidth="2" />
          <text x="12" y="22" fontFamily="var(--font-display)" fontSize="12" fontWeight="700" fill="var(--ink-900)">
            दवाई ले ली ✓
          </text>
        </g>

        {/* Legs & comfy sandals */}
        <path d="M 105,380 L 110,435 L 138,435 L 145,380 L 158,380 L 165,435 L 195,435 L 198,380" />
        <path d="M 102,435 Q 100,442 118,444 Q 138,444 138,435 Z" />
        <path d="M 165,435 Q 165,444 185,444 Q 202,442 198,435 Z" />

        {/* ─── 2. COMPANION DOG (LOYAL FRIEND) ─── */}
        <g transform="translate(0, 5)">
          {/* Dog head & floppy ear */}
          <path d="M 52,345 Q 40,335 34,348 Q 30,362 44,368 Q 60,372 72,362 Q 74,346 62,342 Z" />
          <path d="M 36,342 Q 28,340 26,354" />
          <circle cx="48" cy="350" r="2" fill="var(--ink-900)" />
          <circle cx="35" cy="360" r="2.5" fill="var(--ink-900)" />
          {/* Body curled happily */}
          <path d="M 62,360 Q 86,356 102,380 L 100,425 L 82,425 L 80,398 L 68,398 L 64,425 L 45,425 Q 45,390 54,366" />
          {/* Wagging tail motion */}
          <path d="M 102,375 Q 122,362 118,348" strokeWidth="2.4" />
          <path d="M 118,340 L 122,335" />
          <path d="M 126,346 L 132,344" />
        </g>

        {/* ─── 3. PRIYA (DAUGHTER ON FAMILY CHECK-IN) ─── */}
        {/* Head & ponytail */}
        <path d="M 334,142 Q 328,118 350,116 Q 374,118 370,142" />
        <circle cx="344" cy="146" r="2" fill="var(--ink-900)" />
        <circle cx="358" cy="146" r="2" fill="var(--ink-900)" />
        <path d="M 351,152 L 349,158" />
        <path d="M 345,164 Q 351,170 358,164" />
        <path d="M 370,128 Q 386,136 380,160" /> {/* Ponytail */}
        {/* Torso & Waving Hand */}
        <path d="M 332,185 Q 308,205 300,265 L 295,380 L 405,380 L 400,265 Q 395,205 368,185" />
        {/* Waving arm */}
        <path d="M 380,215 Q 410,200 415,168 Q 405,164 398,172" />
        {/* Heart sparks around her */}
        <path
          d="M 430,145 C 425,138 416,140 416,147 C 416,156 430,165 430,165 C 430,165 444,156 444,147 C 444,140 435,138 430,145 Z"
          fill="var(--blob-coral)"
          stroke="var(--ink-900)"
          strokeWidth="1.8"
        />
        {/* Legs */}
        <path d="M 315,380 L 320,435 L 345,435 L 350,380 L 360,380 L 365,435 L 390,435 L 395,380" />

        {/* ─── 4. DR. MEERA RAO (CLINICAL COCKPIT) ─── */}
        {/* Hair bun & alert attentive face */}
        <path d="M 530,118 Q 525,98 545,95 Q 568,98 565,118" />
        <circle cx="562" cy="100" r="7" /> {/* Hair bun */}
        <circle cx="538" cy="122" r="2" fill="var(--ink-900)" />
        <circle cx="552" cy="122" r="2" fill="var(--ink-900)" />
        <path d="M 545,126 Q 546,133 543,136" />
        <path d="M 539,142 Q 545,148 553,142" />
        {/* Stethoscope around neck */}
        <path d="M 532,158 Q 525,185 528,210 Q 538,225 545,225 Q 552,225 560,210 Q 565,185 556,158" strokeWidth="2.2" />
        <circle cx="545" cy="230" r="5" />
        {/* Doctor coat & posture */}
        <path d="M 530,165 Q 495,185 485,255 L 478,380 L 615,380 L 610,255 Q 600,185 565,165" />
        {/* Holding clinical tablet */}
        <path d="M 585,200 Q 615,220 605,280" />
        <rect x="560" y="215" width="70" height="90" rx="7" />
        {/* Tablet waveform & score */}
        <path d="M 570,245 L 580,245 L 585,236 L 592,258 L 598,242 L 608,242 L 615,248" stroke="var(--brand-teal)" strokeWidth="2" />
        <rect x="570" y="270" width="12" height="20" rx="2" />
        <rect x="586" y="262" width="12" height="28" rx="2" fill="var(--brand-teal)" />
        <rect x="602" y="274" width="12" height="16" rx="2" />
        {/* Trousers */}
        <path d="M 500,380 L 505,435 L 535,435 L 542,380 L 555,380 L 562,435 L 592,435 L 598,380" />

        {/* Floating live spark doodle near doctor */}
        <path d="M 645,130 L 652,142 L 664,148 L 652,154 L 645,166 L 638,154 L 626,148 L 638,142 Z" fill="var(--blob-sun)" stroke="var(--ink-900)" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

/**
 * 2. DATA FUNNEL & SYNTHESIS ART ("From Chaos to Clarity")
 * ─────────────────────────────────────────────────────────
 * Inspired by G Suite's "All together now" whimsical visual machinery.
 * Shows pills, step tracks, and chaotic numbers filtering into a clean AI brief.
 */
export function DataFunnelArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
    >
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <path d="M 80,60 L 320,60 L 230,170 L 230,260 L 170,260 L 170,170 Z" fill="var(--surface-100)" />
        <circle cx="120" cy="40" r="22" fill="var(--blob-coral)" />
        <circle cx="280" cy="40" r="26" fill="var(--blob-sun)" />
        <rect x="180" y="20" width="40" height="25" rx="12" fill="var(--blob-teal)" />
        <rect x="150" y="250" width="100" height="60" rx="8" fill="var(--blob-indigo)" />
      </g>
      <g stroke="var(--ink-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Funnel structure */}
        <path d="M 80,60 L 320,60 L 230,170 L 230,260 L 170,260 L 170,170 Z" />
        {/* Incoming data elements */}
        {/* Pill */}
        <g transform="translate(160, 20)">
          <rect x="0" y="0" width="44" height="22" rx="11" />
          <path d="M 22,0 L 22,22" />
        </g>
        {/* Numbers floating in */}
        <text x="105" y="44" fontFamily="var(--font-data)" fontSize="12" fontWeight="700" fill="var(--ink-900)">
          155/95
        </text>
        <text x="260" y="44" fontFamily="var(--font-data)" fontSize="12" fontWeight="700" fill="var(--ink-900)">
          2.4k 👣
        </text>
        {/* Filter gears / sparks */}
        <circle cx="200" cy="130" r="14" strokeDasharray="4 4" />
        <circle cx="200" cy="130" r="4" fill="var(--ink-900)" />
        {/* Resulting structured brief card dropping out */}
        <g transform="translate(150, 250)">
          <rect x="0" y="0" width="100" height="60" rx="8" fill="var(--surface-0)" />
          <path d="M 12,16 L 40,16" stroke="var(--brand-teal)" strokeWidth="3" />
          <path d="M 12,28 L 88,28" stroke="var(--ink-300)" strokeWidth="2" />
          <path d="M 12,38 L 75,38" stroke="var(--ink-300)" strokeWidth="2" />
          <path d="M 12,48 L 60,48" stroke="var(--ink-300)" strokeWidth="2" />
        </g>
        {/* Success spark */}
        <path d="M 265,275 L 270,285 L 280,290 L 270,295 L 265,305 L 260,295 L 250,290 L 260,285 Z" fill="var(--blob-sun)" stroke="var(--ink-900)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * 3. ELDERLY PATIENT WITH PHONE & DOG
 */
export function ElderlyPhoneArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <circle cx="200" cy="180" r="110" fill="var(--surface-100)" />
        <path d="M 175,135 Q 160,165 155,225 Q 185,245 240,230 Q 245,170 230,135 Z" fill="var(--blob-teal)" />
        <path d="M 160,230 Q 155,295 160,315 Q 185,320 195,315 Q 195,270 200,245 Q 205,270 215,315 Q 235,320 245,315 Q 240,270 235,230 Z" fill="var(--blob-sky)" />
        <ellipse cx="205" cy="95" rx="26" ry="30" fill="var(--blob-sun)" />
        <rect x="238" y="152" width="28" height="48" rx="8" fill="var(--blob-coral)" />
        <path d="M 85,285 Q 95,245 135,250 Q 150,265 145,310 Q 110,320 85,310 Z" fill="var(--blob-coral)" />
        <circle cx="310" cy="110" r="16" fill="var(--blob-leaf)" />
      </g>
      <g stroke="var(--ink-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 40,325 C 120,328 280,328 360,325" strokeDasharray="6 6" />
        <circle cx="198" cy="92" r="7" />
        <circle cx="216" cy="92" r="7" />
        <path d="M 205,92 L 209,92" />
        <path d="M 207,95 Q 206,102 203,105" />
        <path d="M 200,112 Q 208,118 216,112" />
        <path d="M 188,88 Q 185,105 195,122 Q 207,128 220,122 Q 228,105 225,88" />
        <path d="M 186,85 Q 183,72 195,70 Q 212,68 226,75 Q 228,82 227,88" />
        <path d="M 197,125 L 207,138 L 217,125" />
        <path d="M 188,135 Q 165,148 160,185 L 156,232 L 238,232 L 235,185 Q 230,148 207,135" />
        <path d="M 230,155 Q 248,165 244,195 Q 236,198 228,190" />
        <path d="M 163,155 Q 150,185 152,215" />
        <rect x="242" y="155" width="26" height="46" rx="6" />
        <path d="M 248,178 L 252,178 L 255,172 L 258,184 L 261,178 L 264,178" strokeWidth="1.8" />
        <path d="M 162,232 L 165,315 L 192,315 L 196,255 L 202,255 L 206,315 L 233,315 L 236,232" />
        <path d="M 98,255 Q 90,245 84,258 Q 80,270 92,275 Q 106,278 116,270 Q 118,256 108,252 Z" />
        <path d="M 86,252 Q 80,250 78,262" />
        <circle cx="98" cy="260" r="1.5" fill="var(--ink-900)" />
        <circle cx="86" cy="268" r="2" fill="var(--ink-900)" />
        <path d="M 108,268 Q 128,265 142,285 L 140,315 L 126,315 L 124,295 L 114,295 L 110,315 L 94,315 Q 94,290 100,272" />
        <path d="M 142,282 Q 158,272 155,260" strokeWidth="2.2" />
        <path d="M 282,145 C 278,138 270,140 270,146 C 270,154 282,162 282,162 C 282,162 294,154 294,146 C 294,140 286,138 282,145 Z" fill="var(--blob-coral)" stroke="var(--ink-900)" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/**
 * 4. DOCTOR WITH CLINICAL TABLET
 */
export function DoctorTabletArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <circle cx="200" cy="180" r="110" fill="var(--surface-100)" />
        <path d="M 165,140 Q 140,180 140,265 Q 200,275 260,265 Q 260,180 235,140 Z" fill="var(--blob-teal)" />
        <rect x="225" y="165" width="62" height="78" rx="8" fill="var(--blob-indigo)" />
        <ellipse cx="200" cy="95" rx="26" ry="30" fill="var(--blob-sun)" />
        <path d="M 158,265 Q 155,305 160,320 Q 185,325 195,320 Q 195,290 200,275 Q 205,290 215,320 Q 235,325 245,320 Q 245,305 242,265 Z" fill="var(--blob-sky)" />
      </g>
      <g stroke="var(--ink-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
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
        <path d="M 180,138 Q 155,150 148,185 L 145,265 L 255,265 L 252,185 Q 245,150 220,138" />
        <path d="M 240,165 Q 255,185 248,220" />
        <rect x="228" y="168" width="60" height="76" rx="6" />
        <path d="M 235,192 L 244,192 L 248,184 L 253,202 L 258,190 L 265,190 L 270,185 L 278,198 L 282,192" strokeWidth="1.8" />
        <rect x="235" y="212" width="8" height="18" rx="2" />
        <rect x="248" y="206" width="8" height="24" rx="2" />
        <rect x="261" y="216" width="8" height="14" rx="2" />
        <path d="M 160,265 L 165,320 L 190,320 L 195,278 L 205,278 L 210,320 L 235,320 L 240,265" />
        <path d="M 285,135 L 290,145 L 300,150 L 290,155 L 285,165 L 280,155 L 270,150 L 280,145 Z" fill="var(--blob-sun)" stroke="var(--ink-900)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/**
 * 5. FAMILY VIDEO CALL
 */
export function FamilyCallArt({ offset = 6 }: { offset?: number }) {
  return (
    <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full select-none">
      <g transform={`translate(${offset}, ${offset})`} opacity="0.85">
        <rect x="145" y="110" width="130" height="170" rx="14" fill="var(--blob-sky)" />
        <ellipse cx="210" cy="170" rx="28" ry="32" fill="var(--blob-sun)" />
        <path d="M 170,210 Q 155,270 265,270 Q 250,210 210,210 Z" fill="var(--blob-coral)" />
        <circle cx="285" cy="115" r="16" fill="var(--blob-leaf)" />
      </g>
      <g stroke="var(--ink-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <rect x="145" y="110" width="130" height="170" rx="14" />
        <circle cx="210" cy="120" r="3" fill="var(--ink-900)" />
        <path d="M 190,165 Q 185,140 210,138 Q 235,140 230,165" />
        <circle cx="202" cy="168" r="2" fill="var(--ink-900)" />
        <circle cx="218" cy="168" r="2" fill="var(--ink-900)" />
        <path d="M 210,172 L 208,178" />
        <path d="M 204,185 Q 210,190 216,185" />
        <path d="M 180,210 Q 165,230 162,270 L 258,270 Q 255,230 240,210" />
        <path d="M 240,225 Q 255,215 258,195 Q 250,192 245,200" />
        <path d="M 285,115 C 280,108 272,110 272,116 C 272,124 285,132 285,132 C 285,132 298,124 298,116 C 298,110 290,108 285,115 Z" fill="var(--blob-coral)" stroke="var(--ink-900)" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/**
 * Illustration component wrapper
 */
export function Illustration({
  name = "hero-scene",
  width = "100%",
  height = "auto",
  offset = 8,
  className = "",
  children,
  ariaLabel,
}: IllustrationProps) {
  return (
    <div
      role="img"
      aria-label={
        ariaLabel ||
        (name === "hero-scene"
          ? "CareBridge connected care scene: patient, dog, daughter, and doctor"
          : name === "elderly-phone"
          ? "Elderly patient checking health on phone with dog companion"
          : name === "doctor-tablet"
          ? "Doctor reviewing patient trends on tablet"
          : name === "family-call"
          ? "Family member on a video check-in"
          : "Health data synthesis pipeline")
      }
      style={{ width, height }}
      className={`relative inline-block select-none ${className}`}
    >
      {children ? (
        children
      ) : name === "hero-scene" ? (
        <MasterpieceHeroArt offset={offset} />
      ) : name === "elderly-phone" ? (
        <ElderlyPhoneArt offset={offset} />
      ) : name === "doctor-tablet" ? (
        <DoctorTabletArt offset={offset} />
      ) : name === "family-call" ? (
        <FamilyCallArt offset={offset} />
      ) : (
        <DataFunnelArt offset={offset} />
      )}
    </div>
  );
}
