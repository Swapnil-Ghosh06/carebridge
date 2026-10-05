import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { INITIAL_CONSENTS } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const patientId = params.id;
    const consents = store.getConsents(patientId);
    if (consents && consents.length > 0) {
      return NextResponse.json(consents);
    }
    return NextResponse.json(INITIAL_CONSENTS);
  } catch {
    return NextResponse.json(INITIAL_CONSENTS);
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
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
