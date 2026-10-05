import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareBridge — Give Chronic Care a Glow Up",
  description:
    "CareBridge turns daily patient health data into an explainable, risk-ranked clinical loop for doctors, families, and seniors across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
