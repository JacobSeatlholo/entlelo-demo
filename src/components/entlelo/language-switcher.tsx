"use client";

import { Check, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/**
 * Language switcher — English + South Africa's official languages.
 * Used in the desktop header, the mobile sheet menu and (as a compact
 * variant) inside the sheet footer.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const active = LANGUAGES.find((l) => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="entlelo-lang-trigger"
          variant="outline"
          className={cn(
            "h-10 gap-1.5 rounded-full border-black/10 bg-white px-3 text-sm font-semibold text-charcoal transition hover:border-gold hover:text-gold-deep",
            className
          )}
          aria-label={`${t.lang.change} — ${t.lang.label}: ${active?.native ?? "English"}`}
        >
          <Languages className="h-4 w-4 text-gold-deep" aria-hidden="true" />
          <span className="uppercase">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="max-h-[min(60vh,26rem)] w-56 overflow-y-auto nice-scroll"
      >
        <DropdownMenuLabel className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">
          {t.lang.label}
        </DropdownMenuLabel>
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className={cn(
              "cursor-pointer justify-between gap-3 rounded-lg text-sm",
              l.code === lang && "bg-gold/10 font-semibold text-charcoal"
            )}
            aria-current={l.code === lang ? "true" : undefined}
          >
            <span>{l.native}</span>
            {l.code === lang && <Check className="h-4 w-4 text-gold-deep" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
