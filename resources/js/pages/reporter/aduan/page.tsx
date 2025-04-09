import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Complaint } from '@/types/types';
import { Download, Edit, Trash } from 'lucide-react';

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
    href: route('complaints.index'),
  },
];

export default function AduanPage({ complaints }: AduanPageProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aduan" />
      <div className="p-6">
        <Heading title="Aduan" description="Ajukan aduan anda ke layanan kami" />

        <div className="my-2 flex items-center justify-end">
          <Button onClick={() => router.visit(route('complaints.create'))}>Buat aduan</Button>
        </div>
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
                    size={'icon'}
                    variant={'outline'}
                    onClick={() => router.visit(route('complaints.edit', complaint.id))}
                  >
                    <Edit />
                  </Button>
                  <Button
                    disabled={complaint.closed}
                    onClick={() => router.delete(route('complaints.destroy', complaint.id))}
                    variant={'destructive'}
                    size={'icon'}
                  >
                    <Trash />
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
