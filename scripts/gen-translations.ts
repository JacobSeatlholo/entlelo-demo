/**
 * Generates src/lib/i18n/translations.ts — the Entlelo dictionary
 * translated into South Africa's official languages using the
 * z-ai-web-dev-sdk LLM (backend only).
 *
 * Strategy: 6 small slices per language to keep each LLM response
 * compact and reliable. Results are cached per slice in
 * .translation-cache/ so the run is resumable (failed slices are NOT
 * cached). Truncated JSON output is auto-repaired where possible.
 *
 * Usage: bun scripts/gen-translations.ts
 */

import fs from "node:fs";
import path from "node:path";
import ZAI from "z-ai-web-dev-sdk";
import { en, type Dict } from "../src/lib/i18n/en";

const OUT_FILE = path.join(__dirname, "..", "src", "lib", "i18n", "translations.ts");
const CACHE_DIR = path.join(__dirname, "..", ".translation-cache");

type Target = { code: string; native: string; guidance: string };

const TARGETS: Target[] = [
  {
    code: "af",
    native: "Afrikaans",
    guidance:
      "Standard South African Afrikaans (SABC/koerantregister). Common trade words: heining(e), steigerwerk, laswerk, poort, staal.",
  },
  {
    code: "zu",
    native: "isiZulu",
    guidance:
      "Standard isiZulu as written in Gauteng/KwaZulu-Natal media. English technical loans are acceptable where natural (ifensi, isikafoldi) — write them with correct Zulu morphology.",
  },
  {
    code: "xh",
    native: "isiXhosa",
    guidance:
      "Standard isiXhosa (Eastern Cape / Gauteng standard). English technical loans are acceptable where natural — with correct Xhosa morphology.",
  },
  {
    code: "st",
    native: "Sesotho (Southern Sotho)",
    guidance:
      "Standard Southern Sesotho as used in the Free State and Gauteng. Use proper Sesotho orthography (e.g. SeSotho, taba ea, moaho).",
  },
  {
    code: "tn",
    native: "Setswana",
    guidance:
      "Standard Setswana as used in South Africa (North West, Gauteng). Use proper Setswana orthography (Setswana uses plain 's', not 'š').",
  },
  {
    code: "nso",
    native: "Sepedi (Northern Sotho)",
    guidance:
      "Standard Sepedi / Sesotho sa Leboa. Use proper orthography including 'š' (e.g. Sepedi, tšepe, mošomo).",
  },
  {
    code: "ss",
    native: "siSwati",
    guidance:
      "Standard siSwati (Swati) as used in South Africa (Mpumalanga). Consistent noun-class prefixes.",
  },
  {
    code: "ve",
    native: "Tshivenḓa",
    guidance:
      "Standard Tshivenḓa (Venda). Use the correct special characters: ḓ, ṱ, ḽ, nḓ where required.",
  },
  {
    code: "ts",
    native: "Xitsonga",
    guidance:
      "Standard Xitsonga (Tsonga) as used in South Africa (Limpopo, Gauteng). Use proper orthography: sw-, x-, h-, nh, nk etc.",
  },
  {
    code: "nr",
    native: "isiNdebele (South Africa)",
    guidance:
      "Standard South African isiNdebele (Mpumalanga) — NOT Zimbabwean Ndebele. Closely related to isiZulu; use correct Ndebele forms.",
  },
];

const KEEP = [
  "Entlelo",
  "Entlelo Group",
  "Johannesburg",
  "Gauteng",
  "Sandton",
  "Soweto",
  "Midrand",
  "Randburg",
  "Roodepoort",
  "Kempton Park",
  "Chloorkop",
  "Germiston",
  "Boksburg",
  "Benoni",
  "Alberton",
  "Centurion",
  "Klipfontein View",
  "Munyaka",
  "Sasol",
  "Balwin",
  "EastGate Mall",
  "Nicholas",
  "Ndimphiwe",
  "Ntshetshe",
  "Mfudumalo Foundation",
  "CIDB 6",
  "CIDB",
  "SANS",
  "Clear Vu",
  "WhatsApp",
  "083 710 3475",
  "071 126 1117",
  "info@entlelo.co.za",
  "you@example.co.za",
  "Sipho Ndlovu",
  "ERF 5445",
];

