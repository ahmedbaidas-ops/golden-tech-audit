"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { AREAS, SHORT } from "@/data/audit"
import { Tabs } from "../Tabs"
import { cssVars } from "../ui"

type Tone = "good" | "warn" | "bad"
const tone = (v: number): Tone => (v >= 70 ? "good" : v >= 40 ? "warn" : "bad")
const TONE: Record<Tone, string> = { good: "جيد", warn: "متوسط", bad: "ضعيف" }
const WEAKEST = [...AREAS].sort((a, b) => a[1] - b[1])[0][0]
const GRID = [0, 25, 50, 75, 100]

/** Ten area scores as columns (rows on phones). The selected column is hatched gold with a tooltip. */
export function AreaChart() {
  const [order, setOrder] = useState(0)
  const [sel, setSel] = useState(WEAKEST)
  const [pre, setPre] = useState(false)
  const card = useRef<HTMLDivElement>(null)
  const plot = useRef<HTMLDivElement>(null)
  const tip = useRef<HTMLDivElement>(null)
  const list = [...AREAS].sort((a, b) => (order ? a[1] - b[1] : b[1] - a[1]))
  const a = AREAS.find((x) => x[0] === sel)!
  const t = tone(a[1])

  const place = useCallback(() => {
    const el = tip.current
    const p = plot.current
    const col = p?.querySelector<HTMLElement>(".col.sel")
    if (!el || !p || !col || getComputedStyle(el).display === "none") return
    const host = card.current
    if (document.documentElement.classList.contains("js-anim") && host && !host.classList.contains("in")) return
    const v = Number(col.dataset.v)
    const pr = p.getBoundingClientRect()
    const cr = col.getBoundingClientRect()
    const tw = el.offsetWidth
    const th = el.offsetHeight
    const barTop = pr.height * (1 - v / 100)
    const mid = cr.left - pr.left + cr.width / 2
    let top = barTop - th - 18
    let left = mid - tw / 2
    if (top < 0) {
      // no room above a tall bar: sit beside it instead
      top = Math.max(0, barTop - 6)
      left = mid - cr.width / 2 - tw - 10
      if (left < 0) left = mid + cr.width / 2 + 10
    }
    el.style.left = `${Math.max(0, Math.min(pr.width - tw, left))}px`
    el.style.top = `${top}px`
    el.classList.add("show")
  }, [])

  useLayoutEffect(place, [place, sel, order])

  // new order: bars start flat for two frames, then grow
  useEffect(() => {
    if (!pre) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setPre(false)))
    return () => cancelAnimationFrame(id)
  }, [pre])

  useEffect(() => {
    const host = card.current
    const onReveal = () => setTimeout(place, 650)
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(place)
    }
    host?.addEventListener("revealed", onReveal)
    window.addEventListener("resize", onResize)
    return () => {
      host?.removeEventListener("revealed", onReveal)
      window.removeEventListener("resize", onResize)
    }
  }, [place])

  return (
    <div className="card reveal" id="w-areas" ref={card}>
      <div className="card-head">
        <div>
          <h3>درجة كل جزء من الموقع</h3>
          <p className="note">اضغطوا على أي عمود لقراءة درجته.</p>
        </div>
        <Tabs
          labels={["الأقوى أولاً", "الأضعف أولاً"]}
          value={order}
          onChange={(i) => {
            if (document.documentElement.classList.contains("js-anim")) setPre(true)
            setOrder(i)
          }}
        />
      </div>
      <div className="vchart">
        <div className="yaxis" aria-hidden="true">
          {GRID.map((g) => (
            <span key={g} style={{ bottom: `${g}%` }}>
              {g}
            </span>
          ))}
        </div>
        <div className="plot" ref={plot}>
          <div aria-hidden="true">
            {GRID.map((g) => (
              <div key={g} className="gl" style={{ bottom: `${g}%` }} />
            ))}
          </div>
          <div className={pre ? "cols pre" : "cols"}>
            {list.map(([name, v], j) => (
              <button
                key={name}
                type="button"
                className={name === sel ? "col sel" : "col"}
                style={cssVars({ "--v": v, "--i": j })}
                data-v={v}
                aria-pressed={name === sel}
                aria-label={`${name}: ${v} من 100`}
                onClick={() => setSel(name)}
              >
                <span className="lbl">{name}</span>
                <span className="trk">
                  <span className="fl" />
                </span>
                <span className={`val t-${tone(v)}`}>{v}</span>
              </button>
            ))}
          </div>
          <div className="tip" ref={tip} aria-hidden="true">
            <b>{a[0]}</b>
            <span className="r">
              <span>
                <span className="dot" style={{ background: `var(--${t})` }} />
                الدرجة
              </span>
              <strong>{a[1]} من 100</strong>
            </span>
            <span className="r">
              <span>الحالة</span>
              <strong style={{ color: `var(--${t})` }}>{TONE[t]}</strong>
            </span>
          </div>
        </div>
        <div className="xlabels" aria-hidden="true">
          {list.map(([name]) => (
            <span key={name} className={name === sel ? "sel" : undefined}>
              {SHORT[name] ?? name}
            </span>
          ))}
        </div>
      </div>
      <p className="chart-detail" aria-live="polite">
        <b>{a[0]}</b>: {a[1]} من 100، {TONE[t]}.
      </p>
      <div className="legend">
        <span>
          <i style={{ background: "var(--bad)" }} />
          أقل من 40 ضعيف
        </span>
        <span>
          <i style={{ background: "var(--warn)" }} />
          من 40 إلى 69 متوسط
        </span>
        <span>
          <i style={{ background: "var(--good)" }} />
          70 فأكثر جيد
        </span>
      </div>
    </div>
  )
}
