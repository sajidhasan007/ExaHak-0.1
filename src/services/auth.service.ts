// Mock User Interface to replace Firebase User
export interface MockUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

const MOCK_USER: MockUser = {
  uid: "mock-user-123",
  email: "demo@example.com",
  displayName: "Demo User",
  photoURL: "https://github.com/shadcn.png",
}

export const authService = {
  async loginWithGoogle() {
    await new Promise((resolve) => setTimeout(resolve, 800))
    localStorage.setItem("mock_user", JSON.stringify(MOCK_USER))
    window.dispatchEvent(new Event("auth-change"))
    return MOCK_USER
  },

  async loginWithGithub() {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const user = { ...MOCK_USER, displayName: "Github User" }
    localStorage.setItem("mock_user", JSON.stringify(user))
    window.dispatchEvent(new Event("auth-change"))
    return user
  },

  async loginWithFacebook() {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const user = { ...MOCK_USER, displayName: "Facebook User" }
    localStorage.setItem("mock_user", JSON.stringify(user))
    window.dispatchEvent(new Event("auth-change"))
    return user
  },

  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    localStorage.removeItem("mock_user")
    window.dispatchEvent(new Event("auth-change"))
  },
}
