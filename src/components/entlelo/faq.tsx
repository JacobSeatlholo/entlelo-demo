"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqIds, company } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Reveal } from "@/components/entlelo/reveal";
import { PhoneIcon } from "@/components/entlelo/icons";

export function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-20 sm:py-24" aria-label={t.faq.kicker}>
      <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <p className="kicker">{t.faq.kicker}</p>
          <h2 className="heading-lg mt-4">{t.faq.title}</h2>
          <p className="mt-4 text-base leading-7 text-ink sm:text-lg sm:leading-8">
            {t.faq.subtitle}
          </p>
          <a
            href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}
            className="mt-7 inline-flex h-12 items-center gap-2.5 rounded-full bg-charcoal px-6 text-sm font-semibold text-white transition hover:bg-gold hover:text-charcoal"
          >
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {t.faq.call} {company.phonePrimary}
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqIds.map((id, i) => {
              const f = t.faq.items[id];
              return (
                <AccordionItem
                  key={id}
                  value={`faq-${i}`}
                  className="rounded-2xl border border-black/5 bg-white px-6 shadow-[0_1px_2px_rgba(23,23,23,0.04)] data-[state=open]:border-gold/40"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-charcoal hover:no-underline hover:text-gold-deep [&>svg]:text-gold-deep">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-7 text-ink">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
