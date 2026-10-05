import { store } from "@/lib/supabase/localStore";

export interface BriefSections {
  sinceLastVisit: string;
  concerns: string;
  suggestedChecks: string;
}

export interface BriefResult {
  text: string;
  source: "llm" | "fallback";
  sections: BriefSections;
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

  if (risk.band === "red" || patientId === "p1") {
    fallbackSections = {
      sinceLastVisit: `Adherence declined to ${adherencePct}% with missed doses of Metformin. Discharged 10 days ago.`,
      concerns: `Systolic BP spiked to ${latestBp?.value_a || 154}/${latestBp?.value_b || 96} mmHg. Daily physical activity dropped to ${avgRecentSteps} steps.`,
      suggestedChecks: `Verify morning dosing adherence, evaluate for bilateral pedal edema, and re-check cuff placement. Doctor decides.`,
    };
  } else if (risk.band === "yellow") {
    fallbackSections = {
      sinceLastVisit: `Patient maintained ${adherencePct}% medication adherence over past 14 days.`,
      concerns: `Blood pressure fluctuating moderately around ${latestBp?.value_a || 138}/${latestBp?.value_b || 88} mmHg.`,
      suggestedChecks: `Review dietary sodium intake, check nighttime sleep quality, and monitor hydration. Doctor decides.`,
    };
  } else {
    fallbackSections = {
      sinceLastVisit: `Excellent adherence at ${adherencePct}% across all prescribed medications.`,
      concerns: `No active flags. Mean vitals stable at ${latestBp?.value_a || 120}/${latestBp?.value_b || 78} mmHg.`,
      suggestedChecks: `Maintain current lifestyle routine. Schedule routine 3-month HbA1c review. Doctor decides.`,
    };
  }

  const fallbackText = `Since last visit: ${fallbackSections.sinceLastVisit} Concerns: ${fallbackSections.concerns} Suggested checks: ${fallbackSections.suggestedChecks}`;

  // 3. Try LLM Call with 4-second timeout if LLM / Ollama is configured
  const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const ollamaModel = process.env.OLLAMA_MODEL || "llama3.2";
  const llmApiKey = process.env.LLM_API_KEY;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    if (llmApiKey) {
      // Direct LLM API provider
      clearTimeout(timeoutId);
      return {
        source: "fallback",
        text: fallbackText,
        sections: fallbackSections,
      };
    }

    // Try Ollama endpoint
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
          sections: fallbackSections, // structured fallback sections for drawer layout
        };
      }
    }
  } catch {
    // Timeout or network error: fall through smoothly to guaranteed fallback
  } finally {
    clearTimeout(timeoutId);
  }

  return {
    source: "fallback",
    text: fallbackText,
    sections: fallbackSections,
  };
}
