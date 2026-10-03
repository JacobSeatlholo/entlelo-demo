"use client";

import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Reveal } from "@/components/entlelo/reveal";
import { StarIcon, ArrowRightIcon } from "@/components/entlelo/icons";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next, paused]);

  const meta = testimonials[index];
  const item = t.testimonials.items[meta.id];

  return (
    <section
      className="bg-white py-20 sm:py-24"
      aria-label={t.testimonials.kicker}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t.testimonials.kicker}</p>
          <h2 className="heading-lg mt-4">{t.testimonials.title}</h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div
            className="relative rounded-[32px] border border-black/5 bg-cream p-8 shadow-[0_1px_2px_rgba(23,23,23,0.04),0_16px_40px_-16px_rgba(23,23,23,0.16)] sm:p-12"
            aria-live="polite"
          >
            <div className="flex items-center gap-1.5" aria-label={t.a11y.rated}>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-gold" />
              ))}
            </div>
            <blockquote className="mt-6">
              <p className="text-balance text-xl font-medium leading-9 text-charcoal sm:text-2xl sm:leading-10">
                &ldquo;{item.quote}&rdquo;
              </p>
            </blockquote>
            <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-base font-bold text-charcoal">{meta.name}</p>
                <p className="mt-0.5 text-sm text-ink">
                  {item.role} · {meta.area}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-charcoal transition hover:border-gold hover:bg-gold"
                  aria-label={t.a11y.prev}
                >
                  <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-charcoal transition hover:border-gold hover:bg-gold"
                  aria-label={t.a11y.next}
                >
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </footer>
          </div>

          <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label={t.testimonials.kicker}>
            {testimonials.map((tm, i) => (
              <button
                key={tm.id}
                role="tab"
                aria-selected={i === index}
                aria-label={tm.name}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-gold" : "w-2.5 bg-charcoal/15 hover:bg-charcoal/30"
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
