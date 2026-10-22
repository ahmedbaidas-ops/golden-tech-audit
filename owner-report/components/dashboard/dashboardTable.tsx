"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  ArrowUpDownIcon,
  Upload01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeftDoubleIcon,
  ArrowRightDoubleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons"
import { eventRows } from "@/constants"
import { useDashboardStore } from "@/store/dashboardStore"
import { cn } from "@/lib/utils"

type SortField =
  | "id"
  | "event"
  | "feature"
  | "events"
  | "sessions"
  | "change"
  | "lastActive"
type SortOrder = "asc" | "desc"

function getSortIcon(
  sortField: SortField,
  sortOrder: SortOrder,
  field: SortField
) {
  if (sortField !== field)
    return <HugeiconsIcon icon={ArrowUpDownIcon} className="size-3" />
  return sortOrder === "asc" ? (
    <HugeiconsIcon icon={ArrowUp01Icon} className="size-3" />
  ) : (
    <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
  )
}

function ChangeCell({ change }: { change: string }) {
  const isPositive = change.startsWith("+")
  const textClass = isPositive ? "text-emerald-400" : "text-red-400"

  return (
    <span className={cn("text-[13px] font-medium tabular-nums", textClass)}>
      {change}
    </span>
  )
}

export function DashboardTable() {
  const { searchQuery, setSearchQuery } = useDashboardStore()

  const [sortField, setSortField] = useState<SortField>("id")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredAndSortedData = useMemo(() => {
    const result = eventRows.filter((row) => {
      const matchesSearch =
        searchQuery === "" ||
        row.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.feature.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })

    if (sortField === "id" && sortOrder === "asc") {
      return result
    }

    result.sort((a, b) => {
      let comparison = 0
      switch (sortField) {
        case "id":
          comparison = parseInt(a.id) - parseInt(b.id)
          break
        case "event":
          comparison = a.event.localeCompare(b.event)
          break
        case "feature":
          comparison = a.feature.localeCompare(b.feature)
          break
        case "events":
          comparison = a.events - b.events
          break
        case "sessions":
          comparison = a.sessions - b.sessions
          break
        case "change":
          const aNum = parseFloat(a.change.replace("%", "").replace("+", ""))
          const bNum = parseFloat(b.change.replace("%", "").replace("+", ""))
          comparison = aNum - bNum
          break
        case "lastActive":
          const aMins = a.lastActive.includes("m")
            ? parseInt(a.lastActive.replace("m ago", ""))
            : a.lastActive.includes("h")
              ? parseInt(a.lastActive.replace("h ago", "")) * 60
              : parseInt(a.lastActive.replace("d ago", "")) * 1440
          const bMins = b.lastActive.includes("m")
            ? parseInt(b.lastActive.replace("m ago", ""))
            : b.lastActive.includes("h")
              ? parseInt(b.lastActive.replace("h ago", "")) * 60
              : parseInt(b.lastActive.replace("d ago", "")) * 1440
          comparison = aMins - bMins
          break
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    return result
  }, [searchQuery, sortField, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage, itemsPerPage])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(paginatedData.map((row) => row.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedRows([])
  }

  const handleItemsPerPageChange = (value: string | null) => {
    if (value) {
      setItemsPerPage(Number(value))
      setCurrentPage(1)
      setSelectedRows([])
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground">
      <div className="flex flex-row items-center justify-between gap-3 border-b px-4 py-2.5">
        <div className="flex h-full items-center gap-3">
          <h3 className="text-sm text-muted-foreground">Feature Activity</h3>
        </div>

        <div className="hidden items-center justify-between gap-2 sm:flex">
          <div className="items-center gap-2">
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-7 w-40 rounded-md border-border/90 pl-8 text-[13px] placeholder:text-muted-foreground dark:border-input/85"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-muted-foreground"
                >
                  <HugeiconsIcon icon={Upload01Icon} className="size-4" />
                  <span className="hidden sm:inline">Export/Import</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Import from CSV</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Feature data</DropdownMenuItem>
                <DropdownMenuItem>Usage trends</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b px-2 py-3 sm:hidden">
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full border-border/50 bg-muted/50 pl-8 text-[13px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-muted-foreground"
              >
                <HugeiconsIcon icon={Upload01Icon} className="size-4" />
                <span className="hidden sm:inline">Export/Import</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Import from CSV</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Feature data</DropdownMenuItem>
              <DropdownMenuItem>Usage trends</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-transparent">
              <TableHead className="w-40">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={
                      selectedRows.length === paginatedData.length &&
                      paginatedData.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                    className="border border-muted-foreground/20 bg-background"
                  />
                  <button
                    className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
                    onClick={() => toggleSort("id")}
                  >
                    <span>Event</span>
                    {getSortIcon(sortField, sortOrder, "id")}
                  </button>
                </div>
              </TableHead>
              <TableHead className="w-24">
                <button
                  className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("feature")}
                >
                  <span>Feature</span>
                  {getSortIcon(sortField, sortOrder, "feature")}
                </button>
              </TableHead>
              <TableHead className="w-24">
                <button
                  className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("events")}
                >
                  <span>Events</span>
                  {getSortIcon(sortField, sortOrder, "events")}
                </button>
              </TableHead>
              <TableHead className="w-24">
                <button
                  className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("sessions")}
                >
                  <span>Sessions</span>
                  {getSortIcon(sortField, sortOrder, "sessions")}
                </button>
              </TableHead>
              <TableHead className="w-20">
                <button
                  className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("change")}
                >
                  <span>Change</span>
                  {getSortIcon(sortField, sortOrder, "change")}
                </button>
              </TableHead>
              <TableHead className="w-24">
                <button
                  className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground"
                  onClick={() => toggleSort("lastActive")}
                >
                  <span>Last Active</span>
                  {getSortIcon(sortField, sortOrder, "lastActive")}
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} className="border-border/50">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onCheckedChange={() => toggleSelectRow(row.id)}
                      className="border border-muted-foreground/20 bg-background"
                    />
                    <span className="text-[13px] font-medium">{row.event}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[13px] text-muted-foreground">
                    {row.feature}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-[13px] tabular-nums">
                    {row.events.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-[13px] tabular-nums">
                    {row.sessions.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <ChangeCell change={row.change} />
                </TableCell>
                <TableCell>
                  <span className="text-[13px] whitespace-nowrap text-muted-foreground">
                    {row.lastActive}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t px-4 py-3 sm:flex-row">
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}{" "}
            of {filteredAndSortedData.length} events
          </span>
          <div className="hidden h-4 w-px bg-border sm:block" />
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="h-8 w-17.5 bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="hidden sm:inline">per page</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Button>

          <div className="mx-2 flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  className="size-8"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <HugeiconsIcon icon={ArrowRightDoubleIcon} className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
