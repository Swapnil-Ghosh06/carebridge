/**
 * CareBridge landing page (owners: Swapin styling, Vedesh cookie/redirect logic)
 * ─────────────────────────────────────────────────────────
 * Redesigned in Phase 2:
 *  - Montserrat 800 3-line stacked hero
 *  - DM Sans subhead
 *  - Two CTAs: primary teal (Patient) + secondary indigo (Doctor)
 *  - Hero illustration at right (offset colour blocks + navy line art)
 *  - Role cards below with interactive hover states
 *  - Preserves route navigation and simulated data disclaimer
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Smartphone,
  Users,
  BarChart3,
  Sliders,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";

export const metadata: Metadata = {
  title: "CareBridge — Your phone's health data, in your doctor's hands",
  description:
    "CareBridge turns patient phone health data into a risk-ranked action list for doctors, keeping family in the loop.",
};

const roles = [
  {
    id: "patient",
    label: "Patient App",
    tag: "Mobile-First",
    description:
      "Log daily medicines with 1-tap, track vitals, speak via voice in 3 languages, and control your data privacy.",
    href: "/patient",
    icon: Smartphone,
    accentBg: "bg-[var(--brand-teal)]/15",
    accentText: "text-[var(--brand-teal-600)]",
  },
  {
    id: "doctor",
    label: "Doctor Portal",
    tag: "Clinical Cockpit",
    description:
      "Real-time risk-ranked patient queue, longitudinal trend charts, and AI-assisted pre-consult briefs.",
    href: "/doctor",
    icon: Stethoscope,
    accentBg: "bg-[var(--brand-indigo)]/15",
    accentText: "text-[var(--brand-indigo)]",
  },
  {
    id: "family",
    label: "Family Feed",
    tag: "Care Circle",
    description:
      "Stay in the loop with daily adherence status and proactive escalation alerts for loved ones.",
    href: "/family",
    icon: Users,
    accentBg: "bg-[var(--blob-coral)]/15",
    accentText: "text-[var(--blob-coral)]",
  },
  {
    id: "admin",
    label: "Admin & ROI",
    tag: "Health System",
    description:
      "Real-time metrics on monitored patients, prevented readmissions, and clinical hours saved.",
    href: "/admin",
    icon: BarChart3,
    accentBg: "bg-[var(--blob-leaf)]/15",
    accentText: "text-[var(--blob-leaf)]",
  },
  {
    id: "sim",
    label: "Live Simulator",
    tag: "Demo Control",
    description:
      "Simulate missed doses, BP spikes, and watch risk recalculations propagate live across portals.",
    href: "/sim",
    icon: Sliders,
    accentBg: "bg-[var(--blob-sun)]/15",
    accentText: "text-[var(--ink-900)]",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-50)] flex flex-col selection:bg-[var(--brand-mint)] selection:text-[var(--ink-900)]">
      {/* ── Top Header ────────────────────────────────────────── */}
      <header className="border-b border-[var(--ink-300)] bg-[var(--surface-0)] sticky top-0 z-40 px-6 sm:px-10 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--r-md)] bg-[var(--brand-teal)] flex items-center justify-center text-[var(--surface-0)] font-display font-black text-lg">
              C
            </div>
            <span className="font-display font-bold text-xl text-[var(--ink-900)] tracking-tight">
              CareBridge
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-data text-xs text-[var(--ink-500)] bg-[var(--surface-100)] px-3 py-1 rounded-[var(--r-pill)]">
              Prototype • Simulated Data
            </span>
            <Link
              href="/design-preview"
              className="font-body text-xs font-semibold text-[var(--brand-indigo)] hover:underline px-2.5 py-1"
            >
              Design System →
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Hero Section ─────────────────────────────────── */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 sm:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-24">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-[var(--risk-amber-bg)] text-[var(--risk-amber)] px-3.5 py-1.5 rounded-[var(--r-pill)] mb-6 border border-[var(--risk-amber)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-data text-xs font-bold uppercase tracking-wider">
                Explainable Healthcare AI
              </span>
            </div>

            {/* 3-line stacked headline with Montserrat 800 */}
            <h1
              className="font-display font-extrabold text-[var(--ink-900)] leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(40px, 5.5vw, 60px)" }}
            >
              Your phone&apos;s
              <br />
              <span className="text-[var(--brand-teal)]">health data,</span>
              <br />
              in your doctor&apos;s hands.
            </h1>

            <p className="font-body text-lg sm:text-xl text-[var(--ink-700)] leading-relaxed mb-8 max-w-xl">
              CareBridge transforms continuous home vitals and medicine logs
              into an explainable, risk-ranked clinical action list — keeping
              family informed every step of the way.
            </p>

            {/* Two Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link href="/patient" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Patient Experience
                </Button>
              </Link>
              <Link href="/doctor" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Doctor Portal
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[440px] bg-[var(--surface-0)] p-6 rounded-[var(--r-lg)] shadow-[var(--shadow-card)] border border-[var(--surface-100)]">
              <Illustration name="hero-scene" />
            </div>
          </div>
        </div>

        {/* ── Role Navigation Cards ───────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--ink-300)]">
            <div>
              <h2 className="font-display font-bold text-2xl text-[var(--ink-900)]">
                Explore CareBridge Modules
              </h2>
              <p className="font-body text-sm text-[var(--ink-500)] mt-1">
                Select a persona to experience the connected care loop
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Link
                  key={role.id}
                  href={role.href}
                  id={`role-card-${role.id}`}
                  className="group bg-[var(--surface-0)] rounded-[var(--r-lg)] shadow-[var(--shadow-card)] p-5 flex flex-col justify-between border border-transparent hover:border-[var(--brand-teal)] hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-[var(--r-md)] flex items-center justify-center ${role.accentBg} ${role.accentText}`}
                      >
                        <Icon className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
                      </div>
                      <span className="font-data text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[var(--r-pill)] bg-[var(--surface-100)] text-[var(--ink-500)]">
                        {role.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-[var(--ink-900)] group-hover:text-[var(--brand-teal)] transition-colors mb-1.5">
                      {role.label}
                    </h3>
                    <p className="font-body text-xs text-[var(--ink-500)] leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[var(--surface-100)] flex items-center justify-between text-xs font-semibold text-[var(--ink-700)] group-hover:text-[var(--brand-teal)] transition-colors">
                    <span>Enter role</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--ink-300)] bg-[var(--surface-0)] py-8 px-6 sm:px-10 text-center mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-display font-bold text-sm text-[var(--ink-900)]">
              CareBridge Health
            </p>
            <p className="font-body text-xs text-[var(--ink-500)] mt-0.5">
              Powered by Caffine • Built for clinical decision support
            </p>
          </div>

          <div className="text-center sm:text-right">
            <p className="font-body text-xs font-semibold text-[var(--ink-700)]">
              Decision support only. Not a diagnosis. Doctor decides.
            </p>
            <p className="font-body text-xs text-[var(--ink-300)] mt-0.5">
              All data is simulated for demo and pitch verification.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
