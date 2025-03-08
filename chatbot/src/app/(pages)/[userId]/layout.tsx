// app/[userId]/layout.tsx
import React from 'react'
import SideBar from '@/app/ui/components/SideBar';
import Appbar from '@/app/ui/components/Appbar';
import { GridPattern } from '@/components/magicui/grid-pattern';
export default async function UserLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const { userId}=await params
  return (  
    <div className="min-h-screen w-full overflow-hidden flex flex-col gap-3 relative">
      <Appbar />
      <div className="flex gap-3 relative">
        <div className='h-full border-2 border-green-600'><SideBar 
          user={{ username: userId,pfp:"linkhere",subscription:"Premium" }}
        /></div>
        <main className="flex-1 mt-2 h-full w-full border-2 border-black p-6">
          <GridPattern width={80} height={80}>
        {children}
        </GridPattern>
        </main>
      </div>
    </div>
  )
}