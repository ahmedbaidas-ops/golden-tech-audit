import { cn } from "@/lib/utils"
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { statsData } from "@/constants"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 divide-x-0 divide-y divide-border rounded-lg border bg-card sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
      {statsData.map((item, i) => {
        const isUp = item.trend === "up"

        return (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-3 p-4",
              i == 0 &&
                "border-r-0 border-b sm:border-r sm:border-b lg:border-r lg:border-b-0",
              i == 1 && "border-b sm:border-b lg:border-b-0",
              i == 2 && "border-r-0 sm:border-r lg:border-r"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] tracking-wide text-muted-foreground">
                {item.title}
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-7">
                      <HugeiconsIcon
                        icon={MoreHorizontalIcon}
                        className="size-4 text-muted-foreground/80"
                      />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-20">
                  <DropdownMenuItem>View details</DropdownMenuItem>

                  <DropdownMenuItem>Compare trend</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-2xl font-medium tracking-tight tabular-nums">
                {item.value}
              </span>

              <div className="flex items-center gap-1">
                {isUp ? (
                  <FaCaretUp className="size-3 fill-emerald-600 dark:fill-emerald-400" />
                ) : (
                  <FaCaretDown className="size-3 fill-rose-600 dark:fill-rose-400" />
                )}

                <p
                  className={cn(
                    "text-xs font-medium",
                    isUp
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  <span className="tabular-nums">{item.change} </span>
                  <span className="text-muted-foreground">vs last month</span>
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
