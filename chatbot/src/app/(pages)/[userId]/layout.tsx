// app/[userId]/layout.tsx
import React from 'react'
import SideBar from '@/app/ui/components/SideBar';
import Appbar from '@/app/ui/components/Appbar';
export default async function UserLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const {userId}=await params
  return (  
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="flex">
        <SideBar 
          user={{ username: userId,pfp:"linkhere",subscription:"Premium" }}
        />
        <main className="flex-1 ml-[270px] p-6">
          {children}
        </main>
      </div>
    </div>
  )
}