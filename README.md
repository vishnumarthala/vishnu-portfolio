# Vishnu Marthala · Portfolio

A bilingual (English / Deutsch) personal site presented as a streaming catalogue: every role, venture and project is a title with its own generative key art, synopsis and episodes.

Built with Next.js 16 (App Router), React 19 and vanilla CSS. Designed with the [Impeccable](https://github.com/pbakaus/impeccable) skill.

## What's in it

- **Profile gate** on first visit (*AI & architecture*, *Hiring from India*, *Just browsing*). The choice is stored in `localStorage` and reorders the rows and switches the billboard before first paint (no flash, still fully static HTML).
- **Billboard** with a WebGL2 "trailer" shader (threads from two sides bound into one knot). Pausable; static SVG poster when WebGL2 or motion is unavailable.
- **Rows** of titles with scroll-snap rails, paddles, hover/focus preview cards and a numbered "Experience" row.
- **Title dialog** (`?title=<id>` deep links) with episodes and "More like this", opening with a view transition from the tile.
- **Search** across all titles (word-prefix matching, EN and DE).
- **Get in touch sheet**: every contact button opens a sheet with *Chat on WhatsApp* (pre-filled message), email (with a copy button, so it never depends on a mail app), and call.
- **Hiring request for employers** (*Hiring from India* tab): company, contact, areas, trainees or skilled workers, positions and start date are composed into a tidy message that opens in WhatsApp or the email app, ready to send. Nothing is sent or stored by the site, so no backend or API keys are needed.
- Coming soon row (OverseasScholar, the Transformers and LLMs course, remote talent), contact block, FAQ, footer, Impressum and Datenschutz pages.
- `prefers-reduced-motion` removes the intro, trailer animation and morphs.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000 → redirects to /en or /de by Accept-Language
npm run lint
npm run build
```

## Content

All copy lives in typed dictionaries, transcribed from the source PDF (`docs/source/`, kept local and git-ignored):

- `src/content/en.ts`, `src/content/de.ts`: every string, title, row and FAQ
- `src/content/site.ts`: email, phone, WhatsApp number, LinkedIn URL, site URL
- `src/content/art.ts`: palette and motif per title (rendered by `src/components/KeyArt.tsx`)

### Still to fill in

- **LinkedIn profile URL**: set `LINKEDIN_URL` in `src/content/site.ts` (the link supplied was the LinkedIn feed, not a profile). LinkedIn links in the contact block, footer and structured data appear automatically once it is set.
- **Years and roles** at Festo, DMG MORI Software Solutions and KEB Automation (`festo`, `dmg-mori`, `keb` titles in both dictionaries).
- **Impressum / Datenschutz**: street address and postcode, and a legal review (both pages are marked as drafts and set to `noindex`).
- Optional portrait (the PDF had a placeholder; the design does not need one).

## Deploy to Vercel

1. Push this repository to GitHub and import it in Vercel (framework preset: Next.js, no settings needed).
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://vishnumarthala.de`) so canonical URLs, hreflang, sitemap and Open Graph images resolve correctly.

Or from the CLI: `npx vercel` then `npx vercel --prod`.

## Design system

See `DESIGN.md` (visual system) and `PRODUCT.md` (product truth). The design brief for the page is in `.impeccable/surfaces/`.
