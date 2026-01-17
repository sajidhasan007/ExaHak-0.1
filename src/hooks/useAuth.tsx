import { type MockUser } from "@/services/auth.service"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: MockUser | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("mock_user")
      if (stored) {
        setUser(JSON.parse(stored))
      } else {
        setUser(null)
      }
      setLoading(false)
    }

    loadUser()

    const handleAuthChange = () => {
      loadUser()
    }

    window.addEventListener("auth-change", handleAuthChange)
    return () => window.removeEventListener("auth-change", handleAuthChange)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
