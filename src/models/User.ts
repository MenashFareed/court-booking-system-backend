interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
  bookingHistory: string[]; // Array of booking IDs
  createdAt: Date;
  updatedAt: Date;
} 