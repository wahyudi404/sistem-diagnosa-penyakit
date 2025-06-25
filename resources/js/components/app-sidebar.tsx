import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ClipboardList, LayoutDashboard, LineChartIcon, Network, Stethoscope, User } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        label: 'Menu',
        menus: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutDashboard,
                roles: [1],
            },
            {
                title: 'Pengguna',
                href: '/users',
                icon: User,
                roles: [1],
            },
            {
                title: 'Data Penyakit',
                href: '/penyakit',
                icon: ClipboardList,
                roles: [1],
            },
            {
                title: 'Data Gejala',
                href: '/gejala',
                icon: ClipboardList,
                roles: [1],
            },
            {
                title: 'Data Training',
                href: '/data-training',
                icon: Network,
                roles: [1],
            },
            {
                title: 'Diagnosa',
                href: '/diagnosa',
                icon: Stethoscope,
                roles: [1, 2],
            },
            {
                title: 'Rekap',
                href: '/rekap',
                icon: LineChartIcon,
                roles: [1, 2],
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
