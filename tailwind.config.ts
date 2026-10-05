import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Font families (CSS variables set by next/font in app/fonts.ts) ──
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        data: ['var(--font-data)', 'sans-serif'],
      },

      // ── Colours (from DESIGN.md – Swapin owns design/tokens.css) ──
      colors: {
        // Navy (primary ink)
        navy: {
          900: '#0A1628',
          800: '#132040',
          700: '#1C3058',
          600: '#244070',
        },
        // Teal (primary action)
        teal: {
          600: '#0D9488',
          500: '#14B8A6',
          400: '#2DD4BF',
          100: '#CCFBF1',
          50: '#F0FDFA',
        },
        // Indigo (secondary)
        indigo: {
          600: '#4F46E5',
          500: '#6366F1',
          100: '#E0E7FF',
          50: '#EEF2FF',
        },
        // Risk bands
        risk: {
          red: '#EF4444',
          'red-bg': '#FEF2F2',
          yellow: '#F59E0B',
          'yellow-bg': '#FFFBEB',
          green: '#10B981',
          'green-bg': '#ECFDF5',
        },
        // Blob tokens (for illustrations — Swapin)
        blob: {
          teal: '#99F6E4',
          indigo: '#C7D2FE',
          amber: '#FDE68A',
          rose: '#FECDD3',
        },
      },

      // ── Border radius ──
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        pill: '9999px',
      },

      // ── Box shadows ──
      boxShadow: {
        card: '0 2px 8px 0 rgba(10, 22, 40, 0.08)',
        'card-lg': '0 8px 24px 0 rgba(10, 22, 40, 0.12)',
        badge: '0 1px 4px 0 rgba(10, 22, 40, 0.16)',
      },
    },
  },
  plugins: [],
};
export default config;
