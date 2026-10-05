'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Activity, CheckCircle2, History } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { BottomNav } from '@/components/patient/BottomNav';
import { Locale, t } from '@/lib/i18n';
import { HERO_PATIENT, INITIAL_VITALS } from '@/lib/mockData';
import { Vital } from '@/lib/types';

export default function PatientVitalsPage() {
  const [locale, setLocale] = useState<Locale>('hi');
  const [systolic, setSystolic] = useState<string>('130');
  const [diastolic, setDiastolic] = useState<string>('85');
  const [pulse, setPulse] = useState<string>('72');
  const [vitalsHistory, setVitalsHistory] = useState<Vital[]>(INITIAL_VITALS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Classify BP reading
  const sysNum = parseInt(systolic, 10);
  const diaNum = parseInt(diastolic, 10);

  const getBpCategory = () => {
    if (isNaN(sysNum) || isNaN(diaNum)) return null;
    if (sysNum >= 140 || diaNum >= 90) {
      return {
        label: 'Stage 2 Hypertension (High)',
        color: 'text-risk-red bg-rose-50 border-rose-200',
      };
    }
    if (sysNum >= 130 || diaNum >= 80) {
      return {
        label: 'Stage 1 Hypertension (Moderate)',
        color: 'text-risk-yellow bg-amber-50 border-amber-200',
      };
    }
    if (sysNum >= 120 && diaNum < 80) {
      return {
        label: 'Elevated Pressure',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
      };
    }
    return {
      label: 'Normal (<120 / <80)',
      color: 'text-risk-green bg-emerald-50 border-emerald-200',
    };
  };

  const category = getBpCategory();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sysNum || !diaNum) return;

    setIsSubmitting(true);

    const newVital: Vital = {
      id: `vital-${Date.now()}`,
      patientId: HERO_PATIENT.id,
      type: 'bp',
      valueA: sysNum,
      valueB: diaNum,
      recordedAt: 'Just now',
    };

    // Optimistic UI update
    setVitalsHistory([newVital, ...vitalsHistory]);

    try {
      await fetch(`/api/patients/${HERO_PATIENT.id}/vitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bp',
          valueA: sysNum,
          valueB: diaNum,
        }),
      });
    } catch {
      // local fallback
    }

    setIsSubmitting(false);
    setToastMessage(t('reading_saved', locale));
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-50 text-navy-900 pb-28">
      <PatientHeader
        locale={locale}
        onLocaleChange={handleLocaleChange}
        showBack
        backHref="/patient"
        title={t('log_bp_title', locale)}
      />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
        <form onSubmit={handleSave} className="space-y-4">
          <Card className="p-6 border-teal-100 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-navy-900">
                  {t('log_bp_title', locale)}
                </h2>
                <p className="font-body text-xs text-gray-500">
                  Measured with cuff on left arm
                </p>
              </div>
            </div>

            {/* Inputs: Systolic & Diastolic */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-semibold text-gray-700 mb-1">
                  {t('systolic', locale)}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    min={70}
                    max={250}
                    required
                    className="w-full font-data font-bold text-2xl text-navy-900 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[52px]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                    mmHg
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-gray-700 mb-1">
                  {t('diastolic', locale)}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    min={40}
                    max={150}
                    required
                    className="w-full font-data font-bold text-2xl text-navy-900 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[52px]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                    mmHg
                  </span>
                </div>
              </div>
            </div>

            {/* Pulse Rate */}
            <div className="mt-4">
              <label className="block font-body text-sm font-semibold text-gray-700 mb-1">
                {t('pulse', locale)} (BPM)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  min={40}
                  max={200}
                  className="w-full font-data font-bold text-xl text-navy-900 px-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[48px]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                  bpm
                </span>
              </div>
            </div>

            {/* Live Indicator */}
            {category && (
              <div className={`mt-5 p-3 rounded-xl border flex items-center gap-2 ${category.color}`}>
                <Activity className="w-5 h-5 flex-shrink-0" />
                <span className="font-body text-sm font-semibold">
                  {category.label}
                </span>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isSubmitting}
                className="text-lg font-bold min-h-[54px]"
              >
                {t('save_reading', locale)}
              </Button>
            </div>
          </Card>
        </form>

        {/* History List */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-gray-500" />
            <h3 className="font-display font-bold text-lg text-navy-900">
              Recent Readings
            </h3>
          </div>

          <div className="space-y-2">
            {vitalsHistory
              .filter((v) => v.type === 'bp')
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-data font-bold text-xl text-navy-900">
                        {item.valueA ?? item.value_a ?? '-'} / {item.valueB ?? item.value_b ?? '-'}{' '}
                        <span className="text-xs text-gray-400 font-normal">mmHg</span>
                      </p>
                      <p className="font-body text-xs text-gray-400">
                        {item.recordedAt}
                      </p>
                    </div>
                  </div>

                  <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                    Recorded
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-xs text-gray-500 text-center pt-2">
          {t('decision_support_note', locale)}
        </p>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-navy-900 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-display text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <BottomNav locale={locale} />
    </div>
  );
}
