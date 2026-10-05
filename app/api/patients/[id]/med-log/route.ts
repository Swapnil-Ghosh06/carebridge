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
    const { medicineId, status } = body;

    if (!medicineId || !status || (status !== "taken" && status !== "missed")) {
      return NextResponse.json(
        { error: "Valid medicineId and status ('taken' | 'missed') are required." },
        { status: 400 }
      );
    }

    const result = store.logMedicine(patientId, medicineId, status);

    return NextResponse.json({
      success: true,
      log: result.log,
      risk: result.risk,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to log medication" },
      { status: 500 }
    );
  }
}
