"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { company, services, serviceAreas } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { Reveal } from "@/components/entlelo/reveal";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, WhatsAppIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/entlelo/icons";

const clientTypeValues = ["Homeowner", "Developer", "Business", "Contractor"] as const;

export function QuoteSection() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const formSchema = z.object({
    name: z.string().trim().min(2, t.quote.errors.name),
    phone: z
      .string()
      .trim()
      .min(9, t.quote.errors.phone)
      .max(20)
      .regex(/^[0-9+()\s-]+$/, t.quote.errors.phoneChars),
    email: z.string().trim().email(t.quote.errors.email).or(z.literal("")),
    clientType: z.enum(clientTypeValues),
    service: z.string().trim().min(2, t.quote.errors.service),
    suburb: z.string().trim().min(2, t.quote.errors.suburb),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      clientType: "Homeowner",
      service: "",
      suburb: "",
      message: "",
    },
  });

  const clientType = watch("clientType");
  const service = watch("service");

  const clientTypeLabels: Record<(typeof clientTypeValues)[number], string> = {
    Homeowner: t.quote.clientTypes.homeowner,
    Developer: t.quote.clientTypes.developer,
    Business: t.quote.clientTypes.business,
    Contractor: t.quote.clientTypes.contractor,
  };

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || t.quote.toastErrorTitle);
      }
      setSuccess(true);
      reset();
      toast({
        title: t.quote.toastSuccessTitle,
        description: t.quote.toastSuccessDesc,
      });
    } catch (err) {
      toast({
        title: t.quote.toastErrorTitle,
        description:
          err instanceof Error ? err.message : t.quote.toastErrorDesc,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="quote" className="scroll-mt-24 bg-charcoal py-20 text-white sm:py-24" aria-label={t.a11y.quoteSection}>
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact info column */}
        <Reveal>
          <p className="kicker-on-dark">{t.quote.kicker}</p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {t.quote.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-white/70">
            {t.quote.subtitle}
          </p>

          <ul className="mt-9 space-y-5">
            <li>
              <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`} className="group flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-charcoal">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.quote.callUs}</span>
                  <span className="mt-0.5 block text-base font-semibold text-white transition group-hover:text-gold">
                    {company.phonePrimary} · {company.phoneSecondary}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                  "Hi Entlelo Group, I'd like a quote for fencing/scaffolding work."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-charcoal">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.quote.whatsapp}</span>
                  <span className="mt-0.5 block text-base font-semibold text-white transition group-hover:text-gold">
                    {t.quote.whatsappCta}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="group flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-charcoal">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.quote.email}</span>
                  <span className="mt-0.5 block text-base font-semibold text-white transition group-hover:text-gold">
                    {company.email}
                  </span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <PinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.quote.findUs}</span>
                <span className="mt-0.5 block max-w-xs text-sm leading-6 text-white/80">{company.address}</span>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <ClockIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.quote.hours}</span>
                <span className="mt-0.5 block max-w-xs text-sm leading-6 text-white/80">
                  {t.quote.hoursText}
                </span>
              </span>
            </li>
          </ul>
        </Reveal>

        {/* Form column */}
        <Reveal delay={0.12}>
          <div className="rounded-[28px] border border-white/10 bg-white p-6 text-charcoal shadow-2xl sm:p-8">
            {success ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                  <CheckCircleIcon className="h-10 w-10" />
                </span>
                <h3 className="mt-6 text-2xl font-bold">{t.quote.successTitle}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-ink">
                  {t.quote.successBody}
                </p>
                <a
                  href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}
                  className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-charcoal px-7 text-sm font-semibold text-white transition hover:bg-gold hover:text-charcoal"
                >
                  <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  {t.faq.call} {company.phonePrimary}
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-5 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
                >
                  {t.quote.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <h3 className="text-xl font-bold">{t.quote.formTitle}</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="q-name">{t.quote.fullName}</Label>
                    <Input id="q-name" placeholder={t.quote.namePh} aria-invalid={!!errors.name} {...register("name")} />
                    {errors.name && <p className="text-xs font-medium text-red-600">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-phone">{t.quote.contactNumber}</Label>
                    <Input id="q-phone" type="tel" placeholder={t.quote.phonePh} aria-invalid={!!errors.phone} {...register("phone")} />
                    {errors.phone && <p className="text-xs font-medium text-red-600">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="q-email">{t.quote.emailOptional}</Label>
                  <Input id="q-email" type="email" placeholder={t.quote.emailPh} aria-invalid={!!errors.email} {...register("email")} />
                  {errors.email && <p className="text-xs font-medium text-red-600">{errors.email.message}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="q-type">{t.quote.clientType}</Label>
                    <input type="hidden" {...register("clientType")} />
                    <Select value={clientType} onValueChange={(v) => setValue("clientType", v as FormValues["clientType"])}>
                      <SelectTrigger id="q-type" className="w-full">
                        <SelectValue placeholder={t.quote.clientTypePh} />
                      </SelectTrigger>
                      <SelectContent>
                        {clientTypeValues.map((c) => (
                          <SelectItem key={c} value={c}>
                            {clientTypeLabels[c]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-service">{t.quote.service}</Label>
                    <input type="hidden" {...register("service")} />
                    <Select value={service} onValueChange={(v) => setValue("service", v)}>
                      <SelectTrigger id="q-service" className="w-full" aria-invalid={!!errors.service}>
                        <SelectValue placeholder={t.quote.servicePh} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.apiTitle}>
                            {t.services.items[s.id].title}
                          </SelectItem>
                        ))}
                        <SelectItem value="Something else">{t.quote.serviceOther}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="text-xs font-medium text-red-600">{errors.service.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="q-suburb">{t.quote.suburb}</Label>
                  <Input id="q-suburb" placeholder={t.quote.suburbPh} aria-invalid={!!errors.suburb} {...register("suburb")} />
                  {errors.suburb && <p className="text-xs font-medium text-red-600">{errors.suburb.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="q-message">{t.quote.details}</Label>
                  <Textarea
                    id="q-message"
                    rows={4}
                    placeholder={t.quote.detailsPh}
                    className="resize-none"
                    {...register("message")}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 w-full rounded-full bg-gold text-base font-semibold text-charcoal transition hover:bg-charcoal hover:text-gold disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2.5">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/30 border-t-charcoal" aria-hidden="true" />
                      {t.quote.sending}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t.quote.submit}
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs leading-5 text-ink/70">
                  {t.quote.privacy}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* Areas served strip */}
      <div className="section-shell mt-16">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{t.quote.areasTitle}</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-medium text-white/80 transition hover:border-gold/50 hover:text-gold"
                >
                  {area}
                </li>
              ))}
              <li className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
                {t.quote.greaterGauteng}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
