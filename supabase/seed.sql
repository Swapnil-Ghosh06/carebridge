-- ==============================================================================
-- CareBridge Seed Data (Simulated Data for Demo & Evaluation)
-- ==============================================================================

-- Clear existing data
TRUNCATE TABLE briefs, audit_log, consents, alerts, risk_reasons, risk_scores, vitals, med_logs, medicines, family_members, patients, doctors CASCADE;

-- 1. Doctor
INSERT INTO doctors (id, name, clinic) VALUES
('d1', 'Dr. Meera Rao', 'Sunrise Clinic, Indiranagar');

-- 2. Patients
INSERT INTO patients (id, name, age, language, conditions, doctor_id, family_id, discharged_at, created_at) VALUES
('p1', 'Ramesh K.', 62, 'Hindi', ARRAY['Diabetes Type 2', 'Hypertension'], 'd1', 'f1', NOW() - INTERVAL '10 days', NOW() - INTERVAL '30 days'),
('p2', 'Anita S.', 54, 'Kannada', ARRAY['Hypertension'], 'd1', 'f2', NULL, NOW() - INTERVAL '30 days'),
('p3', 'Suresh P.', 48, 'English', ARRAY['Diabetes Type 2'], 'd1', 'f3', NULL, NOW() - INTERVAL '30 days');

-- 3. Family Members
INSERT INTO family_members (id, name, relation, patient_id, phone) VALUES
('f1', 'Karan K.', 'Son (Bengaluru)', 'p1', '+91 98450 12345'),
('f2', 'Priya S.', 'Daughter (Mysuru)', 'p2', '+91 98451 23456'),
('f3', 'Neha P.', 'Spouse (Bengaluru)', 'p3', '+91 98452 34567');

-- Update patient family reference
UPDATE patients SET family_id = 'f1' WHERE id = 'p1';
UPDATE patients SET family_id = 'f2' WHERE id = 'p2';
UPDATE patients SET family_id = 'f3' WHERE id = 'p3';

-- 4. Medicines
INSERT INTO medicines (id, patient_id, name, dose, times) VALUES
('m1', 'p1', 'Metformin', '500mg', ARRAY['08:00', '20:00']),
('m2', 'p1', 'Amlodipine', '5mg', ARRAY['08:00']),
('m3', 'p2', 'Telmisartan', '40mg', ARRAY['09:00']),
('m4', 'p2', 'Hydrochlorothiazide', '12.5mg', ARRAY['09:00']),
('m5', 'p3', 'Metformin', '500mg', ARRAY['08:30']);

-- 5. Consents (DPDP Act Compliance: All initially granted)
INSERT INTO consents (id, patient_id, category, granted, updated_at) VALUES
('c1', 'p1', 'vitals', TRUE, NOW()),
('c2', 'p1', 'medicines', TRUE, NOW()),
('c3', 'p1', 'steps', TRUE, NOW()),
('c4', 'p1', 'glucose', TRUE, NOW()),
('c5', 'p2', 'vitals', TRUE, NOW()),
('c6', 'p2', 'medicines', TRUE, NOW()),
('c7', 'p2', 'steps', TRUE, NOW()),
('c8', 'p2', 'glucose', TRUE, NOW()),
('c9', 'p3', 'vitals', TRUE, NOW()),
('c10', 'p3', 'medicines', TRUE, NOW()),
('c11', 'p3', 'steps', TRUE, NOW()),
('c12', 'p3', 'glucose', TRUE, NOW());

-- 6. 14 Days History for Ramesh K. (p1)
-- Days -14 to -5: Well-controlled
-- Days -4 to 0: Deteriorating (Yellow, 58 pts)
DO $$
DECLARE
  day_offset INT;
  curr_date TIMESTAMPTZ;
