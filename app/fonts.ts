import { Montserrat, DM_Sans, Sora } from 'next/font/google';

// Display / headings — Montserrat
export const fontDisplay = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

// Body — DM Sans
export const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
});

// Numbers / data / badges — Sora
export const fontData = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-data',
  display: 'swap',
});
