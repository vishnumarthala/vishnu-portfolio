import Link from "next/link";
import type { ReactNode } from "react";
import { SERIES_PATH } from "@/content/series";
import type { Series } from "@/content/series/types";
import { locales, type Dict } from "@/content/types";
import { IconGlobe } from "../icons";

interface Props {
  dict: Dict;
  series: Series;
  /** Path after the series root, e.g. "/drivers", so the language switch keeps the reader in place. */
  subpath?: string;
  children: ReactNode;
}

export default function SeriesShell({ dict, series, subpath = "", children }: Props) {
  const lang = dict.locale;
  return (
    <div className="series">
      <a className="skip" href="#main">
        {dict.nav.skip}
      </a>
      <header className="series__bar">
        <Link className="wordmark" href={`/${lang}`}>
          Vishnu Marthala
        </Link>
        <div className="series__barEnd">
          <nav className="lang" aria-label={dict.nav.language}>
            <IconGlobe />
            {locales.map((l) => (
              <a
                key={l}
                href={`/${l}/${SERIES_PATH}${subpath}`}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "page" : undefined}
                className="lang__opt"
              >
                {l.toUpperCase()}
              </a>
            ))}
          </nav>
          <Link className="text-btn series__back" href={`/${lang}`}>
            {series.ui.back}
          </Link>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="series__foot">
        <span>{dict.footer.rights}</span>
        <Link href={`/${lang}/impressum`}>Impressum</Link>
        <Link href={`/${lang}/datenschutz`}>{lang === "de" ? "Datenschutz" : "Privacy"}</Link>
      </footer>
    </div>
  );
}

export function EpisodeList({ series, current }: { series: Series; current?: number }) {
  const lang = series.locale;
  return (
    <ol className="series__episodes">
      {series.episodes.map((e, i) => (
        <li key={e.slug} className="series__ep" aria-current={i === current ? "page" : undefined}>
          <Link href={`/${lang}/${SERIES_PATH}/${e.slug}`} className="series__epLink">
            <span className="series__epN" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="series__epText">
              <span className="series__epTitle">
                <span className="sr-only">
                  {series.ui.episode} {i + 1}:{" "}
                </span>
                {e.title}
              </span>
              <span className="series__epHook">{e.hook}</span>
            </span>
            <span className="series__epMin">
              {e.minutes} {series.ui.minRead}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function Finale({ series }: { series: Series }) {
  return (
    <section className="series__finale" aria-labelledby="finale-title">
      <h2 id="finale-title">{series.ui.finaleHeading}</h2>
      <p>{series.ui.finaleText}</p>
      <Link className="btn btn--brand btn--lg" href={`/${series.locale}#contact`}>
        {series.ui.talk}
      </Link>
    </section>
  );
}
