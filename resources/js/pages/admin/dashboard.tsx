import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Newspaper, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

interface DashboardProps {
  complaints: number;
  users: number;
}

export default function Dashboard({ complaints, users }: DashboardProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card text-card-foreground rounded-xl border shadow">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="text-sm font-medium tracking-tight">Total aduan</div>
              <Newspaper />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{complaints}</div>
            </div>
          </div>
          <div className="bg-card text-card-foreground rounded-xl border shadow">
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="text-sm font-medium tracking-tight">Total User</div>
              <User />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{users}</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
