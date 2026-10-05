# CareBridge — Hackathon Submission Kit

**Team Name:** poweredbycaffine  
**Track:** Healthcare / Digital Public Goods / AI for Good  
**Repository:** [https://github.com/cooldude698/carebridge](https://github.com/cooldude698/carebridge)  
**Live Application:** Vercel deployment (Production Next.js 14)  

---

## 1. Executive Summary & Problem Statement

In India, chronic care patients (hypertension, diabetes, post-discharge heart failure) face a critical remote monitoring gap. Over 68% of elderly patients struggle with complex digital health portals due to language barriers, small touch targets, and cognitive overload. Meanwhile, family members living in distant cities suffer from anxiety without actionable updates, and primary care doctors are overwhelmed by raw, unprioritized patient data.

**The Consequences:**
- High 30-day post-discharge readmission rates (~18–22%).
- Silent medication non-adherence and unmanaged blood pressure spikes.
- Doctor alert fatigue caused by unstructured telemetry.

---

## 2. Our Solution: CareBridge

**CareBridge** connects the patient, their family, and their treating physician through a continuous, closed-loop care monitoring system designed specifically for Indian demographics.

### Core Innovations:
1. **Zero-Friction Multilingual Voice Logging:**
   - Seniors don't type. They speak naturally in their mother tongue (*Hindi, Kannada, or Indian English*).
   - Instant local intent parser identifies medication intake (*"maine dawai le li"*, *"medicine tiskondidini"*) and vitals (*"BP 138 by 88"*).
2. **Deterministic, Explainable Risk Engine:**
   - Clinical risk is scored transparently (0–100) using 8 rules (adherence drops, consecutive missed doses, BP trends, fasting glucose).
   - Generates plain-language clinical reasons for physicians rather than black-box AI outputs.
3. **Automated 3-Stage Escalation Ladder:**
   - $T+0$: Gentle reminder ping sent directly to the patient.
   - $T+\Delta 1$ (10s in demo / 30m in prod): Family receives actionable notification with one-tap nudge.
   - $T+\Delta 2$ (25s in demo / 2h in prod): Clinic and doctor notified with an AI pre-consult brief.
4. **Consent-Driven Transparency (DPDP Act Compliant):**
   - Patients have granular toggle control over which categories (*vitals, medicines, steps, glucose*) are shared.
   - Immutable audit trail displays who viewed records and when.

---

## 3. What We Built (Live & Working Prototype)

| Layer | Implementation | Details |
|---|---|---|
| **Framework** | Next.js 14 (App Router) + TypeScript | 14 routes (static & dynamic), 0 lint errors, clean build |
| **Styling & Tokens** | Tailwind CSS + Custom Tokens | Strictly 3 fonts: Montserrat (display), DM Sans (body $\ge 18\text{px}$), Sora (numbers/data) |
| **Voice Logging** | Web Speech API + Regex Intent Parser | `hi-IN`, `kn-IN`, `en-IN` support with typed input fallback |
| **Patient App** | Single-column mobile-first UI | Home, Daily Schedule, BP Logger, Voice Screen, Consent Settings |
| **Family Feed** | Real-time Care Feed | 3-second auto-polling, F1 status overview, F2 escalation ladder |
| **i18n Engine** | Custom locale manager (`lib/i18n`) | ~35 natural, culturally warm keys in English, Hindi, and Kannada |
| **Doctor & Admin** | Clinical Portal & ROI Calculator | Risk-sorted patient queue, trend charts, AI pre-consult brief |
| **Local LLM Layer** | Ollama (`llama3.2`) + Fallback | Runs locally, zero cloud API keys required, demo-safe |

---

## 4. What Is Built vs. Future Roadmap

### Built in Prototype:
- [x] End-to-end multilingual patient portal with voice and tactile logging.
- [x] Family real-time care feed with multi-stage escalation ladder.
- [x] Transparent rule-based risk scoring engine with weighted reasons.
- [x] Pre-consult AI briefing engine via local Ollama `llama3.2` with offline template fallback.
- [x] Granular consent management and access audit logs.
- [x] Multi-role switcher for live judge demonstrations.

### Tier 3 Roadmap (Post-Hackathon):
- **ABDM / FHIR M3 Compliance:** Direct sync with Ayushman Bharat Digital Mission health IDs and locker.
- **BLE Peripheral Sync:** Direct Bluetooth pairing with Omron BP cuffs and Accu-Chek glucometers.
- **Computer Vision Prescription Scanner:** Camera OCR to parse medicine names and auto-populate schedules.
- **Offline PWA & WhatsApp Bot:** Lightweight WhatsApp bot for rural patients without smartphone storage.

---

## 5. Simulated Data & Clinical Decision Disclosure

> **Mandatory Disclosure:**  
> All patient names, medical histories, vitals readings, and clinic details displayed in this prototype are **simulated data** generated for demonstration purposes.  
> CareBridge provides **decision support and triage assistance only**. It does not diagnose medical conditions or alter drug dosages. **The doctor always decides.**

---

## 6. Team Contributions

- **Vedesh (Lead):** Project architecture, patient application, family feed, voice logging engine, multilingual i18n, consent manager, design system integration.
- **Aman:** Doctor clinical portal, patient detail view, "Why flagged" panel, Admin ROI impact calculator.
- **Swapin:** UI/UX design, design system primitives (`components/ui`), typography, color tokens, and Figma frames.
- **Aryan:** Backend route handlers, database schema, deterministic risk engine, local Ollama brief generator, simulator panel.
