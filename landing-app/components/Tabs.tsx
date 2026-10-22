"use client"

import { useRef, useState, type ReactNode } from "react"

type TabsProps = { labels: ReactNode[]; value: number; onChange: (i: number) => void; label?: string }

/** Segmented tabs. Left and right arrows move between them, flipped for right-to-left. */
export function Tabs({ labels, value, onChange, label }: TabsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {labels.map((l, i) => (
        <button
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          role="tab"
          className="tab"
          aria-selected={i === value}
          tabIndex={i === value ? 0 : -1}
          onClick={() => onChange(i)}
          onKeyDown={(e) => {
            const d = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0
            if (!d) return
            e.preventDefault()
            const n = (i + d + labels.length) % labels.length
            onChange(n)
            refs.current[n]?.focus()
          }}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

/** Tabs with a panel below; the panel remounts on every switch so its fade-in replays. */
export function TabPanel({
  labels,
  render,
  start = 0,
  className = "panel",
  label,
}: {
  labels: ReactNode[]
  render: (i: number) => ReactNode
  start?: number
  className?: string
  label?: string
}) {
  const [i, setI] = useState(start)
  return (
    <>
      <Tabs labels={labels} value={i} onChange={setI} label={label} />
      <div key={i} className={className} role="tabpanel">
        {render(i)}
      </div>
    </>
  )
}
