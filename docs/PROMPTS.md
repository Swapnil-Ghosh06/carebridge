# CareBridge Step-by-Step Prompts (paste into your AI agent)

How to use:
1. Open your agent (Claude Code / Antigravity / Cursor) inside the repo.
2. Paste the **Session starter** once at the start of every session.
3. Paste the prompt for your role and current phase. Run one prompt at a time.
4. When it finishes: run `npm run lint && npm run build`, commit, tick TASKS.md, add a line to MEMORY.md.

---

## Session starter (everyone, every session)

```
You are working on CareBridge, a hackathon prototype: patient phone health data becomes a risk-ranked action list for doctors, with family kept in the loop.

First read these files fully: docs/PRD.md, docs/ARCHITECTURE.md, docs/RULES.md, docs/DESIGN.md, docs/TASKS.md, docs/MEMORY.md.

My role: <VEDESH | AMAN | SWAPIN | ARYAN>. Only touch the folders my role owns (ARCHITECTURE.md section 2). 

Non-negotiables:
- Fonts: ONLY Montserrat (headings), DM Sans (body), Sora (numbers/data/badges). No other fonts, no monospace, no Inter/Arial/Calibri/JetBrains/Roboto.
- Use design tokens from DESIGN.md. No random hex values.
- Never say "diagnosis". Use "risk flag, decision support, doctor decides". Label demo data "Simulated data".
- The API contract and lib/types.ts are frozen. Do not change them without telling me.
- When done, run lint and build, fix errors, then summarise what changed and append one line to the Status log in docs/MEMORY.md.

Confirm you understand by listing my role's tasks for the current phase, then wait for my go-ahead.
```

---

# PHASE 0: Foundations (all together, ~45 min)

### Vedesh (lead)
```
Phase 0, Vedesh. Set up the project:
1. Scaffold Next.js 14 (App Router, TypeScript, Tailwind) in the current folder. Install: @supabase/supabase-js recharts lucide-react framer-motion.
2. Create app/fonts.ts exporting Montserrat (600,700,800), DM_Sans (400,500,700) and Sora (500,600,700) via next/font/google as CSS variables --font-display, --font-body, --font-data. Apply them in app/layout.tsx. These are the only fonts in the project.
3. Create route groups with placeholder pages: app/(patient)/patient, app/(family)/family, app/(doctor)/doctor, app/(admin)/admin, app/sim.
4. Build the landing page at app/page.tsx: Montserrat hero "Your phone's health data, in your doctor's hands.", and four role cards (Patient, Doctor, Family, Admin) that set a `role` cookie and redirect to the matching route. Keep styling simple; Swapin will polish.
5. Add .env.example with the variables from ARCHITECTURE.md section 10, .gitignore for .env*, and a README with run instructions.
6. Initialise git, create branch vedesh/patient, and list the exact commands I need to push and connect Vercel.
```

### Aryan
```
Phase 0, Aryan. Backend foundations:
1. Write supabase/schema.sql for every table in ARCHITECTURE.md section 3, with sensible types, foreign keys and indexes (patient_id + timestamp).
2. Write supabase/seed.sql: 1 doctor (Dr. Meera Rao, Sunrise Clinic), 3 patients (Ramesh K. 62 Hindi diabetes+BP, Anita S. 54 Kannada BP, Suresh P. 48 English diabetes), their medicines (Ramesh: Metformin 08:00/20:00, Amlodipine 08:00), 14 days of realistic history for each (med_logs, BP, steps, glucose), family members (Karan for Ramesh), default consents all true. Make Ramesh slightly worsening over the last 4 days but still Yellow, so a single "miss dose + BP spike" in the demo pushes him to Red.
3. Write lib/types.ts with TypeScript types for every table and every API request/response in ARCHITECTURE.md section 7. This file is frozen after I confirm.
4. Create lib/supabase/client.ts (browser) and server.ts (service role), plus lib/supabase/localStore.ts: an in-memory store with the same interface, enabled when USE_LOCAL_STORE=true.
5. Output the SQL I should paste into the Supabase SQL editor, in order.
```

