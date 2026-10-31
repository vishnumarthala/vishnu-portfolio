import type { Locale } from "../types";
import type { Series, SeriesEpisode } from "./types";
import en from "./zero-to-gpu.en";
import de from "./zero-to-gpu.de";

const zeroToGpu: Record<Locale, Series> = { en, de };

export const SERIES_PATH = "series/zero-to-gpu";

export const getSeries = (locale: Locale): Series => zeroToGpu[locale];

/** Episode slugs are shared across languages, so a URL switches language by swapping only the prefix. */
export const episodeSlugs = (): string[] => en.episodes.map((e) => e.slug);

export function findEpisode(series: Series, slug: string): { episode: SeriesEpisode; index: number } | null {
  const index = series.episodes.findIndex((e) => e.slug === slug);
  return index === -1 ? null : { episode: series.episodes[index], index };
}

export const totalMinutes = (series: Series) => series.episodes.reduce((sum, e) => sum + e.minutes, 0);
