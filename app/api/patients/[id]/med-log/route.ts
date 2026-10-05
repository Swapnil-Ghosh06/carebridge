import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { medicineId, status } = body;

    if (!medicineId || !status) {
      return NextResponse.json(
        { error: 'medicineId and status are required' },
        { status: 400 }
      );
    }

    const logEntry = {
      id: `log-${Date.now()}`,
      patientId: params.id,
      medicineId,
      scheduledAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      takenAt: status === 'taken' ? new Date().toISOString() : null,
      status,
    };

    return NextResponse.json({
      success: true,
      log: logEntry,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process med log' },
      { status: 500 }
    );
  }
}
