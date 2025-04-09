import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/text-area';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Complaint, ComplaintResponse } from '@/types/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import ResponseTable from './response-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Aduan',
    href: route('complaints.index'),
  },
  {
    title: 'Tambah Aduan',
    href: route('complaints.create'),
  },
];

type AduanForm = {
  response: string;
  status: 'VERIFIED' | 'REJECTED';
};

interface AduanPageProps {
  complaint?: Complaint & {
    responses: ComplaintResponse[];
  };
}

export default function AduanPage({ complaint }: AduanPageProps) {
  const { data, setData, post, processing, errors } = useForm<Required<AduanForm>>({
    response: '',
    status: 'VERIFIED',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.response', complaint?.id), {
      onSuccess: () => {
        toast.success('Berhasil meresponse aduan');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aduan" />
      <div className="p-10">
        <Heading title="Response dan feedback" description="Response dan feedback aduan masyarakat" />
        <Separator />

        <div className="mt-5 grid w-full max-w-[560px]">
          <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="response">Response</Label>
                <Textarea
                  rows={1}
                  id="response"
                  required
                  tabIndex={2}
                  value={data.response}
                  onChange={(e) => setData('response', e.target.value)}
                  disabled={processing}
                  placeholder="Masukan response anda"
                />
                <InputError message={errors.response} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select required disabled={processing} onValueChange={(e) => setData('status', e as 'VERIFIED' | 'REJECTED')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VERIFIED">Approve</SelectItem>
                    <SelectItem value="REJECTED">Tolak</SelectItem>
                  </SelectContent>
                </Select>
                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Submit
                </Button>
                <Button
                  onClick={() => router.visit(route('admin.complaints.index'))}
                  type="button"
                  className="mt-2 w-full"
                  tabIndex={3}
                  disabled={processing}
                  variant={'outline'}
                >
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-20">
          <Heading title="Response" description="Response aduan masyarakat" />
          {complaint?.responses && <ResponseTable responses={complaint.responses} />}
        </div>
      </div>
    </AppLayout>
  );
}