### Swapin
```
Phase 0, Swapin. Design foundations:
1. Create design/tokens.css containing every CSS variable from DESIGN.md section 3, plus font variables mapped to --font-display / --font-body / --font-data.
2. Extend tailwind.config.ts with these tokens (colors, borderRadius, boxShadow, fontFamily display/body/data). Do not add any other font.
3. Create components/ui/ with typed, accessible implementations of Button, Card, RiskBadge, StatTile. Variants and sizes per DESIGN.md section 5. Risk badges always show icon + text label.
4. Create a temporary page app/design-preview/page.tsx showing every component and the full type scale, so we can eyeball fonts and colours in one place.
5. List anything in DESIGN.md that is unclear so I can resolve it in Figma.
```

### Aman
```
Phase 0, Aman. Doctor portal skeleton:
1. Under app/(doctor)/doctor create layout.tsx with a 64px top bar (CareBridge wordmark in Montserrat, "Dr. Meera Rao", Sunrise Clinic) and a two-pane layout: left patient list (380px), right detail panel.
2. Create page.tsx (list view) and [id]/page.tsx (detail) with static mock data typed from lib/types.ts, so we can see the structure before the API exists.
3. Add a footer line on doctor views: "Decision support only. Not a diagnosis. Simulated data."
4. Keep it unstyled-but-structured; use Swapin's components/ui as they land. Do not create your own button or badge components.
```

---

# PHASE 1: Core build (~2h15)

### Vedesh
```
Phase 1, Vedesh. Build the patient and family core:
1. Patient home (app/(patient)/patient/page.tsx), mobile-first 440px column. Greeting "Good Morning, Ramesh ji" (Montserrat), three StatTiles (steps, medicines taken x/y, BP) using Sora for numbers, and a big "next medicine" card with a 48px+ Taken button. Fetch from GET /api/patients/:id.
2. Medicines page: list from the API, tap Taken -> POST /api/patients/:id/med-log, optimistic UI, toast.
3. BP entry: simple form (systolic/diastolic) -> POST /api/patients/:id/vitals.
4. Family view (app/(family)/family): today's status card and an alert feed from GET /api/family/:id/feed, with 3 s polling.
5. Bottom tab bar: Home, Medicines, Family, Me.
6. lib/i18n: en/hi/kn dictionaries with ~30 keys (greeting, taken, missed, medicine, steps, BP, reminders, buttons) and a language switcher persisted in localStorage. Hindi and Kannada strings must be natural, not literal.
7. Every screen needs loading, empty and error states. Body text >= 18px on patient screens.
Use Swapin's components/ui where they exist; if one is missing, stub it locally and note it in MEMORY.md.
```

### Aman
```
Phase 1, Aman. Build the doctor core:
1. Patient list: GET /api/patients, render PatientRow with RiskBadge, name, age, top reason, last seen. Sorted by score descending. Filters: All / Red / Yellow / Green.
2. Live updates: subscribe to Supabase Realtime on risk_scores and alerts; fall back to 3 s polling if the subscription fails. Use framer-motion `layout` so rows slide when the order changes.
3. Patient detail: header with name, age, conditions; BP trend and steps trend charts (Recharts, teal line, threshold band); medicine log table with taken/missed/pending chips; recent alerts.
4. "Why flagged" panel: ReasonList from risk.reasons, each with rule icon, plain text and weight chip. Add an empty state "No active flags".
5. Respect consent: when a category is hidden by the API, show "Patient has not shared this" instead of a blank.
6. Sora for all numbers and badges; DM Sans for table text.
```

### Swapin
```
Phase 1, Swapin. Finish the core design system in code:
1. Add PatientRow, ReasonList, MedicineCard, AlertItem, TrendChart wrapper, Toast to components/ui, per DESIGN.md. Typed props, no data fetching inside.
2. Add an Illustration component that renders an SVG with a blob layer offset 6px from a line layer, and create 2 original SVG illustrations: (a) an elderly man holding a phone with a dog at his feet, (b) a doctor with a tablet. Navy 2px hand-drawn-looking strokes, flat colour blobs from the --blob-* tokens. Original artwork only.
3. Audit app/(patient) and app/(doctor) pages for: wrong fonts, off-token colours, small touch targets, missing states. Produce a fix list file design/REVIEW.md grouped by owner, then apply fixes only inside components/ui.
```

