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
import { Reveal } from "@/components/entlelo/reveal";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, WhatsAppIcon, CheckCircleIcon, ArrowRightIcon } from "@/components/entlelo/icons";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .min(9, "Please enter a valid contact number")
    .max(20)
    .regex(/^[0-9+()\s-]+$/, "Digits, spaces, +, - and brackets only"),
  email: z.string().trim().email("Please enter a valid email").or(z.literal("")),
  clientType: z.enum(["Homeowner", "Developer", "Business", "Contractor"]),
  service: z.string().trim().min(2, "Please select a service"),
  suburb: z.string().trim().min(2, "Please tell us where the site is"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const clientTypes = ["Homeowner", "Developer", "Business", "Contractor"] as const;

export function QuoteSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
        throw new Error(json.error || "Could not send your request");
      }
      setSuccess(true);
      reset();
      toast({
        title: "Request sent successfully",
        description: "Our team will call you back shortly.",
      });
    } catch (err) {
      toast({
        title: "Could not send request",
        description:
          err instanceof Error ? err.message : "Please try again, or call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="quote" className="scroll-mt-24 bg-charcoal py-20 text-white sm:py-24" aria-label="Request a quote">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact info column */}
        <Reveal>
          <p className="kicker-on-dark">Request a quote</p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us what you need. We&rsquo;ll measure, quote, deliver.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-8 text-white/70">
            Fill in the form and we&rsquo;ll come back to you — or reach us directly on the details below.
            Quotes are free and come with no obligation.
          </p>

          <ul className="mt-9 space-y-5">
            <li>
              <a href={`tel:${company.phonePrimary.replace(/\s/g, "")}`} className="group flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition group-hover:bg-gold group-hover:text-charcoal">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Call us</span>
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
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">WhatsApp</span>
                  <span className="mt-0.5 block text-base font-semibold text-white transition group-hover:text-gold">
                    Message us instantly
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
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Email</span>
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
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Find us</span>
                <span className="mt-0.5 block max-w-xs text-sm leading-6 text-white/80">{company.address}</span>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <ClockIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Hours</span>
                <span className="mt-0.5 block max-w-xs text-sm leading-6 text-white/80">{company.hours}</span>
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
                <h3 className="mt-6 text-2xl font-bold">Request received!</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-ink">
                  Thank you — one of our team will call you back shortly to confirm details and arrange a
                  site visit. Need us urgently?
                </p>
                <a
                  href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}
                  className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-charcoal px-7 text-sm font-semibold text-white transition hover:bg-gold hover:text-charcoal"
                >
                  <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  Call {company.phonePrimary}
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-5 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <h3 className="text-xl font-bold">Request a tailored quote</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="q-name">Full name *</Label>
                    <Input id="q-name" placeholder="e.g. Sipho Ndlovu" aria-invalid={!!errors.name} {...register("name")} />
                    {errors.name && <p className="text-xs font-medium text-red-600">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-phone">Contact number *</Label>
                    <Input id="q-phone" type="tel" placeholder="e.g. 083 710 3475" aria-invalid={!!errors.phone} {...register("phone")} />
                    {errors.phone && <p className="text-xs font-medium text-red-600">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="q-email">Email (optional)</Label>
                  <Input id="q-email" type="email" placeholder="you@example.co.za" aria-invalid={!!errors.email} {...register("email")} />
                  {errors.email && <p className="text-xs font-medium text-red-600">{errors.email.message}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="q-type">I am a… *</Label>
                    <input type="hidden" {...register("clientType")} />
                    <Select value={clientType} onValueChange={(v) => setValue("clientType", v as FormValues["clientType"])}>
                      <SelectTrigger id="q-type" className="w-full">
                        <SelectValue placeholder="Select client type" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientTypes.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="q-service">Service needed *</Label>
                    <input type="hidden" {...register("service")} />
                    <Select value={service} onValueChange={(v) => setValue("service", v)}>
                      <SelectTrigger id="q-service" className="w-full" aria-invalid={!!errors.service}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.title}>
                            {s.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="Something else">Something else / not sure</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="text-xs font-medium text-red-600">{errors.service.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="q-suburb">Site location / suburb *</Label>
                  <Input id="q-suburb" placeholder="e.g. Roodepoort, Johannesburg" aria-invalid={!!errors.suburb} {...register("suburb")} />
                  {errors.suburb && <p className="text-xs font-medium text-red-600">{errors.suburb.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="q-message">Project details (optional)</Label>
                  <Textarea
                    id="q-message"
                    rows={4}
                    placeholder="Tell us about the work, size, timing — anything that helps us quote accurately."
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
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Request My Free Quote
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs leading-5 text-ink/70">
                  We aim to respond the same working day. Your details are only used to prepare your quote.
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
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Areas we service</p>
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
                + greater Gauteng
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
