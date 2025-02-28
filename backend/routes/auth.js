const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'pictaisbest'
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// Route 1: create a user using: POST '/api/auth/createUser'
router.post('/createUser', [
    body('email', 'inavlid email').isEmail(),
    body('password', 'password length should be atleast 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne ({email: req.body.email});
    if (user) {
        success = false;
        return res.status(400).json({ success, error: 'user with this email already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: secPass
    })
    const data = {
        user: {
            id: user.id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({success, authToken, user})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router;