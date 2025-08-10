import { ContactContent } from '@/components/ppc/contact-content';
import { Footer } from '@/components/ppc/footer';
import { Header } from '@/components/ppc/header';
import { Navigation } from '@/components/ppc/navigation';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Navigation />
            <ContactContent />
            <Footer />
        </div>
    );
}
