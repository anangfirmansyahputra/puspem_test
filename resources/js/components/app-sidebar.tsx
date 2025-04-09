import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Newspaper } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
  const { auth } = usePage().props;
  const user = auth as { user: { role: 'REPORTER' | 'ADMIN' } };
  const role = user.user.role;

  const mainNavItems: NavItem[] =
    role === 'ADMIN'
      ? [
          {
            title: 'Dashboard',
            href: '/admin',
            icon: LayoutGrid,
          },
          {
            title: 'Aduan',
            href: '/admin/complaints',
            icon: Newspaper,
          },
        ]
      : [
          {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
          },
          {
            title: 'Aduan',
            href: '/dashboard/complaints',
            icon: Newspaper,
          },
          {
            title: 'Response',
            href: '/dashboard/responses',
            icon: Newspaper,
          },
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
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
