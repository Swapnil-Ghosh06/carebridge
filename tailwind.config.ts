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
        display: ["var(--font-display)", "Montserrat", "sans-serif"],
        body: ["var(--font-body)", "DM Sans", "sans-serif"],
        data: ["var(--font-data)", "Sora", "sans-serif"],
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
        blob: {
          coral: "var(--blob-coral)",
          sun: "var(--blob-sun)",
          leaf: "var(--blob-leaf)",
          sky: "var(--blob-sky)",
          indigo: "var(--blob-indigo)",
          teal: "var(--blob-teal)",
        },
        risk: {
          red: "var(--risk-red)",
          "red-bg": "var(--risk-red-bg)",
          amber: "var(--risk-amber)",
          "amber-bg": "var(--risk-amber-bg)",
          green: "var(--risk-green)",
          "green-bg": "var(--risk-green-bg)",
        },
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};

export default config;
