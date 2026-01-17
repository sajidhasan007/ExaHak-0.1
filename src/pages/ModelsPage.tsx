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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const LIMIT = 6

  useEffect(() => {
    // Reset to page 1 when search term changes
    setPage(1)
  }, [searchTerm])

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoading(true)
        const response = await modelService.getAllModels(
          searchTerm,
          page,
          LIMIT
        )
        setModels(response.data)
        setTotalPages(Math.ceil(response.total / LIMIT))
      } catch (error) {
        console.error("Failed to fetch models", error)
        // Fallback removed, relying on mock service
        setModels([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchModels()
    }, 500) // Debounce

    return () => clearTimeout(timeoutId)
  }, [searchTerm, page])

  return (
    <div className="container mx-auto mt-24 px-4 pb-24 md:px-6">
      <div className="mb-12 flex flex-col items-center space-y-4 text-center">
        <h1 className="text-gradient pb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Model Explorer
        </h1>
        <p className="text-muted-foreground max-w-[600px] text-lg">
          Discover and integrate high-performance AI models across various
          domains. Standardized Python inference for seamless integration.
        </p>

        <div className="mt-8 flex w-full max-w-lg items-center space-x-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search models..."
              className="pl-8 shadow-sm transition-shadow focus:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setPage(1)}
            className="hover:shadow-primary/20 shadow-lg"
          >
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
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
          <>
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}

            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center px-4 text-sm font-medium">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </>
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
