# CareBridge Design System Review & Audit (Phase 1 & Phase 2)
**Author / Auditor:** Swapin (Design & UI System Lead)  
**Date:** Phase 2 Checkpoint  
**Target:** Strict adherence to `DESIGN.md`, `RULES.md`, and WCAG AA Accessibility.

---

## 1. Executive Summary & Design System Status

All core Phase 0, Phase 1, and Phase 2 UI components are fully implemented, typed, and accessible in `@/components/ui`:

| Component | Status | Purpose | Strict Rule Checked |
|---|---|---|---|
| `Button` | ✅ Done | Primary (teal), Secondary (indigo), Ghost, Danger | Min height >= 48px, `--r-pill`, Montserrat 700 |
| `Card` | ✅ Done | Surface cards with `--r-lg` and `--shadow-card` | Header, Body, Footer compound structure |
| `RiskBadge` | ✅ Done | Red / Amber / Green patient risk badges | **Icon + Text + Sora font ALWAYS**. Colors isolated |
| `StatTile` | ✅ Done | Vitals and metric KPI tiles | Large Sora number, DM Sans label, trend indicators |
| `PatientRow` | ✅ Done | Doctor portal patient list item | Avatar initials, Montserrat name, Sora score, keyboard focus |
| `ReasonList` | ✅ Done | "Why flagged" clinical reasoning panel | Weight chips, rule icons, empty state ("No active flags") |
| `MedicineCard` | ✅ Done | Patient schedule card with 1-tap "Taken" button | Large >= 48px touch target, status chips |
| `AlertItem` | ✅ Done | Feed / Escalation alert items | Distinction for reminder, family, doctor, urgent |
| `TrendChart` | ✅ Done | Recharts wrapper with clinical threshold bands | Teal primary stroke, Sora axis numbers, custom tooltip |
| `Toast` | ✅ Done | Action confirmations and alerts | Success, Info, Warning, Error |
| `VoiceButton` | ✅ Done | Multilingual voice logging with pulsing waves | Framer motion pulse rings, 72px target, en/hi/kn chip |
| `BriefPanel` | ✅ Done | AI pre-consult summary 3-part drawer | Since last visit / Concerns / Suggested checks + disclaimer |
| `ConsentToggle`| ✅ Done | Granular patient category privacy controls | Plain language copy, accessible switch, 4 categories |
| `AuditRow` | ✅ Done | Data access transparency logs | Accessor, data category, action, Sora timestamp |
| `EmptyState` | ✅ Done | Friendly zero-data state with illustration slot | Title, body, optional CTA, vector illustration |
| `Illustration` | ✅ Done | 4 original hand-drawn vector art scenes | 2.5px navy lines + 6px offset flat colour blobs |

---

## 2. Audit Findings & Fix List by Owner

### 👤 Vedesh — Patient App (`app/(patient)`) & Family App (`app/(family)`)

1. **Voice Screen (P3):**
   - Use `<VoiceButton state={state} language={language} onToggle={...} />` for speech logging.
   - When intent is recognised (e.g., "Metformin taken"), render confirmation card with `<Button variant="primary">Yes</Button>` and `<Button variant="ghost">No</Button>`.
2. **Patient Home & Medicines (P2/P4):**
   - Use `<MedicineCard />` with the built-in 48px Taken action and optimistic UI.
   - Keep body text size **>= 18px / 20px** (`text-lg font-body`) for all core patient text.
3. **Consent Settings (P5):**
   - Use `<ConsentToggle />` for vitals, medicines, steps, glucose. Show plain-language headline: *"You decide what your doctor can see."*
4. **Family Feed (F1/F2):**
   - Use `<AlertItem />` with level-specific badges for reminder, family, doctor, and urgent escalations.

---

### 👤 Aman — Doctor Portal (`app/(doctor)`) & Admin (`app/(admin)`)

1. **Patient Queue & Real-Time Sort:**
   - Use `<PatientRow />` inside a `<motion.div layout>` container so rows visibly animate and slide to the top when a patient worsens to Red.
2. **Pre-Consult Brief (D3):**
   - Use `<BriefPanel />` with the 3 structured sections (Since last visit, Concerns, Suggested checks).
   - Display the source badge ("AI Generated" vs "Template") and preserve the disclaimer footer: *"Decision support only. Doctor decides. Simulated data."*
3. **Access Transparency (D4):**
   - Use `<AuditRow />` in the Access Log tab to show who viewed what category and when.
4. **Admin ROI Panel (A1):**
   - Use `<StatTile size="lg" />` for patients monitored, alerts actioned, readmissions prevented (est.), and doctor hours saved (est.).

---

### 👤 Aryan — API, Escalation & Simulator (`app/sim`, `lib/`)

1. **Simulator Control Panel (`app/sim/page.tsx`):**
   - Ensure demo reset (`/api/sim/reset`) and event injection buttons (Miss dose, BP spike, Steps drop, Recover) trigger clear feedback via `<Toast />`.
2. **Escalation Demo Timing:**
   - Verify `NEXT_PUBLIC_DEMO_MODE=true` accelerates ladder delays to 10s (family) and 25s (doctor).

---

## 3. Motion & Animation Tokens (`design/motion.ts`)

- `badgeSwapVariants`: 200ms scale pop + color fade.
- `micPulseVariants`: 1.6s ease-out continuous wave rings.
- `listItemVariants` / FLIP layout: Smooth 220ms list re-ordering.
- `drawerVariants`: 300ms ease-out slide from right.

*Audit updated by Swapin for Phase 2.*
