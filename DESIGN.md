---
name: Vishnu Marthala
description: A personal portfolio presented as a streaming-service catalogue, bilingual EN/DE.
colors:
  screen: "#141112"
  panel: "#201b1c"
  panel-raised: "#2c2627"
  line: "#3a3233"
  seam: "#231e1f"
  text: "#f3eeea"
  text-muted: "#c5bcb7"
  text-faint: "#9a908b"
  vermilion: "#e8442c"
  vermilion-plate: "#d42f1b"
  vermilion-plate-deep: "#b92612"
  ember: "#f2a33a"
  plate-ink: "#ffffff"
  error: "#ff9c8c"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.2rem, 7.6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.005em"
    fontVariation: "\"wdth\" 62"
  display-wide:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 5.2rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 125"
  display-serif:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.5
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 1.75vw, 1.6rem)"
    fontWeight: 600
    lineHeight: 1.32
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "max(0.6875rem, 0.72em)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.05em"
  format:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8em"
    fontWeight: 700
    letterSpacing: "0.24em"
  wordmark:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 88"
  script:
    fontFamily: "Noto Sans Telugu, sans-serif"
rounded:
  hairline: "2px"
  sm: "4px"
  avatar: "6px"
  dialog: "8px"
  round: "50%"
spacing:
  gap: "clamp(0.4rem, 0.6vw, 0.6rem)"
  pad: "clamp(1rem, 4vw, 3.75rem)"
  row-gap: "clamp(1.75rem, 3.2vw, 3.25rem)"
  section: "clamp(3.5rem, 7vw, 6rem)"
  nav-height: "4.25rem"
components:
  button-light:
    backgroundColor: "{colors.text}"
    textColor: "{colors.screen}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.5rem 0.8rem 1.2rem"
  button-light-hover:
    backgroundColor: "rgb(243 238 234 / 0.8)"
  button-grey:
    backgroundColor: "rgb(116 106 104 / 0.62)"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.5rem 0.8rem 1.2rem"
  button-grey-hover:
    backgroundColor: "rgb(116 106 104 / 0.42)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.5rem 0.8rem 1.2rem"
  button-brand:
    backgroundColor: "{colors.vermilion-plate}"
    textColor: "{colors.plate-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.5rem 0.8rem 1.2rem"
  button-brand-hover:
    backgroundColor: "{colors.vermilion-plate-deep}"
  button-small:
    typography: "{typography.small}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.85rem"
  round-button:
    backgroundColor: "rgb(20 17 18 / 0.45)"
    textColor: "{colors.text}"
    rounded: "{rounded.round}"
    size: "2.6rem"
  round-button-solid:
    backgroundColor: "{colors.text}"
    textColor: "{colors.screen}"
    rounded: "{rounded.round}"
    size: "1.9rem"
  pill-current:
    backgroundColor: "{colors.vermilion-plate}"
    textColor: "{colors.plate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0.18rem 0.45rem"
  pill-soon:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0.18rem 0.45rem"
  mono-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.hairline}"
    padding: "0.12em 0.32em 0.06em"
  tile:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.sm}"
  tile-preview:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 0.85rem 0.95rem"
  title-dialog:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.dialog}"
    width: "min(58rem, 100% - 2rem)"
  contact-sheet:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.dialog}"
    padding: "clamp(1.4rem, 3.5vw, 2.4rem)"
    width: "min(44rem, 100% - 2rem)"
  sheet-tab:
    backgroundColor: "transparent"
    textColor: "{colors.text-faint}"
    typography: "{typography.body}"
    padding: "0.7rem 0"
  sheet-tab-selected:
    textColor: "{colors.text}"
  way-row:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "1rem 1.1rem"
  way-row-hover:
    backgroundColor: "{colors.line}"
  way-row-primary:
    backgroundColor: "{colors.vermilion-plate}"
    textColor: "{colors.plate-ink}"
  way-row-primary-hover:
    backgroundColor: "{colors.vermilion-plate-deep}"
  field-input:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 0.85rem"
  choice-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.small}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.85rem"
  choice-chip-selected:
    backgroundColor: "{colors.text}"
    textColor: "{colors.screen}"
  error-summary:
    backgroundColor: "rgb(212 47 27 / 0.16)"
    textColor: "{colors.text}"
    typography: "{typography.small}"
    rounded: "{rounded.sm}"
    padding: "0.7rem 0.9rem"
  episode-current:
    backgroundColor: "{colors.panel-raised}"
    rounded: "{rounded.sm}"
    padding: "1.2rem 1rem"
  faq-row:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.text}"
    padding: "1.35rem 1.6rem"
  faq-row-hover:
    backgroundColor: "{colors.line}"
  nav:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    height: "{spacing.nav-height}"
    padding: "0 {spacing.pad}"
  nav-scrolled:
    backgroundColor: "{colors.screen}"
  menu:
    backgroundColor: "rgb(16 13 14 / 0.96)"
    textColor: "{colors.text-muted}"
    padding: "0.5rem 0"
    width: "15rem"
