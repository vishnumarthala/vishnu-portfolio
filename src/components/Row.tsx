"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Row as RowT } from "@/content/types";
import Tile from "./Tile";
import { useCatalog } from "./catalog";
import { IconChevronLeft, IconChevronRight } from "./icons";

export default function Row({ row }: { row: RowT }) {
  const { dict } = useCatalog();
  const railRef = useRef<HTMLOListElement>(null);
  const [state, setState] = useState({ prev: false, next: false, page: 0, pages: 1 });

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    setState({
      prev: el.scrollLeft > 4,
      next: el.scrollLeft < max - 4,
      page: max > 0 ? Math.round((el.scrollLeft / max) * (pages - 1)) : 0,
      pages,
    });
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.86, behavior: reduce ? "auto" : "smooth" });
  };

  const headingId = `row-${row.id}-title`;

  return (
    <section className={`row row--${row.kind}`} id={row.id} data-row={row.id} aria-labelledby={headingId}>
      <header className="row__head">
        <h2 id={headingId} className="row__title">
          {row.title}
        </h2>
        {row.claim ? <p className="row__claim">{row.claim}</p> : null}
        {state.pages > 1 ? (
          <ol className="row__pages" aria-hidden="true">
            {Array.from({ length: state.pages }, (_, i) => (
              <li key={i} className={i === state.page ? "is-on" : undefined} />
            ))}
          </ol>
        ) : null}
      </header>
      <div className="rail-wrap">
        <button
          type="button"
          className="paddle paddle--prev"
          onClick={() => page(-1)}
          hidden={!state.prev}
          aria-label={dict.ui.prev}
          tabIndex={-1}
        >
          <IconChevronLeft />
        </button>
        <ol className="rail" ref={railRef}>
          {row.items.map((id, i) => (
            <Tile key={id} id={id} kind={row.kind} index={i} />
          ))}
        </ol>
        <button
          type="button"
          className="paddle paddle--next"
          onClick={() => page(1)}
          hidden={!state.next}
          aria-label={dict.ui.next}
          tabIndex={-1}
        >
          <IconChevronRight />
        </button>
      </div>
    </section>
  );
}
