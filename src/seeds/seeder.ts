import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Court } from '../models/Court.model';
import { User } from '../models/User.model';
import { TimeSlot } from '../models/TimeSlot.model';
import { TimeSlot as TS } from '../models/TimeSlot';

dotenv.config();

const courts = [
  {
    name: 'Center Court 1',
    type: 'tennis',
    location: 'Main Building',
    hourlyRate: 50,
    description: 'Professional tennis court with excellent lighting',
    images: ['https://example.com/court1.jpg'],
    status: 'available',
  },
  {
    name: 'Center Court 2',
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

    courtList.map((court) => {
      const currentTime = new Date();
      slots.push({
        courtId: court.id,
        startTime: currentTime,
        endTime: addHours(currentTime, 1),
        isAvailable: true
      });
      slots.push({
        courtId: court.id,
        startTime: addHours(currentTime, 1),
        endTime: addHours(currentTime, 2),
        isAvailable: true
      });
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