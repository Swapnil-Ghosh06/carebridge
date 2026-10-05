import type { Metadata } from "next";
import { montserrat, dmSans, sora } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareBridge | Remote Patient Risk Decision Support",
  description: "Your phone's health data, now in your doctor's hands. Continuous risk ranking and decision support.",
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
