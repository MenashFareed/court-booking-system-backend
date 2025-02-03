import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Court } from '../models/Court.model';
import { User } from '../models/User.model';
import { TimeSlot } from '../models/TimeSlot.model';
import { TimeSlot as TS } from '../models/TimeSlot';

dotenv.config();

const courts = [
  {
    name: 'Tennis Court 1',
    type: 'tennis',
    location: 'Main Building',
    hourlyRate: 50,
    description: 'Professional tennis court with excellent lighting',
    images: ['https://example.com/court1.jpg'],
    status: 'available',
  },
  {
    name: 'Tennis Court 2',
    type: 'tennis',
    location: 'Main Building',
    hourlyRate: 45,
    description: 'Standard tennis court, perfect for casual players',
    images: ['https://example.com/court2.jpg'],
    status: 'available',
  },
  {
    name: 'Squash Court 1',
    type: 'squash',
    location: 'East Wing',
    hourlyRate: 35,
    description: 'Professional squash court with viewing gallery',
    images: ['https://example.com/squash1.jpg'],
    status: 'available',
  },
  {
    name: 'Squash Court 2',
    type: 'squash',
    location: 'East Wing',
    hourlyRate: 35,
    description: 'Standard squash court',
    images: ['https://example.com/squash2.jpg'],
    status: 'maintenance',
  },
];

const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    phone: '1234567890',
    role: 'admin',
  },
  {
    email: 'user@example.com',
    password: 'user123',
    firstName: 'Regular',
    lastName: 'User',
    phone: '0987654321',
    role: 'user',
  },
];

function addHours(date: Date, hours: number) {
  const hoursToAdd = hours * 60 * 60 * 1000;
  const dateObj = new Date(date);
  dateObj.setTime(date.getTime() + hoursToAdd);
  return dateObj;
}

function createTimeSlots(court: any) {
  const slots: TS[] = [];
  const currentDate = new Date();
  currentDate.setHours(7, 0, 0, 0); // Set to 7 AM

  // Create slots for 3 days
  for (let day = 0; day < 3; day++) {
    const dayDate = new Date(currentDate);
    dayDate.setDate(currentDate.getDate() + day);

    // Create slots from 7 AM to 8 PM (13 hours)
    for (let hour = 0; hour < 13; hour++) {
      const startTime = new Date(dayDate);
      startTime.setHours(startTime.getHours() + hour);
      
      slots.push({
        courtId: court.id,
        startTime: startTime,
        endTime: addHours(startTime, 1),
        isAvailable: true
      });
    }
  }
  return slots;
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Court.deleteMany({});
    await User.deleteMany({});
    await TimeSlot.deleteMany({});
    console.log('Cleared existing data');

    // Insert courts
    await Court.insertMany(courts);
    console.log('Courts seeded successfully');

    // Insert users
    await User.insertMany(users);
    console.log('Users seeded successfully');

    const courtList = await Court.find({});
    let slots: TS[] = [];

    // Generate slots for each court
    courtList.forEach((court) => {
      slots = [...slots, ...createTimeSlots(court)];
    });
    
    // Insert Slots
    await TimeSlot.insertMany(slots);
    console.log('Slots seeded successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 