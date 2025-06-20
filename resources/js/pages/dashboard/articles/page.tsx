import { ArticlesManagement } from '@/components/dashboard/articles-management';
import { AdminLayout } from '@/layouts/dashboard-layout';

export default function ArticlesPage() {
    return (
        <AdminLayout>
            <ArticlesManagement />
        </AdminLayout>
    );
}
