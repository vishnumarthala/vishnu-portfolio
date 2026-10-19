import Link from "next/link";

export default function NotFound() {
  return (
    <div className="legal">
      <header className="legal__bar">
        <Link className="wordmark" href="/">
          Vishnu Marthala
        </Link>
      </header>
      <main className="legal__main" id="main">
        <h1 className="legal__title">404</h1>
        <p>This title is not in the catalogue. Dieser Titel ist nicht im Katalog.</p>
        <p>
          <Link className="text-btn" href="/en">
            Browse in English
          </Link>{" "}
          ·{" "}
          <Link className="text-btn" href="/de">
            Auf Deutsch stöbern
          </Link>
        </p>
      </main>
    </div>
  );
}
