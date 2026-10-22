// Builds the whole Next app into one self-contained HTML file for the claude.ai artifact:
// the same pages and components, an in-memory router in place of Next's, images inlined as data URIs,
// and the same app.css compiled by Tailwind. Usage: node artifact/build.mjs [out.html]
import fs from "node:fs"
import path from "node:path"
import { build } from "esbuild"
import postcss from "postcss"
import tailwind from "@tailwindcss/postcss"

const root = path.resolve(import.meta.dirname, "..")
const out = path.resolve(process.argv[2] ?? path.join(root, "artifact/dist/index.html"))

const css = (
  await postcss([tailwind({ base: root, optimize: { minify: true } })]).process(fs.readFileSync(path.join(root, "app/app.css"), "utf8"), {
    from: path.join(root, "app/app.css"),
  })
).css

const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" }
const assets = {}
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const f = path.join(dir, d.name)
    if (d.isDirectory()) return walk(f)
    const mime = MIME[path.extname(d.name)]
    if (mime) assets[path.relative(path.join(root, "public"), f).split(path.sep).join("/")] = `data:${mime};base64,${fs.readFileSync(f).toString("base64")}`
  })
walk(path.join(root, "public"))

const js = await build({
  absWorkingDir: root,
  entryPoints: ["artifact/main.tsx"],
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "error",
  alias: { "next/link": "./artifact/shims/link.tsx", "next/navigation": "./artifact/shims/navigation.ts" },
  plugins: [
    {
      name: "inline-assets",
      setup(b) {
        b.onResolve({ filter: /^@\/lib\/asset$/ }, () => ({ path: "asset", namespace: "inline-assets" }))
        b.onLoad({ filter: /.*/, namespace: "inline-assets" }, () => ({
          loader: "js",
          contents: `const M=${JSON.stringify(assets)};export const asset=(p)=>M[p]??"/"+p;export const flowImg=(n)=>asset("flow/"+n+".webp");`,
        }))
      },
    },
  ],
})

const MOTION_BOOT =
  'if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&"IntersectionObserver"in window)document.documentElement.classList.add("js-anim")'
const FONTS = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Readex+Pro:wght@500;600;700&display=swap"
const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>تدقيق التكنولوجيا الذهبية</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<script>${MOTION_BOOT}</script>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")}</script>
</body>
</html>
`
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, html)
console.log(`${path.relative(root, out)}: ${(html.length / 1024).toFixed(0)} KB, ${Object.keys(assets).length} images, css ${(css.length / 1024).toFixed(0)} KB`)
