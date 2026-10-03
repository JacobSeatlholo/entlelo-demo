/**
 * Quality pass #2 — retranslates the short, high-visibility strings
 * (nav, hero titles, service titles, stats, buttons, footer) with a
 * per-language glossary, then rewrites translations.ts.
 *
 * Usage: bun scripts/gen-short-strings.ts
 */

import fs from "node:fs";
import ZAI from "z-ai-web-dev-sdk";
import { en, type Dict } from "../src/lib/i18n/en";

type Target = { code: string; native: string; glossary: string[] };

const TARGETS: Target[] = [
  {
    code: "af",
    native: "Afrikaans",
    glossary: [
      "Clear View Fencing → Clear View heining (keep brand 'Clear View')",
      "Scaffolding Supply & Fit → steigerwerk",
      "Steel Fabrication & Gates → staalwerk en poorte",
      "Securing Johannesburg → Johannesburg verseker",
      "one fence at a time → een heining op 'n keer",
    ],
  },
  {
    code: "zu",
    native: "isiZulu",
    glossary: [
      "Services → Izinsizakalo",
      "fencing → ukufakwa kwamafensi / amafensi",
      "Clear View Fencing → I-Clear View Fencing (brand stays English)",
      "Scaffolding → i-scaffolding",
      "Steel Fabrication & Gates → Ukwakhiwa kwensimbi nezinkathi",
      "gates → izinkathi / amageniso",
      "Securing Johannesburg → Sivikela iJohannesburg",
      "one fence at a time → ifensi eyodwa ngesikhathi esisodwa",
      "100% black-owned → 100% yinkampani yabamnyama",
      "Get a Free Quote → Thola isiphakamiso samahhala",
    ],
  },
  {
    code: "xh",
    native: "isiXhosa",
    glossary: [
      "Services → Iinkonzo",
      "fencing → ukufakwa kweenkuni-zokhuseleko? NO — use 'i-fensi' loan: amafensi",
      "Clear View Fencing → I-Clear View Fencing (brand stays English)",
      "Scaffolding → isikafu loan: i-scaffolding",
      "Steel Fabrication & Gates → Ukwakhiwa kwentsimbi kunye neegeti",
      "Securing Johannesburg → Sikhusela iJohannesburg",
      "one fence at a time → ifensi enye ngexesha elinye",
      "Get a Free Quote → Fumana isiphakamiso simahla",
    ],
  },
  {
    code: "st",
    native: "Sesotho",
    glossary: [
      "Services → Litšebeletso",
      "fencing → fensi / mafense",
      "Clear View Fencing → Fense ea Clear View (brand stays English)",
      "Scaffolding → scaffolding loan: sekgweretši? NO — use 'scaffolding'",
      "Steel Fabrication & Gates → Mosebetsi oa tšepe le mekhopa",
      "gates → mekhopa / diphephe",
      "Securing Johannesburg → Ho sireletsa Johannesburg",
      "one fence at a time → fense e le ngoe ka nako",
      "Get a Free Quote → Fumana pokeletso ea mahala",
    ],
  },
  {
    code: "tn",
    native: "Setswana",
    glossary: [
      "Services → Ditirelo",
      "fencing → fense / difense",
      "Clear View Fencing → Fense ya Clear View (brand stays English)",
      "Scaffolding → scaffolding (loan)",
      "Steel Fabrication & Gates → Tiro ya tšepe le dikhouthero? NO — gates = dipati/mabati → 'tiro ya tšepe le dipati'",
      "Securing Johannesburg → Go sireletsega Johannesburg → 'Re sireletsa Johannesburg'",
      "one fence at a time → fense e le nngwe ka nako e le nngwe",
      "Get a Free Quote → Amogela akaretso e e sa dueng",
    ],
  },
  {
    code: "nso",
    native: "Sepedi",
    glossary: [
      "Services → Ditshebeletšo",
      "fencing → legora / magora",
      "Clear View Fencing → Legora la Clear View (brand stays English)",
      "Scaffolding → scaffolding (loan)",
      "Steel Fabrication & Gates → Mošomo wa tšepe le dikgato",
      "Securing Johannesburg → Re šireletša Johannesburg",
      "one fence at a time → legora le tee ka nako ye tee",
      "Get a Free Quote → Amogela akharešo ya mahala",
    ],
  },
  {
    code: "ss",
    native: "siSwati",
    glossary: [
      "Services → Emasevisi / Imisebenti",
      "fencing → umfence / ifensi loan",
      "Clear View Fencing → I-Clear View Fencing (brand stays English)",
      "Scaffolding → scaffolding (loan)",
      "Steel Fabrication & Gates → Kwenza kwensimbi neminyango",
      "Securing Johannesburg → Kuvikela eJohannesburg",
      "one fence at a time → ifensi lelinga ngesikhatsi lesinye",
      "Get a Free Quote → Thola simemetelo samahhala",
    ],
  },
  {
    code: "ve",
    native: "Tshivenḓa",
    glossary: [
      "Services → Dzithumelo / Dzisevisi",
      "fencing → fense / dzifense",
      "Clear View Fencing → Fense ya Clear View (brand stays English)",
      "Scaffolding → scaffolding (loan)",
      "Steel Fabrication & Gates → Mushumo wa tshipida na dzenndeda? NO — gates = madzhini → 'mushumo wa tshipida na madzhini'",
      "Securing Johannesburg → U tsireledza Johannesburg",
      "one fence at a time → fense iṋe nga tshifhinga tshoṱhe",
      "Get a Free Quote → Nangwa muenziso wa mahala",
    ],
  },
  {
    code: "ts",
    native: "Xitsonga",
    glossary: [
      "Services → Tindlevo",
      "fencing → xivengo xa fense? NO — 'fensi': sifensi/swifensi",
      "Clear View Fencing → Sifensi xa Clear View (brand stays English)",
      "Scaffolding → scaffolding (loan)",
      "Steel Fabrication & Gates → Ntirho wa nsimbi na swo pfangweta? NO — gates = mindyangu → 'ntirho wa nsimbi na mindyangu'",
      "Securing Johannesburg → Ku sirheleta Johannesburg",
      "one fence at a time → sifensi rin'we hi n'we",
      "Get a Free Quote → Koma xikombiso xa mahala",
    ],
  },
  {
    code: "nr",
    native: "isiNdebele",
    glossary: [
      "Services → Izinsizakalo",
      "fencing → amafensi",
      "Clear View Fencing → I-Clear View Fencing (brand stays English)",
      "Scaffolding → scaffolding (loan)",
      "Steel Fabrication & Gates → Ukwenziwa kwensimbi namasango",
      "gates → amasango",
      "Securing Johannesburg → Ukuvikela iJohannesburg",
      "one fence at a time → ifensi eyodwa ngesikhathi esisodwa",
      "Get a Free Quote → Thola isiphakamiso samahhala",
    ],
  },
];

