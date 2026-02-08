const Reservation = require('../models/Reservation');

// @desc    Create a reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res, next) => {
    try {
        const { date, tableNumber, guestCount } = req.body;

        const reservation = new Reservation({
            user: req.user._id,
            date,
            tableNumber,
            guestCount,
        });

        const createdReservation = await reservation.save();
        res.status(201).json(createdReservation);
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user reservations
// @route   GET /api/reservations/my
// @access  Private
const getMyReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id });
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({}).populate('user', 'id username email');
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private/Admin
const updateReservationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const reservation = await Reservation.findById(req.params.id);

        if (reservation) {
            reservation.status = status;
            const updatedReservation = await reservation.save();
            res.json(updatedReservation);
        } else {
            res.status(404);
            throw new Error('Reservation not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReservation,
    getMyReservations,
    getAllReservations,
    updateReservationStatus,
};
