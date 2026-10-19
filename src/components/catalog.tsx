"use client";

import { createContext, useContext } from "react";
import type { Dict, TitleId } from "@/content/types";

export type ContactTab = "message" | "hiring";

export interface ContactRequest {
  tab?: ContactTab;
  topic?: string;
}

export interface Catalog {
  dict: Dict;
  open: (id: TitleId, source?: Element | null) => void;
  contact: (req?: ContactRequest) => void;
}

/** Titles that belong to the India-to-Germany hiring track; their contact opens the hiring request. */
export const HIRING_TITLES: ReadonlySet<TitleId> = new Set<TitleId>([
  "talent-india",
  "indofachkraft",
  "ausbildung-assist",
  "marthala-solutions",
  "remote-talent",
]);

export const CatalogContext = createContext<Catalog | null>(null);

export function useCatalog(): Catalog {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogContext");
  return ctx;
}

export const mailto = (email: string, subject?: string, body?: string) => {
  const q = [
    subject ? `subject=${encodeURIComponent(subject)}` : "",
    body ? `body=${encodeURIComponent(body)}` : "",
  ].filter(Boolean);
  return `mailto:${email}${q.length ? `?${q.join("&")}` : ""}`;
};

export const whatsapp = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API is unavailable on insecure origins and some embedded browsers.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function searchTitles(dict: Dict, query: string): TitleId[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return (Object.keys(dict.titles) as TitleId[]).filter((id) => {
    const t = dict.titles[id];
    const tokens = fold(
      [
        t.name,
        t.format,
        t.role,
        t.place,
        t.tagline,
        t.synopsis,
        ...t.meta,
        ...t.tags,
        ...(t.episodes?.items.map((e) => `${e.title} ${e.text ?? ""}`) ?? []),
      ].join(" "),
    ).split(/[^\p{L}\p{N}]+/u);
    // Match from the start of words, so "rag" finds RAG but not "eingetragener".
    return words.every((w) => tokens.some((tok) => tok.startsWith(w)));
  });
}

export function relatedTitles(dict: Dict, id: TitleId, limit = 6): TitleId[] {
  const out: TitleId[] = [];
  for (const row of dict.rows) {
    if (!row.items.includes(id)) continue;
    for (const other of row.items) if (other !== id && !out.includes(other)) out.push(other);
  }
  if (out.length < 3) {
    for (const row of dict.rows)
      for (const other of row.items) if (other !== id && !out.includes(other)) out.push(other);
  }
  return out.slice(0, limit);
}
