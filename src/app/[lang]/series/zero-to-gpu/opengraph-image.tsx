import { getDictionary } from "@/content";
import { getSeries } from "@/content/series";
import { hasLocale } from "@/content/types";
import { OG_SIZE, ogCard } from "@/components/series/ogCard";

export const alt = "Zero to GPU";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const s = getSeries(locale);
  const dict = getDictionary(locale);
  return ogCard({
    kicker: `VM · ${s.format} · ${s.episodes.length} ${s.ui.episodes}`,
    title: s.name,
    hook: s.tagline,
    progress: 0.55,
    byline: `${dict.person.name} · AI Solution Architect`,
  });
}
