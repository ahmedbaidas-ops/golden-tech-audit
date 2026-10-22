import type { CSSProperties, ReactNode } from "react"
import { BRANDS, type BrandKey } from "@/data/audit"

export const FULL_REPORT = "https://claude.ai/artifact/QKChBZqPJg53PdwVUbLFmg"
export const TEAM_BOARD = "https://claude.ai/artifact/Qou2KRNnrgkXdYrGbMPXqg"

export const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 })
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties

export function Icon({ name, className, size }: { name: string; className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  )
}

export function Logo({ k, size = 40 }: { k: BrandKey; size?: number }) {
  return (
    <span className={k === "noon" ? "logo full" : "logo"} style={cssVars({ "--s": `${size}px` })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/logos/${k}.webp`} alt="" width={size} height={size} decoding="async" />
    </span>
  )
}

export function LogoStack({ keys, size = 34 }: { keys: BrandKey[]; size?: number }) {
  return (
    <span className="stack-logos" role="img" aria-label={keys.map((k) => BRANDS[k].name).join("، ")}>
      {keys.map((k) => (
        <Logo key={k} k={k} size={size} />
      ))}
    </span>
  )
}

export function PageHead({ title, sub, actions, meta }: { title: string; sub: ReactNode; actions?: ReactNode; meta?: string }) {
  return (
    <div className="page-head reveal">
      <div>
        {meta && <span className="eyebrow-chip">{meta}</span>}
        <h1>{title}</h1>
        <p className="sub">{sub}</p>
      </div>
      {actions && <div className="head-actions">{actions}</div>}
    </div>
  )
}

export function SecHead({ title, sub }: { title: string; sub: ReactNode }) {
  return (
    <div className="sec-head reveal">
      <div>
        <h2>{title}</h2>
        <p>{sub}</p>
      </div>
    </div>
  )
}

type KpiProps = {
  label: string
  icon: string
  tone?: "bad" | "good" | "gold"
  accent?: boolean
  value: ReactNode
  extra?: ReactNode
  foot: ReactNode
}

export function Kpi({ label, icon, tone, accent, value, extra, foot }: KpiProps) {
  return (
    <div className={accent ? "kpi accent reveal" : "kpi reveal"}>
      <span className={tone ? `k-ico ${tone}` : "k-ico"}>
        <Icon name={icon} />
      </span>
      <p className="k-label">{label}</p>
      <p className="k-val">
        {value}
        {extra}
      </p>
      <p className="k-foot">{foot}</p>
    </div>
  )
}

/** A number that counts up from zero when its card scrolls into view (see Motion). */
export function Count({ to }: { to: number }) {
  return <span data-count={to}>{to}</span>
}

export function Accordion({
  idx,
  title,
  open,
  id,
  children,
}: {
  idx: number
  title: ReactNode
  open?: boolean
  id?: string
  children: ReactNode
}) {
  return (
    <details className="acc reveal" id={id} open={open}>
      <summary>
        <span className="idx">{idx}</span>
        <span>{title}</span>
        <span className="chev">
          <Icon name="chev" size={18} />
        </span>
      </summary>
      <div className="body">{children}</div>
    </details>
  )
}
