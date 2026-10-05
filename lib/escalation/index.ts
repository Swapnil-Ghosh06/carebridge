import { store } from "@/lib/supabase/localStore";
import { Alert } from "@/lib/types";

export interface EscalationResult {
  fired: Alert[];
  pendingCount: number;
}

export function tickEscalation(forceStage?: "reminder" | "family" | "doctor"): EscalationResult {
  const fired = store.processEscalationTick(forceStage);
  const pendingCount = Object.keys(store.getState().missedDoseEscalations).length;

  return {
    fired,
    pendingCount,
  };
}
