import { DashboardHeader } from "@/components/dashboard/dashboardHeader"
import { DashboardSidebar } from "@/components/layout/sidebarDashboard"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider className="bg-(--paper)">
      <DashboardSidebar side="right" />
      <div className="h-svh w-full overflow-hidden">
        <div className="flex h-full w-full flex-col justify-start overflow-hidden bg-(--paper)">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
