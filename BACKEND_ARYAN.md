# CareBridge Backend — Aryan
> You own everything backend: `app/api`, `lib/risk`, `lib/ai`, `lib/wearable`, `lib/escalation`, `supabase/`.
> Swapin handles all frontend. Never touch `app/(patient)`, `app/(doctor)`, `app/(family)`, `components/`.

Read `docs/MEMORY.md`, `docs/RULES.md`, `docs/ARCHITECTURE.md` before starting.

---

## What We're Adding (From PatientPulse Gap Analysis)

| PatientPulse | CareBridge After Upgrade |
|---|---|
| `WearableIngester` + `_parse_wearable_summary()` | `lib/wearable/processor.ts` — raw vitals → structured context + anomaly flags |
| `AlertAgent` — deterministic rules, zero LLM | Anomaly flags computed by rules before LLM sees anything |
| `DiagnosticAgent` — cites `Obs:{id}` | AI brief cites `vitals.id` rows as `Reading:{id}` |
| SSE streaming `/stream` endpoint | `GET /api/patients/:id/brief/stream` |
| (not in PatientPulse) | Doctor note → patient goals feedback loop |

**Rule**: LLM narrates what rules already computed. LLM never invents a number.

---

## Phase 1 — Wearable Context Processor
*Everything else depends on this. Build first.*

### Session starter prompt
```
You are working on CareBridge. Read docs/MEMORY.md, docs/ARCHITECTURE.md, docs/RULES.md.
Role: ARYAN. Only touch app/api, lib/risk, lib/ai, lib/wearable, lib/escalation, supabase/.

Phase 1: Build lib/wearable/processor.ts

Add to lib/types.ts (this is a frozen contract — tell the group in chat before adding):

  interface AnomalyFlag {
    ruleId: string
    severity: 'HIGH' | 'MEDIUM' | 'LOW'
    title: string
    detail: string
    readingId: string    // MUST be a real vitals.id from the DB — never invented
  }

  interface WearableContext {
    patientId: string
    windowDays: 14
    heartRate: {
      mean: number
      nocturnalMean: number   // hours 23:00–05:00
      max: number
      readings: { id: string; at: string; bpm: number }[]
    }
    bloodPressure: {
      latestSystolic: number
      latestDiastolic: number
      avgSystolic7d: number
      prevAvgSystolic7d: number   // prior 7 days
      trend: 'rising' | 'stable' | 'falling'
    }
    steps: {
      dailyMean: number
      baseline14d: number
      pctChangeFromBaseline: number
    }
    glucose: {
      latestFasting: number | null
      mean: number | null
    }
    anomalyFlags: AnomalyFlag[]
    lastUpdated: string
  }

Export buildWearableContext(patientId: string, supabase: SupabaseClient): Promise<WearableContext>

Implementation:
1. Query: SELECT id, type, value_a, value_b, recorded_at FROM vitals
   WHERE patient_id = $1 AND recorded_at > now() - interval '14 days'
   ORDER BY recorded_at DESC

2. Compute metrics from raw rows — pure functions, no LLM:
   - heartRate.nocturnalMean: average value_a where type='bp' is NOT needed here;
     for HR: type='vitals' with a subtype or check with Swapin's seeded data types.
     Actually: vitals.type is 'bp'|'steps'|'glucose' per ARCHITECTURE.md section 3.
     There is no HR in the current schema. Add HR support:
     New vitals type: 'hr' — value_a = bpm. The simulator already supports injecting this.
     Add a migration: no schema change needed, 'hr' is just a new value for the type text column.
   
   - Nocturnal = EXTRACT(HOUR FROM recorded_at) >= 23 OR EXTRACT(HOUR FROM recorded_at) < 5
   - avgSystolic7d: avg(value_a) WHERE type='bp' AND recorded_at > now()-7days
   - prevAvgSystolic7d: avg(value_a) WHERE type='bp' AND recorded_at BETWEEN now()-14days AND now()-7days
   - trend: if avgSystolic7d > prevAvgSystolic7d * 1.08 → 'rising'; < 0.92 → 'falling'; else 'stable'
   - steps.baseline14d: avg of first 7 days (days 8–14 ago); steps.dailyMean: avg of last 7 days
   - pctChangeFromBaseline: (dailyMean - baseline14d) / baseline14d * 100

3. Anomaly rules (deterministic — no LLM, no randomness):
   Rule HR_NOCTURNAL_HIGH (HIGH):
     if heartRate.nocturnalMean > 100
     title: "Elevated nocturnal heart rate"
     detail: "Mean nocturnal HR {nocturnalMean} bpm — threshold is 100 bpm."
     readingId: id of the highest nocturnal HR reading in the query result

   Rule STEPS_DECLINE (MEDIUM):
     if steps.pctChangeFromBaseline < -30
     title: "Activity decline"
     detail: "Daily steps down {abs(pct)}% from 14-day baseline ({dailyMean} vs {baseline14d})."
     readingId: id of the most recent steps reading

   Rule BP_TREND_UP (MEDIUM):
     if trend === 'rising'
     title: "Blood pressure trending up"
     detail: "Avg systolic up {pct}% vs prior 7 days ({avgSystolic7d} vs {prevAvgSystolic7d} mmHg)."
     readingId: id of the latest bp reading

   Rule GLUCOSE_HIGH (HIGH):
     if glucose.latestFasting >= 180
     title: "High fasting glucose"
     detail: "Latest fasting glucose {latestFasting} mg/dL — threshold is 180."
     readingId: id of the latest glucose reading

   AnomalyFlag.readingId MUST be a real vitals.id from the query — never a UUID you invented.

4. Export from lib/wearable/index.ts:
   export { buildWearableContext } from './processor'
   export type { WearableContext, AnomalyFlag } from '../types'

5. Update GET /api/patients/:id to include a wearable field:
   const wearable = await buildWearableContext(id, supabase).catch(() => null)
   Add to the response: { ...existing, wearable }

6. Add /api/sim/event handler for type='hr_spike':
   Inserts 3 vitals rows (type:'hr', value_a: 108–115, recorded_at: last night 02:00, 03:00, 04:00)
   So the simulator can trigger the HR anomaly for demo.

Run npm run lint && npm run build. Fix all errors.
Tell the group: "WearableContext type is live in lib/types.ts — Swapin can now build WearablePanel."
Add one line to docs/MEMORY.md status log.
```

