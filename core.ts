// core.ts

// Interfaces for the generator
interface GeneratePhoneNumberOptions {
  regionId: string;
  quantity: number;
  format: 'national' | 'international' | 'e164';
  ensureUnique?: boolean;
  prefixes?: string[];
}

interface GeneratedPhoneNumber {
  id: string;
  formatted: string;
  regionEn: string;
  countryCode: string;
}

// Core Logic: Generating numbers based on Pattern Matching
export function generatePhoneNumbers(options: GeneratePhoneNumberOptions) {
  const { regionId, quantity, format, ensureUnique = true, prefixes = [] } = options;
  const results: GeneratedPhoneNumber[] = [];
  const seen = new Set<string>();

  // Mocking plans for demonstration
  // In the live tool, this comes from a massive config file
  const availablePlans = getPlans(regionId); 

  const maxAttempts = quantity * 10;
  let attempts = 0;

  while (results.length < quantity && attempts < maxAttempts) {
    attempts += 1;
    const plan = availablePlans[Math.floor(Math.random() * availablePlans.length)];
    if (!plan) continue;

    // Logic to fill '#' patterns with random digits
    const digits = createDigits(plan, prefixes); 
    const normalized = `${plan.id}-${digits}`;

    if (ensureUnique && seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);

    results.push({
      id: normalized,
      formatted: formatDigits(plan, digits, format), // Pattern replacer logic
      regionEn: plan.labelEn,
      countryCode: plan.countryCode,
    });
  }

  return {
    numbers: results,
    exhaustedUniquePool: results.length < quantity,
  };
}

// Placeholder helper functions for the demo
function getPlans(id: string) { return [{id: 'us', labelEn: 'United States', countryCode: '+1', pattern: '(###) ###-####'}]; }
function createDigits(plan: any, prefix: any) { return Math.floor(Math.random() * 10000000000).toString(); }
function formatDigits(plan: any, digits: any, format: string) { return `+1 ${digits}`; }
