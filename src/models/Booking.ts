interface Booking {
  id: string;
  courtId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
} 