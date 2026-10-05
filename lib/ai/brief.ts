/**
 * lib/ai/brief.ts
 * Pre-consult brief generator using Ollama (local LLM, no API key needed).
 *
 * Owner: Aryan — wire up to POST /api/patients/:id/brief
 *
 * Model: llama3.2 (default) — configurable via OLLAMA_MODEL env var
 * Endpoint: http://localhost:11434 (configurable via OLLAMA_BASE_URL)
 *
 * Fallback: if Ollama is unreachable or times out (4 s), returns a
 * deterministic template brief built from the same patient JSON.
 */

export interface PatientSnapshot {
  name: string;
  age: number;
  conditions: string[];
  adherencePct: number;       // 0-100, last 7 days
  avgSystolic7d: number;
  avgDiastolic7d: number;
  latestSystolic: number;
  latestDiastolic: number;
  stepsAvg7d: number;
  alertCount14d: number;
  riskReasons: string[];       // plain-language reason texts
  lastVisitDaysAgo: number;
}

export interface BriefResult {
  text: string;
  source: 'llm' | 'fallback';
}

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'llama3.2';
const TIMEOUT_MS = 4000;

const SYSTEM_PROMPT = `You are a clinical decision-support assistant. Write a concise pre-consult brief for a doctor.

Rules:
- Max 90 words total.
- Exactly three sections: "Since last visit:", "Concerns:", "Suggested checks:"
- Never say "diagnosis". Use "risk flag" or "decision support".
- Never give dosing advice or prescribe anything.
- End with exactly: "Doctor decides."
- Be factual and specific. Use the numbers provided.`;

function buildUserMessage(snap: PatientSnapshot): string {
  return `Patient: ${snap.name}, ${snap.age}y, ${snap.conditions.join(', ')}.
Last visit: ${snap.lastVisitDaysAgo} days ago.
Medicine adherence (7d): ${snap.adherencePct}%.
BP (avg 7d): ${snap.avgSystolic7d}/${snap.avgDiastolic7d} mmHg. Latest: ${snap.latestSystolic}/${snap.latestDiastolic} mmHg.
Steps avg (7d): ${snap.stepsAvg7d.toLocaleString()}/day.
Alerts (14d): ${snap.alertCount14d}.
Active risk flags: ${snap.riskReasons.length > 0 ? snap.riskReasons.join('; ') : 'None'}.

Write the pre-consult brief now.`;
}

/** Deterministic fallback — always works even if Ollama is down */
function buildFallback(snap: PatientSnapshot): string {
  const adherenceNote =
    snap.adherencePct < 70
      ? `Adherence is low at ${snap.adherencePct}% — missed doses flagged.`
      : `Adherence is ${snap.adherencePct}%.`;

  const bpNote =
    snap.latestSystolic >= 150 || snap.latestDiastolic >= 95
      ? `BP elevated at ${snap.latestSystolic}/${snap.latestDiastolic} mmHg.`
      : `BP is ${snap.latestSystolic}/${snap.latestDiastolic} mmHg.`;

  const flagsNote =
    snap.riskReasons.length > 0
      ? snap.riskReasons.slice(0, 2).join(' ') + '.'
      : 'No active risk flags.';

  return (
    `Since last visit: ${snap.lastVisitDaysAgo} days since last visit. ` +
    `${adherenceNote} ${bpNote} ` +
    `Concerns: ${flagsNote} ${snap.alertCount14d} alert(s) in the last 14 days. ` +
    `Suggested checks: Review medicine schedule, check BP trend, confirm step activity. ` +
    `Doctor decides.`
  );
}

export async function generateBrief(
  snap: PatientSnapshot
): Promise<BriefResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserMessage(snap) },
        ],
        options: {
          temperature: 0.3,   // low temp = consistent, factual output
          num_predict: 150,    // ~90 words
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);

    const json = await res.json();
    const text: string = json?.message?.content ?? '';

    if (!text.trim()) throw new Error('Empty response from Ollama');

    return { text: text.trim(), source: 'llm' };
  } catch (err) {
    // Ollama unreachable, timed out, or returned garbage — use template
    console.warn('[brief] Ollama fallback triggered:', (err as Error).message);
    return { text: buildFallback(snap), source: 'fallback' };
  }
}
