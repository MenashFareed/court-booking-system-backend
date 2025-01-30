interface Court {
  id: string;
  name: string;
  type: 'tennis' | 'squash';
  location: string;
  hourlyRate: number;
  description?: string;
  images: string[];
  maintenanceSchedule: {
    startTime: Date;
    endTime: Date;
  }[];
  status: 'available' | 'maintenance' | 'blocked';
} 