"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, MoreHorizontal, ImageIcon, Calendar, Eye, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdvertisementModal } from "./advertisement-modal"

type Advertisement = {
  id: number
  title: string
  client: string
  position: string
  type: string
  status: string
  startDate: string
  endDate: string
  clicks: number
  impressions: number
  budget: number
}

const mockAdvertisements: Advertisement[] = [
  {
    id: 1,
    title: "AlZaid Webcrafters - Website Development",
    client: "AlZaid Webcrafters",
    position: "Sidebar",
    type: "Banner",
    status: "active",
    startDate: "01 Jun 2025",
    endDate: "30 Jun 2025",
    clicks: 1250,
    impressions: 15000,
    budget: 500000,
  },
  {
    id: 2,
    title: "Local Business Partnership",
    client: "PT. Maju Bersama",
    position: "Header",
    type: "Display",
    status: "active",
    startDate: "15 May 2025",
    endDate: "15 Jul 2025",
    clicks: 890,
    impressions: 12000,
    budget: 750000,
  },
  {
    id: 3,
    title: "Educational Course Promotion",
    client: "Bimbel Cerdas",
    position: "Article Content",
    type: "Native",
    status: "paused",
    startDate: "10 Jun 2025",
    endDate: "10 Aug 2025",
    clicks: 340,
    impressions: 5000,
    budget: 300000,
  },
  {
    id: 4,
    title: "Mobile App Advertisement",
    client: "Tech Startup",
    position: "Footer",
    type: "Banner",
    status: "expired",
    startDate: "01 May 2025",
    endDate: "31 May 2025",
    clicks: 2100,
    impressions: 25000,
    budget: 1000000,
  },
]

export function AdvertisementsManagement() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(mockAdvertisements)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAdvertisement, setEditingAdvertisement] = useState<Advertisement | undefined>()
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  const filteredAdvertisements = advertisements.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || ad.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this advertisement?")) {
      setAdvertisements(advertisements.filter((ad) => ad.id !== id))
    }
  }

  const toggleStatus = (id: number) => {
    setAdvertisements(
      advertisements.map((ad) => (ad.id === id ? { ...ad, status: ad.status === "active" ? "paused" : "active" } : ad)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleCreateAdvertisement = () => {
    setModalMode("create")
    setEditingAdvertisement(undefined)
    setIsModalOpen(true)
  }

  const handleEditAdvertisement = (advertisement: Advertisement) => {
    setModalMode("edit")
    setEditingAdvertisement(advertisement)
    setIsModalOpen(true)
  }

  const handleSaveAdvertisement = (advertisementData: Omit<Advertisement, "id"> & { id?: number }) => {
    if (modalMode === "create") {
      const newAdvertisement: Advertisement = {
        ...advertisementData,
        id: Math.max(...advertisements.map((a) => a.id)) + 1,
        clicks: 0,
        impressions: 0,
      } as Advertisement
      setAdvertisements([newAdvertisement, ...advertisements])
    } else {
      setAdvertisements(
        advertisements.map((advertisement) =>
          advertisement.id === advertisementData.id ? ({ ...advertisementData } as Advertisement) : advertisement,
        ),
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advertisements Management</h1>
          <p className="text-gray-600">Manage advertising campaigns and placements</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateAdvertisement}>
          <Plus className="w-4 h-4 mr-2" />
          New Advertisement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Ads</p>
                <p className="text-2xl font-bold text-green-600">
                  {advertisements.filter((ad) => ad.status === "active").length}
                </p>
              </div>
              <ImageIcon className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-blue-600">
                  {advertisements.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-purple-600">
                  {advertisements.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(advertisements.reduce((sum, ad) => sum + ad.budget, 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search advertisements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Status: {filterStatus === "all" ? "All" : filterStatus}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("paused")}>Paused</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("expired")}>Expired</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Advertisements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Advertisements ({filteredAdvertisements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Position</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvertisements.map((ad) => (
                  <tr key={ad.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-1">{ad.title}</h3>
                        <p className="text-sm text-gray-600">{ad.client}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{ad.position}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{ad.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(ad.status)}>{ad.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>{ad.startDate}</span>
                        </div>
                        <div className="text-gray-500">to {ad.endDate}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAdvertisement(ad)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(ad.id)}>
                            {ad.status === "active" ? "Pause" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(ad.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <AdvertisementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAdvertisement}
        advertisement={editingAdvertisement}
        mode={modalMode}
      />
    </div>
  )
}
