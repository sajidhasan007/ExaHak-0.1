import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <div className="bg-background min-h-screen font-sans antialiased">
      <main className="relative flex min-h-screen flex-col">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
