"use client"

import { useState } from "react"
import Link from "next/link"
import { PLANS, type Plan } from "@/data/proposal"
import { Badge } from "@/components/shadcn/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group"
import { cn } from "@/lib/utils"
import { fmt } from "../ui"

const months = (n: number) => (n === 12 ? "12 شهراً" : `${n} أشهر`)

/** The two monthly plans side by side; the first is light, the second navy, so they read as a pair, not a ranking. */
export function Plans() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {PLANS.map((p) => (
        <PlanCard key={p.id} p={p} />
      ))}
    </div>
  )
}

function PlanCard({ p }: { p: Plan }) {
  const [term, setTerm] = useState(p.months[0])
  const dark = p.no === 2
  const muted = dark ? "text-[var(--on-navy-muted)]" : "text-muted-foreground"
  return (
    <Card
      className={cn(
        "reveal gap-0 rounded-[var(--r-lg)] py-0",
        dark && "border-[rgb(231_196_110/.25)] bg-[linear-gradient(150deg,var(--navy-2),var(--navy)_70%)] text-[var(--on-navy)]",
      )}
    >
      <CardHeader className="gap-3 px-7 pt-7 pb-6">
        <div className="flex items-center justify-between gap-3">
          <Badge className={cn("rounded-full border-0 px-3 py-0.5 text-sm font-semibold", dark ? "bg-white/10 text-gold-hi" : "bg-accent text-accent-foreground")}>
            الباقة {p.no}
          </Badge>
          <span dir="ltr" className={cn("text-sm", muted)}>
            {p.en}
          </span>
        </div>
        <h2 className="font-heading text-[1.45rem] leading-snug">{p.name}</h2>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <b className={cn("font-heading text-[2.6rem] leading-none font-bold tabular-nums", dark && "text-gold-hi")}>{fmt(p.monthly)}</b>
          <span className="font-semibold">ر.س شهرياً</span>
        </p>
        <p className={muted}>المدة: {p.months.length > 1 ? `من ${p.months[0]} إلى ${months(p.months[1])}` : months(p.months[0])}</p>
      </CardHeader>
      <Separator className={dark ? "bg-white/10" : undefined} />
      <CardContent className="grid gap-3 px-7 py-6">
        <span className={cn("text-sm font-bold", dark ? "text-gold-hi" : "text-[var(--gold-ink)]")}>تشمل</span>
        <ul className="grid gap-3">
          {p.includes.map(([ar, en]) => (
            <li key={en} className="flex items-start gap-3">
              <span aria-hidden="true" className={cn("mt-[.7em] size-2 shrink-0 rounded-full", dark ? "bg-gold-hi" : "bg-gold")} />
              <span>
                <b className="font-semibold">{ar}</b>
                <span dir="ltr" className={cn("block text-sm", muted)}>
                  {en}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <span className={cn("mt-3 text-sm font-bold", dark ? "text-gold-hi" : "text-[var(--gold-ink)]")}>يعالج من هذا التقرير</span>
        <ul className="grid gap-1.5">
          {p.covers.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className={cn("font-semibold underline underline-offset-4", dark ? "text-[var(--on-navy)]" : "text-foreground")}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter
        className={cn(
          "mt-auto flex-wrap items-center justify-between gap-4 rounded-b-[var(--r-lg)] px-7 py-5",
          dark ? "bg-black/20" : "bg-muted",
        )}
      >
        <div>
          <span className={cn("block text-sm", muted)}>الإجمالي لمدة {months(term)}</span>
          <b className="font-heading text-2xl tabular-nums" aria-live="polite">
            {fmt(p.monthly * term)} ر.س
          </b>
        </div>
        {p.months.length > 1 && (
          <ToggleGroup
            type="single"
            spacing={1}
            value={String(term)}
            onValueChange={(v) => v && setTerm(Number(v))}
            className="rounded-full bg-card p-1"
            aria-label="مدة الباقة"
          >
            {p.months.map((m) => (
              <ToggleGroupItem
                key={m}
                value={String(m)}
                className="h-10 rounded-full px-4 font-semibold data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {months(m)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </CardFooter>
    </Card>
  )
}
