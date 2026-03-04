"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  JSX,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import translations from "./translations.json";



export type Locale = "en" | "es" | "pt" | "id";

export const LOCALES: { code: Locale; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "id", name: "Bahasa", flag: "🇮🇩" },
];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split(".");
  let result: any = obj;
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return typeof result === "string" ? result : undefined;
}

export function I18nProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && translations[stored]) {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language.split("-")[0] as Locale;
      if (translations[browserLang]) {
        setLocaleState(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    const urlLocale = searchParams.get("lang") as Locale | null;
    if (urlLocale && translations[urlLocale] && urlLocale !== locale) {
      setLocaleState(urlLocale);
    }
  }, [searchParams, locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale);

      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", newLocale);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const translation = getNestedValue(translations[locale], key);

      if (!translation) {
        const fallback = getNestedValue(translations.en, key);
        if (!fallback) {
          console.warn(`Missing translation for key: ${key}`);
          return key;
        }
        return fallback;
      }

      if (!params) return translation;

      return translation.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return params[paramKey]?.toString() ?? `{${paramKey}}`;
      });
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale, locales: LOCALES };
}
