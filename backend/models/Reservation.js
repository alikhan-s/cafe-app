const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
    },
    tableNumber: {
        type: Number,
    },
    guestCount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
