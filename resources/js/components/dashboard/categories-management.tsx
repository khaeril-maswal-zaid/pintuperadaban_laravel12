"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, MoreHorizontal, Tag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CategoryModal } from "./category-modal"
import { useToast } from "@/hooks/use-toast"

const mockCategories = [
  {
    id: 1,
    name: "News",
    slug: "news",
    description: "Latest news and updates",
    articleCount: 45,
    color: "#3B82F6",
    status: "active",
  },
  {
    id: 2,
    name: "Pendidikan",
    slug: "pendidikan",
    description: "Educational content and academic news",
    articleCount: 23,
    color: "#10B981",
    status: "active",
  },
  {
    id: 3,
    name: "Opini",
    slug: "opini",
    description: "Opinion pieces and editorial content",
    articleCount: 18,
    color: "#F59E0B",
    status: "active",
  },
  {
    id: 4,
    name: "Teologi",
    slug: "teologi",
    description: "Religious and theological discussions",
    articleCount: 31,
    color: "#8B5CF6",
    status: "active",
  },
  {
    id: 5,
    name: "Sosial",
    slug: "sosial",
    description: "Social issues and community news",
    articleCount: 27,
    color: "#EF4444",
    status: "active",
  },
  {
    id: 6,
    name: "Ekonomi",
    slug: "ekonomi",
    description: "Economic news and business updates",
    articleCount: 15,
    color: "#06B6D4",
    status: "inactive",
  },
]

export function CategoriesManagement() {
  const [categories, setCategories] = useState(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<(typeof mockCategories)[0] | undefined>()
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const { toast } = useToast()

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    const category = categories.find((c) => c.id === id)
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id))

      toast({
        title: "Category Deleted",
        description: `Category "${category?.name}" has been deleted successfully.`,
      })
    }
  }

  const handleCreateCategory = () => {
    setModalMode("create")
    setEditingCategory(undefined)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: (typeof mockCategories)[0]) => {
    setModalMode("edit")
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleSaveCategory = (categoryData: Omit<(typeof mockCategories)[0], "id"> & { id?: number }) => {
    if (modalMode === "create") {
      const newCategory = {
        ...categoryData,
        id: Math.max(...categories.map((c) => c.id)) + 1,
      } as (typeof mockCategories)[0]
      setCategories([newCategory, ...categories])
    } else {
      setCategories(
        categories.map((category) =>
          category.id === categoryData.id ? ({ ...categoryData } as (typeof mockCategories)[0]) : category,
        ),
      )
    }
  }

  const toggleStatus = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, status: category.status === "active" ? "inactive" : "active" } : category,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600">Organize your content with categories</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateCategory}>
          <Plus className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStatus(category.id)}>
                      {category.status === "active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(category.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{category.articleCount} articles</span>
                </div>
                <Badge
                  className={category.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {category.status}
                </Badge>
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">Slug: /{category.slug}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
        mode={modalMode}
      />
    </div>
  )
}
