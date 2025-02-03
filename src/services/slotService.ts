import { TimeSlot } from '../models/TimeSlot.model';
import { Court } from '../models/Court.model';

export const generateTimeSlots = (startTime: Date, endTime: Date, durationMinutes: number) => {
    const slots = [];
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
        const slotEnd = new Date(currentTime.getTime() + durationMinutes * 60000);
        slots.push({ startTime: new Date(currentTime), endTime: new Date(slotEnd) });
        currentTime = slotEnd;
    }

    return slots;
}

export const saveSlotsToDB = async (slots: { startTime: Date; endTime: Date }[], courtId: string) => {
    const court = await Court.findById(courtId);
    if (!court) {
        throw new Error('Court not found');
    }

    const slotsWithCourt = slots.map(slot => ({ ...slot, court: courtId }));
    await TimeSlot.insertMany(slotsWithCourt);
};

export const getAvailableSlots = async (date: string, courtId: string) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return await TimeSlot.find({
        courtId: courtId,
        startTime: { $gte: startOfDay }
    }).populate('courtId');
};