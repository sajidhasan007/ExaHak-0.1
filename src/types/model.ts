export interface ModelVersion {
  id: string
  name: string
  script: string
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
}

export interface ModelPromptResponse {
  answer: string
  usage?: {
    tokens: number
    cost: number
  }
}
