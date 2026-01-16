import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  createProfile,
  deleteProfile,
  getProfiles,
  updateProfile,
  type CreateProfileDto,
  type Profile,
} from "@/services/profile.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2, Pencil, Plus, Trash2, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  bio: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      bio: "",
    },
  })

  // Reset form when selectedProfile changes
  useEffect(() => {
    if (selectedProfile) {
      reset({
        name: selectedProfile.name,
        email: selectedProfile.email,
        role: selectedProfile.role,
        bio: selectedProfile.bio || "",
      })
    } else {
      reset({
        name: "",
        email: "",
        role: "",
        bio: "",
      })
    }
  }, [selectedProfile, reset])

  // Query: Fetch Profiles
  const {
    data: profiles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
  })

  // Mutation: Create Profile
  const createMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] })
      toast.success("Profile created successfully")
      handleCloseDialog()
      reset()
    },
    onError: (error) => {
      toast.error(`Error creating profile: ${error.message}`)
    },
  })

  // Mutation: Update Profile
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProfileDto }) =>
      updateProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] })
      toast.success("Profile updated successfully")
      handleCloseDialog()
    },
    onError: (error) => {
      toast.error(`Error updating profile: ${error.message}`)
    },
  })

  // Mutation: Delete Profile
  const deleteMutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] })
      toast.success("Profile deleted successfully")
    },
    onError: (error) => {
      toast.error(`Error deleting profile: ${error.message}`)
    },
  })

  const handleOpenCreateDialog = () => {
    setSelectedProfile(null)
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (profile: Profile) => {
    setSelectedProfile(profile)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedProfile(null)
  }

  const onSubmit = (data: ProfileFormValues) => {
    if (selectedProfile) {
      updateMutation.mutate({ id: selectedProfile.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-destructive text-2xl font-bold">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">{error.message}</p>
        <Button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["profiles"] })
          }
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profiles</h1>
          <p className="text-muted-foreground">
            Manage authorized users and their roles.
          </p>
        </div>
        <Button onClick={handleOpenCreateDialog} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Profile
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : profiles?.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-center">
          <User className="text-muted-foreground h-10 w-10 opacity-50" />
          <h3 className="mt-4 text-lg font-semibold">No profiles found</h3>
          <p className="text-muted-foreground text-sm">
            Get started by creating a new profile.
          </p>
          <Button
            variant="link"
            onClick={handleOpenCreateDialog}
            className="text-primary mt-2"
          >
            Create Profile
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profiles?.map((profile) => (
            <Card key={profile.id} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-2 inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors">
                  {profile.role}
                </div>
                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
                  {profile.bio || "No bio provided."}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary h-8 w-8"
                  onClick={() => handleOpenEditDialog(profile)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this profile?")
                    ) {
                      deleteMutation.mutate(profile.id)
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">Delete</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedProfile ? "Edit Profile" : "Create Profile"}
            </DialogTitle>
            <DialogDescription>
              {selectedProfile
                ? "Make changes to the user profile here."
                : "Add a new user profile to the system."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="John Doe" {...register("name")} />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Input
                  id="role"
                  placeholder="Software Engineer"
                  {...register("role")}
                />
                {errors.role && (
                  <p className="text-destructive text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                <Input
                  id="bio"
                  placeholder="Tell us a bit about yourself"
                  {...register("bio")}
                />
                {errors.bio && (
                  <p className="text-destructive text-sm">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {selectedProfile ? "Save Changes" : "Create Profile"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
