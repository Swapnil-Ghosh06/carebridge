// lib/mockData.ts
// Fallback seed data matching ARCHITECTURE.md and TASKS.md specifications

import { Patient, Medicine, MedLog, Vital, Alert, FamilyFeedResponse } from './types';

export const HERO_PATIENT: Patient = {
  id: 'patient-ramesh',
  name: 'Ramesh K.',
  age: 62,
  language: 'hi',
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  doctorId: 'doc-meera',
  familyId: 'fam-karan',
  createdAt: '2026-09-01T00:00:00.000Z',
};

export const SEED_MEDICINES: Medicine[] = [
  {
    id: 'med-telmisartan',
    patientId: 'patient-ramesh',
    name: 'Telmisartan',
    dose: '40 mg',
    times: ['08:00 AM'],
    instructions: 'Take with morning water',
  },
  {
    id: 'med-metformin-morning',
    patientId: 'patient-ramesh',
    name: 'Metformin',
    dose: '500 mg',
    times: ['08:30 AM'],
    instructions: 'After breakfast',
  },
  {
    id: 'med-metformin-night',
    patientId: 'patient-ramesh',
    name: 'Metformin',
    dose: '500 mg',
    times: ['08:30 PM'],
    instructions: 'After dinner',
  },
  {
    id: 'med-atorvastatin',
    patientId: 'patient-ramesh',
    name: 'Atorvastatin',
    dose: '10 mg',
    times: ['09:30 PM'],
    instructions: 'Before bedtime',
  },
];

export const INITIAL_MED_LOGS: MedLog[] = [
  {
    id: 'log-1',
    patientId: 'patient-ramesh',
    medicineId: 'med-telmisartan',
    scheduledAt: '08:00 AM',
    takenAt: '08:15 AM',
    status: 'taken',
  },
  {
    id: 'log-2',
    patientId: 'patient-ramesh',
    medicineId: 'med-metformin-morning',
    scheduledAt: '08:30 AM',
    takenAt: '08:45 AM',
    status: 'taken',
  },
  {
    id: 'log-3',
    patientId: 'patient-ramesh',
    medicineId: 'med-metformin-night',
    scheduledAt: '08:30 PM',
    takenAt: null,
    status: 'pending',
  },
  {
    id: 'log-4',
    patientId: 'patient-ramesh',
    medicineId: 'med-atorvastatin',
    scheduledAt: '09:30 PM',
    takenAt: null,
    status: 'pending',
  },
];

export const INITIAL_VITALS: Vital[] = [
  {
    id: 'vital-bp-1',
    patientId: 'patient-ramesh',
    type: 'bp',
    valueA: 138,
    valueB: 88,
    recordedAt: 'Today, 07:45 AM',
  },
  {
    id: 'vital-steps-1',
    patientId: 'patient-ramesh',
    type: 'steps',
    valueA: 4210,
    valueB: null,
    recordedAt: 'Today, Live sync',
  },
  {
    id: 'vital-glucose-1',
    patientId: 'patient-ramesh',
    type: 'glucose',
    valueA: 142,
    valueB: null,
    recordedAt: 'Yesterday, Fasting',
  },
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alert-1',
    patientId: 'patient-ramesh',
    level: 'reminder',
    audience: 'patient',
    message: 'Time for evening Metformin 500mg after dinner.',
    createdAt: '10 mins ago',
    acknowledgedAt: null,
  },
  {
    id: 'alert-2',
    patientId: 'patient-ramesh',
    level: 'family',
    audience: 'family',
    message: 'Ramesh ji has not logged evening medicine yet. Sent gentle reminder.',
    createdAt: '25 mins ago',
    acknowledgedAt: null,
  },
];

export const INITIAL_FAMILY_FEED: FamilyFeedResponse = {
  patient: {
    id: 'patient-ramesh',
    name: 'Ramesh K.',
    age: 62,
    band: 'yellow',
    score: 48,
    lastSeen: '12 mins ago',
  },
  today: {
    adherencePct: 67,
    medicinesTaken: 2,
    medicinesTotal: 4,
    latestBp: '138 / 88 mmHg',
    latestSteps: 4210,
  },
  alerts: [
    {
      id: 'fam-alert-1',
      patientId: 'patient-ramesh',
      level: 'reminder',
      audience: 'family',
      message: 'Morning doses (Telmisartan & Metformin) taken on time at 8:45 AM.',
      createdAt: '4 hours ago',
      acknowledgedAt: '4 hours ago',
    },
    {
      id: 'fam-alert-2',
      patientId: 'patient-ramesh',
      level: 'family',
      audience: 'family',
      message: 'Blood Pressure checked: 138/88 mmHg. Slightly elevated but stable.',
      createdAt: 'Today, 8:00 AM',
      acknowledgedAt: null,
    },
    {
      id: 'fam-alert-3',
      patientId: 'patient-ramesh',
      level: 'doctor',
      audience: 'doctor',
      message: 'Pre-visit health summary generated for Dr. Meera Rao (Decision support).',
      createdAt: 'Yesterday',
      acknowledgedAt: null,
    },
  ],
};

export const INITIAL_CONSENTS: { category: 'vitals' | 'medicines' | 'steps' | 'glucose'; granted: boolean; title: string; description: string }[] = [
  {
    category: 'vitals',
    granted: true,
    title: 'Blood Pressure & Heart Rate',
    description: 'Share systolic, diastolic readings and pulse logs with Dr. Rao and family.',
  },
  {
    category: 'medicines',
    granted: true,
    title: 'Daily Medication Schedule',
    description: 'Share dose times, morning/evening confirmations, and adherence streak with family.',
  },
  {
    category: 'steps',
    granted: true,
    title: 'Daily Step Count & Activity',
    description: 'Share pedometer steps to evaluate mobility and physical recovery.',
  },
  {
    category: 'glucose',
    granted: false,
    title: 'Blood Sugar & Glucose Tests',
    description: 'Share fasting and post-meal glucose records (currently restricted by patient).',
  },
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'audit-1',
    actor: 'Dr. Meera Rao (Sunrise Clinic)',
    action: 'Viewed patient dashboard & BP trend',
    category: 'vitals',
    at: 'Today, 10:14 AM',
  },
  {
    id: 'audit-2',
    actor: 'Karan K. (Family)',
    action: 'Received medicine adherence update',
    category: 'medicines',
    at: 'Today, 08:45 AM',
  },
  {
    id: 'audit-3',
    actor: 'CareBridge Engine',
    action: 'Generated decision support pre-consult brief',
    category: 'vitals',
    at: 'Yesterday, 06:30 PM',
  },
];

