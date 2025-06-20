'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/toast';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, FileText, ImageIcon, LayoutDashboard, Menu, MessageSquare, Phone, Settings, Tag, Users, X } from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const menuItems = [
    {
        title: 'Platform',
        items: [{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
    },
    {
        title: 'Content Management',
        items: [
            { name: 'Articles', href: '/admin/articles', icon: FileText },
            { name: 'Categories', href: '/admin/categories', icon: Tag },
            { name: 'Advertisements', href: '/admin/advertisements', icon: ImageIcon },
        ],
    },
    {
        title: 'Communication',
        items: [
            { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
            { name: 'Contacts', href: '/admin/contacts', icon: Phone },
        ],
    },
    {
        title: 'User Management',
        items: [{ name: 'Users', href: '/admin/users', icon: Users }],
    },
];

export function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePage().url;

    const getPageTitle = () => {
        switch (pathname) {
            case '/admin':
                return 'Dashboard';
            case '/dashboard/blog':
                return 'Articles Management';
            case '/admin/categories':
                return 'Categories Management';
            case '/admin/advertisements':
                return 'Advertisements Management';
            case '/admin/messages':
                return 'Messages Management';
            case '/admin/contacts':
                return 'Contacts Management';
            case '/admin/users':
                return 'Users Management';
            default:
                return 'Admin Panel';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && <div className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between border-b border-gray-700 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
                            <span className="text-sm font-bold text-white">PP</span>
                        </div>
                        <span className="font-semibold">Pintu Peradaban Admin</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="space-y-6 p-4">
                    {menuItems.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">{section.title}</h3>
                            <ul className="space-y-1">
                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                                                    isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                                }`}
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <header className="border-b bg-white shadow-sm">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                                <Menu className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
                        </div>

                        {/* User dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                                    <span className="text-sm font-medium text-white">SA</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-700">Super Admin</p>
                                    <p className="text-xs text-gray-500">admin@pintuperadaban.com</p>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/" className="flex w-full items-center">
                                        View Site
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">{children}</main>
            </div>

            <Toaster />
        </div>
    );
}
