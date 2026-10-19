"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import type { Dict, ProfileId, TitleId } from "@/content/types";
import { CatalogContext } from "./catalog";
import Billboard from "./Billboard";
import Intro from "./Intro";
import Nav from "./Nav";
import ProfileGate from "./ProfileGate";
import Row from "./Row";
import { Contact, Faq, Footer, SearchResults } from "./Sections";
import TitleDialog from "./TitleDialog";
import Trailer, { type Palette } from "./Trailer";
import { prefersReducedMotion, setProfile, useProfile } from "@/lib/profile";

const PALETTES: Record<string, Palette> = {
  vishnu: ["#e8442c", "#f2a33a", "#8195b8"],
  indofachkraft: ["#f0a21b", "#f6e7c8", "#2f8f74"],
};

const ART_NAME = "vm-art";

function transition(update: () => void) {
  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return null;
  }
  return document.startViewTransition(update);
}

function visibleArt(id: TitleId): HTMLElement | null {
  const all = document.querySelectorAll<HTMLElement>(`#main [data-art="${id}"]`);
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.bottom > 0 && r.top < window.innerHeight) return el;
  }
  return null;
}

/** Profile-specific row order and billboard, applied by CSS so the server HTML never has to know. */
function profileCss(dict: Dict) {
  const fallback = dict.profiles.find((p) => p.id === "browse") ?? dict.profiles[0];
  let css = `html:not([data-profile]) [data-bb="${fallback.billboard}"]{display:grid}`;
  for (const p of dict.profiles) {
    css += `html[data-profile="${p.id}"] [data-bb="${p.billboard}"]{display:grid}`;
    p.order.forEach((r, i) => {
      css += `html[data-profile="${p.id}"] [data-row="${r}"]{order:${i}}`;
    });
  }
  return css;
}

export default function Browse({ dict }: { dict: Dict }) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<TitleId | null>(null);
  const [intro, setIntro] = useState(false);
  const profile = useProfile();

  const billboards = useMemo(() => Array.from(new Set(dict.profiles.map((p) => p.billboard))), [dict]);
  const activeBillboard = dict.profiles.find((p) => p.id === (profile ?? "browse"))?.billboard ?? "vishnu";
  const palette = PALETTES[activeBillboard] ?? PALETTES.vishnu;

  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get("title");
      setOpenId(id && id in dict.titles ? (id as TitleId) : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [dict]);

  const open = useCallback(
    (id: TitleId, source?: Element | null) => {
      const url = new URL(window.location.href);
      const already = url.searchParams.has("title");
      url.searchParams.set("title", id);
      if (already) window.history.replaceState({ vmTitle: id }, "", url);
      else window.history.pushState({ vmTitle: id }, "", url);

      const el = source instanceof HTMLElement ? source : null;
      if (el && !already) el.style.viewTransitionName = ART_NAME;
      const vt = transition(() => {
        if (el) el.style.viewTransitionName = "";
        flushSync(() => setOpenId(id));
      });
      if (!vt && el) el.style.viewTransitionName = "";
    },
    [],
  );

  const close = useCallback(() => {
    const id = openId;
    let target: HTMLElement | null = null;
    const vt = transition(() => {
      flushSync(() => setOpenId(null));
      target = id ? visibleArt(id) : null;
      if (target) target.style.viewTransitionName = ART_NAME;
    });
    const clear = () => {
      if (target) target.style.viewTransitionName = "";
    };
    if (vt) vt.finished.finally(clear);
    else clear();

    if (window.history.state?.vmTitle) window.history.back();
    else {
      const url = new URL(window.location.href);
      url.searchParams.delete("title");
      window.history.replaceState(null, "", url);
    }
  }, [openId]);

  const choose = useCallback((id: ProfileId) => {
    setProfile(id);
    window.scrollTo({ top: 0 });
    if (!prefersReducedMotion()) setIntro(true);
  }, []);

  const endIntro = useCallback(() => setIntro(false), []);
  const searching = query.trim().length > 0;

  return (
    <CatalogContext.Provider value={{ dict, open }}>
      <style dangerouslySetInnerHTML={{ __html: profileCss(dict) }} />
      <ProfileGate onChoose={choose} />
      {intro ? <Intro onDone={endIntro} /> : null}
      <div id="shell">
        <a className="skip" href="#main">
          {dict.nav.skip}
        </a>
        <span id="top" />
        <Nav query={query} setQuery={setQuery} />
        <main id="main" tabIndex={-1}>
          {searching ? (
            <SearchResults query={query} />
          ) : (
            <>
              <div className="stage">
                <Trailer palette={palette} labels={{ pause: dict.ui.trailerPause, play: dict.ui.trailerPlay }} />
                {billboards.map((id) => (
                  <Billboard key={id} id={id} />
                ))}
              </div>
              <div className="rows">
                {dict.rows.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </div>
            </>
          )}
          <Contact />
          <Faq />
        </main>
        <Footer />
      </div>
      <TitleDialog id={openId} onRequestClose={close} />
    </CatalogContext.Provider>
  );
}
