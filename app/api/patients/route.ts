import { NextResponse } from "next/server";
import { MOCK_PATIENT_LIST } from "@/lib/mockData";

export async function GET() {
  // Return sorted by risk score descending
  const sorted = [...MOCK_PATIENT_LIST].sort((a, b) => b.score - a.score);
  return NextResponse.json(sorted);
}
