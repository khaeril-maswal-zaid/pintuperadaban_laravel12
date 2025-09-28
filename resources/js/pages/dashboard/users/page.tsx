import { UsersManagement } from '@/components/dashboard/users-management';
import AppLayout from '@/layouts/app-layout';

export default function UsersPage({ mockUsers }: any) {
    return (
        <AppLayout>
            <UsersManagement mockUsers={mockUsers} />
        </AppLayout>
    );
}
