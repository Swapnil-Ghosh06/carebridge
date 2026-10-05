import { NextRequest, NextResponse } from "next/server";
import { MOCK_PATIENT_DETAILS } from "@/lib/mockData";
import { generateFhirR4Bundle } from "@/lib/fhir/export";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const patientId = params.id;
  const detail = MOCK_PATIENT_DETAILS[patientId];

  if (!detail) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const bundle = generateFhirR4Bundle(detail);
  return NextResponse.json(bundle);
}
