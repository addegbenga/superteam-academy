"use client";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5  bg-background py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
            <Terminal className="w-3 h-3 text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer.terms")}
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer.privacy")}
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            {t("footer.twitter")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
