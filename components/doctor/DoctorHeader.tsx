"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ShieldAlert, BarChart3, Users, Home } from "lucide-react";

interface DoctorHeaderProps {
  urgentCount?: number;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = ({ urgentCount = 1 }) => {
  const pathname = usePathname();

  return (
    <header className="h-16 bg-surface-0 border-b border-ink-300/30 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Brand & Clinic Info */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-pill bg-brand-teal flex items-center justify-center text-white shadow-sm group-hover:bg-brand-teal-600 transition-colors">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-display font-extrabold text-xl text-ink-900 tracking-tight">
            CareBridge
          </span>
        </Link>

        <div className="hidden sm:block h-6 w-px bg-ink-300/40" />

        <div className="hidden md:flex flex-col">
          <span className="font-display font-bold text-sm text-ink-900 leading-tight">
            Dr. Meera Rao
          </span>
          <span className="font-body text-xs text-ink-500">
            Sunrise Clinic • Chronic Care Decision Support
          </span>
        </div>
      </div>

      {/* Urgent Alert Banner & Navigation */}
      <div className="flex items-center gap-4">
        {urgentCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-pill bg-risk-red-bg border border-risk-red/30 text-risk-red text-xs font-data font-bold animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{urgentCount} URGENT PATIENT FLAGGED</span>
          </div>
        )}

        <nav className="flex items-center gap-1">
          <Link
            href="/doctor"
            className={`px-3 py-1.5 rounded-pill text-xs font-display font-semibold transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/doctor")
                ? "bg-surface-100 text-ink-900"
                : "text-ink-700 hover:bg-surface-50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Patients</span>
          </Link>

          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded-pill text-xs font-display font-semibold transition-colors flex items-center gap-1.5 ${
              pathname.startsWith("/admin")
                ? "bg-surface-100 text-ink-900"
                : "text-ink-700 hover:bg-surface-50"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Admin ROI</span>
          </Link>

          <Link
            href="/"
            className="px-3 py-1.5 rounded-pill text-xs font-display font-semibold text-ink-500 hover:bg-surface-100 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Switch Role</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
