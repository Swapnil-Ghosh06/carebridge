import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    // Map family member id (e.g. f1) to patient id (p1) if needed
    const familyMember = store.getState().familyMembers.find((f) => f.id === id);
    const patientId = familyMember ? familyMember.patient_id : id;

    const feed = store.getFamilyFeed(patientId);

    if (!feed) {
      return NextResponse.json({ error: "Family feed not found" }, { status: 404 });
    }

    return NextResponse.json(feed);
  } catch {
    return NextResponse.json({ error: "Failed to fetch family feed" }, { status: 500 });
  }
}
