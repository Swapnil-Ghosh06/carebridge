import { NextRequest, NextResponse } from "next/server";
import { MOCK_PATIENT_DETAILS } from "@/lib/mockData";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const detail = MOCK_PATIENT_DETAILS[patientId];

  if (!detail) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  // Pre-consult brief adhering strictly to PRD Section 6 & ARCHITECTURE Section 6
  if (patientId === "p1") {
    return NextResponse.json({
      source: "fallback",
      text: "Since last visit: Adherence dropped to 65% with 2 consecutive missed morning Metformin doses. Concerns: Systolic BP increased by 14% to 154 mmHg; daily steps dropped 46%. Suggested checks: Confirm morning routine adherence, evaluate potential medication side effects, check for ankle edema, and verify home BP monitor calibration. Doctor decides.",
      sections: {
        sinceLastVisit:
          "Adherence dropped to 65% over the past 4 days, with 2 consecutive missed morning doses of Metformin 500mg.",
        concerns:
          "Systolic BP trended up +14% (latest 154/94 mmHg). Average daily physical activity fell from 5,200 to 2,800 steps.",
        suggestedChecks:
          "Verify patient morning medication routine, evaluate potential GI or orthostatic side effects, assess ankle edema, and verify cuff placement accuracy.",
      },
    });
  }

  if (patientId === "p2") {
    return NextResponse.json({
      source: "fallback",
      text: "Since last visit: 78% adherence over last 7 days. Concerns: Diastolic BP fluctuating upwards to 89 mmHg. Suggested checks: Review sodium intake and work-stress routine. Doctor decides.",
      sections: {
        sinceLastVisit:
          "Adherence maintained at 78% with occasional late evening medication logging.",
        concerns:
          "Diastolic BP fluctuating upwards between 85-89 mmHg across 5 consecutive readings.",
        suggestedChecks:
          "Check dietary sodium adherence, inquire about sleep regularity and stress factors.",
      },
    });
  }

  return NextResponse.json({
    source: "fallback",
    text: "Since last visit: Stable vitals and adherence. Concerns: None observed. Suggested checks: Routine annual diabetes screening. Doctor decides.",
    sections: {
      sinceLastVisit:
        "100% medication adherence recorded over the past 14 days.",
      concerns:
        "No risk elevations detected. Mean blood pressure stable at 120/78 mmHg.",
      suggestedChecks:
        "Maintain current lifestyle regimen. Schedule routine 3-month HbA1c check.",
    },
  });
}
