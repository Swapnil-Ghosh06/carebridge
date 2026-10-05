'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Heart,
  Pill,
  Footprints,
  Activity,
  History,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Card, ConsentToggle } from '@/components/ui';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { BottomNav } from '@/components/patient/BottomNav';
import { Locale } from '@/lib/i18n';
import { INITIAL_CONSENTS, INITIAL_AUDIT_LOGS, HERO_PATIENT } from '@/lib/mockData';

export default function PatientConsentPage() {
  const [locale, setLocale] = useState<Locale>('hi');
  const [consents, setConsents] = useState(INITIAL_CONSENTS);
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);
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

  const handleToggle = async (
    category: 'vitals' | 'medicines' | 'steps' | 'glucose',
    granted: boolean
  ) => {
    // Optimistic UI update
    setConsents((prev) =>
      prev.map((c) => (c.category === category ? { ...c, granted } : c))
    );

    try {
      await fetch(`/api/patients/${HERO_PATIENT.id}/consents`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, granted }),
      });
    } catch {
      // fallback
    }

    setToastMessage(
      granted
        ? `Sharing enabled for ${category}`
        : `Sharing restricted for ${category}`
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vitals':
        return <Heart className="w-5 h-5" />;
      case 'medicines':
        return <Pill className="w-5 h-5" />;
      case 'steps':
        return <Footprints className="w-5 h-5" />;
      case 'glucose':
        return <Activity className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 text-navy-900 pb-28">
      <PatientHeader
        locale={locale}
        onLocaleChange={handleLocaleChange}
        showBack
        backHref="/patient"
        title="Privacy & Consent"
      />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {/* Intro Card */}
        <div className="bg-gradient-to-r from-teal-600 to-navy-900 text-white p-5 rounded-3xl shadow-card space-y-2">
          <div className="flex items-center gap-2 text-teal-300 font-display font-semibold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>You Own Your Health Data</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            Consent Controls (P5)
          </h2>
          <p className="font-body text-sm text-teal-50 leading-relaxed">
            Choose what health categories Dr. Meera Rao (Clinic) and Karan K.
            (Family) can view. You can change these permissions anytime.
          </p>
        </div>

        {/* Consent Category Toggles */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-navy-900">
            Data Sharing Categories
          </h3>

          <div className="space-y-3">
            {consents.map((item) => (
              <ConsentToggle
                key={item.category}
                id={item.category}
                category={item.category}
                title={item.title}
                description={item.description}
                granted={item.granted}
                onToggle={handleToggle}
                icon={getCategoryIcon(item.category)}
              />
            ))}
          </div>
        </div>

        {/* Audit Log / Transparency Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-gray-500" />
            <h3 className="font-display font-bold text-lg text-navy-900">
              Access Audit Log
            </h3>
          </div>

          <Card className="p-4 space-y-3 bg-white border-gray-100 shadow-sm">
            <p className="font-body text-xs text-gray-500">
              Every view by your clinic or family is logged immutably:
            </p>

            <div className="space-y-2.5 divide-y divide-gray-100">
              {auditLogs.map((log) => (
                <div key={log.id} className="pt-2.5 first:pt-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-navy-900">
                      {log.actor}
                    </span>
                    <span className="font-data text-gray-400 text-[11px]">
                      {log.at}
                    </span>
                  </div>
                  <p className="font-body text-xs text-gray-600 mt-0.5">
                    {log.action}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Legal & Decision Support Note */}
        <div className="p-4 rounded-2xl bg-gray-100/80 border border-gray-200 text-xs text-gray-600 space-y-1 font-body">
          <p className="font-bold text-navy-900">Patient Data Rights Notice:</p>
          <p>
            Compliant with DPDP Act standards. All health data is encrypted at
            rest. Doctor decides all clinical protocols.
          </p>
        </div>
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