BEGIN
  FOR day_offset IN REVERSE 14..1 LOOP
    curr_date := (NOW() - (day_offset || ' days')::INTERVAL)::DATE + TIME '08:00:00';
    
    -- Morning Metformin (p1)
    INSERT INTO med_logs (id, patient_id, medicine_id, scheduled_at, taken_at, status)
    VALUES (
      'p1-m1-am-' || day_offset,
      'p1',
      'm1',
      curr_date,
      CASE WHEN day_offset IN (1, 2) THEN NULL ELSE curr_date + INTERVAL '15 minutes' END,
      CASE WHEN day_offset IN (1, 2) THEN 'missed' ELSE 'taken' END
    );

    -- Morning Amlodipine (p1)
    INSERT INTO med_logs (id, patient_id, medicine_id, scheduled_at, taken_at, status)
    VALUES (
      'p1-m2-' || day_offset,
      'p1',
      'm2',
      curr_date,
      CASE WHEN day_offset = 1 THEN NULL ELSE curr_date + INTERVAL '16 minutes' END,
      CASE WHEN day_offset = 1 THEN 'missed' ELSE 'taken' END
    );

    -- Evening Metformin (p1)
    INSERT INTO med_logs (id, patient_id, medicine_id, scheduled_at, taken_at, status)
    VALUES (
      'p1-m1-pm-' || day_offset,
      'p1',
      'm1',
      curr_date + INTERVAL '12 hours',
      CASE WHEN day_offset IN (2, 3) THEN NULL ELSE curr_date + INTERVAL '12 hours 20 minutes' END,
      CASE WHEN day_offset IN (2, 3) THEN 'missed' ELSE 'taken' END
    );

    -- Vitals (BP) - creeping up in the last 4 days
    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p1-bp-' || day_offset,
      'p1',
      'bp',
      CASE 
        WHEN day_offset > 4 THEN 128 + (day_offset % 5)
        WHEN day_offset = 4 THEN 138
        WHEN day_offset = 3 THEN 142
        WHEN day_offset = 2 THEN 144
        ELSE 146
      END,
      CASE 
        WHEN day_offset > 4 THEN 82 + (day_offset % 4)
        WHEN day_offset = 4 THEN 88
        WHEN day_offset = 3 THEN 90
        WHEN day_offset = 2 THEN 92
        ELSE 92
      END,
      curr_date + INTERVAL '1 hour'
    );

    -- Vitals (Steps) - falling from ~5,500 down to ~2,800
    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p1-steps-' || day_offset,
      'p1',
      'steps',
      CASE 
        WHEN day_offset > 4 THEN 5200 + (day_offset * 60)
        WHEN day_offset = 4 THEN 3800
        WHEN day_offset = 3 THEN 3200
        WHEN day_offset = 2 THEN 2900
        ELSE 2650
      END,
      NULL,
      curr_date + INTERVAL '13 hours'
    );

    -- Vitals (Glucose) - 135 to 168 mg/dL
    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p1-glu-' || day_offset,
      'p1',
      'glucose',
      CASE 
        WHEN day_offset > 4 THEN 135 + (day_offset % 10)
        ELSE 155 + (day_offset * 3)
      END,
      NULL,
      curr_date - INTERVAL '30 minutes'
    );

    -- Anita S. (p2) - consistent yellow, slightly elevated BP (138/88), adherence ~80%
    INSERT INTO med_logs (id, patient_id, medicine_id, scheduled_at, taken_at, status)
    VALUES (
      'p2-m3-' || day_offset,
      'p2',
      'm3',
      curr_date + INTERVAL '1 hour',
      CASE WHEN day_offset % 4 = 0 THEN NULL ELSE curr_date + INTERVAL '1 hour 15 minutes' END,
      CASE WHEN day_offset % 4 = 0 THEN 'missed' ELSE 'taken' END
    );

    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p2-bp-' || day_offset,
      'p2',
      'bp',
      136 + (day_offset % 4),
      86 + (day_offset % 3),
      curr_date + INTERVAL '2 hours'
    );

    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p2-steps-' || day_offset,
      'p2',
      'steps',
      4100 + (day_offset * 50),
      NULL,
      curr_date + INTERVAL '13 hours'
    );

    -- Suresh P. (p3) - green, adherence >95%, normal vitals (120/78), active (6,500 steps)
    INSERT INTO med_logs (id, patient_id, medicine_id, scheduled_at, taken_at, status)
    VALUES (
      'p3-m5-' || day_offset,
      'p3',
      'm5',
      curr_date + INTERVAL '30 minutes',
      curr_date + INTERVAL '40 minutes',
      'taken'
    );

    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p3-bp-' || day_offset,
      'p3',
      'bp',
      120 + (day_offset % 4),
      78 + (day_offset % 3),
      curr_date + INTERVAL '2 hours'
    );

    INSERT INTO vitals (id, patient_id, type, value_a, value_b, recorded_at)
    VALUES (
      'p3-steps-' || day_offset,
      'p3',
      'steps',
      6800 + (day_offset * 40),
      NULL,
      curr_date + INTERVAL '13 hours'
    );
  END LOOP;
