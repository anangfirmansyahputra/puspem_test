import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Complaint, ComplaintResponse } from '@/types/types';
import { Edit } from 'lucide-react';

interface AduanPageProps {
  responses: (ComplaintResponse & {
    complaint: Complaint;
  })[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Response',
    href: route('responses.index'),
  },
];

export default function AduanPage({ responses }: AduanPageProps) {
  console.log(responses);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Response" />
      <div className="p-6">
        <Heading title="Response" description="Response dari aduan yang kamu ajukan" />

        <Table>
          <TableCaption>List aduan</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Aduan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id}>
                <TableCell className="font-medium">{response.complaint.title}</TableCell>
                <TableCell>{response.complaint.status}</TableCell>
                <TableCell>{response.response}</TableCell>
                <TableCell>{response.feedback ?? '-'}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button
                    disabled={response.feedback ? true : false}
                    variant={'default'}
                    onClick={() => router.visit(route('responses.show', response.id))}
                  >
                    <Edit /> Beri feedback
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
