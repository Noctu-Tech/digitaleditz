import ProtectedRoute from '@/context/ProtectedRoute'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (<ProtectedRoute>
        <div className="flex flex-col h-screen w-full">
            {children}
        </div>
        </ProtectedRoute>
    )
}

export default layout
