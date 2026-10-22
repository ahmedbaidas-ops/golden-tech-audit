"use client"

import { CHANNELS, SEGMENTS } from "@/data/audit"
import { TabPanel } from "../Tabs"

export function Channels() {
  return (
    <div style={{ marginTop: 10 }}>
      <TabPanel labels={CHANNELS.map((c) => c.k)} render={(i) => <p style={{ fontSize: "1.08rem" }}>{CHANNELS[i].t}</p>} />
    </div>
  )
}

export function Segments() {
  return (
    <TabPanel
      labels={SEGMENTS.map((s) => s.k)}
      className="panel grid-2"
      render={(i) => (
        <>
          <div>
            <span className="label">ما الذي يهمهم؟</span>
            <p style={{ marginTop: 6, fontSize: "1.05rem" }}>{SEGMENTS[i].care}</p>
          </div>
          <div style={{ background: "var(--gold-soft)", borderRadius: "var(--r-md)", padding: 16 }}>
            <span className="label">فرصة الذهبية</span>
            <p style={{ marginTop: 6, fontSize: "1.05rem" }}>{SEGMENTS[i].opp}</p>
          </div>
        </>
      )}
    />
  )
}
