import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import { getDictionary } from "@/content";
import { hasLocale } from "@/content/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/impressum">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: getDictionary(lang).legal.impressum.title,
    alternates: { canonical: `/${lang}/impressum`, languages: { en: "/en/impressum", de: "/de/impressum" } },
    robots: { index: false },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/impressum">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return <LegalPage dict={dict} doc={dict.legal.impressum} />;
}
