import { ModelCard } from "@/components/ModelCard"
import { Button } from "@/components/ui/button"
import { modelService } from "@/services/model.service"
import type { AIModel } from "@/types/model"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

export default function MyModelsPage() {
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyModels = async () => {
      try {
        setLoading(true)
        const data = await modelService.getMyModels()
        setModels(data)
      } catch (error) {
        console.error("Failed to fetch my models", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMyModels()
  }, [])

  return (
    <div className="container mx-auto my-16 px-4 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Models</h1>
          <p className="text-muted-foreground">
            Manage your deployed AI models
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Deploy New Model
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-xl border p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="bg-muted h-6 w-48 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-32 animate-pulse rounded" />
                </div>
                <div className="bg-muted h-9 w-24 animate-pulse rounded" />
              </div>
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : models.length > 0 ? (
        <div className="flex flex-col gap-6">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed py-20 text-center">
          <p className="text-muted-foreground mb-4 text-lg">
            You haven't deployed any models yet.
          </p>
          <Button variant="outline">Deploy your first model</Button>
        </div>
      )}
    </div>
  )
}
