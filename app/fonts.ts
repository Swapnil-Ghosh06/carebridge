/**
 * CareBridge font configuration (owner: Swapin)
 * ─────────────────────────────────────────────
 * ONLY THREE FONTS ARE ALLOWED:
 *   Montserrat  → headings, hero, buttons, nav   (--font-display / --font-montserrat)
 *   DM Sans     → body text, forms, labels        (--font-body / --font-dm-sans)
 *   Sora        → numbers, stats, badges, charts  (--font-data / --font-sora)
 *
 * Banned: Inter, Arial, Roboto, Calibri, JetBrains Mono, Geist, any monospace.
 * This is the single source of truth. No other file may import fonts.
 */

import { Montserrat, DM_Sans, Sora } from "next/font/google";

export const fontDisplay = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const fontData = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-data",
  display: "swap",
});

// Aliases for teammate compatibility
export const montserrat = fontDisplay;
export const dmSans = fontBody;
export const sora = fontData;