/** Dotted paths of the short, high-visibility strings to retranslate. */
const KEYS: string[] = [
  "nav.services",
  "nav.whyUs",
  "nav.projects",
  "nav.process",
  "nav.faq",
  "nav.contact",
  "nav.quote",
  "nav.quoteLong",
  "topbar.cidb",
  "topbar.owned",
  "topbar.serving",
  "hero.badge",
  "hero.titleA",
  "hero.titleB",
  "hero.ctaQuote",
  "hero.ctaProjects",
  "hero.trust1",
  "hero.trust2",
  "hero.trust3",
  "stats.years",
  "stats.clients",
  "stats.cases",
  "stats.graded",
  "marquee.trusted",
  "services.kicker",
  "services.title",
  "services.subtitle",
  "services.request",
  "services.items.clearVu.title",
  "services.items.clearVu.short",
  "services.items.clearVu.badge",
  "services.items.scaffolding.title",
  "services.items.scaffolding.short",
  "services.items.steel.title",
  "services.items.steel.short",
  "services.items.steel.badge",
  "services.items.civil.title",
  "services.items.civil.short",
  "why.kicker",
  "why.title",
  "projects.kicker",
  "projects.title",
  "process.kicker",
  "process.title",
  "process.cta",
  "testimonials.kicker",
  "testimonials.title",
  "faq.kicker",
  "faq.title",
  "faq.call",
  "quote.kicker",
  "quote.submit",
  "quote.sending",
  "quote.callUs",
  "quote.whatsappCta",
  "quote.clientTypePh",
  "quote.servicePh",
  "quote.clientTypes.homeowner",
  "quote.clientTypes.developer",
  "quote.clientTypes.business",
  "quote.clientTypes.contractor",
  "quote.serviceOther",
  "quote.areasTitle",
  "quote.greaterGauteng",
  "footer.services",
  "footer.company",
  "footer.getInTouch",
  "footer.requestQuote",
  "footer.followFacebook",
  "footer.blackOwned",
  "footer.est",
  "footer.rights",
  "footer.mission",
  "footer.languages",
  "lang.label",
  "lang.change",
];

