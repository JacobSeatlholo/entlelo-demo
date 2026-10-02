"use client";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";
import { Reveal, RevealStagger, RevealItem } from "@/components/entlelo/reveal";
import { serviceIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/entlelo/icons";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-cream py-20 sm:py-24" aria-label="Services">
      <div className="section-shell">
        <Reveal className="max-w-3xl">
          <p className="kicker">What we do</p>
          <h2 className="heading-lg mt-4">
            Four trades. One accountable contractor.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink sm:text-lg sm:leading-8">
            From a single driveway gate to a full development perimeter — the teams who quote your job are
            the teams who weld, erect and install it.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <article className="card-surface group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(23,23,23,0.22)]">
                <div className="relative h-44 overflow-hidden sm:h-48">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-charcoal/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold backdrop-blur-sm">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-charcoal">
                      {serviceIcon(service.icon, "h-6 w-6")}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold leading-snug text-charcoal">{service.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                        {service.short}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm leading-6 text-ink">
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-charcoal/15 bg-transparent text-charcoal hover:border-gold hover:bg-gold hover:text-charcoal"
                    >
                      <a href="#quote" className="gap-2">
                        Request Quote
                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
