# CareBridge

> **Hackathon prototype** – CRCE · Team: poweredbycaffine  
> All data is simulated. Decision support only. Not a diagnosis.

## Team ownership
| Person | Role | Folders |
|---|---|---|
| Vedesh | Lead · Patient app · Family view · Voice · i18n | `app/(patient)`, `app/(family)`, `lib/voice`, `lib/i18n` |
| Aman | Doctor portal · Admin ROI | `app/(doctor)`, `app/(admin)`, `components/doctor` |
| Swapin | UI/UX · Design system | `components/ui`, `design/` |
| Aryan | Backend · Risk engine · AI · Simulator | `app/api`, `lib/risk`, `lib/ai`, `lib/escalation`, `supabase/` |

## Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + CSS variables (`design/tokens.css`)
- **DB + Realtime**: Supabase (Postgres + Realtime)
- **Charts**: Recharts
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Fonts**: Montserrat · DM Sans · Sora (no other fonts)
- **Hosting**: Vercel

## Running locally

```bash
# 1. Clone & install
git clone https://github.com/cooldude698/carebridge.git
cd carebridge
npm install

# 2. Set up env
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, etc.
# OR set USE_LOCAL_STORE=true to skip Supabase entirely

# 3. Dev server
npm run dev
# Open http://localhost:3000
```

## Vercel deploy

1. Push to GitHub (`git push origin main`)
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables from `.env.example`
4. Deploy — preview URL appears automatically on every push

## Demo script
See `docs/TASKS.md` → "Demo script" section.

## Constraints (non-negotiable)
- Fonts: **only** Montserrat, DM Sans, Sora
- All data labelled **"Simulated data"**
- Never use the word "diagnosis" — use "risk flag, decision support, doctor decides"
- API contract frozen in `docs/ARCHITECTURE.md` section 7
