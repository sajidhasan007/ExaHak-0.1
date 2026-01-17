import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { modelService } from "@/services/model.service"
import type { AIModel } from "@/types/model"
import { Loader2, Play, Send } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

export default function ModelDetailsPage() {
  const { id } = useParams()
  const [model, setModel] = useState<AIModel | null>(null)
  const [loading, setLoading] = useState(true)

  // Try it out state
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isInferencing, setIsInferencing] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchModel = async () => {
      try {
        setLoading(true)
        const data = await modelService.getModelById(id)
        setModel(data)
      } catch (error) {
        console.error("Failed to fetch model details", error)
        // Fallback demo data
        setModel({
          id: id,
          title: "Demo Model",
          description:
            "This is a demo model description because backend failed.",
          provider: "Demo AI",
          tags: ["Demo"],
          price: 0.05,
          imageUrl:
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
          features: ["Fast inference", "High accuracy", "Low latency"],
        })
      } finally {
        setLoading(false)
      }
    }
    fetchModel()
  }, [id])

  const handleInference = async () => {
    if (!prompt.trim() || !id) return

    try {
      setIsInferencing(true)
      const data = await modelService.runInference(id, prompt)
      setResponse(data.answer)
    } catch (error) {
      console.error("Inference failed", error)
      toast.error("Failed to run inference. Please try again.")
      // Mock response for demo
      setTimeout(() => {
        setResponse(
          `[Mock Output] Based on your input "${prompt}", here is a simulated response from the ${model?.title} model. In a real scenario, this would come from the backend inference engine.`
        )
      }, 1000)
    } finally {
      setIsInferencing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto my-16 px-4 md:px-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-[300px]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    )
  }

  if (!model) return <div>Model not found</div>

  return (
    <div className="container mx-auto my-16 px-4 md:px-6">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Model Info */}
        <div className="space-y-8 lg:col-span-2">
          <div className="border-border bg-muted relative aspect-video w-full overflow-hidden rounded-xl border">
            {model.imageUrl && (
              <img
                src={model.imageUrl}
                alt={model.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div>
            <h1 className="mb-2 text-4xl font-bold">{model.title}</h1>
            <p className="text-muted-foreground mb-4 text-lg">
              by {model.provider}
            </p>
            <div className="mb-6 flex gap-2">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="mb-3 text-2xl font-semibold">About this model</h3>
            <p className="text-muted-foreground leading-7">
              {model.description}
            </p>

            {model.features && (
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">Key Features</h3>
                <ul className="text-muted-foreground list-disc space-y-2 pl-5">
                  {model.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Try It Out */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="text-primary h-5 w-5" />
                  Try it out
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Input Prompt</label>
                  <Textarea
                    placeholder="Enter your prompt here..."
                    className="min-h-[120px] resize-none"
                    value={prompt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setPrompt(e.target.value)
                    }
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleInference}
                  disabled={isInferencing || !prompt}
                >
                  {isInferencing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Run Inference
                    </>
                  )}
                </Button>

                {response && (
                  <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium">Output</label>
                    <div className="bg-muted animate-in fade-in slide-in-from-bottom-2 rounded-md p-3 text-sm whitespace-pre-wrap">
                      {response}
                    </div>
                  </div>
                )}

                <div className="text-muted-foreground border-t pt-4 text-center text-xs">
                  Cost: ${model.price} per request
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
