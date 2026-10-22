"""Turn the Next.js export (out/) into a script-free static page plus a small vanilla script.

Usage (from owner-report/):
    ARTIFACT=1 pnpm build
    python3 static-bundle/build.py out publish
The result in publish/ is what the shareable link serves: index.html (page content without
<html>/<head>/<body>, for hosts that wrap it), assets/ (CSS, fonts, script) and evidence/.
"""
import glob, os, re, shutil, sys

src, dst = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))
os.makedirs(f"{dst}/assets/media", exist_ok=True)
os.makedirs(f"{dst}/evidence", exist_ok=True)

html = open(f"{src}/index.html", encoding="utf-8").read()
body = html[html.index("<body>") + 6 : html.index("</body>")]
body = re.sub(r"<script\b[^>]*>.*?</script>", "", body, flags=re.S)
body = body.replace('<div hidden=""><!--$--><!--/$--></div>', "")

css_rel = re.search(r'<link rel="stylesheet" href="\./(_next/static/chunks/[^"]+\.css)"', html).group(1)
css = open(f"{src}/{css_rel}", encoding="utf-8").read().replace("url(../media/", "url(media/")
open(f"{dst}/assets/report.css", "w", encoding="utf-8").write(css)

for f in glob.glob(f"{src}/_next/static/media/ibm-plex-sans-arabic-*.woff2"):
    if "cyrillic" not in f:
        shutil.copy(f, f"{dst}/assets/media/{os.path.basename(f)}")
for f in glob.glob(f"{src}/evidence/*.webp"):
    shutil.copy(f, f"{dst}/evidence/{os.path.basename(f)}")
for f in ("report.js", "report-extra.css"):
    shutil.copy(f"{here}/{f}", f"{dst}/assets/{f}")

page = (
    '<meta charset="utf-8">\n'
    "<title>تقرير التكنولوجيا الذهبية</title>\n"
    '<link rel="stylesheet" href="assets/report.css">\n'
    '<link rel="stylesheet" href="assets/report-extra.css">\n'
    '<script>document.documentElement.lang="ar";document.documentElement.dir="rtl";</script>\n'
    '<div dir="rtl" lang="ar">\n'
    f"{body}\n"
    "</div>\n"
    '<div class="gt-scrim" id="gt-scrim"></div>\n'
    '<script src="assets/report.js"></script>\n'
)
open(f"{dst}/index.html", "w", encoding="utf-8").write(page)
print("wrote", dst)
