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
  useSidebar,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSpeed02Icon,
  ThumbsUpIcon,
  Alert02Icon,
  Target02Icon,
  FileSearchIcon,
} from "@hugeicons/core-free-icons"
import { report } from "@/constants/audit"

// يجب أن تطابق الأسماء عناوين الأقسام في الصفحة، ويقرأها report.js بنفس الترتيب
export const sections = [
  { id: "summary", name: "الخلاصة", icon: DashboardSpeed02Icon },
  { id: "strengths", name: "نقاط القوة", icon: ThumbsUpIcon },
  { id: "problems", name: "أهم 8 أمور للإصلاح", icon: Alert02Icon },
  { id: "plan", name: "خطة العمل", icon: Target02Icon },
  { id: "details", name: "التفاصيل والمصادر", icon: FileSearchIcon },
]

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [active, setActive] = React.useState("summary")
  const { isMobile, setOpenMobile } = useSidebar()

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(id)
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-(--navy) text-xl font-bold text-(--on-navy-gold)">
            ذ
          </div>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="text-lg font-bold text-(--ink)">{report.store}</span>
            <span className="text-[0.95rem] text-(--ink-muted)">تقرير تجربة الزبون</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-1.5">
              {sections.map((item, i) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    onClick={() => go(item.id)}
                    className="nav-btn h-auto min-h-13 cursor-pointer gap-3 rounded-xl px-3 py-2 text-start text-[1.02rem] text-(--ink) hover:bg-(--surface) data-active:bg-(--navy) data-active:font-semibold data-active:text-(--on-navy) data-active:hover:bg-(--navy) data-active:hover:text-(--on-navy) [&>span:last-child]:whitespace-normal"
                  >
                    <span className="nav-num grid size-7 shrink-0 place-items-center rounded-full bg-(--surface) text-[0.9rem] font-bold text-(--gold-ink) tabular-nums ring-1 ring-(--line)">
                      {i + 1}
                    </span>
                    <HugeiconsIcon icon={item.icon} strokeWidth={1.8} aria-hidden="true" className="size-5!" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-5 pb-5">
        <p className="text-[0.95rem] leading-relaxed text-(--ink-muted)">
          إعداد <bdi className="font-semibold text-(--ink)">{report.preparedBy}</bdi>
          <br />
          {report.date}
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
