import { Request, Response } from 'express';
import { Booking } from '../models/Booking.model';
import { Court } from '../models/Court.model';

export const createBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { courtId, startTime, endTime } = req.body;
    
    // Check if court exists and is available
    const court = await Court.findById(courtId);
    if (!court || court.status !== 'available') {
      return res.status(400).json({ message: 'Court is not available' });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      courtId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    const booking = new Booking({
      ...req.body,
      userId: req.user.id,
      status: 'pending'
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('courtId')
      .sort({ startTime: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status' });
  }
}; 