const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateUser = require('../utils/authMiddleware')

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const new_user = new User({name: username, email: email, password: hashedPassword})

        await new_user.save();

        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: 'Please provide all required fields'});
        }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userID: user._id, email: user.email, name: user.name}, JWT_SECRET, {expiresIn: '1h'})

        res.status(200).json({message: 'Login successful', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error', error});
    }
})

router.put('/update-profile', authenticateUser, async (req, res) => {
    try {
        const {username, email} = req.body;
        const name = username
        const user = await User.findByIdAndUpdate(req.userID, {name, email}, {new: true});
        // update successfully
        if (user) {
            const token = jwt.sign({userID: user._id, email: user.email, name: user.name}, JWT_SECRET, {expiresIn: '1h'})
            res.status(200).json({message: 'Profile updated successfully', user, token});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    }
    catch (error) {
        res.status(500).json({message: 'Server error update user info unsuccessful'+error, error});
    }
})

module.exports = router;
