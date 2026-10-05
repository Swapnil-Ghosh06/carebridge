'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ChevronLeft, Shield } from 'lucide-react';
import { Locale } from '@/lib/i18n';
import { CareBridgeLogo } from '@/components/ui';

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
    <header className="sticky top-0 z-40 w-full bg-white border-b-2 border-ink-900 px-3.5 sm:px-4 py-2.5 shadow-[0px_2px_0px_#121214]">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {showBack ? (
            <Link
              href={backHref}
              className="p-2 -ml-2 rounded-xl text-ink-900 hover:bg-[#FAF8F5] flex items-center min-h-[44px] min-w-[44px]"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </Link>
          ) : (
            <CareBridgeLogo size="sm" />
          )}

          {title && (
            <h1 className="font-display font-bold text-base text-ink-900 line-clamp-1 ml-1">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#FAF8F5] p-0.5 rounded-full border-2 border-ink-900 shadow-[1.5px_1.5px_0px_#121214]">
            <button
              onClick={() => onLocaleChange('en')}
              className={`px-2.5 py-1 text-xs font-data font-bold rounded-full transition-all cursor-pointer ${
                locale === 'en'
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLocaleChange('hi')}
              className={`px-2.5 py-1 text-xs font-data font-bold rounded-full transition-all cursor-pointer ${
                locale === 'hi'
                  ? 'bg-[#D4F77C] text-ink-900 border border-ink-900'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLocaleChange('kn')}
              className={`px-2.5 py-1 text-xs font-data font-bold rounded-full transition-all cursor-pointer ${
                locale === 'kn'
                  ? 'bg-[#D4F77C] text-ink-900 border border-ink-900'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Privacy & Consent Settings */}
          <Link
            href="/patient/consent"
            title="Privacy & Consent Settings"
            className="p-2 rounded-full bg-white border-2 border-ink-900 text-ink-900 hover:bg-[#FAF8F5] shadow-[1.5px_1.5px_0px_#121214] active:translate-y-0.5 transition flex items-center justify-center min-h-[38px] min-w-[38px]"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Quick Clinic Contact */}
          <a
            href="tel:+918023456789"
            title="Call Sunrise Clinic"
            className="p-2 rounded-full bg-[#D4F77C] border-2 border-ink-900 text-ink-900 hover:bg-[#CEF267] shadow-[1.5px_1.5px_0px_#121214] active:translate-y-0.5 transition flex items-center justify-center min-h-[38px] min-w-[38px]"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
