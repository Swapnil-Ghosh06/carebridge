import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 text-ink-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-surface-0 rounded-2xl p-8 border border-ink-300/40 shadow-card space-y-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-risk-amber-bg flex items-center justify-center text-risk-amber">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-display text-ink-900">
            Page Not Found
          </h1>
          <p className="text-sm font-body text-ink-500">
            The page you requested could not be found or the route is still compiling.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" className="w-full">
              Return to CareBridge Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
