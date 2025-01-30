import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  courtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentId: String,
}, { timestamps: true });

// Index for checking overlapping bookings
bookingSchema.index({ courtId: 1, startTime: 1, endTime: 1 });

export const Booking = mongoose.model('Booking', bookingSchema); 