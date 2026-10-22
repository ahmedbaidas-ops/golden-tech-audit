# Golden Tech — e-commerce UX & UI audit

Client: **Golden Technology / التكنولوجيا الذهبية** (goldentech.com.sa), Riyadh
Prepared by: **Pixilated Studio** · October 2026

> Keep this repository **private**. It holds a client audit, and `owner-report/` is built on the ForgeUI dashboard template, whose license forbids sharing its source publicly.

## What's here

| Folder | For whom | What it is |
|---|---|---|
| `owner-report/` | The store owner | Arabic, right-to-left, plain-language report: summary, strengths, top 8 issues (what the customer sees / why it matters / the fix), quick notes with screenshots, customer journey, competitor comparison, 3-phase plan. Large type with a text-size control. Next.js 16 + shadcn/ui (ForgeUI template). |
| `audit/` | Pixilated team | The full audit: evidence files, scored datasets (42 findings, 110 checks), and the detailed English dashboard source. See `audit/README.md`. |

## Headline

- UX score **48 / 100** (110 weighted checks, 102 evidenced).
- 2 critical issues (delivery promise contradicts the Terms; returns 7 days, defects only), 16 major, 12 strengths to keep.
- Still to test: phone layout and Apple Pay in Safari.

## Run the owner report

```bash
cd owner-report
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static site in owner-report/out/
```

Report text lives in `owner-report/constants/audit.ts`; evidence images in `owner-report/public/evidence/`.
