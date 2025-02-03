import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeSlot',
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

export const Booking = mongoose.model('Booking', bookingSchema); 