"use client";

import { clientLogos } from "@/lib/client-logos";
import { useI18n } from "@/lib/i18n/language-context";

export function LogoMarquee() {
  const { t } = useI18n();
  const doubled = [...clientLogos, ...clientLogos];
  return (
    <section className="border-b border-black/5 bg-white py-10" aria-label={t.marquee.trusted}>
      <div className="section-shell">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">
          {t.marquee.trusted}
        </p>
      </div>
      <div className="marquee-paused relative mt-8 overflow-hidden" role="presentation">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
        <div className="animate-marquee flex w-max items-center gap-14 px-7">
          {doubled.map((logo, i) => (
            <img
              key={`${logo.src}-${i}`}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="h-10 w-auto max-w-[130px] object-contain opacity-70 saturate-0 transition duration-300 hover:opacity-100 hover:saturate-100 sm:h-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
