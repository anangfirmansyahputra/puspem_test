import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

interface ComplaitCardProps {
  file_path: string;
  title: string;
  description: string;
  created_at: Date;
}

export default function ComplaitCard({ description, file_path, title, created_at }: ComplaitCardProps) {
  return (
    <div className="space-y-5 bg-white p-5 shadow">
      <div className="flex items-center gap-5">
        <div className="bg-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-medium">UN</div>
        <div>
          <p className="font-medium">Unknown</p>
          <p className="text-sm text-gray-500">Dibuat {formatDistanceToNow(new Date(created_at), { addSuffix: true, locale: id })}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-gray-700">{title}</h2>
        <p>{description}</p>
      </div>

      <a href={`/storage/${file_path}`} download>
        <Button variant={'outline'}>
          <Download /> Download Bukti
        </Button>
      </a>
    </div>
  );
}
