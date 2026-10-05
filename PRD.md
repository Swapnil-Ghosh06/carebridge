# CareBridge PRD (Prototype v0.1)

Team: Vedesh (lead + patient app), Aman (doctor portal), Swapin (UI/UX), Aryan (backend + AI)
Deadline: prototype submission tomorrow. Scope is a demo-grade prototype, not production.

## 1. One-liner
Your phone's health data, now in your doctor's hands. CareBridge turns daily patient data into a risk-ranked action list for doctors, with family kept in the loop.

## 2. Problem
- Doctors see patients ~10 min every few months and miss what happens in between.
- Diabetes/BP patients forget medicines, skip walks, miss early warning signs.
- Post-discharge follow-up is thin, so avoidable readmissions happen.
- Health data sits in phone apps; doctors never see it; families worry but cannot help.

## 3. Users
| User | Who | Core need |
|---|---|---|
| Patient | Ramesh ji, 62, diabetes + BP, Hindi/Kannada speaker, low tech comfort | Simple daily routine, reminders, zero friction |
| Doctor | Dr. Meera, sees 40+ patients a day | Know who needs attention first, in under 30 seconds |
| Family | Son/daughter living elsewhere | Peace of mind, get alerted only when it matters |
| Hospital admin (secondary) | Clinic manager | Proof of fewer readmissions and saved doctor-hours |

## 4. Prototype goal
One flawless 2-minute demo story (the "Ramesh ji scenario") plus a working feel in every screen.

Demo story:
1. Ramesh ji's day starts; he logs a medicine by voice in Hindi.
2. Next day he misses Metformin. Reminder goes out.
3. Two hours later, no response: family (his son) is pinged.
4. BP creeps up (simulated). Risk score crosses threshold.
5. Doctor's dashboard flips Ramesh to RED, with the reasons listed.
6. Doctor taps "Pre-consult brief" and reads the AI summary.
7. Doctor taps "Call patient" / "Send message". Loop closed.
8. Admin ROI panel shows readmissions prevented and hours saved.

## 5. Scope

### P0: must ship (the demo breaks without these)
1. Patient app: home (steps, medicines, BP), log medicine, log BP, today's goals.
2. Voice logging (Hindi, Kannada, English) via Web Speech API.
3. Doctor portal: patient list ranked Red/Yellow/Green, patient detail with trends.
4. "Why flagged" panel: rule-based, human-readable reasons.
5. AI pre-consult brief (LLM, with canned fallback).
6. Escalation ladder: reminder -> family ping -> doctor red flag.
7. Family view: today's status plus alert feed.
8. Simulator: control panel to inject steps, BP, missed doses and to fast-forward time.

### P1: ship if P0 is done
- Consent dashboard with audit log (who viewed what, when).
- Hospital ROI panel.
- One-tap doctor actions (call, message, book teleconsult) with mocked outcomes.
- Prescription photo scan to build medicine schedule (vision model).

### P2: roadmap slide only
WhatsApp/IVR, pharmacy refill, meal photo analysis, real wearable sync, other chronic conditions.

## 6. Functional requirements
- FR1: A patient can log a medicine as taken via tap or voice; log is timestamped.
- FR2: A patient can log BP (systolic/diastolic) and steps are ingested from the simulator.
- FR3: Risk score (0-100) recalculates on every new data event.
- FR4: Score maps to band: 0-39 Green, 40-69 Yellow, 70-100 Red.
- FR5: Every band change stores a list of reasons (rule id + human text).
- FR6: Doctor list sorts by score descending, updates live without refresh.
- FR7: Missed dose triggers the escalation ladder with configurable delays (demo mode: seconds, not hours).
- FR8: Pre-consult brief returns in under 5 seconds, or the fallback template appears.
- FR9: Patient can toggle which data categories the doctor sees; doctor UI respects the toggles.
- FR10: Every doctor view of a patient writes an audit row.

## 7. Non-functional
- Works on phone-width (patient, family) and desktop (doctor, admin).
- Large touch targets and text for elderly patient screens (min 18px body, 48px targets).
- Language toggle: English, Hindi, Kannada for patient UI strings.
- Demo must survive no internet: LLM and voice have fallbacks.

## 8. Safety and compliance wording
- Never say "diagnose". Use "risk flag, doctor decides".
- Footer on doctor views: "Decision support only. Not a diagnosis."
- Consent first, data private, aligned with India's DPDP Act (state as a design intent, not a certification).
- All data in prototype is simulated and labelled "Simulated data".

## 9. Success criteria for judges
- Demo runs end-to-end without touching the DB manually.
- Doctor can explain why a patient is red within 5 seconds of looking.
- At least one regional-language interaction works live.
- ROI panel connects the product to the paying customer.

## 10. Open questions (decide tonight, then freeze)
1. LLM provider for the brief (Gemini or Claude API). Default: whichever key you already have.
2. Hosting: Vercel + Supabase. Default yes.
3. Judging criteria weights. Ask the organiser or check the brief.
