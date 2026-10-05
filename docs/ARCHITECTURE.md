# CareBridge Architecture (Prototype)

Principle: one repo, one deploy, folder ownership per person so merges never collide.

## 1. Stack (default; swap only if the whole team agrees tonight)
| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | One codebase for patient, doctor, family, admin |
| Styling | Tailwind CSS + CSS variables from DESIGN.md | Fast, token-driven |
| DB + Realtime | Supabase (Postgres + Realtime) | Live doctor list without writing sockets |
| Server logic | Next.js route handlers in `/app/api` | No separate backend to deploy |
| AI | LLM API behind `/lib/ai` with canned fallback | Demo never dies |
| Voice | Web Speech API (`hi-IN`, `kn-IN`, `en-IN`) | No cost, works in Chrome |
| Charts | Recharts | Quick trend lines |
| Icons | lucide-react | Consistent stroke icons |
| Hosting | Vercel | Instant preview URLs |

## 2. Repo layout and owners
```
carebridge/
  app/
    (patient)/        # Vedesh
    (family)/         # Vedesh
    (doctor)/         # Aman
    (admin)/          # Aman  (ROI panel)
    sim/              # Aryan (simulator control panel)
    api/              # Aryan
  components/
    ui/               # Swapin (design system primitives)
    patient/          # Vedesh
    doctor/           # Aman
  lib/
    risk/             # Aryan (scoring engine)
    ai/               # Aryan (brief generator, prompts, fallback)
    escalation/       # Aryan
    supabase/         # Aryan (client, types)
    i18n/             # Vedesh (en/hi/kn strings)
    voice/            # Vedesh (speech hook + intent parser)
  design/             # Swapin (tokens, Figma exports, illustrations)
  docs/               # shared (this folder)
  supabase/
    schema.sql        # Aryan
    seed.sql          # Aryan
```

## 3. Data model (Postgres)
```
patients(id, name, age, language, conditions text[], doctor_id, family_id, created_at)
doctors(id, name, clinic)
family_members(id, name, relation, patient_id, phone)
medicines(id, patient_id, name, dose, times text[])         -- e.g. ['08:00','20:00']
med_logs(id, patient_id, medicine_id, scheduled_at, taken_at null, status)  -- taken|missed|pending
vitals(id, patient_id, type, value_a, value_b null, recorded_at)  -- type: bp|steps|glucose
risk_scores(id, patient_id, score, band, computed_at)
risk_reasons(id, risk_score_id, rule_id, text, weight)
alerts(id, patient_id, level, audience, message, created_at, acknowledged_at null)
  -- level: reminder|family|doctor ; audience: patient|family|doctor
consents(id, patient_id, category, granted bool, updated_at)  -- vitals|medicines|steps|glucose
audit_log(id, patient_id, actor_type, actor_id, action, category, created_at)
briefs(id, patient_id, text, source, created_at)  -- source: llm|fallback
```
Seed: 3 patients (Ramesh K. 62, Anita S. 54, Suresh P. 48), 14 days of history each, 1 doctor, 3 family members, 1 clinic.

## 4. Risk engine (`/lib/risk`)
Rule-based, transparent, deterministic. Pure function: `computeRisk(patientSnapshot) -> {score, band, reasons[]}`.

| Rule id | Trigger | Points |
|---|---|---|
| MED_ADHERENCE_LOW | Adherence < 70% over last 7 days | +25 |
| MED_MISSED_STREAK | 2+ consecutive missed doses | +15 |
| BP_TREND_UP | Avg systolic up > 8% vs previous 7 days | +20 |
| BP_HIGH_ABS | Latest systolic >= 150 or diastolic >= 95 | +20 |
| STEPS_DROP | 7-day avg steps down > 40% vs prior 7 days | +10 |
| GLUCOSE_HIGH | Latest fasting glucose >= 180 mg/dL | +15 |
| RECENT_DISCHARGE | Discharged in last 14 days | +10 |
| NO_DATA_48H | No vitals or logs in 48 h | +15 |

Cap at 100. Reasons are emitted with plain-language text, e.g. "Missed 3 of last 5 Metformin doses".
Rules live in one config array so thresholds can be tuned during rehearsal.

## 5. Escalation ladder (`/lib/escalation`)
```
missed dose detected
  -> T+0     alert(level=reminder, audience=patient)
  -> T+Δ1    if still missed: alert(level=family, audience=family)
  -> T+Δ2    if still missed: recompute risk with MED_MISSED_STREAK, alert(level=doctor)
```
Delays: production 30 min / 2 h; demo mode 10 s / 25 s (env `NEXT_PUBLIC_DEMO_MODE=true`).
Implementation: `POST /api/escalation/tick` is called by the simulator "fast-forward" button and a 5 s client interval on the doctor dashboard. No cron needed.

## 6. AI layer (`/lib/ai`)
- `generateBrief(patientId)`: builds a compact JSON of the last 14 days (adherence %, BP series, steps, alerts, current reasons) and sends it to the LLM.
- Prompt rules: max 90 words, three parts (Since last visit / Concerns / Suggested checks), no diagnosis, no drug dosage advice, end with "Doctor decides."
- Timeout 4 s. On failure or no key: template fallback filled from the same JSON, `source='fallback'`.
- Voice intent parser (`/lib/voice`): keyword map, not LLM. Examples: `dawai le li`, `medicine tiskondidini`, `took my medicine` -> `LOG_MED_TAKEN`. BP phrases: `BP 130 by 85` -> `LOG_BP`.

## 7. API contract (freeze tonight)
```
GET  /api/patients                       -> [{id,name,age,score,band,topReason,lastSeen}]  (doctor list, sorted)
GET  /api/patients/:id                   -> {profile, vitals, medLogs, risk:{score,band,reasons[]}, alerts[]}
POST /api/patients/:id/med-log           {medicineId, status:'taken'|'missed'}
POST /api/patients/:id/vitals            {type, valueA, valueB?}
POST /api/patients/:id/brief             -> {text, source}
GET  /api/patients/:id/consents          -> [{category, granted}]
PUT  /api/patients/:id/consents          {category, granted}
GET  /api/patients/:id/audit             -> [{actor, action, category, at}]
GET  /api/family/:id/feed                -> {patient, today, alerts[]}
POST /api/doctor/actions                 {patientId, type:'call'|'message'|'teleconsult', note?}
POST /api/escalation/tick                -> {fired:[...]}
POST /api/sim/event                      {patientId, kind:'miss_dose'|'bp_spike'|'steps_drop'|'recover', params?}
POST /api/sim/reset                      -> resets seed data
GET  /api/admin/roi                      -> {readmissionsPrevented, doctorHoursSaved, alertsActioned, patientsMonitored}
```
All responses JSON. Errors: `{error:string}` with a proper status code.

## 8. Realtime
Supabase Realtime subscriptions on `risk_scores` and `alerts` drive the doctor list and the family feed. Fallback: 3 s polling if Realtime is flaky on the venue wifi.

## 9. Auth (prototype)
No real auth. A role switcher on the landing page (Patient / Doctor / Family / Admin) sets a cookie. Say "auth is stubbed for the prototype" in the demo.

## 10. Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
LLM_API_KEY=
LLM_PROVIDER=gemini|anthropic
NEXT_PUBLIC_DEMO_MODE=true
```

## 11. Failure plan
- Supabase down: `lib/supabase` exports a local in-memory store with the same interface; flip with `USE_LOCAL_STORE=true`.
- LLM down: fallback template.
- Mic blocked: voice button shows typed-input fallback with the same intent parser.
- Record a backup demo video tomorrow before the live slot.
