export interface UserProfile {
  id: string
  email: string
  displayName: string
  photoURL?: string
}

const MOCK_USER_PROFILE: UserProfile = {
  id: "mock-user-123",
  email: "demo@example.com",
  displayName: "Demo User",
  photoURL: "https://github.com/shadcn.png",
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_USER_PROFILE
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { ...MOCK_USER_PROFILE, ...data }
  },

  async saveUser(user: Partial<UserProfile>): Promise<void> {
    console.log("Mock saving user to backend:", user)
    await new Promise((resolve) => setTimeout(resolve, 500))
  },
}
