"use client";

import { useLayoutEffect, useRef } from "react";
import { art } from "@/content/art";
import type { TitleId } from "@/content/types";
import KeyArt from "./KeyArt";
import { mailto, relatedTitles, useCatalog } from "./catalog";
import { IconClose, IconExternal, IconMail } from "./icons";

interface Props {
  id: TitleId | null;
  onRequestClose: () => void;
}

export default function TitleDialog({ id, onRequestClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (id && !d.open) d.showModal();
    if (!id && d.open) d.close();
    if (id) d.scrollTop = 0;
  }, [id]);

  return (
    <dialog
      ref={ref}
      className="dlg"
      aria-labelledby="dlg-title"
      onCancel={(e) => {
        e.preventDefault();
        onRequestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onRequestClose();
      }}
    >
      {id ? <Body id={id} onRequestClose={onRequestClose} /> : null}
    </dialog>
  );
}

function Body({ id, onRequestClose }: { id: TitleId; onRequestClose: () => void }) {
  const { dict, open } = useCatalog();
  const { ui } = dict;
  const t = dict.titles[id];
  const more = relatedTitles(dict, id);

  return (
    <div className="dlg__sheet">
      <div className="dlg__hero">
        <KeyArt id={id} name={t.name} shape="hero" bare style={{ viewTransitionName: "vm-art" }} />
        <button type="button" className="round-btn round-btn--dark dlg__close" onClick={onRequestClose} aria-label={ui.close}>
          <IconClose />
        </button>
        <div className="dlg__heroText">
          <h2 id="dlg-title" className={`dlg__title face--${art[id].face}`}>
            {t.name}
          </h2>
          <div className="dlg__actions">
            <a className="btn btn--brand" href={mailto(dict.contact.email, t.name)}>
              <IconMail />
              {ui.getInTouch}
            </a>
            {t.link ? (
              <a className="btn btn--ghost" href={t.link.href} target="_blank" rel="noopener noreferrer">
                <IconExternal />
                {t.link.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="dlg__body">
        <div className="dlg__main">
          <p className="meta-row">
            <span className="meta-row__format">
              <span className="mono-chip" aria-hidden="true">
                VM
              </span>
              {t.format}
            </span>
            {t.status ? (
              <span className={`pill pill--${t.status}`}>{t.status === "current" ? ui.current : ui.comingSoon}</span>
            ) : null}
            {t.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
          {t.tagline ? <p className="dlg__tagline">{t.tagline}</p> : null}
          <p className="dlg__synopsis">{t.synopsis}</p>
        </div>
        <dl className="dlg__facts">
          {t.role ? (
            <div>
              <dt>{ui.role}</dt>
              <dd>{t.role}</dd>
            </div>
          ) : null}
          {t.place ? (
            <div>
              <dt>{ui.place}</dt>
              <dd>{t.place}</dd>
            </div>
          ) : null}
          <div>
            <dt>{ui.tags}</dt>
            <dd>{t.tags.join(", ")}</dd>
          </div>
        </dl>
      </div>

      {t.episodes ? (
        <section className="dlg__section" aria-labelledby="dlg-episodes">
          <h3 id="dlg-episodes" className="dlg__h3">
            {t.episodes.heading}
          </h3>
          <ol className="episodes">
            {t.episodes.items.map((ep, i) => (
              <li key={ep.title} className="episode">
                <span className="episode__n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h4 className="episode__title">{ep.title}</h4>
                  {ep.text ? <p className="episode__text">{ep.text}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {more.length ? (
        <section className="dlg__section" aria-labelledby="dlg-more">
          <h3 id="dlg-more" className="dlg__h3">
            {ui.moreLikeThis}
          </h3>
          <ul className="more">
            {more.map((m) => {
              const mt = dict.titles[m];
              return (
                <li key={m}>
                  <button type="button" className="more__card" onClick={() => open(m)}>
                    <KeyArt id={m} name={mt.name} badge={mt.format} />
                    <span className="more__meta">{mt.meta.join(" · ")}</span>
                    <span className="more__text">{mt.tagline ?? mt.synopsis}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
