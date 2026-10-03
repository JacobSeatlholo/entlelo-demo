"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Counter } from "@/components/entlelo/counter";
import { ShieldCheckIcon, AwardBadgeIcon, HandshakeIcon, ArrowRightIcon, StarIcon } from "@/components/entlelo/icons";

const trustBadgeIds = ["trust1", "trust2", "trust3"] as const;

const trustIcons = {
  trust1: AwardBadgeIcon,
  trust2: ShieldCheckIcon,
  trust3: HandshakeIcon,
} as const;

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.35, 1] as const },
  });

  return (
    <section id="top" className="relative isolate overflow-hidden bg-charcoal" aria-label="Introduction">
      {/* Background image + gradient */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero/hero-main.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(15,15,15,0.94)_0%,rgba(15,15,15,0.78)_38%,rgba(15,15,15,0.42)_72%,rgba(15,15,15,0.30)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/95 to-transparent" />
      </div>

      <div className="section-shell relative grid min-h-[86svh] items-center gap-12 py-16 sm:py-20 lg:min-h-[88svh] lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="max-w-3xl">
          <motion.p {...fadeUp(0.05)} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft backdrop-blur-sm">
            <StarIcon className="h-3.5 w-3.5 text-gold" />
            {t.hero.badge}
          </motion.p>

          <motion.h1 {...fadeUp(0.15)} className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t.hero.titleA}
            <span className="block text-gold">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.25)} className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            {t.hero.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.35)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 rounded-full bg-gold px-7 text-base font-semibold text-charcoal shadow-[0_10px_30px_-10px_rgba(215,166,72,0.65)] transition hover:bg-gold-soft">
              <a href="#quote" className="gap-2">
                {t.hero.ctaQuote}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-white/5 px-7 text-base text-white backdrop-blur-sm transition hover:border-gold hover:text-gold"
            >
              <a href="#projects">{t.hero.ctaProjects}</a>
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(0.45)} className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {trustBadgeIds.map((id) => {
              const Icon = trustIcons[id];
              return (
                <li key={id} className="flex items-center gap-2.5 text-sm font-medium text-white/85">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  {t.hero[id]}
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* Floating engineer card (desktop) */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.21, 0.65, 0.35, 1] }}
          className="relative hidden lg:block"
        >
          <div className="overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
            <img
              src="/images/hero/engineer.png"
              alt={t.hero.engineerAlt}
              className="mx-auto max-h-[520px] w-auto rounded-[28px] object-contain"
            />
          </div>
          <div className="absolute -bottom-5 -left-6 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-xl">
            <p className="text-2xl font-extrabold text-charcoal">
              <Counter value={2000} suffix="+" />
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{t.stats.cases}</p>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="section-shell grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id} className="text-center sm:text-left">
              <p className="text-3xl font-extrabold tracking-tight text-gold sm:text-4xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[13px]">
                {t.stats[s.id]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
