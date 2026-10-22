# Golden Technology audit: landing app

Next.js 16 / React 19 app for the Golden Technology brand and website audit by Pixilated Studio.
Arabic, right to left. It replaces the single-file page in `../landing/` (kept only as the old artifact build).

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in out/, deployable to any static host
pnpm typecheck
```

## Routes

| Route | What it shows |
|---|---|
| `/` | Overview: website score, fixes, strengths, competitors, links to both audits and the concept |
| `/brand/` | Brand audit: company, audience, SWOT per competitor, positioning maps, personality, values, pillars |
| `/website/` | Website audit: score gauge, area chart, searchable list of the 8 fixes, phased plan |
| `/concept/` | Before/after of a homepage concept with Walmart's layout in Golden's colours |

## Where things live

- `data/audit.ts`: all audit content (brand board and owner report), typed. Edit copy here.
- `data/concept.ts`: concept products (from the site's PC Gaming page, 22 Oct 2026) and the 7 changes.
- `app/globals.css`: design tokens (light and dark) and all component styles.
- `components/`: `ui.tsx` (Icon, Logo, KPI card, headings), `Tabs.tsx`, `SectionNav.tsx` (sticky in-page nav),
  `Motion.tsx` (reveal on scroll and count-up numbers), plus `brand/`, `website/` and `concept/` sections.
- `public/logos/`: brand and competitor logos from the FigJam brand board.
- `public/concept/`: the before screenshot and product images from the current site.

## Motion

A boot script in `app/layout.tsx` adds `js-anim` to `<html>` only when the visitor allows motion.
Elements with the `reveal` class then fade in as they scroll into view (`components/Motion.tsx`),
and `[data-count]` numbers count up. With reduced motion, nothing is hidden or animated.

## Open item

The concept shelf uses the site's own box renders, which look alike (audit finding 6).
Swap `public/concept/p*.webp` for real photos of each build; the file names map to `data/concept.ts`.
