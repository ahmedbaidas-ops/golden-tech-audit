import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn/button"
import { cssVars, fmt } from "../../ui"

export type Fulfil = "ship" | "pickup"

/** Shared state of the mock store, owned by FlowConcept. */
export type Flow = {
  qty: Record<string, number>
  count: number
  total: number
  saved: number
  bump: number
  fulfil: Fulfil
  add: (id: string, d: number) => void
  go: (step: number) => void
  setFulfil: (f: Fulfil) => void
  reset: () => void
}

// the delivery wording is the site's own: 24 hours in Riyadh, 3 to 6 working days elsewhere
export const FULFIL: Record<Fulfil, { title: string; sub: string }> = {
  ship: { title: "توصيل غداً", sub: "الرياض · أو استلام من المعرض" },
  pickup: { title: "استلام من المعرض", sub: "شارع العليا، الرياض" },
}

export const sar = (n: number) => `${fmt(Math.round(n * 100) / 100)} ر.س`

/** Gold numbered marker; each number matches a row of the change table under the mock. */
export function Pin({ n }: { n: number }) {
  return (
    <span className="pin" aria-hidden="true" style={cssVars({ "--pi": n })}>
      {n}
    </span>
  )
}

/** Only the icons Walmart itself uses: search, cart, favourite, arrows. */
export function Svg({ name, className }: { name: string; className?: string }) {
  return (
    <svg aria-hidden="true" className={className}>
      <use href={`#i-${name}`} />
    </svg>
  )
}

/** Quantity control in the shape of Walmart's: a pill with minus, the count and plus. */
export function Stepper({ q, name, min = 0, onChange }: { q: number; name: string; min?: number; onChange: (d: number) => void }) {
  const btn = "size-8 rounded-full text-lg leading-none hover:bg-muted"
  return (
    <span className="inline-flex h-9 items-center gap-0.5 rounded-full border border-foreground p-0.5">
      <Button variant="ghost" size="icon-sm" className={btn} disabled={q <= min} aria-label={`أنقص كمية ${name}`} onClick={() => onChange(-1)}>
        −
      </Button>
      <b className="min-w-6 text-center text-sm tabular-nums" aria-live="polite">
        {q}
      </b>
      <Button variant="ghost" size="icon-sm" className={btn} aria-label={`زد كمية ${name}`} onClick={() => onChange(1)}>
        +
      </Button>
    </span>
  )
}

/** Underlined text action, Walmart's "Change" / "Remove" links. */
export function TextLink({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      variant="link"
      className={cn("h-auto p-0 text-[0.84rem] font-normal text-foreground underline underline-offset-[3px] hover:decoration-2", className)}
      {...props}
    />
  )
}
