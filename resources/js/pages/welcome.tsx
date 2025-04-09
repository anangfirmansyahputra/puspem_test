import ComplaitCard from '@/components/complaint-card';
import { Button } from '@/components/ui/button';
import { Complaint } from '@/types/types';
import { router } from '@inertiajs/react';

interface TimelinePageProps {
  complaints: Complaint[];
}

export default function TimelinePage({ complaints }: TimelinePageProps) {
  return (
    <div className="bg-primary-foreground min-h-screen">
      <div className="bg-primary flex h-[30vh] items-end pb-10">
        <div className="container mx-auto space-y-2">
          <h1 className="text-primary-foreground text-3xl font-semibold">LAPOR BADUNG</h1>
          <p className="text-primary-foreground text-lg">Layanan aduan masyarakat terhadap pemerintahan Kabupaten Badung</p>
          <div className="h-2 w-20 bg-white" />
        </div>
      </div>

      <div className="container mx-auto mt-20 pb-20">
        <div className="flex items-start justify-between">
          <p className="mb-5 text-2xl font-semibold">Aduan Masyarakat</p>
          <Button onClick={() => router.visit(route('complaints.create'))}>Buat Pengaduan</Button>
        </div>

        <div className="space-y-5">
          {complaints.map((complaint) => (
            <ComplaitCard {...complaint} />
          ))}
        </div>
      </div>
    </div>
  );
}
