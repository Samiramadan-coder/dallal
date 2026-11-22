// Strong-password rules, shared by the schemas and the strength meter

// ASCII punctuation, so spaces and non-Latin letters don't count as symbols
const SYMBOL = /[!-/:-@[-`{-~]/;

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_RULES = [
  (v: string) => v.length >= PASSWORD_MIN_LENGTH,
  (v: string) => /[A-Z]/.test(v),
  (v: string) => /[a-z]/.test(v),
  (v: string) => /\d/.test(v),
  (v: string) => SYMBOL.test(v),
] as const;

export function isStrongPassword(value: string): boolean {
  return PASSWORD_RULES.every((rule) => rule(value));
}

export const STRENGTH_LEVELS = ["weak", "fair", "good", "strong"] as const;
export type StrengthLevel = (typeof STRENGTH_LEVELS)[number];

// 0–3 for the meter's three bars. "strong" (3) only when every rule passes,
// so a full meter always means the password will be accepted
export function passwordStrength(value: string): 0 | 1 | 2 | 3 {
  const met = PASSWORD_RULES.filter((rule) => rule(value)).length;
  if (met === PASSWORD_RULES.length) return 3;
  if (met >= 4) return 2;
  if (met >= 2) return 1;
  return 0;
}
