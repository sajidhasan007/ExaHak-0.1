export interface Profile {
  id: string
  name: string
  email: string
  role: string
  bio?: string
  avatarUrl?: string
  createdAt?: string
}

export interface CreateProfileDto {
  name: string
  email: string
  role: string
  bio?: string
}

export interface UpdateProfileDto extends Partial<CreateProfileDto> {}

const MOCK_PROFILES: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    bio: "System administrator",
    avatarUrl: "https://github.com/shadcn.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Developer",
    bio: "Frontend engineer",
    createdAt: new Date().toISOString(),
  },
]

export const getProfiles = async (): Promise<Profile[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return [...MOCK_PROFILES]
}

export const getProfileById = async (id: string): Promise<Profile> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const profile = MOCK_PROFILES.find((p) => p.id === id)
  if (!profile) throw new Error("Profile not found")
  return profile
}

export const createProfile = async (
  data: CreateProfileDto
): Promise<Profile> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const newProfile: Profile = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    createdAt: new Date().toISOString(),
  }
  MOCK_PROFILES.push(newProfile)
  return newProfile
}

export const updateProfile = async (
  id: string,
  data: UpdateProfileDto
): Promise<Profile> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = MOCK_PROFILES.findIndex((p) => p.id === id)
  if (index === -1) throw new Error("Profile not found")

  MOCK_PROFILES[index] = { ...MOCK_PROFILES[index], ...data }
  return MOCK_PROFILES[index]
}

export const deleteProfile = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = MOCK_PROFILES.findIndex((p) => p.id === id)
  if (index !== -1) {
    MOCK_PROFILES.splice(index, 1)
  }
}
