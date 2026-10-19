"use client";

import { createContext, useContext } from "react";
import type { Dict, TitleId } from "@/content/types";

export interface Catalog {
  dict: Dict;
  open: (id: TitleId, source?: Element | null) => void;
}

export const CatalogContext = createContext<Catalog | null>(null);

export function useCatalog(): Catalog {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogContext");
  return ctx;
}

export const mailto = (email: string, subject?: string) =>
  `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

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
