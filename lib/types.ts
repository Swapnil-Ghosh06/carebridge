// lib/types.ts
// Comprehensive CareBridge data models and API contract

export type RiskBand = 'green' | 'yellow' | 'red';
export type ConsentCategory = 'vitals' | 'medicines' | 'steps' | 'glucose';

export type AlertLevel = 'reminder' | 'family' | 'doctor';
export type AlertAudience = 'patient' | 'family' | 'doctor';

export interface Patient {
  id: string;
  name: string;
  age: number;
  language: 'hi' | 'kn' | 'en' | 'Hindi' | 'Kannada' | 'English' | string;
  conditions: string[];
  doctorId?: string;
  doctor_id?: string;
  familyId?: string;
  family_id?: string;
  createdAt?: string;
  created_at?: string;
}

export interface Doctor {
  id: string;
  name: string;
  clinic: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  patientId?: string;
  patient_id?: string;
  phone: string;
}

export interface Medicine {
  id: string;
  patientId?: string;
  patient_id?: string;
  name: string;
  dose: string;
  times: string[]; // e.g. ['08:00', '20:00']
  instructions?: string;
}

export interface MedLog {
  id: string;
  patientId?: string;
  patient_id?: string;
  medicineId?: string;
  medicine_id?: string;
  medicine_name?: string;
  dose?: string;
  scheduledAt?: string;
  scheduled_at?: string;
  takenAt?: string | null;
  taken_at?: string | null;
  status: 'taken' | 'missed' | 'pending';
}

export interface Vital {
  id: string;
  patientId?: string;
  patient_id?: string;
  type: 'bp' | 'steps' | 'glucose';
  valueA?: number; // systolic for BP, count for steps, mg/dL for glucose
  value_a?: number;
  valueB?: number | null; // diastolic for BP
  value_b?: number | null;
  recordedAt?: string;
  recorded_at?: string;
}

export interface RiskScore {
  id: string;
  patientId?: string;
  patient_id?: string;
  score: number; // 0-100
  band: RiskBand;
  reasons?: RiskReason[];
  computedAt?: string;
  computed_at?: string;
}

export interface RiskReason {
  id?: string;
  risk_score_id?: string;
  ruleId?: string;
  rule_id?: string;
  text: string;
  weight: number;
}

export interface Alert {
  id: string;
  patientId?: string;
  patient_id?: string;
  level: AlertLevel;
  audience: AlertAudience;
  message: string;
  createdAt?: string;
  created_at?: string;
  acknowledgedAt?: string | null;
  acknowledged_at?: string | null;
}

export interface Consent {
  id?: string;
  patientId?: string;
  patient_id?: string;
  category: ConsentCategory;
  granted: boolean;
  updatedAt?: string;
  updated_at?: string;
}

export interface AuditLog {
  id: string;
  patientId?: string;
  patient_id?: string;
  actorType?: string;
  actor_type?: string;
  actorId?: string;
  actor_id?: string;
  actor?: string;
  action: string;
  category: string;
  createdAt?: string;
  created_at?: string;
  at?: string;
}

export interface AuditLogItem extends AuditLog {}

export interface Brief {
  id?: string;
  patient_id?: string;
  patientId?: string;
  text: string;
  source: 'llm' | 'fallback';
  created_at?: string;
  createdAt?: string;
  sections?: {
    sinceLastVisit: string;
    concerns: string;
    suggestedChecks: string;
  };
}

export interface PatientListItem {
  id: string;
  name: string;
  age: number;
  score: number;
  band: RiskBand;
  topReason: string;
  lastSeen: string;
  conditions?: string[];
}

export interface PatientDetail {
  profile: Patient;
  vitals: Vital[];
  medLogs: MedLog[];
  risk: {
    score: number;
    band: RiskBand;
    reasons: RiskReason[];
  };
  alerts: Alert[];
  consents?: Consent[];
}

export interface PatientDetailResponse extends PatientDetail {
  medicines?: Medicine[];
}

export interface DoctorActionRequest {
  patientId: string;
  type: 'call' | 'message' | 'teleconsult';
  note?: string;
}

export interface DoctorActionResponse {
  success: boolean;
  message: string;
  actionRecord: {
    id: string;
    patientId: string;
    type: 'call' | 'message' | 'teleconsult';
    timestamp: string;
  };
}

export interface AdminROIResponse {
  readmissionsPrevented: number;
  doctorHoursSaved: number;
  alertsActioned: number;
  patientsMonitored: number;
  assumptions: string[];
  alertsPerDay: {
    date: string;
    count: number;
  }[];
}

export interface FamilyFeedResponse {
  patient: {
    id: string;
    name: string;
    age: number;
    band: RiskBand;
    score: number;
    lastSeen: string;
  };
  today: {
    adherencePct: number;
    medicinesTaken: number;
    medicinesTotal: number;
    latestBp: string | null;
    latestSteps: number;
  };
  alerts: Alert[];
}
