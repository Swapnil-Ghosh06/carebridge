/**
 * CareBridge Award-Winning Landing Page (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Inspired by Slack's iconic "Where Work Happens" and boutique agency design portfolios.
 *
 * Core Aesthetics:
 *  - Warm artist paper canvas (--surface-paper: #FCFBF8)
 *  - Deep midnight navy hand-drawn strokes (--ink-900: #0B1F4B)
 *  - Flat, playful, offset color blocks (--blob-*)
 *  - High-character typography (Montserrat 800 + DM Sans + Sora)
 *  - Authentic hand-drawn doodles (wavy arrows, sparkles, sleeping cat on baseline)
 *  - Live interactive simulator demo widget right on the page
 */

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Stethoscope,
  Smartphone,
  Users,
  BarChart3,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RiskBadge, type RiskBand } from "@/components/ui/RiskBadge";
import {
  MasterpieceHeroArt,
  DataFunnelArt,
} from "@/components/ui/Illustration";
import {
  DoodleSparkle,
  DoodleStar,
  DoodleUnderline,
  DoodleArrowCurved,
  DoodleHeart,
  DoodleSleepingCat,
} from "@/components/ui/Doodles";

const personas = [
  {
    id: "patient",
    title: "Patient App",
    tag: "Simple & Voice-First",
    subtitle: "Built for elders like Ramesh ji",
    description:
      "Tap once to log medicines or speak naturally in Hindi, Kannada, or English. High-contrast typography with 100% data privacy control.",
    href: "/patient",
    icon: Smartphone,
    color: "var(--blob-teal)",
    bgTone: "bg-[#E6F8F6]",
    borderColor: "hover:border-[var(--brand-teal)]",
  },
  {
    id: "doctor",
    title: "Doctor Cockpit",
    tag: "Decision Support",
    subtitle: "Built for clinicians like Dr. Meera Rao",
    description:
      "Risk-ranked patient queue sorted by urgency. Multi-factor clinical reasoning and 14-day AI synthesis without alert fatigue.",
    href: "/doctor",
    icon: Stethoscope,
    color: "var(--brand-indigo)",
    bgTone: "bg-[#F0EFFC]",
    borderColor: "hover:border-[var(--brand-indigo)]",
  },
  {
    id: "family",
    title: "Family Feed",
    tag: "Care Circle",
    subtitle: "Built for children like Priya in Bengaluru",
    description:
      "Proactive escalation alerts before emergencies happen. Check daily adherence status and stay connected across cities.",
    href: "/family",
    icon: Users,
    color: "var(--blob-coral)",
    bgTone: "bg-[#FFF0EB]",
    borderColor: "hover:border-[var(--blob-coral)]",
  },
  {
    id: "admin",
    title: "Admin & ROI",
    tag: "Health System",
    subtitle: "Built for clinic directors",
    description:
      "Track monitored cohort size, alert response velocity, estimated readmissions prevented, and clinical hours saved.",
    href: "/admin",
    icon: BarChart3,
    color: "var(--blob-leaf)",
    bgTone: "bg-[#EFF8EC]",
    borderColor: "hover:border-[var(--blob-leaf)]",
  },
  {
    id: "sim",
    title: "Live Simulator",
    tag: "Interactive Demo",
    subtitle: "Built for hackathon judges",
    description:
      "Inject missed doses, simulate acute BP spikes (155/95), and watch the doctor queue re-sort and escalate in real time.",
    href: "/sim",
    icon: Sliders,
    color: "var(--blob-sun)",
    bgTone: "bg-[#FEF8E8]",
    borderColor: "hover:border-[var(--blob-sun)]",
  },
];

