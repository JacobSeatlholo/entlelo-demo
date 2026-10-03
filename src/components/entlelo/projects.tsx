"use client";

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { projects, projectCategories, type ProjectCategory, type ProjectMeta } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Reveal } from "@/components/entlelo/reveal";
import { PinIcon, ArrowRightIcon, CheckCircleIcon } from "@/components/entlelo/icons";
import { cn } from "@/lib/utils";

export function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [active, setActive] = useState<ProjectMeta | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const filterLabels: Record<string, string> = {
    All: t.projects.filters.all,
    Fencing: t.projects.filters.fencing,
    Scaffolding: t.projects.filters.scaffolding,
    Steel: t.projects.filters.steel,
    Civil: t.projects.filters.civil,
  };

  return (
    <section id="projects" className="scroll-mt-24 bg-white py-20 sm:py-24" aria-label={t.projects.kicker}>
      <div className="section-shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">{t.projects.kicker}</p>
            <h2 className="heading-lg mt-4">{t.projects.title}</h2>
            <p className="mt-4 text-base leading-7 text-ink sm:text-lg sm:leading-8">
              {t.projects.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t.projects.kicker}>
            {(["All", ...projectCategories] as const).map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  filter === f
                    ? "border-charcoal bg-charcoal text-white shadow-md"
                    : "border-black/10 bg-white text-ink hover:border-gold hover:text-gold-deep"
                )}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((meta, i) => {
            const d = t.projects.items[meta.id];
            return (
              <Reveal key={meta.id} delay={i * 0.05} className="h-full">
                <article className="card-surface group h-full overflow-hidden">
                  <button
                    onClick={() => setActive(meta)}
                    className="block w-full text-left focus-visible:outline-none"
                    aria-label={t.projects.viewDetails}
                  >
                    <div className="relative h-52 overflow-hidden sm:h-56">
                      <img
                        src={meta.image}
                        alt={d.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-soft">
                            {meta.client}
                          </p>
                          <h3 className="mt-1 text-xl font-bold text-white">{d.title}</h3>
                        </div>
                        <Badge className="shrink-0 rounded-full bg-gold text-charcoal hover:bg-gold">
                          {filterLabels[meta.category]}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-5">
                      <p className="text-sm font-medium text-ink">{d.service}</p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-charcoal transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox dialog */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[92vh] w-[94vw] max-w-3xl overflow-y-auto rounded-3xl p-0 nice-scroll">
          {active && (
            <div>
              {(() => {
                const d = t.projects.items[active.id];
                return (
                  <div>
                    <div className="relative h-64 w-full overflow-hidden sm:h-80">
                      <img src={active.image} alt={d.alt} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-soft">{active.client}</p>
                        <DialogHeader className="mt-1 space-y-0 text-left">
                          <DialogTitle className="text-2xl font-bold text-white sm:text-3xl">
                            {d.title}
                          </DialogTitle>
                          <DialogDescription className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                            <PinIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                            {active.location}
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8">
                      <Badge className="rounded-full bg-gold/15 text-gold-deep hover:bg-gold/15">
                        {d.service}
                      </Badge>
                      <p className="mt-5 text-base leading-8 text-ink">{d.summary}</p>
                      <h4 className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-charcoal">
                        {t.projects.scopeTitle}
                      </h4>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {d.scope.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-2.5 rounded-xl bg-cream px-4 py-3 text-sm font-medium text-charcoal"
                          >
                            <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#quote"
                        onClick={() => setActive(null)}
                        className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-charcoal px-7 text-sm font-semibold text-white transition hover:bg-gold hover:text-charcoal"
                      >
                        {t.projects.ctaSimilar}
                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
