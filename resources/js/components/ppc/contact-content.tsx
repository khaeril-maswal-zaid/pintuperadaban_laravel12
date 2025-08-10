import { Sidebar } from '@/components/ppc/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactContent() {
    const { kontaks } = usePage<SharedData>().props;

    return (
        <div className="bg-gray-200 py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <Card className="h-full rounded-t-none p-0">
                        <CardHeader className="border-b border-gray-200 bg-white px-0">
                            {/* Header with yellow accent */}
                            <div className="border-l-5 border-l-yellow-400 py-4 pl-6">
                                <h1 className="text-2xl font-bold text-gray-800 uppercase">Hubungi Kami</h1>
                            </div>
                        </CardHeader>
                        <CardContent className="px-10">
                            {/* Company Info */}
                            <div className="mb-8">
                                <h2 className="mb-2 text-xl font-bold text-gray-700">PINTU PERADABAN.COM</h2>
                                <p className="leading-relaxed text-gray-500">
                                    Menebar Kebaikan dan Manfaat Melalui Mimbar Informasi, Literasi Universal, Autentik, Serta Berkemajuan.
                                </p>
                            </div>

                            {/* Office Location */}
                            <div className="mb-8">
                                <div className="mb-4 flex items-start space-x-3">
                                    <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-500" />
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-gray-700">Our Office</h3>
                                        <p className="text-gray-600">Berdikari Connection, Jln. Muh. Hatta No. 07, Kec. Ujung Bulu, Bulukumba</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium text-gray-700">Telepon</p>
                                        <p className="text-gray-600">{kontaks?.telepon.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium text-gray-700">Email</p>
                                        <p className="text-gray-600">{kontaks?.email.value}</p>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Contact Section */}
                            <div className="mb-8">
                                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-700">
                                    <svg className="mr-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                    Tim Redaksi
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <a
                                        href="https://wa.me/6285343652494"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center space-x-3 rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 group-hover:text-green-700">WA Admin 1</p>
                                            <p className="text-sm text-gray-600">+62 853-4365-2494</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://wa.me/6285340434280"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center space-x-3 rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 group-hover:text-green-700">WA Admin 2</p>
                                            <p className="text-sm text-gray-600">+62 853-4043-4280</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center space-x-3 rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 group-hover:text-green-700">WA Admin 3</p>
                                            <p className="text-sm text-gray-600">+62 812-3456-7890</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Social Media Section */}
                            <div className="mb-8">
                                <h3 className="mb-4 text-lg font-semibold text-gray-700">Ikuti Kami di Media Sosial</h3>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <a
                                        href={kontaks?.fb?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center rounded-lg bg-yellow-50 p-4 transition-colors hover:bg-yellow-100"
                                    >
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-600">
                                            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700">Facebook</span>
                                    </a>

                                    <a
                                        href={kontaks?.ig?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center rounded-lg bg-pink-50 p-4 transition-colors hover:bg-pink-100"
                                    >
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500">
                                            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.85 14.724 3.85 12.78 5.126 11.504c1.276-1.276 3.22-1.276 4.496 0 1.276 1.276 1.276 3.22 0 4.496-.875.807-2.026 1.297-3.323 1.297zm7.138 0c-1.297 0-2.448-.49-3.323-1.297-1.276-1.276-1.276-3.22 0-4.496 1.276-1.276 3.22-1.276 4.496 0 1.276 1.276 1.276 3.22 0 4.496-.875.807-2.026 1.297-3.323 1.297z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700">Instagram</span>
                                    </a>

                                    <a
                                        href={kontaks?.yt?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center rounded-lg bg-red-50 p-4 transition-colors hover:bg-red-100"
                                    >
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                                            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">YouTube</span>
                                    </a>

                                    <a
                                        href={kontaks?.x?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                                    >
                                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-black">
                                            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-700">X (Twitter)</span>
                                    </a>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="rounded-lg bg-gray-50 p-6">
                                <h3 className="mb-6 text-xl font-bold text-gray-800">Kirim Pesan</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                                placeholder="Masukkan nama lengkap"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                                placeholder="Masukkan email"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                                            Subjek *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                            placeholder="Masukkan subjek pesan"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                                            Pesan *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            required
                                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                            placeholder="Tulis pesan Anda di sini..."
                                        />
                                    </div>
                                    <Button className="bg-yellow-400 px-8 py-2 text-gray-900 hover:bg-yellow-500">Kirim Pesan</Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Advertisement Section */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-6">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
