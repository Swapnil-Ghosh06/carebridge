import { NextResponse } from 'next/server';
import { HERO_PATIENT, SEED_MEDICINES, INITIAL_MED_LOGS, INITIAL_VITALS, INITIAL_ALERTS } from '@/lib/mockData';

export async function GET() {

  return NextResponse.json({
    profile: HERO_PATIENT,
    medicines: SEED_MEDICINES,
    medLogs: INITIAL_MED_LOGS,
    vitals: INITIAL_VITALS,
    risk: {
      score: 48,
      band: 'yellow',
      reasons: [
        {
          id: 'reason-1',
          ruleId: 'BP_TREND_UP',
          text: 'Blood pressure slightly elevated (138/88 mmHg).',
          weight: 20,
        },
        {
          id: 'reason-2',
          ruleId: 'MED_MISSED_STREAK',
          text: 'Evening Metformin pending confirmation.',
          weight: 15,
        },
      ],
    },
    alerts: INITIAL_ALERTS,
  });
}
