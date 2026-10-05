import { NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = store.getPatientsList();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}
