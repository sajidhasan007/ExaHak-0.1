import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function WebsiteLayout() {
  return (
    <div className="bg-background flex min-h-screen flex-col font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
