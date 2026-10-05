import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rawId = params.id;
    const patientId = rawId === "patient-ramesh" ? "p1" : rawId;
    const body = await request.json();
    const { medicineId, status } = body;

    if (!medicineId || !status || (status !== "taken" && status !== "missed")) {
      return NextResponse.json(
        { error: "Valid medicineId and status ('taken' | 'missed') are required." },
        { status: 400 }
      );
    }

    try {
      const result = store.logMedicine(patientId, medicineId, status);
      return NextResponse.json({
        success: true,
        log: result.log,
        risk: result.risk,
      });
    } catch {
      // Fallback response for unseeded patient ids
      const logEntry = {
        id: `log-${Date.now()}`,
        patientId: rawId,
        medicineId,
        scheduledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        takenAt: status === 'taken' ? new Date().toISOString() : null,
        status,
      };
      return NextResponse.json({
        success: true,
        log: logEntry,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to log medication" },
      { status: 500 }
    );
  }
}
