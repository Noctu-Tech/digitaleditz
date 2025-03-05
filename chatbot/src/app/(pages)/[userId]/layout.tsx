// app/[userId]/layout.tsx
import React from 'react'
import SideBar from '@/app/ui/components/SideBar';
import Appbar from '@/app/ui/components/Appbar';
export default function UserLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <div className="flex">
        <SideBar 
          links={{
            home:`/dashboard`,
            chat:`/messages`,
            workflow:`/workflow`,
          }
          } 
          user={{ username: params.userId,pfp:"linkhere",subscription:"Premium" }}
        />
        <main className="flex-1 ml-[270px] p-6">
          {children}
        </main>
      </div>
    </div>
  )
}