# CareBridge Rules (read before you touch anything)

These apply to every human and every AI agent (Claude Code, Antigravity, Cursor, whatever you use). Paste this file into your agent's context at the start of each session.

## 1. Fonts: strictly three, nothing else
| Role | Font | Use for |
|---|---|---|
| Primary | **Montserrat** | Headings, hero text, buttons, nav |
| Secondary | **DM Sans** (or Google Sans if licensed/available) | Body text, forms, labels, tables |
| Tertiary | **Sora** | Numbers, stats, risk scores, vitals, badges, charts |

Banned: JetBrains Mono, Arial, Calibri, Inter, Roboto, system-ui as a primary, Helvetica, Times, any monospace font. Do not add a fourth font for code blocks either; use Sora.
Fallback stack must still be only these: `font-family: 'Montserrat', 'DM Sans', sans-serif` is acceptable as a safety net, but never rely on it.
Load with `next/font/google` (self-hosted, no layout shift). One config file: `app/fonts.ts`. Nobody else imports fonts.

## 2. Design rules
- Use tokens from `DESIGN.md` only. No random hex values in components.
- Never invent a new colour, radius, or shadow. Ask Swapin.
- Risk colours (red/amber/green) are reserved for risk. Never use them for decoration.
- Always pair risk colour with a text label and an icon (accessibility).
- Patient screens: body text >= 18px, touch targets >= 48px, one primary action per screen.
- No emoji in UI. Use lucide icons.
- No generic AI-looking gradients, purple-on-white defaults, or stock card grids. Follow the illustration-led theme in `DESIGN.md`.

## 3. Code rules
- TypeScript strict. No `any` unless commented why.
- Folder ownership is law (see ARCHITECTURE.md section 2). Need a change in someone else's folder? Message them or open a 5-line PR; do not edit directly.
- API contract is frozen after Phase 0. Changing a route shape requires telling all four people in the group chat first.
- Shared types live in `lib/types.ts` (Aryan owns, everyone imports). Do not redefine types locally.
- No hardcoded patient data in components. Everything comes from the API or the seed.
- Keep components under ~150 lines. Split early.
- Every list/screen needs loading, empty and error states.
- No `console.log` left in committed code.

## 4. Git rules
- Branch per person: `vedesh/patient`, `aman/doctor`, `swapin/ui`, `aryan/backend`.
- Commit small, commit often. Format: `type(scope): message` e.g. `feat(doctor): add risk badge`.
- Pull `main` before you start each phase. Merge to `main` only at phase checkpoints.
- Never force-push `main`. Never commit `.env*`.
- At each checkpoint, the lead (Vedesh) runs the app from `main` and confirms nothing broke.

## 5. AI-agent rules (for the prompts)
- Read `docs/MEMORY.md` first, update it last.
- Do only the tasks assigned to your role in `docs/TASKS.md`. Do not "helpfully" refactor others' areas.
- If something is ambiguous, pick the simplest option, note it in MEMORY.md under Decisions, and move on.
- Do not install new dependencies without adding them to MEMORY.md under Dependencies.
- Run `npm run lint && npm run build` before saying a task is done.
- No placeholder lorem ipsum. Use realistic Indian names, clinic names and data.
- Never claim features that are not built.

## 6. Content and compliance rules
- Say "risk flag", "decision support", "doctor decides". Never "diagnosis", "treatment recommendation", "AI doctor".
- Label all demo data "Simulated data".
- Consent state must be respected in every doctor-facing query: if a category is off, hide it and show "Patient has not shared this".
- Do not name real hospitals, doctors or brands in the seed data.

## 7. Demo rules
- The demo scenario in PRD section 4 is the only path that must be perfect.
- Freeze features at the end of Phase 4. After that, only bug fixes.
- Always keep `NEXT_PUBLIC_DEMO_MODE=true` for the live demo.
- Everyone knows the reset button (`/sim`, "Reset demo") and uses it before every rehearsal.

## 8. Time rules
- If a task takes longer than 45 minutes, stop, say so in the group, and cut scope.
- P1 items are only started when all P0 items for your role are checked off.
- Sleep rule: someone must be on a fresh brain for the final rehearsal. Plan a 3-4 hour sleep window if possible.
