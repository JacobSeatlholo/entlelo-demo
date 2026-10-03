"use client";

import { processSteps } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Reveal, RevealStagger, RevealItem } from "@/components/entlelo/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/entlelo/icons";

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="scroll-mt-24 bg-cream py-20 sm:py-24" aria-label={t.process.kicker}>
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t.process.kicker}</p>
          <h2 className="heading-lg mt-4">{t.process.title}</h2>
          <p className="mt-4 text-base leading-7 text-ink sm:text-lg sm:leading-8">
            {t.process.subtitle}
          </p>
        </Reveal>

        <RevealStagger className="relative mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
          {/* connector line (desktop) */}
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-[repeating-linear-gradient(to_right,rgba(138,106,52,0.4)_0_10px,transparent_10px_20px)] xl:block" aria-hidden="true" />
          {processSteps.map((step) => {
            const d = t.process.steps[step.id];
            return (
              <RevealItem key={step.id}>
                <div className="relative h-full rounded-2xl border border-black/5 bg-white p-7 shadow-[0_1px_2px_rgba(23,23,23,0.04),0_10px_28px_-12px_rgba(23,23,23,0.14)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-charcoal text-xl font-extrabold text-gold ring-4 ring-cream">
                    {step.num}
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-charcoal">{d.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink">{d.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>

        <Reveal className="mt-12 text-center">
          <Button asChild className="h-12 rounded-full bg-charcoal px-8 text-base font-semibold text-white hover:bg-gold hover:text-charcoal">
            <a href="#quote" className="gap-2">
              {t.process.cta}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
