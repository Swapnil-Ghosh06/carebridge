import { NextRequest, NextResponse } from "next/server";
import { MOCK_PATIENT_DETAILS, INITIAL_CONSENTS } from "@/lib/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const detail = MOCK_PATIENT_DETAILS[patientId];
  return NextResponse.json(detail?.consents || INITIAL_CONSENTS);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { category, granted } = body;

    if (!category || typeof granted !== 'boolean') {
      return NextResponse.json(
        { error: 'category and granted boolean are required' },
        { status: 400 }
      );
    }

    const patientId = params.id;
    const detail = MOCK_PATIENT_DETAILS[patientId];
    if (detail && detail.consents) {
      const target = detail.consents.find((c) => c.category === category);
      if (target) target.granted = granted;
    }

    return NextResponse.json({
      success: true,
      category,
      granted,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update consent' },
      { status: 500 }
    );
  }
}
