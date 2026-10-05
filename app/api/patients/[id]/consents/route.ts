import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const consents = store.getConsents(patientId);
    return NextResponse.json(consents);
  } catch {
    return NextResponse.json({ error: "Failed to fetch consents" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const body = await request.json();
    const { category, granted } = body;

    if (!category || typeof granted !== "boolean") {
      return NextResponse.json(
        { error: "category and boolean granted are required" },
        { status: 400 }
      );
    }

    const updated = store.updateConsent(patientId, category, granted);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update consent" }, { status: 500 });
  }
}
