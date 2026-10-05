import type { Metadata } from "next";
import { fontDisplay, fontBody, fontData } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareBridge — Patient health data, in your doctor's hands",
  description:
    "CareBridge turns phone-collected health data into a risk-ranked action list for doctors, keeping family in the loop.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontData.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-50 text-ink-900">
        {children}
      </body>
    </html>
  );
}
