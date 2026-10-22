"use client"

import { useState } from "react"
import { FIXES, FIX_PHASE, PHASES } from "@/data/audit"
import { TabPanel, Tabs } from "../Tabs"
import { Icon, cssVars } from "../ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion"

/** Website score as 25 segments over a half circle; 12 lit for 48/100. It fills from the right, as Arabic reads. */
export function ScoreGauge() {
  const v = 48
  const n = 25
  const lit = Math.round((v / 100) * n)
  const cx = 150
  const cy = 160
  const th = 10
  return (
    <svg className="sgauge" viewBox="0 0 300 172" role="img" aria-label="درجة الموقع 48 من 100">
      {Array.from({ length: n }, (_, i) => {
        const on = i < lit
        const mix = on ? Math.round(100 - (i / Math.max(1, lit - 1)) * 62) : 0
        return (
          <g key={i} transform={`rotate(${(-(i + 0.5) * 180) / n} ${cx} ${cy})`}>
            <rect
              className={on ? "s on" : "s"}
              fill={on ? "#0b1533" : "#eaecf1"}
              style={cssVars({ "--i": i, fill: on ? `color-mix(in srgb, var(--gauge-a) ${mix}%, var(--gauge-b))` : "var(--gauge-off)" })}
              x={cx + 94}
              y={cy - th / 2}
              width={44}
              height={th}
              rx={th / 2}
            />
          </g>
        )
      })}
      <text x="150" y="136" textAnchor="middle" fontSize="48" fontWeight="700">
        <tspan data-count={v}>{v}</tspan>
      </text>
      <text x="150" y="160" textAnchor="middle" fontSize="13" style={{ fill: "var(--muted)" }}>
        من 100
      </text>
    </svg>
  )
}

// letters that Arabic users type interchangeably, folded before searching
const norm = (t: string) => t.replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").toLowerCase()

export function FixesTable() {
  const [filter, setFilter] = useState(0)
  const [q, setQ] = useState("")
  const want = ["", "عاجل", "مهم"][filter]
  const nq = norm(q.trim())
  const rows = FIXES.map((f, i) => ({ f, i })).filter(
    ({ f }) => (!want || f.u === want) && (!nq || norm(`${f.h} ${f.s} ${f.f}`).includes(nq)),
  )
  const count = (u?: string) => FIXES.filter((f) => !u || f.u === u).length
  return (
    <div className="card tbl-card reveal">
      <div className="tbl-tools">
        <label className="search">
          <Icon name="search" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحثوا: التوصيل، السلة، واتساب"
            aria-label="ابحثوا في الملاحظات"
          />
        </label>
        <Tabs
          label="تصفية حسب الأولوية"
          value={filter}
          onChange={setFilter}
          labels={[
            <>
              الكل <span className="n">{count()}</span>
            </>,
            <>
              عاجل <span className="n">{count("عاجل")}</span>
            </>,
            <>
              مهم <span className="n">{count("مهم")}</span>
            </>,
          ]}
        />
      </div>
      <div className="thead" aria-hidden="true">
        <span>#</span>
        <span>الملاحظة</span>
        <span>الأولوية</span>
        <span>المرحلة</span>
        <span />
      </div>
      <Accordion type="multiple">
        {rows.map(({ f, i }) => {
          const urgency = <span className={f.u === "عاجل" ? "chip bad" : "chip warn"}>{f.u}</span>
          const phase = (
            <span className="ph">
              <Icon name="clock" />
              المرحلة {FIX_PHASE[i] === 1 ? "الأولى" : "الثانية"}
            </span>
          )
          return (
            <AccordionItem value={f.h} className="fx" key={f.h}>
              <AccordionTrigger className="frow grid items-center gap-3 rounded-[12px] p-3.5 text-base font-normal hover:bg-muted">
                <span className="no">{i + 1}</span>
                <span className="c-t">
                  <span className="t">{f.h}</span>
                  <span className="m-only">
                    {urgency}
                    {phase}
                  </span>
                </span>
                <span className="c-u">{urgency}</span>
                <span className="c-p">{phase}</span>
              </AccordionTrigger>
              <AccordionContent className="fx-body pb-[18px] text-base">
                <div>
                  <span className="label">ما يراه الزبون</span>
                  <p>{f.s}</p>
                </div>
                <div className="fix">
                  <span className="label" style={{ color: "var(--good)" }}>
                    الحل
                  </span>
                  <p>{f.f}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      {!rows.length && <p className="empty">لا توجد ملاحظة بهذه الكلمة. جرّبوا كلمة أخرى.</p>}
    </div>
  )
}

export function PhasePlan() {
  return (
    <div className="card reveal">
      <TabPanel
        labels={PHASES.map((p) => p.k)}
        className="panel phase-panel"
        render={(i) => {
          const ph = PHASES[i]
          return (
            <>
              <span className="chip gold">{ph.when}</span>
              <h3 style={{ fontSize: "1.25rem", marginTop: 8 }}>{ph.h}</h3>
              <ul>
                {ph.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p style={{ marginTop: 14, background: "var(--good-soft)", borderRadius: "var(--r-md)", padding: "12px 14px" }}>
                <b style={{ color: "var(--good)" }}>ماذا ستلاحظون:</b> {ph.r}
              </p>
            </>
          )
        }}
      />
    </div>
  )
}
