"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Quote, Save, X } from "lucide-react"

const articleSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title too long"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Please select a category"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters").max(300, "Excerpt too long"),
  tags: z.string().min(1, "Please add at least one tag"),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
})

type ArticleFormData = z.infer<typeof articleSchema>

interface Article {
  id?: number
  title: string
  content: string
  category: string
  excerpt: string
  tags: string
  status: "draft" | "published"
  featured: boolean
  author?: string
  date?: string
  views?: number
}

interface ArticleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (article: Article) => void
  article?: Article
  mode: "create" | "edit"
}

const categories = ["News", "Pendidikan", "Opini", "Teologi", "Sosial", "Ekonomi", "Politik", "Filsafat", "The-Story"]

export function ArticleModal({ isOpen, onClose, onSave, article, mode }: ArticleModalProps) {
  const { toast } = useToast()
  const [content, setContent] = useState(article?.content || "")
  const [tags, setTags] = useState<string[]>(article?.tags ? article.tags.split(",") : [])
  const [newTag, setNewTag] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      category: article?.category || "",
      excerpt: article?.excerpt || "",
      tags: article?.tags || "",
      status: article?.status || "draft",
      featured: article?.featured || false,
    },
  })

  const handleEditorAction = (action: string) => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let newContent = content

    switch (action) {
      case "bold":
        newContent = content.substring(0, start) + `<strong>${selectedText}</strong>` + content.substring(end)
        break
      case "italic":
        newContent = content.substring(0, start) + `<em>${selectedText}</em>` + content.substring(end)
        break
      case "underline":
        newContent = content.substring(0, start) + `<u>${selectedText}</u>` + content.substring(end)
        break
      case "list":
        newContent =
          content.substring(0, start) + `<ul><li>${selectedText || "List item"}</li></ul>` + content.substring(end)
        break
      case "ordered-list":
        newContent =
          content.substring(0, start) + `<ol><li>${selectedText || "List item"}</li></ol>` + content.substring(end)
        break
      case "quote":
        newContent =
          content.substring(0, start) +
          `<blockquote>${selectedText || "Quote text"}</blockquote>` +
          content.substring(end)
        break
      case "link":
        const url = prompt("Enter URL:")
        if (url) {
          newContent =
            content.substring(0, start) + `<a href="${url}">${selectedText || "Link text"}</a>` + content.substring(end)
        }
        break
      case "image":
        const imgUrl = prompt("Enter image URL:")
        if (imgUrl) {
          newContent =
            content.substring(0, start) +
            `<img src="${imgUrl}" alt="Image" class="w-full mb-4 rounded" />` +
            content.substring(end)
        }
        break
    }

    setContent(newContent)
    setValue("content", newContent)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      setValue("tags", updatedTags.join(","))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    setValue("tags", updatedTags.join(","))
  }

  const onSubmit = (data: ArticleFormData) => {
    try {
      const articleData: Article = {
        ...data,
        id: article?.id,
        author: article?.author || "Current User",
        date: article?.date || new Date().toLocaleDateString("id-ID"),
        views: article?.views || 0,
      }

      onSave(articleData)

      toast({
        title: mode === "create" ? "Article Created!" : "Article Updated!",
        description: `Article "${data.title}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
      })

      reset()
      setContent("")
      setTags([])
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
    setContent("")
    setTags([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {mode === "create" ? "Create New Article" : "Edit Article"}
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter article title..."
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Category and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => setValue("category", value)} defaultValue={article?.category}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                onValueChange={(value: "draft" | "published") => setValue("status", value)}
                defaultValue={article?.status || "draft"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              {...register("excerpt")}
              placeholder="Brief description of the article..."
              rows={3}
              className={errors.excerpt ? "border-red-500" : ""}
            />
            {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
          </div>

          {/* Tags */}
          <div>
            <Label>Tags *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                  {tag} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
          </div>

          {/* Content Editor */}
          <div>
            <Label htmlFor="content">Content *</Label>

            {/* Editor Toolbar */}
            <div className="border border-gray-300 rounded-t-md p-2 bg-gray-50 flex flex-wrap gap-1">
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("bold")}>
                <Bold className="w-4 h-4" />
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("italic")}>
                <Italic className="w-4 h-4" />
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("underline")}>
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("list")}>
                <List className="w-4 h-4" />
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("ordered-list")}>
                <ListOrdered className="w-4 h-4" />
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("quote")}>
                <Quote className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-gray-300 mx-1" />
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("link")}>
                <Link className="w-4 h-4" />
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => handleEditorAction("image")}>
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Content Textarea */}
            <Textarea
              id="content-editor"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                setValue("content", e.target.value)
              }}
              placeholder="Write your article content here..."
              rows={15}
              className={`rounded-t-none ${errors.content ? "border-red-500" : ""}`}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="featured" {...register("featured")} className="rounded" />
            <Label htmlFor="featured">Mark as Featured Article</Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {mode === "create" ? "Create Article" : "Update Article"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
