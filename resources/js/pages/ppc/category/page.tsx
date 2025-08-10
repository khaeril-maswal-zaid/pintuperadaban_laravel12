import { CategoryContent } from '@/components/ppc/category-content';
import { Footer } from '@/components/ppc/footer';
import { Header } from '@/components/ppc/header';
import { Navigation } from '@/components/ppc/navigation';
import { Sidebar } from '@/components/ppc/sidebar';

export default function CategoryPage({ allArticles }: any) {
    return (
        <div className="min-h-screen bg-gray-200">
            <Header />
            <Navigation />

            <div className="container mx-auto px-4 pt-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="lg:w-2/3">
                        <CategoryContent allArticles={allArticles} />
                    </div>

                    <div className="lg:w-1/3">
                        <div className="sticky top-6">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
