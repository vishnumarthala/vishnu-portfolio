import type { Dict, Locale } from "./types";
import en from "./en";
import de from "./de";

const dictionaries: Record<Locale, Dict> = { en, de };

export const getDictionary = (locale: Locale): Dict => dictionaries[locale];
