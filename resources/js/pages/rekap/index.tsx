import RekapTable from '@/components/tables/rekap/page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { RekapsProps } from '@/types/rekap';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekap',
        href: '/rekap',
    },
];

export default function Index({ rekaps, role_id }: { rekaps: RekapsProps[], role_id: number }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekap" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="w-full p-4">
                        <h1 className="mb-4 font-semibold">Rekapan Hasil Diagnosa</h1>
                        <RekapTable rekaps={rekaps} role_id={role_id} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
