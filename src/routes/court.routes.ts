import express from 'express';
import { 
  getCourts, 
  getCourtById, 
  createCourt, 
  updateCourtStatus 
} from '../controllers/court.controller';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.get('/', getCourts);
router.get('/:id', getCourtById);

// Protected routes
router.post('/', [auth, adminAuth], createCourt);
router.patch('/:id/status', [auth, adminAuth], updateCourtStatus);

export default router; 