### Aryan
```
Phase 1, Aryan. Build the API and risk engine:
1. lib/risk/rules.ts: the 8 rules from ARCHITECTURE.md section 4 as a config array (id, label, weight, evaluate(snapshot) -> {hit, text}). Plain-language reason text with real numbers, e.g. "Missed 3 of last 5 Metformin doses".
2. lib/risk/compute.ts: pure computeRisk(snapshot) -> {score, band, reasons[]}. Cap 100, bands 0-39/40-69/70-100. Add a quick test script (node) with 5 cases including Ramesh before/after the demo events.
3. Implement all routes in ARCHITECTURE.md section 7 with Next.js route handlers, typed with lib/types.ts. On every med-log or vitals write: rebuild the snapshot, recompute risk, store risk_scores + risk_reasons, create an alert if the band worsens.
4. GET /api/patients returns the sorted list with topReason. GET /api/patients/:id respects consents and writes an audit_log row for doctor views.
5. /api/sim/event supports miss_dose, bp_spike, steps_drop, recover. /api/sim/reset restores seed state.
6. Return consistent JSON errors. Provide curl examples for every route in docs/API_EXAMPLES.md.
```

---

# PHASE 2: Wow features (~2h)

### Aryan
```
Phase 2, Aryan. Escalation + AI + ROI:
1. lib/escalation: implement the ladder from ARCHITECTURE.md section 5. POST /api/escalation/tick checks pending missed doses and fires reminder -> family -> doctor alerts based on elapsed time. Read NEXT_PUBLIC_DEMO_MODE to use 10 s / 25 s delays instead of 30 min / 2 h. Idempotent: never fire the same level twice for the same missed dose.
2. lib/ai/brief.ts: build a compact 14-day JSON (adherence %, BP series, steps avg, alerts, current reasons) and call the LLM via LLM_PROVIDER. System prompt: max 90 words, three parts (Since last visit / Concerns / Suggested checks), no diagnosis, no dosing advice, end with "Doctor decides." Timeout 4 s; on failure or missing key, return a template fallback built from the same JSON. Store in briefs with source 'llm' or 'fallback'.
3. POST /api/patients/:id/brief using the above. 
4. GET /api/admin/roi: patientsMonitored, alertsActioned (from alerts + doctor actions), readmissionsPrevented and doctorHoursSaved as clearly-labelled estimates computed from simple documented assumptions (put assumptions in the response as `assumptions[]`).
5. POST /api/doctor/actions: store the action, create a patient-facing alert, return a confirmation message.
6. Build app/sim/page.tsx: a plain control panel with a patient picker, buttons (Miss dose, BP spike, Steps drop, Recover, Fast-forward escalation, Reset demo) and a live log of fired alerts.
```

### Vedesh
```
Phase 2, Vedesh. Voice logging:
1. lib/voice/useSpeech.ts: a hook around the Web Speech API (SpeechRecognition / webkitSpeechRecognition) with language param en-IN | hi-IN | kn-IN, states idle/listening/processing/error, interim + final transcript, and a graceful fallback flag if unsupported.
2. lib/voice/intent.ts: a deterministic keyword intent parser (no LLM). Handle: medicine taken (e.g. "maine dawai le li", "dawai li", "medicine tiskondidini", "took my medicine"), BP reading (e.g. "BP 130 by 85", "bp 130 over 85", numbers in Hindi digits words optional), unknown. Include a test table of at least 15 phrases across the three languages and run it.
3. Voice screen (P3): big circular mic VoiceButton with pulsing ring, language chip, live transcript, recognised intent shown as a confirm card ("Log Metformin as taken?") with Yes/No, then call the same API as the tap flow.
4. If speech is unsupported or the mic is blocked, show a typed input that runs through the same intent parser.
5. Make family feed show escalation alerts live with a distinct icon per level.
```

### Aman
```
Phase 2, Aman. Doctor actions + brief + admin:
1. BriefPanel drawer on the patient detail page: "Pre-consult brief" button -> POST /api/patients/:id/brief; show skeleton loader, then the text split into the three parts; show source chip "AI" or "Template"; footer "Decision support only. Doctor decides."
2. One-tap actions bar: Call patient, Send message, Book teleconsult -> POST /api/doctor/actions, show a toast and add it to the alert timeline.
3. When a patient flips to Red, animate the row (slide to top, brief highlight pulse) and show a top-bar notification chip "1 new urgent patient".
4. Admin ROI page (app/(admin)/admin): StatTiles for patients monitored, alerts actioned, readmissions prevented (est.), doctor-hours saved (est.), plus a small chart of alerts per day. Show the `assumptions[]` list under an "How we estimate this" accordion.
```

