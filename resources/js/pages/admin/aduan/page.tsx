import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Complaint } from '@/types/types';
import { Download, Edit } from 'lucide-react';

interface AduanPageProps {
  complaints: Complaint[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Aduan',
    href: route('admin.complaints.index'),
  },
];

export default function AduanPage({ complaints }: AduanPageProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aduan" />
      <div className="p-6">
        <Heading title="Aduan" description="List aduan masyarakat" />
        <Separator />
        <Table>
          <TableCaption>List aduan</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Ditutup</TableHead>
              <TableHead>File</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">{complaint.title}</TableCell>
                <TableCell>{complaint.status}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.closed ? 'Iya' : 'Tidak'}</TableCell>
                <TableCell>
                  <a href={`/storage/${complaint.file_path}`} download>
                    <Button size={'sm'} variant={'ghost'}>
                      <Download />
                      Download
                    </Button>
                  </a>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    disabled={complaint.closed}
                    size={'sm'}
                    variant={'outline'}
                    onClick={() => router.visit(route('admin.complaints.show', complaint.id))}
                  >
                    <Edit /> Response dan Feedback
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
