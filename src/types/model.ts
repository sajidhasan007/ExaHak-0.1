export interface AIModel {
  id: string
  title: string
  description: string
  provider: string
  tags: string[]
  price: number
  imageUrl?: string
  features?: string[]
}

export interface ModelPromptResponse {
  answer: string
  usage?: {
    tokens: number
    cost: number
  }
}
