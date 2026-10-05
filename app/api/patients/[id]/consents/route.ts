import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_CONSENTS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(INITIAL_CONSENTS);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, granted } = body;

    if (!category || typeof granted !== 'boolean') {
      return NextResponse.json(
        { error: 'category and granted boolean are required' },
        { status: 400 }
      );
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
