# CareBridge — Live Demo Script & Rehearsal Guide

Practice this end-to-end 3 times before presenting to judges.  
**Target Duration:** Exactly 2 minutes.

---

## Pre-flight Checklist (Run 10 mins before your slot)
- [ ] Vercel deployment URL open in Google Chrome on the presentation laptop.
- [ ] Laptop audio / microphone permissions enabled for Chrome (`chrome://settings/content/microphone`).
- [ ] Second browser window or mobile phone open to `/family`.
- [ ] Simulator open in a split window at `/sim`.
- [ ] Ollama running locally if demonstrating live LLM brief: `ollama run llama3.2`.

---

## 2-Minute Pitch & Presentation Walkthrough

### Part 1: The Patient Experience (0:00 - 0:45)
1. **Open Landing Page (`/`):**
   - *"Good afternoon judges. Meet Ramesh K., a 62-year-old hypertension and diabetes patient living in Bengaluru."*
   - Click **"Continue as Patient"**.
2. **Patient Home (`/patient`):**
   - Point out the warm Hindi greeting: *"सुप्रभात, रमेश जी"* and the clean design tailored for seniors ($\ge 18\text{px}$ text, zero clutter).
   - Point out the 3 StatTiles: Steps ($4,210$), Medicines ($2/4$), and BP ($138/88$).
   - Switch language to Kannada or English to demonstrate instant multi-lingual i18n.
3. **Voice Health Logging (`/patient/voice`):**
   - Click the prominent **Voice Log** button.
   - Tap the pulsing microphone and speak:  
     👉 *"मैंने दवाई ले ली"* (or click the quick demo pill *"maine dawai le li"*).
   - Show the instant intent detection ($95\%$ match, Metformin $500\text{mg}$).
   - Click **"Confirm & Save"** $\to$ Show optimistic green checkmark toast.

---

### Part 2: The Family Care Loop (0:45 - 1:15)
1. **Open Family View (`/family`):**
   - *"Now, let's look at what Ramesh's son Karan sees on his phone in Bengaluru."*
   - Point to the **F1 Today's Status Card**: Shows Ramesh is active, with live risk band and vitals summary.
   - Point to the **F2 Escalation Ladder**:
     - Explain the 3-stage protocol: Patient reminder $\to$ Family ping $\to$ Clinic alert.
   - Click **"Send Reminder"** to show instant live sync.

---

### Part 3: Live Escalation & Doctor Triage (1:15 - 1:45)
1. **Open Simulator (`/sim`):**
   - Trigger a simulated event: Click **"Miss dose"** or **"BP Spike"** for Ramesh.
2. **Watch Real-Time Doctor Queue (`/doctor`):**
   - Ramesh automatically shifts to **High Risk (RED)** at the top of the queue.
   - Open Ramesh's profile:
     - Show **"Why Flagged"** panel: 3 transparent clinical reasons (*e.g., BP up 12% in 4 days, 2 consecutive missed doses*).
     - Show **Ollama Pre-Consult Brief**: Structured summary generated in under 4 seconds (*Since last visit / Concerns / Suggested checks*), ending with *"Doctor decides."*
3. **Take Action:**
   - Tap **"Call Patient"** or **"Message Family"** $\to$ Instant audit record generated.

---

### Part 4: Privacy & Conclusion (1:45 - 2:00)
1. **Patient Consent Settings (`/patient/consent`):**
   - *"Finally, CareBridge is built with patient trust at its core. Ramesh can selectively revoke sharing for sensitive lab tests like glucose with one tap."*
   - Show immutable access audit log.
2. **Closing Statement:**
   - *"CareBridge turns passive phone telemetry into timely family support and proactive clinical triage — saving lives and preventing hospital readmissions. Thank you."*

---

## Contingency Playbook (If anything goes wrong)
- **Venue WiFi drops:** The app operates on local mock state and Next.js static routes without crashing.
- **Microphone blocked by Chrome:** Click the demo quick-phrase buttons or use the **"Type manually"** input field on `/patient/voice`.
- **Ollama daemon not running:** The brief generator automatically renders the built-in clinical fallback template with zero user disruption.
