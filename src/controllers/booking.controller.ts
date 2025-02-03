import { Request, Response } from 'express';
import { Booking } from '../models/Booking.model';
import { getAvailableSlots } from '../services/slotService';
import { TimeSlot } from '../models/TimeSlot.model';

export const createBooking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { slotId } = req.body;
    
    // Check if court exists and is available
    const timeSlot = await TimeSlot.findById(slotId);
    if (!timeSlot || timeSlot.isAvailable !== true) {
      return res.status(400).json({ message: 'Time slot is not available' });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      slotId,
      status: { $ne: 'cancelled' },
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }

    const booking = new Booking({
      ...req.body,
      userId: req.user.id,
      status: 'pending'
    });

    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(
      slotId,
      { isAvailable: false },
      { new: true }
    );

    if (!updatedTimeSlot)
      return res.status(404).json({ message: 'Time slot not found.' });

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
      .populate('slotId');
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

export const getSlots = async (req: Request, res: Response) => {
  const { date, courtId } = req.query;

  if (!date || !courtId) {
    return res.status(400).json({ message: 'Date and courtId are required' });
  }

  try {
    const slots = await getAvailableSlots(date as string, courtId as string);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots', error });
  }
}
