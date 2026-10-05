// lib/voice/intent.ts
// Deterministic keyword and pattern voice intent parser (no LLM, 0ms latency)
// Supports English (en-IN), Hindi (hi-IN), and Kannada (kn-IN)

export type VoiceIntentType = 'LOG_MED_TAKEN' | 'LOG_BP' | 'UNKNOWN';

export interface MedTakenIntent {
  type: 'LOG_MED_TAKEN';
  medicineName?: string;
  confidence: number;
  rawText: string;
}

export interface BpIntent {
  type: 'LOG_BP';
  systolic: number;
  diastolic: number;
  pulse?: number;
  confidence: number;
  rawText: string;
}

export interface UnknownIntent {
  type: 'UNKNOWN';
  rawText: string;
}

export type VoiceIntent = MedTakenIntent | BpIntent | UnknownIntent;

// Keywords for medicine logging
const MED_KEYWORDS = [
  // Hindi
  'maine dawai le li',
  'dawai le li',
  'dawa le li',
  'dawai kha li',
  'dawa kha li',
  'goli le li',
  'goli kha li',
  'dawai ho gayi',
  'dawa le liya',
  'dawai le liya',
  'dawa kha liya',
  'maine goli le li',
  'dawai khayi',
  'maine dawa kha li',
  'le li',
  'kha li',

  // Kannada
  'medicine tiskondidini',
  'oushadhi togonde',
  'ouhadhi togonde',
  'tablet togonde',
  'goli togondidini',
  'mathre togonde',
  'togondidini',
  'togonde',

  // English
  'took my medicine',
  'took medicine',
  'taken medicine',
  'took my pills',
  'took pills',
  'medicine taken',
  'took tablet',
  'took my dose',
  'dose taken',
  'logged meds',
];

// Specific known medicine names
const KNOWN_MEDICINES = ['metformin', 'telmisartan', 'atorvastatin', 'aspirin', 'insulin'];

export function parseVoiceIntent(rawText: string): VoiceIntent {
  const text = rawText.trim().toLowerCase();
  if (!text) {
    return { type: 'UNKNOWN', rawText };
  }

  // 1. Check for Blood Pressure Intent
  // Match patterns like: "BP 130 by 85", "BP 130/85", "130 over 85", "बीपी 130 और 85", "130 aur 85"
  const bpKeywords = ['bp', 'blood pressure', 'pressure', 'बीपी', 'रक्तचाप', 'ರಕ್ತದೊತ್ತಡ'];
  const hasBpKeyword = bpKeywords.some((k) => text.includes(k));

  // Extract two distinct numbers typically in BP ranges
  // Matches: 130 by 85, 130/85, 130 over 85, 130 aur 85, 130 85
  const bpRegex = /(?:bp|pressure|बीपी)?\s*(\d{2,3})\s*(?:by|over|\/|aur|and|और|ಮತ್ತು|\-|\s+)\s*(\d{2,3})/i;
  const bpMatch = text.match(bpRegex);

  if (bpMatch) {
    const num1 = parseInt(bpMatch[1], 10);
    const num2 = parseInt(bpMatch[2], 10);

    // Normal or plausible human BP ranges: systolic 70-260, diastolic 40-160
    if (num1 >= 70 && num1 <= 260 && num2 >= 40 && num2 <= 160) {
      // Optional pulse check: "pulse 72" or "heart rate 75"
      const pulseMatch = text.match(/(?:pulse|heart rate|पल्स)\s*(\d{2,3})/i);
      const pulse = pulseMatch ? parseInt(pulseMatch[1], 10) : undefined;

      return {
        type: 'LOG_BP',
        systolic: num1,
        diastolic: num2,
        pulse,
        confidence: hasBpKeyword ? 0.95 : 0.85,
        rawText,
      };
    }
  }

  // 2. Check for Medicine Log Intent
  const matchedKeyword = MED_KEYWORDS.find((k) => text.includes(k));
  const mentionedMed = KNOWN_MEDICINES.find((m) => text.includes(m));

  if (matchedKeyword || (mentionedMed && (text.includes('took') || text.includes('le li') || text.includes('togonde')))) {
    return {
      type: 'LOG_MED_TAKEN',
      medicineName: mentionedMed ? capitalize(mentionedMed) : undefined,
      confidence: matchedKeyword ? 0.95 : 0.8,
      rawText,
    };
  }

  // Fallback
  return {
    type: 'UNKNOWN',
    rawText,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
