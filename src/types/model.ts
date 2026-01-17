export interface ModelVersion {
  id: string
  name: string
  script: string
  createdAt: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  rating: number
  createdAt: string
}

export interface AIModel {
  id: string
  title: string
  description: string
  provider: string
  tags: string[]
  price: number
  imageUrl?: string
  features?: string[]
  inputType: string
  outputType: string
  versions: ModelVersion[]
  rating?: number
  reviewCount?: number
  comments?: Comment[]
}

export interface ModelPromptResponse {
  answer: string
  usage?: {
    tokens: number
    cost: number
  }
}