---

## Phase 2 — AI Brief Upgrade (Cited Output)
*Depends on: Phase 1 (WearableContext).*

### Session starter prompt
```
You are working on CareBridge. Read docs/MEMORY.md, docs/ARCHITECTURE.md, docs/RULES.md.
Role: ARYAN. Only touch app/api, lib/risk, lib/ai, lib/wearable, lib/escalation, supabase/.

Phase 2: Upgrade lib/ai/brief.ts to use wearable context and produce cited output.

1. Migration (run in Supabase SQL editor):
   ALTER TABLE briefs ADD COLUMN IF NOT EXISTS citations JSONB DEFAULT '[]'::jsonb;

2. Upgrade generateBrief(patientId):
   a. Fetch patient snapshot (existing: adherence, BP trend, risk score, reasons)
   b. Call buildWearableContext(patientId, supabase) — import from lib/wearable
   c. Build context JSON for LLM:
      {
        patient: { name, age, conditions[] },
        adherence: { pct7d, missedStreak, reasons[] },
        wearable: {
          anomalyFlags: wearable.anomalyFlags,       // rule-computed, not LLM
          heartRate: { nocturnalMean, mean },
          bloodPressure: { latestSystolic, trend },
          steps: { pctChangeFromBaseline },
          glucose: { latestFasting }
        },
        riskScore: { score, band, reasons[] },
        readingIndex: {                               // lookup map for citation resolution
          [readingId]: { value: string; at: string }
          // populate from wearable context readings
        }
      }

3. System prompt (hard rules — do not soften):
   "You are a clinical decision-support tool. Generate a pre-consult brief in exactly 3 sections.
   
   Rules:
   - Max 100 words total across all three sections.
   - Three sections in this exact order, with these exact labels:
     'Since last visit:' / 'Concerns:' / 'Suggested checks:'
   - Cite every specific value as Reading:{readingId} using the readingIndex provided.
     Example: 'Heart rate elevated (Reading:abc123).' NOT 'Heart rate elevated at 108 bpm.'
   - If anomalyFlags contains HIGH severity items, list them first in Concerns.
   - Never say 'diagnose', 'treatment', or specific drug doses.
   - End the entire brief with: 'Doctor decides.'
   - Output plain text only. No markdown, no bullet points."

4. Parse LLM output:
   a. Extract Reading:{id} tokens with regex /Reading:([a-zA-Z0-9\-]+)/g
   b. For each match, look up in readingIndex → { value, at }
   c. Build: citations = [{ readingId, value, at }]
   d. Remove unresolved IDs (not in readingIndex) — never include invented citations

5. Parse sections from output:
   sections = {
     sinceLastVisit: text between 'Since last visit:' and 'Concerns:',
     concerns: text between 'Concerns:' and 'Suggested checks:',
     suggestedChecks: text after 'Suggested checks:'
   }

6. Return and store:
   { text, sections, citations, source: 'llm'|'fallback', generatedAt }
   INSERT INTO briefs (patient_id, text, source, citations) VALUES (...)

7. Fallback (timeout 4s or missing LLM key):
   Build the same shape from context JSON — no AI:
   sinceLastVisit: "Adherence {pct7d}% over last 7 days. Latest BP {latestSystolic} mmHg."
   concerns: anomalyFlags.filter(HIGH).map(f => f.title).join('. ') || "No active concerns."
   suggestedChecks: "Review BP trend. Check medicine schedule. Doctor decides."
   citations: [] (fallback has no citations)
   source: 'fallback'

Run npm run lint && npm run build. Fix all errors. Add MEMORY.md status log line.
```

