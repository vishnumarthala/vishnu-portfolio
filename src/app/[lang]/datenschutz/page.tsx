import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { getDictionary } from "@/content";
import { hasLocale } from "@/content/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/datenschutz">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: getDictionary(lang).legal.privacy.title,
    alternates: { canonical: `/${lang}/datenschutz`, languages: { en: "/en/datenschutz", de: "/de/datenschutz" } },
    robots: { index: false },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return <LegalPage dict={dict} doc={dict.legal.privacy} />;
}
