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
        primary: ["Montserrat", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        serif: ["Montserrat", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        secondary: ["DM Sans", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        mono: ["Sora", "sans-serif"],
        data: ["Sora", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        paper: "var(--canvas-paper)",
        ink: {
          900: "var(--ink-900)",
          800: "var(--ink-800)",
          700: "var(--ink-700)",
          500: "var(--ink-500)",
          300: "var(--ink-300)",
          200: "var(--ink-200)",
        },
        surface: {
          0: "var(--surface-0)",
          50: "var(--surface-50)",
          100: "var(--surface-100)",
          warm: "var(--surface-warm)",
          paper: "var(--canvas-paper)",
        },
        accent: {
          pink: "var(--accent-pink)",
          lime: "var(--accent-lime)",
          "lime-dark": "var(--accent-lime-dark)",
          yellow: "var(--accent-yellow)",
          lavender: "var(--accent-lavender)",
          "lavender-dark": "var(--accent-lavender-dark)",
          mint: "var(--accent-mint)",
          sky: "var(--accent-sky)",
          orange: "var(--accent-orange)",
        },
        brand: {
          teal: "#0D9488",
          indigo: "#4F46E5",
          lime: "var(--accent-lime)",
          pink: "var(--accent-pink)",
          yellow: "var(--accent-yellow)",
          lavender: "var(--accent-lavender)",
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
        xl: "var(--r-xl)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        brutal: "var(--shadow-brutal)",
        "brutal-sm": "var(--shadow-brutal-sm)",
        "brutal-lg": "var(--shadow-brutal-lg)",
        card: "var(--shadow-brutal)",
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
