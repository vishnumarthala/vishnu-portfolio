import type { MetadataRoute } from "next";
import { SERIES_PATH, episodeSlugs } from "@/content/series";
import { SITE_URL } from "@/content/site";

const pair = (path: string, priority: number): MetadataRoute.Sitemap => {
  const languages = { en: `${SITE_URL}/en${path}`, de: `${SITE_URL}/de${path}` };
  return (["en", "de"] as const).map((lang) => ({
    url: `${SITE_URL}/${lang}${path}`,
    changeFrequency: "monthly",
    priority: lang === "en" ? priority : priority - 0.1,
    alternates: { languages },
  }));
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pair("", 1),
    ...pair(`/${SERIES_PATH}`, 0.9),
    ...episodeSlugs().flatMap((slug) => pair(`/${SERIES_PATH}/${slug}`, 0.8)),
  ];
}
