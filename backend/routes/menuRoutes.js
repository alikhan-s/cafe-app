const express = require('express');
const router = express.Router();
const {
    getMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

router.route('/').get(getMenu).post(protect, admin, createMenuItem);
router
    .route('/:id')
    .put(protect, admin, updateMenuItem)
    .delete(protect, admin, deleteMenuItem);

module.exports = router;
