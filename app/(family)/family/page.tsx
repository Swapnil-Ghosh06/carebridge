'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  Bell,
  Heart,
  Pill,
  Footprints,
  ShieldAlert,
  ChevronLeft,
  RefreshCw,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { Card, RiskBadge, AlertItem } from '@/components/ui';
import { Locale, t } from '@/lib/i18n';
import { INITIAL_FAMILY_FEED, HERO_PATIENT } from '@/lib/mockData';
import { FamilyFeedResponse, Alert } from '@/lib/types';

export default function FamilyFeedPage() {
  const [locale, setLocale] = useState<Locale>('en');
  const [feedData, setFeedData] = useState<FamilyFeedResponse>(INITIAL_FAMILY_FEED);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Poll feed every 3 seconds as specified in ARCHITECTURE.md section 8
  useEffect(() => {
    let isMounted = true;

    const fetchFeed = async () => {
      try {
        const res = await fetch(`/api/family/${HERO_PATIENT.id}/feed`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setFeedData(data);
        }
      } catch {
        // use local feedData on error
      }
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/family/${HERO_PATIENT.id}/feed`);
      if (res.ok) {
        const data = await res.json();
        setFeedData(data);
      }
    } catch {
      // fallback
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleSendReminder = () => {
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      patientId: HERO_PATIENT.id,
      level: 'reminder',
      audience: 'patient',
      message: 'Karan sent a gentle reminder: "Papa, please check if your evening dose is taken."',
      createdAt: 'Just now',
      acknowledgedAt: null,
    };

    setFeedData((prev) => ({
      ...prev,
      alerts: [newAlert, ...prev.alerts],
    }));

    setToastMessage('Reminder sent to father’s phone!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-50 text-navy-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 -ml-2 rounded-xl text-navy-900 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="font-display font-bold text-lg text-navy-900 leading-tight">
                {t('family_feed_title', locale)}
              </h1>
              <p className="font-body text-xs text-gray-500">
                Karan K. • Bengaluru
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualRefresh}
              className={`p-2 rounded-full text-navy-700 hover:bg-gray-100 min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isRefreshing ? 'animate-spin text-teal-600' : ''
              }`}
              title="Refresh live status"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex bg-gray-100 p-0.5 rounded-full border border-gray-200 text-xs">
              <button
                onClick={() => setLocale('en')}
                className={`px-2 py-0.5 rounded-full font-bold ${
                  locale === 'en' ? 'bg-teal-600 text-white' : 'text-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('hi')}
                className={`px-2 py-0.5 rounded-full font-bold ${
                  locale === 'hi' ? 'bg-teal-600 text-white' : 'text-gray-600'
                }`}
              >
                HI
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* Patient Status Overview Card (F1) */}
        <Card className="p-6 border-indigo-100 shadow-card bg-gradient-to-b from-white to-indigo-50/20">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-display font-bold text-xl flex items-center justify-center shadow-sm">
                RK
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-navy-900 leading-tight">
                  {feedData.patient.name}
                </h2>
                <p className="font-body text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                  Active {feedData.patient.lastSeen} • 62 yrs
                </p>
              </div>
            </div>

            {/* Risk Badge with band and score */}
            <RiskBadge
              band={feedData.patient.band}
              score={feedData.patient.score}
              size="md"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-gray-100 text-center">
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-teal-600 mb-0.5">
                <Pill className="w-4 h-4" />
                <span className="font-body text-[11px] font-semibold text-gray-500">Meds</span>
              </div>
              <p className="font-data font-bold text-lg text-navy-900">
                {feedData.today.medicinesTaken}/{feedData.today.medicinesTotal}
              </p>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-amber-600 mb-0.5">
                <Heart className="w-4 h-4" />
                <span className="font-body text-[11px] font-semibold text-gray-500">BP</span>
              </div>
              <p className="font-data font-bold text-sm text-navy-900 truncate">
                {feedData.today.latestBp ? feedData.today.latestBp.split(' ')[0] : '138/88'}
              </p>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-indigo-600 mb-0.5">
                <Footprints className="w-4 h-4" />
                <span className="font-body text-[11px] font-semibold text-gray-500">Steps</span>
              </div>
              <p className="font-data font-bold text-lg text-navy-900">
                {feedData.today.latestSteps.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Direct Communication Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <a
              href="tel:+919876543210"
              className="min-h-[48px] px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{t('call_father', locale)}</span>
            </a>

            <button
              onClick={handleSendReminder}
              className="min-h-[48px] px-4 py-2.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-display font-bold text-sm flex items-center justify-center gap-2 border border-indigo-200 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t('send_nudge', locale)}</span>
            </button>
          </div>
        </Card>

        {/* Escalation Ladder & Alert Feed (F2) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-teal-600" />
              <h3 className="font-display font-bold text-lg text-navy-900">
                Care Timeline & Escalation
              </h3>
            </div>
            <span className="font-data text-xs text-gray-400">
              Auto-syncs 3s
            </span>
          </div>

          {/* Visual 3-Stage Escalation Ladder */}
          <Card className="p-4 bg-white border-gray-100 shadow-sm">
            <p className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Escalation Protocol Progress
            </p>
            <div className="grid grid-cols-3 gap-2 text-center relative">
              {/* Step 1: Patient */}
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-data text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                  Stage 1 (T+0)
                </span>
                <span className="font-display font-bold text-xs text-navy-900 block mt-0.5">
                  Patient Ping
                </span>
                <span className="text-[10px] text-gray-500 font-body block mt-0.5">
                  Gentle reminder
                </span>
              </div>

              {/* Step 2: Family */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 ring-2 ring-amber-400/50">
                <span className="font-data text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                  Stage 2 (Active)
                </span>
                <span className="font-display font-bold text-xs text-navy-900 block mt-0.5">
                  Family Loop
                </span>
                <span className="text-[10px] text-gray-500 font-body block mt-0.5">
                  Karan notified
                </span>
              </div>

              {/* Step 3: Doctor */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 opacity-70">
                <span className="font-data text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Stage 3 (+25s)
                </span>
                <span className="font-display font-bold text-xs text-navy-900 block mt-0.5">
                  Clinic Alert
                </span>
                <span className="text-[10px] text-gray-500 font-body block mt-0.5">
                  Dr. Rao briefed
                </span>
              </div>
            </div>
          </Card>

          {/* Alert Feed Items */}
          <div className="space-y-3">
            {feedData.alerts.length > 0 ? (
              feedData.alerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  id={alert.id}
                  level={alert.level}
                  audience={alert.audience}
                  message={alert.message}
                  createdAt={alert.createdAt || alert.created_at || 'Just now'}
                  acknowledgedAt={alert.acknowledgedAt}
                />
              ))
            ) : (
              <Card className="text-center py-6 text-gray-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                <p className="font-body text-sm font-medium">
                  {t('all_normal', locale)}
                </p>
              </Card>
            )}
          </div>
        </section>

        {/* Clinic Escalation Protocol Note */}
        <Card className="bg-amber-50/60 border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed font-body">
              <span className="font-bold">Escalation Protocol Active:</span> If
              evening medicines or abnormal vitals are unattended, family gets
              notified first, followed by pre-consult briefing to Dr. Meera Rao
              at Sunrise Clinic.
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <p className="font-body text-xs text-gray-400 text-center">
          {t('decision_support_note', locale)}
        </p>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy-900 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-display text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
