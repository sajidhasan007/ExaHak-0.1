import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/sonner"
import { AnimatePresence, motion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"

export default function WebsiteLayout() {
  const location = useLocation()

  return (
    <div className="bg-background flex min-h-screen flex-col font-sans antialiased">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
