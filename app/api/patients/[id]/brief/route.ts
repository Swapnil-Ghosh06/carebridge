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

  // Pre-consult brief with grounded evidence citations
  if (patientId === "p1") {
    return NextResponse.json({
      source: "fallback",
      text: "Since last visit: Adherence dropped to 65% with 2 consecutive missed morning Metformin doses [Log: m1, m4]. Concerns: Systolic BP increased by 14% to 154/94 mmHg [Obs: v7]; daily steps dropped 46% to 2,800 [Obs: v14]. Suggested checks: Confirm morning routine adherence, evaluate potential medication side effects, check for ankle edema, and verify home BP monitor calibration. Doctor decides.",
      sections: {
        sinceLastVisit:
          "Adherence dropped to 65% over the past 4 days, with 2 consecutive missed morning doses of Metformin 500mg [Log: m1, m4].",
        concerns:
          "Systolic BP trended up +14% to 154/94 mmHg [Obs: v7]. Average daily physical activity fell from 5,200 to 2,800 steps [Obs: v14].",
        suggestedChecks:
          "Verify patient morning medication routine, evaluate potential GI or orthostatic side effects, assess ankle edema, and verify cuff placement accuracy.",
      },
      citations: [
        {
          id: "v7",
          type: "Blood Pressure",
          label: "BP Reading #v7",
          value: "154/94 mmHg",
          timestamp: "Today, 08:30 AM",
          flag: "HIGH (+14%)",
        },
        {
          id: "v14",
          type: "Pedometer",
          label: "Steps Activity #v14",
          value: "2,800 steps",
          timestamp: "Today",
          flag: "DECREASED (-46%)",
        },
        {
          id: "m1",
          type: "Medication Log",
          label: "Dose Log #m1",
          value: "Metformin 500mg (Missed)",
          timestamp: "Today, 08:00 AM",
          flag: "UNCONFIRMED",
        },
        {
          id: "m4",
          type: "Medication Log",
          label: "Dose Log #m4",
          value: "Metformin 500mg (Missed)",
          timestamp: "Yesterday, 08:00 AM",
          flag: "STREAK",
        },
      ],
    });
  }

  if (patientId === "p2") {
    return NextResponse.json({
      source: "fallback",
      text: "Since last visit: 78% adherence over last 7 days. Concerns: Diastolic BP fluctuating upwards to 89 mmHg [Obs: v24]. Suggested checks: Review sodium intake and work-stress routine. Doctor decides.",
      sections: {
        sinceLastVisit:
          "Adherence maintained at 78% with occasional late evening medication logging.",
        concerns:
          "Diastolic BP fluctuating upwards between 85-89 mmHg across 5 consecutive readings [Obs: v24].",
        suggestedChecks:
          "Check dietary sodium adherence, inquire about sleep regularity and stress factors.",
      },
      citations: [
        {
          id: "v24",
          type: "Blood Pressure",
          label: "BP Reading #v24",
          value: "139/89 mmHg",
          timestamp: "Today, 09:15 AM",
          flag: "ELEVATED",
        },
      ],
    });
  }

  return NextResponse.json({
    source: "fallback",
    text: "Since last visit: Stable vitals and adherence [Obs: v32]. Concerns: None observed. Suggested checks: Routine annual diabetes screening. Doctor decides.",
    sections: {
      sinceLastVisit:
        "100% medication adherence recorded over the past 14 days.",
      concerns:
        "No risk elevations detected. Mean blood pressure stable at 120/78 mmHg [Obs: v32].",
      suggestedChecks:
        "Maintain current lifestyle regimen. Schedule routine 3-month HbA1c check.",
    },
    citations: [
      {
        id: "v32",
        type: "Blood Pressure",
        label: "BP Reading #v32",
        value: "118/76 mmHg",
        timestamp: "Yesterday",
        flag: "OPTIMAL",
      },
    ],
  });
}