function get(obj: unknown, dotted: string): string {
  let node: unknown = obj;
  for (const part of dotted.split(".")) {
    if (node === null || typeof node !== "object") return "";
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : "";
}

function setIn(obj: Record<string, unknown>, dotted: string, value: string): void {
  const parts = dotted.split(".");
  let node: Record<string, unknown> = obj;
  for (const part of parts.slice(0, -1)) {
    node = node[part] as Record<string, unknown>;
  }
  node[parts[parts.length - 1]] = value;
}

/** Build { "nav.services": "Services", ... } content object. */
function buildContent(): Record<string, string> {
  const content: Record<string, string> = {};
  for (const key of KEYS) content[key] = get(en, key);
  return content;
}

async function translateShort(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  target: Target,
  content: Record<string, string>
): Promise<Record<string, string> | null> {
  const prompt = [
    `Translate these ${Object.keys(content).length} short UI strings of a South African construction website from English into ${target.native} (${target.code}).`,
    "",
    `GLOSSARY for ${target.native} (follow these exactly):`,
    ...target.glossary.map((g) => `- ${g}`),
    "",
    "RULES:",
    "1. Reply with ONLY a valid JSON object mapping the SAME dotted keys to translated strings.",
    "2. Keep brand names (Entlelo, Clear View, Clear Vu, CIDB 6, WhatsApp, SANS), place names (Johannesburg, Gauteng, Kempton Park) and numbers unchanged.",
    "3. These are UI labels: keep them SHORT and natural. A 3-word English label stays ~2-5 words.",
    "4. 'Est.' before a year = abbreviation of 'Established'.",
    "5. Keep trailing '*' where present. Keep '…' where present. Keep '·' separators.",
    "6. Do not truncate; close all brackets; output valid JSON.",
    "",
    "STRINGS JSON:",
    JSON.stringify(content),
    "",
    "Reply with the translated JSON object only.",
  ].join("\n");

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content:
              "You are a senior South African translator for a construction company. You output one valid JSON object only — no fences, no commentary.",
          },
          { role: "user", content: prompt + (attempt > 1 ? "\n\nPrevious attempt was invalid JSON. Return ONE valid JSON object." : "") },
        ],
        thinking: { type: "disabled" },
      });
      const raw = completion.choices[0]?.message?.content ?? "";
      const parsed = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
      // Validate: every key present with a non-empty string
      const result: Record<string, string> = {};
      let bad = 0;
      for (const key of Object.keys(content)) {
        const v = parsed[key];
        if (typeof v === "string" && v.trim().length > 0) result[key] = v.trim();
        else {
          result[key] = content[key];
          bad += 1;
        }
      }
      console.log(`  [${target.code}] short strings OK (fallbacks: ${bad})`);
      return result;
    } catch (err) {
      console.error(`  [${target.code}] attempt ${attempt} failed: ${String(err).slice(0, 90)}`);
      await new Promise((r) => setTimeout(r, 900));
    }
  }
  return null;
}

async function main() {
  const zai = await ZAI.create();
  const content = buildContent();

  // Import current runtime dictionaries
  const mod = await import("../src/lib/i18n/translations");
  const dicts = mod.dictionaries as unknown as Record<string, Dict>;

  for (const target of TARGETS) {
    console.log(`Short-string pass: ${target.native} (${target.code})`);
    const translated = await translateShort(zai, target, content);
    if (!translated) {
      console.warn(`  [${target.code}] failed — keeping existing strings.`);
      continue;
    }
    const dict = JSON.parse(JSON.stringify(dicts[target.code])) as Dict;
    const root = dict as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(translated)) {
      setIn(root, key, value);
    }
    dicts[target.code] = dict;
  }

  // Rewrite translations.ts
  const header = [
    "// AUTO-GENERATED by scripts/gen-translations.ts + scripts/gen-short-strings.ts — do not edit by hand.",
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
  console.log("\nRewrote translations.ts with curated short strings.");
}

main().catch((err) => {
  console.error("Short-string generation failed:", err);
  process.exit(1);
});
