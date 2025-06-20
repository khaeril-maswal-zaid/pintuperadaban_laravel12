"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, MoreHorizontal, User, Mail, Calendar, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserModal } from "./user-modal"
import { useToast } from "@/hooks/use-toast"

const mockUsers = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@pintuperadaban.com",
    role: "Super Admin",
    status: "active",
    joinDate: "01 Jan 2025",
    lastLogin: "16 Jun 2025",
    articlesCount: 0,
  },
  {
    id: 2,
    name: "Official Pintu Peradaban",
    email: "official@pintuperadaban.com",
    role: "Admin",
    status: "active",
    joinDate: "15 Jan 2025",
    lastLogin: "15 Jun 2025",
    articlesCount: 12,
  },
  {
    id: 3,
    name: "Faridun Taufik Muhamad Akbar",
    email: "faridun@pintuperadaban.com",
    role: "Journalist",
    status: "active",
    joinDate: "20 Feb 2025",
    lastLogin: "14 Jun 2025",
    articlesCount: 8,
  },
  {
    id: 4,
    name: "analisamu",
    email: "analisa@pintuperadaban.com",
    role: "Journalist",
    status: "active",
    joinDate: "10 Mar 2025",
    lastLogin: "12 Jun 2025",
    articlesCount: 5,
  },
  {
    id: 5,
    name: "Ajmail Umar",
    email: "ajmail@pintuperadaban.com",
    role: "Journalist",
    status: "inactive",
    joinDate: "25 Apr 2025",
    lastLogin: "05 Jun 2025",
    articlesCount: 3,
  },
]

export function UsersManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<(typeof mockUsers)[0] | undefined>()
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const { toast } = useToast()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role.toLowerCase().replace(" ", "_") === filterRole
    return matchesSearch && matchesRole
  })

  const handleDelete = (id: number) => {
    const user = users.find((u) => u.id === id)
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))

      toast({
        title: "User Deleted",
        description: `User "${user?.name}" has been deleted successfully.`,
      })
    }
  }

  const handleCreateUser = () => {
    setModalMode("create")
    setEditingUser(undefined)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: (typeof mockUsers)[0]) => {
    setModalMode("edit")
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleSaveUser = (userData: Omit<(typeof mockUsers)[0], "id"> & { id?: number }) => {
    if (modalMode === "create") {
      const newUser = {
        ...userData,
        id: Math.max(...users.map((u) => u.id)) + 1,
      } as (typeof mockUsers)[0]
      setUsers([newUser, ...users])
    } else {
      setUsers(users.map((user) => (user.id === userData.id ? ({ ...userData } as (typeof mockUsers)[0]) : user)))
    }
  }

  const toggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-red-100 text-red-800"
      case "Admin":
        return "bg-blue-100 text-blue-800"
      case "Journalist":
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
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage users and their permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateUser}>
          <Plus className="w-4 h-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Role: {filterRole === "all" ? "All" : filterRole.replace("_", " ")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterRole("all")}>All Roles</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole("super_admin")}>Super Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole("admin")}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole("journalist")}>Journalist</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Articles</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{user.articlesCount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{user.joinDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{user.lastLogin}</span>
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
                            <User className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(user.id)}>
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(user.id)}>
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
      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
        mode={modalMode}
      />
    </div>
  )
}