/** Six small slices per language — each yields a short, reliable LLM response. */
const SLICES: string[][] = [
  ["nav", "topbar", "hero", "stats", "marquee"],
  ["services"],
  ["why"],
  ["projects", "process"],
  ["testimonials", "faq"],
  ["quote", "footer", "lang", "a11y"],
];

/**
 * Curated manual overrides applied after generation (dotted paths).
 * Used to correct any machine translation that misses the mark on
 * high-visibility strings.
 */
const PATCHES: Record<string, Record<string, string>> = {
  zu: {
    "nav.services": "Izinsizakalo",
    "hero.titleA": "Sivikela iJohannesburg,",
    "hero.trust2": "100% yinkampani yabamnyama, esuka eGauteng",
  },
};

function applyPatches(code: string, dict: unknown): unknown {
  const patches = PATCHES[code];
  if (!patches) return dict;
  const root = dict as Record<string, unknown>;
  for (const [dotted, value] of Object.entries(patches)) {
    const parts = dotted.split(".");
    let node: Record<string, unknown> | null = root;
    for (const part of parts.slice(0, -1)) {
      const next = node[part];
      if (next === null || typeof next !== "object") {
        console.warn(`  [patch:${code}] skipping ${dotted} — parent missing`);
        node = null;
        break;
      }
      node = next as Record<string, unknown>;
    }
    if (node) node[parts[parts.length - 1]] = value;
  }
  return root;
}

type Known = { ok: true; value: unknown } | { ok: false; reason: string };

/** Ensure `out` mirrors the structure of `source` exactly; fill any gap with English. */
function conform(source: unknown, out: unknown, trail: string, stats: { filled: number }): Known {
  if (typeof source === "string") {
    if (typeof out === "string" && out.trim().length > 0 && !/^[\s\-—·*]+$/.test(out)) {
      return { ok: true, value: out };
    }
    stats.filled += 1;
    return { ok: true, value: source };
  }
  if (Array.isArray(source)) {
    if (Array.isArray(out) && out.length === source.length) {
      const result: unknown[] = [];
      for (let i = 0; i < source.length; i++) {
        const child = conform(source[i], out[i], `${trail}[${i}]`, stats);
        if (!child.ok) return child;
        result.push(child.value);
      }
      return { ok: true, value: result };
    }
    stats.filled += 1;
    return { ok: true, value: JSON.parse(JSON.stringify(source)) };
  }
  if (source !== null && typeof source === "object") {
    if (out === null || typeof out !== "object" || Array.isArray(out)) {
      stats.filled += 1;
      return { ok: true, value: JSON.parse(JSON.stringify(source)) };
    }
    const srcObj = source as Record<string, unknown>;
    const outObj = out as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(srcObj)) {
      const child = conform(value, outObj[key], `${trail}.${key}`, stats);
      if (!child.ok) return child;
      result[key] = child.value;
    }
    return { ok: true, value: result };
  }
  return { ok: false, reason: `Unsupported structure at ${trail}` };
}

/**
 * Parse the model's JSON, repairing common failure modes:
 * trailing commas and truncated output (auto-closing strings/brackets).
 */
