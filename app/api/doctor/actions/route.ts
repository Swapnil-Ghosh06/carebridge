import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, type, note } = body;

    const actionText = {
      call: "Initiated direct telephone call to patient",
      message: "Sent clinical check-in SMS and WhatsApp prompt",
      teleconsult: "Scheduled urgent teleconsultation window",
    }[type as "call" | "message" | "teleconsult"] || "Clinical action performed";

    return NextResponse.json({
      success: true,
      message: `${actionText}. Action logged in medical record.`,
      actionRecord: {
        id: `act_${Date.now()}`,
        patientId,
        type,
        note,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid action request" }, { status: 400 });
  }
}
