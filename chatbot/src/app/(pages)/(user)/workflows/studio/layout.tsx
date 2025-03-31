import { ModeToggle } from '@/components/mode-toggle'
import { Separator } from '@/components/ui/separator'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen w-full">
            {children}
        {/* <footer>
          <Separator />
          <ModeToggle />
        </footer> */}

        </div>
    )
}

export default layout
