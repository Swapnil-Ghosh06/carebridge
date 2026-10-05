import { PatientSnapshot, RiskReason } from "@/lib/types";

export interface RiskRuleConfig {
  id: string;
  label: string;
  weight: number;
  evaluate: (snapshot: PatientSnapshot) => { hit: boolean; text?: string };
}

export const RISK_RULES: RiskRuleConfig[] = [
  // 1. Medication Adherence Low (< 70% over last 7 days)
  {
    id: "MED_ADHERENCE_LOW",
    label: "Low Medication Adherence",
    weight: 25,
    evaluate: (snapshot) => {
      const now = Date.now();
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      const logs7d = snapshot.medLogs.filter((l) => {
        const time = new Date(l.scheduled_at).getTime();
        return now - time <= sevenDaysMs;
      });

      if (logs7d.length === 0) return { hit: false };

      const taken = logs7d.filter((l) => l.status === "taken").length;
      const total = logs7d.length;
      const rate = taken / total;

      if (rate < 0.7) {
        const pct = Math.round(rate * 100);
        const missed = total - taken;
        return {
          hit: true,
          text: `Medication adherence dropped to ${pct}% over past 7 days (${missed} missed of ${total} doses).`,
        };
      }
      return { hit: false };
    },
  },

  // 2. 2+ Consecutive Missed Doses
  {
    id: "MED_MISSED_STREAK",
    label: "Consecutive Missed Doses",
    weight: 15,
    evaluate: (snapshot) => {
      // Sort logs by scheduled time descending
      const sorted = [...snapshot.medLogs].sort(
        (a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime()
      );

      let streak = 0;
      for (const log of sorted) {
        if (log.status === "missed") {
          streak++;
        } else if (log.status === "taken") {
          break;
        }
      }

      if (streak >= 2) {
        return {
          hit: true,
          text: `${streak} consecutive medication doses missed without confirmation.`,
        };
      }
      return { hit: false };
    },
  },

  // 3. BP Trend Up (Avg systolic up > 8% vs previous 7 days)
  {
    id: "BP_TREND_UP",
    label: "Elevated Blood Pressure Trend",
    weight: 20,
    evaluate: (snapshot) => {
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      const bpVitals = snapshot.vitals
        .filter((v) => v.type === "bp")
        .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());

      if (bpVitals.length < 2) return { hit: false };

      const recent7d = bpVitals.filter(
        (v) => now - new Date(v.recorded_at).getTime() <= 7 * oneDayMs
      );
      const prior7d = bpVitals.filter((v) => {
        const diff = now - new Date(v.recorded_at).getTime();
        return diff > 7 * oneDayMs && diff <= 14 * oneDayMs;
      });

      if (recent7d.length === 0) return { hit: false };

      const avgRecent =
        recent7d.reduce((sum, v) => sum + v.value_a, 0) / recent7d.length;

      // If no prior 7d vitals, compare recent vs baseline target of 125
      const baseline =
        prior7d.length > 0
          ? prior7d.reduce((sum, v) => sum + v.value_a, 0) / prior7d.length
          : 125;

      const increasePct = ((avgRecent - baseline) / baseline) * 100;
      if (increasePct > 8) {
        return {
          hit: true,
          text: `Average systolic BP trended up +${increasePct.toFixed(1)}% vs previous period (now ${Math.round(avgRecent)} mmHg).`,
        };
      }
      return { hit: false };
    },
  },

  // 4. BP High Absolute (Systolic >= 150 or Diastolic >= 95)
  {
    id: "BP_HIGH_ABS",
    label: "Critical Blood Pressure Threshold",
    weight: 20,
    evaluate: (snapshot) => {
      const bpVitals = snapshot.vitals
        .filter((v) => v.type === "bp")
        .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());

      if (bpVitals.length === 0) return { hit: false };
      const latest = bpVitals[0];

      if (latest.value_a >= 150 || (latest.value_b && latest.value_b >= 95)) {
        return {
          hit: true,
          text: `Latest BP recorded at ${latest.value_a}/${latest.value_b || 0} mmHg (exceeds safe threshold).`,
        };
      }
      return { hit: false };
    },
  },

  // 5. Steps Drop (> 40% vs prior 7 days)
  {
    id: "STEPS_DROP",
    label: "Sharp Drop in Physical Activity",
    weight: 10,
    evaluate: (snapshot) => {
      const now = Date.now();
      const oneDayMs = 24 * 60 * 60 * 1000;
      const stepVitals = snapshot.vitals
        .filter((v) => v.type === "steps")
        .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());

      if (stepVitals.length === 0) return { hit: false };

      const recent7d = stepVitals.filter(
        (v) => now - new Date(v.recorded_at).getTime() <= 7 * oneDayMs
      );
      const prior7d = stepVitals.filter((v) => {
        const diff = now - new Date(v.recorded_at).getTime();
        return diff > 7 * oneDayMs && diff <= 14 * oneDayMs;
      });

      if (recent7d.length === 0) return { hit: false };

      const avgRecent =
        recent7d.reduce((sum, v) => sum + v.value_a, 0) / recent7d.length;
      const baseline =
        prior7d.length > 0
          ? prior7d.reduce((sum, v) => sum + v.value_a, 0) / prior7d.length
          : 5000;

      const dropPct = ((baseline - avgRecent) / baseline) * 100;
      if (dropPct >= 40) {
        return {
          hit: true,
          text: `Daily activity dropped by ${Math.round(dropPct)}% (average ${Math.round(avgRecent)} steps vs baseline ${Math.round(baseline)} steps).`,
        };
      }
      return { hit: false };
    },
  },

  // 6. Glucose High (Fasting >= 180 mg/dL)
  {
    id: "GLUCOSE_HIGH",
    label: "Elevated Blood Glucose",
    weight: 15,
    evaluate: (snapshot) => {
      const gluVitals = snapshot.vitals
        .filter((v) => v.type === "glucose")
        .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());

      if (gluVitals.length === 0) return { hit: false };
      const latest = gluVitals[0];

      if (latest.value_a >= 180) {
        return {
          hit: true,
          text: `Latest blood glucose elevated at ${latest.value_a} mg/dL (target < 140 mg/dL).`,
        };
      }
      return { hit: false };
    },
  },

  // 7. Recent Discharge (discharged within last 14 days)
  {
    id: "RECENT_DISCHARGE",
    label: "Recent Hospital Discharge",
    weight: 10,
    evaluate: (snapshot) => {
      if (!snapshot.patient.discharged_at) return { hit: false };
      const dischargedTime = new Date(snapshot.patient.discharged_at).getTime();
      const diffDays = (Date.now() - dischargedTime) / (24 * 60 * 60 * 1000);

      if (diffDays >= 0 && diffDays <= 14) {
        return {
          hit: true,
          text: `Recent hospital discharge (${Math.round(diffDays)} days ago) - heightened readmission risk window.`,
        };
      }
      return { hit: false };
    },
  },

  // 8. No Data in 48 Hours
  {
    id: "NO_DATA_48H",
    label: "No Telemetry in 48 Hours",
    weight: 15,
    evaluate: (snapshot) => {
      const now = Date.now();
      const fortyEightHoursMs = 48 * 60 * 60 * 1000;

      const latestVital = snapshot.vitals.reduce((latest, v) => {
        const time = new Date(v.recorded_at).getTime();
        return time > latest ? time : latest;
      }, 0);

      const latestLog = snapshot.medLogs.reduce((latest, l) => {
        const time = l.taken_at ? new Date(l.taken_at).getTime() : 0;
        return time > latest ? time : latest;
      }, 0);

      const latestActivity = Math.max(latestVital, latestLog);
      if (latestActivity > 0 && now - latestActivity > fortyEightHoursMs) {
        return {
          hit: true,
          text: `No vitals or medication intake logged in over 48 hours.`,
        };
      }
      return { hit: false };
    },
  },
];
