import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ROLES = [
  {
    id: 'patient',
    label: 'Patient',
    description: 'Log medicines, BP & steps',
    icon: '🧑‍⚕️',
    href: '/patient',
    color: 'bg-teal-50 border-teal-300 hover:bg-teal-100',
    badge: 'Patient App',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'doctor',
    label: 'Doctor',
    description: 'Risk-ranked patient list & AI briefs',
    icon: '👨‍⚕️',
    href: '/doctor',
    color: 'bg-indigo-50 border-indigo-300 hover:bg-indigo-100',
    badge: 'Doctor Portal',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'family',
    label: 'Family',
    description: "Stay updated on your loved one's health",
    icon: '👨‍👩‍👧',
    href: '/family',
    color: 'bg-amber-50 border-amber-300 hover:bg-amber-100',
    badge: 'Family View',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'admin',
    label: 'Admin',
    description: 'ROI panel & hospital impact metrics',
    icon: '📊',
    href: '/admin',
    color: 'bg-rose-50 border-rose-300 hover:bg-rose-100',
    badge: 'Admin Panel',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-4">
          <span className="inline-block bg-teal-100 text-teal-700 text-sm font-body font-semibold px-3 py-1 rounded-full tracking-wide">
            Hackathon Prototype · Simulated Data
          </span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-navy-900 leading-tight max-w-3xl">
          Your phone&apos;s health data,{' '}
          <span className="text-teal-600">in your doctor&apos;s hands.</span>
        </h1>

        <p className="mt-6 font-body text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
          CareBridge turns daily patient data — medicines, BP, steps — into a{' '}
          <strong>risk-ranked action list</strong> for doctors, with family kept
          in the loop.
        </p>

        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-body">
            🌐 Hindi · Kannada · English
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-body">
            🎙️ Voice logging
          </span>
          <span className="text-gray-300">|</span>
          <span className="inline-flex items-center gap-1 text-sm text-gray-500 font-body">
            🤖 AI pre-consult briefs
          </span>
        </div>
      </section>

      {/* Role cards */}
      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <h2 className="font-display font-bold text-center text-xl text-gray-500 mb-8 tracking-wide uppercase text-sm">
          Choose your role to continue
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>

        {/* Sim link */}
        <div className="mt-8 text-center">
          <a
            href="/sim"
            className="text-sm font-body text-gray-400 hover:text-teal-600 underline underline-offset-4 transition-colors"
          >
            🔧 Open simulator panel
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-6 text-center">
        <p className="text-xs font-body text-gray-400">
          Decision support only. Not a diagnosis. All data is simulated.{' '}
          <span className="font-semibold">Team: poweredbycaffine</span>
        </p>
      </footer>
    </main>
  );
}

function RoleCard({
  role,
}: {
  role: (typeof ROLES)[number];
}) {
  return (
    <form action={setRoleAction.bind(null, role.id, role.href)}>
      <button
        type="submit"
        id={`role-card-${role.id}`}
        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer group ${role.color}`}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{role.icon}</span>
          <span
            className={`text-xs font-data font-semibold px-2 py-0.5 rounded-full ${role.badgeColor}`}
          >
            {role.badge}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-gray-900 mb-1">
          {role.label}
        </h3>
        <p className="font-body text-sm text-gray-600 leading-snug">
          {role.description}
        </p>
        <div className="mt-4 flex items-center gap-1 text-teal-700 font-body text-sm font-semibold group-hover:gap-2 transition-all">
          Enter <span>→</span>
        </div>
      </button>
    </form>
  );
}

async function setRoleAction(role: string, href: string) {
  'use server';
  cookies().set('role', role, { path: '/', maxAge: 60 * 60 * 24 });
  redirect(href);
}
