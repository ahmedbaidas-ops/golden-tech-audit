"use client"

import { useEffect, useRef, useState } from "react"

/** Sticky pill bar of in-page sections; highlights the section being read and casts a shadow once stuck. */
export function SectionNav({ label, items }: { label: string; items: [string, string][] }) {
  const nav = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState<string | null>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      ticking = false
      if (nav.current) setStuck(nav.current.getBoundingClientRect().top <= 12)
      let c: string | null = null
      for (const [id] of items) {
        const s = document.getElementById(id)
        if (s && s.getBoundingClientRect().top < 140) c = id
      }
      setCur(c)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [items])

  // keep the active pill visible when the bar scrolls sideways on phones
  useEffect(() => {
    const b = bar.current
    const a = cur && b?.querySelector<HTMLElement>(`a[href="#${cur}"]`)
    if (!b || !a || b.scrollWidth <= b.clientWidth) return
    const r = a.getBoundingClientRect()
    const br = b.getBoundingClientRect()
    if (r.left < br.left || r.right > br.right) b.scrollLeft += r.left + r.width / 2 - (br.left + br.width / 2)
  }, [cur])

  return (
    <nav ref={nav} className={stuck ? "chips stuck" : "chips"} aria-label={label}>
      <div className="inner" ref={bar}>
        {items.map(([id, text]) => (
          <a
            key={id}
            href={`#${id}`}
            className={cur === id ? "on" : undefined}
            onClick={(e) => {
              const t = document.getElementById(id)
              if (!t) return
              e.preventDefault()
              const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
              t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
              history.replaceState(null, "", `#${id}`)
            }}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  )
}