export default function LandingPage() {
  // Mini interactive live demo on landing page
  const [simRiskBand, setSimRiskBand] = React.useState<RiskBand>("amber");
  const [simScore, setSimScore] = React.useState<number>(52);
  const [simReasons, setSimReasons] = React.useState<string[]>([
    "Missed 2 evening doses of Metformin 500mg (Adherence: 71%)",
    "Systolic BP trending upward (+8% in 4 days)",
  ]);
  const [simStatusMsg, setSimStatusMsg] = React.useState<string>(
    "Moderate Risk — Monitoring closely"
  );

  const triggerSimSpike = () => {
    setSimRiskBand("red");
    setSimScore(84);
    setSimReasons([
      "Critical systolic BP spike: 155/95 mmHg (above threshold 140 mmHg)",
      "Missed 3 consecutive doses of Metformin 500mg in 48h",
      "Daily steps dropped by 45% vs 14-day rolling average",
    ]);
    setSimStatusMsg("URGENT: Patient flipped to HIGH RISK. Doctor outreach required.");
  };

  const triggerSimRecover = () => {
    setSimRiskBand("green");
    setSimScore(18);
    setSimReasons([
      "All vitals within baseline (BP 120/80 mmHg)",
      "100% adherence over the last 7 days",
    ]);
    setSimStatusMsg("STABLE: Patient returned to LOW RISK.");
  };

  return (
    <div className="min-h-screen bg-[var(--surface-paper)] text-[var(--ink-900)] flex flex-col selection:bg-[var(--blob-sun)] selection:text-[var(--ink-900)] overflow-x-hidden">
      {/* ─── TOP EDITORIAL HEADER ───────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[var(--surface-paper)]/90 backdrop-blur-md border-b border-[var(--ink-300)]/60 px-6 sm:px-12 py-4 transition-all">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Logo with hand-drawn bridge flourish */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--ink-900)] text-[var(--surface-0)] flex items-center justify-center font-display font-black text-xl shadow-sm group-hover:scale-105 transition-transform">
              C
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-2xl text-[var(--ink-900)] tracking-tight">
                  CareBridge
                </span>
                <DoodleSparkle size={14} color="var(--blob-coral)" className="animate-pulse-doodle" />
              </div>
              <p className="font-data text-[10px] text-[var(--ink-500)] -mt-1 font-semibold tracking-wider">
                WHERE CARE HAPPENS
              </p>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-body font-medium text-[var(--ink-700)]">
            <a href="#how-it-works" className="hover:text-[var(--ink-900)] hover:underline transition-colors">
              How It Works
            </a>
            <a href="#demo-sandbox" className="hover:text-[var(--ink-900)] hover:underline transition-colors">
              Live Sandbox
            </a>
            <a href="#portals" className="hover:text-[var(--ink-900)] hover:underline transition-colors">
              Portals
            </a>
            <Link
              href="/design-preview"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--r-pill)] bg-[var(--surface-100)] text-[var(--brand-indigo)] hover:bg-[var(--brand-indigo)] hover:text-[var(--surface-0)] transition-all text-xs font-data font-bold"
            >
              <span>Design System</span>
              <span className="text-[10px]">✨</span>
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <Link href="/sim">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex border-[var(--ink-300)] text-xs font-semibold"
              >
                <Sliders className="w-3.5 h-3.5 mr-1.5 text-[var(--blob-sun)]" />
                Open Simulator
              </Button>
            </Link>
            <Link href="/doctor">
              <Button
                variant="secondary"
                size="sm"
                className="!bg-[var(--ink-900)] hover:!bg-[var(--brand-indigo)] text-xs shadow-sm font-display font-bold px-5"
              >
                Doctor Portal →
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION: "WHERE CARE HAPPENS" ─────────────── */}
      <section className="relative max-w-[1280px] mx-auto w-full px-6 sm:px-12 pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Floating background micro-doodles */}
        <div className="absolute top-8 right-1/3 pointer-events-none hidden lg:block opacity-75">
          <DoodleStar size={24} fill="var(--blob-sun)" />
        </div>
        <div className="absolute top-24 left-8 pointer-events-none hidden lg:block opacity-60">
          <DoodleHeart size={22} fill="var(--blob-coral)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Charismatic Editorial Headline */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--surface-warm)] border border-[var(--ink-300)]/60 px-4 py-1.5 rounded-[var(--r-pill)] mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--risk-green)] animate-ping" />
              <span className="font-data text-xs font-bold uppercase tracking-wider text-[var(--ink-900)]">
                Explainable Chronic Care Protocol
              </span>
            </div>

            {/* 3-Line Headline with Hand-Drawn Flourish */}
            <div className="relative mb-6">
              <h1
                className="font-display font-extrabold text-[var(--ink-900)] leading-[1.04] tracking-[-0.03em]"
                style={{ fontSize: "clamp(42px, 5.8vw, 68px)" }}
              >
                Your phone&apos;s
                <br />
                health data,
                <br />
                in your{" "}
                <span className="relative inline-block text-[var(--brand-indigo)]">
                  doctor&apos;s hands.
                  <span className="absolute left-0 -bottom-3 w-full">
                    <DoodleUnderline width="100%" color="var(--blob-sun)" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Editorial Subtitle */}
            <p className="font-body text-lg sm:text-xl text-[var(--ink-700)] leading-relaxed mb-8 max-w-xl">
              CareBridge turns daily medicine logs and home vitals into a
              risk-ranked action list for doctors — catching complications early
              while keeping families automatically in the loop.
            </p>

            {/* Call To Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Link href="/patient">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md hover:shadow-lg !bg-[var(--brand-teal)] hover:!bg-[var(--brand-teal-600)] text-base font-display font-bold px-8 !min-h-[54px]"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Try Patient Experience
                </Button>
              </Link>
              <Link href="/doctor">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md hover:shadow-lg !bg-[var(--ink-900)] hover:!bg-[var(--brand-indigo)] text-base font-display font-bold px-8 !min-h-[54px]"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Doctor Clinical Cockpit
                </Button>
              </Link>
            </div>

            {/* Playful Hand-Drawn Annotation Arrow */}
            <div className="flex items-center gap-3 text-xs font-body text-[var(--ink-500)]">
              <DoodleArrowCurved width={40} height={30} color="var(--ink-700)" />
              <span className="font-medium italic">
                Simulated data for hackathon pitch • 100% explainable AI
              </span>
            </div>
          </div>

          {/* Right Column: Masterpiece Hand-Drawn Illustration Scene */}
          <div className="lg:col-span-6 flex flex-col items-center relative">
            <div className="w-full max-w-[560px] bg-[var(--surface-0)] p-6 sm:p-8 rounded-[var(--r-xl)] shadow-[var(--shadow-card)] border border-[var(--ink-300)]/60 relative hover:shadow-[var(--shadow-hover)] transition-all duration-300">
              {/* Floating Sticker Badge 1 */}
              <div className="absolute -top-4 -left-4 bg-[var(--blob-sun)] text-[var(--ink-900)] font-display font-bold text-xs px-3.5 py-1.5 rounded-[var(--r-pill)] shadow-sm border border-[var(--ink-900)] rotate-[-4deg] flex items-center gap-1.5 z-20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hindi • Kannada • English</span>
              </div>

              {/* Floating Sticker Badge 2 */}
              <div className="absolute -bottom-4 -right-2 bg-[var(--surface-0)] text-[var(--brand-indigo)] font-data font-bold text-xs px-3.5 py-1.5 rounded-[var(--r-pill)] shadow-md border border-[var(--ink-300)] rotate-[2deg] flex items-center gap-1.5 z-20">
                <ShieldCheck className="w-4 h-4 text-[var(--risk-green)]" />
                <span>Zero Alert Fatigue</span>
              </div>

              {/* Masterpiece Illustration Art */}
              <MasterpieceHeroArt offset={8} />

              <div className="mt-4 pt-3 border-t border-[var(--ink-200)] flex items-center justify-between text-xs text-[var(--ink-500)] font-body">
                <span>Ramesh (Patient) & Companion Dog</span>
                <span className="font-semibold text-[var(--ink-900)]">Sunrise Clinic Care Circle</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE 4 CHAPTERS (HOW IT WORKS) ─────────── */}
      <section id="how-it-works" className="bg-[var(--surface-0)] border-y border-[var(--ink-300)]/60 py-20 lg:py-28 px-6 sm:px-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-data font-bold uppercase tracking-wider text-[var(--brand-indigo)] mb-3">
              <DoodleSparkle size={16} color="var(--brand-indigo)" />
              <span>The CareBridge Loop</span>
              <DoodleSparkle size={16} color="var(--brand-indigo)" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink-900)] tracking-tight mb-4">
              How Care Happens in 4 Human Steps
            </h2>
            <p className="font-body text-base text-[var(--ink-500)]">
              Designed from the ground up for real patients who don&apos;t want complex apps and busy doctors who need instant clarity.
            </p>
          </div>

          {/* 4 Editorial Storyboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-[var(--r-lg)] bg-[var(--surface-paper)] border border-[var(--ink-300)]/60 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-teal)] text-[var(--surface-0)] flex items-center justify-center font-data font-bold text-base mb-4 shadow-xs">
                  01
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
                  Speak, Don&apos;t Type
                </h3>
                <p className="font-body text-sm text-[var(--ink-700)] leading-relaxed mb-4">
                  Ramesh ji taps the big mic and simply says <em>&quot;Maine dawai le li&quot;</em> in Hindi. Natural voice intent logs Metformin in 1 second.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--ink-200)] flex items-center gap-2 text-xs font-data font-semibold text-[var(--brand-teal-600)]">
                <Mic className="w-3.5 h-3.5" />
                <span>Multilingual Web Speech</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-[var(--r-lg)] bg-[var(--surface-paper)] border border-[var(--ink-300)]/60 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-coral)] text-[var(--surface-0)] flex items-center justify-center font-data font-bold text-base mb-4 shadow-xs">
                  02
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
                  Family In The Loop
                </h3>
                <p className="font-body text-sm text-[var(--ink-700)] leading-relaxed mb-4">
                  If an evening dose is missed, CareBridge escalates to daughter Priya in Bengaluru automatically before it ever becomes a crisis.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--ink-200)] flex items-center gap-2 text-xs font-data font-semibold text-[var(--blob-coral)]">
                <Users className="w-3.5 h-3.5" />
                <span>3-Tier Escalation Ladder</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-[var(--r-lg)] bg-[var(--surface-paper)] border border-[var(--ink-300)]/60 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-indigo)] text-[var(--surface-0)] flex items-center justify-center font-data font-bold text-base mb-4 shadow-xs">
                  03
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
                  The Clinical Red Flip
                </h3>
                <p className="font-body text-sm text-[var(--ink-700)] leading-relaxed mb-4">
                  When blood pressure spikes (155/95), Ramesh flips to RED and animates smoothly to the top of Dr. Rao&apos;s priority queue.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--ink-200)] flex items-center gap-2 text-xs font-data font-semibold text-[var(--brand-indigo)]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Explainable 8-Rule Engine</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-[var(--r-lg)] bg-[var(--surface-paper)] border border-[var(--ink-300)]/60 flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div>
                <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-sun)] text-[var(--ink-900)] flex items-center justify-center font-data font-bold text-base mb-4 shadow-xs">
                  04
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
                  15-Second AI Brief
                </h3>
                <p className="font-body text-sm text-[var(--ink-700)] leading-relaxed mb-4">
                  Dr. Rao opens a 3-bullet pre-consult synthesis: <em>Since last visit, Concerns, Suggested checks</em>. Doctor decides with confidence.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--ink-200)] flex items-center gap-2 text-xs font-data font-semibold text-[var(--ink-900)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--blob-sun)]" />
                <span>Decision Support Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: INTERACTIVE LIVE SANDBOX ─────────────── */}
      <section id="demo-sandbox" className="py-20 lg:py-24 px-6 sm:px-12 max-w-[1280px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Description & Funnel Art */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[var(--blob-sun)]/20 text-[var(--ink-900)] px-3 py-1 rounded-[var(--r-pill)] font-data text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Triage Widget</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--ink-900)] tracking-tight">
              Test the Doctor Triage Loop Live
            </h2>
            <p className="font-body text-base text-[var(--ink-700)] leading-relaxed">
              Experience how our deterministic risk engine filters raw home vitals into weighted clinical reasons. Click the scenario triggers below:
            </p>
            <div className="w-full max-w-[320px] bg-[var(--surface-0)] p-4 rounded-[var(--r-lg)] border border-[var(--ink-300)] shadow-xs">
              <DataFunnelArt offset={4} />
            </div>
          </div>

          {/* Right Live Interactive Cockpit Preview */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 bg-[var(--surface-0)] shadow-[var(--shadow-card)] border border-[var(--ink-300)]">
              {/* Patient header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--ink-300)]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[var(--surface-100)] flex items-center justify-center font-display font-bold text-sm text-[var(--ink-900)]">
                      RS
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[var(--ink-900)]">
                        Ramesh Sharma (68y)
                      </h3>
                      <p className="font-body text-xs text-[var(--ink-500)]">
                        Hypertension, Type-2 Diabetes • Dr. Meera Rao
                      </p>
                    </div>
                  </div>
                </div>

                <RiskBadge band={simRiskBand} score={simScore} size="lg" />
              </div>

              {/* Status banner */}
              <div
                className={`my-4 p-3 rounded-[var(--r-md)] font-body text-xs font-medium border flex items-center gap-2 ${
                  simRiskBand === "red"
                    ? "bg-[var(--risk-red-bg)] text-[var(--risk-red)] border-[var(--risk-red)]/30"
                    : simRiskBand === "green"
                    ? "bg-[var(--risk-green-bg)] text-[var(--risk-green)] border-[var(--risk-green)]/30"
                    : "bg-[var(--risk-amber-bg)] text-[var(--ink-900)] border-[var(--risk-amber)]/30"
                }`}
              >
                {simRiskBand === "red" ? (
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>{simStatusMsg}</span>
              </div>

              {/* Why Flagged Reasons */}
              <div className="space-y-2 mb-6">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[var(--ink-700)]">
                  Active Clinical Reasons
                </h4>
                {simReasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[var(--r-md)] bg-[var(--surface-paper)] border border-[var(--ink-200)] flex items-start gap-2.5 text-xs font-body text-[var(--ink-900)]"
                  >
                    <span className="text-[var(--brand-indigo)] font-bold">●</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Simulation Action Triggers */}
              <div className="pt-4 border-t border-[var(--ink-200)] flex flex-wrap gap-3">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={triggerSimSpike}
                  className="text-xs shadow-xs"
                >
                  ⚡ Inject BP Spike (155/95) → RED
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={triggerSimRecover}
                  className="text-xs !bg-[var(--brand-teal)] hover:!bg-[var(--brand-teal-600)]"
                >
                  ✓ Take Meds & Stabilize → GREEN
                </Button>
                <Link href="/sim" className="ml-auto">
                  <Button variant="ghost" size="sm" className="text-xs border-[var(--ink-300)]">
                    Full Simulator Panel →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: EXPLORE PORTALS (PERSONA CARDS) ──────── */}
      <section id="portals" className="bg-[var(--surface-0)] border-t border-[var(--ink-300)]/60 py-20 lg:py-28 px-6 sm:px-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 pb-4 border-b border-[var(--ink-300)]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-data font-bold uppercase tracking-wider text-[var(--brand-teal)] mb-2">
                <DoodleSparkle size={14} color="var(--brand-teal)" />
                <span>Connected Ecosystem</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl text-[var(--ink-900)] tracking-tight">
                Explore CareBridge Portals
              </h2>
            </div>
            <p className="font-body text-xs text-[var(--ink-500)] max-w-sm">
              Click any portal below to experience the end-to-end hackathon demonstration.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {personas.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group p-6 rounded-[var(--r-xl)] bg-[var(--surface-paper)] border border-[var(--ink-300)]/80 ${item.borderColor} hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-[var(--r-md)] flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      >
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className="font-data text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-[var(--r-pill)] bg-[var(--surface-0)] border border-[var(--ink-300)] text-[var(--ink-700)]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[var(--ink-900)] group-hover:text-[var(--brand-indigo)] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs font-semibold text-[var(--ink-500)] mb-2.5">
                      {item.subtitle}
                    </p>
                    <p className="font-body text-xs text-[var(--ink-700)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--ink-200)] flex items-center justify-between text-xs font-display font-bold text-[var(--ink-900)] group-hover:text-[var(--brand-indigo)] transition-colors">
                    <span>Enter {item.title}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ARTISTIC BASELINE & PET DOODLE (BELLE STYLE) ─────── */}
      <section className="bg-[var(--surface-paper)] py-12 px-6 sm:px-12 border-t border-[var(--ink-300)]/60 text-center relative">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <DoodleSleepingCat width={100} height={46} className="mb-2" />
          <p className="font-display font-bold text-base text-[var(--ink-900)] mb-1">
            Where human care meets clinical precision.
          </p>
          <p className="font-body text-xs text-[var(--ink-500)] max-w-md">
            Non-diagnostic clinical decision support system designed with warmth for patients, families, and doctors.
          </p>
        </div>
      </section>

      {/* ─── EDITORIAL FOOTER ─────────────────────────────────── */}
      <footer className="bg-[var(--surface-0)] border-t border-[var(--ink-300)] py-10 px-6 sm:px-12 text-center sm:text-left">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="font-display font-extrabold text-base text-[var(--ink-900)]">
                CareBridge
              </span>
              <span className="font-data text-[10px] bg-[var(--surface-100)] text-[var(--ink-500)] px-2 py-0.5 rounded-[var(--r-pill)]">
                poweredbycaffine
              </span>
            </div>
            <p className="font-body text-xs text-[var(--ink-500)]">
              Vedesh • Aman • Swapin • Aryan • Shortlisted Hackathon Prototype
            </p>
          </div>

          <div className="text-center sm:text-right">
            <p className="font-body text-xs font-semibold text-[var(--ink-700)]">
              Decision support only. Not a diagnosis. Doctor decides.
            </p>
            <p className="font-body text-[11px] text-[var(--ink-300)] mt-0.5">
              All patient vitals and logs are simulated for demonstration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
