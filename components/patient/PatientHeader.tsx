'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ChevronLeft, Shield } from 'lucide-react';
import { Locale } from '@/lib/i18n';

export interface PatientHeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  showBack?: boolean;
  backHref?: string;
  title?: string;
}

export function PatientHeader({
  locale,
  onLocaleChange,
  showBack = false,
  backHref = '/patient',
  title,
}: PatientHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link
              href={backHref}
              className="p-2 -ml-2 rounded-xl text-navy-900 hover:bg-gray-100 flex items-center min-h-[44px] min-w-[44px]"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-teal-600 tracking-tight">
                CareBridge
              </span>
            </Link>
          )}

          {title && (
            <h1 className="font-display font-bold text-lg text-navy-900 line-clamp-1">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-gray-100/80 p-0.5 rounded-full border border-gray-200">
            <button
              onClick={() => onLocaleChange('en')}
              className={`px-2.5 py-1 text-xs font-display font-bold rounded-full transition-all ${
                locale === 'en'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-navy-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLocaleChange('hi')}
              className={`px-2.5 py-1 text-xs font-display font-bold rounded-full transition-all ${
                locale === 'hi'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-navy-900'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLocaleChange('kn')}
              className={`px-2.5 py-1 text-xs font-display font-bold rounded-full transition-all ${
                locale === 'kn'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-navy-900'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Privacy & Consent Settings (P5) */}
          <Link
            href="/patient/consent"
            title="Privacy & Consent Settings"
            className="p-2 rounded-full bg-gray-50 text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-colors flex items-center justify-center min-h-[40px] min-w-[40px]"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Quick Clinic Contact */}
          <a
            href="tel:+918023456789"
            title="Call Sunrise Clinic"
            className="p-2 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors flex items-center justify-center min-h-[40px] min-w-[40px]"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
