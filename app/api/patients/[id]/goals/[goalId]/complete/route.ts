import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string; goalId: string }> }
) {
  try {
    const params = await context.params;
    const { id: patientId, goalId } = params;

    if (!goalId) {
      return NextResponse.json({ error: "Goal ID is required" }, { status: 400 });
    }

    const completedAt = new Date().toISOString();

    // 1. Update in local store
    const localResult = store.completePatientGoal(patientId, goalId);

    // 2. Update in Supabase if online
    try {
      const supabase = await createClient();
      if (supabase && typeof supabase.from === "function") {
        await supabase
          .from("patient_goals")
          .update({ completed_at: completedAt })
          .eq("id", goalId)
          .eq("patient_id", patientId);
      }
    } catch {
      // Local mode
    }

    return NextResponse.json({
      completedAt: localResult?.completedAt || completedAt,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to mark goal complete" },
      { status: 500 }
    );
  }
}
