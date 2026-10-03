/**
 * Repairs degenerate (repetitive) long strings in the generated
 * dictionaries. Scans every string leaf for repeated phrase loops,
 * retranslates each offender in isolation, validates the result and
 * rewrites translations.ts.
 *
 * Usage: bun scripts/repair-degenerate.ts
 */

import fs from "node:fs";
import ZAI from "z-ai-web-dev-sdk";
import { en, type Dict } from "../src/lib/i18n/en";

/** Returns the highest repeat count of any 3-5 word phrase in the text. */
function repScore(text: string): number {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const grams = new Map<string, number>();
  for (let n = 3; n <= 5; n++) {
    for (let i = 0; i + n <= words.length; i++) {
      const g = words.slice(i, i + n).join(" ");
      grams.set(g, (grams.get(g) ?? 0) + 1);
    }
  }
  return grams.size ? Math.max(...grams.values()) : 0;
}

function collectStrings(
  source: unknown,
  out: unknown,
  trail: string,
  bad: { trail: string; en: string; current: string }[]
): void {
  if (typeof source === "string") {
    const cur = typeof out === "string" ? out : source;
    if (source.length > 80 && repScore(cur) >= 3 && repScore(source) < 3) {
      bad.push({ trail: trail, en: source, current: cur });
    }
    return;
  }
  if (Array.isArray(source)) {
    source.forEach((s, i) => collectStrings(s, (out as unknown[])?.[i], `${trail}[${i}]`, bad));
    return;
  }
  if (source && typeof source === "object") {
    for (const [k, v] of Object.entries(source as Record<string, unknown>)) {
      collectStrings(v, (out as Record<string, unknown>)?.[k], `${trail}.${k}`, bad);
    }
  }
}

function getIn(obj: unknown, dotted: string): unknown {
  let node: unknown = obj;
  for (const part of dotted.split(".")) {
    if (node === null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

function setIn(obj: Record<string, unknown>, dotted: string, value: unknown): void {
  const parts = dotted.split(".");
  let node: Record<string, unknown> = obj;
  for (const part of parts.slice(0, -1)) {
    node = node[part] as Record<string, unknown>;
  }
  node[parts[parts.length - 1]] = value;
}

const LANG_NAMES: Record<string, string> = {
  af: "Afrikaans",
  zu: "isiZulu",
  xh: "isiXhosa",
  st: "Sesotho",
  tn: "Setswana",
  nso: "Sepedi",
  ss: "siSwati",
  ve: "Tshivenḓa",
  ts: "Xitsonga",
  nr: "isiNdebele",
};

async function main() {
  const zai = await ZAI.create();
  const mod = await import("../src/lib/i18n/translations");
  const dicts = mod.dictionaries as unknown as Record<string, Dict>;

  let totalRepaired = 0;

  for (const code of Object.keys(LANG_NAMES)) {
    const bad: { trail: string; en: string; current: string }[] = [];
    collectStrings(en, dicts[code], code, bad);
    if (!bad.length) continue;
    console.log(`${code}: ${bad.length} degenerate string(s) to repair`);

    for (const item of bad) {
      let repaired: string | null = null;
      for (let attempt = 1; attempt <= 4 && !repaired; attempt++) {
        try {
          const completion = await zai.chat.completions.create({
            messages: [
              {
                role: "assistant",
                content:
                  "You are a senior South African translator. You translate ONE string at a time. Never repeat phrases; write flowing, natural marketing copy. Output only the translated text, nothing else.",
              },
              {
                role: "user",
                content: `Translate this website string from English into ${LANG_NAMES[code]} (${code}) — a South African official language. Keep brand names (Entlelo, Clear Vu, SANS, CIDB 6) and place names unchanged. Keep the same length and tone. Write naturally with NO repeated phrases.\n\nENGLISH:\n${item.en}`,
              },
            ],
            thinking: { type: "disabled" },
          });
          const out = (completion.choices[0]?.message?.content ?? "").trim();
          if (out.length >= 40 && repScore(out) < 3) repaired = out;
          else console.error(`  [${code}] ${item.trail} attempt ${attempt}: rejected (len ${out.length}, rep ${repScore(out)})`);
        } catch (err) {
          console.error(`  [${code}] ${item.trail} attempt ${attempt} error: ${String(err).slice(0, 80)}`);
        }
      }
      if (repaired) {
        setIn(dicts[code] as unknown as Record<string, unknown>, item.trail.split(".").slice(1).join("."), repaired);
        totalRepaired += 1;
        console.log(`  [${code}] ${item.trail} REPAIRED`);
      } else {
        console.warn(`  [${code}] ${item.trail} UNREPAIRED — replacing with English source.`);
        setIn(dicts[code] as unknown as Record<string, unknown>, item.trail.split(".").slice(1).join("."), item.en);
        totalRepaired += 1;
      }
    }
  }

  if (totalRepaired === 0) {
    console.log("No degenerate strings found — nothing to do.");
    return;
  }

  // Rewrite translations.ts
  const header = [
    "// AUTO-GENERATED by scripts/gen-translations.ts + curated patches — do not edit by hand.",
    "// English source of truth lives in src/lib/i18n/en.ts.",
    "",
    'import type { LangCode } from "./config";',
    'import { en, type Dict } from "./en";',
    "",
  ].join("\n");

  const order = ["af", "zu", "xh", "st", "tn", "nso", "ss", "ve", "ts", "nr"];
  const blocks = order
    .map((c) => `export const ${c}: Dict = ${JSON.stringify(dicts[c], null, 2)};\n`)
    .join("\n");
  const exportLine = `export const dictionaries: Record<LangCode, Dict> = {\n  en,\n  ${order.join(",\n  ")},\n};\n`;
  fs.writeFileSync("src/lib/i18n/translations.ts", `${header}${blocks}\n${exportLine}`);
  console.log(`\nRepaired ${totalRepaired} strings. Rewrote translations.ts.`);
}

main().catch((err) => {
  console.error("Repair failed:", err);
  process.exit(1);
});
