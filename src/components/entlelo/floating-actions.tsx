"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/site-data";
import { useI18n } from "@/lib/i18n/language-context";
import { PhoneIcon, WhatsAppIcon } from "@/components/entlelo/icons";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 sm:bottom-6 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <a
        href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
          "Hi Entlelo Group, I'd like a quote for fencing/scaffolding work."
        )}`}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.6)] transition hover:scale-105"
        aria-label={t.a11y.whatsapp}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
      <a
        href={`tel:${company.phonePrimary.replace(/\s/g, "")}`}
        className="flex items-center justify-center rounded-full bg-gold p-3.5 text-charcoal shadow-[0_10px_28px_-8px_rgba(215,166,72,0.7)] transition hover:scale-105"
        aria-label={t.a11y.call}
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
    </div>
  );
}
