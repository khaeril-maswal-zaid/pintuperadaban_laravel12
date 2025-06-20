"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, X } from "lucide-react"

const advertisementSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title too long"),
  client: z.string().min(2, "Client name must be at least 2 characters").max(50, "Client name too long"),
  position: z.string().min(1, "Please select a position"),
  type: z.string().min(1, "Please select a type"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z.string().min(10, "Description must be at least 10 characters").max(300, "Description too long"),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  targetUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type AdvertisementFormData = z.infer<typeof advertisementSchema>

interface Advertisement {
  id?: number
  title: string
  client: string
  position: string
  type: string
  startDate: string
  endDate: string
  description: string
  imageUrl?: string
  targetUrl?: string
  clicks?: number
  impressions?: number
}

interface AdvertisementModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (advertisement: Advertisement) => void
  advertisement?: Advertisement
  mode: "create" | "edit"
}

const positionOptions = ["Header", "Sidebar", "Footer", "Article Content", "Between Posts"]
const typeOptions = ["Banner", "Display", "Native", "Video", "Text"]

export function AdvertisementModal({ isOpen, onClose, onSave, advertisement, mode }: AdvertisementModalProps) {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<AdvertisementFormData>({
    resolver: zodResolver(advertisementSchema),
    defaultValues: {
      title: advertisement?.title || "",
      client: advertisement?.client || "",
      position: advertisement?.position || "",
      type: advertisement?.type || "",
      startDate: advertisement?.startDate || "",
      endDate: advertisement?.endDate || "",
      description: advertisement?.description || "",
      imageUrl: advertisement?.imageUrl || "",
      targetUrl: advertisement?.targetUrl || "",
    },
  })

  const onSubmit = (data: AdvertisementFormData) => {
    try {
      const advertisementData: Advertisement = {
        ...data,
        id: advertisement?.id,
        clicks: advertisement?.clicks || 0,
        impressions: advertisement?.impressions || 0,
      }

      onSave(advertisementData)

      toast({
        title: mode === "create" ? "Advertisement Created!" : "Advertisement Updated!",
        description: `Advertisement "${data.title}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
      })

      reset()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {mode === "create" ? "Create New Advertisement" : "Edit Advertisement"}
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title and Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter campaign title..."
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="client">Client Name *</Label>
              <Input
                id="client"
                {...register("client")}
                placeholder="Enter client name..."
                className={errors.client ? "border-red-500" : ""}
              />
              {errors.client && <p className="text-red-500 text-sm mt-1">{errors.client.message}</p>}
            </div>
          </div>

          {/* Position, Type, and Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="position">Position *</Label>
              <Select onValueChange={(value) => setValue("position", value)} defaultValue={advertisement?.position}>
                <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
            </div>

            <div>
              <Label htmlFor="type">Type *</Label>
              <Select onValueChange={(value) => setValue("type", value)} defaultValue={advertisement?.type}>
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                onValueChange={(value: "active" | "paused" | "expired") => setValue("status", value)}
                defaultValue={advertisement?.status || "active"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className={errors.imageUrl ? "border-red-500" : ""}
              />
              {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
            </div>

            <div>
              <Label htmlFor="targetUrl">Target URL</Label>
              <Input
                id="targetUrl"
                {...register("targetUrl")}
                placeholder="https://example.com"
                className={errors.targetUrl ? "border-red-500" : ""}
              />
              {errors.targetUrl && <p className="text-red-500 text-sm mt-1">{errors.targetUrl.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description of the advertisement..."
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {mode === "create" ? "Create Advertisement" : "Update Advertisement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
