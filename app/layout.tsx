import type { Metadata } from "next";
import { fontDisplay, fontBody, fontData } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareBridge — Your health data, in your doctor's hands",
  description:
    "CareBridge turns daily patient health data into a risk-ranked action list for doctors, with family kept in the loop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontData.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-50 text-ink-900 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
