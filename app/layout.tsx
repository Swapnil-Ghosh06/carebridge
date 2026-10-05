import type { Metadata } from 'next';
import { montserrat, dmSans, sora } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: "CareBridge — Your health data, in your doctor's hands",
  description: 'CareBridge turns daily patient health data into a risk-ranked action list for doctors, with family kept in the loop.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} ${sora.variable}`}
    >
      <body className="min-h-screen bg-surface-50 text-ink-900 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
