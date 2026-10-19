"use client";

import { useRef } from "react";
import type { TitleId } from "@/content/types";
import KeyArt from "./KeyArt";
import { mailto, useCatalog } from "./catalog";
import { IconInfo, IconMail } from "./icons";

export default function Billboard({ id }: { id: TitleId }) {
  const { dict, open } = useCatalog();
  const { person, ui } = dict;
  const t = dict.titles[id];
  const isPerson = id === "vishnu";
  const mediaRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bb" data-bb={id} aria-labelledby={`bb-${id}`}>
      <div className="bb__media" ref={mediaRef} aria-hidden="true">
        <KeyArt id={id} name={t.name} shape="hero" bare />
      </div>
      <div className="bb__content">
        {isPerson ? (
          <h1 id={`bb-${id}`} className="bb__title face--cond">
            {person.name}
          </h1>
        ) : (
          <>
            <h1 className="sr-only">
              {person.name}, {person.role}
            </h1>
            <h2 id={`bb-${id}`} className="bb__title face--wide">
              {t.name}
            </h2>
          </>
        )}
        <p className="bb__role">
          <span className="mono-chip" aria-hidden="true">
            VM
          </span>
          <span className="bb__format">{t.format}</span>
          {isPerson ? person.role : `${t.role} · ${t.meta.join(" · ")}`}
        </p>
        <p className="bb__headline">{isPerson ? person.headline : t.tagline}</p>
        <p className="bb__synopsis">{isPerson ? person.intro : t.synopsis}</p>
        <div className="bb__actions">
          <a className="btn btn--brand btn--lg" href={mailto(dict.contact.email)}>
            <IconMail />
            {ui.getInTouch}
          </a>
          <button
            type="button"
            className="btn btn--grey btn--lg"
            aria-haspopup="dialog"
            onClick={() => open(id, mediaRef.current?.querySelector(".art"))}
          >
            <IconInfo />
            {ui.moreInfo}
          </button>
        </div>
        <ul className="bb__facts" aria-label={isPerson ? undefined : t.name}>
          {(isPerson ? person.facts : t.tags).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
