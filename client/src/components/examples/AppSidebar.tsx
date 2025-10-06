import { AppSidebar } from '../AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function AppSidebarExample() {
  return (
    <SidebarProvider>
      <div className="flex h-[400px] w-full">
        <AppSidebar />
      </div>
    </SidebarProvider>
  )
}
