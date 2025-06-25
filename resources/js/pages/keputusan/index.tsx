import KeputusanTable from '@/components/tables/keputusan/page';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { type KeputusanProps, type PenyakitProps } from '@/types/keputusan';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Training',
        href: '/data-training',
    },
];

export default function Index({ dt_keputusans, penyakits }: { dt_keputusans: KeputusanProps[], penyakits: PenyakitProps[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Training" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="w-full p-4">
                        <div className='mb-4 flex items-center justify-between'>
                            <Button variant="outline" className='cursor-pointer' asChild>
                                <Link href={route('data-training.create')}>
                                    <PlusCircleIcon />
                                    Buat Data Training
                                </Link>
                            </Button>
                        </div>
                        <KeputusanTable dt_keputusans={dt_keputusans} penyakits={penyakits} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