---

# Design System: Vishnu Marthala

## Overview

**Creative North Star: "A Career on Demand"**

The site is a streaming service whose whole catalogue is one person. Every role, venture, degree and project is a title with its own key art, synopsis, format badge and episodes, and the visitor browses a career the way they browse a service at night: a profile gate, a full-bleed billboard, horizontal rails, an expanding preview, a detail dialog. The grammar is the streaming interface; the identity is not borrowed from any real service. The service identity is a mixed-case vermilion wordmark, "Vishnu Marthala", plus an outlined "VM" monogram drawn in whatever ink surrounds it.

The ground is a warm near-black, never blue-black, so the room feels lit by the screen rather than by a dashboard. Chrome stays neutral and quiet, warm off-white on warm near-black, so the colour can belong to the key art: each title carries its own authored palette and generative SVG motif (lattices, routes, dot fields, tally marks, Telugu script, attention matrices, toolpaths, circuits, seals). Vermilion is the service's own voice and appears only where the service speaks: the wordmark, the primary "Get in touch" action and its WhatsApp counterparts in the contact sheet, the live "current" state, the active language, the fact separators.

Density is catalogue density, not document density. Several rails stack with tight tile gaps and generous gutters, type is set for scanning, and depth comes from the art and from overlays rather than from boxes. Motion is eased-out and arrives only on intent: one monogram intro per profile pick, hover-expand after a deliberate pause, an art-to-dialog morph. Reduced motion removes all three.

**Key Characteristics:**
- Warm near-black ground with tonal panels a few steps up; no cool greys.
- One family, Archivo, at fixed widths (62% condensed, 88% for the mark, 100%, 125% wide) plus Instrument Serif italic as a third title voice.
- Per-title generative key art, each in its own palette; chrome stays neutral so the art carries the colour.
- Vermilion as the service's voice: primary action and live state, kept rare.
- Horizontal rails with snap, edge paddles and hover-expand preview cards.
- Eased-out, intent-triggered motion with full reduced-motion and no-WebGL fallbacks.

## Colors

A warm near-black screen, three tonal panel steps, a warm off-white text ladder, and a single vermilion family for the service's own voice; every other hue lives inside key art.

### Primary
- **Service Vermilion** (`vermilion`): the brand voice as ink. The wordmark, the intro "V", the 4px separator dots in the billboard facts row, and the 2px underline on the active language option. Passes 4.7:1 on the screen, so it may carry the wordmark but is never used for running text.
- **Vermilion Plate** (`vermilion-plate`): the brand voice as a surface with white on top. The primary "Get in touch" button (billboard, title dialog), "Chat on WhatsApp" (closing contact block and the contact sheet's first way row), "Send via WhatsApp" (the sheet's request form), the live "current" pill and art band, and text selection. At 16% over Panel it is the request form's error summary banner, its only tint. White on it measures 5:1. The monogram is never set on it.
- **Deep Vermilion Plate** (`vermilion-plate-deep`): hover state of the brand button and the primary way row only.
- **Plate Ink** (`plate-ink`): pure white, `#ffffff`, the only ink set on Vermilion Plate (brand button, primary way row, current pill, selection). It is not a text colour anywhere else; chrome text stays Screen White.

