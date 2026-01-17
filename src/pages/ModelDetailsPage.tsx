import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/useAuth"
import { modelService } from "@/services/model.service"
import type { AIModel } from "@/types/model"
import {
  Code,
  Download,
  Loader2,
  MessageSquare,
  Play,
  Send,
  Star,
  Terminal,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

export default function ModelDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [model, setModel] = useState<AIModel | null>(null)
  const [loading, setLoading] = useState(true)

  // Try it out state
  const [prompt, setPrompt] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(
    null
  )
  const [response, setResponse] = useState("")
  const [isInferencing, setIsInferencing] = useState(false)

  // Reviews state
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(5)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const selectedVersion =
    model?.versions.find((v) => v.id === selectedVersionId) ||
    model?.versions[0]

  useEffect(() => {
    if (!id) return

    const fetchModel = async () => {
      try {
        setLoading(true)
        const data = await modelService.getModelById(id)
        setModel(data)
        if (data.versions.length > 0) {
          setSelectedVersionId(data.versions[0].id)
        }
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
          inputType: "Text",
          outputType: "JSON",
          versions: [
            {
              id: "v-demo",
              name: "v1.0.0-demo",
              script: "def predict(): pass",
              createdAt: new Date().toISOString(),
            },
          ],
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

  const handleSubmitReview = async () => {
    if (!user || !newComment.trim() || !id) return

    try {
      setIsSubmittingReview(true)
      const data = await modelService.addComment(id, {
        userId: user.uid || "anon",
        userName: user.displayName || "User",
        userAvatar: user.photoURL || `https://i.pravatar.cc/150?u=${user.uid}`,
        content: newComment,
        rating: newRating,
      })

      // Update local state
      setModel((prev) => {
        if (!prev) return null
        const updatedComments = [data, ...(prev.comments || [])]
        const currentRating = prev.rating || 0
        const currentCount = prev.reviewCount || 0
        return {
          ...prev,
          comments: updatedComments,
          rating:
            (currentRating * currentCount + newRating) / (currentCount + 1),
          reviewCount: currentCount + 1,
        }
      })

      setNewComment("")
      setNewRating(5)
      toast.success("Review submitted successfully!")
    } catch (error) {
      console.error("Failed to submit review", error)
      toast.error("Failed to submit review")
    } finally {
      setIsSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto my-16 animate-pulse px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Skeleton className="h-[400px] w-full rounded-xl" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </div>
          </div>
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
            <div className="flex items-center justify-between">
              <h1 className="mb-2 text-4xl font-bold">{model.title}</h1>
              {model.rating && (
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold">
                    {model.rating.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({model.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground mb-4 text-lg">
              by {model.provider}
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {model.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
              <div className="ml-auto flex gap-2">
                <span className="bg-primary/10 text-primary border-primary/20 rounded border px-2 py-1 text-xs font-medium uppercase">
                  IN: {model.inputType}
                </span>
                <span className="bg-primary/10 text-primary border-primary/20 rounded border px-2 py-1 text-xs font-medium uppercase">
                  OUT: {model.outputType}
                </span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews" className="flex gap-2">
                  Reviews
                  {model.comments && (
                    <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px]">
                      {model.comments.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="api">API Reference</TabsTrigger>
                <TabsTrigger value="install">Installation</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="mb-3 text-2xl font-semibold">
                    About this model
                  </h3>
                  <p className="text-muted-foreground leading-7">
                    {model.description}
                  </p>
                </div>

                {model.features && (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Key Features</h3>
                    <ul className="text-muted-foreground list-disc space-y-2 pl-5">
                      {model.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="mb-4 text-xl font-semibold">
                    Version History
                  </h3>
                  <div className="space-y-3">
                    {model.versions.map((v) => (
                      <div
                        key={v.id}
                        className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                          selectedVersionId === v.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedVersionId(v.id)}
                        role="button"
                      >
                        <div className="flex items-center gap-3">
                          <Terminal className="text-muted-foreground h-4 w-4" />
                          <div>
                            <p className="font-medium">{v.name}</p>
                            <p className="text-muted-foreground text-xs">
                              Inference Script Only (Python)
                            </p>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {new Date(v.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="api" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Terminal className="h-5 w-5" />
                    API Endpoint
                  </h3>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    POST https://api.exahack.ai/v1/models/{model.id}/predict
                  </div>

                  <h4 className="mt-4 font-medium">Request Body</h4>
                  <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                    {JSON.stringify(
                      {
                        prompt: "Your input text here",
                        parameters: {
                          temperature: 0.7,
                          max_tokens: 100,
                        },
                      },
                      null,
                      2
                    )}
                  </pre>

                  <h4 className="mt-4 font-medium">Example cURL</h4>
                  <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                    {`curl -X POST https://api.exahack.ai/v1/models/${model.id}/predict \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Hello world"
  }'`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="install" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Code className="h-5 w-5" />
                    Integration Guide
                  </h3>

                  <div className="space-y-2">
                    <h4 className="font-medium">1. Install the SDK</h4>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      npm install @exahack/ai-sdk
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">2. Initialize and Run</h4>
                    <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
                      {`import { ExaHack } from '@exahack/ai-sdk';

const client = new ExaHack({
  apiKey: process.env.EXAHACK_API_KEY
});

async function run() {
  const response = await client.models.run('${model.id}', {
    prompt: 'Summarize this article...'
  });
  
  console.log(response.text);
}

run();`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-8">
                <div className="space-y-6">
                  <h3 className="flex items-center gap-2 text-2xl font-semibold">
                    <MessageSquare className="h-5 w-5" />
                    Community Reviews
                  </h3>

                  {/* Review Form */}
                  <Card className="bg-muted/30 border-dashed">
                    <CardContent className="pt-6">
                      {!user ? (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                          <p className="text-muted-foreground mb-4 text-sm">
                            You must be logged in to leave a review.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate("/login", { state: { from: location } })
                            }
                          >
                            Login
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Label>Your Rating</Label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setNewRating(s)}
                                  className="transition-transform hover:scale-110"
                                >
                                  <Star
                                    className={`h-6 w-6 ${
                                      s <= newRating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground fill-none"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="review-content">Your Review</Label>
                            <Textarea
                              id="review-content"
                              placeholder="Share your experience with this model..."
                              className="bg-background min-h-[100px]"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={handleSubmitReview}
                            disabled={isSubmittingReview || !newComment.trim()}
                            className="w-full sm:w-auto"
                          >
                            {isSubmittingReview ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Review"
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  <div className="space-y-6 pt-4">
                    {model.comments && model.comments.length > 0 ? (
                      model.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="border-muted animate-reveal flex gap-4 border-b pb-6 last:border-0"
                        >
                          <img
                            src={comment.userAvatar}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                            alt={comment.userName}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                {comment.userName}
                              </h4>
                              <span className="text-muted-foreground text-xs">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="mb-2 flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`h-3 w-3 ${
                                    s <= comment.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground/30 fill-none"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-muted/20 rounded-xl py-12 text-center">
                        <p className="text-muted-foreground">
                          No reviews yet. Be the first to share your thoughts!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
                {!user ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                      Sign in to interact with this model and see it in action.
                    </p>
                    <Button
                      onClick={() =>
                        navigate("/login", { state: { from: location } })
                      }
                      className="w-full"
                    >
                      Login to Try
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Input Prompt
                      </label>
                      <Textarea
                        placeholder="Enter your prompt here..."
                        className="min-h-[120px] resize-none"
                        value={prompt}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setPrompt(e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Upload File (Optional)
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setFile(e.target.files[0])
                            }
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                      {file && (
                        <p className="text-muted-foreground text-xs">
                          Selected: {file.name}
                        </p>
                      )}
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
                  </>
                )}

                <div className="text-muted-foreground border-t pt-4 text-center text-xs">
                  Cost: ${model.price} per request
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="text-primary h-5 w-5" />
                  Download Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Get the model weights and configuration files for local
                  deployment.
                </p>
                {!user ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate("/login", { state: { from: location } })
                    }
                    className="w-full border-dashed"
                  >
                    Login to Download
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Select Version
                      </Label>
                      <select
                        className="bg-background border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedVersionId || ""}
                        onChange={(e) => setSelectedVersionId(e.target.value)}
                      >
                        {model.versions.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name} (
                            {new Date(v.createdAt).toLocaleDateString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        toast.success("Download started", {
                          description: `${model.title} (${selectedVersion?.name}) weights are downloading...`,
                        })
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download {selectedVersion?.name} Weights
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
