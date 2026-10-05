'use client';

import React, { useState, useEffect } from 'react';
import { Pill, CheckCircle2, Mic } from 'lucide-react';
import { MedicineCard, Card } from '@/components/ui';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { BottomNav } from '@/components/patient/BottomNav';
import { Locale, t } from '@/lib/i18n';
import { HERO_PATIENT, SEED_MEDICINES, INITIAL_MED_LOGS } from '@/lib/mockData';
import { Medicine, MedLog } from '@/lib/types';

export default function PatientMedicinesPage() {
  const [locale, setLocale] = useState<Locale>('hi');
  const [medicines] = useState<Medicine[]>(SEED_MEDICINES);
  const [medLogs, setMedLogs] = useState<MedLog[]>(INITIAL_MED_LOGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

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

  const handleMarkTaken = async (medicineId: string) => {
    setLoadingId(medicineId);

    // Optimistic UI update
    setMedLogs((prev) =>
      prev.map((log) =>
        log.medicineId === medicineId
          ? { ...log, status: 'taken', takenAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : log
      )
    );

    try {
      await fetch(`/api/patients/${HERO_PATIENT.id}/med-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineId, status: 'taken' }),
      });
    } catch {
      // fallback
    }

    setLoadingId(null);
    setToastMessage(t('med_logged', locale));
    setTimeout(() => setToastMessage(null), 3000);
  };

  const takenCount = medLogs.filter((l) => l.status === 'taken').length;
  const totalCount = medLogs.length;

  return (
    <div className="min-h-screen bg-surface-50 text-navy-900 pb-28">
      <PatientHeader
        locale={locale}
        onLocaleChange={handleLocaleChange}
        showBack
        backHref="/patient"
        title={t('nav_medicines', locale)}
      />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Progress Tracker Card */}
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-xs text-teal-100 uppercase tracking-wider font-semibold">
                Today&apos;s Adherence
              </p>
              <h2 className="font-display font-bold text-2xl text-white mt-0.5">
                {takenCount} of {totalCount} Taken
              </h2>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <Pill className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${(takenCount / totalCount) * 100}%` }}
            />
          </div>
        </Card>

        {/* Voice Logging Hint */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-navy-900">
                Log with your voice
              </p>
              <p className="font-body text-xs text-gray-600">
                {t('voice_hint', locale)}
              </p>
            </div>
          </div>
        </div>

        {/* Medicines List */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-navy-900">
            Daily Schedule
          </h3>

          {medLogs.map((log) => {
            const med = medicines.find((m) => m.id === log.medicineId);
            if (!med) return null;

            return (
              <MedicineCard
                key={log.id}
                id={med.id}
                name={med.name}
                dose={med.dose}
                time={log.scheduledAt || log.scheduled_at || "08:00 AM"}
                instructions={med.instructions}
                status={log.status}
                isLoading={loadingId === med.id}
                onMarkTaken={handleMarkTaken}
              />
            );
          })}
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