---

## Phase 3 — SSE Streaming Endpoint

### Session starter prompt
```
You are working on CareBridge. Read docs/MEMORY.md, docs/ARCHITECTURE.md, docs/RULES.md.
Role: ARYAN. Only touch app/api, lib/risk, lib/ai, lib/wearable, lib/escalation, supabase/.

Phase 3: Add GET /api/patients/:id/brief/stream as a Next.js Route Handler.

1. File: app/api/patients/[id]/brief/stream/route.ts

2. Response headers:
   Content-Type: text/event-stream
   Cache-Control: no-cache
   Connection: keep-alive
   X-Accel-Buffering: no

3. Build the same context JSON as Phase 2 (reuse the context builder — extract it into lib/ai/contextBuilder.ts so both POST brief and GET stream use it).

4. Stream the LLM response:
   LLM_PROVIDER=anthropic: use Anthropic SDK with stream:true, iterate content_block_delta events
   LLM_PROVIDER=gemini: use generateContentStream
   
   For each token delta:
   Send: data: {"type":"token","delta":"<text>"}\n\n
   
   On stream complete:
   - Parse citations from the full accumulated text (same logic as Phase 2)
   - Send: data: {"type":"done","citations":[...],"source":"llm"}\n\n
   - Close the stream

5. Timeout: if no tokens arrive in 4000ms, cancel the LLM call and send the fallback:
   data: {"type":"done","text":"<fallback text>","citations":[],"source":"fallback"}\n\n

6. Error handling: any exception → send data: {"type":"error","message":"Brief unavailable"}\n\n then close.

7. Keep the existing POST /api/patients/:id/brief for non-streaming (fallback for browsers that don't support EventSource).

Run npm run lint && npm run build. Fix all errors.
Tell group: "SSE stream endpoint live — Swapin can upgrade BriefPanel to streaming."
Add MEMORY.md status log line.
```

---

## Phase 4 — Doctor Note → Patient Feedback Loop

### Session starter prompt
```
You are working on CareBridge. Read docs/MEMORY.md, docs/ARCHITECTURE.md, docs/RULES.md.
Role: ARYAN. Only touch app/api, lib/risk, lib/ai, lib/wearable, lib/escalation, supabase/.

Phase 4: Doctor note → patient goals feedback loop (CareBridge's unique USP).

1. Migrations (run in Supabase SQL editor in this order):

   CREATE TABLE IF NOT EXISTS doctor_notes (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     patient_id UUID NOT NULL REFERENCES patients(id),
     doctor_id UUID NOT NULL REFERENCES doctors(id),
     note_text TEXT NOT NULL,
     parsed_instructions JSONB,
     created_at TIMESTAMPTZ DEFAULT now()
   );

   CREATE TABLE IF NOT EXISTS patient_goals (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     patient_id UUID NOT NULL REFERENCES patients(id),
     category TEXT NOT NULL CHECK (category IN ('steps','medicine','bp','glucose','other')),
     target TEXT NOT NULL,
     by_date DATE,
     source_note_id UUID REFERENCES doctor_notes(id),
     completed_at TIMESTAMPTZ,
     created_at TIMESTAMPTZ DEFAULT now()
   );

2. POST /api/patients/:id/doctor-note
   Body: { noteText: string }
   Validation: noteText must be 20–500 chars, else return 400 { error: 'Note must be 20–500 characters' }
   
   a. INSERT into doctor_notes (patient_id, doctor_id, note_text) — use hardcoded doctor_id from seed for prototype
   
   b. Call LLM to parse the note (timeout 3s, fallback to empty arrays):
      System prompt:
      "Extract structured care instructions from a doctor's note. Return ONLY valid JSON with no other text:
       { 
         reminders: [{ medicine: string, time: string, instruction: string }],
         goals: [{ category: 'steps'|'medicine'|'bp'|'glucose'|'other', target: string, by: string }],
         followUpDate: string | null
       }
       Rules: No diagnosis language. No drug dose advice. If a field is unclear, omit it."
      
      User message: noteText
      
      Parse response: strip any markdown code fences before JSON.parse(). On parse error: { reminders:[], goals:[], followUpDate:null }
   
   c. UPDATE doctor_notes SET parsed_instructions = $parsed WHERE id = $noteId
   
   d. For each goal in parsed_instructions.goals:
      INSERT INTO patient_goals (patient_id, category, target, by_date, source_note_id)
   
   e. INSERT INTO alerts (patient_id, level='reminder', audience='patient',
      message='Dr. Rao updated your care plan. Tap to review.')
   
   f. Return: { noteId, parsedInstructions }

3. GET /api/patients/:id/goals
   Return: {
     goals: [{ id, category, target, by_date, completed_at, source_note_id }]  ordered by by_date asc, completed_at NULLS FIRST
     latestNote: { id, created_at, note_text } | null   (most recent doctor_notes row)
   }

4. POST /api/patients/:id/goals/:goalId/complete
   UPDATE patient_goals SET completed_at = now() WHERE id = $goalId AND patient_id = $patientId
   Return: { completedAt: string }

5. GET /api/admin/ai-audit (new — for Aman's admin panel):
   SELECT b.id, p.name as patient_name, b.created_at, b.source,
          length(b.text) as char_count, jsonb_array_length(b.citations) as citation_count, b.text, b.citations
   FROM briefs b JOIN patients p ON b.patient_id = p.id
   ORDER BY b.created_at DESC LIMIT 50
   Return as array.

6. Add 'hr_spike' to /api/sim/event (if not done in Phase 1):
   Inserts 3 vitals rows (type:'hr', value_a: random 108–115, recorded_at: last night 02:00, 03:00, 04:00 UTC)
   
   Also add to /api/sim/reset: DELETE FROM doctor_notes, patient_goals, briefs WHERE patient_id IN (seed IDs)

Run npm run lint && npm run build. Fix all errors.
Tell group: "Doctor note endpoints live — Swapin can wire DoctorNoteCard and Aman can build upload modal."
Add MEMORY.md status log line.
```

