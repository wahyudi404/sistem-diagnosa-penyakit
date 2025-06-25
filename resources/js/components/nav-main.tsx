import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { auth } = usePage<SharedData>().props;

    return (
        <SidebarGroup className="px-2 py-0">
            {items.map((item, index) => (
                <React.Fragment key={`group-${index}`}>
                    <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
                    <SidebarMenu>
                        {item.menus.map((menu) => {
                            if (menu.roles?.includes(auth.user.role_id)) {
                                return (
                                    <SidebarMenuItem key={menu.title}>
                                        <SidebarMenuButton asChild isActive={menu.href === page.url} tooltip={{ children: menu.title }}>
                                            <Link href={menu.href}>
                                                {menu.icon && <menu.icon />}
                                                <span>{menu.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            }
                        })}
                    </SidebarMenu>
                </React.Fragment>
            ))}
        </SidebarGroup>
    );
}
