import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { CategoryContent } from "@/components/category-content"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Sample category data - in real app this would come from API/database
const categoryData = {
  teologi: {
    name: "Teologi",
    description: "Artikel dan diskusi seputar teologi dan keagamaan",
    color: "#8B5CF6",
  },
  filsafat: {
    name: "Filsafat",
    description: "Pemikiran filosofis dan kajian filsafat",
    color: "#F59E0B",
  },
  ekonomi: {
    name: "Ekonomi",
    description: "Berita dan analisis ekonomi terkini",
    color: "#06B6D4",
  },
  sosial: {
    name: "Sosial",
    description: "Isu-isu sosial dan kemasyarakatan",
    color: "#EF4444",
  },
  politik: {
    name: "Politik",
    description: "Berita dan analisis politik",
    color: "#10B981",
  },
  news: {
    name: "News",
    description: "Berita terkini dan terpercaya",
    color: "#3B82F6",
  },
  opini: {
    name: "Opini",
    description: "Opini dan pandangan dari berbagai perspektif",
    color: "#F59E0B",
  },
  "the-story": {
    name: "The Story",
    description: "Cerita dan kisah inspiratif",
    color: "#8B5CF6",
  },
  pendidikan: {
    name: "Pendidikan",
    description: "Berita dan informasi seputar dunia pendidikan",
    color: "#10B981",
  },
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.slug as keyof typeof categoryData] || {
    name: "Category",
    description: "Articles in this category",
    color: "#3B82F6",
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <CategoryContent category={category} slug={params.slug} />
          </div>
          <Sidebar />
        </div>
      </div>

      <Footer />
    </div>
  )
}
