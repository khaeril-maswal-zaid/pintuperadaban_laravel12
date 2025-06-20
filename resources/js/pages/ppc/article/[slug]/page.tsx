import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { ArticleDetail } from "@/components/article-detail"
import { RelatedNews } from "@/components/related-news"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Sample article data - in real app this would come from API/database
const articleData = {
  id: "1747315445",
  title: "Musyawarah Desa Bulo Bulo Hasilkan Kepengurusan Koperasi Merah Putih",
  category: "News",
  date: "15 Mei 2025",
  image: "/placeholder.svg?height=600&width=800",
  author: "Official Pintu Peradaban",
  authorImage: "/placeholder.svg?height=30&width=30",
  views: 146,
  users: 128,
  content: `
    <p><strong>PINTUPERADABAN.COM, Bulo-Bulo - </strong>Pemerintah Desa Bulo-Bulo menggelar Musyawarah Desa Khusus (Musdesus) untuk membentuk Koperasi Desa Merah Putih pada 15 Mei 2025, bertempat di Gedung Sorga Bulo Bulo. Forum ini dihadiri oleh perwakilan Dinas Koperasi, Dinas Ketahanan Pangan, Sekretaris Camat Bulukumpa, serta tokoh masyarakat, agama, dan pemuda.</p>
    
    <p>Dalam sambutannya, Kepala Desa Bulo Bulo, Bapak Mappilawa Mappa, menegaskan bahwa pembentukan Koperasi Desa Merah Putih berlandaskan Instruksi Presiden Nomor 9 Tahun 2025. "Sebagai forum tertinggi dalam pengambilan keputusan, kita akan menunjuk pengurus yang memiliki dedikasi dan kemauan bekerja," ujarnya.</p>
    
    <img class="w-full mb-4 rounded" src="/placeholder.svg?height=400&width=800" alt="Suasana Musyawarah" />
    
    <p>Suasana musyawarah semakin khidmat dengan penayangan video sambutan Presiden Republik Indonesia Prabowo Subianto, yang memberikan motivasi terkait pentingnya koperasi sebagai soko guru perekonomian nasional.</p>
    
    <p>Musyawarah dipimpin oleh Ketua BPD Desa Bulo Bulo, Bapak Sofyan, S.Pd, bersama anggota sidang A. Munir Suardi dan A. Nurfaizah. Meskipun pemilihan ketua sempat berjalan alot karena banyaknya opsi, dinamika forum berhasil diredam, hingga akhirnya dilakukan voting. Saudara Jahruddin unggul atas tujuh kandidat lain dan terpilih sebagai Ketua, dengan Khaeril Maswal Zaid menduduki posisi Sekretaris.</p>
    
    <p>Dari total tujuh calon pengurus, lima orang ditetapkan sebagai pengurus inti Koperasi Desa Merah Putih Bulo Bulo periode 2025:</p>
    
    <ul class="list-disc pl-6 mb-4">
      <li>Ketua: Jahruddin, S.IP</li>
      <li>Sekretaris: Khaeril Maswal Zaid</li>
      <li>Bendahara: Aprianti, S.Pd</li>
      <li>Wakil Ketua Bidang Usaha: Sabil, S.Ag</li>
      <li>Wakil Ketua Bidang Anggota: Mulyadi</li>
    </ul>
  `,
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <ArticleDetail article={articleData} />

            {/* Advertisement Banner */}
            <div className="my-8">
              <div className="block md:hidden mb-6">
                <h3 className="text-lg font-bold uppercase text-gray-900 mb-3">Advertisement</h3>
                <div className="bg-gray-100 p-4 text-center rounded">
                  <span className="text-gray-600">Mobile Advertisement</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-gray-100 p-4 text-center rounded">
                  <span className="text-gray-600">Desktop Advertisement Banner</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 my-8" />

            <RelatedNews />
          </div>

          <Sidebar />
        </div>
      </div>

      <Footer />
    </div>
  )
}
