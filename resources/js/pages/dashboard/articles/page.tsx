import { ArticlesManagement } from '@/components/dashboard/articles-management';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ArticlesPage({ blogs }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ArticlesManagement mockArticles={blogs} />
        </AppLayout>
    );
}
