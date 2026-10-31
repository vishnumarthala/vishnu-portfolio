import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GpuArt from "@/components/series/gpuArt";
import SeriesShell, { EpisodeList, Finale } from "@/components/series/SeriesShell";
import ShareBar from "@/components/series/ShareBar";
import { getDictionary } from "@/content";
import { SERIES_PATH, getSeries, totalMinutes } from "@/content/series";
import { SITE_URL } from "@/content/site";
import { hasLocale } from "@/content/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/series/zero-to-gpu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const s = getSeries(lang);
  const title = `${s.name}: ${s.tagline}`;
  return {
    title: { absolute: title },
    description: s.synopsis,
    alternates: {
      canonical: `/${lang}/${SERIES_PATH}`,
      languages: { en: `/en/${SERIES_PATH}`, de: `/de/${SERIES_PATH}`, "x-default": `/en/${SERIES_PATH}` },
    },
    openGraph: { type: "website", title, description: s.synopsis, url: `/${lang}/${SERIES_PATH}` },
    twitter: { card: "summary_large_image", title, description: s.synopsis },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/series/zero-to-gpu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const s = getSeries(lang);
  const url = `${SITE_URL}/${lang}/${SERIES_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: s.name,
    headline: s.tagline,
    description: s.synopsis,
    inLanguage: lang,
    url,
    author: { "@type": "Person", name: dict.person.name, url: `${SITE_URL}/${lang}` },
    hasPart: s.episodes.map((e, i) => ({
      "@type": "TechArticle",
      position: i + 1,
      headline: e.title,
      url: `${url}/${e.slug}`,
    })),
  };

  return (
    <SeriesShell dict={dict} series={s}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="series__hero">
        <GpuArt progress={0.55} className="series__art" />
        <div className="series__heroText">
          <p className="meta-row">
            <span className="meta-row__format">
              <span className="mono-chip" aria-hidden="true">
                VM
              </span>
              {s.format}
            </span>
            <span>
              {s.episodes.length} {s.ui.episodes}
            </span>
            <span>
              {totalMinutes(s)} {s.ui.minRead}
            </span>
            <span>EN · DE</span>
          </p>
          <h1 className="series__title face--cond">{s.name}</h1>
          <p className="series__tagline">{s.tagline}</p>
          <p className="series__synopsis">{s.synopsis}</p>
          <div className="series__actions">
            <Link className="btn btn--light btn--lg" href={`/${lang}/${SERIES_PATH}/${s.episodes[0].slug}`}>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
              </svg>
              {s.ui.start}
            </Link>
          </div>
        </div>
      </section>

      <div className="series__body">
        <div className="series__brief">
          {[s.audience, s.kit].map((b) => (
            <section key={b.heading}>
              <h2 className="series__h2">{b.heading}</h2>
              <ul>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section aria-labelledby="eps-title">
          <h2 id="eps-title" className="series__h2">
            {s.ui.episodes}
          </h2>
          <EpisodeList series={s} />
        </section>

        <ShareBar url={url} text={`${s.name}: ${s.tagline}`} labels={{ ...s.ui, share: s.ui.shareSeries }} />
        <Finale series={s} />
        <p className="series__disclaimer">{s.ui.disclaimer}</p>
      </div>
    </SeriesShell>
  );
}
