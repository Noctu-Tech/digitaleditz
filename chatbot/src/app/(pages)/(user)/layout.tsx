// app/[userId]/layout.tsx

import Footer from '@/app/ui/components/Footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {AppSidebar} from '@/app/ui/components/AppSideBar';
import CrumbTitle from '@/app/ui/components/CrumbTitle';
export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <SidebarProvider>

          <AppSidebar/>

          <div className="min-h-screen w-full overflow-hidden flex flex-col gap-3 relative">
        <main className="w-full h-full flex-1 p-2 mt-4 relative ">
          <div className='w-full gap-3 flex'><SidebarTrigger/><CrumbTitle/></div>       
          {children}
        </main>
        
      <div><Footer /></div>
      </div>
      
    </SidebarProvider>
  )
}