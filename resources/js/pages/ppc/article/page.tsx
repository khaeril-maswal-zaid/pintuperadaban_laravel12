import { ArticleDetail } from '@/components/ppc/article-detail';
import { Footer } from '@/components/ppc/footer';
import { Header } from '@/components/ppc/header';
import { Navigation } from '@/components/ppc/navigation';
import { RelatedNews } from '@/components/ppc/related-news';
import { Sidebar } from '@/components/ppc/sidebar';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function ArticlePage({ articleData, latestBlog }: any) {
    const { iklans } = usePage<SharedData>().props;

    const advShowMob = iklans.filter((iklan: any) => iklan.type === 'ShowMob')[0];
    const advShowDeks = iklans.filter((iklan: any) => iklan.type === 'ShowDeks')[0];

    return (
        <>
            <Head title={articleData.title} />

            <div className="min-h-screen bg-gray-200">
                <Header />
                <Navigation />

                <div className="container mx-auto px-4 pt-8">
                    <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="lg:w-2/3">
                            <ArticleDetail article={articleData} />

                            {/* Advertisement Banner Bottom */}
                            <div className="mt-6 w-full">
                                <div className="mb-6 block md:hidden">
                                    <div className="overflow-hidden rounded-lg border bg-white">
                                        <div className="flex items-center justify-between rounded-t-lg border-b border-l-5 border-l-yellow-400 bg-white p-3">
                                            <h2 className="font-bold text-gray-900 uppercase">Advertisement</h2>
                                        </div>
                                        <div className="p-4">
                                            <img src={`storage/${advShowDeks?.image}`} className="rounded" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <img src={`storage/${advShowMob?.image}`} className="rounded" alt="" />
                                </div>
                            </div>

                            <RelatedNews latestBlog={latestBlog} />
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
        </>
    );
}
