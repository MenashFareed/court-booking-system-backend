import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('phone').notEmpty(),
  handleValidationErrors
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  handleValidationErrors
];

export const validateBooking = [
  body('slotId').notEmpty(),
  handleValidationErrors
];

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
} 