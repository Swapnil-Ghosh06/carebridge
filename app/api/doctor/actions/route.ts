import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, type, note } = body;

    if (!patientId || !type || !["call", "message", "teleconsult"].includes(type)) {
      return NextResponse.json(
        { error: "patientId and valid type ('call' | 'message' | 'teleconsult') are required." },
        { status: 400 }
      );
    }

    const response = store.recordDoctorAction(patientId, type, note);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process doctor action" },
      { status: 500 }
    );
  }
}
