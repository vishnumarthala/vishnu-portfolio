import { notFound } from "next/navigation";
import Browse from "@/components/Browse";
import { getDictionary } from "@/content";
import { EMAIL, LINKEDIN_URL, SITE_URL } from "@/content/site";
import { hasLocale } from "@/content/types";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: dict.person.name,
    jobTitle: "AI Solution Architect",
    url: `${SITE_URL}/${lang}`,
    email: `mailto:${EMAIL}`,
    address: { "@type": "PostalAddress", addressLocality: "Backnang", addressRegion: "Baden-Württemberg", addressCountry: "DE" },
    worksFor: [
      { "@type": "Organization", name: "Roche" },
      { "@type": "Organization", name: "IndoFachkraft", url: "https://indofachkraft.de" },
      { "@type": "Organization", name: "Marthala Solutions" },
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universität Stuttgart" },
      { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
    ],
    ...(LINKEDIN_URL ? { sameAs: [LINKEDIN_URL] } : {}),
    hasCredential: { "@type": "EducationalOccupationalCredential", name: "iSAQB Certified Professional for Software Architecture (CPSA)" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Browse dict={dict} />
    </>
  );
}
