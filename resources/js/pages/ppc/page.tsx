import { Footer } from '@/components/ppc/footer';
import { Header } from '@/components/ppc/header';
import { HeroCarousel } from '@/components/ppc/hero-carousel';
import { MainContent } from '@/components/ppc/main-content';
import { Navigation } from '@/components/ppc/navigation';
import { PopularPosts } from '@/components/ppc/popular-posts';
import { Sidebar } from '@/components/ppc/sidebar';

export default function HomePage({ mainBlog, generalBlog, latestBlog, categorizedBlog, populer }: any) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Navigation />
            <HeroCarousel featuredArticles={mainBlog} sideArticles={generalBlog} />
            <PopularPosts popularPosts={populer} />

            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <MainContent latestNews={latestBlog} categoryNews={categorizedBlog} />
                    <Sidebar />
                </div>
            </div>

            <Footer />
        </div>
    );
}
