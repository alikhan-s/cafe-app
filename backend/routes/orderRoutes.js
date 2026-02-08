const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/my').get(protect, getMyOrders);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
