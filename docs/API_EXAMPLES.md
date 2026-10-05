# CareBridge API Examples

All routes return `application/json`.
Base URL: `http://localhost:3000`

---

### 1. GET /api/patients
Returns risk-ranked list of patients for the doctor dashboard sorted descending by score.

```bash
curl -X GET http://localhost:3000/api/patients
```

**Response (200 OK):**
```json
[
  {
    "id": "p1",
    "name": "Ramesh K.",
    "age": 62,
    "score": 58,
    "band": "yellow",
    "topReason": "Avg systolic BP up 9.4% over past 4 days (146/92 mmHg)",
    "lastSeen": "2026-10-05T20:00:00.000Z",
    "conditions": ["Diabetes Type 2", "Hypertension"]
  },
  {
    "id": "p2",
    "name": "Anita S.",
    "age": 54,
    "score": 45,
    "band": "yellow",
    "topReason": "Systolic BP persistently above baseline (138/88 mmHg)",
    "lastSeen": "2026-10-05T19:30:00.000Z",
    "conditions": ["Hypertension"]
  },
  {
    "id": "p3",
    "name": "Suresh P.",
    "age": 48,
    "score": 10,
    "band": "green",
    "topReason": "Telemetry stable within normal limits",
    "lastSeen": "2026-10-05T18:00:00.000Z",
    "conditions": ["Diabetes Type 2"]
  }
]
```

---

### 2. GET /api/patients/:id
Returns detailed patient profile, vitals series, medication logs, dynamic risk breakdown, and alerts. Respects patient consent masking and writes an audit log row for doctor views.

```bash
curl -X GET "http://localhost:3000/api/patients/p1?actor=doctor"
```

---

### 3. POST /api/patients/:id/med-log
Logs medication intake (or missed dose) and immediately recomputes risk.

```bash
curl -X POST http://localhost:3000/api/patients/p1/med-log \
  -H "Content-Type: application/json" \
  -d '{"medicineId": "m1", "status": "taken"}'
```

---

### 4. POST /api/patients/:id/vitals
Logs patient vital sign (BP, steps, glucose) and recomputes risk.

```bash
curl -X POST http://localhost:3000/api/patients/p1/vitals \
  -H "Content-Type: application/json" \
  -d '{"type": "bp", "valueA": 154, "valueB": 96}'
```

---

### 5. POST /api/patients/:id/brief
Generates AI pre-consult brief with clinical template fallback (under 4s).

```bash
curl -X POST http://localhost:3000/api/patients/p1/brief
```

---

### 6. GET /api/patients/:id/consents
Retrieves patient data sharing consents under DPDP Act.

```bash
curl -X GET http://localhost:3000/api/patients/p1/consents
```

---

### 7. PUT /api/patients/:id/consents
Updates consent for a specific telemetry category (`vitals`, `medicines`, `steps`, `glucose`).

```bash
curl -X PUT http://localhost:3000/api/patients/p1/consents \
  -H "Content-Type: application/json" \
  -d '{"category": "steps", "granted": false}'
```

---

### 8. GET /api/patients/:id/audit
Retrieves audit access history for a patient's medical records.

```bash
curl -X GET http://localhost:3000/api/patients/p1/audit
```

---

### 9. GET /api/family/:id/feed
Returns today's health status and live alert stream for family members.

```bash
curl -X GET http://localhost:3000/api/family/p1/feed
```

---

### 10. POST /api/doctor/actions
Registers doctor action (call, message, teleconsult), creates patient alert, and logs audit record.

```bash
curl -X POST http://localhost:3000/api/doctor/actions \
  -H "Content-Type: application/json" \
  -d '{"patientId": "p1", "type": "call", "note": "Checked morning BP spike"}'
```

---

### 11. POST /api/escalation/tick
Checks missed doses and advances escalation ladder (T+0 reminder -> T+10s family -> T+25s doctor).

```bash
curl -X POST http://localhost:3000/api/escalation/tick \
  -H "Content-Type: application/json" \
  -d '{"forceStage": "doctor"}'
```

---

### 12. POST /api/sim/event
Injects simulated telemetry events for judge presentations (`miss_dose`, `bp_spike`, `steps_drop`, `recover`).

```bash
curl -X POST http://localhost:3000/api/sim/event \
  -H "Content-Type: application/json" \
  -d '{"patientId": "p1", "kind": "bp_spike", "params": {"systolic": 158, "diastolic": 98}}'
```

---

### 13. POST /api/sim/reset
Restores CareBridge database and in-memory store to initial demo baseline.

```bash
curl -X POST http://localhost:3000/api/sim/reset
```

---

### 14. GET /api/admin/roi
Calculates hospital and clinic ROI metrics (prevented readmissions, saved doctor-hours, actioned alerts).

```bash
curl -X GET http://localhost:3000/api/admin/roi
```
