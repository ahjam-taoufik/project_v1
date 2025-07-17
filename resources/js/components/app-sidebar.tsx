import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItem, NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {  LayoutGrid, LayoutPanelTop, MapPinCheckInside, Notebook, UserRoundPlus, Users, Users2, FolderTree, Package, Package2, Truck } from 'lucide-react';
import AppLogo from './app-logo';
import { NavMainSimple } from '@/components/nav-main2';
import { usePermissions } from '@/hooks/use-permissions';

export function AppSidebar() {
    const { hasPermission } = usePermissions();


    // Navigation simple avec permissions
    const mainNavItemsSimple: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        ...(hasPermission('users.view') ? [{
            title: 'Users',
            href: '/users',
            icon: Users,
        }] : []),
        ...(hasPermission('livreurs.view') ? [{
            title: 'Livreurs',
            href: '/livreurs',
            icon: Truck,
        }] : []),
        ...(hasPermission('commerciaux.view') ? [{
            title: 'Commerciaux',
            href: '/commerciaux',
            icon: Users,
        }] : []),
        ...(hasPermission('reglement.view') ? [{
            title: 'Reglement',
            href: '/commercials',
            icon: Users,
        }] : []),
        ...(hasPermission('roles.view') ? [{
            title: 'Roles',
            href: '/roles',
            icon: Notebook,
        }] : []),
    ];

    // Navigation avec sous-éléments et permissions
    const mainNavItems: MainNavItem[] = [
        ...(hasPermission('clients.view') || hasPermission('secteurs.view') || hasPermission('villes.view') ? [{
            title: 'Manage Clients',
            icon: Users2,
            subItems: [
                ...(hasPermission('clients.view') ? [{
                    title: 'Clients',
                    href: '/clients',
                    icon: UserRoundPlus,
                }] : []),
                ...(hasPermission('secteurs.view') ? [{
                    title: 'Secteurs',
                    href: '/secteurs',
                    icon: LayoutPanelTop,
                }] : []),
                ...(hasPermission('villes.view') ? [{
                    title: 'Villes',
                    href: '/villes',
                    icon: MapPinCheckInside,
                }] : []),
            ]
        }] : []),
        ...(hasPermission('brands.view') || hasPermission('categories.view') || hasPermission('products.view') ? [{
            title: 'Manage Product',
            icon: Package,
            subItems: [
                ...(hasPermission('brands.view') ? [{
                    title: 'Brands',
                    href: '/brands',
                    icon: Notebook,
                }] : []),
                ...(hasPermission('categories.view') ? [{
                    title: 'Catégories',
                    href: '/categories',
                    icon: FolderTree,
                }] : []),
                ...(hasPermission('products.view') ? [{
                    title: 'Produits',
                    href: '/products',
                    icon: Package2,
                }] : []),
            ]
        }] : []),
    ];

    const footerNavItems: NavItem[] = [
        // Ajoutez ici les éléments du footer si nécessaire
    ];

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
