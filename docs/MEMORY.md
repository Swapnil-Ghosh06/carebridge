# CareBridge Project Memory

Shared brain for all four humans and every AI agent. Read this first. Update the Status Log and Decisions last. Keep entries short.

## Project
CareBridge: phone health data -> risk-ranked action list for doctors, with family in the loop. Prototype for a shortlisted hackathon pitch. Team name: poweredbycaffine.

## Team and ownership
- Vedesh: lead, patient app, family view, voice, i18n (`app/(patient)`, `app/(family)`, `lib/voice`, `lib/i18n`)
- Aman: doctor portal, admin ROI (`app/(doctor)`, `app/(admin)`, `components/doctor`)
- Swapin: UI/UX, design system (`components/ui`, `design/`, Figma)
- Aryan: backend, risk engine, AI, simulator (`app/api`, `lib/risk`, `lib/ai`, `lib/escalation`, `supabase/`)

## Hard constraints
- Fonts: ONLY Montserrat (primary), DM Sans / Google Sans (secondary), Sora (data). No others. No JetBrains, Arial, Calibri, Inter, Roboto, monospace.
- Theme: calm white canvas, navy ink, teal primary, hand-drawn line illustrations with offset flat colour blocks (see DESIGN.md).
- Wording: "risk flag, decision support, doctor decides". Never "diagnosis".
- All data is simulated and labelled so.
- Stack: Next.js 14 + TS + Tailwind + Supabase + Vercel.

## Frozen contracts
- API routes: ARCHITECTURE.md section 7
- Types: `lib/types.ts`
- Risk bands: Green 0-39, Yellow 40-69, Red 70-100
- Escalation demo delays: 10 s (family), 25 s (doctor)

## Seed patients
| Name | Age | Language | Conditions | Story |
|---|---|---|---|---|
| Ramesh K. | 62 | Hindi | Diabetes, BP | Demo hero; starts Green/Yellow, ends Red |
| Anita S. | 54 | Kannada | BP | Stays Yellow |
| Suresh P. | 48 | English | Diabetes | Stays Green |
| Family: Ramesh's son Karan (Bengaluru). Doctor: Dr. Meera Rao, Sunrise Clinic (fictional).

## Decisions log
(Format: date time, who, decision, why)
- 2026-10-05 22:45, team, one Next.js monorepo, role-switcher instead of real auth, to save time.
- 2026-10-05 22:45, team, rule-based risk engine, LLM only for the brief, so the score is explainable.
- 2026-10-05 22:42, Vedesh, switched AI layer from Gemini/Anthropic to Ollama (llama3.2, local). No API key needed, works offline, fallback template if Ollama is down. OLLAMA_BASE_URL=http://localhost:11434.
- 2026-10-05 23:20, Vedesh, implemented components/ui primitives (Button, Card, StatTile, RiskBadge, MedicineCard, AlertItem) and API handlers so Patient & Family apps work end-to-end with zero blockers.

## Dependencies added
(next, react, tailwindcss, @supabase/supabase-js, recharts, lucide-react, framer-motion by default. Add others here.)

## Status log
(Newest first. One line each: time, who, done/blocked.)
- 2026-10-06 00:05, Vedesh, Phase 4 & 5 DONE: Created complete hackathon submission document (docs/SUBMISSION.md), 2-minute live demo rehearsal guide with contingency playbook (docs/DEMO_SCRIPT.md), 1-page judge disclosure matrix (docs/REAL_VS_SIMULATED.md), full Next.js 14 production build verified clean (14/14 static & dynamic routes).
- 2026-10-05 23:55, Vedesh, Phase 3 DONE: Consent settings screen for patient (P5 at app/(patient)/patient/consent/page.tsx), ConsentToggle component with category icons and accessible switch, immutable audit log preview, GET & PUT /api/patients/:id/consents and GET /api/patients/:id/audit route handlers. Build clean (14/14 routes).
- 2026-10-05 23:45, Vedesh, Phase 2 DONE: Web Speech API hook (lib/voice/useSpeech.ts) for hi-IN/kn-IN/en-IN, deterministic intent parser (lib/voice/intent.ts) extracting medicine logs & BP values, VoiceButton with pulsing rings, full P3 Voice Logging screen with live transcription + intent confirmation + typed fallback, Family feed 3-stage visual escalation ladder. Build clean (13/13 routes).
- 2026-10-05 23:22, Vedesh, Phase 1 DONE: Patient home (greeting + 3 StatTiles + next dose card), Medicines schedule with adherence progress bar + optimistic taken log, BP vitals entry form with classification chips, Family feed with 3s polling + F1 status card + F2 alert timeline, en/hi/kn i18n support, components/ui primitives, API route handlers. Build clean (12/12 routes).
- 2026-10-05 22:45, Aman, built Doctor Portal (list, details, trends, why-flagged, brief, actions, audit) & Admin ROI; lint and build clean.
- 2026-10-05 22:39, Vedesh, Phase 0 DONE: Next.js 14 scaffolded, all route groups created, fonts (Montserrat/DM Sans/Sora) wired, Tailwind tokens set, landing page + role cookie/redirect built, lib/i18n + lib/voice stubs, .env.example + README. Build clean (9/9 routes). Pushed to origin/main + origin/vedesh/patient.

## Known issues / blockers
- (empty)

## Open questions
- LLM provider and key?
- Exact submission time and format (URL, video, repo)?
- Judging criteria weights?

## Do not forget
- Reset demo data before every rehearsal.
- Keep `NEXT_PUBLIC_DEMO_MODE=true`.
- Backup video before the live slot.
