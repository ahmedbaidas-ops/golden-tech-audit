"use client"
import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon, MinusSignIcon } from "@hugeicons/core-free-icons"
import { Button } from "../ui/button"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"
import { report } from "@/constants/audit"

const SIZES = ["md", "lg", "xl"] as const

export function DashboardHeader() {
  const { isMobile, state } = useSidebar()
  const [size, setSize] = React.useState<(typeof SIZES)[number]>("md")

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

  const step = (d: number) => {
    const i = Math.min(SIZES.length - 1, Math.max(0, SIZES.indexOf(size) + d))
    setSize(SIZES[i])
  }

  return (
    <header className="sticky top-0 z-10 flex w-full flex-wrap items-center justify-between gap-3 border-b bg-background px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {(isMobile || state === "collapsed") && (
          <SidebarTrigger variant="outline" size="icon" className="size-10" />
        )}
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-lg font-semibold">
            تقرير تجربة الزبون
            <span className="hidden sm:inline"> في موقع {report.store}</span>
          </span>
          <span className="text-sm text-muted-foreground">
            <span dir="ltr">{report.site}</span> · {report.date}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2" role="group" aria-label="حجم الخط">
        <span className="text-sm text-muted-foreground">حجم الخط</span>
        <Button
          variant="outline"
          size="icon"
          className="size-10"
          onClick={() => step(-1)}
          disabled={size === "md"}
          aria-label="تصغير الخط"
        >
          <HugeiconsIcon icon={MinusSignIcon} className="size-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-10"
          onClick={() => step(1)}
          disabled={size === "xl"}
          aria-label="تكبير الخط"
        >
          <HugeiconsIcon icon={PlusSignIcon} className="size-5" />
        </Button>
      </div>
    </header>
  )
}
