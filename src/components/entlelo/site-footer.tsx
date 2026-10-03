"use client";

import { company, services, navLinks } from "@/lib/site-data";
import { LANGUAGES } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/language-context";
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, ArrowRightIcon, GlobeIcon } from "@/components/entlelo/icons";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const { t, lang, setLang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-charcoal text-white" aria-label={t.footer.getInTouch}>
      <div className="section-shell grid gap-12 py-14 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logos/entlelo-logo.png"
              alt="Entlelo Group logo"
              loading="lazy"
              className="h-12 w-auto"
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            {t.footer.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
              CIDB 6
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              {t.footer.blackOwned}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              {t.footer.est} {company.founded}
            </span>
          </div>
        </div>

        {/* Services */}
        <nav aria-label={t.footer.services}>
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">{t.footer.services}</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className="transition hover:text-gold">
                  {t.services.items[s.id].title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company links */}
        <nav aria-label={t.footer.company}>
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">{t.footer.company}</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">
                  {t.nav[l.id]}
                </a>
              </li>
            ))}
            <li>
              <a href="#quote" className="font-semibold text-gold transition hover:text-gold-soft">
                {t.footer.requestQuote}
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">{t.footer.getInTouch}</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li>
              <a
                href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}
                className="flex items-start gap-3 transition hover:text-gold"
              >
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {company.phonePrimary} · {company.phoneSecondary}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex items-start gap-3 transition hover:text-gold">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="leading-6">{company.address}</span>
            </li>
            <li>
              <a
                href={company.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-gold hover:text-gold"
              >
                <FacebookIcon className="h-4 w-4" aria-hidden="true" />
                {t.footer.followFacebook}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Languages — all 11 official South African languages */}
      <div className="border-t border-white/10">
        <div className="section-shell py-8">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold">
            <GlobeIcon className="h-4 w-4" aria-hidden="true" />
            {t.footer.languages}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                    lang === l.code
                      ? "border-gold bg-gold text-charcoal shadow-[0_4px_14px_-4px_rgba(215,166,72,0.6)]"
                      : "border-white/15 text-white/70 hover:border-gold/60 hover:text-gold"
                  )}
                >
                  {l.native}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>© {year} {company.legalName} — {t.footer.rights}</p>
          <p className="flex items-center gap-1.5">
            {t.footer.mission}
            <ArrowRightIcon className="h-3 w-3 text-gold" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
