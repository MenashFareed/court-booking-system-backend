import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRegistration as validateRegistration, validateLogin as validateLogin } from '../middleware/validation.middleware';

const router = express.Router();

// Basic route setup - add actual routes later
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router; 