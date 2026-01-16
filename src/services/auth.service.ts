import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "@/lib/firebase"
import { signInWithPopup, signOut } from "firebase/auth"

export const authService = {
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error) {
      console.error("Google Login Error:", error)
      throw error
    }
  },

  async loginWithGithub() {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      return result.user
    } catch (error) {
      console.error("Github Login Error:", error)
      throw error
    }
  },

  async loginWithFacebook() {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      return result.user
    } catch (error) {
      console.error("Facebook Login Error:", error)
      throw error
    }
  },

  async logout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Logout Error:", error)
      throw error
    }
  },
}
