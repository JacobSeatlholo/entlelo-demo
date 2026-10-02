import Link from "next/link";
import { company, services, navLinks } from "@/lib/site-data";
import { PhoneIcon, MailIcon, PinIcon, FacebookIcon, ArrowRightIcon } from "@/components/entlelo/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-charcoal text-white" aria-label="Site footer">
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
            We deliver practical construction solutions with a focus on quality workmanship, safety
            standards and reliable service — for homeowners and developers across Johannesburg, Gauteng
            and surrounding areas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
              CIDB 6
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              100% Black-Owned
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
              Est. {company.founded}
            </span>
          </div>
        </div>

        {/* Services */}
        <nav aria-label="Footer services">
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className="transition hover:text-gold">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company links */}
        <nav aria-label="Footer company links">
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#quote" className="font-semibold text-gold transition hover:text-gold-soft">
                Request a Quote
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Get in touch</h3>
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
                Follow us on Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>© {year} {company.legalName} — All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built to help Johannesburg homeowners &amp; developers build safer
            <ArrowRightIcon className="h-3 w-3 text-gold" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
