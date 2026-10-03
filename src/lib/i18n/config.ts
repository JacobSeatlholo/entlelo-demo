/**
 * Entlelo Group — supported languages.
 *
 * English + the 10 other official written languages of South Africa
 * (per the Constitution, SASL is the 12th official language and is
 * not used for written web copy).
 */

export const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "af", native: "Afrikaans" },
  { code: "zu", native: "isiZulu" },
  { code: "xh", native: "isiXhosa" },
  { code: "st", native: "Sesotho" },
  { code: "tn", native: "Setswana" },
  { code: "nso", native: "Sepedi" },
  { code: "ss", native: "siSwati" },
  { code: "ve", native: "Tshivenḓa" },
  { code: "ts", native: "Xitsonga" },
  { code: "nr", native: "isiNdebele" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

export const LANG_CODES: LangCode[] = LANGUAGES.map((l) => l.code);

/** BCP 47 locales used for the <html lang> attribute. */
export const HTML_LOCALES: Record<LangCode, string> = {
  en: "en-ZA",
  af: "af-ZA",
  zu: "zu-ZA",
  xh: "xh-ZA",
  st: "st-ZA",
  tn: "tn-ZA",
  nso: "nso-ZA",
  ss: "ss-ZA",
  ve: "ve-ZA",
  ts: "ts-ZA",
  nr: "nr-ZA",
};

/** localStorage key for the visitor's language choice. */
export const LANG_STORAGE_KEY = "entlelo-lang";

export function isLangCode(value: unknown): value is LangCode {
  return typeof value === "string" && (LANG_CODES as string[]).includes(value);
}

/** Detect the closest supported language from a browser navigator.language value. */
export function detectLanguage(candidate: string | undefined): LangCode {
  if (!candidate) return "en";
  const lower = candidate.toLowerCase();
  const exact = LANG_CODES.find((c) => lower === c || lower.startsWith(`${c}-`));
  if (exact) return exact;
  // Common aliases (e.g. "nso" rarely appears; "sot"/"nbl" ISO-639-2 style codes)
  if (lower.startsWith("sot")) return "st";
  if (lower.startsWith("nbl")) return "nr";
  return "en";
}
