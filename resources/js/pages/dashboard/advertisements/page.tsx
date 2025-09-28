import { AdvertisementsManagement } from '@/components/dashboard/advertisements-management';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function AdvertisementsPage({ mockAdvertisements }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdvertisementsManagement mockAdvertisements={mockAdvertisements} />
        </AppLayout>
    );
}
