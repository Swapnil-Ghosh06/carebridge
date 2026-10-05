import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { MOCK_PATIENT_DETAILS, SEED_MEDICINES } from "@/lib/mockData";
import { buildWearableContext } from "@/lib/wearable";
import { createClient } from "@/lib/supabase/server";

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

  let detail = null;
  try {
    detail = store.getPatientDetail(patientId, actor);
  } catch {
    // continue to fallback
  }

  if (!detail) {
    const fallback = MOCK_PATIENT_DETAILS[patientId] || MOCK_PATIENT_DETAILS.p1;
    if (!fallback) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    detail = {
      ...fallback,
      medicines: SEED_MEDICINES,
    };
  }

  let supabase: any = null;
  try {
    supabase = await createClient();
  } catch {
    // offline or local
  }

  const wearable = await buildWearableContext(patientId, supabase).catch(() => null);

  return NextResponse.json({
    ...detail,
    wearable,
  });
}
