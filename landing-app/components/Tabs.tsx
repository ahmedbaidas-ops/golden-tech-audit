"use client"

import { useState, type ReactNode } from "react"
import { Tabs as TabsRoot, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"

type TabsProps = { labels: ReactNode[]; value: number; onChange: (i: number) => void; label?: string }

// shadcn Tabs in the site's pill style: navy selection (gold in dark mode), wraps on narrow screens
const LIST =
  "tabs h-auto group-data-[orientation=horizontal]/tabs:h-auto max-w-full justify-start gap-0.5 overflow-x-auto rounded-full bg-muted p-1 align-middle [scrollbar-width:none] max-[520px]:flex-wrap max-[520px]:rounded-[22px]"
const TRIGGER =
  "tab h-auto min-h-11 flex-none gap-2 rounded-full border-0 px-4 py-1.5 text-base font-semibold text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-[0_6px_14px_-8px_rgb(11_21_51/.55)] dark:text-muted-foreground dark:data-[state=active]:border-0 dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground has-[.logo]:ps-1.5"

/** Segmented tabs on shadcn/Radix: arrow keys follow the reading direction, focus is roving. */
export function Tabs({ labels, value, onChange, label }: TabsProps) {
  return (
    <TabsRoot value={String(value)} onValueChange={(v) => onChange(Number(v))} className="contents">
      <TabsList className={LIST} aria-label={label}>
        {labels.map((l, i) => (
          <TabsTrigger key={i} value={String(i)} className={TRIGGER}>
            {l}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabsRoot>
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
    <TabsRoot value={String(i)} onValueChange={(v) => setI(Number(v))} className="contents">
      <TabsList className={LIST} aria-label={label}>
        {labels.map((l, j) => (
          <TabsTrigger key={j} value={String(j)} className={TRIGGER}>
            {l}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent key={i} value={String(i)} className={className}>
        {render(i)}
      </TabsContent>
    </TabsRoot>
  )
}
