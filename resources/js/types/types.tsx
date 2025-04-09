export type Complaint = {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  file_path: string;
  created_at: Date;
  closed: boolean;
};

export type ComplaintResponse = {
  id: number;
  response: string;
  feedback: string;
  created_at: Date;
};