function extractJson(text: string): unknown {
  const start = text.indexOf("{");
  if (start === -1) throw new Error("No JSON object found in response");
  let body = text.slice(start);

  const attempt = (s: string): unknown => JSON.parse(s);

  try {
    return attempt(body.slice(0, body.lastIndexOf("}") + 1));
  } catch {
    /* fall through to repair */
  }

  // Repair pass: walk the JSON tracking string/escape state and bracket
  // depth, cut at the last "safe" point, then close everything open.
  let inString = false;
  let escaped = false;
  let lastSafe = -1;
  const stack: string[] = [];
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === "{" || ch === "[") stack.push(ch);
    else if (ch === "}" || ch === "]") stack.pop();
    if (stack.length === 0 && !inString && (ch === "}" || ch === "]")) lastSafe = i;
  }

  if (lastSafe >= 2) {
    const trimmed = body.slice(0, lastSafe + 1).replace(/,\s*([}\]])/g, "$1");
    try {
      return attempt(trimmed);
    } catch {
      /* continue */
    }
  }

  // Auto-close: finish an open string, then close brackets in reverse.
  let repaired = body;
  if (inString) repaired += escaped ? '"' : '"';
  repaired = repaired.replace(/,\s*$/, "");
  for (let i = stack.length - 1; i >= 0; i--) {
    repaired += stack[i] === "{" ? "}" : "]";
  }
  return attempt(repaired.replace(/,\s*([}\]])/g, "$1"));
}

function pickSlice(sliceKeys: string[]): Record<string, unknown> {
  const enObj = en as unknown as Record<string, unknown>;
  const slice: Record<string, unknown> = {};
  for (const key of sliceKeys) slice[key] = enObj[key];
  return slice;
}

function systemPrompt(): string {
  return [
    "You are a senior South African translation and localisation specialist.",
    "You localise professional marketing copy for a construction company website into South Africa's official languages.",
    "You always answer with a single valid JSON object — no markdown fences, no commentary, no explanations.",
  ].join(" ");
}

function userPrompt(target: Target, slice: Record<string, unknown>): string {
  return [
    `Translate this JSON fragment of a South African construction-company website from English into ${target.native} (${target.code}).`,
    "",
    "STRICT RULES:",
    "1. Reply with ONLY a valid JSON object. Keep EXACTLY the same keys and the same nesting. Do not add, rename, merge or remove keys.",
    "1b. JSON arrays (e.g. feature lists) must stay JSON arrays with EXACTLY the same number of items, translated item by item.",
    `2. Never translate these tokens: ${KEEP.join(", ")}. Also never translate phone numbers, email addresses or JSON keys.`,
    `3. ${target.guidance}`,
    "4. Translate naturally, the way South African businesses actually write in this language — professional, warm and trustworthy. Avoid stiff word-for-word translation.",
    "5. Keep the asterisk (*) at the end of form labels, keep '…' ellipses, keep '·' separators, and keep em dashes where they appear.",
    "6. Keep every string non-empty. Short labels must stay short. Day names like 'Mon – Fri' / 'Sat' must be translated to the target language's abbreviations.",
    "7. Do not truncate: finish every sentence and close every bracket. Keep descriptions to roughly the length of the English source.",
    "",
    "CONTENT JSON:",
    JSON.stringify(slice),
    "",
    "Now reply with the translated JSON object only.",
  ].join("\n");
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

async function translateSlice(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  target: Target,
  sliceKeys: string[],
  depth = 0
): Promise<{ slice: Record<string, unknown>; filled: number } | null> {
  const stats = { filled: 0 };
  const content = pickSlice(sliceKeys);
  let lastError = "";

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const completion = await withTimeout(
        zai.chat.completions.create({
          messages: [
            { role: "assistant", content: systemPrompt() },
            {
              role: "user",
              content:
                userPrompt(target, content) +
                (lastError
                  ? `\n\nNOTE: Your previous attempt was invalid (${lastError}). Return ONE complete valid JSON object, starting with { and ending with }.`
                  : ""),
            },
          ],
          thinking: { type: "disabled" },
        }),
        150_000,
        `${target.code} slice`
      );

      const raw = completion.choices[0]?.message?.content ?? "";
      if (!raw.trim()) throw new Error("empty response");
      const parsed = extractJson(raw);
      const checked = conform(content, parsed, target.code, stats);
      if (!checked.ok) throw new Error(checked.reason);
      return { slice: checked.value as Record<string, unknown>, filled: stats.filled };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error(`  [${target.code}] attempt ${attempt} failed: ${lastError}`);
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }

  // Stubborn slice: split it into per-key sub-slices and retry each.
  if (sliceKeys.length > 1) {
    console.warn(`  [${target.code}] splitting slice [${sliceKeys.join(", ")}] into single-key slices.`);
    const merged: Record<string, unknown> = {};
    let totalFilled = 0;
    for (const key of sliceKeys) {
      const sub = await translateSlice(zai, target, [key], depth + 1);
      if (!sub) {
        console.warn(`  [${target.code}] key "${key}" unfixable — English will fill it.`);
        continue;
      }
      Object.assign(merged, sub.slice);
      totalFilled += sub.filled;
    }
    if (Object.keys(merged).length > 0) {
      return { slice: merged, filled: totalFilled };
    }
  }

  console.warn(`  [${target.code}] slice [${sliceKeys.join(", ")}] FAILED — will retry next run.`);
  return null;
}

