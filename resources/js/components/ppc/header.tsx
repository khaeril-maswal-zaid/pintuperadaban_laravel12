import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
    const { iklans } = usePage<SharedData>().props;
    const advertise = iklans.filter((iklan: any) => iklan.type === '728-90')[0];

    // State untuk tanggal
    const [tanggal, setTanggal] = useState('');

    useEffect(() => {
        const updateTanggal = () => {
            const now = new Date();
            const formatted = new Intl.DateTimeFormat('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(now);
            setTanggal(formatted);
        };

        updateTanggal();
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="hidden bg-gray-900 md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <nav className="flex items-center space-x-6">
                            <div className="mx-0 flex items-center space-x-2 border-r border-gray-600 px-1">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{tanggal}</span>
                            </div>
                            <a href="/kontak" className="mx-0 border-r border-gray-600 px-1 text-sm text-gray-400 hover:text-yellow-400">
                                Advertise
                            </a>

                            <a href="/dashboard" className="px-1 text-sm text-gray-400 hover:text-yellow-400">
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
                    <div className="flex items-center justify-between md:py-3">
                        <div className="flex-1">
                            <a href="/" className="hidden max-w-sm md:block">
                                <img src="/image/assets/brand.png" alt="Pintu Peradaban" height={80} className="h-auto" />
                            </a>
                        </div>
                        <div className="hidden flex-1 md:block">
                            <div className="text-center">
                                <img src={`storage/${advertise.image}`} className="rounded" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
