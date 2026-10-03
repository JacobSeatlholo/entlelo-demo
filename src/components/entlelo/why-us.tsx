"use client";

import { company } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Reveal, RevealStagger, RevealItem } from "@/components/entlelo/reveal";
import { AwardBadgeIcon, ShieldCheckIcon, HandshakeIcon, ClockIcon, WeldIcon, CheckCircleIcon } from "@/components/entlelo/icons";
import type { ComponentType, SVGProps } from "react";

const credentialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  cidb: AwardBadgeIcon,
  owned: HandshakeIcon,
  welding: WeldIcon,
  safety: ShieldCheckIcon,
  onTime: ClockIcon,
  quotes: CheckCircleIcon,
};

const credentialIds = ["cidb", "owned", "welding", "safety", "onTime", "quotes"] as const;

export function WhyUs() {
  const { t } = useI18n();

  return (
    <section id="why-us" className="scroll-mt-24 overflow-hidden bg-charcoal py-20 text-white sm:py-24" aria-label={t.why.kicker}>
      <div className="section-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="kicker-on-dark">{t.why.kicker}</p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {t.why.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              {t.why.subtitle}
            </p>

            <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {credentialIds.map((id) => {
                const Icon = credentialIcons[id];
                const c = t.why.credentials[id];
                return (
                  <RevealItem key={id}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-colors duration-300 hover:border-gold/40 hover:bg-white/[0.09]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-base font-bold text-white">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{c.body}</p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </Reveal>

          {/* Founder column */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-5 sm:p-7">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-4">
                <img
                  src="/images/team/ceo-nicholas.png"
                  alt={t.why.founderAlt}
                  loading="lazy"
                  className="mx-auto w-full max-w-[300px] rounded-2xl object-contain"
                />
              </div>
              <blockquote className="mt-7">
                <p className="text-lg leading-8 text-white/85 sm:text-xl sm:leading-9">
                  &ldquo;{t.why.founderQuote}&rdquo;
                </p>
              </blockquote>
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-lg font-bold text-white">{company.founder}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                  {t.why.founderRole}
                </p>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  {t.why.founderBio}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
