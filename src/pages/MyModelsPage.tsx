import { ModelCard } from "@/components/ModelCard"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { modelService } from "@/services/model.service"
import type { AIModel } from "@/types/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const modelSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  provider: z.string().min(2, "Provider must be at least 2 characters"),
  tags: z.string().min(1, "At least one tag is required"),
  inputType: z.string().min(1, "Input type is required"),
  outputType: z.string().min(1, "Output type is required"),
  versions: z
    .array(
      z.object({
        name: z.string().min(2, "Version name is required (e.g. v1.0.0)"),
        script: z
          .string()
          .min(10, "Python script must be at least 10 characters"),
        file: z
          .any()
          .refine((files) => files?.length === 1, "Weights file is required"),
      })
    )
    .min(1, "At least one version is required"),
})

interface ModelFormValues {
  title: string
  description: string
  provider: string
  tags: string
  inputType: string
  outputType: string
  versions: {
    name: string
    script: string
    file: any
  }[]
}

export default function MyModelsPage() {
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      provider: "",
      tags: "",
      inputType: "",
      outputType: "",
      versions: [{ name: "v1.0.0", script: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "versions",
  })

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

  const onSubmit = async (data: ModelFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newModel: AIModel = {
        id: `m-${Date.now()}`,
        title: data.title,
        description: data.description,
        provider: data.provider,
        tags: data.tags.split(",").map((t) => t.trim()),
        price: 0.05, // Defaulting to 0.05 as it's no longer in the form
        inputType: data.inputType,
        outputType: data.outputType,
        imageUrl:
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
        versions: data.versions.map((v, i) => ({
          id: `v-${Date.now()}-${i}`,
          name: v.name,
          script: v.script,
          createdAt: new Date().toISOString(),
        })),
        features: ["Auto-generated feature"],
      }

      setModels((prev) => [newModel, ...prev])
      toast.success(
        `Successfully deployed "${data.title}" with ${data.versions.length} version(s)`
      )
      setOpen(false)
      reset()
    } catch (error) {
      console.error("Deploy failed", error)
      toast.error("Failed to deploy model")
    }
  }

  return (
    <div className="container mx-auto my-16 px-4 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Models</h1>
          <p className="text-muted-foreground">
            Manage your deployed AI models
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Deploy New Model
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] w-full max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Deploy New Models</DialogTitle>
              <DialogDescription>
                Add one or more models to deploy. Fill in the details for each.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Common Metadata */}
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Model Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. LegalSummarizer Pro"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-destructive text-xs">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider</Label>
                    <Input
                      id="provider"
                      placeholder="Your Name or Organization"
                      {...register("provider")}
                    />
                    {errors.provider && (
                      <p className="text-destructive text-xs">
                        {errors.provider.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your model, its use case, and architecture..."
                    className="min-h-[100px]"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-destructive text-xs">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="NLP, Healthcare, Python"
                      {...register("tags")}
                    />
                    {errors.tags && (
                      <p className="text-destructive text-xs">
                        {errors.tags.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="inputType">Input Type</Label>
                    <Input
                      id="inputType"
                      placeholder="e.g. PDF, Image (JPG), JSON"
                      {...register("inputType")}
                    />
                    {errors.inputType && (
                      <p className="text-destructive text-xs">
                        {errors.inputType.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="outputType">Output Type</Label>
                    <Input
                      id="outputType"
                      placeholder="e.g. Summary Text, Classification"
                      {...register("outputType")}
                    />
                    {errors.outputType && (
                      <p className="text-destructive text-xs">
                        {errors.outputType.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Version Management */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Model Versions</h3>
                  <p className="text-muted-foreground text-sm">
                    Upload multiple weights/scripts at once
                  </p>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="bg-muted/30 relative space-y-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          Version #{index + 1}
                        </h4>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Version Name</Label>
                          <Input
                            placeholder="v1.0.0"
                            {...register(`versions.${index}.name`)}
                          />
                          {errors.versions?.[index]?.name && (
                            <p className="text-destructive text-xs">
                              {errors.versions[index]?.name?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Weights file</Label>
                          <Input
                            type="file"
                            className="bg-background cursor-pointer"
                            {...register(`versions.${index}.file`)}
                          />
                          {errors.versions?.[index]?.file && (
                            <p className="text-destructive text-xs">
                              {errors.versions[index]?.file?.message as string}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Python Inference Script</Label>
                        <Textarea
                          placeholder="def predict(input): ..."
                          className="min-h-[100px] font-mono"
                          {...register(`versions.${index}.script`)}
                        />
                        {errors.versions?.[index]?.script && (
                          <p className="text-destructive text-xs">
                            {errors.versions[index]?.script?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        name: `v1.0.${fields.length}`,
                        script: "",
                        file: undefined,
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Version
                  </Button>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? "Deploying..." : "Deploy Model"}
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
          <Button variant="outline" onClick={() => setOpen(true)}>
            Deploy your first model
          </Button>
        </div>
      )}
    </div>
  )
}
