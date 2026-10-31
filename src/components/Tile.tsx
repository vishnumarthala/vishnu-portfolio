"use client";

import type { RowKind, TitleId } from "@/content/types";
import KeyArt from "./KeyArt";
import { useCatalog } from "./catalog";
import { IconChevronDown, IconChat } from "./icons";

interface Props {
  id: TitleId;
  kind: RowKind;
  index: number;
}

export default function Tile({ id, kind, index }: Props) {
  const { dict, open, contact } = useCatalog();
  const t = dict.titles[id];
  const { ui } = dict;
  const band =
    t.status === "current" || t.status === "new"
      ? { text: t.status === "new" ? ui.isNew : ui.current, tone: "current" as const }
      : t.status === "soon"
        ? { text: ui.comingSoon, tone: "soon" as const }
        : undefined;

  return (
    <li className={`slot slot--${kind}`}>
      {kind === "numbered" ? (
        <span className="slot__num" aria-hidden="true">
          {index + 1}
        </span>
      ) : null}
      <article className="tile" data-tile={id}>
        <button
          type="button"
          className="tile__hit"
          aria-haspopup="dialog"
          onClick={(e) => open(id, e.currentTarget.querySelector(".art"))}
        >
          <KeyArt id={id} name={t.name} shape={kind === "numbered" ? "poster" : "tile"} badge={t.format} band={band} />
          <span className="sr-only">
            {t.name}. {t.format}. {t.meta.join(", ")}. {ui.details}
          </span>
        </button>
        <div className="tile__preview" aria-hidden="true">
          <div className="tile__actions">
            <span className="round-btn round-btn--solid">
              <IconChevronDown />
            </span>
            <span className="tile__hint">{ui.details}</span>
          </div>
          <p className="tile__meta">
            {t.status ? <span className={`pill pill--${t.status}`}>{band?.text}</span> : null}
            {t.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
          <p className="tile__tags">
            {t.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
        </div>
        {kind === "wide" ? (
          <div className="tile__below">
            <p className="tile__tagline">{t.tagline}</p>
          </div>
        ) : null}
        {kind === "soon" ? (
          <div className="tile__below">
            <p className="tile__status">
              <span className="pill pill--soon">{ui.comingSoon}</span> {t.meta.join(" · ")}
            </p>
            <h3 className="tile__name">{t.name}</h3>
            {t.tagline ? <p className="tile__tagline">{t.tagline}</p> : null}
            <button type="button" className="text-btn" aria-haspopup="dialog" onClick={() => contact({ tab: "message", topic: t.name })}>
              <IconChat />
              {ui.notify}
            </button>
          </div>
        ) : null}
      </article>
    </li>
  );
}
