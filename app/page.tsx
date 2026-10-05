/**
 * CareBridge landing page (owners: Swapin styling, Vedesh cookie/redirect logic)
 * ─────────────────────────────────────────────────────────
 * Shows the hero and four role cards.
 * Swapin will redesign markup + styles in Phase 2.
 * Vedesh owns the cookie/redirect logic.
 *
 * Fonts: Montserrat (headings), DM Sans (body) — no others.
 * Simulated data disclaimer shown in footer.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, Smartphone, Users, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "CareBridge — Your phone's health data, in your doctor's hands",
  description:
    "CareBridge turns patient phone health data into a risk-ranked action list for doctors, keeping family in the loop.",
};

const roles = [
  {
    id: "patient",
    label: "Patient",
    description: "Log medicines, track vitals, and manage who sees your data.",
    href: "/patient",
    icon: Smartphone,
    color: "var(--brand-teal)",
  },
  {
    id: "doctor",
    label: "Doctor",
    description:
      "Risk-ranked patient list, trend charts, and AI-assisted pre-consult brief.",
    href: "/doctor",
    icon: Stethoscope,
    color: "var(--brand-indigo)",
  },
  {
    id: "family",
    label: "Family",
    description:
      "Stay updated on your loved one's health and receive alerts.",
    href: "/family",
    icon: Users,
    color: "var(--blob-coral)",
  },
  {
    id: "admin",
    label: "Admin",
    description: "ROI dashboard: impact metrics and health system analytics.",
    href: "/admin",
    icon: BarChart3,
    color: "var(--blob-leaf)",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-50)] flex flex-col">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="border-b border-[var(--ink-300)] bg-[var(--surface-0)] px-8 py-4">
        <span className="font-display font-bold text-xl text-[var(--ink-900)]">
          CareBridge
        </span>
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-20">
        <div className="mb-16 max-w-2xl">
          <h1
            className="font-display font-extrabold text-[var(--ink-900)] leading-[1.05] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Your phone&apos;s health data,
            <br />
            in your doctor&apos;s hands.
          </h1>
          <p className="font-body text-xl text-[var(--ink-500)] leading-relaxed mb-8">
            CareBridge turns patient-collected health data into a risk-ranked
            action list for doctors — keeping family in the loop automatically.
          </p>
          <div className="inline-block bg-[var(--risk-amber-bg)] px-3 py-1.5 rounded-[var(--r-pill)]">
            <span className="font-body text-sm font-medium text-[var(--ink-700)]">
              Hackathon prototype · All data is simulated
            </span>
          </div>
        </div>

        {/* ── Role cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.id}
                href={role.href}
                id={`role-card-${role.id}`}
                className={[
                  "group bg-[var(--surface-0)] rounded-[var(--r-lg)]",
                  "shadow-[var(--shadow-card)] p-6",
                  "flex flex-col gap-4",
                  "transition-all duration-[180ms] ease-out",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  "focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] focus-visible:outline-offset-2",
                ].join(" ")}
              >
                <div
                  className="w-12 h-12 rounded-[var(--r-md)] flex items-center justify-center"
                  style={{ backgroundColor: `${role.color}18` }}
                >
                  <Icon
                    size={24}
                    style={{ color: role.color }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-[var(--ink-900)] mb-1">
                    {role.label}
                  </h2>
                  <p className="font-body text-sm text-[var(--ink-500)] leading-relaxed">
                    {role.description}
                  </p>
                </div>
                <span
                  className="font-body text-sm font-medium text-[var(--brand-teal)] mt-auto"
                  aria-hidden="true"
                >
                  Enter →
                </span>
              </Link>
            );
          })}
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-[var(--ink-300)] py-6 px-8 text-center">
        <p className="font-body text-xs text-[var(--ink-300)]">
          CareBridge · Hackathon prototype · All data simulated · poweredbycaffine
        </p>
        <p className="font-body text-xs text-[var(--ink-300)] mt-1">
          Decision support only. Not a diagnosis. Doctor decides.
        </p>
      </footer>
    </div>
  );
}
