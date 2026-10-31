import { getDictionary } from "@/content";
import { findEpisode, getSeries } from "@/content/series";
import { hasLocale } from "@/content/types";
import { OG_SIZE, ogCard } from "@/components/series/ogCard";

export const alt = "Zero to GPU";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string; episode: string }> }) {
  const { lang, episode } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const s = getSeries(locale);
  const found = findEpisode(s, episode) ?? { episode: s.episodes[0], index: 0 };
  return ogCard({
    kicker: `${s.name} · ${s.ui.episode} ${found.index + 1}/${s.episodes.length}`,
    title: found.episode.title,
    hook: found.episode.hook,
    progress: (found.index + 1) / s.episodes.length,
    byline: `${getDictionary(locale).person.name} · AI Solution Architect`,
  });
}
