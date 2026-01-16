import { auth } from "@/lib/firebase"
import axios, { type InternalAxiosRequestConfig } from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Request Interceptor: Attach Auth Token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g. logout user)
      auth.signOut()
    }
    return Promise.reject(error)
  }
)

export default api
