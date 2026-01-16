import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authService } from "@/services/auth.service"
import { Chrome, Facebook, Github } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/dashboard"

  const handleLogin = async (method: "google" | "github" | "facebook") => {
    try {
      if (method === "google") await authService.loginWithGoogle()
      if (method === "github") await authService.loginWithGithub()
      if (method === "facebook") await authService.loginWithFacebook()

      navigate(from, { replace: true })
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Card className="mx-4 w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight italic">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Choose your preferred login method to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="h-11 w-full"
            onClick={() => handleLogin("google")}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full"
            onClick={() => handleLogin("github")}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            className="h-11 w-full"
            onClick={() => handleLogin("facebook")}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Continue with Facebook
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                Secure Authentication
              </span>
            </div>
          </div>

          <p className="text-muted-foreground px-8 text-center text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
