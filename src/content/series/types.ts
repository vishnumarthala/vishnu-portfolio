import type { Locale } from "../types";

/** Inline text supports `code` and **bold**; everything else stays plain. */
export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "code"; code: string; caption?: string }
  | { t: "note"; tone: "tip" | "warn"; text: string }
  | { t: "table"; head: string[]; rows: string[][] };

export interface SeriesEpisode {
  slug: string;
  title: string;
  /** One-line hook, used on cards, share images and social posts. */
  hook: string;
  /** Meta description, ideally under 160 characters. */
  summary: string;
  minutes: number;
  takeaways: string[];
  blocks: Block[];
}

export interface Series {
  locale: Locale;
  slug: string;
  name: string;
  tagline: string;
  format: string;
  synopsis: string;
  audience: { heading: string; items: string[] };
  kit: { heading: string; items: string[] };
  episodes: SeriesEpisode[];
  ui: {
    series: string;
    episode: string;
    episodes: string;
    minRead: string;
    takeaways: string;
    start: string;
    prev: string;
    next: string;
    allEpisodes: string;
    back: string;
    share: string;
    shareSeries: string;
    shareLinkedIn: string;
    shareX: string;
    shareWhatsApp: string;
    copyLink: string;
    copied: string;
    finaleHeading: string;
    finaleText: string;
    talk: string;
    disclaimer: string;
    tip: string;
    warn: string;
  };
}
