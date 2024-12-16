export interface Transaction {
  id: number;
  createdDate: Date;
  lastModifiedDate: Date;
  description: string;
  amount: number;
  remarks: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}
