import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/text-area';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ComplaintResponse } from '@/types/types';
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
    title: 'Response',
    href: route('responses.index'),
  },
  {
    title: 'Beri feedback',
    href: route('responses.index'),
  },
];

type AduanForm = {
  feedback: string;
};

interface FeedbackProps {
  response: ComplaintResponse;
}

export default function Feedback({ response }: FeedbackProps) {
  const { data, setData, post, processing, errors } = useForm<Required<AduanForm>>({
    feedback: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('responses.feedback', response.id), {
      onSuccess: () => {
        toast.success('Berhasil memberikan feedback');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Feedback" />
      <div className="p-10">
        <Heading title="Feedback" description="Berikan feedback ke admin" />
        <Separator />

        <div className="mt-5 grid w-full max-w-[560px]">
          <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  rows={1}
                  id="feedback"
                  required
                  tabIndex={2}
                  value={data.feedback}
                  onChange={(e) => setData('feedback', e.target.value)}
                  disabled={processing}
                  placeholder="Masukan feedback anda"
                />
                <InputError message={errors.feedback} className="mt-2" />
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
      </div>
    </AppLayout>
  );
}