### Secondary
- **Ember** (`ember`): the warm counter-note of the service mark. The "M" of the intro monogram and every third intro thread, and the second stop of the billboard trailer palette. It is a mark colour, not a UI colour.

### Neutral
- **Screen** (`screen`): the page ground, the scrolled nav, the profile gate and intro backdrops, `theme-color`, and the punch-out fill of the Top-numerals.
- **Panel** (`panel`): tile backing, the hover preview card, and the title dialog surface.
- **Panel Raised** (`panel-raised`): the highlighted first episode, "More like this" cards, and FAQ rows.
- **Line** (`line`): 1px rules in menus, episode lists and legal pages; doubles as the hover step above Panel Raised.
- **Seam** (`seam`): the 8px band that separates the closing passages (contact, FAQ, footer) from each other and from the rails.
- **Screen White** (`text`): primary text, light buttons, focus outlines.
- **Warm Grey** (`text-muted`): secondary text, synopses, nav links, metadata.
- **Faint Grey** (`text-faint`): row claims, hints, dt labels, the footer, unselected sheet tabs, "optional" notes, and the 1px input border and chip ring in the request form. Measures 6:1 on Screen, 5.4:1 on Panel and 4.8:1 on Panel Raised; do not place it on anything lighter.

### Functional
- **Error Salmon** (`error`): `#ff9c8c`, a light tint of the vermilion hue for form validation only: the 1px border of a field in error and its 0.875rem message. 8.4:1 on Panel. It never appears outside an invalid form field.

Key art palettes (background, ink, accent per title) are content, not chrome. They live with the art in `src/content/art.ts` and the avatar palettes, and are not system colours.

### Named Rules
**The Service Voice Rule.** Vermilion is only ever the service speaking: wordmark, primary action, live "current" state, active language, fact dots, the selected sheet tab's underline. It never decorates chrome, never tints a panel (the request form's error summary is the one functional tint), never colours a heading, never fills the monogram.

**The Art Owns the Colour Rule.** Any hue beyond the neutrals and the vermilion family (Error Salmon included) belongs inside a title's key art. Chrome around the art stays warm neutral so seventeen palettes can sit in one rail without fighting the interface.

**The Warm Black Rule.** Every neutral leans warm (hue around 0 to 60 in OKLCH, chroma under 0.015). A cool grey or blue-black in chrome breaks the room.

## Typography

**Display Font:** Archivo (variable, `wdth` axis), with Helvetica Neue and Arial fallbacks
**Body Font:** Archivo at normal width
**Title Serif:** Instrument Serif italic, with Georgia
**Script:** Noto Sans Telugu, inside key art only

**Character:** One grotesk stretched three ways gives the catalogue a family resemblance with distinct series identities: condensed black uppercase for the person and marquee titles, extended heavy for ventures and platforms, serif italic for the academic titles. Like real key art, each title carries its own logotype, always drawn from those three faces. UI text is the same family at normal width, and the service wordmark sits between, at 88% width in mixed case, so title treatments and interface read as one service.

### Hierarchy
- **Display** (900, 62% width, uppercase, `display` size, line-height 0.88): marquee title treatments; the billboard name, condensed dialog titles, condensed art titles.
- **Display Wide** (800, 125% width, `display-wide` size, line-height 0.95): wide-face title treatments on the billboard, dialog and art.
- **Display Serif** (400 italic, line-height 0.95): serif-face title treatments; sized by the same slot as the face it replaces (the art scales it by 1.12).
- **Headline** (900, normal width, `headline` size, line-height 1.05): closing-passage headings (contact, FAQ at `clamp(1.75rem, 3.4vw, 3rem)`, legal titles) and the contact sheet title.
- **Title** (700, `title` size): row headings; the dialog's section heads sit at 1.45rem 700.
- **Lede** (600, `lede` size, line-height 1.32, max 30ch): the billboard headline line; the dialog tagline is its 1.2rem 700 sibling.
- **Body** (400, 1rem, line-height 1.5): synopses (max 54ch on the billboard, 62ch in the dialog at line-height 1.6), episode text, FAQ answers. Field labels, way-row labels and sheet tabs use it at 700.
- **Small** (`small`, 0.875rem, line-height 1.5): the one step below body, used across the site for hints, notes, facts and details: way-row details, field hints and errors, "optional" notes, choice chips (600), the error summary, the request note, and `btn--sm`. Nothing in mixed case goes smaller.
- **Label** (800, uppercase, 0.05em tracking, never below 11px): status pills and art bands.
- **Format** (700, uppercase, 0.16 to 0.24em tracking): the format word beside the monogram ("Series", "Original", "Earlier season").
- **Wordmark** (800, 88% width, mixed case, -0.03em, vermilion): "Vishnu Marthala" in the nav and legal bars. The intro monogram uses the same 88% width at 900.

