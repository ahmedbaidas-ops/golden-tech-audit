"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { useTheme } from "next-themes"
import { fullYearData } from "@/constants"

type ChartType = "line" | "area" | "bar"
type Period = "3m" | "6m" | "12m"

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: { month: string; week: number; value: number }
  }>
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const currentYear = 2025

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0]
    const weekIndex = data.payload.week - 1
    const monthIndex = Math.floor(weekIndex / 4)
    const monthName = monthNames[monthIndex] || "April"

    const prevIndex =
      fullYearData.findIndex((d) => d.week === data.payload.week) - 1
    const prevValue =
      prevIndex >= 0 ? fullYearData[prevIndex].value : data.value
    const change =
      prevValue > 0
        ? (((data.value - prevValue) / prevValue) * 100).toFixed(1)
        : "0"
    const isPositive = Number(change) >= 0

    return (
      <div className="rounded-md border bg-card p-2">
        <p className="text-xs text-muted-foreground">
          {monthName}, {currentYear}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold">{data.value}</span>
          <span
            className={`flex items-center gap-0.5 text-xs tabular-nums ${
              isPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            <HugeiconsIcon
              icon={isPositive ? ArrowUp01Icon : ArrowDown01Icon}
              className="size-3"
            />
            {Math.abs(Number(change))}%
          </span>
        </div>
      </div>
    )
  }
  return null
}

export function DashboardChart() {
  const { theme } = useTheme()
  const [chartType, setChartType] = useState<ChartType>("area")
  const [period, setPeriod] = useState<Period>("12m")
  const [showGrid, setShowGrid] = useState(true)
  const [smoothCurve, setSmoothCurve] = useState(true)

  const axisColor = theme === "dark" ? "#606060" : "#a1a1a1"
  const gridColor = "rgba(115, 115, 115, 0.25)"

  const colors = {
    primary: "#f97316",
    primaryLight: "#fb923c",
  }

  const lineColor = colors.primary

  const getDataForTimePeriod = () => {
    switch (period) {
      case "3m":
        return fullYearData.slice(-12)
      case "6m":
        return fullYearData.slice(-24)
      case "12m":
      default:
        return fullYearData
    }
  }

  const data = getDataForTimePeriod()

  const resetToDefault = () => {
    setChartType("area")
    setPeriod("12m")
    setShowGrid(true)
    setSmoothCurve(true)
  }

  return (
    <div className="flex-1 text-card-foreground">
      <div className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm text-muted-foreground">Activity Over Time</h3>
        </div>
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
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Chart Type</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setChartType("line")}>
                  Line Chart {chartType === "line" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType("area")}>
                  Area Chart {chartType === "area" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChartType("bar")}>
                  Bar Chart {chartType === "bar" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Time Period</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setPeriod("3m")}>
                  Last 3 Months {period === "3m" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPeriod("6m")}>
                  Last 6 Months {period === "6m" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPeriod("12m")}>
                  Last 12 Months {period === "12m" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
            >
              Show Grid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={smoothCurve}
              onCheckedChange={setSmoothCurve}
              disabled={chartType === "bar"}
            >
              Smooth Curve
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetToDefault}>
              Reset to Default
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-3 pb-5">
        <div className="h-50 w-full sm:h-62.5">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart
                data={data}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                {showGrid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                )}
                <XAxis
                  dataKey="week"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: axisColor }}
                  tickFormatter={(week, index) => {
                    if (index === 0) return ""
                    const current = data.find((d) => d.week === week)
                    const prev = data.find((d) => d.week === week - 1)

                    if (!current) return ""

                    return current.month !== prev?.month ? current.month : ""
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, "auto"]}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(115, 115, 115, 0.2)" }}
                />
                <defs>
                  <linearGradient
                    id="leadBarGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={colors.primary} />
                    <stop offset="100%" stopColor={colors.primaryLight} />
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="value"
                  fill="url(#leadBarGradient)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : chartType === "area" ? (
              <AreaChart
                data={data}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                {showGrid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                )}
                <XAxis
                  dataKey="week"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: axisColor }}
                  tickFormatter={(week, index) => {
                    if (index === 0) return ""
                    const current = data.find((d) => d.week === week)
                    const prev = data.find((d) => d.week === week - 1)

                    if (!current) return ""

                    return current.month !== prev?.month ? current.month : ""
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, "auto"]}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "rgba(115,115,115,0.3)",
                    strokeWidth: 1,
                  }}
                />
                <defs>
                  <linearGradient
                    id="leadAreaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={colors.primary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor={colors.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  fill="url(#leadAreaGradient)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: lineColor,
                    stroke: "var(--secondary)",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            ) : (
              <LineChart
                data={data}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                {showGrid && (
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColor}
                    vertical={false}
                  />
                )}
                <XAxis
                  dataKey="week"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: axisColor }}
                  tickFormatter={(week, index) => {
                    if (index === 0) return ""
                    const current = data.find((d) => d.week === week)
                    const prev = data.find((d) => d.week === week - 1)

                    if (!current) return ""

                    return current.month !== prev?.month ? current.month : ""
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: axisColor }}
                  domain={[0, "auto"]}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "rgba(115,115,115,0.3)",
                    strokeWidth: 1,
                  }}
                />
                <Line
                  type={smoothCurve ? "monotone" : "linear"}
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: lineColor,
                    stroke: "var(--secondary",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
