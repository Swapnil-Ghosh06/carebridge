/**
 * CareBridge Tailwind config (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Tailwind v4 is CSS-first — tokens live in globals.css @theme.
 * This file exists for IDE autocompletion and any tooling
 * that still reads tailwind.config.ts.
 *
 * Do NOT add fonts, colours, or radius values here that
 * aren't already in design/tokens.css — that file is canonical.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./design/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /**
       * Font families
       * These reference CSS variables injected by app/fonts.ts via next/font/google.
       * ONLY Montserrat / DM Sans / Sora. No other fonts.
       */
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
        data:    ["var(--font-data)", "sans-serif"],
      },

      /**
       * Colors — all mapped to CSS custom properties from design/tokens.css.
       * Never use arbitrary hex values in components.
       */
      colors: {
        ink: {
          900: "var(--ink-900)",
          700: "var(--ink-700)",
          500: "var(--ink-500)",
          300: "var(--ink-300)",
        },
        surface: {
          0:   "var(--surface-0)",
          50:  "var(--surface-50)",
          100: "var(--surface-100)",
        },
        brand: {
          teal:      "var(--brand-teal)",
          "teal-600": "var(--brand-teal-600)",
          mint:      "var(--brand-mint)",
          indigo:    "var(--brand-indigo)",
        },
        /**
         * Risk colours — RESERVED for RiskBadge only.
         * Do not use these for decoration or state feedback.
         */
        risk: {
          red:       "var(--risk-red)",
          "red-bg":  "var(--risk-red-bg)",
          amber:     "var(--risk-amber)",
          "amber-bg": "var(--risk-amber-bg)",
          green:     "var(--risk-green)",
          "green-bg": "var(--risk-green-bg)",
        },
        /**
         * Blob colours — illustration layers only.
         * Never use in UI components.
         */
        blob: {
          coral:  "var(--blob-coral)",
          sun:    "var(--blob-sun)",
          leaf:   "var(--blob-leaf)",
          sky:    "var(--blob-sky)",
          indigo: "var(--blob-indigo)",
          teal:   "var(--blob-teal)",
        },
      },

      /**
       * Border radius — from design tokens.
       */
      borderRadius: {
        sm:   "var(--r-sm)",
        md:   "var(--r-md)",
        lg:   "var(--r-lg)",
        pill: "var(--r-pill)",
      },

      /**
       * Box shadows — from design tokens.
       */
      boxShadow: {
        card: "var(--shadow-card)",
      },

      /**
       * Max widths — layout constraints from DESIGN.md §4.
       */
      maxWidth: {
        portal:  "var(--max-portal)",
        patient: "var(--max-patient)",
      },
    },
  },
  plugins: [],
};

export default config;
