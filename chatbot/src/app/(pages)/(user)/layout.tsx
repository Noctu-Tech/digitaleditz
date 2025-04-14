// app/[userId]/layout.tsx
'use client'
import Footer from '@/components/Footer';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/AppSideBar';
import CrumbTitle from '@/components/CrumbTitle';
import { useState } from 'react';
import NotificationBtn from '@/components/NotificationBtn';
import { DrawerDialogDemo } from '@/components/DialogVDrawer';
export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
const [collapsed,setCollapsed]=useState(false);
  return (  
    <SidebarProvider 
    open={!collapsed} onOpenChange={()=>setCollapsed(!collapsed)}>

          <AppSidebar collapsed={collapsed}/>

          <div className="min-h-screen w-full overflow-hidden flex flex-col gap-3 relative">
        <main className="w-full h-full flex-1 p-2 mt-4 relative ">
          <div className='w-full gap-3 flex'><SidebarTrigger/><CrumbTitle/><NotificationBtn/></div>       
          {children}
        </main>
        
      <div><Footer /></div>
      </div>
      
    </SidebarProvider>
  )
}