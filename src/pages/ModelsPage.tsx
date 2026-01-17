import { ModelCard } from "@/components/ModelCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { modelService } from "@/services/model.service"
import type { AIModel } from "@/types/model"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

export default function ModelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [models, setModels] = useState<AIModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoading(true)
        const data = await modelService.getAllModels(searchTerm)
        setModels(data)
      } catch (error) {
        console.error("Failed to fetch models", error)
        // Fallback for prototype if backend fails
        setModels([
          {
            id: "1",
            title: "LegalSummarizer Pro",
            description:
              "A specialized model for summarizing complex legal documents into plain English.",
            provider: "LegalTech AI",
            tags: ["Legal", "NLP", "Summary"],
            price: 0.05,
            imageUrl:
              "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
          },
          {
            id: "2",
            title: "MediDiagnose Assist",
            description:
              "Assists healthcare professionals in preliminary diagnosis based on symptoms.",
            provider: "HealthAI Labs",
            tags: ["Healthcare", "Diagnosis", "Medical"],
            price: 0.1,
            imageUrl:
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
          },
          {
            id: "3",
            title: "CodeOptimzr",
            description:
              "Automatically optimizes Python and JavaScript code for performance.",
            provider: "DevTools Inc",
            tags: ["Coding", "Optimization", "Developer Tools"],
            price: 0.02,
            imageUrl:
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchModels()
    }, 500) // Debounce

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return (
    <div className="container mx-auto mt-16 px-4 md:px-6">
      <div className="mb-10 flex flex-col items-center space-y-4 text-center">
        <h1 className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Specialized AI Models
        </h1>
        <p className="text-muted-foreground max-w-[700px] md:text-xl">
          Find and integrate the perfect AI model for your specific use case.
          Hosting by independent engineers, for everyone.
        </p>

        <div className="mt-6 flex w-full max-w-lg items-center space-x-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search models..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Search</Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-xl border p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="bg-muted h-6 w-48 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-32 animate-pulse rounded" />
                </div>
                <div className="bg-muted h-9 w-24 animate-pulse rounded" />
              </div>
              <div className="space-y-2">
                <div className="bg-muted h-4 w-full animate-pulse rounded" />
                <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
              </div>
            </div>
          ))
        ) : models.length > 0 ? (
          models.map((model) => <ModelCard key={model.id} model={model} />)
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">
              No models found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
