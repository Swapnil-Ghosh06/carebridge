import { NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const roi = store.getAdminROI();
    return NextResponse.json(roi);
  } catch {
    return NextResponse.json({ error: "Failed to compute admin ROI" }, { status: 500 });
  }
}
