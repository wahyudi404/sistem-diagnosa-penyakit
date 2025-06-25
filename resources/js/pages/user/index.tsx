import { User as UserType } from '@/components/datatables/users/columns';
import UserPage from '@/components/datatables/users/page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Pengguna',
        href: '/user',
    },
];

export default function Index({ users }: { users: UserType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Gejala" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <UserPage users={users} />
                </div>
            </div>
        </AppLayout>
    );
}
