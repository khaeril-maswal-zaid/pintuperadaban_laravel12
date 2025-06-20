import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, MessageSquare, Eye, TrendingUp, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Articles",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: FileText,
  },
  {
    title: "Total Users",
    value: "89",
    change: "+5%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Page Views",
    value: "45,231",
    change: "+18%",
    changeType: "positive",
    icon: Eye,
  },
  {
    title: "Messages",
    value: "156",
    change: "+3%",
    changeType: "positive",
    icon: MessageSquare,
  },
]

const recentArticles = [
  {
    title: "Musyawarah Desa Bulo Bulo Hasilkan Kepengurusan Koperasi Merah Putih",
    author: "Official Pintu Peradaban",
    date: "15 Mei 2025",
    status: "Published",
    views: 146,
  },
  {
    title: "UKT Elit Fasilitas Sulit : Mahasiswa Keluhkan Fasilitas Kampus",
    author: "Faridun Taufik Muhamad Akbar",
    date: "11 Juni 2025",
    status: "Published",
    views: 502,
  },
  {
    title: "Tragedi Jembatan Teluk Kendari : Mahasiswa Psikologi Islam",
    author: "analisamu",
    date: "02 Juni 2025",
    status: "Draft",
    views: 101,
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <Icon className="w-4 h-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Recent Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentArticles.map((article, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{article.title}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>By {article.author}</span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.date}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {article.views}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      article.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/articles"
                className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <FileText className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">New Article</span>
              </a>
              <a
                href="/admin/users"
                className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
              >
                <Users className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Manage Users</span>
              </a>
              <a
                href="/admin/categories"
                className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
              >
                <Calendar className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Categories</span>
              </a>
              <a
                href="/admin/contacts"
                className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
              >
                <MessageSquare className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-700">Messages</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
