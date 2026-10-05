import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "var(--font-montserrat)", "Montserrat", "sans-serif"],
        body: ["var(--font-body)", "var(--font-dm-sans)", "DM Sans", "sans-serif"],
        data: ["var(--font-data)", "var(--font-sora)", "Sora", "sans-serif"],
      },
      colors: {
        ink: {
          900: "var(--ink-900)",
          700: "var(--ink-700)",
          500: "var(--ink-500)",
          300: "var(--ink-300)",
        },
        surface: {
          0: "var(--surface-0)",
          50: "var(--surface-50)",
          100: "var(--surface-100)",
        },
        brand: {
          teal: "var(--brand-teal)",
          "teal-600": "var(--brand-teal-600)",
          mint: "var(--brand-mint)",
          indigo: "var(--brand-indigo)",
        },
        navy: {
          900: "#0A1628",
          800: "#132040",
          700: "#1C3058",
          600: "#244070",
        },
        teal: {
          600: "#0D9488",
          500: "#14B8A6",
          400: "#2DD4BF",
          100: "#CCFBF1",
          50: "#F0FDFA",
        },
        indigo: {
          600: "#4F46E5",
          500: "#6366F1",
          100: "#E0E7FF",
          50: "#EEF2FF",
        },
        blob: {
          coral: "var(--blob-coral)",
          sun: "var(--blob-sun)",
          leaf: "var(--blob-leaf)",
          sky: "var(--blob-sky)",
          indigo: "var(--blob-indigo)",
          teal: "var(--blob-teal)",
          amber: "#FDE68A",
          rose: "#FECDD3",
        },
        risk: {
          red: "var(--risk-red)",
          "red-bg": "var(--risk-red-bg)",
          amber: "var(--risk-amber)",
          "amber-bg": "var(--risk-amber-bg)",
          yellow: "var(--risk-amber)",
          "yellow-bg": "var(--risk-amber-bg)",
          green: "var(--risk-green)",
          "green-bg": "var(--risk-green-bg)",
        },
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-lg": "0 8px 24px 0 rgba(10, 22, 40, 0.12)",
        badge: "0 1px 4px 0 rgba(10, 22, 40, 0.16)",
      },
      maxWidth: {
        portal: "var(--max-portal)",
        patient: "var(--max-patient)",
      },
    },
  },
  plugins: [],
};

export default config;
