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

const contactSchema = z.object({
  platform: z.string().min(1, "Please select a platform"),
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  url: z.string().url("Please enter a valid URL"),
  username: z.string().min(1, "Username is required").max(50, "Username too long"),
  status: z.enum(["active", "inactive"]),
  color: z.string().min(1, "Please select a color"),
  description: z.string().min(10, "Description must be at least 10 characters").max(200, "Description too long"),
})

type ContactFormData = z.infer<typeof contactSchema>

interface Contact {
  id?: number
  platform: string
  name: string
  url: string
  username: string
  status: "active" | "inactive"
  icon: string
  color: string
  description: string
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (contact: Contact) => void
  contact?: Contact
  mode: "create" | "edit"
}

const platformOptions = [
  { value: "WhatsApp", color: "#25D366", icon: "whatsapp" },
  { value: "Facebook", color: "#1877F2", icon: "facebook" },
  { value: "Instagram", color: "#E4405F", icon: "instagram" },
  { value: "YouTube", color: "#FF0000", icon: "youtube" },
  { value: "Twitter", color: "#1DA1F2", icon: "twitter" },
  { value: "LinkedIn", color: "#0A66C2", icon: "linkedin" },
  { value: "TikTok", color: "#000000", icon: "tiktok" },
  { value: "Telegram", color: "#0088CC", icon: "telegram" },
  { value: "Email", color: "#EA4335", icon: "email" },
  { value: "Website", color: "#6B7280", icon: "website" },
]

export function ContactModal({ isOpen, onClose, onSave, contact, mode }: ContactModalProps) {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      platform: contact?.platform || "",
      name: contact?.name || "",
      url: contact?.url || "",
      username: contact?.username || "",
      status: contact?.status || "active",
      color: contact?.color || "#3B82F6",
      description: contact?.description || "",
    },
  })

  const watchPlatform = watch("platform")

  const handlePlatformChange = (platform: string) => {
    const platformData = platformOptions.find((p) => p.value === platform)
    if (platformData) {
      setValue("color", platformData.color)
    }
  }

  const onSubmit = (data: ContactFormData) => {
    try {
      const platformData = platformOptions.find((p) => p.value === data.platform)
      const contactData: Contact = {
        ...data,
        id: contact?.id,
        icon: platformData?.icon || "default",
      }

      onSave(contactData)

      toast({
        title: mode === "create" ? "Contact Created!" : "Contact Updated!",
        description: `Contact "${data.name}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {mode === "create" ? "Create New Contact" : "Edit Contact"}
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Platform */}
          <div>
            <Label htmlFor="platform">Platform *</Label>
            <Select
              onValueChange={(value) => {
                setValue("platform", value)
                handlePlatformChange(value)
              }}
              defaultValue={contact?.platform}
            >
              <SelectTrigger className={errors.platform ? "border-red-500" : ""}>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: platform.color }} />
                      <span>{platform.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>}
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter display name..."
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="username">Username/Handle *</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="@username or phone number..."
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* URL */}
          <div>
            <Label htmlFor="url">Profile URL *</Label>
            <Input
              id="url"
              {...register("url")}
              placeholder="https://..."
              className={errors.url ? "border-red-500" : ""}
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status *</Label>
            <Select
              onValueChange={(value: "active" | "inactive") => setValue("status", value)}
              defaultValue={contact?.status || "active"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description of this contact..."
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
              {mode === "create" ? "Create Contact" : "Update Contact"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
