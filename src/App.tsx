import { AuthProvider } from "@/hooks/useAuth"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { router } from "./routes"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
