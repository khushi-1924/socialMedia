const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'pictaisbest';
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');

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
});

// Route 2: login a user using: POST '/api/auth/loginUser'
router.post('/loginUser', [
    body('emailORusername', 'please enter username or email').exists(),
    body('password', 'please enter password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {emailORusername, password} = req.body;
    try {
        let user = await User.findOne({
            $or: [{ email: emailORusername }, { username: emailORusername }]
        });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'user does not exist' });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(400).json ({ success, error: 'incorrect password' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.status(200).json({ success, authToken, user});
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('internal server error')
    }
})

// Route 3: get loggedin user details using: GET '/api/auth/getUser'
router.get('/getUser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;