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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--surface-paper)] text-[var(--ink-900)] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
