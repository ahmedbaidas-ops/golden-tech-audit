# Assemble golden-audits.html from template.html + data/render code/brand markup of golden-audits.v1.html + logos.json
import json
src = open('content-source.html', encoding='utf-8').read().split('\n')
tpl = open('template.html', encoding='utf-8').read()
def find(sub, start=0):
    for i in range(start, len(src)):
        if sub in src[i]: return i
    raise SystemExit('missing: ' + sub)
def chunk(a, b):
    i = find(a); j = find(b, i + 1); return '\n'.join(src[i:j]).rstrip() + '\n'
i = find('<section class="sec" id="b-company">'); j = find('المصدر: لوحة مراجعة العلامة', i)
out = (tpl.replace('/*__DATA__*/', chunk('/* ---------------- data: brand audit', '/* ---------------- tabs helper'))
          .replace('/*__JS_A__*/', chunk('/* ---------------- tabs helper', '/* ---------------- brand: competitors + swot'))
          .replace('/*__JS_B__*/', chunk('/* ---------------- brand: gaps', '/* ---------------- brand: personality'))
          .replace('/*__JS_C__*/', chunk('/* ---------------- brand: values & emotions', '/* ---------------- website ----'))
          .replace('<!--__BRAND_SECTIONS__-->', '\n'.join(l[2:] if l.startswith('  ') else l for l in src[i:j + 1]))
          .replace('/*__LOGOS__*/', json.dumps(json.load(open('../logos/logos.json')))))
assert '/*__' not in out and '<!--__' not in out
open('../index.html', 'w', encoding='utf-8').write(out)
w = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>'
open('/dev/null', 'w', encoding='utf-8').write(w + out + '</body></html>')
print('built', len(out.encode()), 'bytes')
