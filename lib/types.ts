export type RiskBand = "green" | "yellow" | "red";

export type ConsentCategory = "vitals" | "medicines" | "steps" | "glucose";

export interface Patient {
  id: string;
  name: string;
  age: number;
  language: "Hindi" | "Kannada" | "English" | string;
  conditions: string[];
  doctor_id: string;
  family_id: string;
  created_at: string;
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
  patient_id: string;
  phone: string;
}

export interface Medicine {
  id: string;
  patient_id: string;
  name: string;
  dose: string;
  times: string[];
}

export interface MedLog {
  id: string;
  patient_id: string;
  medicine_id: string;
  medicine_name?: string;
  dose?: string;
  scheduled_at: string;
  taken_at: string | null;
  status: "taken" | "missed" | "pending";
}

export interface Vital {
  id: string;
  patient_id: string;
  type: "bp" | "steps" | "glucose";
  value_a: number; // systolic for BP, count for steps, mg/dL for glucose
  value_b: number | null; // diastolic for BP
  recorded_at: string;
}

export interface RiskScore {
  id: string;
  patient_id: string;
  score: number;
  band: RiskBand;
  computed_at: string;
}

export interface RiskReason {
  id?: string;
  risk_score_id?: string;
  rule_id: string;
  text: string;
  weight: number;
}

export interface Alert {
  id: string;
  patient_id: string;
  level: "reminder" | "family" | "doctor";
  audience: "patient" | "family" | "doctor";
  message: string;
  created_at: string;
  acknowledged_at: string | null;
}

export interface Consent {
  id?: string;
  patient_id: string;
  category: ConsentCategory;
  granted: boolean;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  patient_id: string;
  actor_type: string;
  actor_id: string;
  actor?: string;
  action: string;
  category: string;
  created_at?: string;
  at?: string;
}

export interface Brief {
  id?: string;
  patient_id: string;
  text: string;
  source: "llm" | "fallback";
  created_at: string;
  sections?: {
    sinceLastVisit: string;
    concerns: string;
    suggestedChecks: string;
  };
}

// API DTOs

export interface PatientListItem {
  id: string;
  name: string;
  age: number;
  score: number;
  band: RiskBand;
  topReason: string;
  lastSeen: string;
  conditions: string[];
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

export interface DoctorActionRequest {
  patientId: string;
  type: "call" | "message" | "teleconsult";
  note?: string;
}

export interface DoctorActionResponse {
  success: boolean;
  message: string;
  actionRecord: {
    id: string;
    patientId: string;
    type: "call" | "message" | "teleconsult";
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
