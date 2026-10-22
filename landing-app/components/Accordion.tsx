"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Accordion as Root, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/shadcn/accordion"

/** One numbered, collapsible block (shadcn Accordion). Other code can open it with an "acc-open" event. */
export function Accordion({ idx, title, open, id, children }: { idx: number; title: ReactNode; open?: boolean; id?: string; children: ReactNode }) {
  const [value, setValue] = useState(open ? "a" : "")
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    const show = () => setValue("a")
    el?.addEventListener("acc-open", show)
    return () => el?.removeEventListener("acc-open", show)
  }, [])
  return (
    <Root ref={ref} type="single" collapsible value={value} onValueChange={setValue} className="acc reveal" id={id}>
      <AccordionItem value="a" className="border-b-0">
        <AccordionTrigger className="min-h-14 items-center gap-3 rounded-[var(--r-md)] px-4 py-3.5 text-base font-bold hover:bg-muted">
          <span className="idx">{idx}</span>
          <span>{title}</span>
        </AccordionTrigger>
        <AccordionContent className="body pb-[18px] text-base">{children}</AccordionContent>
      </AccordionItem>
    </Root>
  )
}
