import { create } from "zustand"

interface DashboardStore {
  searchQuery: string
  sortBy: "feature" | "events" | "change" | "sessions" | "lastActive"
  sortOrder: "asc" | "desc"
  chartPeriod: "last_week" | "last_month" | "last_quarter"
  currentPage: number
  itemsPerPage: number
  setSearchQuery: (query: string) => void
  setSortBy: (
    sort: "feature" | "events" | "change" | "sessions" | "lastActive"
  ) => void
  setSortOrder: (order: "asc" | "desc") => void
  setChartPeriod: (period: "last_week" | "last_month" | "last_quarter") => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
  clearFilters: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  searchQuery: "",
  sortBy: "events",
  sortOrder: "desc",
  chartPeriod: "last_month",
  currentPage: 1,
  itemsPerPage: 10,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setChartPeriod: (period) => set({ chartPeriod: period }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }),
  clearFilters: () =>
    set({
      searchQuery: "",
      sortBy: "events",
      sortOrder: "desc",
      currentPage: 1,
    }),
}))
