-- ==============================================================================
-- CareBridge Database Schema (PostgreSQL / Supabase)
-- ==============================================================================

-- Drop tables in reverse dependency order if recreating
DROP TABLE IF EXISTS patient_goals CASCADE;
DROP TABLE IF EXISTS doctor_notes CASCADE;
DROP TABLE IF EXISTS briefs CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS consents CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS risk_reasons CASCADE;
DROP TABLE IF EXISTS risk_scores CASCADE;
DROP TABLE IF EXISTS vitals CASCADE;
DROP TABLE IF EXISTS med_logs CASCADE;
DROP TABLE IF EXISTS medicines CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;

-- 1. Doctors
CREATE TABLE doctors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  clinic TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Patients
CREATE TABLE patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  language TEXT NOT NULL DEFAULT 'Hindi',
  conditions TEXT[] NOT NULL DEFAULT '{}',
  doctor_id TEXT REFERENCES doctors(id) ON DELETE SET NULL,
  family_id TEXT,
  discharged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Family Members
CREATE TABLE family_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Medicines
CREATE TABLE medicines (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dose TEXT NOT NULL,
  times TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Medication Logs
CREATE TABLE med_logs (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medicine_id TEXT NOT NULL REFERENCES medicines(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  taken_at TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('taken', 'missed', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Vitals (BP, Steps, Glucose, HR)
CREATE TABLE vitals (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('bp', 'steps', 'glucose', 'hr')),
  value_a NUMERIC NOT NULL,
  value_b NUMERIC,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Risk Scores
CREATE TABLE risk_scores (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  band TEXT NOT NULL CHECK (band IN ('green', 'yellow', 'red')),
  computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Risk Reasons
CREATE TABLE risk_reasons (
  id TEXT PRIMARY KEY,
  risk_score_id TEXT NOT NULL REFERENCES risk_scores(id) ON DELETE CASCADE,
  rule_id TEXT NOT NULL,
  text TEXT NOT NULL,
  weight INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Alerts
CREATE TABLE alerts (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  level TEXT NOT NULL CHECK (level IN ('reminder', 'family', 'doctor')),
  audience TEXT NOT NULL CHECK (audience IN ('patient', 'family', 'doctor')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ
);

-- 10. Consents (DPDP Act compliance)
CREATE TABLE consents (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('vitals', 'medicines', 'steps', 'glucose')),
  granted BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_patient_category UNIQUE (patient_id, category)
);

-- 11. Audit Log (Tracking all provider queries and actions)
CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  actor_type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  action TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Pre-Consult Briefs
CREATE TABLE briefs (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('llm', 'fallback')),
  sections JSONB,
  citations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Doctor Notes
CREATE TABLE doctor_notes (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id TEXT NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  parsed_instructions JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Patient Goals
CREATE TABLE patient_goals (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('steps', 'medicine', 'bp', 'glucose', 'other')),
  target TEXT NOT NULL,
  by_date DATE,
  source_note_id TEXT REFERENCES doctor_notes(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX idx_patients_doctor ON patients(doctor_id);
CREATE INDEX idx_med_logs_patient_time ON med_logs(patient_id, scheduled_at DESC);
CREATE INDEX idx_vitals_patient_time ON vitals(patient_id, recorded_at DESC);
CREATE INDEX idx_risk_scores_patient ON risk_scores(patient_id, computed_at DESC);
CREATE INDEX idx_risk_reasons_score ON risk_reasons(risk_score_id);
CREATE INDEX idx_alerts_patient ON alerts(patient_id, created_at DESC);
CREATE INDEX idx_alerts_audience ON alerts(audience, acknowledged_at);
CREATE INDEX idx_consents_patient ON consents(patient_id);
CREATE INDEX idx_audit_log_patient ON audit_log(patient_id, created_at DESC);
CREATE INDEX idx_doctor_notes_patient ON doctor_notes(patient_id, created_at DESC);
CREATE INDEX idx_patient_goals_patient ON patient_goals(patient_id, by_date ASC);

-- Enable Supabase Realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE risk_scores;
ALTER PUBLICATION supabase_realtime ADD TABLE alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE med_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE vitals;
