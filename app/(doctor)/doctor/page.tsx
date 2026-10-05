export default function DoctorPage() {
  return (
    <main className="min-h-screen bg-[var(--surface-50)] flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="font-display font-bold text-3xl text-[var(--ink-900)] mb-2">
          Doctor Portal
        </h1>
        <p className="font-body text-[var(--ink-500)]">
          Aman is building this in Phase 1.
        </p>
        <p className="font-body text-xs text-[var(--ink-300)] mt-4">
          Decision support only. Not a diagnosis. Simulated data.
        </p>
      </div>
    </main>
  );
}
