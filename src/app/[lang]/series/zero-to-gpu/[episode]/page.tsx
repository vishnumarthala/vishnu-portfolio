import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Prose from "@/components/series/Prose";
import GpuArt from "@/components/series/gpuArt";
import SeriesShell, { EpisodeList, Finale } from "@/components/series/SeriesShell";
import ShareBar from "@/components/series/ShareBar";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { getDictionary } from "@/content";
import { SERIES_PATH, episodeSlugs, findEpisode, getSeries } from "@/content/series";
import { SITE_URL } from "@/content/site";
import { hasLocale, locales } from "@/content/types";

type Props = PageProps<"/[lang]/series/zero-to-gpu/[episode]">;

export function generateStaticParams() {
  return locales.flatMap((lang) => episodeSlugs().map((episode) => ({ lang, episode })));
}

async function load(params: Props["params"]) {
  const { lang, episode } = await params;
  if (!hasLocale(lang)) return null;
  const series = getSeries(lang);
  const found = findEpisode(series, episode);
  return found ? { lang, series, ...found } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { lang, series, episode, index } = data;
  const title = `${episode.title} · ${series.name} ${series.ui.episode} ${index + 1}`;
  const path = `${SERIES_PATH}/${episode.slug}`;
  return {
    title: { absolute: title },
    description: episode.summary,
    alternates: {
      canonical: `/${lang}/${path}`,
      languages: { en: `/en/${path}`, de: `/de/${path}`, "x-default": `/en/${path}` },
    },
    openGraph: { type: "article", title, description: episode.hook, url: `/${lang}/${path}` },
    twitter: { card: "summary_large_image", title, description: episode.hook },
  };
}

export default async function Page({ params }: Props) {
  const data = await load(params);
  if (!data) notFound();
  const { lang, series: s, episode: e, index } = data;
  const dict = getDictionary(lang);
  const total = s.episodes.length;
  const prev = s.episodes[index - 1];
  const next = s.episodes[index + 1];
  const base = `/${lang}/${SERIES_PATH}`;
  const url = `${SITE_URL}${base}/${e.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: e.title,
    description: e.summary,
    inLanguage: lang,
    url,
    timeRequired: `PT${e.minutes}M`,
    author: { "@type": "Person", name: dict.person.name, url: `${SITE_URL}/${lang}` },
    isPartOf: { "@type": "CreativeWorkSeries", name: s.name, url: `${SITE_URL}${base}` },
    position: index + 1,
  };

  return (
    <SeriesShell dict={dict} series={s} subpath={`/${e.slug}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <article className="episodePage">
        <header className="series__hero series__hero--episode">
          <GpuArt progress={(index + 1) / total} className="series__art" />
          <div className="series__heroText">
            <p className="meta-row">
              <Link className="meta-row__format series__crumb" href={base}>
                <span className="mono-chip" aria-hidden="true">
                  VM
                </span>
                {s.name}
              </Link>
              <span>
                {s.ui.episode} {index + 1} / {total}
              </span>
              <span>
                {e.minutes} {s.ui.minRead}
              </span>
            </p>
            <h1 className="series__title series__title--episode">{e.title}</h1>
            <p className="series__tagline">{e.hook}</p>
          </div>
        </header>

        <div className="series__body">
          <aside className="takeaways" aria-labelledby="takeaways-title">
            <h2 id="takeaways-title" className="takeaways__title">
              {s.ui.takeaways}
            </h2>
            <ul>
              {e.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </aside>

          <div className="prose">
            <Prose blocks={e.blocks} labels={{ tip: s.ui.tip, warn: s.ui.warn }} />
          </div>

          <ShareBar url={url} text={`${e.title}: ${e.hook}`} labels={s.ui} />

          <nav className="pager" aria-label={s.ui.episodes}>
            {prev ? (
              <Link className="pager__link" href={`${base}/${prev.slug}`} rel="prev">
                <span className="pager__dir">
                  <IconChevronLeft aria-hidden="true" />
                  {s.ui.prev}
                </span>
                <span className="pager__title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="pager__link pager__link--next" href={`${base}/${next.slug}`} rel="next">
                <span className="pager__dir">
                  {s.ui.next}
                  <IconChevronRight aria-hidden="true" />
                </span>
                <span className="pager__title">{next.title}</span>
              </Link>
            ) : null}
          </nav>

          <section aria-labelledby="eps-title">
            <h2 id="eps-title" className="series__h2">
              {s.ui.allEpisodes}
            </h2>
            <EpisodeList series={s} current={index} />
          </section>

          <Finale series={s} />
          <p className="series__disclaimer">{s.ui.disclaimer}</p>
        </div>
      </article>
    </SeriesShell>
  );
}
