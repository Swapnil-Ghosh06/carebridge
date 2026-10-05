import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const body = await request.json();
    const { type, valueA, valueB } = body;

    if (!type || typeof valueA !== "number" || !["bp", "steps", "glucose"].includes(type)) {
      return NextResponse.json(
        { error: "Valid type ('bp' | 'steps' | 'glucose') and numeric valueA are required." },
        { status: 400 }
      );
    }

    const result = store.logVital(patientId, type, valueA, valueB ?? null);

    return NextResponse.json({
      success: true,
      vital: result.vital,
      risk: result.risk,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to log vitals" },
      { status: 500 }
    );
  }
}
