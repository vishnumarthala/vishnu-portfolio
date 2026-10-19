"use client";

import { searchTitles, mailto, useCatalog } from "./catalog";
import LangSwitch from "./LangSwitch";
import Tile from "./Tile";
import { IconArrowRight, IconLinkedIn, IconMail, IconPhone, IconPin, IconPlus } from "./icons";

export function SearchResults({ query }: { query: string }) {
  const { dict } = useCatalog();
  const ids = searchTitles(dict, query);
  const q = query.trim();
  return (
    <section className="results" aria-labelledby="results-title">
      <h2 id="results-title" className="results__title" aria-live="polite">
        {ids.length ? dict.nav.searchResults.replace("{q}", q) : dict.nav.searchEmpty.replace("{q}", q)}
      </h2>
      {ids.length ? (
        <ol className="results__grid">
          {ids.map((id, i) => (
            <Tile key={id} id={id} kind="standard" index={i} />
          ))}
        </ol>
      ) : null}
    </section>
  );
}

export function Contact() {
  const { dict } = useCatalog();
  const c = dict.contact;
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact__title">
        {c.title}
      </h2>
      <p className="contact__lead">{c.lead}</p>
      <div className="contact__cta">
        <a className="btn btn--brand btn--xl" href={mailto(c.email)}>
          {dict.ui.getInTouch}
          <IconArrowRight />
        </a>
        <a className="contact__email" href={mailto(c.email)}>
          {c.email}
        </a>
      </div>
      <ul className="contact__list">
        <li>
          <IconPhone />
          <a href={c.phoneHref}>{c.phone}</a>
        </li>
        {c.linkedin ? (
          <li>
            <IconLinkedIn />
            <a href={c.linkedin} target="_blank" rel="noopener noreferrer">
              {c.linkedinLabel}
            </a>
          </li>
        ) : null}
        <li>
          <IconMail />
          <a href={mailto(c.email)}>{c.email}</a>
        </li>
        <li>
          <IconPin />
          <span>{c.location}</span>
        </li>
      </ul>
    </section>
  );
}

export function Faq() {
  const { dict } = useCatalog();
  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq__title">
        {dict.faqTitle}
      </h2>
      <ul className="faq__list">
        {dict.faq.map((f) => (
          <li key={f.q}>
            <details className="faq__item">
              <summary>
                <span>{f.q}</span>
                <IconPlus className="faq__icon" />
              </summary>
              <p>{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  const { dict } = useCatalog();
  const f = dict.footer;
  return (
    <footer className="footer">
      <p className="footer__q">
        {f.questions} <a href={mailto(dict.contact.email)}>{dict.contact.email}</a>
      </p>
      <ul className="footer__links">
        {f.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <LangSwitch className="footer__lang" />
      <p className="footer__rights">{f.rights}</p>
    </footer>
  );
}
