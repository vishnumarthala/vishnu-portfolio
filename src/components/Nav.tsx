"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import LangSwitch from "./LangSwitch";
import { useCatalog } from "./catalog";
import { IconChevronDown, IconClose, IconSearch } from "./icons";
import { openGate, setProfile, useProfile } from "@/lib/profile";

interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function Nav({ query, setQuery }: Props) {
  const { dict } = useCatalog();
  const { nav } = dict;
  const profile = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState<null | "browse" | "profile">(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const links = (
    <>
      {nav.links.map((l) => (
        <li key={l.id}>
          <a href={`#${l.id}`} onClick={() => {
            setMenu(null);
            setQuery("");
          }}>
            {l.label}
          </a>
        </li>
      ))}
    </>
  );

  const current = dict.profiles.find((p) => p.id === profile);

  return (
    <header className="nav" ref={headerRef} data-scrolled={scrolled || undefined}>
      <a className="wordmark" href="#top" onClick={() => setQuery("")}>
        Vishnu Marthala
      </a>

      <nav className="nav__primary" aria-label={nav.home}>
        <ul>{links}</ul>
      </nav>

      <div className="nav__browse">
        <button type="button" className="nav__menuBtn" aria-expanded={menu === "browse"} aria-controls="browse-menu" onClick={() => setMenu(menu === "browse" ? null : "browse")}>
          {nav.browse}
          <IconChevronDown />
        </button>
        <ul id="browse-menu" className="menu menu--browse" hidden={menu !== "browse"}>
          {links}
        </ul>
      </div>

      <div className="nav__tools">
        <div className={`search ${searchOpen || query ? "is-open" : ""}`} role="search">
          <button
            type="button"
            className="search__btn"
            aria-label={nav.search}
            onClick={() => {
              setSearchOpen(true);
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
          >
            <IconSearch />
          </button>
          <label className="sr-only" htmlFor="title-search">
            {nav.search}
          </label>
          <input
            ref={inputRef}
            id="title-search"
            className="search__input"
            type="search"
            autoComplete="off"
            value={query}
            placeholder={nav.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => {
              if (!query) setSearchOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setQuery("");
                setSearchOpen(false);
                e.currentTarget.blur();
              }
            }}
          />
          {query ? (
            <button type="button" className="search__clear" aria-label={nav.searchClose} onClick={() => setQuery("")}>
              <IconClose />
            </button>
          ) : null}
        </div>

        <LangSwitch className="nav__lang" />

        <div className="nav__profile">
          <button
            type="button"
            className="nav__avatarBtn"
            aria-expanded={menu === "profile"}
            aria-controls="profile-menu"
            aria-label={`${nav.switchProfile}${current ? `: ${current.name}` : ""}`}
            onClick={() => setMenu(menu === "profile" ? null : "profile")}
          >
            <Avatar id={profile ?? "browse"} />
            <IconChevronDown />
          </button>
          <ul id="profile-menu" className="menu menu--profile" hidden={menu !== "profile"}>
            {dict.profiles.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="menu__item"
                  aria-pressed={profile === p.id}
                  onClick={() => {
                    setProfile(p.id);
                    setMenu(null);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  <Avatar id={p.id} />
                  {p.name}
                </button>
              </li>
            ))}
            <li className="menu__sep">
              <button
                type="button"
                className="menu__item menu__item--plain"
                onClick={() => {
                  setMenu(null);
                  openGate();
                }}
              >
                {nav.switchProfile}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
