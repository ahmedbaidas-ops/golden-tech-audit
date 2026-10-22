import { DashboardHeader } from "@/components/dashboard/dashboardHeader"
import { DashboardSidebar } from "@/components/layout/sidebarDashboard"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider className="bg-sidebar">
      <DashboardSidebar side="right" />
      <div className="h-svh w-full overflow-hidden lg:p-2">
        <div className="flex h-full w-full flex-col justify-start overflow-hidden bg-background lg:rounded-md lg:border">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
