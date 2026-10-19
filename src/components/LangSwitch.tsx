"use client";

import { locales } from "@/content/types";
import { useCatalog } from "./catalog";
import { IconGlobe } from "./icons";

export default function LangSwitch({ className }: { className?: string }) {
  const { dict } = useCatalog();
  return (
    <nav className={`lang ${className ?? ""}`} aria-label={dict.nav.language}>
      <IconGlobe />
      {locales.map((l) => (
        <a key={l} href={`/${l}`} hrefLang={l} lang={l} aria-current={l === dict.locale ? "page" : undefined} className="lang__opt">
          {l.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
