import Link from "next/link";
import type { Dict } from "@/content/types";

interface Props {
  dict: Dict;
  doc: Dict["legal"]["impressum"];
}

export default function LegalPage({ dict, doc }: Props) {
  return (
    <div className="legal">
      <header className="legal__bar">
        <Link className="wordmark" href={`/${dict.locale}`}>
          Vishnu Marthala
        </Link>
        <Link className="text-btn" href={`/${dict.locale}`}>
          {dict.legal.back}
        </Link>
      </header>
      <main className="legal__main" id="main">
        <h1 className="legal__title">{doc.title}</h1>
        <p className="legal__draft" role="note">
          {dict.legal.draft}
        </p>
        {doc.body.map((s) => (
          <section key={s.heading} className="legal__section">
            <h2>{s.heading}</h2>
            {s.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </section>
        ))}
      </main>
      <footer className="legal__foot">{dict.footer.rights}</footer>
    </div>
  );
}
