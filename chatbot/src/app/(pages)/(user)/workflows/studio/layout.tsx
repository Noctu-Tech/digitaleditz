import { ModeToggle } from '@/components/mode-toggle'
import { Separator } from '@/components/ui/separator'
import ProtectedRoute from '@/context/ProtectedRoute'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (<ProtectedRoute>
        <div className="flex flex-col h-screen w-full">
            {children}
        {/* <footer>
          <Separator />
          <ModeToggle />
        </footer> */}

        </div>
        </ProtectedRoute>
    )
}

export default layout
