'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Edit, Mail, MoreHorizontal, Plus, Search, Shield, Trash2, User } from 'lucide-react';
import { useState } from 'react';
import { UserModal } from './user-modal';

export function UsersManagement({ mockUsers }: any) {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<(typeof mockUsers)[0] | undefined>();
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const { toast } = useToast();

    const filteredUsers = users.filter((user: any) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role.toLowerCase().replace(' ', '_') === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleDelete = (id: number) => {
        const user = users.find((u) => u.id === id);
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter((user) => user.id !== id));

            toast({
                title: 'User Deleted',
                description: `User "${user?.name}" has been deleted successfully.`,
            });
        }
    };

    const handleCreateUser = () => {
        setModalMode('create');
        setEditingUser(undefined);
        setIsModalOpen(true);
    };

    const handleEditUser = (user: (typeof mockUsers)[0]) => {
        setModalMode('edit');
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleSaveUser = (userData: Omit<(typeof mockUsers)[0], 'id'> & { id?: number }) => {
        if (modalMode === 'create') {
            const newUser = {
                ...userData,
                id: Math.max(...users.map((u) => u.id)) + 1,
            } as (typeof mockUsers)[0];
            setUsers([newUser, ...users]);
        } else {
            setUsers(users.map((user) => (user.id === userData.id ? ({ ...userData } as (typeof mockUsers)[0]) : user)));
        }
    };

    const toggleStatus = (id: number) => {
        setUsers(users.map((user) => (user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user)));
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Super Admin':
                return 'bg-red-100 text-red-800';
            case 'Admin':
                return 'bg-blue-100 text-blue-800';
            case 'Journalist':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    function formatTanggalINA(dateString: string): string {
        const date = new Date(dateString);

        const tanggal = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const waktu = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${tanggal}, ${waktu}`;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                    <p className="text-gray-600">Manage users and their permissions</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateUser}>
                    <Plus className="mr-2 h-4 w-4" />
                    New User
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
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
                                    <Shield className="mr-2 h-4 w-4" />
                                    Role: {filterRole === 'all' ? 'All' : filterRole.replace('_', ' ')}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setFilterRole('all')}>All Roles</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterRole('super_admin')}>Super Admin</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterRole('admin')}>Admin</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterRole('journalist')}>Journalist</DropdownMenuItem>
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
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">User</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Role</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Articles</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Join Date</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Last Login</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={`/storage/${user.image}`} alt={user.name} />
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                                                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                                                        <Mail className="h-3 w-3" />
                                                        <span>{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                                {/* {user.status} */} Aktif
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-sm text-gray-600">{user.articlesCount}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">{formatTanggalINA(user.created_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-sm text-gray-600">{user.lastLogin}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <User className="mr-2 h-4 w-4" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toggleStatus(user.id)}>
                                                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(user.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
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
            <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} user={editingUser} mode={modalMode} />
        </div>
    );
}
