import { NextRequest, NextResponse } from "next/server";
import { MOCK_PATIENT_DETAILS } from "@/lib/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const detail = MOCK_PATIENT_DETAILS[patientId];
  return NextResponse.json(detail?.consents || []);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return NextResponse.json({
    category: body.category,
    granted: body.granted,
  });
}
