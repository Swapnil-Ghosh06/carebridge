import { NextRequest, NextResponse } from "next/server";
import { generateBrief } from "@/lib/ai/brief";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const brief = await generateBrief(patientId);
    return NextResponse.json(brief);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to generate pre-consult brief" },
      { status: 500 }
    );
  }
}
