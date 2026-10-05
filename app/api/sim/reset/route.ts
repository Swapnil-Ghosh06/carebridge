import { NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    store.reset();
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
