import { NextRequest, NextResponse } from "next/server";
import { MOCK_PATIENT_DETAILS } from "@/lib/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const detail = MOCK_PATIENT_DETAILS[patientId];

  if (!detail) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  // Filter based on consents
  const consents = detail.consents || [];
  const consentMap = consents.reduce<Record<string, boolean>>((acc, curr) => {
    acc[curr.category] = curr.granted;
    return acc;
  }, {});

  // If vitals or steps not granted, we can omit or mask them
  const safeVitals = detail.vitals.filter((v) => {
    if (v.type === "steps" && consentMap["steps"] === false) return false;
    if (v.type === "bp" && consentMap["vitals"] === false) return false;
    if (v.type === "glucose" && consentMap["glucose"] === false) return false;
    return true;
  });

  const safeMedLogs = consentMap["medicines"] === false ? [] : detail.medLogs;

  return NextResponse.json({
    ...detail,
    vitals: safeVitals,
    medLogs: safeMedLogs,
  });
}
