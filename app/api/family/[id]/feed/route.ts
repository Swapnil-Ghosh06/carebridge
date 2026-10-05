import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { INITIAL_FAMILY_FEED } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    // Map family member id (e.g. f1) to patient id (p1) if needed
    const familyMember = store.getState().familyMembers.find((f) => f.id === id);
    const patientId = familyMember?.patient_id || familyMember?.patientId || id || 'p1';

    const feed = store.getFamilyFeed(patientId);

    if (!feed) {
      return NextResponse.json(INITIAL_FAMILY_FEED);
    }

    return NextResponse.json(feed);
  } catch {
    return NextResponse.json(INITIAL_FAMILY_FEED);
  }
}
