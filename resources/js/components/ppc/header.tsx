import { Calendar } from 'lucide-react';

export function Header() {
    return (
        <>
            {/* Top Bar */}
            <div className="hidden bg-gray-900 text-white lg:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <nav className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 border-r border-gray-600 pr-6">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">Senin, 16 Juni 2025</span>
                            </div>
                            <a href="/kontak" className="border-r border-gray-600 pr-6 text-sm hover:text-blue-400">
                                Advertise
                            </a>
                            <a href="/kontak" className="border-r border-gray-600 pr-6 text-sm hover:text-blue-400">
                                Contact
                            </a>
                            <a href="/dashboard" className="text-sm hover:text-blue-400">
                                Login
                            </a>
                        </nav>
                        <div className="text-sm">Pintu Peradaban Site</div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex-1">
                            <a href="/" className="block max-w-sm">
                                <img src="/placeholder.svg?height=60&width=300" alt="Pintu Peradaban" width={300} height={60} className="h-auto" />
                            </a>
                        </div>
                        <div className="hidden flex-1 lg:block">
                            <div className="text-center">
                                <div className="rounded bg-gray-100 p-4">
                                    <span className="text-sm text-gray-600">Advertisement Space</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
