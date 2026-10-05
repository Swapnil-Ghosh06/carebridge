import type { Metadata } from 'next';
import { fontDisplay, fontBody, fontData } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareBridge — Your health data, in your doctor\'s hands',
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
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontData.variable}`}
    >
      <body className="font-body antialiased bg-white text-navy-900">
        {children}
      </body>
    </html>
  );
}
