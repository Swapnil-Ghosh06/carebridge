'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Footprints, Pill, Heart, ArrowRight, CheckCircle2, Mic } from 'lucide-react';
import { StatTile, MedicineCard, Card } from '@/components/ui';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { BottomNav } from '@/components/patient/BottomNav';
import { Locale, t } from '@/lib/i18n';
import { HERO_PATIENT, SEED_MEDICINES, INITIAL_MED_LOGS, INITIAL_VITALS } from '@/lib/mockData';
import { Medicine, MedLog, Vital } from '@/lib/types';

export default function PatientHomePage() {
  const [locale, setLocale] = useState<Locale>('hi'); // Default Hindi for Ramesh hero scenario
  const [medicines] = useState<Medicine[]>(SEED_MEDICINES);
  const [medLogs, setMedLogs] = useState<MedLog[]>(INITIAL_MED_LOGS);
  const [vitals] = useState<Vital[]>(INITIAL_VITALS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load language preference from localStorage
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem('carebridge_locale') as Locale;
      if (savedLocale && ['en', 'hi', 'kn'].includes(savedLocale)) {
        setLocale(savedLocale);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem('carebridge_locale', newLocale);
    } catch {
      // ignore
    }
  };

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greeting_morning', locale);
    if (hour < 17) return t('greeting_afternoon', locale);
    return t('greeting_evening', locale);
  };

  // Find next pending medicine
  const pendingLogs = medLogs.filter((l) => l.status === 'pending');
  const nextLog = pendingLogs[0];
  const nextMedicine = nextLog
    ? medicines.find((m) => m.id === nextLog.medicineId)
    : null;

  // Handle Mark as Taken
  const handleMarkTaken = async (medicineId: string) => {
    setIsLoading(true);
    // Optimistic update
    setMedLogs((prev) =>
      prev.map((log) =>
        log.medicineId === medicineId
          ? { ...log, status: 'taken', takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : log
      )
    );

    // Call API (falls back gracefully if backend route handler isn't running yet)
    try {
      await fetch(`/api/patients/${HERO_PATIENT.id}/med-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineId, status: 'taken' }),
      });
    } catch {
      // graceful fallback for local prototype
    }

    setIsLoading(false);
    setToastMessage(t('med_logged', locale));
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Compute stat values
  const takenCount = medLogs.filter((l) => l.status === 'taken').length;
  const totalMeds = medLogs.length;
  const latestBp = vitals.find((v) => v.type === 'bp');
  const latestSteps = vitals.find((v) => v.type === 'steps');

  return (
    <div className="min-h-screen bg-surface-50 text-navy-900 pb-28">
      {/* Patient Header with Language Switcher */}
      <PatientHeader locale={locale} onLocaleChange={handleLocaleChange} />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* Simulated Data & Decision Support Banner */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-amber-800">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {t('decision_support_note', locale)}
          </span>
        </div>

        {/* Greeting Hero Section */}
        <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-3xl p-6 shadow-card relative overflow-hidden">
          <div className="relative z-10">
            <span className="font-body text-teal-400 text-base sm:text-lg font-medium tracking-wide">
              {getGreeting()},
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mt-0.5">
              {HERO_PATIENT.name} {t('ji', locale)}
            </h2>
            <p className="font-body text-gray-300 text-base mt-2">
              {pendingLogs.length > 0
                ? `${pendingLogs.length} dose${pendingLogs.length > 1 ? 's' : ''} left for today.`
                : t('all_caught_up', locale)}
            </p>
          </div>

          {/* Quick Voice Log Prompt Pill */}
          <Link
            href="/patient/voice"
            className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <span className="p-1.5 rounded-full bg-teal-500/20 text-teal-400">
                <Mic className="w-3.5 h-3.5" />
              </span>
              <span>{t('voice_hint', locale)}</span>
            </div>
            <span className="text-xs font-display font-bold text-teal-400 flex items-center gap-1">
              <span>Try voice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </section>

        {/* Next Medicine Dose Card (Phase 1 core requirement) */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-navy-900">
              {t('next_dose', locale)}
            </h3>
            <Link
              href="/patient/medicines"
              className="font-body text-sm font-semibold text-teal-600 hover:text-teal-700"
            >
              View all ({totalMeds})
            </Link>
          </div>

          {nextMedicine && nextLog ? (
            <MedicineCard
              id={nextMedicine.id}
              name={nextMedicine.name}
              dose={nextMedicine.dose}
              time={nextLog.scheduledAt || nextLog.scheduled_at || "08:00 AM"}
              instructions={nextMedicine.instructions}
              status="pending"
              isLoading={isLoading}
              onMarkTaken={handleMarkTaken}
            />
          ) : (
            <Card className="text-center py-8 bg-white border border-emerald-100">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h4 className="font-display font-bold text-xl text-navy-900">
                {t('all_caught_up', locale)}
              </h4>
              <p className="font-body text-base text-gray-500 mt-1 max-w-xs mx-auto">
                All scheduled medicines for today have been completed.
              </p>
            </Card>
          )}
        </section>

        {/* 3 StatTiles: Steps, Medicines, BP (Sora for numbers) */}
        <section className="space-y-2">
          <h3 className="font-display font-bold text-xl text-navy-900">
            {t('today_summary', locale)}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Steps Tile */}
            <StatTile
              label={t('steps_today', locale)}
              value={latestSteps ? (latestSteps.valueA ?? latestSteps.value_a ?? 4210).toLocaleString() : '4,210'}
              unit="steps"
              target="Goal: 6,000"
              variant="teal"
              icon={<Footprints className="w-5 h-5 text-teal-600" />}
              trendText="On track"
              trend="neutral"
            />

            {/* Medicines Taken Tile */}
            <StatTile
              label={t('meds_adherence', locale)}
              value={`${takenCount}/${totalMeds}`}
              unit="doses"
              target={takenCount === totalMeds ? '100% adherence' : 'Pending evening'}
              variant="indigo"
              icon={<Pill className="w-5 h-5 text-indigo-600" />}
              trend="up"
              trendText={takenCount > 0 ? 'Logged' : 'None yet'}
            />

            {/* Blood Pressure Tile */}
            <StatTile
              label={t('latest_bp', locale)}
              value={latestBp ? `${latestBp.valueA ?? latestBp.value_a}/${latestBp.valueB ?? latestBp.value_b}` : '138/88'}
              unit="mmHg"
              target="Target <130/80"
              variant="amber"
              icon={<Heart className="w-5 h-5 text-amber-600" />}
              trend="up"
              trendText="Elevated"
            />
          </div>
        </section>

        {/* Quick Action: Log BP reading or Call Doctor */}
        <section className="pt-2">
          <Link href="/patient/vitals">
            <Card hoverEffect className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-teal-50/50 to-white border-teal-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-600 text-white rounded-2xl">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-navy-900">
                    {t('log_bp_title', locale)}
                  </h4>
                  <p className="font-body text-sm text-gray-500">
                    Record your morning or evening pressure
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-teal-600" />
            </Card>
          </Link>
        </section>

        {/* Clinic & Doctor Info Footer Card */}
        <section className="pt-2">
          <Card className="bg-gray-50 border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  Primary Physician
                </p>
                <p className="font-display font-bold text-navy-900 text-base">
                  {t('doctor_name', locale)}
                </p>
                <p className="font-body text-xs text-gray-500">
                  {t('clinic_name', locale)} • Bengaluru
                </p>
              </div>
              <a
                href="tel:+918023456789"
                className="px-4 py-2 bg-white border border-gray-300 rounded-full font-display font-bold text-xs text-navy-900 hover:bg-gray-100 flex items-center gap-1.5"
              >
                <span>Call Clinic</span>
              </a>
            </div>
          </Card>
        </section>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-navy-900 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-display text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bottom Tab Bar (72px, fixed bottom) */}
      <BottomNav locale={locale} />
    </div>
  );
}
