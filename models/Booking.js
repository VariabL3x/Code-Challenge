const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BOOKING_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
};

const BookingSchema = new Schema(
    {
        userId: {
            type: Schema.ObjectId,
            index: true,
            ref: 'User ',
            required: true,
        },
        bookingDateTime: { type: Date, required: true },
        status: {
            type: String,
            enum: Object.values(BOOKING_STATUS),
            default: 'pending',
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = {
    Booking,
    BOOKING_STATUS
}

