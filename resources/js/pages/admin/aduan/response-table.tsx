import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ComplaintResponse } from '@/types/types';

interface ResponseTableProps {
  responses: ComplaintResponse[];
}

export default function ResponseTable({ responses }: ResponseTableProps) {
  return (
    <Table>
      <TableCaption>List aduan</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Response</TableHead>
          <TableHead>Feedback</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {responses.map((response) => (
          <TableRow key={response.id}>
            <TableCell className="font-medium">{response.response}</TableCell>
            <TableCell className="font-medium">{response?.feedback ?? '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
