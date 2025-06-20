import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const popularFooterPosts = [
  {
    title: "Muhammadiyah Bulukumba Pusatka",
    category: "Sosial",
    date: "29 Maret 2025",
    href: "/article/muhammadiyah-bulukumba",
  },
  {
    title: "Memaknai Humanisme Dalam Konte",
    category: "Teologi",
    date: "27 Mei 2022",
    href: "/article/memaknai-humanisme",
  },
  {
    title: "MTQ ke-XVIII Desa Bulo-Bulo Re",
    category: "Teologi",
    date: "16 Maret 2025",
    href: "/article/mtq-ke-xviii",
  },
]

const categories = [
  { name: "Teologi", href: "/category/teologi" },
  { name: "Filsafat", href: "/category/filsafat" },
  { name: "Ekonomi", href: "/category/ekonomi" },
  { name: "Sosial", href: "/category/sosial" },
  { name: "Politik", href: "/category/politik" },
  { name: "News", href: "/category/news" },
  { name: "Opini", href: "/category/opini" },
  { name: "The-Story", href: "/category/the_story" },
  { name: "Pendidikan", href: "/category/pendidikan" },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Get In Touch</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-sm">Berdikari C, Jln. Ahmad Yani, Bulukumba</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">62 853-4365-2494 / 62 853-4043-4280</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">official@pintuperadaban.com</span>
              </div>
            </div>

            <h4 className="text-md font-bold uppercase mb-3">Follow Us</h4>
            <div className="flex space-x-2">
              <a
                href="https://web.facebook.com/profile.php?id=100083999477470"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-blue-600 flex items-center justify-center rounded transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100083999477470"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-sky-500 flex items-center justify-center rounded transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100083999477470"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-pink-600 flex items-center justify-center rounded transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=100083999477470"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-red-600 flex items-center justify-center rounded transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Posts */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Popular Peradaban</h3>
            <div className="space-y-4">
              {popularFooterPosts.map((post, index) => (
                <article key={index}>
                  <div className="mb-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs mr-2">{post.category}</Badge>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <a
                    href={post.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors uppercase font-medium"
                  >
                    {post.title}
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={category.href}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-400">
            &copy;{" "}
            <a href="/" className="hover:text-white transition-colors">
              Pintu Peradaban.Com
            </a>
            . All Rights Reserved. Design by{" "}
            <a href="https://htmlcodex.com" className="hover:text-white transition-colors">
              HTML Codex
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
