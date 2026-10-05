import { NextResponse } from 'next/server';
import { INITIAL_FAMILY_FEED } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(INITIAL_FAMILY_FEED);
}
