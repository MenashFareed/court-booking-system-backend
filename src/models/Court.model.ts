import mongoose from 'mongoose';

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['tennis', 'squash'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  description: String,
  images: [String],
  status: {
    type: String,
    enum: ['available', 'maintenance', 'blocked'],
    default: 'available',
  },
  maintenanceSchedule: [{
    startTime: Date,
    endTime: Date,
  }],
}, { timestamps: true });

export const Court = mongoose.model('Court', courtSchema); 