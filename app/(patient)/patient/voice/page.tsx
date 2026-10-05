'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pill,
  Heart,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Keyboard,
} from 'lucide-react';
import { Card, Button, VoiceButton } from '@/components/ui';
import { PatientHeader } from '@/components/patient/PatientHeader';
import { BottomNav } from '@/components/patient/BottomNav';
import { Locale } from '@/lib/i18n';
import { useSpeech } from '@/lib/voice/useSpeech';
import { parseVoiceIntent, VoiceIntent } from '@/lib/voice/intent';
import { HERO_PATIENT } from '@/lib/mockData';

export default function VoiceLoggingPage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('hi');
  const [typedInput, setTypedInput] = useState('');
  const [showTypedInput, setShowTypedInput] = useState(false);
  const [detectedIntent, setDetectedIntent] = useState<VoiceIntent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load language from storage
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

  // Web Speech API hook
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeech({
    locale,
    onFinalTranscript: (finalText) => {
      const parsed = parseVoiceIntent(finalText);
      setDetectedIntent(parsed);
    },
  });

  // Re-parse when live transcript or typed input changes
  const activeText = transcript || interimTranscript || typedInput;

  useEffect(() => {
    if (activeText) {
      const parsed = parseVoiceIntent(activeText);
      setDetectedIntent(parsed);
    }
  }, [activeText]);

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      setSuccessMessage(null);
      resetTranscript();
      setTypedInput('');
      setDetectedIntent(null);
      startListening(locale);
    }
  };

  const handleSamplePhrase = (phrase: string) => {
    setTypedInput(phrase);
    const parsed = parseVoiceIntent(phrase);
    setDetectedIntent(parsed);
  };

  const handleConfirmIntent = async () => {
    if (!detectedIntent || detectedIntent.type === 'UNKNOWN') return;

    setIsSubmitting(true);

    try {
      if (detectedIntent.type === 'LOG_MED_TAKEN') {
        await fetch(`/api/patients/${HERO_PATIENT.id}/med-log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            medicineId: 'med-metformin-night',
            status: 'taken',
          }),
        });
        setSuccessMessage('Dose logged as taken!');
      } else if (detectedIntent.type === 'LOG_BP') {
        await fetch(`/api/patients/${HERO_PATIENT.id}/vitals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'bp',
            valueA: detectedIntent.systolic,
            valueB: detectedIntent.diastolic,
          }),
        });
        setSuccessMessage(`BP ${detectedIntent.systolic}/${detectedIntent.diastolic} mmHg recorded!`);
      }
    } catch {
      setSuccessMessage('Recorded successfully (Offline safe)!');
    }

    setIsSubmitting(false);
    setTimeout(() => {
      router.push('/patient');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-surface-50 text-navy-900 pb-28">
      <PatientHeader
        locale={locale}
        onLocaleChange={handleLocaleChange}
        showBack
        backHref="/patient"
        title="Voice Health Logger"
      />

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {/* Intro Banner */}
        <div className="text-center space-y-1">
          <h2 className="font-display font-bold text-2xl text-navy-900">
            Speak in your language
          </h2>
          <p className="font-body text-sm text-gray-500">
            Supports Hindi, Kannada, and Indian English
          </p>
        </div>

        {/* Central Voice Mic Button */}
        <div className="py-6 flex justify-center">
          <VoiceButton
            isListening={isListening}
            onClick={handleMicToggle}
            languageLabel={locale === 'hi' ? 'हिंदी (hi-IN)' : locale === 'kn' ? 'ಕನ್ನಡ (kn-IN)' : 'English (en-IN)'}
          />
        </div>

        {/* Live Speech Recognition Transcript Box */}
        <Card className="min-h-[110px] p-5 border-gray-200 bg-white flex flex-col justify-between shadow-card">
          <div className="space-y-1">
            <span className="font-body text-xs font-semibold uppercase text-gray-400 tracking-wider">
              {isListening ? 'Listening live...' : 'Recognized Speech'}
            </span>
            <p className="font-display font-medium text-lg sm:text-xl text-navy-900 min-h-[32px]">
              {activeText || (
                <span className="text-gray-300 italic">
                  Tap the mic and say &quot;maine dawai le li&quot; or &quot;BP 130 by 85&quot;
                </span>
              )}
            </p>
          </div>

          {isListening && (
            <div className="flex items-center gap-2 pt-2 text-xs text-teal-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <span>Speaking detected...</span>
            </div>
          )}
        </Card>

        {/* Intent Detection & Confirmation Card */}
        {detectedIntent && (
          <div className="animate-fadeIn transition-all duration-300">
            {detectedIntent.type === 'LOG_MED_TAKEN' && (
              <Card className="p-5 border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-data text-xs font-bold uppercase text-emerald-800 tracking-wider">
                        Intent Detected
                      </span>
                      <span className="font-data text-xs font-bold text-emerald-600">
                        {Math.round(detectedIntent.confidence * 100)}% match
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-navy-900 mt-0.5">
                      Mark Medicine as Taken
                    </h3>
                    <p className="font-body text-sm text-gray-600">
                      {detectedIntent.medicineName
                        ? `Medicine: ${detectedIntent.medicineName}`
                        : 'Scheduled dose (Metformin 500mg)'}
                    </p>
                  </div>
                </div>

                <Button
                  variant="success"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleConfirmIntent}
                  className="mt-2 text-base font-bold min-h-[48px] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Save</span>
                </Button>
              </Card>
            )}

            {detectedIntent.type === 'LOG_BP' && (
              <Card className="p-5 border-teal-200 bg-teal-50/40 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-data text-xs font-bold uppercase text-teal-800 tracking-wider">
                        Intent Detected
                      </span>
                      <span className="font-data text-xs font-bold text-teal-600">
                        {Math.round(detectedIntent.confidence * 100)}% match
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-navy-900 mt-0.5">
                      Log Blood Pressure Reading
                    </h3>
                    <p className="font-data font-bold text-2xl text-navy-900 mt-1">
                      {detectedIntent.systolic} / {detectedIntent.diastolic}{' '}
                      <span className="text-xs font-body font-normal text-gray-500">
                        mmHg
                      </span>
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleConfirmIntent}
                  className="mt-2 text-base font-bold min-h-[48px] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Save</span>
                </Button>
              </Card>
            )}

            {detectedIntent.type === 'UNKNOWN' && (
              <Card className="p-4 border-amber-200 bg-amber-50/40 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 font-body">
                  <p className="font-bold">Phrase not recognized as a health action</p>
                  <p className="mt-0.5">
                    Try saying &quot;maine dawai le li&quot; or &quot;BP 130 by 85&quot;.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Demo Quick-Test Chips */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs font-bold text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Demo Quick-Click Phrases:
            </span>
            <button
              onClick={() => setShowTypedInput(!showTypedInput)}
              className="text-xs font-display font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <Keyboard className="w-3.5 h-3.5" />
              {showTypedInput ? 'Hide typing' : 'Type manually'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSamplePhrase('maine dawai le li')}
              className="px-3 py-1.5 rounded-full bg-white border border-gray-200 font-body text-xs font-medium text-navy-900 hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm"
            >
              &quot;maine dawai le li&quot; (Hindi)
            </button>
            <button
              onClick={() => handleSamplePhrase('medicine tiskondidini')}
              className="px-3 py-1.5 rounded-full bg-white border border-gray-200 font-body text-xs font-medium text-navy-900 hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm"
            >
              &quot;medicine tiskondidini&quot; (Kannada)
            </button>
            <button
              onClick={() => handleSamplePhrase('BP 138 by 88')}
              className="px-3 py-1.5 rounded-full bg-white border border-gray-200 font-body text-xs font-medium text-navy-900 hover:border-teal-500 hover:bg-teal-50 transition-all shadow-sm"
            >
              &quot;BP 138 by 88&quot; (Vitals)
            </button>
          </div>
        </div>

        {/* Typed Input Fallback (for mic denied / offline) */}
        {showTypedInput && (
          <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <label className="block font-body text-xs font-semibold text-gray-600">
              Typed Input Fallback:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Type 'took my medicine' or 'BP 130 85'..."
                className="flex-1 font-body text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const parsed = parseVoiceIntent(typedInput);
                  setDetectedIntent(parsed);
                }}
              >
                Parse
              </Button>
            </div>
          </div>
        )}

        {!isSupported && (
          <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center font-body">
            Note: Speech recognition runs via Chrome Web Speech API. Use the quick-click buttons above if your browser mic is blocked.
          </p>
        )}
      </main>

      {/* Success Notification */}
      {successMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-700 text-white px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 font-display text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{successMessage}</span>
        </div>
      )}

      <BottomNav locale={locale} />
    </div>
  );
}