---

## Phase 5 — Reliability Pass

### Session starter prompt
```
You are working on CareBridge. Read docs/MEMORY.md, docs/ARCHITECTURE.md, docs/RULES.md.
Role: ARYAN. Only touch app/api, lib/risk, lib/ai, lib/wearable, lib/escalation, supabase/.

Phase 5: Reliability and demo hardening.

1. /api/sim/reset: verify it restores EXACTLY the demo start state.
   After reset: Ramesh is Yellow (not Red), has medicines seeded, has 14d history, NO doctor notes, NO extra briefs.
   Add HR readings to seed: 3 rows type='hr', value_a=72, for each of last 3 days at 02:00.
   (So the initial state has no HR anomaly — only after "hr_spike" event fires.)

2. USE_LOCAL_STORE=true: verify buildWearableContext works with the in-memory store.
   The local store's vitals array must have the same fields (id, type, value_a, value_b, recorded_at).

3. LLM fallback: verify that setting LLM_API_KEY= (empty) makes both POST /brief and the SSE stream return fallback gracefully.
   The fallback must have source='fallback' and non-empty text.

4. Input validation on all new POST routes:
   POST /doctor-note: noteText required, string, 20-500 chars
   POST /goals/:id/complete: goalId must be valid UUID belonging to this patient
   POST /sim/event: kind must be one of the allowed values (add 'hr_spike')

5. No console.log in any committed file:
   grep -r "console\.log" --include="*.ts" app/ lib/ | list all hits and remove them.
   Replace with structured logger or remove entirely.

6. Confirm no secret in client bundle:
   grep -r "LLM_API_KEY\|SUPABASE_SERVICE_ROLE" --include="*.tsx" --include="*.ts" app/(patient) app/(doctor) app/(family) app/(admin) components/
   Must return empty. Service role key must only appear in app/api/ files.

Run npm run lint && npm run build. Fix all errors. Add MEMORY.md status log line.
```

---

## New Routes Summary (Tell Group Before Adding)

```
GET  /api/patients/:id               ← UPDATED: now includes wearable: WearableContext | null
GET  /api/patients/:id/brief/stream  ← NEW: SSE token stream
POST /api/patients/:id/doctor-note   ← NEW: { noteText } → { noteId, parsedInstructions }
GET  /api/patients/:id/goals         ← NEW: { goals[], latestNote }
POST /api/patients/:id/goals/:id/complete  ← NEW: marks goal done
GET  /api/admin/ai-audit             ← NEW: brief history for admin panel
```

## New DB Tables / Columns
```
briefs: + citations JSONB column
doctor_notes: new table
patient_goals: new table
vitals.type: now also accepts 'hr'
```

## Non-negotiables
- AnomalyFlag.readingId is always a real vitals.id. Never invented.
- LLM never computes a number — it only narrates pre-computed values.
- All new endpoints validate input before DB writes.
- /api/sim/reset must be idempotent and leave the app in clean demo state.
- No console.log in committed code.
- Fallback works when USE_LOCAL_STORE=true — demo never dies.
