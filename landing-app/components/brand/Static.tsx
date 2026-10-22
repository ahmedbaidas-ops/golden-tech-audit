import { ASSESS, AVOID, DIRECTIONS, HYPOS, NOT_VALUES, PILLARS, PRODUCTS, SLIDERS } from "@/data/audit"
import { Accordion, cssVars } from "../ui"

export function Products() {
  return (
    <div className="grid-3" style={{ marginTop: 18 }}>
      {PRODUCTS.map((p) => (
        <div className="card reveal" key={p.h}>
          <h3 style={{ fontSize: "1.1rem" }}>{p.h}</h3>
          <p className="muted" style={{ marginTop: 6 }}>
            {p.t}
          </p>
        </div>
      ))}
    </div>
  )
}

export function AssessRows() {
  return (
    <>
      {ASSESS.map((r) => (
        <tr key={r[0]}>
          <td>{r[0]}</td>
          <td>{r[1]}</td>
        </tr>
      ))}
    </>
  )
}

export function Hypotheses() {
  return (
    <div style={{ marginTop: 10 }}>
      {HYPOS.map((h, i) => (
        <Accordion key={h.h} idx={i + 1} title={h.h}>
          <span className="label">المشكلة المحتملة</span>
          <p>{h.p}</p>
          <span className="label">كيف نتحقق؟</span>
          <p>{h.v}</p>
        </Accordion>
      ))}
    </div>
  )
}

export function Directions() {
  return (
    <div className="grid-3" style={{ marginTop: 12 }}>
      {DIRECTIONS.map((d, i) => (
        <div className="card reveal" key={d.h}>
          <small className="label">الاتجاه {i + 1}</small>
          <h3 style={{ fontSize: "1.1rem", marginTop: 4 }}>{d.h}</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            {d.t}
          </p>
          <p style={{ marginTop: 10 }}>
            <b>{d.c[0]}:</b> {d.c[1]}
          </p>
        </div>
      ))}
    </div>
  )
}

export function ToneSliders() {
  return (
    <div>
      {SLIDERS.map((s, i) => (
        <div className="slider" key={s[0]} style={cssVars({ "--i": i })}>
          <div className="ends">
            <span>
              {s[0]}{" "}
              <span className="muted num" style={{ fontWeight: 500 }}>
                {s[2]}%
              </span>
            </span>
            <span>{s[3]}</span>
          </div>
          <div className="track" role="img" aria-label={`${s[0]} ${s[2]}% مقابل ${s[3]}`}>
            <i style={{ width: `${s[2]}%` }} />
            <b style={{ insetInlineStart: `${s[2]}%` }} />
          </div>
          <p className="note">{s[5]}</p>
        </div>
      ))}
    </div>
  )
}

export function NotValues() {
  return (
    <div className="stack" style={{ marginTop: 10 }}>
      {NOT_VALUES.map((v) => (
        <div key={v[0]}>
          <b>{v[0]}</b>
          <p className="note">{v[1]}</p>
        </div>
      ))}
    </div>
  )
}

export function Avoid() {
  return (
    <div className="stack" style={{ marginTop: 10 }}>
      {AVOID.map((a) => (
        <div key={a[0]}>
          <b style={{ color: "var(--bad)" }}>{a[0]}</b>
          <p className="note">{a[1]}</p>
        </div>
      ))}
    </div>
  )
}

export function Pillars() {
  return (
    <div>
      {PILLARS.map((p, i) => (
        <Accordion
          key={p.en}
          id={`pillar-${i + 1}`}
          idx={i + 1}
          open={i === 0}
          title={
            <>
              {p.ar}{" "}
              <span className="muted" style={{ fontWeight: 500 }} dir="ltr">
                {p.en}
              </span>
              {"primary" in p && p.primary && (
                <span className="pill" style={{ marginInlineStart: 6 }}>
                  الركيزة الأساسية
                </span>
              )}
            </>
          }
        >
          <div className="grid-2">
            <div>
              <span className="label">الفكرة</span>
              <p>{p.idea}</p>
            </div>
            <div style={{ background: "var(--gold-soft)", borderRadius: "var(--r-md)", padding: 14 }}>
              <span className="label">الرسالة الأساسية</span>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", marginTop: 4 }}>{p.msg}</p>
            </div>
          </div>
          <span className="label">مواضيع المحتوى</span>
          <ul style={{ margin: 0, paddingInlineStart: 18 }}>
            {p.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p>
            <b>الهدف العاطفي:</b> <span dir="auto">{p.emo}</span>
          </p>
          <p className="note">يرتبط بـ{p.link}</p>
        </Accordion>
      ))}
    </div>
  )
}
