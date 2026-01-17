import { ProtectedRoute } from "@/components/ProtectedRoute"
import DashboardLayout from "@/layouts/DashboardLayout"
import WebsiteLayout from "@/layouts/WebsiteLayout"
import Dashboard from "@/pages/Dashboard"
import Login from "@/pages/Login"
import ModelDetailsPage from "@/pages/ModelDetailsPage"
import ModelsPage from "@/pages/ModelsPage"
import MyModelsPage from "@/pages/MyModelsPage"
import PricingPage from "@/pages/PricingPage"
import ProfilePage from "@/pages/Profile"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <ModelsPage />, // using ModelsPage as Home/Landing as requested
      },
      {
        path: "models",
        element: <ModelsPage />,
      },
      {
        path: "models/:id",
        element: <ModelDetailsPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "my-models",
        element: (
          <ProtectedRoute>
            <MyModelsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "notifications",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "settings",
        element: <Dashboard />,
      },
    ],
  },
])
