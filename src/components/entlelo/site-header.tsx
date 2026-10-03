"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks, company } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { LanguageSwitcher } from "@/components/entlelo/language-switcher";
import { PhoneIcon, MailIcon, PinIcon, ArrowRightIcon } from "@/components/entlelo/icons";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="#top" className="group flex items-center gap-3" aria-label="Entlelo Group home">
      <img
        src="/images/logos/entlelo-logo.png"
        alt="Entlelo Group logo"
        className="h-11 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-12"
      />
      {!compact && (
        <span className="hidden flex-col leading-tight sm:flex">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-deep">Entlelo Group</span>
          <span className="text-sm text-ink">{company.tagline}</span>
        </span>
      )}
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-charcoal text-white">
        <div className="section-shell flex h-9 items-center justify-center gap-2 text-center text-[11px] font-medium tracking-wide sm:justify-between sm:text-xs">
          <p className="truncate">
            <span className="text-gold">{t.topbar.cidb}</span>
            <span className="mx-1.5 hidden sm:inline text-white/40">·</span>
            <span className="hidden sm:inline">{t.topbar.owned}</span>
            <span className="mx-1.5 text-white/40">·</span>
            {t.topbar.serving}
          </p>
          <a
            href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}
            className="hidden items-center gap-1.5 text-white/80 transition hover:text-gold sm:inline-flex"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {company.phonePrimary}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-black/5 bg-white/90 shadow-[0_8px_30px_-12px_rgba(23,23,23,0.18)] backdrop-blur-xl"
            : "border-transparent bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="section-shell flex items-center justify-between py-3">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-white hover:text-gold-deep"
              >
                {t.nav[l.id]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher />

            <Button
              asChild
              className="hidden rounded-full bg-charcoal text-white hover:bg-gold hover:text-charcoal md:inline-flex"
            >
              <a href="#quote" className="gap-2">
                {t.nav.quote}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-black/10 bg-white lg:hidden"
                  aria-label={t.a11y.menuOpen}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[86vw] max-w-sm flex-col bg-cream p-0">
                <SheetTitle className="sr-only">{t.a11y.menuOpen}</SheetTitle>
                <div className="border-b border-black/5 p-5">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
                  {navLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-medium text-charcoal transition hover:bg-white"
                    >
                      {t.nav[l.id]}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto space-y-3 border-t border-black/5 p-5 text-sm">
                  <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-charcoal">
                    <PhoneIcon className="h-4 w-4 text-gold-deep" /> {company.phonePrimary}
                  </a>
                  <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 text-charcoal">
                    <MailIcon className="h-4 w-4 text-gold-deep" /> {company.email}
                  </a>
                  <p className="flex items-start gap-2.5 text-xs leading-5 text-ink">
                    <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                    Chloorkop Industrial, Kempton Park
                  </p>
                  <LanguageSwitcher className="w-full justify-center" />
                  <Button asChild className="w-full rounded-full bg-charcoal text-white hover:bg-gold hover:text-charcoal">
                    <a href="#quote" onClick={() => setOpen(false)}>
                      {t.nav.quoteLong}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
