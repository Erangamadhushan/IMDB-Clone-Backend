const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = require('../controller/user.controller')


const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);

// By Default export the router
router.get('/', (req, res) => {
    res.json({
        message: 'User Service is running',
        routes: {
            register: '/auth/users/register',
            login: '/auth/users/login',
            profile: '/auth/users/profile',
            verify: '/auth/users/verify'
        }
    });
});

module.exports = router;