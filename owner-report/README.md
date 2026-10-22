# Owner report — التكنولوجيا الذهبية

Arabic, right-to-left report for the store owner, built on the ForgeUI dashboard template (Next.js 16, shadcn/ui, Tailwind 4).

- All wording: `constants/audit.ts`
- Sections: `components/report/`
- Sidebar and header (with text-size control): `components/layout/sidebarDashboard.tsx`, `components/dashboard/dashboardHeader.tsx`
- Evidence screenshots: `public/evidence/`
- Font: IBM Plex Sans Arabic (`@fontsource/ibm-plex-sans-arabic`, bundled; no network needed at build time)

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # static export in out/  (ARTIFACT=1 pnpm build → relative asset paths)
```

## Shareable static page

```bash
ARTIFACT=1 pnpm build
python3 static-bundle/build.py out publish
```

`publish/` holds a script-free copy of the report (plus `static-bundle/report.js` for the menu, scroll highlight and text-size buttons) that any static host can serve.

Template license (ForgeUI): personal and commercial use, including client work; the source may not be redistributed or shared. Keep this repository private.
