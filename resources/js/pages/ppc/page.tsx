import { Footer } from '@/components/ppc/footer';
import { Header } from '@/components/ppc/header';
import { HeroCarousel } from '@/components/ppc/hero-carousel';
import { MainContent } from '@/components/ppc/main-content';
import { Navigation } from '@/components/ppc/navigation';
import { PopularPosts } from '@/components/ppc/popular-posts';
import { Sidebar } from '@/components/ppc/sidebar';

export default function HomePage({ mainBlog, generalBlog, latestBlog, categorizedBlog }: any) {
    return (
        <div className="min-h-screen bg-gray-200">
            <Header />
            <Navigation />
            <HeroCarousel featuredArticles={mainBlog} sideArticles={generalBlog} />
            <PopularPosts />

            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <MainContent latestNews={latestBlog} categoryNews={categorizedBlog} />

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