function serialize(dict: unknown): string {
  return JSON.stringify(dict, null, 2);
}

async function main() {
  console.log("Creating ZAI client...");
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const zai = await ZAI.create();

  const results: Record<string, Dict> = {};
  const missing: string[] = [];

  for (const target of TARGETS) {
    const sliceResults: Record<string, unknown> = {};
    let totalFilled = 0;
    let incomplete = false;

    for (let i = 0; i < SLICES.length; i++) {
      const cacheFile = path.join(CACHE_DIR, `${target.code}-v2-${i}.json`);
      if (fs.existsSync(cacheFile)) {
        const cached = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
        Object.assign(sliceResults, cached.slice);
        totalFilled += cached.filled;
        continue;
      }
      console.log(`Translating ${target.native} (${target.code}) slice ${i + 1}/${SLICES.length}: [${SLICES[i].join(", ")}]`);
      const outcome = await translateSlice(zai, target, SLICES[i]);
      if (!outcome) {
        incomplete = true;
        missing.push(`${target.code}#${i}`);
        break;
      }
      fs.writeFileSync(cacheFile, JSON.stringify(outcome), "utf8");
      Object.assign(sliceResults, outcome.slice);
      totalFilled += outcome.filled;
    }

    if (incomplete) {
      console.warn(`  [${target.code}] incomplete — skipped (rerun the script to resume).`);
      continue;
    }

    // Assemble the full dictionary in the canonical key order, then
    // conform-validate the whole thing against English.
    const enObj = en as unknown as Record<string, unknown>;
    const assembled: Record<string, unknown> = {};
    for (const key of Object.keys(enObj)) assembled[key] = sliceResults[key];
    const whole = conform(en, assembled, target.code, { filled: 0 });
    if (!whole.ok) {
      console.error(`  [${target.code}] final assembly failed: ${whole.reason} — using English.`);
      results[target.code] = JSON.parse(JSON.stringify(en));
    } else {
      results[target.code] = applyPatches(target.code, whole.value) as Dict;
    }
    console.log(`  [${target.code}] done. English fallbacks: ${totalFilled}`);
  }

  if (Object.keys(results).length === 0) {
    throw new Error("No languages completed — nothing to write.");
  }

  const header = [
    "// AUTO-GENERATED by scripts/gen-translations.ts — do not edit by hand.",
    "// English source of truth lives in src/lib/i18n/en.ts.",
    "// Each dictionary is validated at generation time to mirror the English structure exactly.",
    "",
    'import type { LangCode } from "./config";',
    'import { en, type Dict } from "./en";',
    "",
  ].join("\n");

  const blocks = TARGETS.filter((t) => results[t.code])
    .map((t) => `export const ${t.code}: Dict = ${serialize(results[t.code])};\n`)
    .join("\n");

  const dictEntries = ["en", ...TARGETS.filter((t) => results[t.code]).map((t) => t.code)].join(",\n  ");
  const exportLine = `export const dictionaries: Record<LangCode, Dict> = {\n  ${dictEntries},\n};\n`;

  fs.writeFileSync(OUT_FILE, `${header}${blocks}\n${exportLine}`, "utf8");
  console.log(`\nWrote ${OUT_FILE}`);
  if (missing.length) {
    console.log(`Still missing (rerun to resume): ${missing.join(", ")}`);
  }
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
