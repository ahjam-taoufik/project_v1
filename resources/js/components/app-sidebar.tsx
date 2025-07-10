import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItem, NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {  LayoutGrid, LayoutPanelTop, MapPinCheckInside, Notebook, UserRoundPlus, Users, Users2 } from 'lucide-react';
import AppLogo from './app-logo';
import { NavMainSimple } from '@/components/nav-main2';


const mainNavItemsSimple: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Commercials',
        href: '/commercials',
        icon: Users,
    },
    {
        title: 'Reglement',
        href: '/commercials',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Notebook,
    },
];

const mainNavItems: MainNavItem[] = [
    {
        title: 'Manage Clients',
        icon:Users2 ,
        subItems: [
            {
                title: 'Clients',
                href: '/clients',
                 icon:UserRoundPlus ,

            },
            {
                title: 'Secteurs',
                href: '/secteurs',
                icon:LayoutPanelTop ,
            },
            {
                title: 'Villes',
                href: '/villes',
                icon:MapPinCheckInside ,


            },

        ]
    },

];



const footerNavItems: NavItem[] = [



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
                <NavMainSimple items={mainNavItemsSimple} />
                <NavMain items={mainNavItems} />
            </SidebarContent>



            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