Art titles size in container units (`cqi`) so the treatment scales with the tile; long names step down through four sizes by character count.

### Named Rules
**The One Family Rule.** Title treatments change width, not family. A new title's logotype chooses `cond`, `wide` or `serif`; no fourth display face is introduced.

**The Eleven Pixel Floor.** Every uppercase label, badge and band clamps to `max(0.6875rem, …)`. Container-scaled type may shrink with the tile but never below 11px.

## Layout

The page is a stage followed by a stack of full-bleed rails. The billboard stage fills the viewport (`clamp(40rem, 100svh, 64vw)`) with content anchored bottom-left at `min(42rem, 56vw)` wide, a 77° dark scrim from the left and a fade to Screen at the bottom; the rails then pull up into it with a negative top margin so the first rail peeks at the fold.

All horizontal alignment hangs off one gutter, `pad`. Rails scroll edge to edge but snap to the gutter (`scroll-padding-inline: pad`). Tile width is derived, not fixed: `(100vw − 2·pad − gaps) / per`, with `per` stepping 4 → 3.4 → 2.3 → 1.6 at 1200, 860 and 520px so a fractional tile always signals more to the right. Wide slots are 1.6× a tile; numbered slots offset the art 44% to make room for the outlined numeral.

Rows stack at `row-gap`. Closing passages (contact, FAQ, footer) are centred, padded at `section`, and divided by 8px Seam bands; text there caps at 56 to 68rem.

Below 900px the primary links collapse into a "Browse" menu; below 760px the billboard becomes a flowing block with the art above and a vertical scrim; below 640px the dialog goes full-screen with 4:3 art, the contact sheet goes full-screen with square corners, the request form drops to one column and its actions stretch full width.

On fine pointers the rail gets a 2.75rem top and 12rem bottom overflow allowance (cancelled by negative margins) so expanded previews are never clipped.

## Elevation & Depth

