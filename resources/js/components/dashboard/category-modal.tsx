"use client"

import type React from "react"
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

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  slug: z.string().min(2, "Slug must be at least 2 characters").max(50, "Slug too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(200, "Description too long"),
  color: z.string().min(1, "Please select a color"),
  status: z.enum(["active", "inactive"]),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface Category {
  id?: number
  name: string
  slug: string
  description: string
  color: string
  status: "active" | "inactive"
  articleCount?: number
}

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Category) => void
  category?: Category
  mode: "create" | "edit"
}

const colorOptions = [
  { value: "#3B82F6", label: "Blue", class: "bg-blue-500" },
  { value: "#10B981", label: "Green", class: "bg-green-500" },
  { value: "#F59E0B", label: "Yellow", class: "bg-yellow-500" },
  { value: "#8B5CF6", label: "Purple", class: "bg-purple-500" },
  { value: "#EF4444", label: "Red", class: "bg-red-500" },
  { value: "#06B6D4", label: "Cyan", class: "bg-cyan-500" },
  { value: "#F97316", label: "Orange", class: "bg-orange-500" },
  { value: "#84CC16", label: "Lime", class: "bg-lime-500" },
]

export function CategoryModal({ isOpen, onClose, onSave, category, mode }: CategoryModalProps) {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      color: category?.color || "#3B82F6",
      status: category?.status || "active",
    },
  })

  const watchName = watch("name")

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setValue("slug", generateSlug(name))
  }

  const onSubmit = (data: CategoryFormData) => {
    try {
      const categoryData: Category = {
        ...data,
        id: category?.id,
        articleCount: category?.articleCount || 0,
      }

      onSave(categoryData)

      toast({
        title: mode === "create" ? "Category Created!" : "Category Updated!",
        description: `Category "${data.name}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
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
            {mode === "create" ? "Create New Category" : "Edit Category"}
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              {...register("name", {
                onChange: handleNameChange,
              })}
              placeholder="Enter category name..."
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="category-slug"
              className={errors.slug ? "border-red-500" : ""}
            />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description of the category..."
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Color and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Color *</Label>
              <Select onValueChange={(value) => setValue("color", value)} defaultValue={category?.color || "#3B82F6"}>
                <SelectTrigger className={errors.color ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${color.class}`} />
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                onValueChange={(value: "active" | "inactive") => setValue("status", value)}
                defaultValue={category?.status || "active"}
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
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {mode === "create" ? "Create Category" : "Update Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
