/**
 * CareBridge — Award-Winning Artistic Landing Page (owner: Swapin)
 * ─────────────────────────────────────────────────────────────────
 * Faithfully crafted in the boutique designer aesthetic of "Belle":
 *  - Spacious warm artist paper canvas (--surface-paper: #FCFBF8)
 *  - Symmetrical hand-drawn doodle canopies arching over the hero
 *  - Elegant editorial typography (Montserrat 800 + DM Sans + Sora)
 *  - Centerpiece ground line with sleeping cat on left and sitting person on right
 *  - High-contrast visual showcase cards with rich application interfaces
 *  - Tactile live interactive triage sandbox widget right on the page
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
  Activity,
  Heart,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RiskBadge, type RiskBand } from "@/components/ui/RiskBadge";
import {
  DoodleSparkle,
  DoodleStar,
  DoodleUnderline,
  DoodleSleepingCat,
  DoodleSittingPerson,
  DoodleCanopyLeft,
  DoodleCanopyRight,
} from "@/components/ui/Doodles";

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
      {/* ─── 1. MINIMALIST BOUTIQUE HEADER ────────────────────── */}
      <header className="sticky top-0 z-50 bg-[var(--surface-paper)]/95 backdrop-blur-md px-6 sm:px-12 py-5 transition-all">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="flex items-center gap-6 text-sm font-body font-medium text-[var(--ink-700)]">
            <a
              href="#story"
              className="hover:text-[var(--ink-900)] transition-colors hover:underline underline-offset-4"
            >
              Story
            </a>
            <a
              href="#showcase"
              className="hover:text-[var(--ink-900)] transition-colors hover:underline underline-offset-4"
            >
              Portals
            </a>
          </nav>

          {/* Center Brand Identity (Belle Organic Script Style) */}
          <Link href="/" className="group flex items-center gap-1.5 select-none">
            <span
              className="font-display font-black text-2xl sm:text-3xl text-[var(--ink-900)] tracking-tight group-hover:scale-105 transition-transform"
              style={{ letterSpacing: "-0.04em" }}
            >
              carebridge
            </span>
            <DoodleSparkle size={16} color="var(--blob-coral)" className="animate-pulse-doodle" />
          </Link>

          {/* Right Navigation / Portals */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-body font-medium text-[var(--ink-700)]">
            <a
              href="#sandbox"
              className="hidden sm:inline-block hover:text-[var(--ink-900)] transition-colors hover:underline underline-offset-4"
            >
              Live Sandbox
            </a>
            <Link
              href="/doctor"
              className="px-4 py-1.5 rounded-[var(--r-pill)] bg-[var(--ink-900)] text-[var(--surface-0)] hover:bg-[var(--brand-indigo)] transition-all font-display font-bold text-xs tracking-wide shadow-sm"
            >
              Doctor Portal →
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 2. BELLE-INSPIRED HERO CENTERPIECE ───────────────── */}
      <section className="relative max-w-[1200px] mx-auto w-full px-6 sm:px-12 pt-8 pb-4 lg:pt-14 flex flex-col items-center text-center">
        {/* Symmetrical Doodle Canopies */}
        <div className="absolute top-2 left-0 sm:left-4 w-44 sm:w-64 pointer-events-none opacity-90 select-none">
          <DoodleCanopyLeft />
        </div>
        <div className="absolute top-2 right-0 sm:right-4 w-44 sm:w-64 pointer-events-none opacity-90 select-none">
          <DoodleCanopyRight />
        </div>

        {/* Central Welcoming Statement */}
        <div className="max-w-2xl mx-auto z-10 pt-10 sm:pt-12 mb-6">
          <h2 className="font-display font-medium text-xl sm:text-2xl text-[var(--ink-700)] mb-3 tracking-tight">
            Hello! We&apos;re CareBridge,
          </h2>
          <h1
            className="font-display font-black text-[var(--ink-900)] leading-[1.12] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(34px, 4.8vw, 56px)" }}
          >
            We turn everyday home health logs into{" "}
            <span className="relative inline-block text-[var(--brand-indigo)]">
              timely clinical care.
              <span className="absolute left-0 -bottom-2.5 w-full pointer-events-none">
                <DoodleUnderline width="100%" color="var(--blob-sun)" />
              </span>
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg text-[var(--ink-500)] leading-relaxed max-w-lg mx-auto mb-8">
            A continuous, explainable care loop connecting patients, family caregivers, and physicians across India.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
            <Link href="/doctor">
              <Button
                variant="secondary"
                size="md"
                className="!bg-[var(--ink-900)] hover:!bg-[var(--brand-indigo)] text-sm font-display font-bold px-7 !min-h-[48px] rounded-[var(--r-pill)] shadow-sm"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                EXPLORE DOCTOR COCKPIT
              </Button>
            </Link>
            <Link href="/patient">
              <Button
                variant="ghost"
                size="md"
                className="border border-[var(--ink-300)] hover:bg-[var(--surface-0)] text-sm font-display font-semibold px-6 !min-h-[48px] rounded-[var(--r-pill)]"
              >
                <Smartphone className="w-4 h-4 mr-2 text-[var(--brand-teal-600)]" />
                Try Patient Voice App
              </Button>
            </Link>
          </div>

          {/* Live Status Subtext Pill */}
          <div className="inline-flex items-center gap-2 text-xs font-data font-medium text-[var(--ink-500)] bg-[var(--surface-0)] border border-[var(--ink-300)]/80 px-3.5 py-1.5 rounded-[var(--r-pill)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--risk-green)] animate-ping" />
            <span>Simulated Data • 1,240 Monitored Patients • CRCE Hackathon</span>
          </div>
        </div>

        {/* ─── THE ICONIC GROUND LINE: CAT & SITTING PERSON ────── */}
        <div className="w-full relative mt-8 sm:mt-12">
          {/* Edge to Edge Horizontal Line */}
          <div className="w-full border-b-2 border-[var(--ink-900)] relative">
            {/* Sleeping Cat on the Left */}
            <div className="absolute left-4 sm:left-16 -bottom-[2px] transform translate-y-0 select-none">
              <DoodleSleepingCat width={100} height={46} />
            </div>

            {/* Sitting Character with Device on the Right */}
            <div className="absolute right-4 sm:right-16 -bottom-[2px] transform translate-y-0 select-none">
              <DoodleSittingPerson width={105} height={92} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. SHOWCASE GALLERY CARDS (LIKE BELLE'S PORTFOLIO) ─ */}
      <section id="showcase" className="max-w-[1200px] mx-auto w-full px-6 sm:px-12 py-16 sm:py-24">
        {/* Top 2 Primary Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Card 1: Patient Voice & Daily Care */}
          <Link
            href="/patient"
            className="group block bg-[var(--surface-0)] rounded-[var(--r-xl)] border border-[var(--ink-300)]/80 p-8 sm:p-10 shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Blob Layer */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--blob-teal)]/10 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div className="flex items-center justify-between mb-6">
              <span className="font-data text-xs font-bold uppercase tracking-wider text-[var(--brand-teal-600)] bg-[var(--surface-100)] px-3 py-1 rounded-[var(--r-pill)]">
                01 • Senior-First Patient App
              </span>
              <span className="font-data text-xs text-[var(--ink-500)] flex items-center gap-1 group-hover:text-[var(--ink-900)]">
                Launch Experience <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--ink-900)] mb-3 leading-tight">
              Voice-First Health Logging for Seniors
            </h3>
            <p className="font-body text-sm sm:text-base text-[var(--ink-700)] mb-8 leading-relaxed">
              No complicated typing. Seniors tap the big microphone and speak naturally in <strong>Hindi, Kannada, or English</strong>. Intent parser logs medication in 1 second.
            </p>

            {/* Visual UI Simulation Container */}
            <div className="bg-[var(--surface-paper)] rounded-[var(--r-lg)] border border-[var(--ink-200)] p-5 space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--ink-200)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--blob-teal)]/20 text-[var(--brand-teal-600)] flex items-center justify-center font-bold text-xs">
                    RS
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--ink-900)]">Ramesh K. (68y)</h4>
                    <p className="font-body text-xs text-[var(--ink-500)]">Morning Dose Schedule</p>
                  </div>
                </div>
                <span className="font-data text-xs font-bold text-[var(--risk-green)] bg-[var(--risk-green-bg)] px-2.5 py-1 rounded-[var(--r-pill)]">
                  ✓ TAKEN
                </span>
              </div>

              <div className="flex items-center justify-between bg-[var(--surface-0)] p-3 rounded-[var(--r-md)] border border-[var(--ink-200)]">
                <div className="flex items-center gap-3">
                  <Pill className="w-5 h-5 text-[var(--brand-teal)]" />
                  <div>
                    <p className="font-display font-bold text-sm text-[var(--ink-900)]">Metformin 500mg</p>
                    <p className="font-body text-xs text-[var(--ink-500)]">8:00 AM • After Breakfast</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-data text-[var(--ink-500)]">
                  <Mic className="w-3.5 h-3.5 text-[var(--brand-teal)]" />
                  <span>&quot;Maine dawai le li&quot;</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Doctor Clinical Cockpit & AI Brief */}
          <Link
            href="/doctor"
            className="group block bg-[var(--surface-0)] rounded-[var(--r-xl)] border border-[var(--ink-300)]/80 p-8 sm:p-10 shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Blob Layer */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--blob-sun)]/15 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div className="flex items-center justify-between mb-6">
              <span className="font-data text-xs font-bold uppercase tracking-wider text-[var(--brand-indigo)] bg-[var(--surface-100)] px-3 py-1 rounded-[var(--r-pill)]">
                02 • Clinical Triage & AI Synthesis
              </span>
              <span className="font-data text-xs text-[var(--ink-500)] flex items-center gap-1 group-hover:text-[var(--ink-900)]">
                Launch Cockpit <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--ink-900)] mb-3 leading-tight">
              Explainable Risk Triage & Pre-Consult Briefs
            </h3>
            <p className="font-body text-sm sm:text-base text-[var(--ink-700)] mb-8 leading-relaxed">
              Prioritize acute patients instantly. 8 deterministic clinical rules score risk (0–100) and generate a 15-second longitudinal pre-consult summary.
            </p>

            {/* Visual UI Simulation Container */}
            <div className="bg-[var(--surface-paper)] rounded-[var(--r-lg)] border border-[var(--ink-200)] p-5 space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--ink-200)]">
                <div className="flex items-center gap-2">
                  <RiskBadge band="red" score={84} size="sm" />
                  <span className="font-display font-bold text-sm text-[var(--ink-900)]">Ramesh K.</span>
                </div>
                <span className="font-data text-xs text-[var(--risk-red)] font-bold">
                  ⚡ Blood Pressure Spike (155/95)
                </span>
              </div>

              <div className="bg-[var(--surface-0)] p-3 rounded-[var(--r-md)] border border-[var(--ink-200)] text-xs font-body text-[var(--ink-700)] leading-relaxed">
                <div className="flex items-center gap-1.5 font-display font-bold text-[var(--ink-900)] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--blob-sun)]" />
                  <span>14-Day AI Synthesis:</span>
                </div>
                <p>Systolic BP +15 mmHg above baseline; 2 missed evening doses. Suggested check: review antihypertensive adherence.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom 3 Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 3: Family Care Circle */}
          <Link
            href="/family"
            className="group p-6 rounded-[var(--r-lg)] bg-[var(--surface-0)] border border-[var(--ink-300)]/80 hover:border-[var(--blob-coral)] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-coral)]/15 text-[var(--blob-coral)] flex items-center justify-center mb-4">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-1.5 group-hover:text-[var(--brand-indigo)] transition-colors">
                Family Escalation Feed
              </h4>
              <p className="font-body text-xs text-[var(--ink-700)] leading-relaxed">
                Automatic 3-stage escalation ladder: patient reminder → family WhatsApp nudge → doctor consult before an ER visit is needed.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[var(--ink-200)] flex items-center justify-between text-xs font-display font-bold text-[var(--ink-900)]">
              <span>View Family Feed</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Admin ROI & Clinical Impact */}
          <Link
            href="/admin"
            className="group p-6 rounded-[var(--r-lg)] bg-[var(--surface-0)] border border-[var(--ink-300)]/80 hover:border-[var(--blob-leaf)] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-leaf)]/15 text-[var(--blob-leaf)] flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-1.5 group-hover:text-[var(--brand-indigo)] transition-colors">
                Admin & Hospital ROI
              </h4>
              <p className="font-body text-xs text-[var(--ink-700)] leading-relaxed">
                Quantified clinical impact: 14 readmissions prevented this month, 87% alert response velocity, and 120 clinical hours saved.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[var(--ink-200)] flex items-center justify-between text-xs font-display font-bold text-[var(--ink-900)]">
              <span>View Admin ROI</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Interactive Event Simulator */}
          <Link
            href="/sim"
            className="group p-6 rounded-[var(--r-lg)] bg-[var(--surface-0)] border border-[var(--ink-300)]/80 hover:border-[var(--blob-sun)] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-[var(--r-md)] bg-[var(--blob-sun)]/25 text-[var(--ink-900)] flex items-center justify-center mb-4">
                <Sliders className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-1.5 group-hover:text-[var(--brand-indigo)] transition-colors">
                Live Simulator Panel
              </h4>
              <p className="font-body text-xs text-[var(--ink-700)] leading-relaxed">
                Real-time event injection for hackathon judges: trigger missed doses, wearable drops, and blood pressure spikes in 1 tap.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[var(--ink-200)] flex items-center justify-between text-xs font-display font-bold text-[var(--ink-900)]">
              <span>Open Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ─── 4. TACTILE INTERACTIVE LIVE SANDBOX WIDGET ──────── */}
      <section id="sandbox" className="bg-[var(--surface-0)] border-y border-[var(--ink-300)]/80 py-20 px-6 sm:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-data font-bold uppercase tracking-wider text-[var(--brand-teal)]">
                <Sparkles size={14} />
                <span>Interactive Live Sandbox</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink-900)] tracking-tight">
                Try the Live Doctor Triage Sandbox
              </h2>
              <p className="font-body text-base text-[var(--ink-700)] leading-relaxed">
                Click the test scenario buttons below to see how our explainable 8-rule engine recalculates risk score and generates clinical reasons in real time.
              </p>
            </div>

            {/* Right Column Interactive Cockpit Widget */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 bg-[var(--surface-paper)] border border-[var(--ink-300)] shadow-sm">
                {/* Patient Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--ink-300)]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[var(--ink-900)] text-[var(--surface-0)] flex items-center justify-center font-display font-bold text-sm">
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

                  <RiskBadge band={simRiskBand} score={simScore} size="lg" />
                </div>

                {/* Status Message Banner */}
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
                      className="p-3 rounded-[var(--r-md)] bg-[var(--surface-0)] border border-[var(--ink-200)] flex items-start gap-2.5 text-xs font-body text-[var(--ink-900)]"
                    >
                      <span className="text-[var(--brand-indigo)] font-bold">●</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Simulation Action Triggers */}
                <div className="pt-4 border-t border-[var(--ink-200)] flex flex-wrap items-center gap-3">
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
                    ✓ Log Meds & Stabilize → GREEN
                  </Button>
                  <Link href="/sim" className="sm:ml-auto">
                    <Button variant="ghost" size="sm" className="text-xs border-[var(--ink-300)]">
                      Full Control Panel →
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. STORY & PHILOSOPHY SECTION ────────────────────── */}
      <section id="story" className="max-w-[1200px] mx-auto w-full px-6 sm:px-12 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--surface-0)] border border-[var(--ink-300)] mb-6 text-[var(--blob-coral)]">
            <Heart className="w-6 h-6 fill-[var(--blob-coral)]" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink-900)] mb-4 tracking-tight">
            Designed with Human Warmth for Indian Healthcare
          </h2>
          <p className="font-body text-base text-[var(--ink-700)] leading-relaxed mb-8">
            We believe chronic disease management should feel as gentle and natural as a conversation over chai, backed by the rigor of explainable clinical triage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-6 border-t border-[var(--ink-300)]">
            <div>
              <p className="font-data font-bold text-2xl text-[var(--ink-900)]">68%</p>
              <p className="font-body text-xs text-[var(--ink-500)] mt-1">
                of seniors struggle with digital health apps without voice interfaces.
              </p>
            </div>
            <div>
              <p className="font-data font-bold text-2xl text-[var(--brand-teal-600)]">15 sec</p>
              <p className="font-body text-xs text-[var(--ink-500)] mt-1">
                for doctors to review 14 days of home history with our pre-consult brief.
              </p>
            </div>
            <div>
              <p className="font-data font-bold text-2xl text-[var(--brand-indigo)]">100%</p>
              <p className="font-body text-xs text-[var(--ink-500)] mt-1">
                explainable rule-based clinical reasons. The doctor always decides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. BOUTIQUE FOOTER ───────────────────────────────── */}
      <footer className="bg-[var(--surface-0)] border-t border-[var(--ink-300)] py-12 px-6 sm:px-12 text-center sm:text-left">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="font-display font-black text-lg text-[var(--ink-900)] tracking-tight">
                carebridge
              </span>
              <span className="font-data text-[10px] bg-[var(--surface-paper)] border border-[var(--ink-300)] text-[var(--ink-700)] px-2 py-0.5 rounded-[var(--r-pill)]">
                poweredbycaffine
              </span>
            </div>
            <p className="font-body text-xs text-[var(--ink-500)]">
              Vedesh • Aman • Swapin • Aryan • CRCE Hackathon Prototype
            </p>
          </div>

          <div className="text-center sm:text-right">
            <p className="font-body text-xs font-semibold text-[var(--ink-700)]">
              Clinical decision support only. Not a diagnosis. Doctor decides.
            </p>
            <p className="font-body text-[11px] text-[var(--ink-400)] mt-0.5">
              All patient vitals and logs are simulated for demonstration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
