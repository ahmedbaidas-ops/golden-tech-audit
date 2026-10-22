"use client"

import { BRANDS, ORDER, SWOT } from "@/data/audit"
import { TabPanel } from "../Tabs"
import { Logo } from "../ui"

function Quad({ cls, ar, en, list }: { cls: string; ar: string; en: string; list: string[] }) {
  return (
    <div className={`quad ${cls}`}>
      <h4>
        {ar} <span>{en}</span>
      </h4>
      <ul>
        {list.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  )
}

export function Swot() {
  return (
    <TabPanel
      labels={ORDER.map((k) => (
        <>
          <Logo k={k} size={28} />
          {BRANDS[k].name}
        </>
      ))}
      render={(i) => {
        const k = ORDER[i]
        const d = SWOT[k]
        return (
          <>
            <div className="comp-meta">
              <Logo k={k} size={56} />
              <div>
                <h3>{BRANDS[k].name}</h3>
                <div className="pills">
                  <span className="pill">{d.type}</span>
                  <span className="pill" dir="ltr">
                    {d.site}
                  </span>
                </div>
              </div>
            </div>
            {d.about && <p style={{ marginBottom: 14 }}>{d.about}</p>}
            <div className="swot">
              <Quad cls="q-s" ar="نقاط القوة" en="Strengths" list={d.s} />
              <Quad cls="q-w" ar="نقاط تحتاج تدقيقاً" en="Weaknesses" list={d.w} />
              <Quad cls="q-o" ar="الفرص" en="Opportunities" list={d.o} />
              <Quad cls="q-t" ar="التهديدات" en="Threats" list={d.t} />
            </div>
          </>
        )
      }}
    />
  )
}
