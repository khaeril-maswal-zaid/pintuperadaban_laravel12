"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, MoreHorizontal, ExternalLink } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContactModal } from "./contact-modal"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  id: number
  platform: string
  name: string
  url: string
  username: string
  status: "active" | "inactive"
  icon: string
  color: string
  description: string
}

const mockContacts: Contact[] = [
  {
    id: 1,
    platform: "WhatsApp",
    name: "WhatsApp Official",
    url: "https://wa.me/6285343652494",
    username: "+62 853-4365-2494",
    status: "active",
    icon: "whatsapp",
    color: "#25D366",
    description: "Official WhatsApp contact for customer support",
  },
  {
    id: 2,
    platform: "Facebook",
    name: "Pintu Peradaban Com",
    url: "https://web.facebook.com/profile.php?id=100083999477470",
    username: "@pintuperadaban",
    status: "active",
    icon: "facebook",
    color: "#1877F2",
    description: "Official Facebook page for news and updates",
  },
  {
    id: 3,
    platform: "Instagram",
    name: "Official PPC",
    url: "https://www.instagram.com/official.ppc",
    username: "@official.ppc",
    status: "active",
    icon: "instagram",
    color: "#E4405F",
    description: "Instagram account for visual content and stories",
  },
  {
    id: 4,
    platform: "YouTube",
    name: "Pintu Peradaban",
    url: "https://www.youtube.com/@pintuperadaban",
    username: "@pintuperadaban",
    status: "active",
    icon: "youtube",
    color: "#FF0000",
    description: "YouTube channel for video content and interviews",
  },
  {
    id: 5,
    platform: "Twitter",
    name: "Pintu Peradaban",
    url: "https://twitter.com/pintuperadaban",
    username: "@pintuperadaban",
    status: "inactive",
    icon: "twitter",
    color: "#1DA1F2",
    description: "Twitter account for quick updates and news",
  },
]

export function ContactsManagement() {
  const [contacts, setContacts] = useState(mockContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | undefined>()
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const { toast } = useToast()

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: number) => {
    const contact = contacts.find((c) => c.id === id)
    setContacts(contacts.filter((contact) => contact.id !== id))

    toast({
      title: "Contact Deleted",
      description: `Contact "${contact?.name}" has been deleted successfully.`,
    })
  }

  const toggleStatus = (id: number) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, status: contact.status === "active" ? "inactive" : "active" } : contact,
    )
    setContacts(updatedContacts)

    const contact = updatedContacts.find((c) => c.id === id)
    toast({
      title: contact?.status === "active" ? "Contact Activated" : "Contact Deactivated",
      description: `Contact "${contact?.name}" has been ${contact?.status === "active" ? "activated" : "deactivated"}.`,
    })
  }

  const handleCreateContact = () => {
    setModalMode("create")
    setEditingContact(undefined)
    setIsModalOpen(true)
  }

  const handleEditContact = (contact: Contact) => {
    setModalMode("edit")
    setEditingContact(contact)
    setIsModalOpen(true)
  }

  const handleSaveContact = (contactData: Omit<Contact, "id"> & { id?: number }) => {
    if (modalMode === "create") {
      const newContact: Contact = {
        ...contactData,
        id: Math.max(...contacts.map((c) => c.id)) + 1,
      } as Contact
      setContacts([newContact, ...contacts])
    } else {
      setContacts(
        contacts.map((contact) => (contact.id === contactData.id ? ({ ...contactData } as Contact) : contact)),
      )
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts Management</h1>
          <p className="text-gray-600">Manage social media and contact information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateContact}>
          <Plus className="w-4 h-4 mr-2" />
          New Contact
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: contact.color }}
                  >
                    {contact.platform.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{contact.platform}</CardTitle>
                    <p className="text-sm text-gray-600">{contact.name}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.open(contact.url, "_blank")}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStatus(contact.id)}>
                      {contact.status === "active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(contact.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{contact.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Username:</span>
                  <span className="text-sm font-medium">{contact.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t">
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit Profile
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        contact={editingContact}
        mode={modalMode}
      />
    </div>
  )
}
