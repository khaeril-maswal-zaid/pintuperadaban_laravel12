"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Trash2, MoreHorizontal, Mail, Calendar, Eye, Reply } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const mockMessages = [
  {
    id: 1,
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    subject: "Kerjasama Media Partnership",
    message:
      "Saya tertarik untuk menjalin kerjasama media partnership dengan Pintu Peradaban. Mohon informasi lebih lanjut mengenai syarat dan ketentuan yang berlaku.",
    date: "16 Jun 2025",
    status: "unread",
    priority: "high",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@gmail.com",
    subject: "Pertanyaan tentang Artikel",
    message:
      "Halo, saya ingin bertanya mengenai artikel tentang pendidikan yang dimuat minggu lalu. Apakah ada sumber referensi yang bisa saya dapatkan?",
    date: "15 Jun 2025",
    status: "read",
    priority: "medium",
  },
  {
    id: 3,
    name: "Muhammad Fadli",
    email: "m.fadli@yahoo.com",
    subject: "Saran untuk Website",
    message:
      "Website Pintu Peradaban sangat informatif. Saya memiliki beberapa saran untuk meningkatkan user experience, terutama di bagian navigasi mobile.",
    date: "14 Jun 2025",
    status: "replied",
    priority: "low",
  },
  {
    id: 4,
    name: "Dewi Sartika",
    email: "dewi.sartika@outlook.com",
    subject: "Permintaan Wawancara",
    message:
      "Saya mahasiswa jurnalistik yang sedang melakukan penelitian tentang media digital lokal. Bisakah saya melakukan wawancara dengan tim redaksi?",
    date: "13 Jun 2025",
    status: "read",
    priority: "high",
  },
  {
    id: 5,
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    subject: "Laporan Error Website",
    message:
      "Saya menemukan error pada halaman kategori 'Ekonomi'. Halaman tidak dapat dimuat dengan baik di browser Chrome versi terbaru.",
    date: "12 Jun 2025",
    status: "unread",
    priority: "medium",
  },
]

export function MessagesManagement() {
  const [messages, setMessages] = useState(mockMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || message.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: number) => {
    const message = messages.find((m) => m.id === id)
    setMessages(messages.filter((message) => message.id !== id))

    toast({
      title: "Message Deleted",
      description: `Message from "${message?.name}" has been deleted successfully.`,
    })
  }

  const markAsRead = (id: number) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status: "read" } : message)))

    const message = messages.find((m) => m.id === id)
    toast({
      title: "Message Marked as Read",
      description: `Message from "${message?.name}" has been marked as read.`,
    })
  }

  const markAsReplied = (id: number) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, status: "replied" } : message)))

    const message = messages.find((m) => m.id === id)
    toast({
      title: "Message Marked as Replied",
      description: `Message from "${message?.name}" has been marked as replied.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800"
      case "read":
        return "bg-yellow-100 text-yellow-800"
      case "replied":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages Management</h1>
          <p className="text-gray-600">Manage incoming messages and inquiries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-red-100 text-red-800">
            {messages.filter((m) => m.status === "unread").length} Unread
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search messages..."
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
                <DropdownMenuItem onClick={() => setFilterStatus("unread")}>Unread</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("read")}>Read</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("replied")}>Replied</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sender</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className={`border-b hover:bg-gray-50 ${message.status === "unread" ? "bg-blue-50" : ""}`}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{message.name}</h3>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          <span>{message.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <h4 className="font-medium text-gray-900 line-clamp-1">{message.subject}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{message.message}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{message.date}</span>
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
                          <DropdownMenuItem onClick={() => markAsRead(message.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => markAsReplied(message.id)}>
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </DropdownMenuItem>
                          {message.status === "unread" && (
                            <DropdownMenuItem onClick={() => markAsRead(message.id)}>Mark as Read</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(message.id)}>
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
    </div>
  )
}
