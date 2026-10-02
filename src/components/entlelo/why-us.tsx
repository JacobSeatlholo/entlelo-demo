"use client";

import { company } from "@/lib/site-data";
import { Reveal, RevealStagger, RevealItem } from "@/components/entlelo/reveal";
import { AwardBadgeIcon, ShieldCheckIcon, HandshakeIcon, ClockIcon, WeldIcon, CheckCircleIcon } from "@/components/entlelo/icons";

const credentials = [
  {
    icon: AwardBadgeIcon,
    title: "CIDB 6 graded",
    body: "Formally graded by the Construction Industry Development Board — capacity and compliance you inherit on your project, whether it's a home fence or a warehouse build.",
  },
  {
    icon: HandshakeIcon,
    title: "100% black-owned",
    body: "A proudly South African, privately owned company founded in 2019 on integrity, excellence and the transfer of skills to the communities we work in.",
  },
  {
    icon: WeldIcon,
    title: "In-house welding",
    body: "Gates, posts, brackets and structural steel are fabricated by our own welders — tighter quality control and shorter lead times, no middlemen.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Safety first, always",
    body: "Exceptional safety standards with supervised sites, SANS-compliant scaffolding handovers and daily housekeeping that protects your property.",
  },
  {
    icon: ClockIcon,
    title: "On-time delivery",
    body: "Dedicated teams that complete tasks on the agreed programme — the reason developers keep us on their panels project after project.",
  },
  {
    icon: CheckCircleIcon,
    title: "Competitive, fixed quotes",
    body: "Quality services at competitive rates with clear, itemised pricing. No hidden variations once we've measured and quoted your site.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-24 overflow-hidden bg-charcoal py-20 text-white sm:py-24" aria-label="Why choose Entlelo">
      <div className="section-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="kicker-on-dark">Why Entlelo</p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              A contractor graded for big sites — trusted by homeowners.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
              We pride ourselves on exceptional safety standards and excellent customer service. Integrity is
              our core value: we stay open with the client, take pride in excellence, and remain eager to
              acquire and transfer knowledge and skills.
            </p>

            <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {credentials.map(({ icon: Icon, title, body }) => (
                <RevealItem key={title}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-colors duration-300 hover:border-gold/40 hover:bg-white/[0.09]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </Reveal>

          {/* Founder column */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-5 sm:p-7">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-4">
                <img
                  src="/images/team/ceo-nicholas.png"
                  alt={`${company.founder}, founder and CEO of Entlelo Group`}
                  loading="lazy"
                  className="mx-auto w-full max-w-[300px] rounded-2xl object-contain"
                />
              </div>
              <blockquote className="mt-7">
                <p className="text-lg leading-8 text-white/85 sm:text-xl sm:leading-9">
                  &ldquo;A dedicated entrepreneur and philanthropist, best known for founding and running the
                  NPO Mfudumalo Foundation — empowering vulnerable communities through the foundation&rsquo;s
                  initiatives and business leadership.&rdquo;
                </p>
              </blockquote>
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-lg font-bold text-white">{company.founder}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                  Founder &amp; CEO · Entlelo Group
                </p>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  Nicholas founded Entlelo in {company.founded} after more than a decade of hands-on
                  construction experience — building the company on fence erecting, civil building,
                  scaffolding and steel fabrication.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
