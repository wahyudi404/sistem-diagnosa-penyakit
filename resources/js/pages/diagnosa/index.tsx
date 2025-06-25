import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import FormDiagnosa from './components/form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diagnosa',
        href: '/diagnosa',
    },
];

interface GejalaProps {
    kode_gejala: string;
    nama_gejala: string;
}

export default function Diagnosa({ gejalas } : { gejalas: GejalaProps[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Diagnosa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className='m-6'>
                        {/* Header */}
                        <h1 className="text-lg font-medium">Diagnosa Penyakit Umum Manusia</h1>
                        <p className="text-muted-foreground text-sm font-normal">Silahkan pilih gejala-gejala yang dialami</p>
                        <hr className="my-3" />
                        <FormDiagnosa data={gejalas} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
