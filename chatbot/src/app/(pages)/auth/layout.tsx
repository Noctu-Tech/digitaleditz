import React from "react"
import { ModeToggle } from "@/components/mode-toggle"
import Footer from "@/app/ui/components/Footer"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen w-full bg-background">
      {/* Add mode toggle in top-right corner */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="container min-h-screen flex items-center justify-center py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full max-w-6xl bg-card rounded-lg p-4 shadow-lg">
          {/* Left side - Welcome message */}
          <div className="hidden md:flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Join us and get your business running
            </h1>
            <p className="text-muted-foreground">
              Create an account and start managing your business today.
            </p>
          </div>
          
          {/* Right side - Auth form */}
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}