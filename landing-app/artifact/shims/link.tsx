import type { AnchorHTMLAttributes } from "react"
import { navigate } from "../router"

/** next/link for the single-file build: internal paths go through the in-memory router. */
export default function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const internal = href.startsWith("/")
  return (
    <a
      href={internal ? "#" + href : href}
      onClick={(e) => {
        onClick?.(e)
        if (!internal || e.defaultPrevented || e.metaKey || e.ctrlKey) return
        e.preventDefault()
        navigate(href)
      }}
      {...rest}
    />
  )
}
