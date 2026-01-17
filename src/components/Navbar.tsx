import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { authService } from "@/services/auth.service"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await authService.logout()
      navigate("/login")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="from-primary bg-linear-to-r to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                ExaHack.AI
              </span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <Link
                to="/models"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
              >
                Models
              </Link>
              <Link
                to="/pricing"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL || ""}
                        alt={user.displayName || ""}
                      />
                      <AvatarFallback>
                        {user.displayName?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {user.displayName}
                      </p>
                      <p className="text-muted-foreground text-xs leading-none">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/my-models")}>
                    My Models
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Get Started
                </Button>
              </div>
            )}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
