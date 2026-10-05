import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { type, valueA, valueB } = body;

    if (!type || typeof valueA !== 'number') {
      return NextResponse.json(
        { error: 'type and numeric valueA are required' },
        { status: 400 }
      );
    }

    const vitalEntry = {
      id: `vital-${Date.now()}`,
      patientId: params.id,
      type,
      valueA,
      valueB: valueB ?? null,
      recordedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      vital: vitalEntry,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process vitals' },
      { status: 500 }
    );
  }
}
