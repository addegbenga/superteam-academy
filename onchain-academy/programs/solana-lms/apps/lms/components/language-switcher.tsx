"use client";

import { useLocale } from "@/lib/i18n";
import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const currentLocale = locales.find((l) => l.code === locale);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{currentLocale?.flag}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 p-1 bg-zinc-950 border border-white/10 rounded-xl"
      >
        <div className="flex flex-col gap-0.5">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => setLocale(loc.code)}
              className={`
                flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors
                ${
                  locale === loc.code
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }
              `}
            >
              <span>{loc.flag}</span>
              <span>{loc.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
