import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  updateBookingStatus,
  getSlots
} from '../controllers/booking.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';
import { validateBooking } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/', [auth, validateBooking], createBooking);
router.get('/userBookings', auth, getUserBookings);
router.patch('/:id/status', [auth, adminAuth], updateBookingStatus);
router.get('/slots', auth, getSlots);

export default router; 