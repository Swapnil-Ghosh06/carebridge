import React from "react";
import Link from "next/link";
import { Activity, Users, ArrowLeft, BarChart3 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-50">
      {/* 64px Top Header */}
      <header className="h-16 bg-surface-0 border-b border-ink-300/30 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
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

          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-ink-900">
              Hospital Admin & Clinic ROI Portal
            </span>
            <span className="font-data text-xs px-2 py-0.5 rounded-pill bg-brand-indigo/10 text-brand-indigo font-semibold">
              Sunrise Clinic
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/doctor"
            className="px-3.5 py-1.5 rounded-pill text-xs font-display font-semibold bg-surface-100 hover:bg-surface-0 border border-ink-300/30 text-ink-900 transition-colors flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-brand-teal" />
            <span>Doctor Dashboard</span>
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-display font-semibold text-ink-500 hover:text-ink-900 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-10 bg-surface-0 border-t border-ink-300/30 px-6 flex items-center justify-between text-xs font-data text-ink-500">
        <span>Decision support & clinical operations analytics • Sunrise Healthcare System</span>
        <span>Simulated data</span>
      </footer>
    </div>
  );
}
