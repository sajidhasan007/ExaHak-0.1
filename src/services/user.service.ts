import api from "./api"

export interface UserProfile {
  id: string
  email: string
  displayName: string
  photoURL?: string
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get("/user/profile")
    return response.data
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.patch("/user/profile", data)
    return response.data
  },
}
