// Symptom key -> human-friendly label mapping
export const SYMPTOM_LABELS: Record<string, string> = {
  hotFlashes: "Hot flashes",
  nightSweats: "Night sweats",
  moodSwings: "Mood swings",
  insomnia: "Insomnia",
  fatigue: "Fatigue",
  brainFog: "Brain fog",
  headaches: "Headaches",
  jointPain: "Joint/muscle pain",
  vaginalDryness: "Vaginal dryness",
  lowLibido: "Low libido",
  anxiety: "Anxiety",
  bloating: "Bloating",
};

export function toSymptomLabels(keys: string[] | undefined | null): string[] {
  if (!Array.isArray(keys)) return [];
  return keys.map((k) => SYMPTOM_LABELS[k] ?? titleCaseFallback(k));
}

function titleCaseFallback(key: string): string {
  // Replace underscores/dashes, split camelCase, then title-case
  const spaced = key
    .replace(/[_-]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Named + default export to appease tooling expecting a React component default.

const symptomLabels = { SYMPTOM_LABELS, toSymptomLabels };
export default symptomLabels;