Depth is mostly tonal and photographic: panels step up a few lightness points from the screen, and gradients (the nav's top fade, the billboard scrims, the dialog hero fade into Panel) sink content into the art. Shadows are soft, black, and reserved for things that float above the catalogue: a scaled tile, its preview, the open dialog, the menus.

### Shadow Vocabulary
- **Lifted tile** (`box-shadow: 0 10px 30px rgb(0 0 0 / 0.6)`): a tile in its expanded hover/focus state.
- **Preview drop** (`box-shadow: 0 16px 30px rgb(0 0 0 / 0.55)`): the preview card under an expanded tile.
- **Menu** (`box-shadow: 0 16px 40px rgb(0 0 0 / 0.55)`): profile and browse dropdowns.
- **Dialog** (`box-shadow: 0 24px 64px rgb(0 0 0 / 0.7)`): the title dialog and the contact sheet, over a `rgb(6 5 5 / 0.74)` backdrop.
- **Title lift** (`text-shadow: 0 2px 16px rgb(0 0 0 / 0.35)`): dialog titles over art.

### Named Rules
**The Float-Only Shadow Rule.** Nothing at rest casts a shadow. A shadow means the element is floating above the catalogue right now (expanded, open, menu); the moment it settles, the shadow goes.

**The Scrim, Not Box Rule.** Text over art is made legible with gradients into Screen or Panel, never by boxing the text.

## Shapes

Corners are small and almost uniform: 4px for tiles, buttons, cards, episode rows, way rows, inputs and choice chips; 2px for the monogram outline, pills, bands and language options; 6px for profile avatars; 8px only for the title dialog and the contact sheet (square when full-screen). Round buttons are full circles. Key art inherits its container's radius, and expanded tiles square their bottom corners so the preview card reads as the same object continuing downward. The art band is a tab: rounded on top, flush with the art's bottom edge, centred. Borders are rare and thin: inset 1px rings on ghost buttons, "coming soon" pills and choice chips, 1px Faint Grey borders on form inputs, the inset 1.5px ring that draws the monogram, 1px rules in lists, and the deliberate 8px Seam between closing passages.

## Components

### Buttons
Solid, wide-bodied, icon-led; asymmetrical padding (more right than left) because every button starts with an icon.
- **Shape:** gently squared (`rounded.sm`), 700 weight, 1rem with `--lg` and `--xl` steps.
- **Brand (primary):** Vermilion Plate with Plate Ink; hover deepens to Deep Vermilion Plate. The one primary action per view: "Get in touch" (`--lg` on the billboard, base in the title dialog), "Chat on WhatsApp" (`--xl` in the closing contact block, a real wa.me link), "Send via WhatsApp" (base, the request form's submit). Every "Get in touch" opens the contact sheet rather than a mailto link; it and the WhatsApp actions lead with the chat-bubble icon.
- **Grey (secondary):** translucent warm grey plate with white text, the billboard's "More info".
- **Ghost:** transparent with an inset 1px half-white ring; hover adds an 8% white fill and a solid ring. External links in the dialog, "Send by email" in the request form, and the closing block's `--xl` "Hiring from India? Send a request" (opens the sheet on the hiring tab, trailing arrow).
- **Small** (`btn--sm`): 0.875rem, 0.55rem 0.85rem padding, 0.45rem icon gap; used ghost for the email row's "Copy address" (swaps to a check and "Copied") and "Write an email".
- **Light:** Screen White plate with Screen text, hover 80% opacity. Defined in the system but not currently the primary anywhere; it must not compete with a brand button in the same view.
- **Press:** every button scales to 0.98 on `:active`.
- **Round:** 2.6rem circles with a 1px half-white ring on a translucent screen fill (trailer pause), `--solid` white for the preview's "details" control, `--dark` for the dialog close.
- **Text button:** underlined link with a 40% underline that goes solid on hover: "Ask about it" (opens the sheet), "Copy address" in the closing block and "Copy request" in the form, both swapping a copy icon for a check while the copied state shows.
- **Icons:** stroked 24px line icons in `currentColor`. The chat bubble marks WhatsApp and every "Get in touch" (the envelope stays only on email actions); copy and check pair for the copy-to-clipboard states.

### Chips
- **Status pill:** 2px corners, label type. `current` is Vermilion Plate with white; `soon` is an inset 1px Warm Grey ring with white text.
- **Monogram:** "VM" in condensed black, outlined, not filled: transparent background, an inset 1.5px `currentColor` ring, 2px corners, coloured in the surrounding ink (Screen White in the UI, the title's ink on key art).
- **Choice chip:** the request form's checkboxes (areas) and radios (type) as tappable chips: 4px corners, an inset 1px Faint Grey ring, Warm Grey 0.875rem 600 text; hover brightens ring and text; selected fills Screen White with Screen text and drops the ring; keyboard focus draws the 2px white outline. The native input stays in the DOM, visually hidden. Choice chips are inputs, not status: they never take label type or vermilion.
- **Format badge:** monogram plus the format word in spaced caps. On key art it sits in the top-left corner. In the billboard and dialog it sits inline in the line below the title (the role line, the meta row), never above a heading. Only the fixed format vocabulary from the catalogue data is allowed here (Series, Original, Platform, Course, Current season, Earlier season, Limited series, Certification, New venture, and their German equivalents).

### Cards / Containers
- **Tile:** 16:9 key art (2:3 poster in the numbered row) on Panel, 4px corners, no border, no shadow at rest.
- **Preview card:** Panel, bottom corners only, holding a round details button, status pill, meta line and dot-separated tags.
- **More like this card:** Panel Raised, 4px, art on top, meta and a three-line clamped synopsis; hover steps to Line.
- **Episode row:** 3.5rem tabular numeral column plus title and text, ruled by Line; the first episode sits on Panel Raised.

### Inputs / Fields
- **Search:** collapsed to a 2.3rem icon button; opening reveals a 1px Screen White frame on a dark translucent fill and the input eases open to `clamp(9rem, 18vw, 16rem)` over 0.35s. Focus-within draws the 2px white outline.
- **Form field:** label above in 1rem 700; an optional field appends "optional" in Faint Grey 0.875rem 500, and required fields carry no marker. Inputs and textareas sit on Screen (inset from the Panel sheet) with a 1px Faint Grey border and 4px corners, 0.75rem 0.85rem padding at 1rem; hover turns the border Warm Grey, focus draws a 2px Screen White outline and a white border. Optional hints sit under the label in Faint Grey 0.875rem.
- **Validation:** a field in error takes an Error Salmon border and a 0.875rem Error Salmon message below, wired with `aria-invalid` and `aria-describedby`; a summary banner (16% Vermilion Plate tint over Panel, Screen White 0.875rem, `role="alert"`) heads the form. Each error clears as soon as its field is filled.
- **Layout:** fields pair in a 2-column grid (1 column below 640px); choice groups are borderless fieldsets with a 1rem 700 legend.

### Navigation
- **Bar:** fixed, 4.25rem tall, transparent over a top gradient, turning solid Screen once scrolled (0.45s). Mixed-case vermilion wordmark at left (1.35rem below 560px); links at 0.9rem Warm Grey, white on hover.
- **Tools:** search, globe plus EN/DE options (active option white with a 2px vermilion underline), and the profile avatar with a rotating chevron.
- **Menus:** near-opaque screen panel, 1px Line border, menu shadow; the browse menu centres under its trigger with a 2px white top rule.
- **Mobile:** links collapse into "Browse" below 900px; the language switch hides from the bar below 560px and lives in the footer.

### Key Art (signature)
Every title renders authored generative SVG from a named motif in its own background, ink and accent, with the title set in its chosen face at container-scaled size, an optional format badge top-left and an optional status band at the bottom centre. The top-left badge zone (about 45% of the width by 22% of the height) stays clear of motif marks; motifs live to the right of it or below it. The same component serves tiles, posters, the dialog hero and the billboard media, and it carries the view-transition name that morphs a tile into the dialog.

### Rail and Hover Preview (signature)
Rails snap per tile with edge paddles that fade in on row hover (translucent screen fill, chevron scales 1.25× on hover) and a segmented page indicator top-right. On fine pointers, hovering or keyboard-focusing a tile waits 0.35s, then scales it to 1.32× from its anchor (left edge for the first slot, right for the last) and drops the preview card beneath it. Wide and Coming Soon slots only lift to 1.03×.

### Top-Numerals Row (signature)
Giant condensed numerals (0.66 tile-width) filled with Screen and stroked 3px in a warm mid-grey sit behind poster art that is pushed 44% to the right.

### Profile Gate and Intro
A full-screen Screen layer asking who is browsing, with square 6px-cornered generative avatars that lift 2px and gain a 3px white outline on hover or focus. After the choice, a 1.9s intro: the VM monogram (Archivo 900 at 88% width, vermilion V and ember M) scales up through blur, vermilion and ember threads streak, and the screen fades. Plays on each profile pick, removed under reduced motion.

### Contact Block
A centred closing passage below an 8px Seam: headline, lede, then two `--xl` actions side by side: the brand "Chat on WhatsApp" (chat-bubble icon, a real wa.me link) and the ghost "Hiring from India? Send a request" (opens the contact sheet on the hiring tab). Below them the email address as a Warm Grey underlined link with a "Copy address" text button, then a row of icon-led links in Warm Grey with Faint Grey icons: phone, WhatsApp, location. A link appears only when its value exists: LinkedIn renders only when `LINKEDIN_URL` in `src/content/site.ts` is set (currently `null`). Never ship a placeholder or feed link.

### Contact Sheet
The streaming "account" sheet that every "Get in touch" opens (billboard, title dialog, Coming soon "Ask about it", the profile gate's "Add yourself"): a native `<dialog>` sharing the title dialog's Panel surface, 8px corners, shadow and backdrop, at `min(44rem, 100% − 2rem)` and full-screen below 640px. It opens with a headline-size title, a Warm Grey lede (max 46ch) and the dark round close button, then two underline tabs on a 1px Line rule: "Message me" and "Hiring from India" ("Nachricht" / "Fachkräfte anfragen"). Tabs are 1rem 700 in Faint Grey, Warm Grey on hover; the selected tab is Screen White with a 3px Service Vermilion underline sitting on the rule. The hiring tab opens by default for the hiring profile and hiring-track titles; titles pass their name in as the message topic.
- **Message tab (way rows):** a stack of full-width rows on Panel Raised, 4px corners, 1rem 1.1rem padding, 0.5rem apart: a 1.6rem icon, a 1rem 700 label over a 0.875rem Warm Grey detail (tabular numerals), and a trailing arrow that nudges 3px right on hover while the row steps to Line. The first row, "Chat on WhatsApp", is the sheet's primary (`way--primary`): Vermilion Plate with Plate Ink, hovering to Deep Vermilion Plate. The email row is not a link: it shows the address at 1rem in Screen White with two `btn--sm` ghost buttons, "Copy address" (→ "Copied") and "Write an email". Then the call row; LinkedIn only when set.
- **Hiring tab (request form):** an employer request that the site composes into a message and hands off: the brand "Send via WhatsApp" opens WhatsApp, the ghost "Send by email" opens the mail app, and the "Copy request" text button copies it. Nothing is sent or stored by the site, and a Faint Grey 0.875rem note under the actions says so. Fields, choice chips and validation follow Inputs / Fields above.

### Trailer
A WebGL2 thread field behind the billboard, tinted from a three-stop title palette over the screen colour, fading in over 1.8s, with a pause control. No-WebGL and reduced motion fall back to the static key art.

## Do's and Don'ts

### Do:
- **Do** give every new title key art: a motif, its own background/ink/accent, and one of the three faces. A title without art does not enter a rail.
- **Do** keep chrome in the warm neutral ladder and let colour come from art.
- **Do** keep vermilion to the wordmark, the one primary per view ("Get in touch", or "Chat on WhatsApp" / "Send via WhatsApp" as the contact sheet's and closing block's primary), the live "current" state, the active language, the selected sheet tab's underline and the fact dots.
- **Do** route every "Get in touch" to the contact sheet, with the chat-bubble icon, and open it on the hiring tab where the visitor is an employer.
- **Do** mark optional fields as "optional" and leave required ones unmarked; clear each error as soon as its field is filled.
- **Do** keep the key-art badge zone (top-left, about 45% × 22%) clear of motif marks.
- **Do** draw the monogram as an outline in the surrounding ink, inline beside the format word.
- **Do** derive tile sizes from `pad`, `gap` and `per` so a partial tile always peeks at the right edge.
- **Do** delay expansion 0.35s and ease everything with `cubic-bezier(0.16, 1, 0.3, 1)`; shadows appear only while something floats.
- **Do** give every motion a reduced-motion exit and every WebGL surface a static-art fallback.
- **Do** keep uppercase labels at 11px or larger and Faint Grey on Panel Raised or darker.

### Don't:
- **Don't** reproduce a real streaming service's logo, wordmark, typeface or "N"; the identity is the mixed-case wordmark and the outlined VM monogram.
- **Don't** use cool greys or blue-black anywhere in the chrome.
- **Don't** fill a heading, panel or secondary button with vermilion; the only vermilion surfaces are the one primary action per view, the current pill and band, and the 16% error-summary tint.
- **Don't** use Error Salmon for anything but an invalid field, or set Plate Ink anywhere but on Vermilion Plate.
- **Don't** make the site send or store a contact request; the sheet composes and hands off to WhatsApp or the mail app.
- **Don't** fill the monogram as a red badge, and don't place the monogram and format word above a heading as an eyebrow.
- **Don't** set the wordmark in condensed caps.
- **Don't** add shadows to tiles, cards or rows at rest.
- **Don't** introduce a fourth display face or set titles in Archivo outside its three widths.
- **Don't** put format-badge styling (monogram plus tracked uppercase word) on anything that is not a catalogue format; it is not a section label.
- **Don't** lay out titles as an equal grid of cards with icons; titles live in rails (search results are the one grid).
