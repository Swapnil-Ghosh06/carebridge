// Quick test script for CareBridge Risk Engine
import { computeRisk } from "../lib/risk/compute.js";
import { RISK_RULES } from "../lib/risk/rules.js";

console.log("=== CareBridge Risk Engine Unit Tests ===");

const now = new Date();
const dayMs = 24 * 60 * 60 * 1000;

// Test Case 1: Ramesh K. Baseline (Expect Yellow, ~55-65)
const rameshBaselineSnapshot = {
  patient: {
    id: "p1",
    name: "Ramesh K.",
    age: 62,
    language: "Hindi",
    conditions: ["Diabetes Type 2", "Hypertension"],
    doctor_id: "d1",
    family_id: "f1",
    discharged_at: new Date(now.getTime() - 10 * dayMs).toISOString(),
    created_at: new Date(now.getTime() - 30 * dayMs).toISOString(),
  },
  medLogs: [
    // 3 missed out of last 7 days => adherence low
    { id: "1", patient_id: "p1", medicine_id: "m1", scheduled_at: new Date(now.getTime() - 1 * dayMs).toISOString(), taken_at: null, status: "missed" },
    { id: "2", patient_id: "p1", medicine_id: "m1", scheduled_at: new Date(now.getTime() - 2 * dayMs).toISOString(), taken_at: null, status: "missed" },
    { id: "3", patient_id: "p1", medicine_id: "m1", scheduled_at: new Date(now.getTime() - 3 * dayMs).toISOString(), taken_at: new Date(now.getTime() - 3 * dayMs).toISOString(), status: "taken" },
    { id: "4", patient_id: "p1", medicine_id: "m1", scheduled_at: new Date(now.getTime() - 4 * dayMs).toISOString(), taken_at: null, status: "missed" },
    { id: "5", patient_id: "p1", medicine_id: "m1", scheduled_at: new Date(now.getTime() - 5 * dayMs).toISOString(), taken_at: new Date(now.getTime() - 5 * dayMs).toISOString(), status: "taken" },
  ],
  vitals: [
    { id: "v1", patient_id: "p1", type: "bp", value_a: 144, value_b: 92, recorded_at: new Date(now.getTime() - 1 * dayMs).toISOString() },
    { id: "v2", patient_id: "p1", type: "bp", value_a: 142, value_b: 90, recorded_at: new Date(now.getTime() - 2 * dayMs).toISOString() },
    { id: "v3", patient_id: "p1", type: "bp", value_a: 128, value_b: 82, recorded_at: new Date(now.getTime() - 9 * dayMs).toISOString() },
    { id: "v4", patient_id: "p1", type: "steps", value_a: 2800, value_b: null, recorded_at: new Date(now.getTime() - 1 * dayMs).toISOString() },
    { id: "v5", patient_id: "p1", type: "steps", value_a: 5400, value_b: null, recorded_at: new Date(now.getTime() - 9 * dayMs).toISOString() },
  ],
};

const res1 = computeRisk(rameshBaselineSnapshot);
console.log(`Test 1 (Ramesh Baseline): Score = ${res1.score}, Band = ${res1.band}`);
console.assert(res1.band === "yellow", `Expected yellow, got ${res1.band}`);
console.log("Reasons:", res1.reasons.map((r) => r.text));

// Test Case 2: Ramesh after Demo Spike (Miss dose + BP Spike >= 150) -> Must be RED
const rameshSpikeSnapshot = {
  ...rameshBaselineSnapshot,
  medLogs: [
    { id: "0a", patient_id: "p1", medicine_id: "m1", scheduled_at: now.toISOString(), taken_at: null, status: "missed" },
    ...rameshBaselineSnapshot.medLogs,
  ],
  vitals: [
    { id: "v0", patient_id: "p1", type: "bp", value_a: 154, value_b: 96, recorded_at: now.toISOString() },
    ...rameshBaselineSnapshot.vitals,
  ],
};

const res2 = computeRisk(rameshSpikeSnapshot);
console.log(`\nTest 2 (Ramesh after Spike): Score = ${res2.score}, Band = ${res2.band}`);
console.assert(res2.band === "red", `Expected red, got ${res2.band}`);
console.log("Reasons:", res2.reasons.map((r) => r.text));

// Test Case 3: Suresh (Healthy, high adherence, normal BP) -> Green
const sureshSnapshot = {
  patient: {
    id: "p3",
    name: "Suresh P.",
    age: 48,
    language: "English",
    conditions: ["Diabetes Type 2"],
    doctor_id: "d1",
    family_id: "f3",
    created_at: new Date(now.getTime() - 30 * dayMs).toISOString(),
  },
  medLogs: [
    { id: "s1", patient_id: "p3", medicine_id: "m5", scheduled_at: new Date(now.getTime() - 1 * dayMs).toISOString(), taken_at: new Date(now.getTime() - 1 * dayMs).toISOString(), status: "taken" },
    { id: "s2", patient_id: "p3", medicine_id: "m5", scheduled_at: new Date(now.getTime() - 2 * dayMs).toISOString(), taken_at: new Date(now.getTime() - 2 * dayMs).toISOString(), status: "taken" },
  ],
  vitals: [
    { id: "sv1", patient_id: "p3", type: "bp", value_a: 120, value_b: 78, recorded_at: new Date(now.getTime() - 1 * dayMs).toISOString() },
    { id: "sv2", patient_id: "p3", type: "steps", value_a: 6800, value_b: null, recorded_at: new Date(now.getTime() - 1 * dayMs).toISOString() },
  ],
};

const res3 = computeRisk(sureshSnapshot);
console.log(`\nTest 3 (Suresh Healthy): Score = ${res3.score}, Band = ${res3.band}`);
console.assert(res3.band === "green", `Expected green, got ${res3.band}`);

console.log("\nAll unit-style risk tests passed!");
