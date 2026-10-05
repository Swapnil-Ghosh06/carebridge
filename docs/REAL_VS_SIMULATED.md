# CareBridge: What is Real vs. Simulated

**Document for Hackathon Judges & Evaluators**  
**Team:** poweredbycaffine  

---

## 1. Summary Matrix

| Capability | Real Implementation | Simulated in Prototype |
|---|---|---|
| **Web Speech Recognition** | **100% Real** (Runs in-browser via Web Speech API in Hindi, Kannada, and Indian English). | None. Real microphone input processed live. |
| **Voice Intent Parser** | **100% Real** (Deterministic keyword & pattern matcher in `lib/voice/intent.ts`). | None. Real string pattern parsing with numeric extraction. |
| **Risk Scoring Engine** | **100% Real** (Deterministic 8-rule scoring algorithm evaluated in TS). | Patient historical vitals fed as input data. |
| **Escalation Timing** | **100% Real Logic** (Multi-tier state machine transitioning from reminder $\to$ family $\to$ doctor). | Timers accelerated for demo ($10\text{s} / 25\text{s}$ instead of $30\text{m} / 2\text{h}$). |
| **Pre-Consult Brief (AI)** | **100% Real LLM** (Ollama `llama3.2` running local inference with 4s timeout & template fallback). | Seeded medical chart prompt context. |
| **Multi-Language (i18n)** | **100% Real** (Custom locale engine with localStorage persistence for EN, HI, KN). | None. |
| **Data Privacy & Consent** | **100% Real UI & State** (DPDP Act compliant category toggles + audit log). | Backend persistence via in-memory store in demo mode. |
| **Patient Biometrics** | — | **Simulated** (14-day history for Ramesh K., Anita S., Suresh P. created for realistic clinical edge-cases). |
| **User Authentication** | — | **Simulated** (Role-switcher cookie instead of OAuth/SMS OTP to speed up judge evaluation). |
| **Clinical Decisions** | — | **Doctor Decides** (No automated diagnoses; system provides triage flags only). |

---

## 2. Why We Simulated Specific Components

1. **Patient Biometric Data:**
   - Real continuous telemetry requires weeks of clinical trial deployment and IRB ethics approval. We seeded 14-day longitudinal trends demonstrating exact clinical failure modes (e.g. rising systolic trend, missed Metformin streak) to test the triage engine rigorously.
2. **Escalation Timers:**
   - In real clinical deployment, patient reminders escalate to family in 30 minutes and to doctors in 2 hours. In our demo mode (`NEXT_PUBLIC_DEMO_MODE=true`), these delays are accelerated to 10 seconds and 25 seconds so evaluators can witness the entire lifecycle during a 2-minute pitch.
3. **Role Switcher vs. Real Auth:**
   - Bypassing 2FA/SMS OTP allows judges to switch instantaneously between Patient, Family, Doctor, and Admin viewpoints without login friction.

---

## 3. Clinical & Safety Principles Adhered To

- **Never Say "Diagnosis":** The system strictly outputs *risk flags*, *decision support*, and *suggested checks*.
- **No Automated Dosage Alterations:** The system never prescribes medication changes.
- **Explainable by Design:** Every risk score links directly to visible, human-readable reasons (e.g., *"Missed 2 consecutive evening Metformin doses"*).
