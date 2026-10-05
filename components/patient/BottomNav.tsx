'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Pill, Activity, Users } from 'lucide-react';
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg h-[72px]">
      <div className="max-w-md mx-auto h-full px-3 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] px-2 py-1 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-teal-600 font-bold scale-105'
                  : 'text-gray-500 hover:text-navy-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-600 rounded-full" />
                )}
              </div>
              <span className="font-body text-xs mt-1 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
