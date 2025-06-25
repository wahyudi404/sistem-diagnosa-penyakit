import { Penyakit as PenyakitType } from '@/components/datatables/penyakit/columns';
import PenyakitPage from '@/components/datatables/penyakit/page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Penyakit',
        href: '/penyakit',
    },
];

export default function Index({ penyakits }: { penyakits: PenyakitType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Penyakit" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PenyakitPage penyakits={penyakits} />
                </div>
            </div>
        </AppLayout>
    );
}
