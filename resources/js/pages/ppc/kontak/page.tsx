import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { ContactContent } from "@/components/contact-content"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <ContactContent />
      <Footer />
    </div>
  )
}
