"use client"
import * as React from "react"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"
import { cn } from "@/lib/utils"

const SIZES = [
  { value: "md", label: "عادي", cls: "sm:text-[0.9rem]" },
  { value: "lg", label: "كبير", cls: "sm:text-[1rem]" },
  { value: "xl", label: "أكبر", cls: "sm:text-[1.15rem]" },
] as const
type Size = (typeof SIZES)[number]["value"]

export function DashboardHeader() {
  const { isMobile, state } = useSidebar()
  const [size, setSize] = React.useState<Size>("md")

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("report-text-size")
      if (saved === "lg" || saved === "xl") setSize(saved)
    } catch {}
  }, [])

  React.useEffect(() => {
    document.documentElement.dataset.size = size
    try {
      localStorage.setItem("report-text-size", size)
    } catch {}
  }, [size])

  return (
    <header className="relative z-10 flex w-full items-center justify-between gap-3 border-b border-(--line) bg-(--paper) px-4 py-2.5 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {(isMobile || state === "collapsed") && (
          <SidebarTrigger variant="outline" size="icon" className="size-11" />
        )}
        <p className="hidden min-w-0 truncate text-base leading-tight sm:block">
          <span className="font-semibold">تقرير تجربة الزبون</span>
          <span data-where className="text-(--ink-muted)"> · الخلاصة</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2" role="group" aria-label="حجم الخط">
        <span className="hidden text-[0.95rem] text-(--ink-muted) md:inline">حجم الخط</span>
        <div className="flex rounded-xl bg-(--sunken) p-1 ring-1 ring-(--line)">
          {SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              data-size-btn={s.value}
              aria-pressed={size === s.value}
              aria-label={`حجم الخط: ${s.label}`}
              onClick={() => setSize(s.value)}
              className={cn(
                "grid h-11 min-w-12 cursor-pointer place-items-center rounded-lg px-2.5 text-[16px] font-semibold sm:h-10 text-(--ink-muted) aria-pressed:bg-(--surface) aria-pressed:text-(--gold-ink) aria-pressed:shadow-(--shadow-card) aria-pressed:ring-1 aria-pressed:ring-(--gold)/40",
                s.cls
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <span data-progress aria-hidden="true" className="absolute inset-x-0 -bottom-px h-[3px] origin-right scale-x-0 bg-(--gold)" />
    </header>
  )
}
