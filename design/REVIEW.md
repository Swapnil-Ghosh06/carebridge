# CareBridge Design System Review & Audit (Phase 1)
**Author / Auditor:** Swapin (Design & UI System Lead)  
**Date:** Phase 1 Checkpoint  
**Target:** Strict adherence to `DESIGN.md`, `RULES.md`, and WCAG AA Accessibility.

---

## 1. Executive Summary & Design System Status

All core Phase 0 and Phase 1 UI components are fully implemented, typed, and accessible in `@/components/ui`:

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
| `Illustration` | ✅ Done | Hand-drawn 2px line art + 6px offset flat colour blobs | Original vector artwork (Patient+dog, Doctor+tablet) |

---

## 2. Audit Findings & Fix List by Owner

### 👤 Vedesh — Patient App (`app/(patient)`) & Family App (`app/(family)`)

1. **Touch Target Sizing (Critical for Elderly Users):**
   - **Requirement:** Every interactive button, pill, or card must meet minimum **48px** height/width.
   - **Action:** Use `Button` with `size="md"` or `size="lg"`. For medicine checkboxes, use `MedicineCard` with the built-in 48px Taken CTA.
2. **Typography Scale:**
   - **Requirement:** Patient app default body text must be **>= 18px / 20px** (use `text-lg` or `text-[20px] font-body`). Never use small `text-xs` or `text-sm` for core patient instructions.
   - Use `font-display` (Montserrat) for headings ("Good Morning, Ramesh ji") and `font-data` (Sora) for vital numbers (BP, Steps, Glucose).
3. **Mandatory States:**
   - Implement **Loading Skeleton** (`Card` placeholder or shimmering pulse), **Empty State** (e.g. "No medicines due this afternoon"), and **Error State** (offline/API failure fallback).
4. **Copy Tone & Plain Language:**
   - Strictly follow `DESIGN.md §8`: "Time for Metformin." instead of clinical jargon like "Medication adherence required."

---

### 👤 Aman — Doctor Portal (`app/(doctor)`) & Admin (`app/(admin)`)

1. **Font Consistency:**
   - **Table/List Data:** Use `font-body` (DM Sans) for clinical reason descriptions and patient condition tags.
   - **Numbers & Scores:** Use `font-data` (Sora) for all numbers, risk scores, systolic/diastolic values, step counts, and percentages.
   - **Headings & Names:** Use `font-display` (Montserrat) for patient names, section titles, and top bar wordmarks.
   - *Grep check:* Never import or use Inter, Roboto, Arial, or monospace fonts.
2. **Risk Colors Isolation:**
   - **Strict Rule:** Never use `text-[var(--risk-red)]` or `bg-[var(--risk-red)]` directly for general UI accents or non-risk text.
   - Always render risk levels through `<RiskBadge band="red" | "amber" | "green" />` or the pre-configured `<PatientRow />`.
3. **Empty & Consent States:**
   - "Why flagged" panel: when no active flags are present, render `<ReasonList reasons={[]} />` which automatically displays the friendly green checkmark empty state ("No active clinical flags").
   - When a patient has revoked consent for a category, render a muted Card with: *"Patient has not shared this data"*.
4. **Layout & Motion:**
   - Enable Framer Motion `layout` prop on the patient list so judges visually see patients slide smoothly to the top when risk worsens.

---

### 👤 Aryan — API, Simulator & Store (`app/sim`, `lib/`)

1. **Consistent Reason Weights & Labels:**
   - Ensure the 8 risk rules in `lib/risk/rules.ts` supply human-readable `text` (e.g., "Missed 3 consecutive doses of Metformin 500mg") and integer `weight` matching the contract in `ARCHITECTURE.md §4`.
2. **Deterministic Status & Error Responses:**
   - Return clean `{ error: string }` JSON bodies with standard HTTP status codes (400, 404, 500) so frontend components trigger the proper `<Toast type="error" />`.

---

## 3. Visual & Token Checklist for All Pages

- [x] Background color is `--surface-50` (`#F7F9FC`).
- [x] Primary cards use `--surface-0` (`#FFFFFF`) with `--r-lg` (`22px`) and `--shadow-card`.
- [x] Text contrast meets WCAG AA (headline: `--ink-900`, body: `--ink-700` or `--ink-500`).
- [x] Strictly three fonts loaded: Montserrat, DM Sans, Sora.
- [x] All SVGs use 2px navy stroke (`#0B1F4B`) with 6px offset color blobs (`--blob-*`).
- [x] Interactive elements provide visible focus rings (`focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)]`).

*Audit completed by Swapin. Use `@/components/ui` for all interface primitives.*
