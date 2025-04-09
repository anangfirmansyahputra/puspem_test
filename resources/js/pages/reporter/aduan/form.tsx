import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/text-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Complaint } from '@/types/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

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
  title: string;
  description: string;
  file_path: File | null;
};

interface AduanPageProps {
  complaint?: Complaint;
}

export default function AduanPage({ complaint }: AduanPageProps) {
  const { data, setData, post, processing, errors } = useForm<Required<AduanForm>>(
    complaint
      ? {
          title: complaint.title,
          description: complaint.description,
          file_path: null,
        }
      : {
          title: '',
          description: '',
          file_path: null,
        },
  );

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (complaint) {
      router.post(
        route('complaints.update', complaint.id),
        {
          _method: 'put',
          title: data.title,
          description: data.description,
          file_path: data.file_path,
        },
        {
          onSuccess: () => {
            toast.success('Berhasil mengupdate aduan, mohon untuk menunggu verifikasi dari admin');
          },
        },
      );
    } else {
      post(route('complaints.store'), {
        onSuccess: () => {
          toast.success('Berhasil membuat aduan, mohon untuk menunggu verifikasi dari admin');
        },
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Aduan" />
      <div className="p-10">
        <Heading title="Aduan" description="Ajukan aduan anda ke layanan kami" />
        <Separator />

        <div className="mt-5 grid w-full max-w-[560px]">
          <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  disabled={processing}
                  placeholder="Masukan judul aduan"
                />
                <InputError message={errors.title} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="file_path">File</Label>
                <Input
                  id="file_path"
                  type="file"
                  required={complaint ? false : true}
                  tabIndex={1}
                  autoComplete="file_path"
                  onChange={(e) => setData('file_path', e.target.files?.[0] ?? null)}
                  disabled={processing}
                  accept="image/*,application/pdf"
                />
                {complaint && <p className="my-1 text-xs text-slate-600">Note : Masukan file jika ingin mengupdate file</p>}
                <InputError message={errors.file_path} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  rows={5}
                  id="description"
                  required
                  tabIndex={2}
                  autoComplete="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  disabled={processing}
                  placeholder="Masukan deskripsi aduan"
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Submit
                </Button>
                <Button
                  onClick={() => router.visit(route('complaints.index'))}
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
      </div>
    </AppLayout>
  );
}
