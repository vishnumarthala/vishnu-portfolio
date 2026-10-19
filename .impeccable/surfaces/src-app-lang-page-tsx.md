---
version: 1
slug: "src-app-lang-page-tsx"
primary_target: "src/app/[lang]/page.tsx"
related_targets: []
---

# Surface brief: portfolio home (EN + DE)

Scope: `/en` and `/de` single-page portfolio plus title deep links (`?title=<id>`). Visitor mode: Experience.
Audience: enterprise AI peers, recruiters, conference contacts first; German employers second. Action: get in touch (email, LinkedIn). Proof: only PDF facts. Constraints: Roche-appropriate tone, WCAG 2.2 AA, reduced-motion and no-WebGL fallbacks. No Netflix trademarks (logo, wordmark, Netflix Sans, the N); the streaming grammar only.
Decision: user pinned "Netflix style UI, rework completely from scratch" after the direction round, overriding the roll and every dealt card.

## Direction contract

THESIS: His career as a streaming catalogue. Every role, venture and project is a title with key art, synopsis and episodes; the visitor browses a person the way they browse a service. Refuses the scrolling one-column CV, section numbers and equal card grids with icons.

OWN-WORLD: Warm near-black screen ground, vermilion brand red reserved for primary action, brand mark and live/new states; key art per title is authored generative SVG (lattices, routes, dot fields, Telugu script, attention matrices) in its own palette. Condensed heavy grotesk for the person and most title treatments, the same family at normal width for UI; like real key art, individual titles may carry their own logotype (wide grotesk for ventures and platforms, serif italic for academic titles), always from the same three faces. The service mark is an outlined VM monogram in the surrounding ink and a mixed-case wordmark, never a filled red badge. Components: profile tiles, rails with snap and arrow paddles, hover-expand preview cards, detail dialog with episodes, Coming Soon row, Top-numerals row, FAQ accordion, streaming footer.

STORY: Pick who is watching, land on a billboard that says AI architect at Roche and builder of a talent bridge, browse rails ordered for that viewer, open a title for depth, get in touch from the billboard or the closing block.

FIRST VIEWPORT: First visit: "Who's browsing?" profile gate (AI & architecture, Hiring from India, Just browsing, plus an add-yourself tile that opens email). After: full-bleed billboard, WebGL trailer field behind, left-aligned series title treatment of his name at display scale, real facts as metadata row, intro synopsis, Get in touch (primary, red) and More info, the first rail peeking at the bottom edge.

FORM: User-pinned streaming-service UI, overriding the dealt hand of the direction roll. seed:a8f92baf7efd205d Signature interaction: hover or focus a tile, it expands in place into a preview card; open it and the art morphs into the detail dialog via a view transition. Motion grammar: one monogram intro per profile pick, eased-out expansion, no scattered entrances; reduced motion removes the intro, trailer and morphs.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Portrait, Festo/DMG MORI/KEB years and roles, LinkedIn profile URL, Impressum/Datenschutz legal text.
