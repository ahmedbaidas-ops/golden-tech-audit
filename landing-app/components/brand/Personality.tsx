"use client"

import { useState } from "react"
import { ARCH, EMOTIONS, PILLARS, TRAITS, VALUES } from "@/data/audit"
import { TabPanel } from "../Tabs"

/** Archetype donut: 70% Sage, 30% Everyman. A mask ring sweeps it in when the card scrolls into view. */
export function Archetype() {
  const [cur, setCur] = useState(0)
  const cx = 100
  const cy = 100
  const r = 78
  const ri = r - 30
  let a0 = -Math.PI / 2
  const paths = ARCH.map((a) => {
    const a1 = a0 + (a.pct / 100) * Math.PI * 2
    const large = a.pct > 50 ? 1 : 0
    const p = (rad: number, ang: number) => `${cx + rad * Math.cos(ang)} ${cy + rad * Math.sin(ang)}`
    const d = `M${p(r, a0)} A${r} ${r} 0 ${large} 1 ${p(r, a1)} L${p(ri, a1)} A${ri} ${ri} 0 ${large} 0 ${p(ri, a0)}Z`
    a0 = a1
    return d
  })
  const a = ARCH[cur]
  return (
    <div className="arch" style={{ marginTop: 12 }}>
      <svg
        className="donut"
        viewBox="0 0 200 200"
        width="200"
        height="200"
        role="img"
        aria-label="الحكيم 70 بالمئة، القريب من الناس 30 بالمئة"
      >
        <defs>
          <mask id="dmask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <circle
              className="sweep"
              cx="100"
              cy="100"
              r="63"
              fill="none"
              stroke="#fff"
              strokeWidth="34"
              pathLength={100}
              transform="rotate(-90 100 100)"
            />
          </mask>
        </defs>
        <g mask="url(#dmask)">
          {ARCH.map((x, i) => (
            <path
              key={x.k}
              d={paths[i]}
              fill={x.color}
              className={i === cur ? undefined : "dim"}
              tabIndex={0}
              role="button"
              aria-label={`${x.name} ${x.pct}%`}
              onClick={() => setCur(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setCur(i)
                }
              }}
            />
          ))}
        </g>
        <text x="100" y="104" textAnchor="middle" fontSize="30" fontWeight="700">
          {a.pct}%
        </text>
        <text x="100" y="127" textAnchor="middle" fontSize="13.5" style={{ fill: "var(--muted)" }}>
          {a.en}
        </text>
      </svg>
      <div className="arch-detail">
        <span className="pill">{a.rank}</span>
        <h3 style={{ marginTop: 8 }}>
          {a.name}{" "}
          <span className="muted" style={{ fontSize: ".95rem" }} dir="ltr">
            {a.en}
          </span>
        </h3>
        <p style={{ marginTop: 6 }}>
          <b>الدور:</b> {a.role}
        </p>
        <ul>
          {a.does.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p className="note" style={{ marginTop: 8 }}>
          <b>لماذا يناسب؟</b> {a.why}
        </p>
      </div>
    </div>
  )
}

export function Traits() {
  return (
    <TabPanel
      labels={TRAITS.map((t) => t.k)}
      render={(i) => {
        const t = TRAITS[i]
        return (
          <>
            <p className="muted" dir="ltr" style={{ textAlign: "right" }}>
              {t.en}
            </p>
            <div className="word-list">
              {t.words.map((w) => (
                <span key={w} className={`word ${t.cls}`}>
                  {w}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 14 }}>{t.t}</p>
          </>
        )
      }}
    />
  )
}

export function Values() {
  const [cur, setCur] = useState(0)
  return (
    <div className="values" style={{ marginTop: 10 }}>
      {VALUES.map((v, i) => (
        <button key={v.en} type="button" className="value reveal" aria-pressed={cur === i} onClick={() => setCur(i)}>
          <span className="rank">{i + 1}</span>
          <span>
            <b>{v.ar}</b>
            <small>{v.en}</small>
          </span>
          <span className="role">{v.role}</span>
        </button>
      ))}
    </div>
  )
}

/** Emotions to build; each one names the content pillar that builds it and can open that pillar below. */
export function Emotions() {
  const [cur, setCur] = useState(0)
  const e = EMOTIONS[cur]
  const p = PILLARS[e.pillar - 1]
  return (
    <>
      <div className="emotions" style={{ marginTop: 10 }}>
        {EMOTIONS.map((x, i) => (
          <button key={x.en} type="button" className="emo reveal" aria-pressed={cur === i} onClick={() => setCur(i)}>
            <b>{x.ar}</b>
            <small>{x.en}</small>
          </button>
        ))}
      </div>
      <div className="card reveal" style={{ marginTop: 12 }} aria-live="polite">
        <span className="label">كيف نبني «{e.ar}»؟</span>
        <p style={{ marginTop: 6 }}>
          عبر الركيزة {e.pillar}: <b>{p.ar}</b>{" "}
          <span className="muted" dir="ltr">
            ({p.en})
          </span>
          . {p.msg}
        </p>
        <a
          href={`#pillar-${e.pillar}`}
          style={{ display: "inline-block", marginTop: 8, fontWeight: 700 }}
          onClick={(ev) => {
            const d = document.getElementById(`pillar-${e.pillar}`) as HTMLDetailsElement | null
            if (!d) return
            ev.preventDefault()
            d.open = true
            d.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
          }}
        >
          افتح الركيزة {e.pillar}
        </a>
      </div>
    </>
  )
}
