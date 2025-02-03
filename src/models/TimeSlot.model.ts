import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    }, 
    courtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court',
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

timeSlotSchema.index({ courtId: 1, startTime: 1, endTime: 1 });

export const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);