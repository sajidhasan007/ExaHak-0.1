import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { authService } from "@/services/auth.service"
import { AnimatePresence, motion } from "framer-motion"
import {
  Bell,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function DashboardLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await authService.logout()
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="bg-card hidden w-64 flex-col border-r md:flex">
        <div className="border-b px-6 py-4">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
              E
            </span>
            ExaHak-0.1
          </h2>
        </div>
        <nav className="flex-1 space-y-2 px-6 py-4">
          <SidebarNavItems />
        </nav>
        <div className="border-t px-6 py-4">
          <div className="flex items-center gap-3 px-3 py-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || ""}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="bg-muted h-8 w-8 rounded-full" />
            )}
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">
                {user?.displayName || "User Name"}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 flex h-16 items-center justify-between border-b px-4 backdrop-blur md:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="border-b p-6">
                <h2 className="text-xl font-bold">ExaHak-0.1</h2>
              </div>
              <nav className="space-y-2 p-4">
                <SidebarNavItems />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="text-muted-foreground hidden text-sm md:block">
            Welcome back,{" "}
            <span className="text-foreground font-medium">
              {user?.displayName?.split(" ")[0] || "User"}!
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.documentElement.classList.toggle("dark")}
            >
              Toggle Theme
            </Button>
            <Button
              variant="ghost"
              title="Logout"
              size="icon"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              <LogOut className="text-destructive h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

function SidebarNavItems() {
  const location = useLocation()

  return (
    <>
      {sidebarItems.map((item) => {
        const isActive = location.pathname === item.href
        return (
          <motion.div key={item.label} whileHover={{ x: 4 }}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </motion.div>
        )
      })}
    </>
  )
}
