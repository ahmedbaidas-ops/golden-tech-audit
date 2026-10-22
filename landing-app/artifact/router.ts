// A tiny in-memory router that stands in for Next's in the single-file build. The path starts from the
// URL hash ("#/concept/") so a shared link can open a given tab.
import { useSyncExternalStore } from "react"

const norm = (p: string) => (p.endsWith("/") ? p : p + "/")
let path = norm(location.hash.startsWith("#/") ? location.hash.slice(1).split("#")[0] : "/")
const subs = new Set<() => void>()

export function navigate(href: string) {
  const [to, id] = href.split("#")
  if (to) {
    path = norm(to)
    subs.forEach((f) => f())
    history.replaceState(null, "", "#" + path)
  }
  requestAnimationFrame(() => {
    const el = id ? document.getElementById(id) : null
    if (el) el.scrollIntoView({ block: "start" })
    else if (to) scrollTo(0, 0)
  })
}

export const usePath = () =>
  useSyncExternalStore(
    (f) => (subs.add(f), () => subs.delete(f)),
    () => path,
    () => path,
  )
