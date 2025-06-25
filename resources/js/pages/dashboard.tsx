import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ClipboardList, UserIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    title: string;
    total: number;
    icon: string;
    route: string;
}

export default function Dashboard({ data }: { data: DashboardProps[] }) {
    const getIcon = (icon: string) => {
        switch (icon) {
            case 'user':
                return <UserIcon className="h-10 w-10 opacity-40" />;
            default:
                return <ClipboardList className="h-10 w-10 opacity-40" />;
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {data.map((item, idx) => (
                        <Card key={idx} className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>{item.title}</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{item.total}</CardTitle>
                                <div className="absolute top-0 right-6">{getIcon(item.icon)}</div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="text-muted-foreground">
                                    <Link href={route(item.route)} className="hover:text-primary cursor-pointer hover:underline">
                                        Lihat selengkapnya
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
