import { ArticleDetail } from '@/components/ppc/article-detail';
import { Footer } from '@/components/ppc/footer';
import { Header } from '@/components/ppc/header';
import { Navigation } from '@/components/ppc/navigation';
import { RelatedNews } from '@/components/ppc/related-news';
import { Sidebar } from '@/components/ppc/sidebar';

export default function ArticlePage({ articleData, latestBlog }: any) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Navigation />

            <div className="container mx-auto px-4 pt-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="lg:w-2/3">
                        <ArticleDetail article={articleData} />

                        {/* Advertisement Banner */}
                        <div className="my-8">
                            <div className="mb-6 block md:hidden">
                                <h3 className="mb-3 text-lg font-bold text-gray-900 uppercase">Advertisement</h3>
                                <div className="rounded bg-gray-100 p-4 text-center">
                                    <span className="text-gray-600">Mobile Advertisement</span>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="rounded bg-gray-100 p-4 text-center">
                                    <span className="text-gray-600">Desktop Advertisement Banner</span>
                                </div>
                            </div>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        <RelatedNews latestBlog={latestBlog} />
                    </div>

                    <Sidebar />
                </div>
            </div>

            <Footer />
        </div>
    );
}
