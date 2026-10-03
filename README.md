# Entlelo Group — Fencing & Scaffolding (Johannesburg)

A modern, high-conversion marketing site demo for **Entlelo Group** — a CIDB 6-rated, 100% black-owned
civil construction company in Gauteng, South Africa, specialising in:

- **Clear view (Clear Vu) fencing** — supply & install
- **Scaffolding** — supply, fit, inspect & dismantle
- **Steel fabrication & gates** — in-house welding expertise
- **Civil construction** — CIDB 6 graded capacity

Built for homeowners and developers searching in **Johannesburg / Gauteng**.
Content and photography sourced from [entlelo.co.za](https://entlelo.co.za) (the original site).

---

## Tech stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 16 (App Router) + TypeScript 5      |
| Styling    | Tailwind CSS 4 + shadcn/ui (New York)       |
| Motion     | Framer Motion (scroll reveals, counters)    |
| Forms      | React Hook Form + Zod                       |
| Database   | Prisma ORM + SQLite (quote requests)        |
| Icons      | Lucide + custom SVG trade icons             |

## Features

- **Multilingual — all 11 official South African languages**: English, Afrikaans, isiZulu,
  isiXhosa, Sesotho, Setswana, Sepedi, siSwati, Tshivenḓa, Xitsonga and isiNdebele.
  One-click switcher in the header (and footer language chips); the choice is remembered in
  `localStorage` and auto-detected from the browser on first visit. `<html lang>` follows.
- Sticky, scroll-aware header with mobile sheet navigation
- Animated hero with trust badges and live counters (11+ yrs, 240+ clients, 2000+ cases)
- Filterable project portfolio (Klipfontein View, Munyaka, Sasol, Kempton Park, Balwin, EastGate Mall)
  with lightbox detail dialogs
- Company credentials section (CIDB 6, 100% black-owned, in-house welding, safety-first)
- Founder story (Nicholas Ndimphiwe Ntshetshe, founder & CEO)
- Auto-rotating client testimonials
- FAQ accordion addressing homeowner & developer questions
- **Working quote-request form** → `POST /api/quote` → validated (Zod) → saved to SQLite via Prisma
- SEO: targeted metadata + JSON-LD `GeneralContractor` schema for local search
- Floating WhatsApp + call actions
- Sticky footer, responsive from 360px to 4K, reduced-motion support

## Getting started

```bash
# 1. install
bun install        # or npm install

# 2. configure environment
cp .env.example .env
# set DATABASE_URL to an absolute path, e.g. file:/abs/path/db/custom.db

# 3. create the database
bun run db:push

# 4. run
bun run dev        # http://localhost:3000
```

## Deploying to GitHub (SSH deploy key generated with this project)

An ed25519 SSH keypair was generated for this machine:

- Private key: `~/.ssh/entlelo_github` (never share, never commit)
- Public key:  `~/.ssh/entlelo_github.pub`
- `~/.ssh/config` routes `github.com` through this key

Print the public key any time with:

```bash
cat ~/.ssh/entlelo_github.pub
```

### One-time setup on GitHub

1. Create a new **empty** repository on GitHub — this project targets `JacobSeatlholo/entlelo-demo`.
2. In the repo: **Settings → Deploy keys → Add deploy key**
3. Title: `entlelo-demo-<machine>`, paste the contents of `~/.ssh/entlelo_github.pub`.
   Tick **Allow write access** if you want to push from this machine.
4. The remote is already configured — push:

```bash
git remote set-url origin git@github.com:JacobSeatlholo/entlelo-demo.git   # if it needs changing
git push -u origin main
```

### CI (optional)

`.github/workflows/ci.yml` runs lint + type checks on every push. Extend it with your
favourite hosting action (Vercel/Cloudflare/self-hosted) when going live.

## Project structure

```
src/
  app/
    page.tsx              # single-page marketing site (composition)
    layout.tsx            # SEO metadata, fonts
    api/quote/route.ts    # POST /api/quote (Zod → Prisma)
  components/
    entlelo/              # site sections & shared UI (+ language-switcher)
    ui/                   # shadcn/ui primitives
  lib/
    i18n/
      config.ts           # 11 official SA languages, detection, storage
      en.ts               # English source dictionary (canonical copy)
      translations.ts     # generated dictionaries (af zu xh st tn nso ss ve ts nr)
      language-context.tsx # provider + useI18n() hook
    site-data.ts          # language-neutral data (contacts, ids, media)
    db.ts                 # Prisma client
scripts/
  gen-translations.ts     # LLM translation pipeline (resumable, cached)
prisma/schema.prisma      # QuoteRequest model
public/images/            # photography from the original site
```

### Regenerating translations

The non-English dictionaries are machine-generated and validated against the English
structure (any gap falls back to English automatically). To re-run after editing `en.ts`:

```bash
bun scripts/gen-translations.ts   # cached slices in .translation-cache/ are skipped
```

## License & credits

Demo build for Entlelo Group. Photography and company details © Entlelo LTD (PTY) Ltd.
Contact: 083 710 3475 · info@entlelo.co.za · Chloorkop Industrial, Kempton Park.
