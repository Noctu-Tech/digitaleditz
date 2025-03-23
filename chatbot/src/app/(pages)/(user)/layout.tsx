// app/[userId]/layout.tsx
import React from 'react'
import SideBar from '@/app/ui/components/SideBar';
import Appbar from '@/app/ui/components/Appbar';
import Footer from '@/app/ui/components/Footer';
export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const  userId ="John123"
  return (  
    <div className="min-h-screen w-full overflow-hidden flex flex-col gap-3 relative">
      <Appbar data={{name:"JohnDoe",uuid:"something here"}} />
      <div className="flex flex-row gap-3 flex-1 relative">
        <aside className="flex-shrink-0 relative  w-fit h-full">
          <SideBar 
            user={{ username: userId,pfp:"https://picsum.photos/200",subscription:"Premium" }}
          />
        </aside>
        
        <main className="w-full h-full flex-1 mt-2 p-6 relative ">
          
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  )
}