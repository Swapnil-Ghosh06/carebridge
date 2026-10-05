import { PatientDetail } from "@/lib/types";

export interface FHIRResource {
  resourceType: string;
  id: string;
  [key: string]: unknown;
}

export interface FHIRBundle {
  resourceType: "Bundle";
  id: string;
  type: "collection";
  timestamp: string;
  entry: {
    fullUrl: string;
    resource: FHIRResource;
  }[];
}

/**
 * Maps CareBridge internal telemetry into a standard ABDM / HL7 FHIR R4 Bundle.
 */
export function generateFhirR4Bundle(detail: PatientDetail): FHIRBundle {
  const { profile, vitals, medLogs } = detail;
  const entries: { fullUrl: string; resource: FHIRResource }[] = [];

  // 1. Patient Resource
  const patientResource: FHIRResource = {
    resourceType: "Patient",
    id: profile.id,
    identifier: [
      {
        system: "https://healthid.abdm.gov.in",
        value: `ABHA-91-${profile.id}-2026`,
      },
    ],
    name: [{ text: profile.name, family: profile.name.split(" ")[1] || "", given: [profile.name.split(" ")[0]] }],
    gender: "male",
    telecom: [{ system: "phone", value: "+91-98765-43210" }],
  };
  entries.push({ fullUrl: `urn:uuid:patient-${profile.id}`, resource: patientResource });

  // 2. Conditions (SNOMED CT)
  profile.conditions.forEach((cond, idx) => {
    const snomedCode = cond.toLowerCase().includes("diab") ? "44054006" : "38341003";
    const condResource: FHIRResource = {
      resourceType: "Condition",
      id: `cond-${idx + 1}`,
      clinicalStatus: {
        coding: [{ system: "http://terminology.hl7.org/CodeSystem/condition-clinical", code: "active" }],
      },
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: snomedCode,
            display: cond,
          },
        ],
      },
      subject: { reference: `Patient/${profile.id}` },
    };
    entries.push({ fullUrl: `urn:uuid:cond-${idx + 1}`, resource: condResource });
  });

  // 3. Observations (LOINC)
  vitals.forEach((v) => {
    let code = "85354-9";
    let display = "Blood pressure panel with all children optional";
    let component = undefined;

    if (v.type === "bp") {
      code = "85354-9";
      component = [
        {
          code: { coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }] },
          valueQuantity: { value: v.value_a, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" },
        },
        {
          code: { coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" }] },
          valueQuantity: { value: v.value_b || 80, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" },
        },
      ];
    } else if (v.type === "steps") {
      code = "55423-8";
      display = "Number of steps in 24 hour Measured";
    }

    const obsResource: FHIRResource = {
      resourceType: "Observation",
      id: v.id,
      status: "final",
      category: [
        {
          coding: [
            { system: "http://terminology.hl7.org/CodeSystem/observation-category", code: "vital-signs" },
            { system: "https://carebridge.health/category", code: "wearable-sensor" },
          ],
        },
      ],
      code: {
        coding: [{ system: "http://loinc.org", code, display }],
      },
      subject: { reference: `Patient/${profile.id}` },
      effectiveDateTime: "2026-10-05T08:30:00Z",
      component,
      valueQuantity: v.type === "steps" ? { value: v.value_a, unit: "steps", system: "http://unitsofmeasure.org", code: "{steps}" } : undefined,
    };
    entries.push({ fullUrl: `urn:uuid:obs-${v.id}`, resource: obsResource });
  });

  return {
    resourceType: "Bundle",
    id: `bundle-cb-${Date.now()}`,
    type: "collection",
    timestamp: new Date().toISOString(),
    entry: entries,
  };
}
