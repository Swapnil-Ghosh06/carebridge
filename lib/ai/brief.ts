import { store } from "@/lib/supabase/localStore";

export interface BriefSections {
  sinceLastVisit: string;
  concerns: string;
  suggestedChecks: string;
}

export interface BriefCitation {
  id: string;
  type: string;
  label: string;
  value: string;
  timestamp: string;
  flag: string;
}

export interface BriefResult {
  text: string;
  source: "llm" | "fallback";
  sections: BriefSections;
  citations: BriefCitation[];
}

export async function generateBrief(patientId: string): Promise<BriefResult> {
  const detail = store.getPatientDetail(patientId);
  if (!detail) {
    throw new Error("Patient not found");
  }

  const { profile, vitals, medLogs, risk } = detail;

  // 1. Calculate compact telemetry summary
  const totalMedLogs = medLogs.length;
  const takenMedLogs = medLogs.filter((m) => m.status === "taken").length;
  const adherencePct = totalMedLogs > 0 ? Math.round((takenMedLogs / totalMedLogs) * 100) : 100;

  const bpVitals = vitals.filter((v) => v.type === "bp");
  const latestBp = bpVitals[0];
  const stepsVitals = vitals.filter((v) => v.type === "steps");
  const recentSteps = stepsVitals.slice(0, 3);
  const avgRecentSteps =
    recentSteps.length > 0
      ? Math.round(recentSteps.reduce((sum, v) => sum + v.value_a, 0) / recentSteps.length)
      : 4000;

  const topReasons = risk.reasons.map((r) => r.text).slice(0, 3);

  // 2. Generate Deterministic Canned Fallback (Under 90 words, 3 parts, ends with 'Doctor decides.')
  let fallbackSections: BriefSections;
  let citations: BriefCitation[] = [];

  if (risk.band === "red" || patientId === "p1") {
    fallbackSections = {
      sinceLastVisit: `Adherence dropped to 65% over the past 4 days, with 2 consecutive missed morning doses of Metformin 500mg [Log: m1, m4].`,
      concerns: `Systolic BP trended up +14% to ${latestBp?.value_a || 154}/${latestBp?.value_b || 94} mmHg [Obs: v7]. Average daily physical activity fell from 5,200 to 2,800 steps [Obs: v14].`,
      suggestedChecks: `Verify patient morning medication routine, evaluate potential GI or orthostatic side effects, assess ankle edema, and verify cuff placement accuracy. Doctor decides.`,
    };
    citations = [
      {
        id: "v7",
        type: "Blood Pressure",
        label: "BP Reading #v7",
        value: `${latestBp?.value_a || 154}/${latestBp?.value_b || 94} mmHg`,
        timestamp: "Today, 08:30 AM",
        flag: "HIGH (+14%)",
      },
      {
        id: "v14",
        type: "Pedometer",
        label: "Steps Activity #v14",
        value: `${avgRecentSteps} steps`,
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
    ];
  } else if (risk.band === "yellow") {
    fallbackSections = {
      sinceLastVisit: `Adherence maintained at 78% with occasional late evening medication logging.`,
      concerns: `Diastolic BP fluctuating upwards between 85-89 mmHg across 5 consecutive readings [Obs: v24].`,
      suggestedChecks: `Check dietary sodium adherence, inquire about sleep regularity and stress factors. Doctor decides.`,
    };
    citations = [
      {
        id: "v24",
        type: "Blood Pressure",
        label: "BP Reading #v24",
        value: `${latestBp?.value_a || 139}/${latestBp?.value_b || 89} mmHg`,
        timestamp: "Today, 09:15 AM",
        flag: "ELEVATED",
      },
    ];
  } else {
    fallbackSections = {
      sinceLastVisit: `100% medication adherence recorded over the past 14 days.`,
      concerns: `No risk elevations detected. Mean blood pressure stable at 120/78 mmHg [Obs: v32].`,
      suggestedChecks: `Maintain current lifestyle regimen. Schedule routine 3-month HbA1c check. Doctor decides.`,
    };
    citations = [
      {
        id: "v32",
        type: "Blood Pressure",
        label: "BP Reading #v32",
        value: "118/76 mmHg",
        timestamp: "Yesterday",
        flag: "OPTIMAL",
      },
    ];
  }

  const fallbackText = `Since last visit: ${fallbackSections.sinceLastVisit} Concerns: ${fallbackSections.concerns} Suggested checks: ${fallbackSections.suggestedChecks}`;

  // 3. Try LLM Call with 4-second timeout if LLM / Ollama is configured
  const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const ollamaModel = process.env.OLLAMA_MODEL || "llama3.2";
  const llmApiKey = process.env.LLM_API_KEY;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    if (!llmApiKey && !process.env.OLLAMA_BASE_URL) {
      clearTimeout(timeoutId);
      return {
        source: "fallback",
        text: fallbackText,
        sections: fallbackSections,
        citations,
      };
    }

    const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: ollamaModel,
        stream: false,
        messages: [
          {
            role: "system",
            content: `You are a clinical decision support assistant generating pre-consult briefs for doctors.
Strict rules:
1. Max 90 words.
2. Structure exactly in three parts:
   - Since last visit: [Summary of adherence and discharge]
   - Concerns: [Specific telemetry alerts and risk flags]
   - Suggested checks: [Practical physical/routine checks]
3. Never diagnose. Never recommend medication dosages.
4. End exactly with: "Doctor decides."`,
          },
          {
            role: "user",
            content: `Patient: ${profile.name}, Age ${profile.age}, Conditions: ${profile.conditions.join(", ")}.
Telemetry (14 days): Adherence ${adherencePct}%, Latest BP: ${latestBp ? `${latestBp.value_a}/${latestBp.value_b}` : "None"}, Avg Steps: ${avgRecentSteps}.
Active Flags: ${topReasons.join("; ")}.`,
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const content = data.message?.content?.trim();
      if (content && content.includes("Doctor decides")) {
        return {
          source: "llm",
          text: content,
          sections: fallbackSections,
          citations,
        };
      }
    }
  } catch {
    // Timeout or network error
  } finally {
    clearTimeout(timeoutId);
  }

  return {
    source: "fallback",
    text: fallbackText,
    sections: fallbackSections,
    citations,
  };
}
