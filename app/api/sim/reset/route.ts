import { NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    store.reset();

    // If Supabase is connected, clean generated records for seed patients
    try {
      const supabase = await createClient();
      if (supabase && typeof supabase.from === "function") {
        const seedIds = ["p1", "p2", "p3"];
        await supabase.from("doctor_notes").delete().in("patient_id", seedIds);
        await supabase.from("patient_goals").delete().in("patient_id", seedIds);
        await supabase.from("briefs").delete().in("patient_id", seedIds);
      }
    } catch {
      // Local/offline mode
    }

    return NextResponse.json({
      success: true,
      message: "CareBridge state reset successfully to baseline demo seed.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to reset simulation state" },
      { status: 500 }
    );
  }
}
