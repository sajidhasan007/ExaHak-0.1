import type { AIModel, ModelPromptResponse } from "@/types/model"
import api from "./api"

export const modelService = {
  async getAllModels(search?: string): Promise<AIModel[]> {
    const params = search ? { search } : {}
    const response = await api.get("/models", { params })
    return response.data
  },

  async getModelById(id: string): Promise<AIModel> {
    const response = await api.get(`/models/${id}`)
    return response.data
  },

  async getMyModels(): Promise<AIModel[]> {
    const response = await api.get("/user/models")
    return response.data
  },

  async runInference(
    modelId: string,
    prompt: string
  ): Promise<ModelPromptResponse> {
    const response = await api.post(`/models/${modelId}/predict`, { prompt })
    return response.data
  },
}
