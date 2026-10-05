// lib/types.ts
// CareBridge frozen API contract & data model

export type RiskBand = 'green' | 'yellow' | 'red';

export type AlertLevel = 'reminder' | 'family' | 'doctor';
export type AlertAudience = 'patient' | 'family' | 'doctor';

export interface Patient {
  id: string;
  name: string;
  age: number;
  language: 'hi' | 'kn' | 'en';
  conditions: string[];
  doctorId: string;
  familyId: string;
  createdAt: string;
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
  patientId: string;
  phone: string;
}

export interface Medicine {
  id: string;
  patientId: string;
  name: string;
  dose: string;
  times: string[]; // e.g. ['08:00', '20:00']
  instructions?: string;
}

export interface MedLog {
  id: string;
  patientId: string;
  medicineId: string;
  scheduledAt: string;
  takenAt: string | null;
  status: 'taken' | 'missed' | 'pending';
}

export interface Vital {
  id: string;
  patientId: string;
  type: 'bp' | 'steps' | 'glucose';
  valueA: number; // systolic or steps count or glucose mg/dL
  valueB: number | null; // diastolic if bp
  recordedAt: string;
}

export interface RiskReason {
  id: string;
  ruleId: string;
  text: string;
  weight: number;
}

export interface RiskScore {
  id: string;
  patientId: string;
  score: number; // 0-100
  band: RiskBand;
  reasons: RiskReason[];
  computedAt: string;
}

export interface Alert {
  id: string;
  patientId: string;
  level: AlertLevel;
  audience: AlertAudience;
  message: string;
  createdAt: string;
  acknowledgedAt: string | null;
}

export interface Consent {
  id: string;
  patientId: string;
  category: 'vitals' | 'medicines' | 'steps' | 'glucose';
  granted: boolean;
  updatedAt: string;
}

export interface AuditLogItem {
  id: string;
  patientId: string;
  actorType: 'doctor' | 'family' | 'admin' | 'patient';
  actorId: string;
  action: string;
  category: string;
  createdAt: string;
}

export interface PatientDetailResponse {
  profile: Patient;
  vitals: Vital[];
  medLogs: MedLog[];
  medicines: Medicine[];
  risk: {
    score: number;
    band: RiskBand;
    reasons: RiskReason[];
  };
  alerts: Alert[];
}

export interface PatientListItem {
  id: string;
  name: string;
  age: number;
  score: number;
  band: RiskBand;
  topReason: string;
  lastSeen: string;
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
