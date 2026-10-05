import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/supabase/localStore";
import { MOCK_AUDIT_LOGS } from "@/lib/mockData";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const auditLogs = store.getAuditLog(patientId);
    if (auditLogs && auditLogs.length > 0) {
      return NextResponse.json(auditLogs);
    }
    const filtered = MOCK_AUDIT_LOGS.filter(
      (l) => l.patient_id === patientId || l.patientId === patientId || patientId === 'p1' || patientId === 'patient-ramesh'
    );
    return NextResponse.json(filtered.length > 0 ? filtered : MOCK_AUDIT_LOGS);
  } catch {
    return NextResponse.json(MOCK_AUDIT_LOGS);
  }
}
