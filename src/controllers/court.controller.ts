import { Request, Response } from 'express';
import { Court } from '../models/Court.model';

export const getCourts = async (req: Request, res: Response) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courts' });
  }
};

export const getCourtById = async (req: Request, res: Response) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }
    res.json(court);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching court' });
  }
};

export const createCourt = async (req: Request, res: Response) => {
  try {
    const court = new Court(req.body);
    await court.save();
    res.status(201).json(court);
  } catch (error) {
    res.status(500).json({ message: 'Error creating court' });
  }
};

export const updateCourtStatus = async (req: Request, res: Response) => {
  try {
    const court = await Court.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }
    res.json(court);
  } catch (error) {
    res.status(500).json({ message: 'Error updating court status' });
  }
}; 