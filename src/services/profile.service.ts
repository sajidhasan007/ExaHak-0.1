import api from "./api"

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

export const getProfiles = async (): Promise<Profile[]> => {
  const response = await api.get<Profile[]>("/profile")
  return response.data
}

export const getProfileById = async (id: string): Promise<Profile> => {
  const response = await api.get<Profile>(`/profile/${id}`)
  return response.data
}

export const createProfile = async (
  data: CreateProfileDto
): Promise<Profile> => {
  const response = await api.post<Profile>("/profile", data)
  return response.data
}

export const updateProfile = async (
  id: string,
  data: UpdateProfileDto
): Promise<Profile> => {
  const response = await api.put<Profile>(`/profile/${id}`, data) // or patch depending on API
  return response.data
}

export const deleteProfile = async (id: string): Promise<void> => {
  await api.delete(`/profile/${id}`)
}
