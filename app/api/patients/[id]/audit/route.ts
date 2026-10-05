import { NextRequest, NextResponse } from "next/server";
import { MOCK_AUDIT_LOGS } from "@/lib/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const filtered = MOCK_AUDIT_LOGS.filter((l) => l.patient_id === patientId);
  return NextResponse.json(filtered);
}
