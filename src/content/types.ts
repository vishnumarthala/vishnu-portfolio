export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export type ProfileId = "ai" | "hiring" | "browse";
export type RowKind = "wide" | "standard" | "numbered" | "soon";
export type Status = "current" | "soon";

export type TitleId =
  | "vishnu"
  | "enterprise-ai"
  | "talent-india"
  | "indofachkraft"
  | "ausbildung-assist"
  | "marthala-solutions"
  | "remote-talent"
  | "telugu-rag"
  | "transformers-course"
  | "roche"
  | "festo"
  | "dmg-mori"
  | "keb"
  | "msc-stuttgart"
  | "btech-vit"
  | "cpsa"
  | "eta";

export type RowId =
  | "tracks"
  | "ventures"
  | "ai-work"
  | "experience"
  | "education"
  | "soon";

export interface Episode {
  title: string;
  text?: string;
}

export interface Title {
  id: TitleId;
  name: string;
  /** Short format label, like a streaming badge: "Series", "Original", "Limited series". */
  format: string;
  status?: Status;
  /** Factual metadata shown in a dotted row. */
  meta: string[];
  role?: string;
  place?: string;
  tagline?: string;
  synopsis: string;
  tags: string[];
  episodes?: { heading: string; items: Episode[] };
  link?: { href: string; label: string };
}

export interface Row {
  id: RowId;
  kind: RowKind;
  title: string;
  /** Second line under the row title, the section claim from the PDF. */
  claim?: string;
  items: TitleId[];
}

export interface Profile {
  id: ProfileId;
  name: string;
  hint: string;
  billboard: TitleId;
  order: RowId[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface Dict {
  locale: Locale;
  meta: { title: string; description: string };
  person: {
    name: string;
    role: string;
    headline: string;
    intro: string;
    facts: string[];
  };
  nav: {
    skip: string;
    home: string;
    links: { id: RowId | "contact"; label: string }[];
    browse: string;
    search: string;
    searchPlaceholder: string;
    searchClose: string;
    searchEmpty: string;
    searchResults: string;
    language: string;
    switchProfile: string;
  };
  gate: {
    title: string;
    lead: string;
    addName: string;
    addHint: string;
    note: string;
  };
  ui: {
    getInTouch: string;
    moreInfo: string;
    details: string;
    close: string;
    current: string;
    comingSoon: string;
    notify: string;
    role: string;
    place: string;
    tags: string;
    moreLikeThis: string;
    prev: string;
    next: string;
    trailerPause: string;
    trailerPlay: string;
  };
  profiles: Profile[];
  rows: Row[];
  titles: Record<TitleId, Title>;
  contact: {
    title: string;
    lead: string;
    email: string;
    phone: string;
    phoneHref: string;
    linkedin: string | null;
    linkedinLabel: string;
    location: string;
  };
  faqTitle: string;
  faq: Faq[];
  footer: {
    questions: string;
    links: { href: string; label: string; external?: boolean }[];
    rights: string;
  };
  legal: {
    impressum: { title: string; body: { heading: string; text: string[] }[] };
    privacy: { title: string; body: { heading: string; text: string[] }[] };
    back: string;
    draft: string;
  };
}
