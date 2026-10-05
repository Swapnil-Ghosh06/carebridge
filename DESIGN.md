# CareBridge Design System (owner: Swapin)

## 1. Theme direction
Reference: the "Where Work Happens" style. Calm white canvas, big confident headline, loose hand-drawn black line figures with flat, slightly off-register colour blocks (teal swoosh, coral, sunshine yellow, leaf green, sky blue, indigo). Friendly, human, a little playful, not clinical.

Applied to CareBridge:
- Healthcare without the cold hospital blue. Warm, human, trustworthy.
- Illustrations show real moments: an elderly man with a phone, a doctor with a tablet, a daughter on a video call, a pet dog nearby. Line art in navy/black, colour blobs behind or beside, never filling the whole figure.
- Colour blocks are offset from the line art by 4-8px, like misregistered print.
- Lots of white space. One idea per screen.
- Draw original illustrations. Do not trace or reuse the reference artwork or any Slack assets.

## 2. Typography (strictly three fonts)
| Token | Font | Weights |
|---|---|---|
| `--font-display` | Montserrat | 600, 700, 800 |
| `--font-body` | DM Sans | 400, 500, 700 |
| `--font-data` | Sora | 500, 600, 700 |

Scale (desktop / patient-mobile):
| Style | Font | Size | Line height | Weight |
|---|---|---|---|---|
| Hero | Montserrat | 56 / 38 | 1.05 | 800 |
| H1 | Montserrat | 36 / 28 | 1.15 | 700 |
| H2 | Montserrat | 24 / 22 | 1.25 | 700 |
| H3 | Montserrat | 18 / 18 | 1.3 | 600 |
| Body L (patient default) | DM Sans | 20 | 1.5 | 400 |
| Body | DM Sans | 16 | 1.5 | 400 |
| Label | DM Sans | 13 | 1.4 | 500 |
| Stat XL | Sora | 48 | 1.0 | 700 |
| Stat | Sora | 24 | 1.1 | 600 |
| Badge | Sora | 12 | 1.0 | 600, uppercase, +0.04em |

Hero headline style: tight tracking (-0.02em), 3-line stacked like the reference ("Your phone's / health data, / in your doctor's hands.").

## 3. Colour tokens
```css
:root {
  /* Ink and surface */
  --ink-900: #0B1F4B;     /* headlines, primary text (deep navy) */
  --ink-700: #2B3C66;
  --ink-500: #5B6B8C;     /* secondary text */
  --ink-300: #B7C0D4;     /* borders */
  --surface-0: #FFFFFF;
  --surface-50: #F7F9FC;  /* app background */
  --surface-100: #EEF2F8;

  /* Brand */
  --brand-teal: #14B8A6;      /* primary action, links */
  --brand-teal-600: #0F9B8C;  /* hover */
  --brand-mint: #5EEAD4;      /* highlights on dark */
  --brand-indigo: #4B3FB8;    /* secondary action, CTA like the reference */

  /* Illustration blocks (decorative only) */
  --blob-coral: #FF6B35;
  --blob-sun: #F2B01E;
  --blob-leaf: #5B8C2A;
  --blob-sky: #7FD6E8;
  --blob-indigo: #4B3FB8;
  --blob-teal: #2CC3A8;

  /* Risk (reserved) */
  --risk-red: #E5484D;   --risk-red-bg: #FDECEC;
  --risk-amber: #F5A524; --risk-amber-bg: #FEF3DC;
  --risk-green: #30A46C; --risk-green-bg: #E6F6EE;

  /* Radius, shadow */
  --r-sm: 8px; --r-md: 14px; --r-lg: 22px; --r-pill: 999px;
  --shadow-card: 0 1px 2px rgba(11,31,75,.06), 0 8px 24px rgba(11,31,75,.06);
}
@media (prefers-color-scheme: dark) { /* optional; skip for prototype */ }
```
Contrast: body text on surface must hit WCAG AA (4.5:1). `--ink-500` on `--surface-0` passes; do not go lighter.

## 4. Spacing and layout
- 4px base grid. Use 4, 8, 12, 16, 24, 32, 48, 72.
- Max content width: 1200px (portal), 440px (patient/family on mobile).
- Doctor portal: left list (380px) + right detail panel; top bar 64px.
- Patient app: single column, bottom tab bar (Home, Medicines, Family, Me), 72px tall.

## 5. Components (build in `components/ui`)
1. `Button`: primary (teal), secondary (indigo), ghost, danger. Pill radius, Montserrat 700, 48px min height.
2. `RiskBadge`: icon + label + Sora uppercase. Red/Amber/Green with bg tints.
3. `StatTile`: Sora number, DM Sans label, optional trend arrow.
4. `PatientRow`: avatar, name, age, top reason, badge, last seen.
5. `ReasonList`: "Why flagged" items with rule icon and weight chip.
6. `Card`: white, `--r-lg`, `--shadow-card`.
7. `MedicineCard`: name, dose, time, big "Taken" button.
8. `AlertItem`: level icon, message, time, acknowledge.
9. `TrendChart`: Recharts line, teal stroke, risk-coloured threshold band.
10. `VoiceButton`: large circular mic, pulsing ring when listening, language chip.
11. `ConsentToggle` and `AuditRow`.
12. `BriefPanel`: AI summary with "Simulated data" and "Decision support only" footer.
13. `Illustration` wrapper: SVG slot with blob + line layers.

## 6. Screens (Figma frames to deliver)
Patient (mobile 390x844):
- P1 Welcome / role pick
- P2 Home (greeting "Good Morning, Ramesh ji", steps/medicines/BP tiles, next medicine card)
- P3 Voice logging (listening state, recognised phrase, confirm)
- P4 Medicines list and log
- P5 Consent settings

Doctor (desktop 1440x900):
- D1 Patient list with risk ranking and filters
- D2 Patient detail: trends, Why flagged, alerts, actions
- D3 AI pre-consult brief (drawer)
- D4 Audit log tab

Family (mobile): F1 Today status, F2 Alert feed
Admin (desktop): A1 ROI panel
Sim (desktop): S1 Control panel (utilitarian, minimal styling is fine)

## 7. Motion
- 180-220ms ease-out for state changes. Risk badge swaps with a quick scale+colour fade.
- Doctor list re-sorts with a FLIP-style slide (framer-motion `layout`) so judges *see* Ramesh jump to the top.
- Voice button pulse while listening.
- Respect `prefers-reduced-motion`.

## 8. Copy tone
Warm, short, plain. Patient: "Time for Metformin." Not "Medication adherence required."
Doctor: factual, scannable. "BP up 12% in 4 days."
Hindi/Kannada strings come from `lib/i18n`; Swapin reviews length so buttons do not overflow.

## 9. Handoff
- Figma file with tokens as variables, components, and the frames above.
- Export tokens to `design/tokens.css` and `tailwind.config.ts` theme extension.
- Illustrations as SVG in `design/illustrations/` (min 4: hero, patient+phone, doctor+tablet, family call).
