"use client"

import { useRef, useState } from "react"
import { CHANGES, HERO_PC, SHELF, STEPS, type Change } from "@/data/flow"
import { flowImg } from "@/lib/asset"
import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import { Card } from "@/components/shadcn/card"
import { Label } from "@/components/shadcn/label"
import { Switch } from "@/components/shadcn/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group"
import { Cart } from "./Cart"
import { Checkout } from "./Checkout"
import { Header } from "./Header"
import { Home } from "./Home"
import { Product } from "./Product"
import type { Flow, Fulfil } from "./parts"

const TONE: Record<Change["tone"], string> = {
  bad: "bg-[var(--bad-soft)] text-bad",
  warn: "bg-[var(--warn-soft)] text-[var(--warn)]",
  gold: "bg-accent text-accent-foreground",
}

const motion = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth")

/**
 * The purchase flow as four linked screens. Each has the site as it is today ("before") and the concept
 * ("after"); the gold numbers on the concept match the change list under it.
 */
export function FlowConcept() {
  const [step, setStep] = useState(0)
  const [view, setView] = useState("after")
  const [pins, setPins] = useState(true)
  const [qty, setQty] = useState<Record<string, number>>({})
  const [fulfil, setFulfil] = useState<Fulfil>("ship")
  const [bump, setBump] = useState(0)
  const frame = useRef<HTMLDivElement>(null)
  const mock = useRef<HTMLDivElement>(null)

  const inCart = SHELF.filter((p) => (qty[p.id] ?? 0) > 0)
  const count = inCart.reduce((s, p) => s + qty[p.id], 0)
  const total = inCart.reduce((s, p) => s + qty[p.id] * p.now, 0)
  const saved = inCart.reduce((s, p) => s + qty[p.id] * (p.was - p.now), 0)

  const show = (n: number) => {
    // the cart and checkout need something in the cart to show their designed state
    if (n >= 2) setQty((q) => (Object.values(q).some(Boolean) ? q : { [HERO_PC.id]: 1 }))
    setStep(n)
  }
  const f: Flow = {
    qty,
    count,
    total,
    saved,
    bump,
    fulfil,
    setFulfil,
    add: (id, d) => {
      setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }))
      if (d > 0) setBump((b) => b + 1)
    },
    go: (n) => {
      show(n)
      requestAnimationFrame(() => {
        const el = frame.current
        if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start", behavior: motion() })
      })
    },
    reset: () => {
      setQty({})
      setStep(0)
    },
  }
  const showPin = (n: number) => {
    setView("after")
    requestAnimationFrame(() => {
      const el = mock.current?.querySelector<HTMLElement>(`[data-pin="${n}"]`)
      if (!el) return
      el.scrollIntoView({ block: "center", inline: "nearest", behavior: motion() })
      el.classList.remove("flash")
      void el.offsetWidth
      el.classList.add("flash")
    })
  }

  const s = STEPS[step]
  const changes = CHANGES[s.key]
  return (
    <Tabs value={String(step)} onValueChange={(v) => show(Number(v))}>
      <div className="fl-bar reveal">
        <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto" aria-label="خطوات الشراء">
          {STEPS.map((t, i) => (
            <TabsTrigger
              key={t.key}
              value={String(i)}
              className="h-12 flex-none gap-2 rounded-full border border-border bg-card ps-2 pe-[18px] text-[0.95rem] font-semibold text-foreground hover:border-gold data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground"
            >
              <b className="grid size-8 place-items-center rounded-full bg-muted font-heading text-[0.9rem] in-data-[state=active]:bg-white/15 in-data-[state=active]:text-[var(--sel-accent)]">
                {i + 1}
              </b>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="fl-tools">
          <ToggleGroup
            type="single"
            spacing={1}
            value={view}
            onValueChange={(v) => v && setView(v)}
            className="rounded-full bg-muted p-1"
            aria-label="قبل وبعد"
          >
            <ToggleGroupItem value="before" className="h-10 rounded-full px-4 font-semibold data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-sm">
              قبل: الموقع اليوم
            </ToggleGroupItem>
            <ToggleGroupItem value="after" className="h-10 rounded-full px-4 font-semibold data-[state=on]:bg-card data-[state=on]:text-foreground data-[state=on]:shadow-sm">
              بعد: التصور
            </ToggleGroupItem>
          </ToggleGroup>
          {view === "after" && (
            <div className="flex items-center gap-2">
              <Switch id="fl-pins" checked={pins} onCheckedChange={setPins} className="data-[state=checked]:bg-primary" />
              <Label htmlFor="fl-pins" className="text-[0.9rem] font-semibold">
                أرقام التغييرات
              </Label>
            </div>
          )}
        </div>
      </div>

      <TabsContent value={String(step)} className="mt-0">
        <Card ref={frame} className="fl-frame reveal gap-0 py-2">
          <div className="fl-chrome" aria-hidden="true">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="url" dir="ltr">
              {s.url}
            </span>
          </div>
          <div className="fl-screen">
            {view === "before" ? (
              <figure key={`b${step}`} className="fl-before">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flowImg(s.before)} alt={`${s.beforeAlt}، لقطة يوم 22 أكتوبر 2026`} width={s.w} height={s.h} style={{ maxWidth: s.w }} />
                <figcaption>{s.beforeNote}</figcaption>
              </figure>
            ) : (
              <div
                key={`a${step}`}
                ref={mock}
                className={pins ? "wm wm-tokens" : "wm wm-tokens no-pins"}
                role="region"
                aria-label={`تصور ${s.label}`}
              >
                {step < 3 && <Header f={f} pins={step === 0} />}
                {step === 0 && <Home f={f} />}
                {step === 1 && <Product f={f} />}
                {step === 2 && <Cart f={f} />}
                {step === 3 && <Checkout f={f} />}
              </div>
            )}
          </div>
        </Card>
      </TabsContent>

      <section className="sec fl-changes" aria-labelledby="fl-changes-h">
        <div className="sec-head">
          <div>
            <h2 id="fl-changes-h">ما الذي تغيّر في {s.label}</h2>
            <p>الأرقام هي نفسها على التصميم، وزر «أرني» ينقلكم إلى مكان التغيير.</p>
          </div>
        </div>
        <Card className="reveal gap-0 p-[22px]">
          <div className="fl-change head" aria-hidden="true">
            <span>#</span>
            <span>الموقع اليوم</span>
            <span>في التصور</span>
            <span>يحل</span>
          </div>
          {changes.map((c) => (
            <div className="fl-change" key={`${s.key}-${c.pin}`}>
              <span className="no">{c.pin}</span>
              <span className="was">
                <span className="topic">{c.title}</span>
                <span className="lab">الموقع اليوم</span>
                {c.was}
              </span>
              <span>
                <span className="lab">في التصور</span>
                {c.now}
              </span>
              <span className="solves">
                <Badge className={`rounded-full border-0 px-2.5 font-semibold ${TONE[c.tone]}`}>{c.fix}</Badge>
                <Button variant="outline" className="h-11 rounded-full px-[18px] font-semibold shadow-none hover:border-gold" onClick={() => showPin(c.pin)}>
                  أرني
                </Button>
              </span>
            </div>
          ))}
        </Card>
      </section>
    </Tabs>
  )
}
