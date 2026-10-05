import Link from "next/link";
import {
  Activity,
  Stethoscope,
  Heart,
  Users,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Sliders,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  const roles = [
    {
      title: "Doctor Portal",
      subtitle: "Dr. Meera Rao • Sunrise Clinic",
      description:
        "Risk-ranked patient list, trend telemetry, transparent 'Why flagged' triggers, and AI pre-consult briefs.",
      icon: Stethoscope,
      href: "/doctor",
      badge: "Clinical Triage",
      badgeColor: "bg-brand-teal/10 text-brand-teal border-brand-teal/30",
    },
    {
      title: "Patient Companion",
      subtitle: "Ramesh ji • Hindi / Kannada UI",
      description:
        "Large-touch daily routine, simplified medication logs, voice entry in regional languages, and DPDP consent controls.",
      icon: Heart,
      href: "/patient",
      badge: "Elderly-Friendly",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "Family Caregiver Feed",
      subtitle: "Karan (Son) • Bengaluru",
      description:
        "Peace of mind with proactive alerts, 3-stage escalation ladder, and one-tap nudge reminders.",
      icon: Users,
      href: "/family",
      badge: "Proactive Loop",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Hospital Admin ROI",
      subtitle: "Executive Value Realization",
      description:
        "Real-time tracking of readmissions averted, doctor-hours saved, and SLA performance across the clinic.",
      icon: BarChart3,
      href: "/admin",
      badge: "Commercial Value",
      badgeColor: "bg-brand-indigo/10 text-brand-indigo border-brand-indigo/30",
    },
  ];

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="h-20 max-w-6xl w-full mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-pill bg-brand-teal flex items-center justify-center text-white shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-2xl text-ink-900 tracking-tight">
            CareBridge
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/sim">
            <Button size="sm" variant="outline" className="shadow-sm gap-1.5">
              <Sliders className="w-4 h-4" />
              <span>Simulator</span>
            </Button>
          </Link>
          <Link href="/doctor">
            <Button size="sm" variant="primary" className="shadow-sm">
              Launch Doctor Portal
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl w-full mx-auto px-6 py-10 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-brand-indigo/10 text-brand-indigo font-data text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-indigo" />
            <span>Healthcare Hackathon Pitch Prototype</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-ink-900 tracking-tight leading-[1.08] mb-6">
            Your phone&apos;s
            <br />
            <span className="text-brand-teal">health data,</span>
            <br />
            in your doctor&apos;s hands.
          </h1>

          <p className="font-body text-lg sm:text-xl text-ink-700 leading-relaxed max-w-2xl mb-8">
            Continuous remote patient monitoring that turns raw telemetry into an explainable, risk-ranked action list for clinicians — keeping family in the loop and preventing hospital readmissions.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/patient">
              <Button size="lg" variant="primary" className="gap-2 shadow-md">
                <Heart className="w-5 h-5" />
                <span>Patient Companion</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href="/doctor">
              <Button size="lg" variant="secondary" className="gap-2 shadow-md">
                <Stethoscope className="w-5 h-5" />
                <span>Doctor Dashboard</span>
              </Button>
            </Link>

            <Link href="/family">
              <Button size="lg" variant="outline" className="gap-2 shadow-sm">
                <Users className="w-5 h-5" />
                <span>Family View</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Role Selector Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-ink-900">
              Interactive Prototype Roles
            </h2>
            <span className="font-data text-xs text-ink-500">
              Select a portal to explore
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Link key={role.title} href={role.href} className="group">
                  <Card className="h-full flex flex-col justify-between p-5 group-hover:border-brand-teal group-hover:shadow-md transition-all duration-200">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-pill bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`font-data text-[10px] font-bold px-2 py-0.5 rounded-pill border ${role.badgeColor}`}
                        >
                          {role.badge}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-ink-900 text-base group-hover:text-brand-teal transition-colors">
                        {role.title}
                      </h3>
                      <p className="font-body text-xs font-semibold text-ink-500 mb-2">
                        {role.subtitle}
                      </p>
                      <p className="font-body text-xs text-ink-700 leading-normal">
                        {role.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-ink-300/20 flex items-center justify-between font-display text-xs font-bold text-brand-teal">
                      <span>Launch Role</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Compliance Footer */}
      <footer className="h-14 max-w-6xl w-full mx-auto px-6 flex flex-col sm:flex-row items-center justify-between border-t border-ink-300/30 text-xs font-data text-ink-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-teal" />
          <span>Decision support only. Doctor decides. • DPDP Act Compliant</span>
        </div>
        <div>
          <span>Simulated patient data • Team poweredbycaffine</span>
        </div>
      </footer>
    </div>
  );
}
