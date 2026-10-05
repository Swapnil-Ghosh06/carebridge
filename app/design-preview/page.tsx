"use client";

/**
 * Design Preview page (owner: Swapin)
 * ─────────────────────────────────────────────────────────
 * Visual eyeball test for:
 *  - All three fonts (Montserrat, DM Sans, Sora)
 *  - Full type scale
 *  - Colour tokens (ink, surface, brand, risk, blob)
 *  - All component variants
 *
 * Route: /design-preview
 * NOT included in production navigation — dev/review only.
 */

import * as React from "react";
import { Activity, Heart, Footprints, Pill, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { StatTile } from "@/components/ui/StatTile";
import { PatientRow } from "@/components/ui/PatientRow";
import { ReasonList } from "@/components/ui/ReasonList";
import { MedicineCard } from "@/components/ui/MedicineCard";
import { AlertItem } from "@/components/ui/AlertItem";
import { TrendChart } from "@/components/ui/TrendChart";
import { Toast } from "@/components/ui/Toast";
import { Illustration } from "@/components/ui/Illustration";
import { VoiceButton } from "@/components/ui/VoiceButton";
import { BriefPanel } from "@/components/ui/BriefPanel";
import { ConsentToggle } from "@/components/ui/ConsentToggle";
import { AuditRow } from "@/components/ui/AuditRow";
import { EmptyState } from "@/components/ui/EmptyState";

/* ── Small section wrapper ──────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2
        className="font-display font-bold text-2xl text-[var(--ink-700)] mb-6
                   pb-2 border-b border-[var(--ink-300)]"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ── Colour swatch ──────────────────────────────────────────── */
function Swatch({
  name,
  cssVar,
  textDark = false,
}: {
  name: string;
  cssVar: string;
  textDark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div
        className="w-16 h-16 rounded-[var(--r-md)] border border-[var(--ink-300)]"
        style={{ backgroundColor: `var(${cssVar})` }}
        title={cssVar}
      />
      <span
        className={[
          "font-data text-[10px] text-center leading-tight",
          textDark ? "text-[var(--ink-900)]" : "text-[var(--ink-500)]",
        ].join(" ")}
      >
        {name}
      </span>
    </div>
  );
}

export default function DesignPreviewPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-8 py-12 bg-[var(--surface-50)] min-h-screen">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="inline-block bg-[var(--risk-amber-bg)] text-[var(--risk-amber)] text-xs font-data px-3 py-1 rounded-[var(--r-pill)] mb-4">
          DEV ONLY — NOT FOR PRODUCTION
        </div>
        <h1 className="font-display font-extrabold text-5xl text-[var(--ink-900)] tracking-tight mb-3">
          CareBridge Design System
        </h1>
        <p className="font-body text-lg text-[var(--ink-500)]">
          Eyeball test — fonts, colours, and components.
        </p>
      </div>

      {/* ── 1. Type scale ─────────────────────────────────────── */}
      <Section title="1. Type Scale">
        <div className="space-y-4">
          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Hero · Montserrat 800 · 56px
            </span>
            <p
              className="font-display font-extrabold text-[var(--ink-900)] leading-[1.05]"
              style={{ fontSize: "56px" }}
            >
              Your phone&apos;s health data,
              <br />
              in your doctor&apos;s hands.
            </p>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              H1 · Montserrat 700 · 36px
            </span>
            <h1 className="font-display font-bold text-4xl text-[var(--ink-900)] leading-[1.15]">
              Patient Dashboard
            </h1>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              H2 · Montserrat 700 · 24px
            </span>
            <h2 className="font-display font-bold text-2xl text-[var(--ink-900)] leading-[1.25]">
              Today&apos;s Vitals
            </h2>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              H3 · Montserrat 600 · 18px
            </span>
            <h3 className="font-display font-semibold text-lg text-[var(--ink-900)] leading-[1.3]">
              Medicines Due Today
            </h3>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Body L · DM Sans 400 · 20px (patient default)
            </span>
            <p className="font-body text-[20px] text-[var(--ink-900)] leading-[1.5]">
              Good morning, Ramesh ji. You have 2 medicines due before 10 AM.
            </p>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Body · DM Sans 400 · 16px
            </span>
            <p className="font-body text-base text-[var(--ink-700)] leading-[1.5]">
              BP trend is 12% higher than last week. Metformin adherence: 65%.
              Last reading was 3 hours ago.
            </p>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Label · DM Sans 500 · 13px
            </span>
            <p className="font-body font-medium text-[13px] text-[var(--ink-500)] leading-[1.4]">
              Last updated · 3 minutes ago
            </p>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Stat XL · Sora 700 · 48px
            </span>
            <p className="font-data font-bold text-[48px] text-[var(--ink-900)] leading-[1.0]">
              142<span className="text-2xl text-[var(--ink-500)] ml-2">mmHg</span>
            </p>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Stat · Sora 600 · 24px
            </span>
            <p className="font-data font-semibold text-2xl text-[var(--ink-900)] leading-[1.1]">
              6,840 steps
            </p>
          </div>

          <div>
            <span className="font-data text-xs text-[var(--ink-300)] uppercase tracking-widest block mb-1">
              Badge · Sora 600 · 12px · uppercase · +0.04em
            </span>
            <p className="font-data font-semibold text-[12px] text-[var(--ink-900)] leading-[1.0] uppercase tracking-[0.04em]">
              HIGH RISK · MODERATE · LOW RISK
            </p>
          </div>
        </div>
      </Section>

      {/* ── 2. Colours ────────────────────────────────────────── */}
      <Section title="2. Colour Tokens">
        <div className="space-y-6">
          {/* Ink */}
          <div>
            <p className="font-body text-sm font-medium text-[var(--ink-500)] mb-3">
              Ink (text / borders)
            </p>
            <div className="flex gap-4 flex-wrap">
              <Swatch name="ink-900" cssVar="--ink-900" />
              <Swatch name="ink-700" cssVar="--ink-700" />
              <Swatch name="ink-500" cssVar="--ink-500" />
              <Swatch name="ink-300" cssVar="--ink-300" />
            </div>
          </div>

          {/* Surface */}
          <div>
            <p className="font-body text-sm font-medium text-[var(--ink-500)] mb-3">
              Surface
            </p>
            <div className="flex gap-4 flex-wrap">
              <Swatch name="surface-0" cssVar="--surface-0" textDark />
              <Swatch name="surface-50" cssVar="--surface-50" textDark />
              <Swatch name="surface-100" cssVar="--surface-100" textDark />
            </div>
          </div>

          {/* Brand */}
          <div>
            <p className="font-body text-sm font-medium text-[var(--ink-500)] mb-3">
              Brand
            </p>
            <div className="flex gap-4 flex-wrap">
              <Swatch name="brand-teal" cssVar="--brand-teal" />
              <Swatch name="teal-600" cssVar="--brand-teal-600" />
              <Swatch name="brand-mint" cssVar="--brand-mint" />
              <Swatch name="brand-indigo" cssVar="--brand-indigo" />
            </div>
          </div>

          {/* Blob */}
          <div>
            <p className="font-body text-sm font-medium text-[var(--ink-500)] mb-3">
              Blob (illustration only — never in UI)
            </p>
            <div className="flex gap-4 flex-wrap">
              <Swatch name="blob-coral" cssVar="--blob-coral" />
              <Swatch name="blob-sun" cssVar="--blob-sun" />
              <Swatch name="blob-leaf" cssVar="--blob-leaf" />
              <Swatch name="blob-sky" cssVar="--blob-sky" />
              <Swatch name="blob-indigo" cssVar="--blob-indigo" />
              <Swatch name="blob-teal" cssVar="--blob-teal" />
            </div>
          </div>

          {/* Risk */}
          <div>
            <p className="font-body text-sm font-medium text-[var(--ink-500)] mb-1">
              Risk (RiskBadge only — never for decoration)
            </p>
            <p className="font-body text-xs text-[var(--risk-red)] mb-3">
              ⚠ These colours must only appear inside RiskBadge.tsx
            </p>
            <div className="flex gap-4 flex-wrap">
              <Swatch name="risk-red" cssVar="--risk-red" />
              <Swatch name="risk-red-bg" cssVar="--risk-red-bg" textDark />
              <Swatch name="risk-amber" cssVar="--risk-amber" />
              <Swatch name="risk-amber-bg" cssVar="--risk-amber-bg" textDark />
              <Swatch name="risk-green" cssVar="--risk-green" />
              <Swatch name="risk-green-bg" cssVar="--risk-green-bg" textDark />
            </div>
          </div>
        </div>
      </Section>

      {/* ── 3. Button variants ────────────────────────────────── */}
      <Section title="3. Button">
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary CTA</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading>
            Loading…
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" iconRight={<ArrowRight size={16} />}>
            With icon
          </Button>
          <Button variant="ghost" iconLeft={<Heart size={16} />}>
            With icon left
          </Button>
          <Button variant="primary" fullWidth>
            Full width
          </Button>
        </div>
      </Section>

      {/* ── 4. Card variants ──────────────────────────────────── */}
      <Section title="4. Card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <h3 className="font-display font-semibold text-[var(--ink-900)]">
                Default Card
              </h3>
            </CardHeader>
            <CardBody>
              <p className="font-body text-[var(--ink-700)]">
                White card with shadow. Used for patient vitals and panels.
              </p>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>

          <Card variant="flat">
            <CardHeader>
              <h3 className="font-display font-semibold text-[var(--ink-900)]">
                Flat Card
              </h3>
            </CardHeader>
            <CardBody>
              <p className="font-body text-[var(--ink-700)]">
                Surface-50 background, no shadow. Good for secondary sections.
              </p>
            </CardBody>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <h3 className="font-display font-semibold text-[var(--ink-900)]">
                Bordered Card
              </h3>
            </CardHeader>
            <CardBody>
              <p className="font-body text-[var(--ink-700)]">
                Ink-300 border. Good for lists and form containers.
              </p>
            </CardBody>
          </Card>

          <Card variant="default" interactive>
            <CardBody>
              <p className="font-body font-medium text-[var(--ink-900)]">
                Interactive card (hover me)
              </p>
              <p className="font-body text-sm text-[var(--ink-500)] mt-1">
                Used for patient rows and selectable items.
              </p>
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* ── 5. RiskBadge ─────────────────────────────────────── */}
      <Section title="5. RiskBadge">
        <p className="font-body text-sm text-[var(--ink-500)] mb-4">
          Always icon + text label. Never colour alone.
        </p>
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <RiskBadge band="red" score={82} />
          <RiskBadge band="amber" score={54} />
          <RiskBadge band="green" score={28} />
        </div>
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <RiskBadge band="red" size="sm" />
          <RiskBadge band="amber" size="sm" />
          <RiskBadge band="green" size="sm" />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <RiskBadge band="red" size="lg" score={77} />
          <RiskBadge band="amber" size="lg" score={45} />
          <RiskBadge band="green" size="lg" score={12} />
        </div>
      </Section>

      {/* ── 6. StatTile ──────────────────────────────────────── */}
      <Section title="6. StatTile">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatTile
            value="142"
            unit="mmHg"
            label="Blood Pressure"
            trend="up"
            trendLabel="+12% this week"
            upIsGood={false}
            icon={<Activity size={20} />}
          />
          <StatTile
            value="6,840"
            unit="steps"
            label="Today's Steps"
            trend="down"
            trendLabel="-18% vs avg"
            upIsGood
            icon={<Footprints size={20} />}
          />
          <StatTile
            value="4/6"
            label="Medicines Taken"
            trend="neutral"
            trendLabel="On track"
            icon={<Pill size={20} />}
          />
          <StatTile
            value="98"
            unit="mg/dL"
            label="Fasting Glucose"
            trend="up"
            trendLabel="Normal range"
            upIsGood={false}
            icon={<Heart size={20} />}
          />
          <StatTile value="1,240" label="Patients Monitored" size="sm" />
          <StatTile
            value="87"
            unit="%"
            label="Alert Response Rate"
            size="sm"
            trend="up"
            trendLabel="+5%"
          />
        </div>
      </Section>

      {/* ── 7. Font verification ─────────────────────────────── */}
      <Section title="7. Font Verification">
        <Card variant="flat" padding="lg">
          <p className="font-body text-sm text-[var(--ink-500)] mb-4">
            Visually confirm these look like three distinct typefaces:
          </p>
          <div className="space-y-3">
            <p className="font-display font-bold text-xl text-[var(--ink-900)]">
              Montserrat (display): ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </p>
            <p className="font-body text-xl text-[var(--ink-900)]">
              DM Sans (body): The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-data text-xl text-[var(--ink-900)]">
              Sora (data): 142/88 mmHg · 6,840 steps · Score 77 · 98 mg/dL
            </p>
          </div>
        </Card>
      </Section>

      {/* ── 8. PatientRow (Doctor Portal) ────────────────────── */}
      <Section title="8. PatientRow (Doctor Portal List)">
        <div className="space-y-3">
          <PatientRow
            id="p1"
            name="Ramesh Sharma"
            age={68}
            topReason="Missed 3 consecutive Metformin doses"
            riskBand="red"
            riskScore={78}
            lastSeen="10m ago"
            isSelected={true}
          />
          <PatientRow
            id="p2"
            name="Kamala Devi"
            age={72}
            topReason="Systolic BP trending upward (+15% in 4 days)"
            riskBand="amber"
            riskScore={52}
            lastSeen="1h ago"
          />
          <PatientRow
            id="p3"
            name="Anand Kulkarni"
            age={64}
            topReason="All vitals in range; 100% adherence"
            riskBand="green"
            riskScore={18}
            lastSeen="3h ago"
          />
        </div>
      </Section>

      {/* ── 9. ReasonList (Why Flagged Panel) ────────────────── */}
      <Section title="9. ReasonList (Why Flagged Panel)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5">
            <h3 className="font-display font-bold text-base text-[var(--ink-900)] mb-3">
              Active Flags for Ramesh Sharma
            </h3>
            <ReasonList
              reasons={[
                {
                  ruleId: "med_missed_consecutive",
                  text: "Missed 3 consecutive doses of Metformin 500mg",
                  weight: 35,
                },
                {
                  ruleId: "bp_spike",
                  text: "Systolic BP 155 mmHg (above threshold 140 mmHg)",
                  weight: 25,
                },
                {
                  ruleId: "steps_drop",
                  text: "Daily steps dropped 45% below 14-day rolling average",
                  weight: 18,
                },
              ]}
            />
          </Card>

          <Card className="p-5">
            <h3 className="font-display font-bold text-base text-[var(--ink-900)] mb-3">
              Active Flags for Anand Kulkarni
            </h3>
            <ReasonList reasons={[]} />
          </Card>
        </div>
      </Section>

      {/* ── 10. MedicineCard (Patient Portal) ────────────────── */}
      <Section title="10. MedicineCard (Patient Schedule & Logging)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MedicineCard
            name="Metformin"
            dose="500 mg"
            time="08:00 AM"
            instructions="After breakfast"
            status="pending"
          />
          <MedicineCard
            name="Amlodipine"
            dose="5 mg"
            time="08:00 AM"
            instructions="With water"
            status="taken"
            takenAt="08:14 AM"
          />
          <MedicineCard
            name="Atorvastatin"
            dose="10 mg"
            time="09:00 PM"
            instructions="Before bed"
            status="missed"
          />
        </div>
      </Section>

      {/* ── 11. AlertItem (Feed & Notifications) ─────────────── */}
      <Section title="11. AlertItem (Notifications & Escalation Ladder)">
        <div className="space-y-3">
          <AlertItem
            level="urgent"
            patientName="Ramesh Sharma"
            message="Urgent escalation: 3 missed doses + elevated BP (155/95). Clinic outreach initiated."
            time="12m ago"
            actionLabel="Review Patient"
          />
          <AlertItem
            level="doctor"
            patientName="Kamala Devi"
            message="Blood pressure spike detected over 3 consecutive readings."
            time="45m ago"
            actionLabel="Open Chart"
          />
          <AlertItem
            level="family"
            message="Priya Sharma (Daughter) was notified regarding missed afternoon dose."
            time="2h ago"
          />
          <AlertItem
            level="reminder"
            message="Evening dose reminder scheduled for 09:00 PM."
            time="3h ago"
            acknowledged={true}
          />
        </div>
      </Section>

      {/* ── 12. TrendChart (Vitals) ───────────────────────────── */}
      <Section title="12. TrendChart (Recharts Line & Threshold Band)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TrendChart
            title="Blood Pressure Trend (14-day)"
            subtitle="Systolic (teal) / Diastolic (indigo) vs 140 mmHg clinical threshold"
            dataKey="systolic"
            dataLabel="Systolic"
            secondaryDataKey="diastolic"
            secondaryDataLabel="Diastolic"
            unit="mmHg"
            threshold={{ max: 140, min: 110, label: "Threshold 140" }}
            data={[
              { date: "Oct 01", systolic: 124, diastolic: 80 },
              { date: "Oct 02", systolic: 128, diastolic: 82 },
              { date: "Oct 03", systolic: 130, diastolic: 84 },
              { date: "Oct 04", systolic: 135, diastolic: 86 },
              { date: "Oct 05", systolic: 142, diastolic: 90 },
              { date: "Oct 06", systolic: 148, diastolic: 92 },
              { date: "Oct 07", systolic: 155, diastolic: 95 },
            ]}
          />

          <TrendChart
            title="Daily Steps Activity"
            subtitle="Daily step count trend"
            dataKey="steps"
            dataLabel="Steps"
            unit="steps"
            strokeColor="#4B3FB8"
            data={[
              { date: "Oct 01", steps: 6800 },
              { date: "Oct 02", steps: 7100 },
              { date: "Oct 03", steps: 6400 },
              { date: "Oct 04", steps: 5900 },
              { date: "Oct 05", steps: 4200 },
              { date: "Oct 06", steps: 3100 },
              { date: "Oct 07", steps: 2200 },
            ]}
          />
        </div>
      </Section>

      {/* ── 13. Toast ────────────────────────────────────────── */}
      <Section title="13. Toast Notifications">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Toast
            type="success"
            title="Medicine Logged"
            message="Metformin 500mg recorded as taken at 08:14 AM."
          />
          <Toast
            type="info"
            title="Teleconsult Scheduled"
            message="Dr. Meera Rao booked a slot with Ramesh for 4:30 PM."
          />
          <Toast
            type="warning"
            title="Missed Dose Warning"
            message="Afternoon Amlodipine is 45 minutes overdue."
          />
          <Toast
            type="error"
            title="Sync Connection Failed"
            message="Could not reach vitals monitor. Retrying in 5s."
          />
        </div>
      </Section>

      {/* ── 14. Original Illustrations ──────────────────────── */}
      <Section title="14. Original Illustrations (Offset Color Blobs + Navy Line Art)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 flex flex-col items-center text-center">
            <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
              (a) Patient & Companion
            </h4>
            <p className="font-body text-xs text-[var(--ink-500)] mb-4">
              Elderly patient logging health on phone with loyal dog companion
            </p>
            <div className="w-full max-w-[340px]">
              <Illustration name="elderly-phone" />
            </div>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
              (b) Doctor with Tablet
            </h4>
            <p className="font-body text-xs text-[var(--ink-500)] mb-4">
              Doctor reviewing real-time patient charts and vitals on tablet
            </p>
            <div className="w-full max-w-[340px]">
              <Illustration name="doctor-tablet" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 flex flex-col items-center text-center">
            <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
              (c) Family Video Check-in
            </h4>
            <p className="font-body text-xs text-[var(--ink-500)] mb-4">
              Family member staying connected with daily video check-in
            </p>
            <div className="w-full max-w-[340px]">
              <Illustration name="family-call" />
            </div>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <h4 className="font-display font-bold text-lg text-[var(--ink-900)] mb-2">
              (d) Community Hero Scene
            </h4>
            <p className="font-body text-xs text-[var(--ink-500)] mb-4">
              Connected healthcare team: patient, companion, daughter, and clinician
            </p>
            <div className="w-full max-w-[340px]">
              <Illustration name="hero-scene" />
            </div>
          </Card>
        </div>
      </Section>

      {/* ── 15. VoiceButton ──────────────────────────────────── */}
      <Section title="15. VoiceButton (Multilingual Voice Logging)">
        <Card className="p-8 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-center justify-items-center w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <span className="font-data text-xs text-[var(--ink-500)] uppercase tracking-wider mb-3">
                Idle State (Hindi)
              </span>
              <VoiceButton state="idle" language="hi-IN" />
            </div>

            <div className="flex flex-col items-center">
              <span className="font-data text-xs text-[var(--brand-teal)] uppercase tracking-wider font-bold mb-3">
                Listening (Pulsing)
              </span>
              <VoiceButton state="listening" language="kn-IN" />
            </div>

            <div className="flex flex-col items-center">
              <span className="font-data text-xs text-[var(--ink-500)] uppercase tracking-wider mb-3">
                Processing (English)
              </span>
              <VoiceButton state="processing" language="en-IN" />
            </div>
          </div>
        </Card>
      </Section>

      {/* ── 16. BriefPanel ───────────────────────────────────── */}
      <Section title="16. BriefPanel (AI Pre-Consult Brief)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BriefPanel
            patientName="Ramesh Sharma"
            data={{
              source: "llm",
              sinceLastVisit:
                "Ramesh reported stable morning BP for 10 days until Oct 4, when 3 consecutive evening doses of Metformin were missed. Systolic BP then climbed to 155 mmHg.",
              concerns: [
                "3 missed Metformin doses in 48 hours",
                "Systolic BP spike to 155/95 mmHg (+12%)",
                "Daily steps dropped by 45% over the past 3 days",
              ],
              suggestedChecks: [
                "Review gastrointestinal tolerance or pill burden",
                "Perform in-clinic BP confirmation",
                "Consider setting automated daughter SMS escalation",
              ],
            }}
          />

          <BriefPanel
            patientName="Anita S."
            data={{
              source: "fallback",
              sinceLastVisit:
                "Adherence rate 85% over 14 days. 1 missed dose logged on Oct 3. Vitals remained within baseline parameters.",
              concerns: [
                "Intermittent adherence on weekends",
              ],
              suggestedChecks: [
                "Reconfirm morning medication timing",
              ],
            }}
          />
        </div>
      </Section>

      {/* ── 17. ConsentToggle ────────────────────────────────── */}
      <Section title="17. ConsentToggle (Patient Privacy Controls)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConsentToggle
            category="vitals"
            label="Blood Pressure & Heart Rate"
            description="Share daily blood pressure monitor logs with Dr. Meera Rao"
            enabled={true}
            onChange={() => {}}
          />
          <ConsentToggle
            category="medicines"
            label="Medicine Logs & Adherence"
            description="Allow your care team to see scheduled vs taken dose history"
            enabled={true}
            onChange={() => {}}
          />
          <ConsentToggle
            category="steps"
            label="Physical Activity & Steps"
            description="Share daily step counts and mobility trends"
            enabled={false}
            onChange={() => {}}
          />
          <ConsentToggle
            category="glucose"
            label="Blood Glucose Readings"
            description="Share fasting and post-prandial blood sugar measurements"
            enabled={true}
            onChange={() => {}}
          />
        </div>
      </Section>

      {/* ── 18. AuditRow ─────────────────────────────────────── */}
      <Section title="18. AuditRow (Access Transparency Log)">
        <Card className="overflow-hidden">
          <div className="p-4 bg-[var(--surface-50)] border-b border-[var(--ink-300)] flex items-center justify-between">
            <h4 className="font-display font-bold text-sm text-[var(--ink-900)]">
              Recent Clinical Access History
            </h4>
            <span className="font-body text-xs text-[var(--ink-500)]">
              Logged automatically on doctor view
            </span>
          </div>
          <div>
            <AuditRow
              actor="Dr. Meera Rao"
              role="Primary Physician"
              category="Blood Pressure & Vitals"
              action="Reviewed longitudinal trend chart"
              timestamp="Today, 10:45 AM"
            />
            <AuditRow
              actor="Dr. Meera Rao"
              role="Primary Physician"
              category="Pre-Consult AI Brief"
              action="Generated 14-day consultation summary"
              timestamp="Today, 10:44 AM"
            />
            <AuditRow
              actor="Sunrise Clinic Escalation"
              role="Automated System"
              category="Medication Adherence"
              action="Dispatched Level 3 clinical notification"
              timestamp="Yesterday, 04:30 PM"
            />
          </div>
        </Card>
      </Section>

      {/* ── 19. EmptyState ───────────────────────────────────── */}
      <Section title="19. EmptyState Component">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmptyState
            title="No Active Clinical Alerts"
            description="All monitored patients are currently within baseline parameters and adhering to prescriptions."
            actionLabel="Refresh Monitor"
            onAction={() => {}}
          />

          <EmptyState
            title="No Unread Family Notifications"
            description="Ramesh ji is caught up on all scheduled doses for today."
          />
        </div>
      </Section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="text-center font-body text-xs text-[var(--ink-300)] py-8">
        CareBridge Design Preview · Swapin · Phase 2 Complete · Simulated data
      </footer>
    </main>
  );
}

