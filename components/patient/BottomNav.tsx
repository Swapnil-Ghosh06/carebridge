'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Pill, Mic, Activity, Users } from 'lucide-react';
import { Locale, t } from '@/lib/i18n';

export interface BottomNavProps {
  locale?: Locale;
}

export function BottomNav({ locale = 'en' }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/patient',
      label: t('nav_home', locale),
      icon: Home,
    },
    {
      href: '/patient/medicines',
      label: t('nav_medicines', locale),
      icon: Pill,
    },
    {
      href: '/patient/voice',
      label: t('nav_voice', locale),
      icon: Mic,
      isSpecial: true,
    },
    {
      href: '/patient/vitals',
      label: t('nav_vitals', locale),
      icon: Activity,
    },
    {
      href: '/family',
      label: t('nav_family', locale),
      icon: Users,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-ink-900 shadow-[0px_-2px_0px_#121214] h-[72px]">
      <div className="max-w-md mx-auto h-full px-3 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[56px] px-1 py-1 rounded-xl transition-all duration-150 select-none ${
                item.isSpecial
                  ? 'text-ink-900'
                  : isActive
                  ? 'text-ink-900 font-bold'
                  : 'text-ink-500 hover:text-ink-900 font-medium'
              }`}
            >
              <div
                className={`relative flex items-center justify-center ${
                  item.isSpecial
                    ? 'w-11 h-11 -mt-5 rounded-full bg-[#FF5C98] border-2 border-ink-900 text-ink-900 shadow-[2px_2px_0px_#121214] active:translate-y-0.5'
                    : isActive
                    ? 'w-8 h-8 rounded-full bg-[#D4F77C] border border-ink-900 flex items-center justify-center shadow-[1px_1px_0px_#121214]'
                    : ''
                }`}
              >
                <Icon
                  className={`${item.isSpecial ? 'w-5 h-5 text-white' : 'w-5 h-5'} ${
                    isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span className={`font-mono text-[10px] mt-1 tracking-tight ${item.isSpecial ? 'font-bold text-ink-900' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
