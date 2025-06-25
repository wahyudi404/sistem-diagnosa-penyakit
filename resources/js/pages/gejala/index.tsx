import { Gejala as GejalaType } from '@/components/datatables/gejala/columns';
import GejalaPage from '@/components/datatables/gejala/page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Gejala',
        href: '/gejala',
    },
];

export default function Index({ gejalas }: { gejalas: GejalaType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Gejala" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <GejalaPage gejalas={gejalas} />
                </div>
            </div>
        </AppLayout>
    );
}
