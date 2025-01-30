import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Court } from '../models/Court.model';
import { User } from '../models/User.model';

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

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Court.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert courts
    await Court.insertMany(courts);
    console.log('Courts seeded successfully');

    // Insert users
    await User.insertMany(users);
    console.log('Users seeded successfully');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 