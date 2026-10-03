"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  HTML_LOCALES,
  LANG_STORAGE_KEY,
  detectLanguage,
  isLangCode,
  type LangCode,
} from "@/lib/i18n/config";
import { dictionaries, type Dict } from "@/lib/i18n/translations";

type I18nValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  // Restore the visitor's stored language (or detect from the browser)
  // after hydration so server and client markup stay consistent. The
  // state update is deferred to a frame to avoid cascading renders
  // inside the effect body (react-hooks/set-state-in-effect).
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      } catch {
        /* storage unavailable — ignore */
      }
      const initial = isLangCode(stored) ? stored : detectLanguage(navigator.language);
      setLangState(initial);
      document.documentElement.lang = HTML_LOCALES[initial];
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    document.documentElement.lang = HTML_LOCALES[next];
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
