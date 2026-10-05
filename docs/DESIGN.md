# CareBridge Design System (Daisy × Claud Neo-Editorial Edition)
*Crafted for the CareBridge Chronic Care Management Platform*

---

## 1. Visual Direction & Atmosphere
Inspired by the high-craft artistic editorial design of **Daisy** and the whimsical tactile brutalism of **Claud**:

- **Tactile Paper Canvas**: Warm cream/ivory artist paper background (`#FBF9F4`) overlaid with a delicate graph paper grid (`28px × 28px`).
- **High-Contrast Carbon Outlines**: Crisp `2px solid #121214` ink strokes across cards, buttons, badges, and illustrations.
- **Neo-Brutalist Tactile Shadows**: Offset hard drop-shadows (`3px 3px 0px #121214` and `4px 4px 0px #121214`) that give physical depth and a satisfying click/press sensation.
- **Scrapbook Fan & Collages**: Tilted polaroid cards, rotated sticky note tags (`-4°` to `+4°`), circular stamp badges, and surrealist medical/botanical art collages.
- **Playful Character Accents**: Whimsical cartoon cloud mascots, smiling pills, hand-drawn stethoscopes, and ribbon doodles that make healthcare warm and human.

---

## 2. Color Palette & Tokens

### Canvas & Ink
| Token | Hex | Usage |
|---|---|---|
| `--canvas-paper` | `#FBF9F4` | Primary warm paper background |
| `--canvas-grid` | `#E8E4D8` | Delicate 28px square graph paper grid lines |
| `--ink-900` | `#121214` | Primary text, 2px borders, tactile shadows |
| `--ink-700` | `#2D2D35` | Secondary text, subheads |
| `--ink-500` | `#5F5F6E` | Tertiary notes, metadata |
| `--ink-300` | `#D5D2C7` | Muted hairline borders |

### Pastel & Highlight Accents (Daisy × Claud)
| Token | Hex | Usage |
|---|---|---|
| `--accent-pink` | `#FF5C98` | Fluorescent highlighter marker for key hero keywords |
| `--accent-lime` | `#D4F77C` | Pistachio green for primary CTA buttons & waitlist tags |
| `--accent-yellow` | `#FEE159` | Butter yellow for sticky notes & active alerts |
| `--accent-lavender` | `#EDE9FE` | Claud lilac/lavender for cloud badges & secondary cards |
| `--accent-mint` | `#6EE7B7` | Fresh mint for verified stamps & normal vitals |
| `--surface-card` | `#FFFFFF` | Crisp white card surfaces |

### Clinical Risk System (Reserved for Risk Badges & Status)
| Level | Text & Icon | Background | Border |
|---|---|---|---|
| **High Risk (Red)** | `#DC2626` | `#FEE2E2` | `2px solid #DC2626` or `#121214` |
| **Moderate (Amber)** | `#D97706` | `#FEF3C7` | `2px solid #D97706` or `#121214` |
| **Low Risk (Green)** | `#15803D` | `#DCFCE7` | `2px solid #15803D` or `#121214` |

---

## 3. Typography System
Three harmonized typefaces create editorial authority with tactile playfulness:

1. **Editorial Serif (`Playfair Display`)**:
   - Used for main headlines, hero titles, and section callouts.
   - Elegant, high-contrast, with italic accents and bold presence.
2. **Tactile Monospace (`Space Mono`)**:
   - Used for subheads, sticky note tags, clinical timestamps, pill labels, and metrics.
   - Provides a clean typewriter/field-notebook feeling.
3. **Modern Sans (`Plus Jakarta Sans` / `DM Sans`)**:
   - Used for dense body text, patient summaries, form inputs, and clinical briefs.
   - High legibility across screen sizes.

---

## 4. Tactile Components

### 1. The Fan Deck (Hero Centerpiece)
A hand-arranged stack of 5 overlapping tilted cards with real patient telemetry, sticky notes, and badges:
- **Card 1 (-4°)**: Senior Voice Logging Polaroid with Hindi speech bubble.
- **Card 2 (-2°)**: Clinical Rule Engine woodcut card with vintage heart illustration.
- **Card 3 (0°)**: "Let it Flow" baseline vitals poster with daisy floral illustration.
- **Card 4 (+2°)**: Doctor Pre-Consult AI Brief with Dr. Meera Rao portrait stamp.
- **Card 5 (+4°)**: Family WhatsApp Escalation & Hospital ROI card.

### 2. Interactive Feature Tabs
Rounded cards with 2px borders that switch between interactive states:
- "15-second pre-consult brief"
- "8 explainable triage rules"
- "Voice-first senior logging in Hindi/Kannada"
- "Multi-tier WhatsApp family alerts"

### 3. Live Simulation Sandbox
Embedded interactive triage tester with one-tap event injections (`BP Spike 155/95`, `Log Evening Meds`, `Step Drop`) demonstrating real-time risk re-scoring.

### 4. Claud-Style 4 Portals
Pastel cards with `#1`, `#2`, `#3`, `#4` black circle pills, cloud badges, and direct launch links to `/doctor`, `/patient`, `/family`, and `/admin`.
