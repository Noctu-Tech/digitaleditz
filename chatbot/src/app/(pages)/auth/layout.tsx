import React from "react"
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="h-screen w-screen">{children}</section>
  }