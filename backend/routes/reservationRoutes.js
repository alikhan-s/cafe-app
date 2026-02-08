const express = require('express');
const router = express.Router();
const {
    createReservation,
    getMyReservations,
    getAllReservations,
    updateReservationStatus,
} = require('../controllers/reservationController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.route('/').post(protect, createReservation).get(protect, admin, getAllReservations);
router.route('/my').get(protect, getMyReservations);
router.route('/:id').put(protect, admin, updateReservationStatus);

module.exports = router;
