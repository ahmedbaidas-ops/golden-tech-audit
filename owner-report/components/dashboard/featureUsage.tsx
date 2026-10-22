"use client"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { channels, segments } from "@/constants"

export function FeatureUsage() {
  const total = 8420

  return (
    <div className="w-full shrink-0 overflow-hidden p-4 text-card-foreground lg:w-83">
      <div className="mb-4 flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-sm text-muted-foreground">Feature Usage</h3>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" className="size-7">
                  <HugeiconsIcon
                    icon={MoreHorizontalIcon}
                    className="size-4 text-muted-foreground/80"
                  />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-20">
              <DropdownMenuItem>View report</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-medium tracking-tight tabular-nums">
            {total.toLocaleString()}
          </span>
          <span className="mb-0.75 text-[13px] tracking-wide text-muted-foreground">
            events
          </span>
        </div>
      </div>

      <div className="flex h-3 w-full divide-x divide-card overflow-hidden rounded-[3px]">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={cn("relative h-full overflow-hidden", seg.color)}
            style={{ width: `${seg.value}%` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_4px,transparent_4px,transparent_8px)]" />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={cn("h-2 w-2 rounded-xs", seg.color)} />
            <span className="text-xs font-medium text-muted-foreground">
              {seg.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="text-left font-normal">Feature</th>
              <th className="text-left font-normal">Events</th>
              <th className="text-right font-normal">Change</th>
            </tr>
          </thead>

          <tbody>
            {channels.map((ch, i) => (
              <tr key={i} className="h-9">
                <td className="text-primary/90">{ch.name}</td>

                <td className="text-left text-muted-foreground tabular-nums">
                  {ch.value}
                </td>

                <td
                  className={cn(
                    "text-right text-xs font-medium tabular-nums",
                    ch.positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {ch.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
