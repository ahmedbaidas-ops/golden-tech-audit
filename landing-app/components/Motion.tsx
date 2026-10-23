"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function countUp(el: HTMLElement) {
  if (el.dataset.counted) return
  el.dataset.counted = "1"
  const to = Number(el.dataset.count)
  let t0 = 0
  el.textContent = "0"
  const step = (t: number) => {
    if (!t0) t0 = t
    const p = Math.min(1, (t - t0) / 900)
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US")
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Reveals every `.reveal` block as it scrolls into view, staggered by its position among
 * revealing siblings, and starts any count-up numbers inside it. The layout's boot script
 * only adds `js-anim` when the visitor allows motion; without it nothing is hidden.
 */
export function Motion() {
  const pathname = usePathname()
  useEffect(() => {
    if (!document.documentElement.classList.contains("js-anim")) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue
          const el = en.target as HTMLElement
          io.unobserve(el)
          el.classList.add("in")
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp)
          el.dispatchEvent(new CustomEvent("revealed"))
          setTimeout(() => el.classList.add("done"), 1500)
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.12 },
    )
    document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
      let d = 0
      let p = el.previousElementSibling
      while (p && d < 5) {
        if (p.classList.contains("reveal")) d++
        p = p.previousElementSibling
      }
      el.style.setProperty("--d", String(d))
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])
  return null
}
