# CareBridge Tasks (tick as you go)

Roles: **V** = Vedesh (lead, patient + family app, voice, i18n) | **A** = Aman (doctor portal, admin ROI) | **S** = Swapin (UI/UX, design system, illustrations) | **R** = Aryan (backend, risk engine, AI, simulator)

Time boxes assume you start about 22:30 tonight. Shift to match your real submission time. Adjust, do not abandon, the order.

## Phase 0: Foundations (22:30-23:15, ~45 min, everyone together)
- [ ] V: Create repo, Next.js 14 + TS + Tailwind, push to GitHub, invite team, set up Vercel
- [ ] V: Add `app/fonts.ts` with Montserrat, DM Sans, Sora via `next/font/google`
- [ ] R: Create Supabase project, run `schema.sql`, `seed.sql`, share env vars privately
- [ ] R: Write `lib/types.ts` and freeze the API contract (ARCHITECTURE section 7)
- [ ] S: Push `design/tokens.css` and Tailwind theme extension from DESIGN.md
- [ ] A: Create doctor route skeleton, layout and role-switcher on landing
- [ ] ALL: Read RULES.md and MEMORY.md; create your branch
- Checkpoint 0: `main` deploys to Vercel and shows the landing page in all three fonts.

## Phase 1: Core build (23:15-01:30, ~2h15)
V (patient + family):
- [ ] Patient home: greeting, steps/medicines/BP tiles, next medicine card
- [ ] Medicine list and "Taken" action wired to `POST /med-log`
- [ ] BP entry form wired to `POST /vitals`
- [ ] Family feed screen wired to `GET /family/:id/feed`
- [ ] i18n scaffold with en/hi/kn for ~30 key strings

A (doctor):
- [ ] Patient list with `PatientRow` + `RiskBadge`, sorted by score
- [ ] Patient detail page: profile, BP/steps trend charts, medicine log
- [ ] "Why flagged" panel using `ReasonList`
- [ ] Supabase Realtime (or 3 s polling) so list updates live

S (UI/UX):
- [ ] Figma: tokens + component set + P2, D1, D2 frames first
- [ ] Build `components/ui`: Button, Card, RiskBadge, StatTile, PatientRow, ReasonList (in that order)
- [ ] Deliver hero illustration + patient/phone illustration SVGs
- [ ] Review V and A screens at 01:00 and give a fix list

R (backend):
- [ ] All routes in the API contract returning real data
- [ ] `lib/risk` engine with the 8 rules and unit-style quick tests
- [ ] Recompute risk on every med-log and vitals write; store reasons
- [ ] `/api/sim/event` and `/api/sim/reset`
- Checkpoint 1 (01:30): Patient logs medicine -> doctor list updates. If this fails, stop everything else and fix it.

## Phase 2: The wow features (01:30-03:30, ~2h)
R:
- [ ] Escalation ladder + `/api/escalation/tick` + demo-mode delays
- [ ] `lib/ai` brief generator with fallback + `POST /brief`
- [ ] `/api/admin/roi` computed from seeded counters plus live alerts actioned
V:
- [ ] Voice logging hook (`lib/voice`) with hi-IN/kn-IN/en-IN + intent parser + typed fallback
- [ ] Voice screen UI (listening, recognised text, confirm)
- [ ] Family alert feed shows escalation messages live
A:
- [ ] Brief drawer (`BriefPanel`) with loading and fallback states
- [ ] One-tap actions (call, message, teleconsult) with toast + alert record
- [ ] Admin ROI panel
S:
- [ ] Final screens: P3 voice, D3 brief, F1/F2, A1 in Figma
- [ ] Motion spec: list re-sort slide, badge swap, mic pulse
- [ ] Polish pass on V and A UI in code (spacing, type scale, states)
- Checkpoint 2 (03:30): Full demo scenario runs once end-to-end, even if ugly.

## Phase 3: P1 extras + polish (03:30-05:00, optional if tired)
- [ ] A: Consent dashboard + audit log UI (needs R's `/consents`, `/audit`)
- [ ] R: Audit writes on every doctor view; consent filtering in `GET /patients/:id`
- [ ] V: Consent settings screen for patient (P5)
- [ ] S: Empty/loading/error states across all screens; mobile responsiveness pass
- [ ] R (stretch): Prescription scan with a vision model
- Hard stop on new features at 05:00. Then sleep 3-4 hours in shifts if possible.

## Phase 4: Demo hardening (morning, before submission)
- [ ] ALL: Run the demo script 3 times from `/sim` reset; fix only blockers
- [ ] R: Seed data sanity and `USE_LOCAL_STORE` fallback verified
- [ ] V: Test on a real phone with mic permission; test the venue network
- [ ] A: Test on the presentation laptop and projector resolution
- [ ] S: Final visual QA, check fonts are only the three allowed
- [ ] V: Record a 2-minute backup video of the full scenario
- [ ] V: Write the submission text: problem, solution, what's built vs roadmap, simulated-data disclosure
- [ ] ALL: Final deploy on Vercel, copy the URL, open it in a fresh browser to verify

## Phase 5: Submission kit
- [ ] Live URL + GitHub link
- [ ] Demo video (backup)
- [ ] 1-page "what's real vs simulated" note
- [ ] Roadmap slide (Tier 3 items)
- [ ] Who built what: V patient/family + lead, A doctor/admin, S design, R backend/AI

## Demo script (practice until boring)
1. Landing -> pick Patient. Show Hindi greeting. Say "maine dawai le li" -> logged.
2. Open `/sim` (second screen): click "Miss dose" for Ramesh.
3. Patient screen shows reminder. Fast-forward: family phone gets ping.
4. Click "BP spike". Doctor list: Ramesh slides to top, RED.
5. Open Ramesh: read "Why flagged" (3 reasons). Open AI brief.
6. Tap "Call patient". Toast confirms; alert recorded.
7. Admin ROI: show impact numbers. Close with consent + audit (if built) and roadmap.