END $$;

-- 7. Current Initial Risk Scores & Reasons
-- Ramesh K. starts at Yellow (58 points)
INSERT INTO risk_scores (id, patient_id, score, band, computed_at) VALUES
('rs-p1-init', 'p1', 58, 'yellow', NOW());

INSERT INTO risk_reasons (id, risk_score_id, rule_id, text, weight, created_at) VALUES
('rr-p1-1', 'rs-p1-init', 'BP_TREND_UP', 'Avg systolic BP up 9.4% over past 4 days (146/92 mmHg)', 20, NOW()),
('rr-p1-2', 'rs-p1-init', 'STEPS_DROP', 'Physical activity dropped 48% (2,650 vs 5,400 steps)', 10, NOW()),
('rr-p1-3', 'rs-p1-init', 'RECENT_DISCHARGE', 'Discharged from hospital 10 days ago (high-risk window)', 10, NOW()),
('rr-p1-4', 'rs-p1-init', 'MED_ADHERENCE_LOW', 'Adherence fell to 68% over past 7 days', 25, NOW());

-- Anita S. starts at Yellow (45 points)
INSERT INTO risk_scores (id, patient_id, score, band, computed_at) VALUES
('rs-p2-init', 'p2', 45, 'yellow', NOW());

INSERT INTO risk_reasons (id, risk_score_id, rule_id, text, weight, created_at) VALUES
('rr-p2-1', 'rs-p2-init', 'BP_HIGH_ABS', 'Systolic BP persistently above baseline (138/88 mmHg)', 20, NOW()),
('rr-p2-2', 'rs-p2-init', 'MED_ADHERENCE_LOW', 'Missed 3 doses in past 10 days (adherence ~78%)', 25, NOW());

-- Suresh P. starts at Green (10 points)
INSERT INTO risk_scores (id, patient_id, score, band, computed_at) VALUES
('rs-p3-init', 'p3', 10, 'green', NOW());

-- 8. Seed Alerts
INSERT INTO alerts (id, patient_id, level, audience, message, created_at, acknowledged_at) VALUES
('alt-1', 'p1', 'reminder', 'patient', 'Time for evening Metformin (500mg)', NOW() - INTERVAL '2 hours', NULL),
('alt-2', 'p1', 'family', 'family', 'Ramesh ji has not logged evening medication', NOW() - INTERVAL '1 hour', NULL),
('alt-3', 'p2', 'reminder', 'patient', 'Scheduled BP check reminder', NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours');

-- 9. Seed Audit Log (Doctor views)
INSERT INTO audit_log (id, patient_id, actor_type, actor_id, action, category, created_at) VALUES
('aud-1', 'p1', 'doctor', 'd1', 'VIEW_PROFILE', 'all', NOW() - INTERVAL '3 days'),
('aud-2', 'p1', 'doctor', 'd1', 'VIEW_VITALS', 'vitals', NOW() - INTERVAL '3 days'),
('aud-3', 'p2', 'doctor', 'd1', 'VIEW_PROFILE', 'all', NOW() - INTERVAL '1 day');
