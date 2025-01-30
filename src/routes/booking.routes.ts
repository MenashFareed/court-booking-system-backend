import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  updateBookingStatus 
} from '../controllers/booking.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';
import { validateBooking } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/', [auth, validateBooking], createBooking);
router.get('/user', auth, getUserBookings);
router.patch('/:id/status', [auth, adminAuth], updateBookingStatus);

export default router; 