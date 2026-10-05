import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const url = new URL(request.url);
  const actor = url.searchParams.get("actor") === "patient" ? "patient" : "doctor";

  const detail = store.getPatientDetail(patientId, actor);

  if (!detail) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json(detail);
}
