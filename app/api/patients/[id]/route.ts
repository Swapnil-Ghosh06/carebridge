import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { MOCK_PATIENT_DETAILS, SEED_MEDICINES } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const rawId = params.id;
  const patientId = rawId === "patient-ramesh" ? "p1" : rawId;
  const url = new URL(request.url);
  const actor = url.searchParams.get("actor") === "patient" ? "patient" : "doctor";

  try {
    const detail = store.getPatientDetail(patientId, actor);
    if (detail) {
      return NextResponse.json(detail);
    }
  } catch {
    // continue to fallback
  }

  // Fallback
  const fallback = MOCK_PATIENT_DETAILS[patientId] || MOCK_PATIENT_DETAILS.p1;
  if (!fallback) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...fallback,
    medicines: SEED_MEDICINES,
  });
}