### Swapin
```
Phase 2, Swapin. Final screens and motion:
1. Add VoiceButton, BriefPanel, ConsentToggle, AuditRow, and an EmptyState component (with a small illustration slot) to components/ui.
2. Create 2 more original SVG illustrations: family member on a video call, and a hero scene for the landing page (3 people + a dog + phone, line art with offset colour blocks, echoing the reference theme without copying it).
3. Redesign the landing page at app/page.tsx in code: Montserrat 800 stacked hero, DM Sans subhead, two CTAs (teal primary, indigo secondary), hero illustration at right, role cards below. Keep Vedesh's cookie/redirect logic intact; change only markup and styles.
4. Add motion utilities per DESIGN.md section 7 (badge swap, mic pulse, list slide) as reusable framer-motion variants in design/motion.ts. Respect prefers-reduced-motion.
5. Update design/REVIEW.md with a second fix list; apply what falls inside components/ui.
```

---

# PHASE 3: Extras and polish (optional, ~1.5h)

### Aman
```
Phase 3, Aman. Build the consent/audit view on the doctor side: an "Access log" tab on patient detail listing AuditRow items from GET /api/patients/:id/audit (who, what category, when), and a small "Shared data" panel showing which categories the patient has enabled. Hidden categories show "Patient has not shared this".
```

### Vedesh
```
Phase 3, Vedesh. Build the patient consent screen (P5): ConsentToggle per category (vitals, medicines, steps, glucose) wired to PUT /api/patients/:id/consents with optimistic updates, plus an "Who viewed my data" list from GET /api/patients/:id/audit. Add plain-language copy in en/hi/kn: "You decide what your doctor can see."
```

### Aryan
```
Phase 3, Aryan. (1) Enforce consent filtering across every doctor-facing endpoint and risk computation inputs, so hidden categories are excluded and the reasons list never leaks them. (2) Stretch only if everything else is done: POST /api/patients/:id/prescription-scan accepting an image, using a vision model to extract medicine names + times into medicines rows; show confidence and require patient confirmation. Fall back to a sample result if the API fails.
```

### Swapin
```
Phase 3, Swapin. Polish pass across the whole app: loading/empty/error states, mobile breakpoints for patient and family, tablet breakpoint for doctor, focus rings, contrast check against WCAG AA, and a font audit: grep the codebase for any font-family not in {Montserrat, DM Sans, Sora} and for any use of mono/Arial/Inter/Roboto/Calibri/JetBrains; fix all hits. Report what you changed.
```

---

# PHASE 4: Demo hardening

### Vedesh (lead)
```
Phase 4, Vedesh. Integration check: run the full demo script in docs/TASKS.md against the local app. For each step, confirm it works and list any failure with the file and line likely responsible. Then: (1) write the submission description (problem, solution, what is built vs roadmap, explicit "all data simulated" disclosure), (2) draft a 2-minute spoken demo script with timing, (3) list the 5 toughest questions judges may ask with honest short answers (moat, regulation, alert fatigue, data accuracy, business model).
```

### Aryan
```
Phase 4, Aryan. Reliability: verify /api/sim/reset restores exactly the demo start state; verify USE_LOCAL_STORE=true runs the whole app with no Supabase; verify the brief fallback triggers when LLM_API_KEY is missing; add basic rate limiting-free input validation to all POST routes; confirm no secret is exposed to the client bundle.
```

### Aman
```
Phase 4, Aman. Test the doctor and admin views at 1366x768 and 1920x1080 (projector sizes). Fix overflow, truncation, and anything unreadable at a distance (increase key text to >= 16px). Make sure the Red-flip animation is visible from the back of a room.
```

### Swapin
```
Phase 4, Swapin. Final visual QA against Figma: spacing, type scale, colour tokens, illustration alignment. Fix only visual bugs. Produce 4 clean screenshots (landing, patient home, doctor list with a Red patient, doctor detail with brief open) at 2x for the submission.
```

---

## Prompt hygiene tips
- One prompt at a time. Do not stack three phases in one message.
- If the agent starts touching files outside your role, stop it: "Revert changes outside <your folders>."
- If the agent suggests a new font: "No. Only Montserrat, DM Sans, Sora."
- If something takes more than 45 minutes, cut scope and tell the group.
