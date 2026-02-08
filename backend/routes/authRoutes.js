const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const { validateRequest } = require('../middlewares/validateRequest');

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
        check('username', 'Username is required').not().isEmpty(),
    ],
    validateRequest,
    registerUser
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    validateRequest,
    authUser
);

module.exports = router;
