"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  ThumbsUpIcon,
  Alert02Icon,
  Note01Icon,
  Route01Icon,
  UserGroupIcon,
  Calendar03Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { report } from "@/constants/audit"

export const sections = [
  { id: "summary", name: "الملخص", icon: DashboardSquare01Icon },
  { id: "strengths", name: "ما يعمل جيداً", icon: ThumbsUpIcon },
  { id: "problems", name: "أهم 8 ملاحظات", icon: Alert02Icon },
  { id: "notes", name: "ملاحظات سريعة", icon: Note01Icon },
  { id: "journey", name: "رحلة الزبون", icon: Route01Icon },
  { id: "competitors", name: "مقارنة بالمنافسين", icon: UserGroupIcon },
  { id: "plan", name: "خطة العمل", icon: Calendar03Icon },
  { id: "method", name: "كيف أعددنا التقرير", icon: InformationCircleIcon },
]

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [active, setActive] = React.useState("summary")
  const { isMobile, setOpenMobile } = useSidebar()

  React.useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]
    const root = document.getElementById("report-scroll")
    if (!els.length || !root) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { root, rootMargin: "0px 0px -60% 0px", threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(id)
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-3 pt-4 pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-md bg-(--gold) text-lg font-bold text-white">
              ذ
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold text-neutral-900">
                {report.store}
              </span>
              <span className="text-sm text-muted-foreground">تقرير تجربة الزبون</span>
            </div>
          </div>
          {!isMobile && <SidebarTrigger className="cursor-pointer" />}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1">
              {sections.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    onClick={() => go(item.id)}
                    className="min-h-12 cursor-pointer gap-3 text-start text-base data-active:font-semibold"
                  >
                    <HugeiconsIcon icon={item.icon} className="size-5!" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 pb-4">
        <div className="rounded-md border bg-background p-3 text-sm leading-relaxed text-muted-foreground">
          أُعدّ بواسطة
          <span className="block font-semibold text-foreground" dir="ltr">
            {report.preparedBy}
          </span>
          {report.date}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
